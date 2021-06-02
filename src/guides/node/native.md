# :computer: [WIP] Configuring a Native Rocket Pool Node without Docker

In this section, we will walk through the process of installing the Rocket Pool Smartnode stack natively onto your system, without the use of Docker containers.

The general plan is as follows:
- Create system services for the Rocket Pool components (the **node** process, and optionally the **watchtower** process if you are an Oracle Node)
- Create a system service for the ETH1 client
- Create a system service for the ETH2 beacon client
- Create a system service for the ETH2 validator client
- Configure Rocket Pool to use communicate with those services

This is a fairly involved setup so it will take some time to complete.

---
:warning: **WARNING: This guide is intended for users that are experienced with Linux system administration and usage.
This includes using the terminal, creating system accounts, managing permissions, and installing services. 
If you are not familiar with these activites, we do not recommend that you use the native mode.**

---

---
:warning: **NOTE: The diversity of Operating Systems and distros available make it impractical to make guides available for all of them.
The instructions in this guide are tailored to a Debian-based system (including Ubuntu).
For other distros or operating systems, you may follow the high-level steps described in the guide but will have to substitute certain commands for the ones that your system uses as appropriate.**

---


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

---
:bulb: NOTE: If you're using Nimbus, ignore the `rp` account.
Any time you see it used in this guide, just substitute it with `eth2` instead.

---

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

sudo chown $USER:$USER /srv/rocketpool
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

Follow these steps for your system's architecture:

:::: tabs

::: tab x64
```shell
cd /tmp

wget https://github.com/rocket-pool/smartnode-install/releases/latest/download/rp-smartnode-install-amd64.tar.xz

tar xf rp-smartnode-install-amd64.tar.xz

cp rp-smartnode-install/network/prater/config.yml /srv/rocketpool

cp rp-smartnode-install/network/prater/chains/eth2/restart-validator.sh /srv/rocketpool

cd /srv/rocketpool
```
:::

::: tab arm64
```shell
cd /tmp

wget https://github.com/rocket-pool/smartnode-install/releases/latest/download/rp-smartnode-install-arm64.tar.xz

tar xf rp-smartnode-install-arm64.tar.xz

cp rp-smartnode-install/network/prater/config.yml /srv/rocketpool

cp rp-smartnode-install/network/prater/chains/eth2/restart-validator.sh /srv/rocketpool

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
- Change `chains.eth1.wsProvider` to `provider: ws://127.0.0.1:8546`
- Change `chains.eth2.provider` to `provider: 127.0.0.1:5052` (note the lack of `http://` at the front, this is on purpose)

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
ExecStart=/srv/geth/geth --goerli --datadir /srv/geth/geth_data --http --http.port 8545 --http.api eth,net,personal,web3 --ws --ws.port 8546 --ws.api eth,net,personal,web3

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
ExecStart=taskset 0x0c ionice -c 3 /srv/geth/geth --cache 256 --maxpeers 12 --goerli --datadir /mnt/rpdata/geth_data --http --http.port 8545 --http.api eth,net,personal,web3 --ws --ws.port 8546 --ws.api eth,net,personal,web3

[Install]
WantedBy=multi-user.target
```

Note that the `taskset 0x0c ionice -c 3` at the start is meant for Raspberry Pi's or other similarly low-power systems:

- `taskset 0x0c` constrains Geth to only run on CPUs 2 and 3. This way, it won't interfere with the ETH2 client.
- `ionice -c 3` tells the system that Geth's disk access is a super low priority - if ETH2 needs to access the SSD, it will always have priority over Geth.

You can omit that prefix if you're not on a low-power system.
:::

::::

Some notes:

- You can optionally use the `--cache` flag to lower the amount of RAM that Geth uses.
  - If you have 4 GB of RAM, **set this to 256**.
  - If you have 8 GB of RAM, **you can increase it to 512** so it syncs faster.
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

:::: tabs
::: tab Lighthouse
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
::: 

::: tab Nimbus
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

Copy `build/nimbus_beacon_node` from the release archive into `/srv/nimbus/`.
:::

::: tab Prysm
TODO
:::

::: tab Teku

:::
::::


Next, create a systemd service for Nimbus. You can use mine as a template if you want:
```
$ sudo nano /etc/systemd/system/nimbus.service
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
ExecStart=taskset 0x01 ionice -c 2 -n 0 /srv/nimbus/nimbus --max-peers=80 --non-interactive --network=pyrmont --data-dir=/mnt/rpdata/nimbus_data --insecure-netkey-password --validators-dir=/srv/rocketpool/data/validators/nimbus/validators --secrets-dir=/srv/rocketpool/data/validators/nimbus/secrets --graffiti="Made on an RPi 4!" --web3-url=ws://localhost:8546 --tcp-port=9001 --udp-port=9001 --log-file="/mnt/rpdata/nimbus_data/nimbus.log" --rpc --rpc-port=5052

