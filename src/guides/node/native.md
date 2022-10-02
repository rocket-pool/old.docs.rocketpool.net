# Creating a Native Rocket Pool Node without Docker

In this section, we will walk through the process of installing the Rocket Pool Smartnode stack natively onto your system, without the use of Docker containers.

The general plan is as follows:
- Create a JSON web token (JWT) secret file to authenticate connections between your clients. 
- Create system services for the Rocket Pool components (the **node** process, and optionally the **watchtower** process if you are an Oracle Node).
- Create a system service for the execution client.
- Create a system service for the consensus client.
- Create a system service for the validator client.
- Create a system service for MEV-Boost.

This is a fairly involved setup so it will take some time to complete.

The diversity of operating systems and distros available make it impractical to make guides available for all of them.
The instructions in this guide are tailored to a Debian-based system (including Ubuntu).
For other distros or operating systems, you may follow the high-level steps described in the guide but will have to substitute certain commands for the ones that your system uses as appropriate.

::: warning
This guide is intended for users that are experienced with Linux system administration and usage.
This includes using the terminal, creating system accounts, managing permissions, and installing services.
**If you are not familiar with these activites, we do not recommend that you use the native mode.**
:::

## Creating a JWT secret file
Your clients communicate securely by authenticating their connections using JSON web tokens (JWTs). JWTs are signed using a secret key that is known to all clients. To enable this secure communication, you must create a `jwtsecret` file (containing a random key) and make it accessible to your clients. First, create a directory for the secret file:
```shell
sudo mkdir -p /secrets
```
Then create the `jwtsecret` file:
```shell
openssl rand -hex 32 | tr -d "\n" | sudo tee /secrets/jwtsecret
```
Finally, enable read access to the file:
```shell
sudo chmod 644 /secrets/jwtsecret
```
Now you're ready to start setting up your client service accounts.

## Creating Service Accounts

