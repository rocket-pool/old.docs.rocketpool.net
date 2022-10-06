# Creating a Native Rocket Pool Node without Docker

::: tip NOTE
This guide is designed for **Smartnode v1.6.5 and higher**.

If you are already running a previous version and using these instructions to configure Native mode, then you must upgrade to v1.6.5 or higher before continuing. 
::: 

In this section, we will walk through the process of installing the Rocket Pool Smartnode stack natively onto your system, without the use of Docker containers.

The general plan is as follows:
1. Create a standard solo-staking setup with `systemd` services for the execution client, the beacon node, and (if not using Nimbus) the validator client.
2. Create system services for the Rocket Pool components (the **node** and **watchtower** processes).
3. Configure Rocket Pool to communicate with your client services.
4. Update your validator client service definition to use Rocket Pool's fee recipient and validator keys.

This is a fairly involved setup so it will take some time to complete.

The diversity of operating systems and available distros make it impractical to create guides for all of them.
The instructions in this guide are tailored to a Debian-based system (including Ubuntu).
For other distros or operating systems, you may follow the high-level steps described in the guide but will have to substitute certain commands for the ones that your system uses, as appropriate.

::: danger
This guide is intended for users that are experienced with Linux system administration and usage (including using the terminal, creating system accounts, managing permissions, and installing services). If you continue, we assume you are familiar with these activities. Because you will be managing the bulk of the infrastructure yourself, we provide only limited support for Native installations. 
**If you aren't familiar with these activites, we don't recommend that you use Native mode.**
:::

## Step 1: Set up the Execution and Consensus Clients
::: tip NOTE
The term **consensus clients** refers to the combination of the beacon node and the validator client. These are typically separate binaries that are developed and released by a common team. In the case of the Nimbus client, the consensus clients are currently released as a single binary, although the Nimbus team intends to eventually ship a separate validator client (which is currently in beta).   
::: 

Native mode effectively extends a standard solo-staking setup, and simply allows the Smartnode software to attach to the clients that are already running (with a few small modifications).

To that end, we recommend you start by following one of Somer Esat's guides. These guides vary depending on which consensus clients that you want to run: [https://github.com/SomerEsat/ethereum-staking-guides](https://github.com/SomerEsat/ethereum-staking-guides). To display the appropriate guide, click a link in the **Guide** column. 
::: tip NOTE
* Somer Estat's guides are categorized by consensus client, but each guide also includes instructions for selecting and installing your preferred execution client. To help you evaluate and select from the available clients, see the guidelines we provide for [Choosing your Eth Clients](./eth-clients.md). 
* For an alternative set of guides that you can use to install and configure your clients, see CoinCashew's guides: [https://www.coincashew.com/coins/overview-eth/guide-or-how-to-setup-a-validator-on-eth2-mainnet](https://www.coincashew.com/coins/overview-eth/guide-or-how-to-setup-a-validator-on-eth2-mainnet).  
::: 

When following the external guides, you'll need to modify your installation and configuration for use with Rocket Pool as follows:
* At the beginning of the process, don't download the deposit tool (Staking Deposit CLI) or generate a menmonic. Rocket Pool handles your deposit and wallet interactions. 
* When configuring the validator client, don't import or fund the validator keys. Rocket Pool handles the creation of your validator keys and funding the validator.
* When you get to the portion of the guide that requires specifying a fee recipient for your validator client, **leave it blank for now**. Rocket Pool provides a special configuration for ensuring that your validator uses the correct fee recipient. 

By following the external guide, with the above modifications, you will set up an execution client service and the appropriate consensus client services. (Note that for Nimbus, a single service configures both the beacon node and validator client.)

After your clients are installed and you can see in their logs that they are syncing the chains properly, you can follow the next steps to set up the Rocket Pool Smartnode and connect it to your clients.

## Step 2: Install Rocket Pool

### Creating the Service Account

The first step is to create a new system account for the Rocket Pool services and disable login and shell access for it:

```
sudo useradd -r -s /sbin/nologin rp
```

Now, add yourself to the `rp` group.
You'll need to do this to use the Rocket Pool CLI, because it and the Rocket Pool daemon both need to access the execution layer wallet file.

```
sudo usermod -aG rp $USER
```