[Install]
WantedBy=multi-user.target
```

Some notes:
- The user is set to `eth2`.
- Nimbus is preceeded by `taskset 0x01`. Basically, this constrains Nimbus to only run on CPU 0 (since it's single threaded).
  See the Geth notes for the rationale here.
- `ionice -c 2 -n 0` tells your system to give Nimbus the highest possible priority for disk I/O (behind critical system processes), so it can process and attest as quickly as possible
- Change the `--graffiti` to whatever you want.
- By default, Nimbus will try to connect to 160 peers. That's a lot.
  I changed the max value using `--max-peers=80` to lighten the CPU load a little, but you are free to experiement with this if you want.

Next, add a log watcher script:
```
$ sudo nano /srv/nimbus/log.sh
```

Contents:
```
#!/bin/bash
journalctl -u nimbus -b -f
```

Make it executable:
```
$ sudo chmod +x /srv/nimbus/log.sh
```

Finally, create the validator folders that Nimbus needs because it will crash without them:
```
$ sudo mkdir -p /srv/rocketpool/data/validators/nimbus/validators
$ sudo mkdir -p /srv/rocketpool/data/validators/nimbus/secrets
$ sudo chown eth2:eth2 /srv/rocketpool/data/ -R
```

~~~~~~~~~~~~~~~~~~
Next, modify `restart-validator.sh`:
- Uncomment the line at the end and change it to `sudo systemctl restart <your VC service name>`

For example, if you're using Lighthouse



Finally, we have to give the `rp` user the ability to call `systemctl restart nimbus` so it can restart Nimbus when new validator keys are created (which is what you set up when you modified `restart-validator.sh` earlier).

Open the `sudoers` file:
```
$ sudo nano /etc/sudoers
```

Add this line under `# Cmnd alias specification`:
```
Cmnd_Alias RP_CMDS = /usr/bin/systemctl restart nimbus
```

Add this line under `# User privilege specification`:
```
eth2    ALL=(ALL) NOPASSWD: RP_CMDS
```

That whole section should now look like this:
```
# Cmnd alias specification
Cmnd_Alias RP_CMDS = /usr/bin/systemctl restart nimbus

# User privilege specification
root    ALL=(ALL:ALL) ALL
eth2    ALL=(ALL) NOPASSWD: RP_CMDS
```

~~~~~~~~~~~~~~~~~~



## Enabling and Running the Services

With all of the services installed, it's time to enable them so they'll automatically restart if they break, or start on a reboot:
```
$ sudo systemctl daemon-reload
$ sudo systemctl enable geth
$ sudo systemctl enable nimbus
$ sudo systemctl enable rp-node
$ sudo systemctl enable rp-watchtower
```

Now that they're enabled, kick them all off:
```
$ sudo systemctl start geth
$ sudo systemctl start nimbus
$ sudo systemctl start rp-node
$ sudo systemctl start rp-watchtower
```

The last step is to create a wallet with `$ rp wallet init` or `$ rp wallet restore`.
Once that's done, change the permissions on the password and wallet files so the Rocket Pool CLI, node, and watchtower can all use them:
```
$ sudo chown eth2:eth2 -R /srv/rocketpool/data
$ sudo chmod 660 /srv/rocketpool/data/password
$ sudo chmod 660 /srv/rocketpool/data/wallet
```


## Using and Monitoring Rocket Pool

At this point, you have a working instance of Rocket Pool running on your Pi!
Congratulations! You worked hard to get this far, so take a few minutes to celebrate.
Once you're back, let's talk about how to actually use Rocket Pool and monitor how things are going.


### Setting up a Validator

