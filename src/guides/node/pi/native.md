# :computer: Running Rocket Pool Natively

If you're here, then you don't want to deal with Docker.
You're perfectly happy building your own code, creating your own services, managing your own permissions, and tuning your system for maximum performance.
Alright! Let's get down to work.

**NOTE: This section is intended for users that are experienced with Linux systems.**
I'm not going to explain every little command and detail here because there's just too much to do, but I'll try to describe what's going on at a high level.

In general, what you're going to do is install Geth, install Nimbus, install the Rocket Pool daemon, and create `systemd` services for all of them.
Then you'll add the Rocket Pool CLI to interact with everything like you normally would with a Docker-based setup.
The only difference is the `rocketpool service xxx` commands won't work, but we'll build our own versions of them.

**NOTE: 
You can use a different ETH 2.0 client if you really want to, but in my testing, Nimbus has been the top performer with respect to RAM consumption and stability on low-power systems like the Pi.
I'm going to assume that you're using it throughout the rest of the guide - if not, substitute for your ETH2 client appropriately.**

*This guide was inspired by the official "[Running the Rocket Pool Service Outside Docker](https://rocket-pool.readthedocs.io/en/latest/smart-node/non-docker.html)" guide by Jake Pospischil*.


## Creating Service Accounts

The first step is to create new user accounts for Geth, Rocket Pool, and Nimbus.
You don't *have* to do this per se, but it's good practice from a security standpoint.

The way I have my system set up, I have one account for Geth, and one for Rocket Pool / Nimbus to share.
The sharing is necessary because Rocket Pool will create the validator key files once you create a new minipool, and it will set the permissions so that only its own user has access to them.

The reason for having separate user accounts is practical - if Geth or Nimbus have some kind of huge bug that provides for shell access over the network, I don't want the attacker to be able to gain access to the system from them.
For this reason, I set up these users as system accounts without a shell so nobody can log into them, and an exploit that allows for arbitrary code execution won't work since they don't get a shell.

Start by creating an account for Geth, which I'll call `eth1`:
```
$ sudo useradd -r -s /sbin/nologin eth1
```

Do the same for Nimbus and Rocket Pool, which I'll call `eth2`:
```
$ sudo useradd -r -s /sbin/nologin eth2
```

Finally, add yourself to the `eth2` group.
You'll need to do this in order to use the Rocket Pool CLI, because it and the Rocket Pool daemon both need to access the ETH1 wallet file.
```
$ sudo usermod -aG eth2 ubuntu
```

After this, logout and back in for the changes to take effect.


## Installing Rocket Pool

### Setting up the Binaries
Start by making a folder for Rocket Pool and a data subfolder:
```
$ sudo mkdir -p /srv/rocketpool/data
$ sudo chown ubuntu:ubuntu /srv/rocketpool
```