In this section, you'll create new system accounts for the services and disable logins and shell access for them.
The reason for having separate user accounts is practical: if your clients have a major vulnerability, like an [Arbitrary Code Execution](https://en.wikipedia.org/wiki/Arbitrary_code_execution) exploit, the separate accounts limit the amount of damage an attacker can actually do because they're running on an account with limited permissions.

We're going to create separate accounts for your execution client, your consensus client, and MEV-Boost. We'll create a shared account for both Rocket Pool and the validator client.
The sharing is necessary because Rocket Pool creates the validator's key files when you create a new minipool, and sets the permissions so that only its own user has access to them.
If you're using **Nimbus** for your consensus client, then it shares an account with Rocket Pool because the separate Nimbus validator client is still in beta and isn't yet supported.

Start by creating an account for your execution client, which we'll call `eth1`:
```shell
sudo useradd -r -s /sbin/nologin eth1
```

Do the same for your consensus client, which we'll call `eth2`:
```shell
sudo useradd -r -s /sbin/nologin eth2
```

Make an account for MEV-Boost, which we'll call `mevboost`:
```shell
sudo useradd -r -s /sbin/nologin mevboost
```

Finally, make an account for the validator and Rocket Pool, which we'll call `rp`:
```shell
sudo useradd -r -s /sbin/nologin rp
```

::: tip NOTE
If you're using Nimbus, ignore the `rp` account.
Any time you see it used in this guide, just substitute it with `eth2` instead.
:::

Now, add yourself to the `rp` group.
You'll need to do this in order to use the Rocket Pool CLI, because it and the Rocket Pool daemon both need to access the execution layer wallet file.
```shell
sudo usermod -aG rp $USER
```

After this, log out and back in for the changes to take effect.


## Installing Rocket Pool

### Setting up the Binaries
Start by making a folder for Rocket Pool and a data subfolder.
You can put this wherever you want; for this guide, I'll put it into `/srv`:
```shell
sudo mkdir -p /srv/rocketpool/data

sudo chown -R $USER:$USER /srv/rocketpool
```

Now, download the CLI and daemon binaries (or ignore this and build them from source if you prefer).
Choose the platform that your system uses from the tabs below.

:::: tabs

::: tab Linux x64
```shell
sudo wget https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-cli-linux-amd64 -O /usr/local/bin/rocketpool

sudo wget https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-daemon-linux-amd64 -O /usr/local/bin/rocketpoold

sudo chmod +x /usr/local/bin/rocketpool /usr/local/bin/rocketpoold
```
:::

::: tab Linux arm64
```shell
sudo wget https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-cli-linux-arm64 -O /usr/local/bin/rocketpool

sudo wget https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-daemon-linux-arm64 -O /usr/local/bin/rocketpoold

sudo chmod +x /usr/local/bin/rocketpool /usr/local/bin/rocketpoold
```
:::

::: tab macOS x64
```shell
sudo wget https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-cli-darwin-amd64 -O /usr/local/bin/rocketpool

sudo wget https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-daemon-darwin-amd64 -O /usr/local/bin/rocketpoold

sudo chmod +x /usr/local/bin/rocketpool /usr/local/bin/rocketpoold
```
:::

::: tab macOS arm64
```shell
sudo wget https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-cli-darwin-arm64 -O /usr/local/bin/rocketpool

sudo wget https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-daemon-darwin-arm64 -O /usr/local/bin/rocketpoold

sudo chmod +x /usr/local/bin/rocketpool /usr/local/bin/rocketpoold
```
:::

::::

Next, grab the validator restart script—Rocket Pool uses this script when it needs to restart your validator client (for example, to load new keys after you create a new minipool):

```shell
wget https://github.com/rocket-pool/smartnode-install/raw/release/install/scripts/restart-vc.sh -O /srv/rocketpool/restart-vc.sh

chmod +x /srv/rocketpool/restart-vc.sh
```

Now open `~/.profile` with your editor of choice and add this line to the end:
```
alias rp="rocketpool -d /usr/local/bin/rocketpoold -c /srv/rocketpool"
```

Save it, then reload your profile:
```shell
source ~/.profile
```

This lets you interact with Rocket Pool's CLI with the `rp` command, which is a nice shortcut.


### Creating the Services

Next up, we'll create a `systemd` service for the Rocket Pool node daemon.
This is the service that automatically checks for and claims RPL rewards, and stakes minipools after you've created them via `node deposit`.

Optionally, if you're an Oracle DAO member, create the corresponding `watchtower` service as well.
If you're not an Oracle DAO member, you can ignore that service.

:::: tabs

::: tab Node

Create the `rp-node` service:
```shell
sudo nano /etc/systemd/system/rp-node.service
```

Contents:
```
[Unit]
Description=rp-node
After=network.target

[Service]
Type=simple
User=rp
Restart=always
RestartSec=5
ExecStart=/usr/local/bin/rocketpoold \
  --settings /srv/rocketpool/user-settings.yml node

[Install]
WantedBy=multi-user.target
```

Create a log file for the service, so you can watch its output (this log file replaces the behavior of the `rocketpool service logs node` command that's only available with Docker):
```shell
nano /srv/rocketpool/node-log.sh
```
Contents:
```
#!/bin/bash
journalctl -u rp-node -b -f
```

Save it, then make it executable:
```shell
chmod +x /srv/rocketpool/node-log.sh
```

Now you can watch the node's logs by simply running `$ /srv/rocketpool/node-log.sh`.
:::

::: tab Watchtower
Create a service for the watchtower:
```shell
sudo nano /etc/systemd/system/rp-watchtower.service
```

Contents:
```
[Unit]
Description=rp-node
After=network.target

[Service]
Type=simple
User=rp
Restart=always
RestartSec=5
ExecStart=/usr/local/bin/rocketpoold \
  --settings /srv/rocketpool/user-settings.yml \
  watchtower

[Install]
WantedBy=multi-user.target
```

Create a log file for the watchtower:
```shell
nano /srv/rocketpool/watchtower-log.sh
```
Contents:
```
#!/bin/bash
journalctl -u rp-watchtower -b -f
```

Save it, then make it executable:
```shell
chmod +x /srv/rocketpool/watchtower-log.sh
```
:::

::::


## Installing the Execution Client

For the sake of simplicity, we're going to use Geth as our example execution client throughout this guide.
If you have another client in mind, adapt these instructions to that client accordingly.

Start by making a folder for the Geth binary and the log script:
```shell
sudo mkdir /srv/geth

sudo chown $USER:$USER /srv/geth
```

Next, make a folder for the chain data on the SSD.
Pick the setup that you have below:
:::: tabs

::: tab Same SSD as the OS
```shell
sudo mkdir /srv/geth/geth_data

sudo chown eth1:eth1 /srv/geth/geth_data
```
:::

::: tab Separate SSD (Raspberry Pi)
This assumes that your SSD is mounted on a folder like `/mnt/rpdata`; substitute it accordingly with the folder you used.
```shell
sudo mkdir /mnt/rpdata/geth_data

sudo chown eth1:eth1 /mnt/rpdata/geth_data
```
:::

::::


Now, grab [the latest Geth binary](https://geth.ethereum.org/downloads/) for your architecture, or [build it from source](https://github.com/ethereum/go-ethereum/) if you want.
If you download it, it's an archive.
Extract it and copy the contents of the `geth` folder to `/srv/geth`.
For example, if you have an x64 system:
```shell
cd /tmp

wget https://gethstore.blob.core.windows.net/builds/geth-linux-amd64-1.10.3-991384a7.tar.gz

tar xzf geth-linux-amd64-1.10.3-991384a7.tar.gz

cp geth-linux-amd64-1.10.3-991384a7/geth /srv/geth
```

Next, create a systemd service for Geth. You can use this as a template and modify the command line arguments as you see fit:
```shell
sudo nano /etc/systemd/system/geth.service
```

:::: tabs
::: tab Same SSD as the OS
Contents:
```
[Unit]
Description=Geth
After=network.target

[Service]
Type=simple
User=eth1
Restart=always
RestartSec=5
ExecStart=/srv/geth/geth \
  --datadir /srv/geth/geth_data \
  --mainnet \
  --authrpc.jwtsecret=/secrets/jwtsecret \
  --http \
  --http.port 8545 \
  --http.api eth,net,personal,web3 \
  --ws \
  --ws.port 8546 \
  --ws.api eth,net,personal,web3

[Install]
WantedBy=multi-user.target
```
:::

::: tab Separate SSD (Raspberry Pi)
Contents:
```
[Unit]
Description=Geth
After=network.target

[Service]
Type=simple
User=eth1
Restart=always
RestartSec=5
ExecStart=taskset 0x0c ionice -c 3 /srv/geth/geth \
  --mainnet \
  --cache 512 \
  --maxpeers 12 \
  --datadir /mnt/rpdata/geth_data \
  --authrpc.jwtsecret=/secrets/jwtsecret \
  --http \
  --http.port 8545 \
  --http.api eth,net,personal,web3 \
  --ws \
  --ws.port 8546 \
  --ws.api eth,net,personal,web3

[Install]
WantedBy=multi-user.target
```

`ExecStart` notes:

- `taskset 0x0c` constrains Geth to only run on CPUs 2 and 3. This way, it won't interfere with your other clients.
- `ionice -c 3` tells the system that Geth's disk access is a super low priority - if the validator client needs to access the SSD, it always has priority over Geth. This command is meant for Raspberry Pis or other similarly low-power systems.

You can omit these commands if you're not on a low-power system.
:::
::::

::: warning NOTE
The above configuration is for the **Ethereum mainnet**.
If you want to run on the **Prater testnet** instead, replace the `--mainnet` flag in the `ExecStart` string with `--goerli`.
:::

Some notes:

- You can optionally use the `--cache` flag to lower the amount of RAM that Geth uses.
  - If you have 4 GB of RAM, **set this to 256**.
  - If you have 8 GB of RAM, **you can leave it at 512** so it syncs faster and doesn't require pruning as frequently.
  - For larger amounts of RAM, you can ignore this flag.
- You can optionally use the `--maxpeers` flag to lower the peer count. The peer count isn't very important for the Execution client, and lowering it can free up some extra resources if you need them.

Lastly, add a log watcher script so you can check on Geth to see how it's doing:
```shell
sudo nano /srv/geth/log.sh
```

Contents:
```
#!/bin/bash
journalctl -u geth -b -f
```

Make it executable:
```shell
sudo chmod +x /srv/geth/log.sh
```

Now you can see the Geth logs by doing `$ /srv/geth/log.sh`. (This log file replaces the `rocketpool service logs eth1` command that's only available with Docker.)

You're all set with the execution client; now for the consensus client.


## Installing the Consensus Client

Start by making a folder for your consensus client binary and log script.
::: tip NOTE 
The <b>consensus client</b> is also sometimes referred to as the <b>beacon node</b>. 
:::
Choose the instructions for the client you want to run:

::::: tabs
:::: tab Lighthouse
```shell
sudo mkdir /srv/lighthouse

sudo chown $USER:$USER /srv/lighthouse
```

Next, make a folder for Lighthouse's chain data on the SSD.

If your chain data and OS live on the same SSD:
```shell
sudo mkdir /srv/lighthouse/lighthouse_data

sudo chown eth2:eth2 /srv/lighthouse/lighthouse_data
```

If they live on separate disks (e.g. an external SSD, as with the **Raspberry Pi**), then assuming that your SSD is mounted to `/mnt/rpdata`:
```shell
sudo mkdir /mnt/rpdata/lighthouse_data

sudo chown eth2:eth2 /mnt/rpdata/lighthouse_data
```

Now, grab [the latest Lighthouse release](https://github.com/sigp/lighthouse/releases/), or [build it from source](https://github.com/sigp/lighthouse/) if you want.

Copy `lighthouse` from the release archive into `/srv/lighthouse/`.
::::

:::: tab Nimbus
```shell
sudo mkdir /srv/nimbus

sudo chown $USER:$USER /srv/nimbus
```

Next, make a folder for Nimbus's chain data on the SSD.

If your chain data and OS live on the same SSD:
```shell
sudo mkdir /srv/nimbus/nimbus_data

sudo chown eth2:eth2 /srv/nimbus/nimbus_data
```

If they live on separate disks (e.g. an external SSD, as with the **Raspberry Pi**), then assuming that your SSD is mounted to `/mnt/rpdata`:
```shell
sudo mkdir /mnt/rpdata/nimbus_data

sudo chown eth2:eth2 /mnt/rpdata/nimbus_data
```

Now, grab [the latest Nimbus release](https://github.com/status-im/nimbus-eth2/releases), or [build it from source](https://github.com/status-im/nimbus-eth2/) if you want.

Copy `build/nimbus_beacon_node` from the release archive into `/srv/nimbus/`, optionally renaming it to `nimbus` (the rest of the guide assumes you have done this):

```shell
cp build/nimbus_beacon_node /srv/nimbus/nimbus
```
::::

:::: tab Prysm
```shell
sudo mkdir /srv/prysm

sudo chown $USER:$USER /srv/prysm
```

Next, make a folder for Prysm's chain data on the SSD.

If your chain data and OS live on the same SSD:
```shell
sudo mkdir /srv/prysm/prysm_data

sudo chown eth2:eth2 /srv/prysm/prysm_data
```

If they live on separate disks (e.g. an external SSD, as with the **Raspberry Pi**), then assuming that your SSD is mounted to `/mnt/rpdata`:
```shell
sudo mkdir /mnt/rpdata/prysm_data

sudo chown eth2:eth2 /mnt/rpdata/prysm_data
```

Now, grab [the latest Prysm binaries](https://github.com/prysmaticlabs/prysm/releases/), or [build them from source](https://github.com/prysmaticlabs/prysm/) if you want.

Specifically, you want to save the `beacon-chain-xxx` and `validator-xxx` binaries the release page archive into `/srv/prysm/` (and optionally, rename them to `beacon-chain` and `validator` - the rest of the guide assumes that you've done this).

::: warning NOTE
If you want to run on the **Prater testnet**, you will need Prater's `genesis.ssz` file to function correctly.
Download it like this:

```shell
sudo wget https://github.com/eth-clients/eth2-networks/raw/master/shared/prater/genesis.ssz -O /srv/prysm/genesis.ssz

sudo chown eth2:eth2 /srv/prysm/genesis.ssz
```
:::

::::

:::: tab Teku
```shell
sudo mkdir /srv/teku

sudo chown $USER:$USER /srv/teku

sudo mkhomedir_helper rp
```

Next, make a folder for Teku's chain data on the SSD.

If your chain data and OS live on the same SSD:
```shell
sudo mkdir /srv/teku/teku_data

sudo chown eth2:eth2 /srv/teku/teku_data
```

If they live on separate disks (e.g. an external SSD, as with the **Raspberry Pi**), then assuming that your SSD is mounted to `/mnt/rpdata`:
```shell
sudo mkdir /mnt/rpdata/teku_data

sudo chown eth2:eth2 /mnt/rpdata/teku_data
```

Teku needs Java 11 to function, ensure that you have it installed.
```shell
sudo apt install openjdk-11-jre -y
```

Now, grab [the latest Teku release](https://github.com/ConsenSys/teku/releases/), or [build it from source](https://github.com/ConsenSys/teku/) if you want.

Copy the `bin` and `lib` folders from the release archive into `/srv/teku/`.
::::
:::::


Next, create a systemd service for your consensus client.
The following are examples that show typical command line arguments to use in each one:

::::: tabs
:::: tab Lighthouse x64
The following assumes you use the default data folder at: `/srv/lighthouse/lighthouse_data`.
If you have a different configuration, like an external SSD, replace all instances of that below with your own folder.
```shell
sudo nano /etc/systemd/system/lh-bn.service
```

Contents:
```
[Unit]
Description=Lighthouse Beacon Node
After=network.target

[Service]
Type=simple
User=eth2
Restart=always
RestartSec=5
ExecStart=/srv/lighthouse/lighthouse beacon \
  --network mainnet \
  --datadir /srv/lighthouse/lighthouse_data \
  --port 9001 \
  --discovery-port 9001 \
  --http \
  --http-port 5052 \
  --eth1-blocks-per-log-query 150 \
  --disable-upnp \
  --execution-endpoint http://127.0.0.1:8551 \
  --execution-jwt /secrets/jwtsecret \
  --builder http://127.0.0.1:18550

[Install]
WantedBy=multi-user.target
```

::: warning NOTE
The above configuration is for the **Ethereum mainnet**.
If you want to use the **Prater testnet** instead, replace the `--network mainnet` flag in the `ExecStart` string with `--network prater`.
:::

::::

:::: tab Nimbus x64
The following assumes you use the default data folder at: `/srv/nimbus/nimbus_data`.
If you have a different configuration, like an external SSD, replace all instances of that below with your own folder.
```shell
sudo nano /etc/systemd/system/nimbus.service
```

Contents:
```
[Unit]
Description=Nimbus
After=network.target

[Service]
Type=simple
User=eth2
Restart=always
RestartSec=5
EnvironmentFile=/srv/rocketpool/data/validators/rp-fee-recipient-env.txt
ExecStart=/srv/nimbus/nimbus \
  --non-interactive \
  --network=mainnet \
  --data-dir=/srv/nimbus/nimbus_data \
  --insecure-netkey-password \
  --validators-dir=/srv/rocketpool/data/validators/nimbus/validators \
  --secrets-dir=/srv/rocketpool/data/validators/nimbus/secrets \
  --graffiti="RP Nimbus" \
  --tcp-port=9001 \
  --udp-port=9001 \
  --rest \
  --rest-port=5052 \
  --num-threads=0 \
  --payload-builder=true \
  --payload-build-url=http://127.0.0.1:18550 \
  --web3-url=ws://127.0.0.1:8551 \
  --jwt-secret="/secrets/jwtsecret" \
  --suggested-fee-recipient=${FEE_RECIPIENT}

[Install]
WantedBy=multi-user.target
```

::: warning NOTE
The above configuration is for the **Ethereum mainnet**. 
If you want to use the **Prater testnet** instead, replace the `--network=mainnet` flag in the `ExecStart` string with `--network=prater`.
:::

Now, create the validator folders that Nimbus needs because it will crash without them:
```
sudo mkdir -p /srv/rocketpool/data/validators/nimbus/validators

sudo mkdir -p /srv/rocketpool/data/validators/nimbus/secrets

sudo chown eth2:eth2 /srv/rocketpool/data/validators/ -R
```

Next, we have to give the `rp` user the ability to restart the validator client when new validator keys are created.

Open the `sudoers` file:
```shell
sudo visudo
```

Add this line under `# Cmnd alias specification`:
```
Cmnd_Alias RP_CMDS = /usr/bin/systemctl restart nimbus
```

Add this line under `# User privilege specification`:
```
rp    ALL=(ALL) NOPASSWD: RP_CMDS
```

That whole section should now look like this:
```
# Cmnd alias specification
Cmnd_Alias RP_CMDS = /usr/bin/systemctl restart nimbus

# User privilege specification
root    ALL=(ALL:ALL) ALL
rp    ALL=(ALL) NOPASSWD: RP_CMDS
```

Finally, modify `/srv/rocketpool/restart-vc.sh`:
- Uncomment the line at the end and change it to `sudo systemctl restart nimbus`
::::
:::: tab Prysm x64
The following assumes you use the default data folder at: `/srv/prysm/prysm_data`.
If you have a different configuration, like an external SSD, replace all instances of that below with your own folder.
```shell
sudo nano /etc/systemd/system/prysm-bn.service
```

Contents:
```
[Unit]
Description=Prysm Beacon Node
After=network.target

[Service]
Type=simple
User=eth2
Restart=always
RestartSec=5
ExecStart=/srv/prysm/beacon-chain \
  --accept-terms-of-use \
  --mainnet \
  --datadir /srv/prysm/prysm_data \
  --p2p-tcp-port 9001 \
  --p2p-udp-port 9001 \
  --rpc-port 5053 \
  --grpc-gateway-port 5052 \
  --eth1-header-req-limit 150 \
  --execution-endpoint http://localhost:8551 \
  --jwt-secret /secrets/jwtsecret \
  --http-mev-relay http://127.0.0.1:18550 \

[Install]
WantedBy=multi-user.target
```

::: warning NOTE
The above configuration is for the **Ethereum mainnet**.
If you want to use the **Prater testnet** instead, replace the `--mainnet \` argument with these two arguments:
```
  --prater \
  --genesis-state /srv/prysm/genesis.ssz \
```
:::

::::
:::: tab Teku x64
The following assumes you use the default data folder at: `/srv/teku/teku_data`.
If you have a different configuration, like an external SSD, replace all instances of that below with your own folder.
```shell
sudo nano /etc/systemd/system/teku-bn.service
```

Contents:
```
[Unit]
Description=Teku Beacon Node
After=network.target

[Service]
Type=simple
User=eth2
Restart=always
RestartSec=5
ExecStart=/srv/teku/bin/teku \
  --network=mainnet \
  --data-path=/srv/teku/teku_data \
  --p2p-port=9001 \
  --rest-api-enabled \
  --rest-api-port=5052 \
  --eth1-deposit-contract-max-request-size=150 \
  --ee-endpoint http://localhost:8551 \
  --ee-jwt-secret-file "/secrets/jwtsecret" \

[Install]
WantedBy=multi-user.target
```

::: warning NOTE
The above configuration is for the **Ethereum mainnet**.
If you want to use the **Prater testnet** instead, replace the `--network=mainnet` flag in the `ExecStart` string with `--network=prater`.
:::

::::
:::: tab Lighthouse arm64
The following assumes you have a separate SSD for your chain data mounted to `/mnt/rpdata`.
If you have a different configuration, replace all instances of that below with your own folder.

```shell
sudo nano /etc/systemd/system/lh-bn.service
```

Contents:
```
[Unit]
Description=Lighthouse Beacon Node
After=network.target

[Service]
Type=simple
User=eth2
Restart=always
RestartSec=5
ExecStart=ionice -c 2 -n 0 /srv/lighthouse/lighthouse beacon \
  --network mainnet \
  --datadir /mnt/rpdata/lighthouse_data \
  --port 9001 \
  --discovery-port 9001 \
  --http \
  --http-port 5052 \
  --eth1-blocks-per-log-query 150 \
  --disable-upnp \
  --execution-endpoint http://127.0.0.1:8551 \
  --execution-jwt /secrets/jwtsecret \
  --builder http://127.0.0.1:18550

[Install]
WantedBy=multi-user.target
```
::: warning NOTE
The above configuration is for the **Ethereum mainnet**.
If you want to use the **Prater testnet** instead, replace the `--network=mainnet` flag in the `ExecStart` string with `--network=prater`.
:::
Some notes:
- The user is set to `eth2`.
- For arm64 systems, the `ionice -c 2 -n 0` command tells your system to give your consensus client the highest possible priority for disk I/O (behind critical system processes), so it can process and attest as quickly as possible.
::::
:::: tab Nimbus arm64
Note that since Nimbus runs the consensus client and validator client together, you only need to make one service to act as both.

The following assumes you have a separate SSD for your chain data mounted to `/mnt/rpdata`.
If you have a different configuration, replace all instances of that below with your own folder.

```shell
sudo nano /etc/systemd/system/nimbus.service
```

Contents:
```
[Unit]
Description=Nimbus
After=network.target

[Service]
Type=simple
User=eth2
Restart=always
RestartSec=5
EnvironmentFile=/srv/rocketpool/data/validators/rp-fee-recipient-env.txt
ExecStart=ionice -c 2 -n 0 /srv/nimbus/nimbus \
  --max-peers=60 \
  --non-interactive \
  --network=mainnet \
  --data-dir=/mnt/rpdata/nimbus_data \
  --insecure-netkey-password \
  --validators-dir=/srv/rocketpool/data/validators/nimbus/validators \
  --secrets-dir=/srv/rocketpool/data/validators/nimbus/secrets \
  --graffiti="RP Nimbus" \
  --tcp-port=9001 \
  --udp-port=9001 \
  --rest \
  --rest-port=5052 \
  --num-threads=0 \
  --payload-builder=true \
  --payload-builder-url=http://127.0.0.1:18550 \
  --web3-url=ws://127.0.0.1:8551 \
  --jwt-secret="/secrets/jwtsecret" \
  --suggested-fee-recipient=${FEE_RECIPIENT}

[Install]
WantedBy=multi-user.target
```
::: warning NOTE
The above configuration is for the **Ethereum mainnet**.
If you want to use the **Prater testnet** instead, replace the `--network=mainnet` flag in the `ExecStart` string with `--network=prater`.
:::
Some notes:
- The user is set to `eth2`.
- The `ionice -c 2 -n 0` command tells your system to give your consensus client the highest possible priority for disk I/O (behind critical system processes), so it can process and attest as quickly as possible.
- Change the `--graffiti` to whatever you want.
- By default, Nimbus tries to connect to 160 peers. We change it here to `--max-peers=60` to lighten the CPU load a little, but you're free to experiement with this setting if you want.

Now, create the validator folders that Nimbus needs because it stops responding without them:
```shell
sudo mkdir -p /srv/rocketpool/data/validators/nimbus/validators

sudo mkdir -p /srv/rocketpool/data/validators/nimbus/secrets

sudo chown eth2:eth2 /srv/rocketpool/data/validators/ -R
```

Next, we have to give the `rp` user the ability to restart the validator client when new validator keys are created.

Open the `sudoers` file:
```shell
sudo nano /etc/sudoers
```

Add this line under `# Cmnd alias specification`:
```
Cmnd_Alias RP_CMDS = /usr/bin/systemctl restart nimbus
```

Add this line under `# User privilege specification`:
```
rp    ALL=(ALL) NOPASSWD: RP_CMDS
```

That whole section should now look like this:
```
# Cmnd alias specification
Cmnd_Alias RP_CMDS = /usr/bin/systemctl restart nimbus

# User privilege specification
root    ALL=(ALL:ALL) ALL
rp    ALL=(ALL) NOPASSWD: RP_CMDS
```

Finally, modify `/srv/rocketpool/restart-vc.sh`:
- Uncomment the line at the end and change it to `sudo systemctl restart nimbus`
::::
:::: tab Prysm arm64
The following assumes you have a separate SSD for your chain data mounted to `/mnt/rpdata`.
If you have a different configuration, replace all instances of that below with your own folder.
```shell
sudo nano /etc/systemd/system/prysm-bn.service
```

Contents:
```
[Unit]
Description=Prysm Beacon Node
After=network.target

[Service]
Type=simple
User=eth2
Restart=always
RestartSec=5
ExecStart=ionice -c 2 -n 0 /srv/prysm/beacon-chain \
  --accept-terms-of-use \
  --mainnet \
  --datadir /mnt/rpdata/prysm_data \
  --p2p-tcp-port 9001 \
  --p2p-udp-port 9001 \
  --rpc-port 5053 \
  --grpc-gateway-port 5052 \
  --eth1-header-req-limit 150 \
  --execution-endpoint http://localhost:8551 \
  --jwt-secret /secrets/jwtsecret \
  --http-mev-relay http://127.0.0.1:18550 \

[Install]
WantedBy=multi-user.target
```
::: warning NOTE
The above configuration is for the **Ethereum mainnet**.
If you want to use the **Prater testnet** instead, replace the `--mainnet \` argument with these two arguments:
```
  --prater \
  --genesis-state /srv/prysm/genesis.ssz \
```
:::
Some notes:
- The user is set to `eth2`.
- The `ionice -c 2 -n 0` command tells your system to give your consensus client the highest possible priority for disk I/O (behind critical system processes), so it can process and attest as quickly as possible.
::::
:::: tab Teku arm64
The following assumes you have a separate SSD for your chain data mounted to `/mnt/rpdata`.
If you have a different configuration, replace all instances of that below with your own folder.

```shell
sudo nano /etc/systemd/system/teku-bn.service
```

Contents:
```
[Unit]
Description=Teku Beacon Node
After=network.target

[Service]
Type=simple
User=eth2
Restart=always
RestartSec=5
ExecStart=ionice -c 2 -n 0 /srv/teku/bin/teku \ 
  --network=mainnet \
  --data-path=/mnt/rpdata/teku_data \
  --p2p-port=9001 \
  --rest-api-enabled \
  --rest-api-port=5052 \
  --eth1-deposit-contract-max-request-size=150
  --ee-endpoint http://localhost:8551 \
  --ee-jwt-secret-file "/secrets/jwtsecret" \

[Install]
WantedBy=multi-user.target
```
::: warning NOTE
The above configuration is for the **Ethereum mainnet**. 
If you want to use the **Prater testnet** instead, replace the `--network=mainnet` flag in the `ExecStart` string with `--network=prater`.
:::
Some notes:
- The user is set to `eth2`.
- For arm64 systems, the `ionice -c 2 -n 0` command tells your system to give your consensus client the highest possible priority for disk I/O (behind critical system processes), so it can process and attest as quickly as possible.
::::
:::::

Next, add a log watcher script in the folder you put your consensus client into:

:::: tabs
::: tab Lighthouse
```shell
sudo nano /srv/lighthouse/bn-log.sh
```

The contents should be this:
```
#!/bin/bash
journalctl -u lh-bn -b -f
```

Make it executable:
```shell
sudo chmod +x /srv/lighthouse/bn-log.sh
```
:::
::: tab Nimbus
```shell
sudo nano /srv/nimbus/log.sh
```

The contents should be this:
```
#!/bin/bash
journalctl -u nimbus -b -f
```

Make it executable:
```shell
sudo chmod +x /srv/nimbus/log.sh
```
:::
::: tab Prysm
```shell
sudo nano /srv/prysm/bn-log.sh
```

The contents should be this:
```
#!/bin/bash
journalctl -u prysm-bn -b -f
```

Make it executable:
```shell
sudo chmod +x /srv/prysm/bn-log.sh
```
:::
::: tab Teku
```shell
sudo nano /srv/teku/bn-log.sh
```

The contents should be this:
```
#!/bin/bash
journalctl -u teku-bn -b -f
```

Make it executable:
```shell
sudo chmod +x /srv/teku/bn-log.sh
```
:::
::::

With that, the consensus client is all set.
On to the validator client!


## Installing the Validator Client

::: tip NOTE
Nimbus doesn't use a separate validator client at this time, so if you're using Nimbus, you can skip this section. 
:::

First, create a systemd service for your validator client.
The following are examples that show typical command line arguments to use in each one:

::::: tabs
:::: tab Lighthouse
```shell
sudo nano /etc/systemd/system/lh-vc.service
```

Contents:
```
[Unit]
Description=Lighthouse Validator
After=network.target

[Service]
Type=simple
User=rp
Restart=always
RestartSec=5
EnvironmentFile=/srv/rocketpool/data/validators/rp-fee-recipient-env.txt
ExecStart=/srv/lighthouse/lighthouse validator \
  --network mainnet \
  --datadir /srv/rocketpool/data/validators/lighthouse \
  --init-slashing-protection \
  --beacon-node "http://localhost:5052" \
  --graffiti "RP Lighthouse" \
  --builder-proposals \
  --suggested-fee-recipient ${FEE_RECIPIENT}

[Install]
WantedBy=multi-user.target
```

::: warning NOTE
The above configuration is for the **Ethereum mainnet**.
If you want to use the **Prater testnet** instead, replace the `--network mainnet` flag in the `ExecStart` string with `--network prater`.
:::

::::
:::: tab Prysm
```shell
sudo nano /etc/systemd/system/prysm-vc.service
```

Contents:
```
[Unit]
Description=Prysm Validator
After=network.target

[Service]
Type=simple
User=rp
Restart=always
RestartSec=5
EnvironmentFile=/srv/rocketpool/data/validators/rp-fee-recipient-env.txt
ExecStart=/srv/prysm/validator \
  --accept-terms-of-use \
  --mainnet \
  --wallet-dir /srv/rocketpool/data/validators/prysm-non-hd \
  --wallet-password-file /srv/rocketpool/data/validators/prysm-non-hd/direct/accounts/secret \
  --beacon-rpc-provider "localhost:5053" \
  --graffiti "RP Prysm" \
  --enable-builder \
  --suggested-fee-recipient ${FEE_RECIPIENT}

[Install]
WantedBy=multi-user.target
```
::: warning NOTE
The above configuration is for the **Ethereum mainnet**.
If you want to use the **Prater testnet** instead, replace the `--mainnet` flag in the `ExecStart` string with `--prater`.
:::

::::
:::: tab Teku
```shell
sudo nano /etc/systemd/system/teku-vc.service
```

Contents:
```
[Unit]
Description=Teku Validator
After=network.target

[Service]
Type=simple
User=rp
Restart=always
RestartSec=5
EnvironmentFile=/srv/rocketpool/data/validators/rp-fee-recipient-env.txt
ExecStart=/srv/teku/bin/teku validator-client \
  --network=mainnet \
  --validator-keys=/srv/rocketpool/data/validators/teku/keys:/srv/rocketpool/data/validators/teku/passwords \
  --beacon-node-api-endpoint="http://localhost:5052" \
  --validators-graffiti="RP Teku" \
  --log-destination=CONSOLE \
  --data-base-path=/srv/rocketpool \
  --validators-proposer-default-fee-recipient=${FEE_RECIPIENT}

[Install]
WantedBy=multi-user.target
```

::: warning NOTE
The above configuration is for the **Ethereum mainnet**.
If you want to use the **Prater testnet** instead, replace the `--network=mainnet` flag in the `ExecStart` string with `--network=prater`.
:::
::::
:::::

Next, add a log watcher script in the folder you put your validator client into:

:::: tabs
::: tab Lighthouse
```shell
sudo nano /srv/lighthouse/vc-log.sh
```

The contents should be this:
```
#!/bin/bash
journalctl -u lh-vc -b -f
```

Make it executable:
```shell
sudo chmod +x /srv/lighthouse/vc-log.sh
```
:::
::: tab Prysm
```shell
sudo nano /srv/prysm/vc-log.sh
```

The contents should be this:
```
#!/bin/bash
journalctl -u prysm-vc -b -f
```

Make it executable:
```shell
sudo chmod +x /srv/prysm/vc-log.sh
```
:::
::: tab Teku
```shell
sudo nano /srv/teku/vc-log.sh
```

The contents should be this:
```
#!/bin/bash
journalctl -u teku-vc -b -f
```

Make it executable:
```shell
sudo chmod +x /srv/teku/vc-log.sh
```
:::
::::

Now, we have to give the `rp` user the ability to restart the validator client when new validator keys are created.

Open the `sudoers` file:
```shell
sudo nano /etc/sudoers
```

Add this line under `# Cmnd alias specification`, replacing `<validator service name>` with the name of your validator service (e.g. `lh-vc`, `prysm-vc`, or `teku-vc`)
```
Cmnd_Alias RP_CMDS = /usr/bin/systemctl restart <validator service name>
```

Add this line under `# User privilege specification`:
```
rp    ALL=(ALL) NOPASSWD: RP_CMDS
```

That whole section should now look like this:
```
# Cmnd alias specification
Cmnd_Alias RP_CMDS = /usr/bin/systemctl restart <validator service name>

# User privilege specification
root    ALL=(ALL:ALL) ALL
rp    ALL=(ALL) NOPASSWD: RP_CMDS
```

Finally, modify `/srv/rocketpool/restart-vc.sh`:
- Uncomment the line at the end and change it to `sudo systemctl restart <validator service name>`


## Installing MEV-Boost
MEV-Boost is the system Flashbots provides to give Maximum Extractable Value (MEV) rewards to validators when they propose a block. These rewards are in excess of the standard block reward and gas fees that accompany block proposals. The rewards are generated by including, excluding, and changing the order of transactions in proposed blocks. 

When configuring MEV-Boost, you must select one or more relays that you want to use with your validator, where each relay corresponds to an external block builder. When your validator is randomly selected to propose a block, these relays compete to build a block whose rewards exceed those you would receive by using your validator's default block-building method. Your validator automatically selects the highest paying block from among those built by your participating relays and proposes that block for inclusion in the blockchain.

::: warning NOTE
Relays can differ significantly by the strategies they use to build a block. Some relays attempt only to maximize rewards (maximum extraction), others omit transactions associated with specific addresses (for OFAC compliance), while others attempt to build ethical blocks by not front-running transactions or using [sandwich attacks](https://trustwallet.com/blog/how-to-protect-yourself-from-sandwich-attacks). Consequently, it's important to research the [trusted relay providers](./mev.md#block-builders-and-relays) supported by the Rocket Pool protocol before selecting those you want to use with your validator. For more information, see [MEV, MEV-Boost, and MEV Rewards](./mev.md).
:::

### Installing pre-requisites
Prior to installing MEV-Boost, you must install these pre-requisites:
- [Go 1.18 or later](https://go.dev/doc/install).
   You can verify that you have successfully completed the installation by displaying the installed go version:
   ```shell
   go version
   ```
- Build dependencies:
   :::: tabs

   ::: tab Linux x64
   ```shell
   sudo apt -y install build-essential
   ```
   :::

   ::: tab Linux arm64
   ```shell
   sudo apt -y install build-essential
   ```
   :::

### Installing MEV-Boost
Install the latest version of MEV-Boost using ```go install```:
```shell
CGO_CFLAGS="-O -D__BLST_PORTABLE__" go install github.com/flashbots/mev-boost@latest
```
This command installs MEV-Boost in `$HOME/go/bin`.
Move the binary to the standard directory for packages not managed by the distribution package manager:
```shell
sudo mv $HOME/go/bin/mev-boost /usr/local/bin
```
Next, define the systemd service file that runs MEV-Boost using the ```mevboost``` user account you created previously:
```shell
sudo nano /etc/systemd/system/mev-boost.service
```
Contents:
```
[Unit]
Description=mev-boost (Mainnet)
Wants=network-online.target
After=network-online.target

[Service]
Type=simple
User=mevboost
Group=mevboost
Restart=always
RestartSec=5
ExecStart=mev-boost \
    -mainnet \
    -relay-check \
    -relays https://example1.com,https://example2.com,https://example3.com

[Install]
WantedBy=multi-user.target
```
In the ```ExecStart``` command, replace the example relays with the URLs of the Rocket Pool-supported relays that you want to use with your validator. You can use more or fewer comma-delimited relays than the three examples shown above.

::: danger WARNING
When selecting relays, you must use the [trusted relay providers](./mev.md#block-builders-and-relays) supported by the Rocket Pool protocol. If your Rocket Pool validator proposes a block that was composed by an untrusted relay, the Oracle DAO will flag you for cheating and possibly stealing MEV from the rETH stakers. This will result in [a penalty](https://github.com/rocket-pool/rocketpool-research/blob/master/Penalties/penalty-system.md) on your minipool!
:::

::: tip NOTE
If you are running the Teku consensus client, then additional configuration steps are required to enable MEV-Boost later (after you have determine your node's fee distributor address). For more information, see [Configuring MEV-Boost in the Smartnode](./mev.md#configuring-mev-boost-in-the-smartnode). 
:::

The services are now installed.

## Configuring the Smartnode

Now that your services are all created, it's time to configure the Smartnode stack.

Please visit the [Configuring the Smartnode Stack (Native Mode)](./config-native.md) guide, and return here when you are finished.


## Enabling and Running the Services

With all of the services installed, it's time to:

- Enable them so they'll automatically restart if they break, and automatically start on a reboot.
- Start them all!

:::: tabs
::: tab Lighthouse
```shell
sudo systemctl daemon-reload

sudo systemctl enable geth lh-bn lh-vc mev-boost rp-node rp-watchtower

sudo systemctl start geth lh-bn lh-vc mev-boost rp-node rp-watchtower
```
:::
::: tab Nimbus
```shell
sudo systemctl daemon-reload

sudo systemctl enable geth nimbus mev-boost rp-node rp-watchtower

sudo systemctl start geth nimbus mev-boost rp-node rp-watchtower
```
:::
::: tab Prysm
```shell
sudo systemctl daemon-reload

sudo systemctl enable geth prysm-bn prysm-vc mev-boost rp-node rp-watchtower

sudo systemctl start geth prysm-bn prysm-vc mev-boost rp-node rp-watchtower
```
:::
::: tab Teku
```shell
sudo systemctl daemon-reload

sudo systemctl enable geth teku-bn teku-vc mev-boost rp-node rp-watchtower

sudo systemctl start geth teku-bn teku-vc mev-boost rp-node rp-watchtower
```
:::
::::

The last step is to create a wallet with `rp wallet init` or `rp wallet restore`.
After that's done, change the permissions on the password and wallet files so the Rocket Pool CLI, node, and watchtower can all use them:
```shell
sudo chown rp:rp -R /srv/rocketpool/data

sudo chmod -R 775 /srv/rocketpool/data

sudo chmod 660 /srv/rocketpool/data/password

sudo chmod 660 /srv/rocketpool/data/wallet
```

And with that, you're now ready to secure your operating system to protect your node. In this case, move on to the [Securing your Node](./securing-your-node.md) section next.