With respect to using it, Rocket Pool developer Jake Pospischil has written up [a wonderful guide on exactly this](https://medium.com/rocket-pool/rocket-pool-v2-5-beta-node-operators-guide-77859891766b) already.
It also covers installing Rocket Pool, but that's for boring old normal computers... you already did that whole process!
Anyway, to learn how to use Rocket Pool for validating on ETH2, take a look at the guide linked above and skip about halfway down the page, to the section labeled **Registering Your Node**.
That will walk you through the ins-and-outs of how to create a validator with Rocket Pool.


### Monitoring your Pi's Performance

You can use the log scripts you created for each of them to see how they're doing, and resolve any problems that come up.

You've also seen `htop`, which gives you a nice live view into your system resources:
```
$ htop
```
![](images/Htop.png)

On the top display with the bars, `Mem` shows you how much RAM you're currently using (and how much you have left).
`Swp` shows you how much swap space you're using, and how much is left.

On the bottom table, each row represents a process.
Geth and Nimbus will probably be on top, which you can see in the rightmost column labeled `Command`.
The `RES` column shows you how much RAM each process is taking - in this screenshot, Geth is taking 748 MB and Nimbus is taking 383 MB.
The `CPU%` column shows you how much CPU power each process is consuming.
100% represents a single core, so if it's over 100%, that means it's using a lot from multiple cores (like Geth is here, with 213%).

If you want to track how much network I/O your system uses over time, you can install a nice utility called `vnstat`:
```
$ sudo apt install vnstat
```

To run it, do this:
```
$ vnstat -i eth0
```

This won't work right away because it needs time to collect data about your system, but as the days and weeks pass, it will end up looking like this:

```
$ vnstat -i eth0
Database updated: 2021-02-21 01:55:00

   eth0 since 2021-01-29

          rx:  513.65 GiB      tx:  191.36 GiB      total:  705.01 GiB

   monthly
                     rx      |     tx      |    total    |   avg. rate
     ------------------------+-------------+-------------+---------------
       2021-01     14.71 GiB |    4.95 GiB |   19.66 GiB |   63.06 kbit/s
       2021-02    498.94 GiB |  186.40 GiB |  685.34 GiB |    3.39 Mbit/s
     ------------------------+-------------+-------------+---------------
     estimated    695.74 GiB |  259.92 GiB |  955.66 GiB |

   daily
                     rx      |     tx      |    total    |   avg. rate
     ------------------------+-------------+-------------+---------------
     yesterday     10.51 GiB |   15.04 GiB |   25.55 GiB |    2.54 Mbit/s
         today    928.06 MiB |    1.22 GiB |    2.13 GiB |    2.65 Mbit/s
     ------------------------+-------------+-------------+---------------
     estimated     11.35 GiB |   15.27 GiB |   26.62 GiB |
```

This will let you keep tabs on your total network usage, which might be helpful if your ISP imposes a data cap.

Finally, and most importantly, use a block explorer like [Beaconcha.in](https://pyrmont.beaconcha.in) to watch your validator's attestation performance and income.
If everything is set up right, you should see something like this:
![](images/Beaconchain.png)

All of the attestations should say `Attested` for their **Status**, and ideally all of the **Opt. Incl. Dist.** should be 0 (though an occasional 1 or 2 is fine).

And that's all there is to it! Congratulations again, and enjoy validating with your Raspberry Pi!


## Updating Rocket Pool, Geth, or Nimbus

When a new version of a client is released, you'll want to upgrade things.
Because we're not using Rocket Pool's own client deployment process, you will be responsible for keeping track of new Geth and Nimbus releases, in addition to new Rocket Pool releases.


### Upgrading Geth

Shut down the Geth service:
```
$ sudo systemctl stop geth
```

Download the new release, and extract the binary like you did when you first installed the Geth service (instructions above).
For the sake of this example, I'll assume you have it in `/tmp/geth-linux-arm64-[version]`.

Next, replace the old binary with it:
```
$ sudo mv /srv/geth/geth /srv/geth/geth_bak
$ sudo mv /tmp/geth-linux-arm64-[version]/geth /srv/geth
```
This will also back up the old Geth binary as `/srv/geth/geth_bak` if you need to bring it back.

Finally, restart Geth:
```
$ sudo systemctl start geth
```

You may want to monitor the logs a bit (`/srv/geth/log.sh`) to make sure everything is working.


### Upgrading Nimbus

Shut down the Nimbus service:
```
$ sudo systemctl stop nimbus
```

Download the new release, and extract the binary like you did when you first installed the Nimbus service (instructions above).
For the sake of this example, I'll assume you have it in `/tmp/nimbus-eth2_Linux_arm64v8_[version]`

Next, replace the old binary with it:
```
$ sudo mv /srv/nimbus/nimbus /srv/nimbus/nimbus_bak
$ sudo mv /tmp/nimbus-eth2_Linux_arm64v8_[version]/build/nimbus_beacon_node /srv/nimbus/nimbus
```
This will also back up the old Nimbus binary as `/srv/nimbus/nimbus_bak` if you need to bring it back.

Finally, restart Nimbus:
```
$ sudo systemctl start geth
```

You may want to monitor the logs a bit (`/srv/nimbus/log.sh`) to make sure everything worked well.


### Updating Rocket Pool

Shut down the Node and Watchtower services:
```
$ sudo systemctl stop rp-node rp-watchtower
```

Download the new releases:

Next, replace the old binary with it:
```
$ sudo mv /usr/local/bin/rocketpool /usr/local/bin/rocketpool_bak
$ sudo mv /usr/local/bin/rocketpoold /usr/local/bin/rocketpoold_bak
$ sudo wget https://github.com/jclapis/smartnode-install/releases/latest/download/rocketpool-cli-linux-arm64 -O /usr/local/bin/rocketpool
$ sudo wget https://github.com/jclapis/smartnode-install/releases/latest/download/rocketpool-daemon-linux-arm64 -O /usr/local/bin/rocketpoold
```
This will also back up the old CLI and daemon binaries if you need to bring them back.

You *may* also need to download the new installer package, if it contains an updated `config.yml`.
This is something you'll have to ask about on Discord, or compare the commit history for yourself.
If it is the case, then you'll need to replace the file in `/srv/rocketpool/config.yml` with the new one - but be sure to make a backup of the old one first because this will erase all of your settings, so you'll have to copy them over again.

Restart the services:
```
$ sudo systemctl start rp-node rp-watchtower
```

Finally, check the version to make sure that it updated correctly:
```
$ rp service version

Rocket Pool client version: 1.0.0-beta.1
Rocket Pool service version: 1.0.0-beta.1
Selected Eth 1.0 client: Geth (jclapis/go-ethereum:v1.10.1)
Selected Eth 2.0 client: Nimbus (jclapis/nimbus:v1.0.11)
```