Finally, add the user account for your **validator client** (or for your **beacon node** if using Nimbus, since Nimbus doesn't have a separate validator client) to the `rp` group as well.
The name of that user account depends on which guide you followed to set up your validator client service.

For example, if your validator client runs as user `lighthousevalidator`, you would do the following:

```
sudo usermod -aG rp lighthousevalidator
```

After this, logout and back in for the changes to take effect.


### Setting up the Binaries

Start by making a folder for Rocket Pool and a data subfolder.
You can put this wherever you want; for this guide, I'll put it into `/srv`:
```shell
sudo mkdir -p /srv/rocketpool

sudo chown $USER:$USER /srv/rocketpool
```

Now, download the CLI and daemon binaries (or ignore this and build them from source if you prefer).
Choose the platform that your system uses from the tabs below.

:::: tabs

::: tab Linux x64
```shell
sudo wget https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-cli-linux-amd64 -O /usr/local/bin/rocketpool

sudo wget https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-daemon-linux-amd64 -O /usr/local/bin/rocketpoold

sudo chmod +x /usr/local/bin/rocketpool
```
:::

::: tab Linux arm64
```shell
sudo wget https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-cli-linux-arm64 -O /usr/local/bin/rocketpool

sudo wget https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-daemon-linux-arm64 -O /usr/local/bin/rocketpoold

sudo chmod +x /usr/local/bin/rocketpool
```
:::

::: tab macOS x64
```shell
sudo wget https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-cli-darwin-amd64 -O /usr/local/bin/rocketpool

sudo wget https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-daemon-darwin-amd64 -O /usr/local/bin/rocketpoold

sudo chmod +x /usr/local/bin/rocketpool
```
:::

::: tab macOS arm64
```shell
sudo wget https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-cli-darwin-arm64 -O /usr/local/bin/rocketpool

sudo wget https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-daemon-darwin-arm64 -O /usr/local/bin/rocketpoold

sudo chmod +x /usr/local/bin/rocketpool
```
:::

::::

Now, set the owner and group of the daemon to `rp`:

```
sudo chown rp:rp /usr/local/bin/rocketpoold
```

Finally, **set the `suid` bit** and other permissions bits on the daemon binary:
```
sudo chmod u+sx,g+sx,o-rwx /usr/local/bin/rocketpoold
```

This will ensure that the daemon always runs as the `rp` user, so it always has the proper permissions set.

::: danger NOTE
The Smartnode will most likely fail with permissions errors if you don't do this.
Please be sure to run this command!
:::


### Setting up the Installation Folder

With the CLI and daemon installed, you'll next need to set up the folder structure and accompanying files that the Smartnode expects to exist.
Start by creating the following folders:

```
mkdir -p /srv/rocketpool/data/validators && sudo chmod 775 /srv/rocketpool/data/validators

mkdir /srv/rocketpool/data/rewards-trees

mkdir /srv/rocketpool/data/custom-keys

sudo chown -R rp:rp /srv/rocketpool/data
```

Next, download the following scripts—Rocket Pool will use them when it needs to stop or restart your validator client to change its fee recipient (discussed later) or load new keys after you create a new minipool:

```shell
wget https://github.com/rocket-pool/smartnode-install/raw/release/install/scripts/restart-vc.sh -O /srv/rocketpool/restart-vc.sh

wget https://github.com/rocket-pool/smartnode-install/raw/release/install/scripts/stop-validator.sh -O /srv/rocketpool/stop-validator.sh

chmod +x /srv/rocketpool/restart-vc.sh

chmod +x /srv/rocketpool/stop-validator.sh
```

Now open `~/.profile` with your editor of choice and add this line to the end:
```
alias rp="rocketpool -d /usr/local/bin/rocketpoold -c /srv/rocketpool"
```

Save it, and then reload your profile:
```shell
source ~/.profile
```

This lets you interact with Rocket Pool's CLI with the `rp` command, which is a nice shortcut.


### Creating the Services

Next up, we'll create a `systemd` service for the Rocket Pool node daemon.
This is the service that automatically checks for and claims RPL rewards, and stakes minipools after you've created them via `node deposit`.

We'll also create a `watchtower` service as well.
This will be used if you're an Oracle DAO member, or if you ever want to generate your own rewards interval trees (discussed in the [Claiming Rewards](./rewards.md) section later on). 

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

Save it, and then make it executable:
```shell
chmod +x /srv/rocketpool/node-log.sh
```

Now you can watch the node's logs by simply running:
```
sudo /srv/rocketpool/node-log.sh
```
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

Save it, and then make it executable:
```shell
chmod +x /srv/rocketpool/watchtower-log.sh
```

Now you can watch the watchtower's logs by simply running:
```
sudo /srv/rocketpool/watchtower-log.sh
```
:::

::::

The services are now installed.


### Setting up Passwordless Script Access

The next step is to give the `rp` user the ability to restart the validator client when new validator keys are created, and stop the validator client if an emergency condition is detected.

Create a new `sudoers` file using `visudo`:
```
sudo visudo -f /etc/sudoers.d/rocketpool
```

Add the following lines to it:
```
Cmnd_Alias RP_RESTART = /usr/bin/systemctl restart <validator service name>
Cmnd_Alias RP_STOP = /usr/bin/systemctl stop <validator service name>
rp    ALL=(ALL) NOPASSWD: RP_RESTART, RP_STOP
```

Where `<validator service name>` is the name of your VC service (e.g. `lighthousevalidator`)

Now, modify `/srv/rocketpool/restart-vc.sh`:
- Uncomment the line at the end and change it to `sudo systemctl restart <validator service name>`

Also modify `/srv/rocketpool/stop-validator.sh`:
- Uncomment the line at the end and change it to `sudo systemctl stop <validator service name>`

All set!
The `node` process can now restart or stop your VC as required automatically.


## Step 3: Configure the Smartnode

Now that your services are all created, it's time to configure the Smartnode stack.

Please visit the [Configuring the Smartnode Stack (Native Mode)](./config-native.md) guide, and return here when you are finished.


### Enabling and Running the Services

With all of the services installed, it's time to:

- Enable them so they'll automatically restart if they break, and automatically start on a reboot
- Start them all

```
sudo systemctl daemon-reload

sudo systemctl enable rp-node rp-watchtower

sudo systemctl start rp-node rp-watchtower
```


### Setting Up a Wallet

Next, create a new node wallet or recover an existing wallet.
Please carefully follow the instructions in the [Setting up a Wallet](./starting-rp.md##setting-up-a-wallet) portion of the guide, then return here when you're done. 

When that's done, use the service log file scripts to verify that they successfully loaded your new wallet.
You should also verify this using the following command:

```
rp wallet status
```

If working properly it should produce the following output:
```
Your Smartnode is currently using the Prater Test Network.

The node wallet is initialized.
Node account: <address>
```


## Step 4: Update the Validator Client's Service Definition

Unlike a solo staking setup, Rocket Pool generates and manages its validator keys automatically.
There are a few adjustments you'll need to make to the validator client's service definition file that you just created for it to work with Rocket Pool correctly, including:

- Setting the **Fee Recipient** file.
- Setting the validator client's data and keys directories.
- Relaxing your system's `umask` configuration.
- Reloading the validator client's service.

We'll cover these step-by-step.


### Setting the Fee Recipient File

::: danger NOTE
It is **crucial** that you follow these steps - failing to do so and using the wrong fee recipient will result in [penalties](https://github.com/rocket-pool/rocketpool-research/blob/master/Penalties/penalty-system.md) being applied to your validators and deductions taken from your Beacon Chain balance!
:::

The **fee recipient** is the argument you provide to your validator client that specifies the address on the execution layer that you want your priority fees and MEV rewards to be sent to.
Rocket Pool has two different addresses for the fee recipient:

- If you are opted into the Smoothing Pool, it must be the **Smoothing Pool's address**
- If you are opted out of the Smoothing Pool, it must be **your node's Fee Distributor address**

*To learn more about the Smoothing Pool and your Fee Distributor, please see the [Fee Distributors and the Smoothing Pool](./fee-distrib-sp.md) section of the guide.*

Rocket Pool's `node` service will set this for you automatically by detecting which address is appropriate, setting it in a configuration file, and restarting your validator client's service to pick up the change.
Your validator client's service can use the Rocket Pool configuration file automatically, so you don't need to hard-code the fee recipient.

Open the `systemd` service definition file that you just created for your validator client.
Before the `ExecStart` line, add this line:

```
EnvironmentFile=/srv/rocketpool/data/validators/rp-fee-recipient-env.txt
```

Then modify your fee recipient argument as follows; select your client of choice from the tabs below:

:::: tabs
::: tab Lighthouse
Change `--suggested-fee-recipient <address>` to `--suggested-fee-recipient ${FEE_RECIPIENT}`
:::
::: tab Nimbus
Change `--suggested-fee-recipient=<address>` to `--suggested-fee-recipient=${FEE_RECIPIENT}`
:::
::: tab Prysm
Change `--suggested-fee-recipient <address>` to `--suggested-fee-recipient ${FEE_RECIPIENT}`
:::
::: tab Teku
Change `--validators-proposer-default-fee-recipient=<address>` to `--validators-proposer-default-fee-recipient=${FEE_RECIPIENT}`
:::
::::

::: tip NOTE
If you start your validator client before Rocket Pool's services, it may error out because this file does not exist yet.
Don't worry, this file will be created by Rocket Pool once you've initialized and started its services.
:::


### Setting the Data and Keys Directories

Next, you must tell the validator client where to store its data and load the validator keys that Rocket Pool generates.
Click the client that you use in the tabs below:

:::: tabs
::: tab Lighthouse
Create the following directories and set their owner to `rp`:

```
sudo mkdir -p /srv/rocketpool/data/validators/lighthouse/validators

sudo mkdir -p /srv/rocketpool/data/validators/lighthouse/secrets

sudo chown -R rp:rp /srv/rocketpool/data/validators/lighthouse

sudo chmod -R 775 /srv/rocketpool/data/validators/lighthouse
```

Now, add or change the following parameters in the Lighthouse VC's service definition file to these new values:

```
--datadir /srv/rocketpool/data/validators/lighthouse
```
:::
::: tab Nimbus
Create the following directories and set their owner to `rp`:

```
sudo mkdir -p /srv/rocketpool/data/validators/nimbus/validators

sudo mkdir -p /srv/rocketpool/data/validators/nimbus/secrets

sudo chown -R rp:rp /srv/rocketpool/data/validators/nimbus

sudo chmod -R 775 /srv/rocketpool/data/validators/nimbus
```

Now, add or change the following parameters in Nimbus's service definition file to the following:
```
--validators-dir=/srv/rocketpool/data/validators/nimbus/validators --secrets-dir=/srv/rocketpool/data/validators/nimbus/secrets
```
:::
::: tab Prysm
Create the following directories and set their owner to `rp`:

```
sudo mkdir -p /srv/rocketpool/data/validators/prysm-non-hd/direct/accounts

sudo chown -R rp:rp /srv/rocketpool/data/validators/prysm-non-hd

sudo chmod -R 775 /srv/rocketpool/data/validators/prysm-non-hd
```

Add or change the following parameters in the Prysm VC's service definition file to these new values:

```
--wallet-dir /srv/rocketpool/data/validators/prysm-non-hd --wallet-password-file /srv/rocketpool/data/validators/prysm-non-hd/direct/accounts/secret
```

The validator client will fail to start until you make a new Rocket Pool minipool (described later in the guides) because these files won't be created until that time, but the beacon node will be able to sync properly.
:::
::: tab Teku
Create the following directories and set their owner to `rp`:

```
sudo mkdir -p /srv/rocketpool/data/validators/teku/keys

sudo mkdir -p /srv/rocketpool/data/validators/teku/passwords

sudo chown -R rp:rp /srv/rocketpool/data/validators

sudo chmod -R 775 /srv/rocketpool/data/validators/teku
```

Now, add or change the following parameters in the Teku validator client's service definition file to the following:
```
--data-path=/srv/rocketpool/data/validators/teku --validator-keys=/srv/rocketpool/data/validators/teku/keys:/srv/rocketpool/data/validators/teku/passwords 
```
:::
::::


### Relaxing `umask`

By default, your system typically comes with a [`umask`]() configuration that strips the `+w` bit from the group permissions whenever the `node` daemon creates a new folder.
This is problematic for several consensus clients, because they write things (such as lock files or other metadata) into the directories that the Smartnode creates when it generates new validator keys during a minipool deposit.

To mitigate this challenge and ensure your validator works correctly, please **relax your `umask` settings**.
For example, instead of `0022`, consider setting it to `0002` for the `rp` user.

Every system is different, so please consult [a guide](https://www.howtogeek.com/812961/umask-linux/) that covers your operating system to learn how to do this.

::: warning WARNING
This step is *crucial* to ensure the automatic staking and validating duties are handled properly.
If you notice permissions problems in your validator client's logs after your minipool passes the 12-hour scrub check and enters `staking` status, you likely need to run `sudo chmod 775` on the folder containing your validator keys so your validator client service can write to that folder.
:::


### Reloading the Validator Client Service

With these changes made, you can now reload and restart the validator client service using the following:
```
sudo systemctl daemon-reload

sudo systemctl restart <vc-service>
```

**If not using Prysm**, please watch the validator client's logs carefully (or the beacon node's logs in the case of Nimbus) to ensure that it successfully starts and that the following are defined correctly:

- The fee recipient
- The data path
- The wallet / keys / secrets path

For example, you can verify this with `ps aux | grep fee`, to filter the running processes and look at the fee recipient that your validator client is using.
**It must be the same one that is defined in `/srv/rocketpool/data/validators/rp-fee-recipient-env.txt`.**

If they are all using the correct values, then congratulations!
You've successfully set up your Rocket Pool node and can follow the next sections of the guide to learn how to use it.


## Next Steps

Now that your clients are installed, we recommend you take a look at the security suggestions in the [Securing your Node](./securing-your-node.md) section next.
As you're running a Native setup, you have likely done some of these things already; nevertheless, it doesn't hurt to at least explore it and see how well the recommended security posture fits with your system.