Now, grab the CLI and daemon binaries.
You can pull my pre-built ones (instructions below), or [build them from source](https://rocket-pool.readthedocs.io/en/latest/smart-node/non-docker.html) **(only follow steps 1-4)**.
To grab my pre-built binaries and flag them as executable:
```shell
$ sudo wget https://github.com/jclapis/smartnode-install/releases/latest/download/rocketpool-cli-linux-arm64 -O /usr/local/bin/rocketpool
$ sudo wget https://github.com/jclapis/smartnode-install/releases/latest/download/rocketpool-daemon-linux-arm64 -O /usr/local/bin/rocketpoold
$ sudo chmod +x /usr/local/bin/rocketpool /usr/local/bin/rocketpoold
```

Next, grab the installation package - we're going to throw almost everything in here away since it's meant to support docker installs, but we need to copy two files:
1. The config file that Rocket Pool uses to understand the directories and routes for everything
2. The script that lets Rocket Pool restart the validator service once a new minipool is created (so it can load the new keys)

Follow these steps:
```shell
$ cd /tmp
$ wget https://github.com/jclapis/smartnode-install/releases/latest/download/rp-smartnode-install-arm64.tar.xz
$ tar xf rp-smartnode-install-arm64.tar.xz
$ cp rp-smartnode-install/network/pyrmont/config.yml /srv/rocketpool
$ cp rp-smartnode-install/network/pyrmont/chains/eth2/restart-validator.sh /srv/rocketpool
$ cd /srv/rocketpool
```

Now, open `config.yml` in nano or your editor of choice, and make the following changes:
- Change `smartnode.passwordPath` to `passwordPath: /srv/rocketpool/data/password`
- Change `smartnode.walletPath` to `walletPath: /srv/rocketpool/data/wallet`
- Change `smartnode.validatorKeychainPath` to `validatorKeychainPath: /srv/rocketpool/data/validators`
- Change `smartnode.validatorRestartCommand` to `validatorRestartCommand: "/srv/rocketpool/restart-validator.sh"`
- Change `chains.eth1.provider` to `provider: http://127.0.0.1:8545`
- Change `chains.eth1.wsProvider` to `provider: ws://127.0.0.1:8546`
- Change `chains.eth2.provider` to `provider: 127.0.0.1:5052` (note the lack of http:// at the front, this is on purpose)

Next, modify `restart-validator.sh`:
- Uncomment the line at the end and change it to `sudo systemctl restart nimbus`

Now open `~/.profile` with your editor of choice and add this line to the end:
```
alias rp="rocketpool -d /usr/local/bin/rocketpoold -c /srv/rocketpool"
```

Save it, then reload your profile:
```
$ source ~/.profile
```

This will let you interact with Rocket Pool's CLI with the `rp` command, which is a nice shortcut.

Now, run the Rocket Pool configuration:
```
$ rp service config
```

Select Geth for your ETH1 client, and Nimbus for your ETH2 client.

Finally, create a wallet with `$ rp wallet init` or `$ rp wallet restore`.
Once that's done, change the permissions on the password and wallet files so the Rocket Pool CLI, node, and watchtower can all use them:
```
$ sudo chown eth2:eth2 -R /srv/rocketpool/data
$ sudo chmod 660 /srv/rocketpool/data/password
$ sudo chmod 660 /srv/rocketpool/data/wallet
```


### Creating the Services

Next, create a systemd service for the Rocket Pool node:
```
$ sudo nano /etc/systemd/system/rp-node.service
```

Contents:
```
[Unit]
Description=rp-node
After=network.target

[Service]
Type=simple
User=eth2
Restart=always
RestartSec=5
ExecStart=/usr/local/bin/rocketpoold --config /srv/rocketpool/config.yml --settings /srv/rocketpool/settings.yml node

[Install]
WantedBy=multi-user.target
```

Create a log file for the service, so you can watch its output - this will replace the behavior of `rocketpool service logs`:
```
$ nano /srv/rocketpool/node-log.sh
```
Contents:
```
#!/bin/bash
journalctl -u rp-node -b -f
```

Save it, then make it executable:
```
$ chmod +x /srv/rocketpool/node-log.sh
```

Now you can watch the node's logs by simply running `$ /srv/rocketpool/node-log.sh`.

Next, create a service for the watchtower:
```
$ sudo nano /etc/systemd/system/rp-watchtower.service
```

Contents:
```
[Unit]
Description=rp-node
After=network.target

[Service]
Type=simple
User=eth2
Restart=always
RestartSec=5
ExecStart=/usr/local/bin/rocketpoold --config /srv/rocketpool/config.yml --settings /srv/rocketpool/settings.yml watchtower

[Install]
WantedBy=multi-user.target
```

Create a log file for the watchtower:
```
$ nano /srv/rocketpool/watchtower-log.sh
```
Contents:
```
#!/bin/bash
journalctl -u rp-watchtower -b -f
```

Save it, then make it executable:
```
$ chmod +x /srv/rocketpool/watchtower-log.sh
```

Finally, we have to give the `eth2` user the ability to call `systemctl restart nimbus` so it can restart Nimbus when new validator keys are created (which is what you set up when you modified `restart-validator.sh` earlier).

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

Once it does, save it and exit. All set, now for Geth!

## Installing Geth

Start by making a folder for your Geth binary and log script. For example, `/srv/geth`:
```
$ sudo mkdir /srv/geth
$ sudo chown ubuntu:ubuntu /srv/geth
```

Next, make a folder for Geth's chain data on the SSD:
```
$ sudo mkdir /mnt/rpdata/geth_data
$ sudo chown eth1:eth1 /mnt/rpdata/geth_data
```

Now go grab [the latest Geth ARM64 binary](https://geth.ethereum.org/downloads/), or [build it from source](https://github.com/ethereum/go-ethereum/) if you want.
If you get the prebuilt binary, **make sure you pick the one that has `ARM64` in the `Arch` column!** For example:
```
$ cd /tmp
$ wget https://gethstore.blob.core.windows.net/builds/geth-linux-arm64-1.10.1-c2d2f4ed.tar.gz
$ tar xzf geth-linux-arm64-1.10.1-c2d2f4ed.tar.gz
$ cp geth-linux-arm64-1.10.1-c2d2f4ed/geth /srv/geth
```

Next, create a systemd service for Geth. You can use mine as a template if you want:
```
$ sudo nano /etc/systemd/system/geth.service
```

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
ExecStart= taskset 0x0c ionice -c 3 /srv/geth/geth --cache 256 --maxpeers 12 --goerli --datadir /mnt/rpdata/geth_data --http --http.port 8545 --http.api eth,net,personal,web3 --ws --ws.port 8546 --ws.api eth,net,personal,web3

[Install]
WantedBy=multi-user.target
```

Some notes:
- The user is set to `eth1`, but if you didn't to the multi-user thing, set it to whatever user you want.
- Geth is preceeded by `taskset 0x0c`. Basically, this constrains Geth to only run on CPUs 2 and 3.
  This way, it won't interfere with Nimbus by stealing some of the same core that Nimbus uses (since Nimbus is single-threaded).
  This is a little optimization, but I've found it to be helpful in avoiding random large inclusion distances if the processes collide.
  - You can remove this during the initial sync if you want to help speed things up, but put it back on during actual validation.
- `ionice -c 3` tells the system that Geth's disk access is a super low priority - if Nimbus needs to access the SSD, it will always have priority over Geth.
- You *need* to have the `--cache` flag for it to work on a Pi without stealing all the RAM.
  - For 4 GB Pi's, **this needs to stay at 256**.
  - For 8 GB Pi's, **you can increase it to 512** so it syncs faster.
- `--maxpeers 12` is kind of up to you; having a ton of peers in Geth really isn't important since it's just used for ETH2 block proposals.
  This just saves on a little bit of resource usage, so it's another small optimization.
  **You may want to set it to 24 while syncing, then back down to 12 once syncing is complete.**

Lastly, add a log watcher script so you can check on Geth to see how it's doing:
```
$ sudo nano /srv/geth/log.sh
```

Contents:
```
#!/bin/bash
journalctl -u geth -b -f
```

Make it executable:
```
$ sudo chmod +x /srv/geth/log.sh
```

Now you can see the Geth logs by doing `$ /srv/geth/log.sh`.
This replaces the behavior that `rocketpool service logs eth1` used to provide, since it can't do that without Docker.

All set on Geth, now for Nimbus.


## Installing Nimbus


Start by making a folder for your Nimbus binary and log script:
```
$ sudo mkdir /srv/nimbus
$ sudo chown ubuntu:ubuntu /srv/nimbus
```

Next, make a folder for Nimbus's chain data on the SSD:
```
$ sudo mkdir /mnt/rpdata/nimbus_data
$ sudo chown eth2:eth2 /mnt/rpdata/nimbus_data
```

Now go grab [the latest Nimbus ARM64 binary](https://github.com/status-im/nimbus-eth2/releases), or [build it from source](https://github.com/status-im/nimbus-eth2/) if you want.
If you get the prebuilt binary, **make sure you pick the `arm64v8` one!** For example:
```
$ cd /tmp
$ wget https://github.com/status-im/nimbus-eth2/releases/download/v1.0.10/nimbus-eth2_Linux_arm64v8_1.0.10_77ee2107.tar.gz
$ tar xzf nimbus-eth2_Linux_arm64v8_1.0.10_77ee2107.tar.gz
$ cp nimbus-eth2_Linux_arm64v8_1.0.10_77ee2107/build/nimbus_beacon_node /srv/nimbus/nimbus
```

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


## Enabling and Running the Services

With all of the services installed, it's time to enable them so they'll automatically restart if they break, or start on a reboot:
```
$ sudo systemctl daemon-reload
$ sudo systemctl enable geth
$ sudo systemctl enable nimbus
$ sudo systemctl enable rp-node
$ sudo systemctl enable rp-watchtower
```

And finally, now that they're enabled, kick them all off:
```
$ sudo systemctl start geth
$ sudo systemctl start nimbus
$ sudo systemctl start rp-node
$ sudo systemctl start rp-watchtower
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
``` 