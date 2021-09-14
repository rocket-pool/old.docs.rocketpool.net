# Configuring a Native Rocket Pool Node without Docker

In this section, we will walk through the process of installing the Rocket Pool Smartnode stack natively onto your system, without the use of Docker containers.

The general plan is as follows:
- Create system services for the Rocket Pool components (the **node** process, and optionally the **watchtower** process if you are an Oracle Node)
- Create a system service for the ETH1 client
- Create a system service for the ETH2 beacon client
- Create a system service for the ETH2 validator client
- Configure Rocket Pool to use communicate with those services

This is a fairly involved setup so it will take some time to complete.

The diversity of Operating Systems and distros available make it impractical to make guides available for all of them.
The instructions in this guide are tailored to a Debian-based system (including Ubuntu).
For other distros or operating systems, you may follow the high-level steps described in the guide but will have to substitute certain commands for the ones that your system uses as appropriate.

::: warning
This guide is intended for users that are experienced with Linux system administration and usage.
This includes using the terminal, creating system accounts, managing permissions, and installing services. 
**If you are not familiar with these activites, we do not recommend that you use the native mode.**
:::


## Creating Service Accounts

The first step is to create new system accounts for the services and disable logins and shell access for them.
The reason for having separate user accounts is practical: if your ETH1 or ETH2 clients have a major vulnerability like an [Arbitrary Code Execution](https://en.wikipedia.org/wiki/Arbitrary_code_execution) exploit, doing this will limit the amount of damage an attacker can actually do since they're running on an account with limited permissions.

We're going to create one account for your ETH1 client, one for your ETH2 client, and one for both Rocket Pool and the validator client.
The sharing is necessary because Rocket Pool will create the validator's key files once you create a new minipool, and it will set the permissions so that only its own user has access to them.
If you're using **Nimbus** for your ETH2 client, then it will share an account with Rocket Pool instead since it doesn't have a separate validator client. 

Start by creating an account for your ETH1 client, which we'll call `eth1`:
```
sudo useradd -r -s /sbin/nologin eth1
```

Do the same for your ETH2 client, which we'll call `eth2`:
```
sudo useradd -r -s /sbin/nologin eth2
```

Finally, make one for the validator and Rocket Pool, which we'll call `rp`:
```
sudo useradd -r -s /sbin/nologin rp
```

::: tip NOTE
If you're using Nimbus, ignore the `rp` account.
Any time you see it used in this guide, just substitute it with `eth2` instead.
:::

Now, add yourself to the `rp` group.
You'll need to do this in order to use the Rocket Pool CLI, because it and the Rocket Pool daemon both need to access the ETH1 wallet file.
```
sudo usermod -aG rp $USER
```

After this, logout and back in for the changes to take effect.


## Installing Rocket Pool

### Setting up the Binaries
Start by making a folder for Rocket Pool and a data subfolder.
You can put this wherever you want; for this guide, I'll put it into `/srv`:
```
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

Next, grab the installation package - we're going to throw almost everything in here away since it's meant to support docker installs, but we need to copy two files:
1. The config file that Rocket Pool uses to understand the directories and routes for everything
2. The script that lets Rocket Pool restart the validator service once a new minipool is created (so it can load the new keys)

We also need to create the `settings.yml` file that holds all of your node's specific configuration details.

::: tip NOTE
The configuration for the **Ethereum mainnet** is different from the configuration for the **Prater testnet**!
Choose which one you want to use, and follow the appropriate tab below.
:::

Follow these steps for your system's architecture:

:::: tabs
::: tab x64 on Mainnet
```shell
cd /tmp

wget https://github.com/rocket-pool/smartnode-install/releases/latest/download/rp-smartnode-install-amd64.tar.xz

tar xf rp-smartnode-install-amd64.tar.xz

cp amd64/rp-smartnode-install/network/mainnet/config.yml /srv/rocketpool

cp amd64/rp-smartnode-install/network/mainnet/chains/eth2/restart-validator.sh /srv/rocketpool

touch -a /srv/rocketpool/settings.yml

cd /srv/rocketpool
```
:::

::: tab arm64 on Mainnet
```shell
cd /tmp

wget https://github.com/rocket-pool/smartnode-install/releases/latest/download/rp-smartnode-install-arm64.tar.xz

tar xf rp-smartnode-install-arm64.tar.xz

cp arm64/rp-smartnode-install/network/mainnet/config.yml /srv/rocketpool

cp arm64/rp-smartnode-install/network/mainnet/chains/eth2/restart-validator.sh /srv/rocketpool

touch -a /srv/rocketpool/settings.yml

cd /srv/rocketpool
```
:::

::: tab x64 on the Testnet
```shell
cd /tmp

wget https://github.com/rocket-pool/smartnode-install/releases/latest/download/rp-smartnode-install-amd64.tar.xz

tar xf rp-smartnode-install-amd64.tar.xz

cp amd64/rp-smartnode-install/network/prater/config.yml /srv/rocketpool

cp amd64/rp-smartnode-install/network/prater/chains/eth2/restart-validator.sh /srv/rocketpool

touch -a /srv/rocketpool/settings.yml

cd /srv/rocketpool
```
:::

::: tab arm64 on the Testnet
```shell
cd /tmp

wget https://github.com/rocket-pool/smartnode-install/releases/latest/download/rp-smartnode-install-arm64.tar.xz

tar xf rp-smartnode-install-arm64.tar.xz

cp arm64/rp-smartnode-install/network/prater/config.yml /srv/rocketpool

cp arm64/rp-smartnode-install/network/prater/chains/eth2/restart-validator.sh /srv/rocketpool

touch -a /srv/rocketpool/settings.yml

cd /srv/rocketpool
```
:::
::::


Now, open `config.yml` in `nano` or your editor of choice, and make the following changes:
- Change `smartnode.passwordPath` to `passwordPath: /srv/rocketpool/data/password`
- Change `smartnode.walletPath` to `walletPath: /srv/rocketpool/data/wallet`
- Change `smartnode.validatorKeychainPath` to `validatorKeychainPath: /srv/rocketpool/data/validators`
- Change `smartnode.validatorRestartCommand` to `validatorRestartCommand: "/srv/rocketpool/restart-validator.sh"`
- Change `chains.eth1.provider` to `provider: http://127.0.0.1:8545`
- Change `chains.eth1.wsProvider` to `wsProvider: ws://127.0.0.1:8546`
- Change `chains.eth2.provider` to `provider: http://127.0.0.1:5052`

Now open `~/.profile` with your editor of choice and add this line to the end:
```
alias rp="rocketpool -d /usr/local/bin/rocketpoold -c /srv/rocketpool"
```

Save it, then reload your profile:
```
source ~/.profile
```

This will let you interact with Rocket Pool's CLI with the `rp` command, which is a nice shortcut.

Finally, run the Rocket Pool configuration:
```
rp service config
```

Select your ETH1 and ETH2 clients of choice.
The actual settings you choose don't matter (you'll be specifying them manually in the command line strings for each service when you create services for them), so just pick the defaults.


