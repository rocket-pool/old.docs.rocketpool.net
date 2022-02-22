# Configuring a Standard Rocket Pool Node with Docker

In this section, we will walk through the process of installing the Rocket Pool Smartnode stack using the standard [Docker](https://www.docker.com/resources/what-container)-based setup. 
This will install and configure everything you need to run a complete node, including:
- The Rocket Pool Smartnode software
- An ETH1 client of your choice
- An ETH2 client of your choice

All you need to do is tell it what you want to run!

::: tip NOTE
The below instructions require you to use your system's **terminal** to enter and execute commands.
If you are connected to the node machine via SSH, you are already doing this.
If you are on the node machine and using a Desktop UI, you will need to open a terminal window to execute the following commands.
Refer to your OS's instructions to learn how to do this if you are unfamiliar.
:::


## Process Overview

At a high level, here's what is involved in installing Rocket Pool:

1. Download the Rocket Pool command-line interface (CLI)
1. Use the CLI to install the Smartnode stack
1. Use the CLI to configure the Smartnode stack with a simple interview
1. Done!


## Downloading the Rocket Pool CLI

The instructions for downloading the CLI vary based on your Operating System.

::: warning NOTE
You must perform the following instructions **on the machine you will use for your Rocket Pool node.**
If you are not using a keyboard and monitor directly connected to your node machine, you will need to access it remotely (e.g. via SSH) and run these commands on it through that remote connection.
:::

:::: tabs

::: tab Linux

On Linux, start by creating a new folder that will hold the CLI application:
```shell
mkdir -p ~/bin
```

Next, download the CLI.
This depends on what architecture your system uses.

For `x64` systems (most normal computers):
```shell
wget https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-cli-linux-amd64 -O ~/bin/rocketpool
```

For `arm64` systems, such as the Raspberry Pi:
```shell
wget https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-cli-linux-arm64 -O ~/bin/rocketpool
```

Mark it as executable, so it has permissions to run:
```shell
chmod +x ~/bin/rocketpool
```

Next, **log out and log back in** (or close SSH and reconnect), or simply restart.
This is because the path that you saved the CLI to (`~/bin`) may not be in your system's `PATH` variable (the list of places your system searches for executables) yet.
Logging out and back in will put it there. 

Now, test running it with the `--version` flag.
You should see output like this:
```
$ rocketpool --version

rocketpool version 1.0.0-rc1
```

::: tip
If you see an error message like this,
```
-bash: /home/user/rocketpool: cannot execute binary file: Exec format error
```

it means that you downloaded the wrong version above.
Please check if your system is **x64** or **arm64**, and download the appropriate version.
If your system is neither of those, then you will not be able to run Rocket Pool.
:::

::: tab macOS

On macOS, download the CLI for your machine with the following command.

For `x64` systems (most Macs):
```shell
wget https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-cli-darwin-amd64 -O /usr/local/bin/rocketpool
```

For `arm64` systems, such as the Mac mini with M1:
```shell
wget https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-cli-darwin-arm64 -O /usr/local/bin/rocketpool
```

Mark it as executable, so it has permissions to run:
```shell
chmod +x /usr/local/bin/rocketpool
```

Now, test running it with the `--version` flag.
You should see output like this:
```
$ rocketpool --version

rocketpool version 1.0.0
```

::: tip
If you see an error message like this,
```
/usr/local/bin/rocketpool: Exec format error
```

it means that you downloaded the wrong version above.
Please check if your system is x64 or arm64, and download the appropriate version.
If your system is neither of those, then you will not be able to run Rocket Pool.
:::

::::


## Installing the Smartnode Stack

Now that you have the CLI installed, you can deploy the Smartnode stack.
This will prepare your system with Docker, [docker-compose](https://docs.docker.com/compose/), and load the Smartnode files so they're ready to go.
It won't actually run anything yet; that comes later.

To deploy the Smartnode stack, you will need to run the following command on your node machine (either by logging in locally, or connecting remotely such as through SSH).

::: warning TIP
Choose whether you want to use the Prater test network to test Rocket Pool with free test ETH, or if you want to use the real Ethereum main network to stake real ETH, and follow the corresponding tab below.
:::

:::: tabs
::: tab The Ethereum Main Network
```
rocketpool service install
```
:::

::: tab The Prater Test Network
```
rocketpool service install -n prater
```
:::
::::

This will grab the latest version of the Smartnode stack and set it up.
You should see output like this at the end:

```
Step 5 of 7: Creating Rocket Pool user data directory...
Step 6 of 7: Downloading Rocket Pool package files...
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   651  100   651    0     0   3271      0 --:--:-- --:--:-- --:--:--  3271
100 7845k  100 7845k    0     0  5689k      0  0:00:01  0:00:01 --:--:-- 10.2M
Step 7 of 7: Copying package files to Rocket Pool user data directory...
```

If there aren't any error messages, then the installation was successful.
By default, it will be put into the `~/.rocketpool` directory inside of your user account's home folder.

Note that the Smartnode installer cannot install `docker` and `docker-compose` on all platforms automatically.
If you receive an error message like this during the installation:

```
Automatic dependency installation for the Mint operating system is not supported.
Please install docker and docker-compose manually, then try again with the '-d' flag to skip OS dependency installation.
Be sure to add yourself to the docker group with 'sudo usermod -aG docker $USER' after installing docker.
Log out and back in, or restart your system after you run this command.
```

Then you simply have to install those two things manually.

Docker provides common [install instructions here](https://docs.docker.com/engine/install/).

Docker-compose provides common [install instructions here](https://docs.docker.com/compose/install/).

Once both are installed, make sure you give your user account permission to use Docker:
```shell
sudo usermod -aG docker $USER
```

After this, **log out and back in or restart your SSH session** for the settings to take effect.

Finally, re-run the installer with the `-d` flag to skip Docker installation:
:::: tabs
::: tab The Ethereum Main Network
```
rocketpool service install -d
```
:::

::: tab The Prater Test Network
```
rocketpool service install -n prater -d
```
:::
::::

Once this is finished, the Smartnode stack will be ready to run.


## Configuring Docker's Storage Location

By default, Docker will store all of its container data on your operating system's drive.
In some cases, this is not what you want.
For example, on **Raspberry Pi** systems, all of the chain data should be stored on the external SSD, not on the MicroSD card.

::: tip NOTE
If you are fine with this default behavior, skip down to the next section.
:::

To do this, create a new file called `/etc/docker/daemon.json` as the root user:

```
$ sudo nano /etc/docker/daemon.json
```

This will be empty at first, which is fine. Add this as the contents:

```
{
    "data-root": "<your external mount point>/docker"
}
```

where `<your external mount point>` is the directory that your other drive is mounted to.
In the case of Raspberry Pi users, it should be `/mnt/rpdata` or whatever folder you set up in the [Preparing a Raspberry Pi](./local/prepare-pi.md) section.

Press `Ctrl+O, Enter` to save the file, and `Ctrl+X, Enter` to exit the editor.

Next, make the folder:
```
sudo mkdir -p <your external mount point>/docker
```

(Again, for example, this would be `/mnt/rpdata/docker` for Raspberry Pi users.)

Now, restart the docker daemon so it picks up on the changes:
```
sudo systemctl restart docker
```

After that, Docker will store its data on your desired disk.


## Configuring the Smartnode Stack

With all of that setup finished, you can now configure the Smartnode stack with your choice of ETH1 and ETH2 clients, and their custom settings.
To do this, run the configuration command:

```
rocketpool service config
```

This will launch a CLI-based interview that will ask you a few questions to help make configuration easy.

The first question you will see is as follows:

```
Some settings (such as port selection) come with recommended defaults.
Would you like to use them automatically? You can review them at the end of this setup. [y/n]
```

Rocket Pool has many settings, including:

- The network ports to run its various services on
- The maximum number of peers the ETH1 and ETH2 clients should connect to
- Login information if you want to publish your node's statistics to the [ethstats](https://ethstats.net/) monitor

Many people tend to leave these at their default recommended values.

If you answer `y`, Rocket Pool will use the recommended default values for most of the settings, and only ask you about settings that don't have defaults - this is the **standard configuration mode**.

If you answer `n`, it will show you all of the settings so you can change each one individually - this is **advanced configuration mode**.

While going through the sections below, choose the tab that corresponds to the mode you selected.


### ETH1 Configuration

The first main question will be you about which ETH1 client you want to use.
For help deciding on an option, consult the [Choosing your ETH Clients](./eth-clients.md) section.

The prompt will look like this:

```
Which Eth 1.0 client would you like to run?
1: Geth 	Geth is one of the three original implementations of the
 		    Ethereum protocol. It is written in Go, fully open source and
 		    licensed under the GNU LGPL v3.
		    https://geth.ethereum.org/

2: Infura 	Use infura.io as a light client for Eth 1.0. Not recommended
 		    for use in production.
		    https://infura.io/

3: Pocket 	Use Pocket Network as a light client for Eth 1.0. Suitable
 		    for use in production.
		    https://dashboard.pokt.network/

4: Custom 	Use a custom Eth 1.0 client at a specified address (does not
 		    work on localhost).
```

::: tip NOTE
If you already ran `service config` before and selected an ETH1 client, the interview will ask if you want to continue using the same client first.
::: 

For this configuration mode, where Rocket Pool will install and manage your ETH1 and ETH2 clients, select between Geth, Infura, Pocket, or a custom ETH1 endpoint (for advanced users).

::::::: tabs

:::::: tab Geth

::::: tabs

:::: tab Standard Configuration

The standard configuration for Geth does not ask you any questions.
It will use the following default values:

- Ethstats Label: (None, disabled)
- Ethstats Login: (None, disabled)
- Cache Size: 1024 MB for `x64` systems, 512 MB for `arm64` systems
- Max Peers: 50 for `x64` systems, 12 for `arm64` systems
- P2P Port: 30303

::: tip NOTE
To make sure Geth can sync quickly, you may want to **open up the P2P port in your router's port forwarding setup**.
Configure it to forward **port 30303** on both TCP and UDP to your machine's local IP address
This way, other ETH1 clients can discover it and communicate with it from the outside.

Each router has a different way of doing this, so **you'll need to check out your router's manual on how to set up port forwarding**.
:::
::::

:::: tab Advanced Configuration

If you select Geth, you will be presented with the following questions:

```
Please enter the Ethstats Label (leave blank for none)
(optional - for reporting Eth 1.0 node status to ethstats.net)
```

This refers to a statistics aggregation service called [ethstats](https://ethstats.net/), which tracks some information about your node.
It isn't required and can be left blank to ignore it.

```
Please enter the Ethstats Login (leave blank for none)
(optional - for reporting Eth 1.0 node status to ethstats.net)
```

This lets you enter your `ethstats` credentials for data reporting if you're using that service.
Again, this is optional and can be left blank.

```
Please enter the Cache Size (leave blank for the default of 1024)
(Geth's cache size, in MB - set this to 256 if you have 4 GB
 of RAM, or 512 if you have 8 GB)
```

 This lets you specify how much RAM you want Geth to use for its internal cache.
 By default, **x64** systems will use **1024 MB** and **arm64** systems will use **256 MB**.
 We have provided some guidance on general rules of thumb to set this to based on your total system RAM.

 **Raspberry Pi** users can safely set this to **512 MB** if planning to use **Nimbus** for the ETH2 client; otherwise, it should be left at **256 MB**.

 ```
 Please enter the Max Peers (leave blank for the default of 50)
(The maximum number of peers that Geth should connect to -
 this can be lowered down to 12 to improve performance on low-power
 systems or constrained networks)
 ```

 This determines how many peers Geth will connect to.
 Generally, a lower peer count means lower overall data usage and lower system resource consumption.
 For low-power systems, this can lead to better overall validator performance.
 However, with a lower peer count, any actions you perform may take slightly longer to propagate out to the entire ETH1 network.

 For **x64** systems, this defaults to **50** and for **arm64** systems this defaults to **12**.

```
Please enter the P2P Port (leave blank for the default of 30303)
(The port for Geth to use for P2P (blockchain) traffic)
```

This determines the TCP and UPD port that Geth will use for P2P traffic to communicate with other ETH1 nodes.
If you have a specific setup where the default port of 30303 is not available, you can change it here.

::: tip NOTE
To make sure Geth can sync quickly, you may want to **open up the P2P port in your router's port forwarding setup**.
Configure it to forward **port 30303** (or whichever port you specified) on both TCP and UDP to your machine's local IP address
This way, other ETH1 clients can discover it and communicate with it from the outside.

Each router has a different way of doing this, so **you'll need to check out your router's manual on how to set up port forwarding**.
:::

::::
:::::

::::::

:::::: tab Infura

::::: tabs

:::: tab Standard Configuration

If you select Infura, you will be presented with the following questions:

```
Please enter the Infura Project ID
(the ID of your project created in Infura)
```

When you create an Infura account, you will be given a unique project ID which is a 32-character hexadecimal string.
Enter it here.

::::

:::: tab Advanced Configuration

If you select Infura, you will be presented with the following questions:

```
Please enter the Infura Project ID
(the ID of your project created in Infura)
```

When you create an Infura account, you will be given a unique project ID which is a 32-character hexadecimal string.
Enter it here.

::::
:::::
::::::

:::::: tab Pocket

::::: tabs

:::: tab Standard Configuration

The standard configuration for Pocket does not ask you any questions.
It will use the default Pocket Gateway ID that the Pocket team has generously donated to Rocket Pool so node operators can use the network for free.

::::

:::: tab Advanced Configuration

If you select Pocket, you will be presented with the following questions:

```
Please enter the Pocket App or Load Balancer ID (leave blank for the standard Rocket Pool project ID for Pocket)
(the ID of your Pocket App; if you use a Load Balancer, prefix it with lb/)
```

Pocket has generously allowed Rocket Pool node operators to use their network for free.
If you leave this blank, you can connect to the Pocket network using Rocket Pool's default project ID.
If you have your own account with Pocket and would like to use that instead, you can enter it here.

::::
:::::
::::::

:::::::


### ETH1 Fallback Configuration

The next question will ask you to choose a **fallback ETH1 client**:

```
Would you like to configure a second Eth 1.0 client to act as a fallback in case your primary Eth 1.0 client is unavailable? [y/n]
```

This is a secondary ETH1 client that is configured to run in standby mode and can take over for your primary client if it ever fails.

For example, this is an extremely useful option if you selected `geth` as your primary client, but you need to [take it down for maintenance](./geth-pruning.md).

The prompt will look like this:

```
Which Eth 1.0 Fallback client would you like to run?
1: Infura 	Use infura.io as a light client for Eth 1.0. Not recommended
 		    for use in production.
		    https://infura.io/

2: Pocket 	Use Pocket Network as a light client for Eth 1.0. Suitable
 		    for use in production.
		    https://dashboard.pokt.network/

3: Custom 	Use a custom Eth 1.0 client at a specified address (does not
 		    work on localhost).
```

::: tip NOTE
Note that Geth is not included in this list, because generally running two copies of Geth on a typical node is prohibitively expensive from a resource perspective.
:::

Select which one you'd like to use here.
The configuration options are the same as they were in the previous section where you chose a primary ETH1 client.

::::::: tabs

:::::: tab Infura

::::: tabs

:::: tab Standard Configuration

If you select Infura, you will be presented with the following questions:

```
Please enter the Infura Project ID
(the ID of your project created in Infura)
```

When you create an Infura account, you will be given a unique project ID which is a 32-character hexadecimal string.
Enter it here.

::::

:::: tab Advanced Configuration

If you select Infura, you will be presented with the following questions:

```
Please enter the Infura Project ID
(the ID of your project created in Infura)
```

When you create an Infura account, you will be given a unique project ID which is a 32-character hexadecimal string.
Enter it here.

::::
:::::
::::::

:::::: tab Pocket

::::: tabs

:::: tab Standard Configuration

The standard configuration for Pocket does not ask you any questions.
It will use the default Pocket Gateway ID that the Pocket team has generously donated to Rocket Pool so node operators can use the network for free.

::::

:::: tab Advanced Configuration

If you select Pocket, you will be presented with the following questions:

```
Please enter the Pocket App or Load Balancer ID (leave blank for the standard Rocket Pool project ID for Pocket)
(the ID of your Pocket App; if you use a Load Balancer, prefix it with lb/)
```

Pocket has generously allowed Rocket Pool node operators to use their network for free.
If you leave this blank, you can connect to the Pocket network using Rocket Pool's default project ID.
If you have your own account with Pocket and would like to use that instead, you can enter it here.

::::
:::::
::::::

:::::::


### ETH2 Configuration

Once you're finished configuring the ETH1 client, you will be prompted with this question:

```
Would you like to run a random Eth 2.0 client (recommended)? [y/n]
```

Rocket Pool is firmly committed to the health and diversity of the Beacon Chain, which means we do not favor one client over another.
To this end, the default behavior is to run a **random ETH2 client**.
All four clients are stable and perform very well, so there is no wrong choice (depending on your available hardware resources).
Therefore, choosing a random client with not negatively impact your validators but will contribute to the security of the ETH2 ecosystem.

That being said, we also offer you the option to choose a specific client if you have one in mind.
For example, users with low-power systems such as the **Raspberry Pi** may want to explicitly pick an ETH2 client that is tailored to systems with low resources.

For help comparing the ETH2 clients, consult the [Choosing your ETH Clients](./eth-clients.md) section.

::::::: tabs

:::::: tab Lighthouse

::::: tabs

:::: tab Standard Configuration

The standard configuration for Lighthouse will assign the following defaults:

- Max Peers: 50
- P2P Port: 9001

In addition, you will be asked the following questions:

```
Please enter the Custom Graffiti (leave blank for none)
(optional - for adding custom text to signed Eth 2.0 blocks - 16 chars max)
```

When your validator proposes a block on the ETH2 chain, you are allowed to include a short custom string that will be included in it and available for everyone to see.
This is called the block's `graffiti`.
You can enter a custom message here if you like or leave it blank.

```
Please enter the Checkpoint Sync Provider (leave blank for none)
(If you would like to instantly sync using an existing Beacon node, enter its URL.
 Example: https://<project ID>:<secret>@eth2-beacon-prater.infura.io
 Leave this blank if you want to sync normally from the start of the chain.)
```

Lighthouse has the ability to instantly sync to the latest block on the Beacon Chain network by connecting to an existing Beacon Node that you trust.
This is preferred over conventional syncing because it doesn't require any time (whereas conventional syncing can take days) and comes with some security benefits.
Take a look at [their documentation on checkpoint syncing](https://lighthouse-book.sigmaprime.io/checkpoint-sync.html) for more information if you are curious.

You can enter the URL of any Beacon Node that provides access to its REST API here.
One popular option is Infura, which offers this service for free (though it requires you to create an account).

See [the section below on Checkpoint Syncing](#eth2-checkpoint-syncing-with-infura) if you'd like to use it.

```
Would you like to enable Doppelgänger Detection? [y/n]
(If enabled, Lighthouse will *intentionally* miss 1 or 2 attestations on startup to check
 if validator keys are already running elsewhere. If they are, Lighthouse will disable
 validation duties for them to prevent you from being slashed.)
```

Lighthouse supports a feature called [Doppelgänger Detection](https://lighthouse-book.sigmaprime.io/validator-doppelganger.html).
In a nutshell, this feature will **intentionally** miss a few attestations after Lighthouse's Validator Client restarts; while doing this, it will listen to see if attestations are still being sent to the network using your validator keys.

Ideally, there would not be any attestations (which means no other machine is running with your validator keys attached).
After its short waiting period, Lighthouse would start validating normally.

*However*, if there *is* another machine running with your validator keys attached, then Lighthouse will immediately shut down and issue an error message in its log files.
The reason for this is that if it were to start attesting as well, then you would start **double attesting** which is a **slashable offense**.
When slashed, your validator would be forcibly exited from the Beacon chain and you would be penalized a significant amount of ETH.

Most of the time, doppelgänger detection will result in nothing but a few missed attestations after a client restart.
In situations where you are moving your validator to a new machine or you are changing to a new Beacon client, however, **doppelgänger detection can prevent you from being slashed by double attesting accidentally**.

Think of it as cheap insurance for your minipools; you'll miss a trivial bit of profit every time you restart, but you can be fairly confident that you won't accidentally run your keys in two places and get slashed for it.

::: tip NOTE
To make sure your ETH2 can sync quickly, you may want to **open up the P2P port in your router's port forwarding setup**.
Configure it to forward **port 9001** on both TCP and UDP to your machine's local IP address.
This way, other ETH2 clients can discover it and communicate with it from the outside.

Each router has a different way of doing this, so **you'll need to check out your router's manual on how to set up port forwarding**.
:::

::::

:::: tab Advanced Configuration

Lighthouse's configuration includes the following questions:

```
Please enter the Custom Graffiti (leave blank for none)
(optional - for adding custom text to signed Eth 2.0 blocks - 16 chars max)
```

When your validator proposes a block on the ETH2 chain, you are allowed to include a short custom string that will be included in it and available for everyone to see.
This is called the block's `graffiti`.
You can enter a custom message here if you like or leave it blank.

```
Please enter the Checkpoint Sync Provider (leave blank for none)
(If you would like to instantly sync using an existing Beacon node, enter its URL.
 Example: https://<project ID>:<secret>@eth2-beacon-prater.infura.io
 Leave this blank if you want to sync normally from the start of the chain.)
```

Lighthouse has the ability to instantly sync to the latest block on the Beacon Chain network by connecting to an existing Beacon Node that you trust.
This is preferred over conventional syncing because it doesn't require any time (whereas conventional syncing can take days) and comes with some security benefits.
Take a look at [their documentation on checkpoint syncing](https://lighthouse-book.sigmaprime.io/checkpoint-sync.html) for more information if you are curious.

You can enter the URL of any Beacon Node that provides access to its REST API here.
One popular option is Infura, which offers this service for free (though it requires you to create an account).

See [the section below on Checkpoint Syncing](#eth2-checkpoint-syncing-with-infura) if you'd like to use it.

```
Please enter the Target Peers (leave blank for the default of 50
(The number of peer connections to maintain - you can try
 lowering this if you have a low-resource system or a constrained
 network)
```

This lets you specify a maximum number of P2P peers that Lighthouse should connect to in order to share the state of the Beacon chain.
If you find that your node is running out of resources, you can run `rocketpool service config` again and change this to a lower value, which may improve performance and lower your network data usage.

```
Please enter the P2P Port (leave blank for the default of 9001)
(The port to use for P2P (blockchain) traffic)
```

This is the TCP and UDP port that the ETH2 client will use to connect to its peers.
It is safe to leave this at the default setting of 9001 unless your system already uses that port for something else.

```
Would you like to enable Doppelgänger Detection? [y/n]
(If enabled, Lighthouse will *intentionally* miss 1 or 2 attestations on startup to check
 if validator keys are already running elsewhere. If they are, Lighthouse will disable
 validation duties for them to prevent you from being slashed.)
```

Lighthouse supports a feature called [Doppelgänger Detection](https://lighthouse-book.sigmaprime.io/validator-doppelganger.html).
In a nutshell, this feature will **intentionally** miss a few attestations after Lighthouse's Validator Client restarts; while doing this, it will listen to see if attestations are still being sent to the network using your validator keys.

Ideally, there would not be any attestations (which means no other machine is running with your validator keys attached).
After its short waiting period, Lighthouse would start validating normally.

*However*, if there *is* another machine running with your validator keys attached, then Lighthouse will immediately shut down and issue an error message in its log files.
The reason for this is that if it were to start attesting as well, then you would start **double attesting** which is a **slashable offense**.
When slashed, your validator would be forcibly exited from the Beacon chain and you would be penalized a significant amount of ETH.

Most of the time, doppelgänger detection will result in nothing but a few missed attestations after a client restart.
In situations where you are moving your validator to a new machine or you are changing to a new Beacon client, however, **doppelgänger detection can prevent you from being slashed by double attesting accidentally**.

Think of it as cheap insurance for your minipools; you'll miss a trivial bit of profit every time you restart, but you can be fairly confident that you won't accidentally run your keys in two places and get slashed for it.

::: tip NOTE
To make sure your ETH2 can sync quickly, you may want to **open up the P2P port in your router's port forwarding setup**.
Configure it to forward **port 9001** (or whichever port you specified) on both TCP and UDP to your machine's local IP address.
This way, other ETH2 clients can discover it and communicate with it from the outside.

Each router has a different way of doing this, so **you'll need to check out your router's manual on how to set up port forwarding**.
:::

::::
:::::
::::::

:::::: tab Nimbus

::::: tabs

:::: tab Standard Configuration

The standard configuration for Nimbus will assign the following defaults:

- Max Peers: 160 on `x64` systems, 80 on `arm64` systems
- P2P Port: 9001

In addition, you will be asked the following questions:

```
Please enter the Custom Graffiti (leave blank for none)
(optional - for adding custom text to signed Eth 2.0 blocks - 16 chars max)
```

When your validator proposes a block on the ETH2 chain, you are allowed to include a short custom string that will be included in it and available for everyone to see.
This is called the block's `graffiti`.
You can enter a custom message here if you like or leave it blank.

```
Please enter the Checkpoint Sync Provider (leave blank for none)
(If you would like to instantly sync using an existing Beacon node, enter its URL.
 Example: https://<project ID>:<secret>@eth2-beacon-prater.infura.io
 Leave this blank if you want to sync normally from the start of the chain.)
```

Nimbus has the ability to instantly sync to the latest block on the Beacon Chain network by connecting to an existing Beacon Node that you trust.
This is preferred over conventional syncing because it doesn't require any time (whereas conventional syncing can take days) and comes with some security benefits.
Take a look at [their documentation on checkpoint syncing](https://nimbus.guide/trusted-node-sync.html) for more information if you are curious.

You can enter the URL of any Beacon Node that provides access to its REST API here.
One popular option is Infura, which offers this service for free (though it requires you to create an account).

See [the section below on Checkpoint Syncing](#eth2-checkpoint-syncing-with-infura) if you'd like to use it.

```
Would you like to enable Doppelgänger Detection? [y/n]
(If enabled, Nimbus will *intentionally* miss 1 or 2 attestations on startup to check
 if validator keys are already running elsewhere. If they are, Nimbus will disable
 validation duties for them to prevent you from being slashed.)
```

Nimbus supports a feature called [Doppelgänger Detection](https://nimbus.guide/faq.html#why-does-my-validator-miss-two-epochs-of-attestations-after-restarting).
In a nutshell, this feature will **intentionally** miss a few attestations after Nimbus restarts; while doing this, it will listen to see if attestations are still being sent to the network using your validator keys.

Ideally, there would not be any attestations (which means no other machine is running with your validator keys attached).
After its short waiting period, Nimbus would start validating normally.

*However*, if there *is* another machine running with your validator keys attached, then Nimbus will immediately shut down and issue an error message in its log files.
The reason for this is that if it were to start attesting as well, then you would start **double attesting** which is a **slashable offense**.
When slashed, your validator would be forcibly exited from the Beacon chain and you would be penalized a significant amount of ETH.

Most of the time, doppelgänger detection will result in nothing but a few missed attestations after a client restart.
In situations where you are moving your validator to a new machine or you are changing to a new Beacon client, however, **doppelgänger detection can prevent you from being slashed by double attesting accidentally**.

Think of it as cheap insurance for your minipools; you'll miss a trivial bit of profit every time you restart, but you can be fairly confident that you won't accidentally run your keys in two places and get slashed for it.

::: tip NOTE
To make sure your ETH2 can sync quickly, you may want to **open up the P2P port in your router's port forwarding setup**.
Configure it to forward **port 9001** on both TCP and UDP to your machine's local IP address.
This way, other ETH2 clients can discover it and communicate with it from the outside.

Each router has a different way of doing this, so **you'll need to check out your router's manual on how to set up port forwarding**.
:::

::::

:::: tab Advanced Configuration

Nimbus's configuration includes the following questions:

```
Please enter the Custom Graffiti (leave blank for none)
(optional - for adding custom text to signed Eth 2.0 blocks - 16 chars max)
```

When your validator proposes a block on the ETH2 chain, you are allowed to include a short custom string that will be included in it and available for everyone to see.
This is called the block's `graffiti`.
You can enter a custom message here if you like or leave it blank.

```
Please enter the Checkpoint Sync Provider (leave blank for none)
(If you would like to instantly sync using an existing Beacon node, enter its URL.
 Example: https://<project ID>:<secret>@eth2-beacon-prater.infura.io
 Leave this blank if you want to sync normally from the start of the chain.)
```

Nimbus has the ability to instantly sync to the latest block on the Beacon Chain network by connecting to an existing Beacon Node that you trust.
This is preferred over conventional syncing because it doesn't require any time (whereas conventional syncing can take days) and comes with some security benefits.
Take a look at [their documentation on checkpoint syncing](https://nimbus.guide/trusted-node-sync.html) for more information if you are curious.

You can enter the URL of any Beacon Node that provides access to its REST API here.
One popular option is Infura, which offers this service for free (though it requires you to create an account).

See [the section below on Checkpoint Syncing](#eth2-checkpoint-syncing-with-infura) if you'd like to use it.

```
Please enter the Max Peers (leave blank for the default of 160)
(The maximum number of peers to try to connect to - you
 can try lowering this if you have a low-resource system or
 a constrained network)
```

This lets you specify a maximum number of P2P peers that Nimbus should connect to in order to share the state of the Beacon chain.
If you find that your node is running out of resources, you can run `rocketpool service config` again and change this to a lower value, which may improve performance and lower your network data usage.

```
Please enter the P2P Port (leave blank for the default of 9001)
(The port to use for P2P (blockchain) traffic)
```

This is the TCP and UDP port that the ETH2 client will use to connect to its peers.
It is safe to leave this at the default setting of 9001 unless your system already uses that port for something else.

```
Would you like to enable Doppelgänger Detection? [y/n]
(If enabled, Nimbus will *intentionally* miss 1 or 2 attestations on startup to check
 if validator keys are already running elsewhere. If they are, Nimbus will disable
 validation duties for them to prevent you from being slashed.)
```

Nimbus supports a feature called [Doppelgänger Detection](https://nimbus.guide/faq.html#why-does-my-validator-miss-two-epochs-of-attestations-after-restarting).
In a nutshell, this feature will **intentionally** miss a few attestations after Nimbus restarts; while doing this, it will listen to see if attestations are still being sent to the network using your validator keys.

Ideally, there would not be any attestations (which means no other machine is running with your validator keys attached).
After its short waiting period, Nimbus would start validating normally.

*However*, if there *is* another machine running with your validator keys attached, then Nimbus will immediately shut down and issue an error message in its log files.
The reason for this is that if it were to start attesting as well, then you would start **double attesting** which is a **slashable offense**.
When slashed, your validator would be forcibly exited from the Beacon chain and you would be penalized a significant amount of ETH.

Most of the time, doppelgänger detection will result in nothing but a few missed attestations after a client restart.
In situations where you are moving your validator to a new machine or you are changing to a new Beacon client, however, **doppelgänger detection can prevent you from being slashed by double attesting accidentally**.

Think of it as cheap insurance for your minipools; you'll miss a trivial bit of profit every time you restart, but you can be fairly confident that you won't accidentally run your keys in two places and get slashed for it.

::: tip NOTE
To make sure your ETH2 can sync quickly, you may want to **open up the P2P port in your router's port forwarding setup**.
Configure it to forward **port 9001** (or whichever port you specified) on both TCP and UDP to your machine's local IP address.
This way, other ETH2 clients can discover it and communicate with it from the outside.

Each router has a different way of doing this, so **you'll need to check out your router's manual on how to set up port forwarding**.
:::

::::
:::::
::::::

:::::: tab Prysm

::::: tabs

:::: tab Standard Configuration

The standard configuration for Prysm will assign the following defaults:

- Max Peers: 45
- P2P Port: 9001

In addition, you will be asked the following questions:

```
Please enter the Custom Graffiti (leave blank for none)
(optional - for adding custom text to signed Eth 2.0 blocks - 16 chars max)
```

When your validator proposes a block on the ETH2 chain, you are allowed to include a short custom string that will be included in it and available for everyone to see.
This is called the block's `graffiti`.
You can enter a custom message here if you like or leave it blank.

```
Would you like to enable Doppelgänger Detection? [y/n]
(If enabled, Prysm will *intentionally* miss 1 or 2 attestations on startup to check
 if validator keys are already running elsewhere. If they are, Prysm will disable
 validation duties for them to prevent you from being slashed.)
```

Prysm supports a feature called Doppelgänger Detection.
In a nutshell, this feature will **intentionally** miss a few attestations after Prysm's Validator Client restarts; while doing this, it will listen to see if attestations are still being sent to the network using your validator keys.

Ideally, there would not be any attestations (which means no other machine is running with your validator keys attached).
After its short waiting period, Prysm would start validating normally.

*However*, if there *is* another machine running with your validator keys attached, then Prysm will immediately shut down and issue an error message in its log files.
The reason for this is that if it were to start attesting as well, then you would start **double attesting** which is a **slashable offense**.
When slashed, your validator would be forcibly exited from the Beacon chain and you would be penalized a significant amount of ETH.

Most of the time, doppelgänger detection will result in nothing but a few missed attestations after a client restart.
In situations where you are moving your validator to a new machine or you are changing to a new Beacon client, however, **doppelgänger detection can prevent you from being slashed by double attesting accidentally**.

Think of it as cheap insurance for your minipools; you'll miss a trivial bit of profit every time you restart, but you can be fairly confident that you won't accidentally run your keys in two places and get slashed for it.

::: tip NOTE
To make sure your ETH2 can sync quickly, you may want to **open up the P2P port in your router's port forwarding setup**.
Configure it to forward **port 9001** on both TCP and UDP to your machine's local IP address.
This way, other ETH2 clients can discover it and communicate with it from the outside.

Each router has a different way of doing this, so **you'll need to check out your router's manual on how to set up port forwarding**.
:::

::::

:::: tab Advanced Configuration

Prysm's configuration includes the following questions:

```
Please enter the Custom Graffiti (leave blank for none)
(optional - for adding custom text to signed Eth 2.0 blocks - 16 chars max)
```

When your validator proposes a block on the ETH2 chain, you are allowed to include a short custom string that will be included in it and available for everyone to see.
This is called the block's `graffiti`.
You can enter a custom message here if you like or leave it blank.

```
Please enter the Max Peers (leave blank for the default of 45)
(The maximum number of peers to try to connect to - you
 can try lowering this if you have a low-resource system or
 a constrained network)
```

This lets you specify a maximum number of P2P peers that Prysm should connect to in order to share the state of the Beacon chain.
If you find that your node is running out of resources, you can run `rocketpool service config` again and change this to a lower value, which may improve performance and lower your network data usage.

```
Please enter the P2P Port (leave blank for the default of 9001)
(The port to use for P2P (blockchain) traffic)
```

This is the TCP and UDP port that the ETH2 client will use to connect to its peers.
It is safe to leave this at the default setting of 9001 unless your system already uses that port for something else.

```
Would you like to enable Doppelgänger Detection? [y/n]
(If enabled, Prysm will *intentionally* miss 1 or 2 attestations on startup to check
 if validator keys are already running elsewhere. If they are, Prysm will disable
 validation duties for them to prevent you from being slashed.)
```

Prysm supports a feature called Doppelgänger Detection.
In a nutshell, this feature will **intentionally** miss a few attestations after Prysm's Validator Client restarts; while doing this, it will listen to see if attestations are still being sent to the network using your validator keys.

Ideally, there would not be any attestations (which means no other machine is running with your validator keys attached).
After its short waiting period, Prysm would start validating normally.

*However*, if there *is* another machine running with your validator keys attached, then Prysm will immediately shut down and issue an error message in its log files.
The reason for this is that if it were to start attesting as well, then you would start **double attesting** which is a **slashable offense**.
When slashed, your validator would be forcibly exited from the Beacon chain and you would be penalized a significant amount of ETH.

Most of the time, doppelgänger detection will result in nothing but a few missed attestations after a client restart.
In situations where you are moving your validator to a new machine or you are changing to a new Beacon client, however, **doppelgänger detection can prevent you from being slashed by double attesting accidentally**.

Think of it as cheap insurance for your minipools; you'll miss a trivial bit of profit every time you restart, but you can be fairly confident that you won't accidentally run your keys in two places and get slashed for it.

::: tip NOTE
To make sure your ETH2 can sync quickly, you may want to **open up the P2P port in your router's port forwarding setup**.
Configure it to forward **port 9001** (or whichever port you specified) on both TCP and UDP to your machine's local IP address.
This way, other ETH2 clients can discover it and communicate with it from the outside.

Each router has a different way of doing this, so **you'll need to check out your router's manual on how to set up port forwarding**.
:::

::::
:::::
::::::

:::::: tab Teku

::::: tabs

:::: tab Standard Configuration

The standard configuration for Teku will assign the following defaults:

- Max Peers: 74
- P2P Port: 9001

In addition, you will be asked the following questions:

```
Please enter the Custom Graffiti (leave blank for none)
(optional - for adding custom text to signed Eth 2.0 blocks - 16 chars max)
```

When your validator proposes a block on the ETH2 chain, you are allowed to include a short custom string that will be included in it and available for everyone to see.
This is called the block's `graffiti`.
You can enter a custom message here if you like or leave it blank.

```
Please enter the Checkpoint Sync Provider (leave blank for none)
(If you would like to instantly sync using an existing Beacon node, enter its URL.
 Example: https://<project ID>:<secret>@eth2-beacon-prater.infura.io
 Leave this blank if you want to sync normally from the start of the chain.)
```

Teku has the ability to instantly sync to the latest block on the Beacon Chain network by connecting to an existing Beacon Node that you trust.
This is preferred over conventional syncing because it doesn't require any time (whereas conventional syncing can take days) and comes with some security benefits.
Take a look at [their documentation on checkpoint syncing](https://docs.teku.consensys.net/en/latest/HowTo/Get-Started/Checkpoint-Start/) for more information if you are curious.

You can enter the URL of any Beacon Node that provides access to its REST API here.
One popular option is Infura, which offers this service for free (though it requires you to create an account).

See [the section below on Checkpoint Syncing](#eth2-checkpoint-syncing-with-infura) if you'd like to use it.

::: tip NOTE
To make sure your ETH2 can sync quickly, you may want to **open up the P2P port in your router's port forwarding setup**.
Configure it to forward **port 9001** on both TCP and UDP to your machine's local IP address.
This way, other ETH2 clients can discover it and communicate with it from the outside.

Each router has a different way of doing this, so **you'll need to check out your router's manual on how to set up port forwarding**.
:::

::::

:::: tab Advanced Configuration

Teku's configuration includes the following questions:

```
Please enter the Custom Graffiti (leave blank for none)
(optional - for adding custom text to signed Eth 2.0 blocks - 16 chars max)
```

When your validator proposes a block on the ETH2 chain, you are allowed to include a short custom string that will be included in it and available for everyone to see.
This is called the block's `graffiti`.
You can enter a custom message here if you like or leave it blank.

```
Please enter the Checkpoint Sync Provider (leave blank for none)
(If you would like to instantly sync using an existing Beacon node, enter its URL.
 Example: https://<project ID>:<secret>@eth2-beacon-prater.infura.io
 Leave this blank if you want to sync normally from the start of the chain.)
```

Teku has the ability to instantly sync to the latest block on the Beacon Chain network by connecting to an existing Beacon Node that you trust.
This is preferred over conventional syncing because it doesn't require any time (whereas conventional syncing can take days) and comes with some security benefits.
Take a look at [their documentation on checkpoint syncing](https://docs.teku.consensys.net/en/latest/HowTo/Get-Started/Checkpoint-Start/) for more information if you are curious.

You can enter the URL of any Beacon Node that provides access to its REST API here.
One popular option is Infura, which offers this service for free (though it requires you to create an account).

See [the section below on Checkpoint Syncing](#eth2-checkpoint-syncing-with-infura) if you'd like to use it.

```
Please enter the Max Peers (leave blank for the default of 74)
(The maximum number of peers to try to connect to - you
 can try lowering this if you have a low-resource system or
 a constrained network)
```

This lets you specify a maximum number of P2P peers that Teku should connect to in order to share the state of the Beacon chain.
If you find that your node is running out of resources, you can run `rocketpool service config` again and change this to a lower value, which may improve performance and lower your network data usage.

```
Please enter the P2P Port (leave blank for the default of 9001)
(The port to use for P2P (blockchain) traffic)
```

This is the TCP and UDP port that the ETH2 client will use to connect to its peers.
It is safe to leave this at the default setting of 9001 unless your system already uses that port for something else.

::: tip NOTE
To make sure your ETH2 can sync quickly, you may want to **open up the P2P port in your router's port forwarding setup**.
Configure it to forward **port 9001** (or whichever port you specified) on both TCP and UDP to your machine's local IP address.
This way, other ETH2 clients can discover it and communicate with it from the outside.

Each router has a different way of doing this, so **you'll need to check out your router's manual on how to set up port forwarding**.
:::

::::
:::::
::::::

:::::::


#### ETH2 Checkpoint Syncing with Infura

**Checkpoint syncing** is a very useful technique that some Beacon Chain clients support.
It allows your Beacon client to instantly sync the entire Beacon chain without having to start from the beginning and catch up on every block.
This means instead of taking **days**, your Beacon client can be ready in a matter of **minutes**.
All it needs is access to an existing Beacon client that you trust.

Currently, **Lighthouse**, **Nimbus**, and **Teku** support checkpoint syncing.

You can use any Beacon node that provides access to its HTTP API.
In this example, we will show you how to use the free **Infura** service to do it.
Both the Prater Testnet and Mainnet are supported.

If you don't have an account already, start by heading to [https://infura.io/register](https://infura.io/register) to create one.
You can use the free tier for checkpoint syncing, so all you will need to provide is an email address.

Once you are logged in, head to [the ETH2 project page](https://infura.io/dashboard/eth2).
Create a new project here using the `Create New Project` button.
It can be named anything you want (for example, "RP Checkpoint Sync").

Now, click on the project and go to the `Settings` tab:

<center>

![](./images/infura-settings.png)

</center>

Here, there is a section called `Keys`.
In this section, first select `Mainnet` or `Prater` from the `Endpoints` dropdown, depending on whether you're using the Prater Testnet or Mainnet.

Next, click on the small clipboard icon to the right of the long `https://...` string:

<center>

![](./images/infura-keys.png)

</center>

This is your personal, private access string for Infura's Beacon node.
Clicking on the clipboard icon will copy it to your clipboard.
You can then paste this in the terminal during `rocketpool service config` when it prompts you for a Checkpoint Sync Provider.

After that, your Beacon node will be configured to connect to Infura when it first starts up and instantly pull down the latest state of the chain!


### Metrics Configuration

Rocket Pool comes with the ability to display a detailed dashboard showing metrics about your node's hardware health, system updates, your validator performance, your rewards, information about the overall Rocket Pool network, and more:

<center>

![](./images/nimbus-dashboard.png)

</center>

The next question in the `service config` interview will ask you if you want to enable this:

```
Would you like to enable Rocket Pool's metrics dashboard? [y/n]
```

Answer `y` if you would like to enable it, or `n` if you would rather disable it.

If you choose to enable it, you will learn more about setting it up and how to use it in the [Setting up the Grafana Dashboard](./grafana.md) section later in the process.

Enabling it will create three new Docker containers:

- `rocketpool_prometheus`: this runs [Prometheus](https://prometheus.io/docs/introduction/overview/), a tool that collects, stores, and formats metrics and data from lots of endpoints into one convenient place.
- `rocketpool_exporter` - this runs Prometheus's [Node Exporter](https://prometheus.io/docs/guides/node-exporter/), a small service that collects hardware health about your machine and provides it to Prometheus.
- `rocketpool_grafana` - this runs [Grafana](https://grafana.com/), a webapp for creating and displaying modular dashboards. It connects to Prometheus to get the raw data, then shows it to you in a pretty format like you see in the screenshot above. 

::: warning NOTE
All of the data collected by this system **stays on your machine**.
Rocket Pool does not collect any of the telemetry or send it to a separate service.
It's purely there for you to use so you can monitor your own node!
:::

If you answer `y` to the question, you will go through the configuration process for the metrics service which is described below.

::::: tabs
:::: tab Standard Configuration

In the standard configuration, you will not be asked any further questions.
The following defaults will be set:

- Beacon Node metrics port: 9100
- Validator Client metrics port: 9101
- Rocket Pool node metrics port: 9102
- Node Exporter metrics port: 9103
- Prometheus port: 9091
- Grafana port: 3100

::: warning NOTE
Unlike the ETH1 and ETH2 ports, you **should not** forward any of these ports in your router's configuration.
For security reasons, these should **only** be accessible on your internal network!
:::

::::

:::: tab Advanced Configuration

In the advanced configuration, you will be asked the following questions:

```
Please enter the ETH2 Metrics Port (leave blank for the default of 9100)
(The port for the Beacon Chain client to make its metrics available on)
```

This is the port that your Beacon Node client (`rocketpool_eth2`) will expose its metrics on.
It will host an HTTP server on this port so that Prometheus can access it occasionally and collect details about the Beacon chain.

```
Please enter the Validator Metrics Port (leave blank for the default of 9101)
(The port for the Validator client to make its metrics available on)
```

This is the port that your Validator client (`rocketpool_validator`) will expose its metrics on.
It will host an HTTP server on this port so that Prometheus can access it occasionally and collect details about your validator's duties and performance.

```
Please enter the Rocket Pool Node Metrics Port (leave blank for the default of 9102)
(The port for the Rocket Pool Node to make its metrics available on)
```

This is the port that Rocket Pool's own node container (`rocketpool_node`) will expose its metrics on.
It will host an HTTP server on this port so that Prometheus can access it occasionally and collect details about the Rocket Pool network, your node's performance, and your rewards.

```
Please enter the Node Exporter Metrics Port (leave blank for the default of 9103)
(The port for Prometheus's Node Exporter to make its metrics available on)
```

This is the port that the Node Exporter container (`rocketpool_exporter`) will expose its metrics on.
It will host an HTTP server on this port so that Prometheus can access it occasionally and collect details about your system's hardware health.

```
Please enter the Prometheus Port (leave blank for the default of 9091)
(The port for Prometheus to make its metrics available on)
```

This is the port that the Prometheus container (`rocketpool_prometheus`) will listen for incoming requests on.
It will host an HTTP server on this port so that Grafana can access it to query its collected data.

```
Please enter the Grafana Port (leave blank for the default of 3100)
(The port for Grafana to listen on for HTTP requests)
```

This is the port that the Grafana container (`rocketpool_prometheus`) will host its HTTP server on.
You will specify this port in your browser when connecting to Grafana (e.g. `http://localhost:3100`) to view the dashboard.

::::
:::::

Once you finish setting up the Metrics service, you're finished!


## Wrapping Up

At this point, your configuration is complete.
Congratulations!
You're ready to secure your operating system to protect your node.
Move on to the [Securing your Node](./securing-your-node.md) section next.