### Creating the Services

Next up, we'll create a `systemd` service for the Rocket Pool node daemon.
This is the service that will automatically check for and claim RPL rewards after each checkpoint, and stake minipools once you've created them via `node deposit`.

Optionally, if you're an Oracle DAO member, create the corresponding `watchtower` service as well.
If you are not an Oracle DAO member, you can ignore that service.

:::: tabs

::: tab Node

Create the `rp-node` service:
```
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
ExecStart=/usr/local/bin/rocketpoold --config /srv/rocketpool/config.yml --settings /srv/rocketpool/settings.yml node

[Install]
WantedBy=multi-user.target
```

Create a log file for the service, so you can watch its output - this will replace the behavior of `rocketpool service logs node`:
```
nano /srv/rocketpool/node-log.sh
```
Contents:
```
#!/bin/bash
journalctl -u rp-node -b -f
```

Save it, then make it executable:
```
chmod +x /srv/rocketpool/node-log.sh
```

Now you can watch the node's logs by simply running `$ /srv/rocketpool/node-log.sh`.
:::

::: tab Watchtower
Create a service for the watchtower:
```
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
ExecStart=/usr/local/bin/rocketpoold --config /srv/rocketpool/config.yml --settings /srv/rocketpool/settings.yml watchtower

[Install]
WantedBy=multi-user.target
```

Create a log file for the watchtower:
```
nano /srv/rocketpool/watchtower-log.sh
```
Contents:
```
#!/bin/bash
journalctl -u rp-watchtower -b -f
```

Save it, then make it executable:
```
chmod +x /srv/rocketpool/watchtower-log.sh
```
:::

::::

## Installing ETH1

For the sake of simplicity, we're going to use Geth as our example during this guide.
If you have another client in mind, adapt these instructions to that client accordingly.

Start by making a folder for the Geth binary and the log script:
```
sudo mkdir /srv/geth

sudo chown $USER:$USER /srv/geth
```

Next, make a folder for the chain data on the SSD.
Pick the set up that you have below:
:::: tabs

::: tab Same SSD as the OS
```
sudo mkdir /srv/geth/geth_data

sudo chown eth1:eth1 /srv/geth/geth_data
```
:::

::: tab Separate SSD (Raspberry Pi)
This assumes that your SSD is mounted on a folder like `/mnt/rpdata`; substitute it accordingly with the folder you used.
```
sudo mkdir /mnt/rpdata/geth_data

sudo chown eth1:eth1 /mnt/rpdata/geth_data
```
:::

::::


Now, grab [the latest Geth binary](https://geth.ethereum.org/downloads/) for your architecture, or [build it from source](https://github.com/ethereum/go-ethereum/) if you want.
If you download it, it will be an archive.
Extract it and copy the contents of the `geth` folder to `/srv/geth`.
For example, if you have an x64 system:
```
cd /tmp

wget https://gethstore.blob.core.windows.net/builds/geth-linux-amd64-1.10.3-991384a7.tar.gz

tar xzf geth-linux-amd64-1.10.3-991384a7.tar.gz

cp geth-linux-amd64-1.10.3-991384a7/geth /srv/geth
```

Next, create a systemd service for Geth. You can use this as a template, and modify the command line arguments as you see fit:
```
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
ExecStart=/srv/geth/geth --datadir /srv/geth/geth_data --mainnet --http --http.port 8545 --http.api eth,net,personal,web3 --ws --ws.port 8546 --ws.api eth,net,personal,web3

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
ExecStart=taskset 0x0c ionice -c 3 /srv/geth/geth --mainnet --cache 512 --maxpeers 12 --datadir /mnt/rpdata/geth_data --http --http.port 8545 --http.api eth,net,personal,web3 --ws --ws.port 8546 --ws.api eth,net,personal,web3

[Install]
WantedBy=multi-user.target
```

Note that the `taskset 0x0c ionice -c 3` at the start is meant for Raspberry Pi's or other similarly low-power systems:

- `taskset 0x0c` constrains Geth to only run on CPUs 2 and 3. This way, it won't interfere with the ETH2 client.
- `ionice -c 3` tells the system that Geth's disk access is a super low priority - if ETH2 needs to access the SSD, it will always have priority over Geth.

You can omit that prefix if you're not on a low-power system.
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
- You can optionally use the `--maxpeers` flag to lower the peer count. The peer count isn't very important for the ETH1 node, and lowering it can free up some extra resources if you need them.

Lastly, add a log watcher script so you can check on Geth to see how it's doing:
```
sudo nano /srv/geth/log.sh
```

Contents:
```
#!/bin/bash
journalctl -u geth -b -f
```

Make it executable:
```
sudo chmod +x /srv/geth/log.sh
```

Now you can see the Geth logs by doing `$ /srv/geth/log.sh`.
This replaces the behavior that `rocketpool service logs eth1` used to provide, since it can't do that without Docker.

All set on the ETH1 client; now for ETH2.


## Installing ETH2

Start by making a folder for your ETH2 binary and log script.
Choose the instructions for the client you want to run:

::::: tabs
:::: tab Lighthouse
```
sudo mkdir /srv/lighthouse

sudo chown $USER:$USER /srv/lighthouse
```

Next, make a folder for Lighthouse's chain data on the SSD.

If your chain data and OS live on the same SSD:
```
sudo mkdir /srv/lighthouse/lighthouse_data

sudo chown eth2:eth2 /srv/lighthouse/lighthouse_data
```

If they live on separate disks (e.g. an external SSD, as with the **Raspberry Pi**), then assuming that your SSD is mounted to `/mnt/rpdata`:
```
sudo mkdir /mnt/rpdata/lighthouse_data

sudo chown eth2:eth2 /mnt/rpdata/lighthouse_data
```

Now, grab [the latest Lighthouse release](https://github.com/sigp/lighthouse/releases/), or [build it from source](https://github.com/sigp/lighthouse/) if you want.

Copy `lighthouse` from the release archive into `/srv/lighthouse/`.
:::: 

:::: tab Nimbus
```
sudo mkdir /srv/nimbus

sudo chown $USER:$USER /srv/nimbus
```

Next, make a folder for Nimbus's chain data on the SSD.

If your chain data and OS live on the same SSD:
```
sudo mkdir /srv/nimbus/nimbus_data

sudo chown eth2:eth2 /srv/nimbus/nimbus_data
```

If they live on separate disks (e.g. an external SSD, as with the **Raspberry Pi**), then assuming that your SSD is mounted to `/mnt/rpdata`:
```
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
```
sudo mkdir /srv/prysm

sudo chown $USER:$USER /srv/prysm
```

Next, make a folder for Prysm's chain data on the SSD.

If your chain data and OS live on the same SSD:
```
sudo mkdir /srv/prysm/prysm_data

sudo chown eth2:eth2 /srv/prysm/prysm_data
```

If they live on separate disks (e.g. an external SSD, as with the **Raspberry Pi**), then assuming that your SSD is mounted to `/mnt/rpdata`:
```
sudo mkdir /mnt/rpdata/prysm_data

sudo chown eth2:eth2 /mnt/rpdata/prysm_data
```

Now, grab [the latest Prysm binaries](https://github.com/prysmaticlabs/prysm/releases/), or [build them from source](https://github.com/prysmaticlabs/prysm/) if you want.

Specifically, you want to save the `beacon-chain-xxx` and `validator-xxx` binaries the release page archive into `/srv/prysm/` (and optionally, rename them to `beacon-chain` and `validator` - the rest of the guide will assume you have done this).

::: warning NOTE
If you want to run on the **Prater testnet**, you will need Prater's `genesis.ssz` file to function correctly.
Download it like this:

```
sudo wget https://github.com/eth2-clients/eth2-networks/raw/master/shared/prater/genesis.ssz -O /srv/prysm/genesis.ssz

sudo chown eth2:eth2 /srv/prysm/genesis.ssz 
```
:::

::::

:::: tab Teku
```
sudo mkdir /srv/teku

sudo chown $USER:$USER /srv/teku
```

Next, make a folder for Teku's chain data on the SSD.

If your chain data and OS live on the same SSD:
```
sudo mkdir /srv/teku/teku_data

sudo chown eth2:eth2 /srv/teku/teku_data
```

If they live on separate disks (e.g. an external SSD, as with the **Raspberry Pi**), then assuming that your SSD is mounted to `/mnt/rpdata`:
```
sudo mkdir /mnt/rpdata/teku_data

sudo chown eth2:eth2 /mnt/rpdata/teku_data
```

Teku needs Java 11 to function, ensure that you have it installed.
```
sudo apt install openjdk-11-jre -y
```

Now, grab [the latest Teku release](https://github.com/ConsenSys/teku/releases/), or [build it from source](https://github.com/ConsenSys/teku/) if you want.

Copy the `bin` and `lib` folders from the release archive into `/srv/teku/`.
::::
:::::


Next, create a systemd service for your ETH2 client.
The following are examples that show typical command line arguments to use in each one:

::::: tabs
:::: tab Lighthouse x64
```
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
ExecStart=/srv/lighthouse/lighthouse beacon --network mainnet --datadir /srv/lighthouse/lighthouse_data --port 9001 --discovery-port 9001 --eth1 --eth1-endpoints http://localhost:8545 --http --http-port 5052 --eth1-blocks-per-log-query 150 --disable-upnp

[Install]
WantedBy=multi-user.target
```

::: warning NOTE
The above configuration is for the **Ethereum mainnet**.
If you want to use the **Prater testnet** instead, replace the `--network mainnet` flag in the `ExecStart` string with `--network prater`.
:::

:::: 

:::: tab Nimbus x64
```
sudo nano /etc/systemd/system/nimbus.service
```

Contents:
```
[Unit]
Description=Nimbus
After=network.target

[Service]
Type=simple
User=rp
Restart=always
RestartSec=5
ExecStart=/srv/nimbus/nimbus --non-interactive --network=mainnet --data-dir=/srv/nimbus/nimbus_data --insecure-netkey-password --validators-dir=/srv/rocketpool/data/validators/nimbus/validators --secrets-dir=/srv/rocketpool/data/validators/nimbus/secrets --graffiti="RP Nimbus" --web3-url=ws://localhost:8546 --tcp-port=9001 --udp-port=9001 --rpc --rpc-port=5052

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

sudo chown eth2:eth2 /srv/rocketpool/data/ -R
```

Next, we have to give the `rp` user the ability to restart the validator client when new validator keys are created.

Open the `sudoers` file:
```
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

Finally, modify `/srv/rocketpool/restart-validator.sh`:
- Uncomment the line at the end and change it to `sudo systemctl restart nimbus`
::::
:::: tab Prysm x64
```
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
ExecStart=/srv/prysm/beacon-chain --accept-terms-of-use --mainnet --datadir /srv/prysm/prysm_data --p2p-tcp-port 9001 --p2p-udp-port 9001 --http-web3provider http://localhost:8545 --rpc-port 5052 --eth1-header-req-limit 150

[Install]
WantedBy=multi-user.target
```

::: warning NOTE
The above configuration is for the **Ethereum mainnet**.
If you want to use the **Prater testnet** instead, replace the `ExecStart` string with the following:
```
ExecStart=/srv/prysm/beacon-chain --accept-terms-of-use --prater --genesis-state /srv/prysm/genesis.ssz --datadir /srv/prysm/prysm_data --p2p-tcp-port 9001 --p2p-udp-port 9001 --http-web3provider http://localhost:8545 --rpc-port 5052 --eth1-header-req-limit 150
```
:::

::::
:::: tab Teku x64
```
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
ExecStart=/srv/teku/bin/teku --network=mainnet --data-path=/srv/teku/teku_data --p2p-port=9001 --eth1-endpoint=9001 --rest-api-enabled --rest-api-port=5052 --eth1-deposit-contract-max-request-size=150

[Install]
WantedBy=multi-user.target
```

::: warning NOTE
The above configuration is for the **Ethereum mainnet**.
If you want to use the **Prater testnet** instead, replace the `--network=mainnet` flag in the `ExecStart` string with `--network=prater`.
:::

::: warning NOTE
If you are using a non-standard data path, you should edit the `--data-path` flag.
:::

::::
:::: tab Lighthouse arm64
The following assumes you have a separate SSD for your chain data mounted to `/mnt/rpdata`.
If you have a different configuration, replace all instances of that below with your own folder.

```
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
ExecStart=ionice -c 2 -n 0 /srv/lighthouse/lighthouse beacon --network mainnet --datadir /mnt/rpdata/lighthouse_data --port 9001 --discovery-port 9001 --eth1 --eth1-endpoints http://localhost:8545 --http --http-port 5052 --eth1-blocks-per-log-query 150 --disable-upnp

[Install]
WantedBy=multi-user.target
```

::: warning NOTE
The above configuration is for the **Ethereum mainnet**.
If you want to use the **Prater testnet** instead, replace the `--network=mainnet` flag in the `ExecStart` string with `--network=prater`.
:::

::::
:::: tab Nimbus arm64
Note that since Nimbus runs the beacon node and validator client together, you only need to make one service to act as both.

The following assumes you have a separate SSD for your chain data mounted to `/mnt/rpdata`.
If you have a different configuration, replace all instances of that below with your own folder.

```
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
ExecStart=taskset 0x01 ionice -c 2 -n 0 /srv/nimbus/nimbus --max-peers=60 --non-interactive --network=mainnet --data-dir=/mnt/rpdata/nimbus_data --insecure-netkey-password --validators-dir=/srv/rocketpool/data/validators/nimbus/validators --secrets-dir=/srv/rocketpool/data/validators/nimbus/secrets --graffiti="RP Nimbus" --web3-url=ws://localhost:8546 --tcp-port=9001 --udp-port=9001 --rpc --rpc-port=5052

[Install]
WantedBy=multi-user.target
```

::: warning NOTE
The above configuration is for the **Ethereum mainnet**.
If you want to use the **Prater testnet** instead, replace the `--network=mainnet` flag in the `ExecStart` string with `--network=prater`.
:::

Note the following:

- Nimbus is preceeded by `taskset 0x01`. Basically, this constrains Nimbus to only run on CPU 0 (since it's single threaded). If you followed the Geth guide for ETH1 (which constrained Geth to CPU 2 and 3), this will ensure that the processes don't overlap on the same core and will provide maximum performance.
- Change the `--graffiti` to whatever you want.
- By default, Nimbus will try to connect to 160 peers. We changed it here to `--max-peers=60` to lighten the CPU load a little, but you are free to experiement with this if you want.

Now, create the validator folders that Nimbus needs because it will crash without them:
```
sudo mkdir -p /srv/rocketpool/data/validators/nimbus/validators

sudo mkdir -p /srv/rocketpool/data/validators/nimbus/secrets

sudo chown eth2:eth2 /srv/rocketpool/data/ -R
```

Next, we have to give the `rp` user the ability to restart the validator client when new validator keys are created.

Open the `sudoers` file:
```
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

Finally, modify `/srv/rocketpool/restart-validator.sh`:
- Uncomment the line at the end and change it to `sudo systemctl restart nimbus`
::::
:::: tab Prysm arm64
The following assumes you have a separate SSD for your chain data mounted to `/mnt/rpdata`.
If you have a different configuration, replace all instances of that below with your own folder.

```
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
ExecStart=ionice -c 2 -n 0 /srv/prysm/beacon-chain --accept-terms-of-use --mainnet --datadir /mnt/rpdata/prysm_data --p2p-tcp-port 9001 --p2p-udp-port 9001 --http-web3provider http://localhost:8545 --rpc-port 5052 --eth1-header-req-limit 150

[Install]
WantedBy=multi-user.target
```

::: warning NOTE
The above configuration is for the **Ethereum mainnet**.
If you want to use the **Prater testnet** instead, replace the `ExecStart` string with the following:
```
ExecStart=ionice -c 2 -n 0 /srv/prysm/beacon-chain --accept-terms-of-use --prater --genesis-state /srv/prysm/genesis.ssz --datadir /mnt/rpdata/prysm_data --p2p-tcp-port 9001 --p2p-udp-port 9001 --http-web3provider http://localhost:8545 --rpc-port 5052 --eth1-header-req-limit 150
```
:::

::::
:::: tab Teku arm64
The following assumes you have a separate SSD for your chain data mounted to `/mnt/rpdata`.
If you have a different configuration, replace all instances of that below with your own folder.

```
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
ExecStart=ionice -c 2 -n 0 /srv/teku/bin/teku --network=mainnet --data-path=/mnt/rpdata/teku_data --p2p-port=9001 --eth1-endpoint=9001 --rest-api-enabled --rest-api-port=5052 -eth1-deposit-contract-max-request-size=150

[Install]
WantedBy=multi-user.target
```

::: warning NOTE
The above configuration is for the **Ethereum mainnet**.
If you want to use the **Prater testnet** instead, replace the `--network=mainnet` flag in the `ExecStart` string with `--network=prater`.
:::

::::
:::::

Some notes:
- The user is set to `eth2`.
- For arm64 systems, `ionice -c 2 -n 0` tells your system to give ETH2 the highest possible priority for disk I/O (behind critical system processes), so it can process and attest as quickly as possible

Next, add a log watcher script in the folder you put your ETH2 client into:

:::: tabs
::: tab Lighthouse
```
sudo nano /srv/lighthouse/bn-log.sh
```

The contents should be this:
```
#!/bin/bash
journalctl -u lh-bn -b -f
```

Make it executable:
```
sudo chmod +x /srv/lighthouse/bn-log.sh
```
:::
::: tab Nimbus
```
sudo nano /srv/nimbus/log.sh
```

The contents should be this:
```
#!/bin/bash
journalctl -u nimbus -b -f
```

Make it executable:
```
sudo chmod +x /srv/nimbus/log.sh
```
:::
::: tab Prysm
```
sudo nano /srv/prysm/bn-log.sh
```

The contents should be this:
```
#!/bin/bash
journalctl -u prysm-bn -b -f
```

Make it executable:
```
sudo chmod +x /srv/prysm/bn-log.sh
```
:::
::: tab Teku
```
sudo nano /srv/teku/bn-log.sh
```

The contents should be this:
```
#!/bin/bash
journalctl -u teku-bn -b -f
```

Make it executable:
```
sudo chmod +x /srv/teku/bn-log.sh
```
:::
::::

With that, ETH2 is all set.
On to the validator client!


## Installing the Validator Client

::: tip NOTE
Nimbus does not have a seperate validator client at this time, so it is not included in these instructions.
If you plan to use Nimbus, you've already taken care of this during the ETH2 client setup and can skip this section.
:::

First, create a systemd service for your validator client.
The following are examples that show typical command line arguments to use in each one:

::::: tabs
:::: tab Lighthouse
```
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
ExecStart=/srv/lighthouse/lighthouse validator --network mainnet --datadir /srv/rocketpool/data/validators/lighthouse --init-slashing-protection --beacon-node "http://localhost:5052" --graffiti "RP Lighthouse"

[Install]
WantedBy=multi-user.target
```

::: warning NOTE
The above configuration is for the **Ethereum mainnet**.
If you want to use the **Prater testnet** instead, replace the `--network mainnet` flag in the `ExecStart` string with `--network prater`.
:::

:::: 
:::: tab Prysm
```
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
ExecStart=/srv/prysm/validator --accept-terms-of-use --mainnet --wallet-dir /srv/rocketpool/data/validators/prysm-non-hd --wallet-password-file /srv/rocketpool/data/validators/prysm-non-hd/direct/accounts/secret --beacon-rpc-provider "localhost:5052" --graffiti "RP Prysm"

[Install]
WantedBy=multi-user.target
```
::: warning NOTE
The above configuration is for the **Ethereum mainnet**.
If you want to use the **Prater testnet** instead, replace the `--mainnet` flag in the `ExecStart` string with `--prater`.
:::

::::
:::: tab Teku
```
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
ExecStart=/srv/teku/bin/teku validator-client --network=mainnet --validator-keys=/srv/rocketpool/data/validators/teku/keys:/srv/rocketpool/data/validators/teku/passwords --beacon-node-api-endpoint="http://localhost:5052" --validators-graffiti="RP Teku" --log-destination=CONSOLE

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
```
sudo nano /srv/lighthouse/vc-log.sh
```

The contents should be this:
```
#!/bin/bash
journalctl -u lh-vc -b -f
```

Make it executable:
```
sudo chmod +x /srv/lighthouse/vc-log.sh
```
:::
::: tab Prysm
```
sudo nano /srv/prysm/vc-log.sh
```

The contents should be this:
```
#!/bin/bash
journalctl -u prysm-vc -b -f
```

Make it executable:
```
sudo chmod +x /srv/prysm/vc-log.sh
```
:::
::: tab Teku
```
sudo nano /srv/teku/vc-log.sh
```

The contents should be this:
```
#!/bin/bash
journalctl -u teku-vc -b -f
```

Make it executable:
```
sudo chmod +x /srv/teku/vc-log.sh
```
:::
::::

Now, we have to give the `rp` user the ability to restart the validator client when new validator keys are created.

Open the `sudoers` file:
```
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

Finally, modify `/srv/rocketpool/restart-validator.sh`:
- Uncomment the line at the end and change it to `sudo systemctl restart <validator service name>`

The services are now installed, so it's time to enable and start them.


## Enabling and Running the Services

With all of the services installed, it's time to:

- Enable them so they'll automatically restart if they break, and automatically start on a reboot
- Start them all!

:::: tabs
::: tab Lighthouse
```
sudo systemctl daemon-reload

sudo systemctl enable geth lh-bn lh-vc rp-node rp-watchtower

sudo systemctl start geth lh-bn lh-vc rp-node rp-watchtower
```
:::
::: tab Nimbus
```
sudo systemctl daemon-reload

sudo systemctl enable geth nimbus rp-node rp-watchtower

sudo systemctl start geth nimbus rp-node rp-watchtower
```
:::
::: tab Prysm
```
sudo systemctl daemon-reload

sudo systemctl enable geth prysm-bn prysm-vc rp-node rp-watchtower

sudo systemctl start geth prysm-bn prysm-vc rp-node rp-watchtower
```
:::
::: tab Teku
```
sudo systemctl daemon-reload

sudo systemctl enable geth teku-bn teku-vc rp-node rp-watchtower

sudo systemctl start geth teku-bn teku-vc rp-node rp-watchtower
```
:::
::::

The last step is to create a wallet with `rp wallet init` or `rp wallet restore`.
Once that's done, change the permissions on the password and wallet files so the Rocket Pool CLI, node, and watchtower can all use them:
```
sudo chown rp:rp -R /srv/rocketpool/data

sudo chmod 660 /srv/rocketpool/data/password

sudo chmod 660 /srv/rocketpool/data/wallet
```

And with that, you're ready to secure your operating system to protect your node.

Move on to the [Securing your Node](./securing-your-node.md) section next.
