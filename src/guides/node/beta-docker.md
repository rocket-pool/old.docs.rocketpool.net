# [BETA] Configuring a Standard Rocket Pool Node with Docker

:::danger CAUTION
*The following guide is intended for Rocket Pool's beta testers to use with the Release Candidate of v1.3.0.
As this release is still **just for testing on the Prater testnet**, you should *not* look at this page for Mainnet instructions until it has been formally released!
:::

In this section, we will walk through the process of installing the Rocket Pool Smartnode stack using the standard [Docker](https://www.docker.com/resources/what-container)-based setup. 
This will install and configure everything you need to run a complete node, including:
- The Rocket Pool **Smartnode** software
- An **Execution** (formerly ETH1) client of your choice, or a connection to an existing client you already manage 
- A **Consensus** (formerly ETH2) client of your choice, or a connection to an existing client you already manage
- A **Validator** client that will handle your Beacon Chain validation duties
- (Optionally) a **monitoring stack** for capturing performance and health metrics

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
1. Configure the Smartnode stack with an easy-to-use UI in the terminal
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

rocketpool version 1.3.0
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
curl -L https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-cli-darwin-amd64 > /usr/local/bin/rocketpool
```

For `arm64` systems, such as the Mac mini with M1:
```shell
curl -L https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-cli-darwin-arm64 > /usr/local/bin/rocketpool
```

Mark it as executable, so it has permissions to run:
```shell
chmod +x /usr/local/bin/rocketpool
```

Now, test running it with the `--version` flag.
You should see output like this:
```
$ rocketpool --version

rocketpool version 1.3.0
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

To deploy the Smartnode stack, you will need to run the following command on your node machine (either by logging in locally, or connecting remotely such as through SSH):

```
rocketpool service install
```

This will grab the latest version of the Smartnode stack and set it up.
You should see output like this (*above some release notes for the latest version which will be printed at the end*):

```
Step 5 of 8: Checking for existing installation...
Step 5 of 8: Backing up configuration settings to user-settings-backup.yml...
Step 6 of 8: Creating Rocket Pool user data directory...
Step 7 of 8: Downloading Rocket Pool package files...
Step 8 of 8: Copying package files to Rocket Pool user data directory...

The Rocket Pool service was successfully installed!
```

If there aren't any error messages, then the installation was successful.
By default, it will be put into the `~/.rocketpool` directory inside of your user account's home folder.

::: warning NOTE
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

Finally, re-run the installer with the `-d` flag to skip Docker installation:

```
rocketpool service install -d
```
:::

After this, **log out and back in or restart your SSH session** for the settings to take effect.

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


## Configuring the Smartnode Stack via the Wizard

With all of that setup finished, you can now configure the Smartnode stack.
To do this, run the configuration command:

```
rocketpool service config
```

This will launch a terminal-based UI that will allow you to quickly and easily configure your node, as well as provide optional fine-grained control over every setting for advanced customization.

::: tip NOTE
If you've already configured the Smartnode, you will instead be greeted with the [Settings Manager](#configuring-the-smartnode-stack-via-the-settings-manager).
You can choose to re-open the Wizard from there if you prefer it, and all of your existing settings will be pre-selected for you.
:::

When you run the config UI for the first time (or if you choose to run the Wizard again later), you will be presented with a screen that looks like this:

<center>

![](./images/tui-first-time.png)

</center>

::: tip TIP
To use the Wizard, **press the `Arrow Keys` (up/down/left/right) to navigate between things such as buttons (choices) or text boxes**.
You can also use `Tab` and `Shift+Tab` if you prefer - it will do the same thing.

For buttons, **the one that's currently selected will be highlighted in green**.
The ones in black are not selected.
In the screenshot above, `Next` is currently selected and `Quit` is not.

**Press `Enter` or `Space` to select a button**, analogous to clicking on it with the mouse.

**Press `Escape` to go back to the previous dialog** if you changed your mind about something.
This will come in handy as you progress through the various Wizard pages.

**Hold `Ctrl` and press `C` at any time to exit the Wizard without saving anything**.

For example, on the screen above, you could press the `left` and `right` arrow keys to move between the `Next` and `Quit` buttons.

Pressing `Enter` while `Next` is selected will proceeed to the next screen.
Pressing `Enter` while `Quit` is selected will quit the Wizard without saving.
::: 

When you're ready to begin, press `Next`.


### Choosing a Network

In the next screen, you will be asked to choose which network you want to use:

<center>

![](./images/tui-network.png)

</center>

You can highlight the different choices with the `Up` and `Down` arrow keys (or `Tab` and `Shift+Tab`).
When you change choices, the **Description** box on the right will show you a brief description of each option.
This is true for all choice-based pages in the Wizard, not just the network selection, so you will see this style of page frequently.

If you want to practice running a Rocket Pool node on the Prater test network with fake ETH and RPL you can get for free, select **Prater Testnet**.

If you're ready to create a real Rocket Pool node on Mainnet to earn real rewards, select **Mainnet**.


### Execution Client Setup

The next screen will ask you how you would like to manage your Execution Client:

<center>

![](./images/tui-ec-mode.png)

</center>

There are two options here.

**Locally Managed** (formerly called **"Docker Mode"**) is the default choice.
Use it if you don't already have an Execution client and you want the Smartnode to manage one for you.
By choosing this, the Smartnode will add an Execution client as a Docker container to its stack that it can control.
Don't worry, you'll get to choose *which* client you want to run next.

**Externally Managed** (formerly called **"Hybrid Mode"**) is a convenient choice for users that already have an Execution client running elsewhere that they manage manually.
By choosing this, the Smartnode will simply connect to your existing client and will not run one of its own.
For example, users can use this to plug into an Execution client that they currently use for solo staking; that way, they don't need to have two separate copies of an Execution client.

:::warning NOTE
As the Smartnode cannot manage external Execution clients, you will still be responsible for regularly updating yours and diagnosing any issues it may encounter (as you currently do with it today).
:::

Choose which mode you'd like to use for managing your Execution client and follow the steps in the corresponding tab below:

:::::::: tabs
::::::: tab Locally Managed

If you want the Smartnode to manage an Execution client for you, the next screen will ask you to pick a client:

<center>

![](./images/tui-ec-selection.png)

</center>

Please refer to the [Choosing your ETH clients](./eth-clients.md#eth1-clients) section for a description of each option.
Once you've made your choice, click on the appropriate tab below to learn how to configure it:

:::::: tabs
::::: tab Geth

If you choose **Geth**, the Wizard will handle all of the configuration for you.
You can manually adjust some of its parameters at the end of this process, but the defaults that it uses are completely appropriate for node operation.
You can proceed to the next section.


::: warning NOTE
To make sure your Execution client can sync quickly, you may want to **open up the P2P port in your router's port forwarding setup**.
Configure it to forward **port 30303** on both TCP and UDP to your machine's local IP address.
This way, other Execution clients can discover it and communicate with it from the outside.

Each router has a different way of doing this, so **you'll need to check out your router's manual on how to set up port forwarding**.
:::

:::::
::::: tab Infura

If you choose **Infura**, you will be presented with a follow-on screen asking you to enter your Project ID:

<center>

![](./images/tui-infura.png)

</center>

When you created an Infura account and an `Ethereum` project for it, it will be assigned a unique project ID which is a 32-character hexadecimal string.
Note this is the **Project ID**, *not* the **Secret ID**.
Enter the **Project ID** here, and press `Next`.

:::::
::::: tab Pocket

If you choose **Pocket**, the Wizard will handle all of the configuration for you.
You can manually adjust some of its parameters at the end of this process, but the defaults that it uses are completely appropriate for node operation.
You can proceed to the next section.

:::::
::::::
:::::::
::::::: tab Externally Managed

For an externally managed Execution client, the next screen will prompt you for the URLs of its HTTP-based RPC (web3) API and its Websocket-based RPC API:

<center>

![](./images/tui-external-ec.png)

</center>

The Smartnode will use the HTTP URL to communicate with it and perform blockchain activities, such as querying the chain's state and submitting transactions.
**If you don't already have your client's API port enabled and accessible from your Smartnode machine, you will need to set it up now.**
Instructions on this vary from client to client; consult your client's documentation to learn how to set up the HTTP RPC endpoint.

The Websocket URL is only relevant if you are using **Nimbus** as your Consensus client.
If you are using a different client, you can leave it blank.
Otherwise, enter it here.

::: warning NOTE
Because the Smartnode will run in its own Docker container, it will use Docker's internal network.
You won't be able to use hostnames like `localhost` or `127.0.0.1` here; if your Execution client is running on the same machine as the Smartnode, you will need to provide the machine's LAN IP address instead. 
:::

:::::::
::::::::

And with that, your Execution client is all set!


### Fallback Execution Client Setup

The next thing to configure is an optional **fallback** Execution client:

<center>

![](./images/tui-fallback-ec.png)

</center>

Think of this like a "spare" Execution client your node can use in case the primary one you selected in the previous step ever goes down for maintenance (which will almost certainly happen at some point).

Choose **None** if you don't want to use a fallback client.
This isn't recommended, but you have the option if you have a reason not to use one.

**Infura** and **Pocket** behave the same way here as they do in regular Execution client operation; they will just stay idle until your primary Execution client fails, at which point they will take over until it's online again.
*Note that if you selected one of these for your primary Execution client earlier, you should choose a different one for your fallback Execution client.*

**External** a good choice if you already have a secondary Execution client that you maintain yourself elsewhere (such as on a second machine, outside of the Smartnode stack) and want to use that as your fallback client.
If this is selected, the Smartnode will simply switch to that if your primary client fails until it resumes operation.

To learn more about configuring these options, click on the appropriate tab below:

:::::: tabs
::::: tab Infura

If you choose **Infura**, you will be presented with a follow-on screen asking you to enter your Project ID:

<center>

![](./images/tui-fallback-infura.png)

</center>

When you created an Infura account and an `Ethereum` project for it, it will be assigned a unique project ID which is a 32-character hexadecimal string.
Note this is the **Project ID**, *not* the **Secret ID**.
Enter the **Project ID** here, and press `Next`.

:::::
::::: tab Pocket

If you choose **Pocket**, the Wizard will handle all of the configuration for you.
You can manually adjust some of its parameters at the end of this process, but the defaults that it uses are completely appropriate for node operation.
You can proceed to the next section.

:::::
::::: tab External

For an externally managed fallback Execution client, the next screen will prompt you for the URLs of its HTTP-based RPC (web3) API and its Websocket-based RPC API:

<center>

![](./images/tui-fallback-external-ec.png)

</center>

The Smartnode will use the HTTP URL to communicate with it and perform blockchain activities, such as querying the chain's state and submitting transactions.
**If you don't already have your client's API port enabled and accessible from your Smartnode machine, you will need to set it up now.**
Instructions on this vary from client to client; consult your client's documentation to learn how to set up the HTTP RPC endpoint.

The Websocket URL is only relevant if you are using **Nimbus** as your Consensus client.
If you are using a different client, you can leave it blank.
Otherwise, enter it here.

::: warning NOTE
Because the Smartnode will run in its own Docker container, it will use Docker's internal network.
You won't be able to use hostnames like `localhost` or `127.0.0.1` here; if your fallback Execution client is running on the same machine as the Smartnode, you will need to provide the machine's LAN IP address instead. 
:::

:::::
::::::

When you're happy with your fallback Execution client choices, proceed to the next step.


### Consensus Client Setup

Now that you have an Execution and optional fallback Execution client ready, the next task is to set up the Consensus client.
The first thing to do is determine which management mode you'd like to use for it, just like you did for the Execution client earlier:

<center>

![](./images/tui-cc-mode.png)

</center>

As with the Execution client management mode, there are two options here.

**Locally Managed** (formerly called **"Docker Mode"**) is the default choice.
Use it if you don't already have a Consensus client and you want the Smartnode to manage one for you.
By choosing this, the Smartnode will add both a **Beacon Node** (the process used to communicate with the Beacon Chain) and a **Validator Client** (the process used by minipools to validate on the Beacon Chain and earn rewards) as Docker containers that it can control to its stack.
Don't worry, you'll get to choose *which* client you want to run next.

**Externally Managed** (formerly called **"Hybrid Mode"**) is a convenient choice for users that already have a Consensus client running elsewhere that they manage manually.
By choosing this, the Smartnode will simply connect to your existing Beacon Node and will not run one of its own.
However, it *will* run its own Validator Client so it can manage its own validator keys.

For example, users can use this to plug into a Beacon Node that they currently use for solo staking; that way, they don't need to have two separate copies of a Beacon Node.

:::warning NOTE
As the Smartnode cannot manage external Consensus clients, you will still be responsible for regularly updating yours and diagnosing any issues it may encounter (as you currently do with it today).
:::

Choose which mode you'd like to use for managing your Consensus client and follow the steps in the corresponding tab below:

::::::: tabs
:::::: tab Locally Managed

If you want the Smartnode to manage a Consensus client for you, the next screen will ask you to pick a client:

<center>

![](./images/tui-local-cc.png)

</center>

**The preferred choice** for the overall health and diversity of the network is the **Random (Recommended)** choice, which will randomly choose among one of the four supported Consensus clients for you.

If you would prefer to choose an explicit client (for example, if you're on a Raspberry Pi and know you want to use Nimbus), please refer to the [Choosing your ETH clients](./eth-clients.md#eth2-clients) section for a description of each option so you can make an educated decision.

:::warning NOTE
There are two conditions that will prompt you with warnings based on client selection:

- The selected client is currently [a supermajority client](https://clientdiversity.org/), meaning that an unhealthy majority of validators on the Beacon Chain use it which threatens the stability of the network

- The selected client is **too resource-heavy** for the hardware you're currently using

If either of those cases are true for your chosen client, you will be warned and asked to choose a different client.
You have the option of continuing to use the one you selected, but you must be aware of the risks in doing so.
:::

Once you've made your choice or have been assigned a random client, click on the appropriate tab below to learn how to configure it:

:::: tabs
::: tab Lighthouse

The first option in Lighthouse's configuration will ask about your validator's **graffiti** message:

<center>

![](./images/tui-local-graffiti.png)

</center>

This is an optional custom message you can attach to any blocks you propose on the Beacon Chain.
The message will be preserved forever, so think of it like a fun little way to leave your mark!

**Note the maximum length of the graffiti is 16 characters.**

If you'd like to see some examples of what validators are using for Graffiti today, [take a look here](https://beaconcha.in/blocks).

Next up is an option to enable or disable **Checkpoint Sync**:

<center>

![](./images/tui-local-checkpoint.png)

</center>

Lighthouse has the ability to instantly sync to the latest block on the Beacon Chain network by connecting to an existing Beacon Node that you trust.
This is preferred over conventional syncing because it doesn't require any time (whereas conventional syncing can take days) and comes with some security benefits.
Take a look at [their documentation on checkpoint syncing](https://lighthouse-book.sigmaprime.io/checkpoint-sync.html) for more information if you are curious.

You can enter the URL of any Beacon Node that provides access to its REST API here.
One popular option is Infura, which offers this service for free (though it requires you to create an account).

See [the section below on Checkpoint Syncing](#eth2-checkpoint-syncing-with-infura) if you'd like to use it.

The final question will ask if you want to enable Doppelgänger Protection:

<center>

![](./images/tui-local-dd.png)

</center>

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

:::
::: tab Nimbus

The first option in Nimbus's configuration will ask about your validator's **graffiti** message:

<center>

![](./images/tui-local-graffiti.png)

</center>

This is an optional custom message you can attach to any blocks you propose on the Beacon Chain.
The message will be preserved forever, so think of it like a fun little way to leave your mark!

**Note the maximum length of the graffiti is 16 characters.**

If you'd like to see some examples of what validators are using for Graffiti today, [take a look here](https://beaconcha.in/blocks).

Next up is an option to enable or disable **Checkpoint Sync**:

<center>

![](./images/tui-local-checkpoint.png)

</center>

Nimbus has the ability to instantly sync to the latest block on the Beacon Chain network by connecting to an existing Beacon Node that you trust.
This is preferred over conventional syncing because it doesn't require any time (whereas conventional syncing can take days) and comes with some security benefits.
Take a look at [their documentation on checkpoint syncing](https://nimbus.guide/trusted-node-sync.html) for more information if you are curious.

You can enter the URL of any Beacon Node that provides access to its REST API here.
One popular option is Infura, which offers this service for free (though it requires you to create an account).

See [the section below on Checkpoint Syncing](#eth2-checkpoint-syncing-with-infura) if you'd like to use it.

The final question will ask if you want to enable Doppelgänger Protection:

<center>

![](./images/tui-local-dd.png)

</center>

Nimbus supports a feature called [Doppelgänger Protection](https://nimbus.guide/faq.html#why-does-my-validator-miss-two-epochs-of-attestations-after-restarting).
In a nutshell, this feature will **intentionally** miss a few attestations after Nimbus restarts; while doing this, it will listen to see if attestations are still being sent to the network using your validator keys.

Ideally, there would not be any attestations (which means no other machine is running with your validator keys attached).
After its short waiting period, Nimbus would start validating normally.

*However*, if there *is* another machine running with your validator keys attached, then Nimbus will immediately shut down and issue an error message in its log files.
The reason for this is that if it were to start attesting as well, then you would start **double attesting** which is a **slashable offense**.
When slashed, your validator would be forcibly exited from the Beacon chain and you would be penalized a significant amount of ETH.

Most of the time, doppelgänger detection will result in nothing but a few missed attestations after a client restart.
In situations where you are moving your validator to a new machine or you are changing to a new Beacon client, however, **doppelgänger detection can prevent you from being slashed by double attesting accidentally**.

Think of it as cheap insurance for your minipools; you'll miss a trivial bit of profit every time you restart, but you can be fairly confident that you won't accidentally run your keys in two places and get slashed for it.

:::
::: tab Prysm

The first option in Prysm's configuration will ask about your validator's **graffiti** message:

<center>

![](./images/tui-local-graffiti.png)

</center>

This is an optional custom message you can attach to any blocks you propose on the Beacon Chain.
The message will be preserved forever, so think of it like a fun little way to leave your mark!

**Note the maximum length of the graffiti is 16 characters.**

If you'd like to see some examples of what validators are using for Graffiti today, [take a look here](https://beaconcha.in/blocks).

The final question will ask if you want to enable Doppelgänger Protection:

<center>

![](./images/tui-local-dd.png)

</center>

Prysm supports a feature called Doppelgänger Protection.
In a nutshell, this feature will **intentionally** miss a few attestations after Prysm's Validator Client restarts; while doing this, it will listen to see if attestations are still being sent to the network using your validator keys.

Ideally, there would not be any attestations (which means no other machine is running with your validator keys attached).
After its short waiting period, Prysm would start validating normally.

*However*, if there *is* another machine running with your validator keys attached, then Prysm will immediately shut down and issue an error message in its log files.
The reason for this is that if it were to start attesting as well, then you would start **double attesting** which is a **slashable offense**.
When slashed, your validator would be forcibly exited from the Beacon chain and you would be penalized a significant amount of ETH.

Most of the time, doppelgänger detection will result in nothing but a few missed attestations after a client restart.
In situations where you are moving your validator to a new machine or you are changing to a new Beacon client, however, **doppelgänger detection can prevent you from being slashed by double attesting accidentally**.

Think of it as cheap insurance for your minipools; you'll miss a trivial bit of profit every time you restart, but you can be fairly confident that you won't accidentally run your keys in two places and get slashed for it.

:::
::: tab Teku

The first option in Teku's configuration will ask about your validator's **graffiti** message:

<center>

![](./images/tui-local-graffiti.png)

</center>

This is an optional custom message you can attach to any blocks you propose on the Beacon Chain.
The message will be preserved forever, so think of it like a fun little way to leave your mark!

**Note the maximum length of the graffiti is 16 characters.**

If you'd like to see some examples of what validators are using for Graffiti today, [take a look here](https://beaconcha.in/blocks).

The final question is an option to enable or disable **Checkpoint Sync**:

<center>

![](./images/tui-local-checkpoint.png)

</center>

Teku has the ability to instantly sync to the latest block on the Beacon Chain network by connecting to an existing Beacon Node that you trust.
This is preferred over conventional syncing because it doesn't require any time (whereas conventional syncing can take days) and comes with some security benefits.
Take a look at [their documentation on checkpoint syncing](https://docs.teku.consensys.net/en/latest/HowTo/Get-Started/Checkpoint-Start/) for more information if you are curious.

You can enter the URL of any Beacon Node that provides access to its REST API here.
One popular option is Infura, which offers this service for free (though it requires you to create an account).

See [the section below on Checkpoint Syncing](#eth2-checkpoint-syncing-with-infura) if you'd like to use it.

:::
::::

::: warning NOTE
To make sure your Consensus client can sync quickly, you may want to **open up the P2P port in your router's port forwarding setup**.
Configure it to forward **port 9001** on both TCP and UDP to your machine's local IP address.
This way, other Consensus clients can discover it and communicate with it from the outside.

Each router has a different way of doing this, so **you'll need to check out your router's manual on how to set up port forwarding**.
:::

::::::
:::::: tab Externally Managed

Because each Consensus client has slightly different behavior, the Smartnode needs to know which one you're using externally so it can adapt its own behavior accordingly.
Start by choosing which client you have from the list in the next screen:

<center>

![](./images/tui-external-cc.png)

</center>

::: warning NOTE
At this time, **Nimbus** is not compatible with External mode because it cannot run as a standalone Validator Container (VC) yet.
When the client supports this feature, it will be added to the list here.
:::

Select your client from the tabs below to learn how to finish configuring it.

::::: tabs
:::: tab Lighthouse

Start by specifying the URL for your Lighthouse Beacon Node's API:

<center>

![](./images/tui-external-lh.png)

</center>

The Smartnode will use the HTTP URL to communicate with it and perform blockchain activities, such as querying the chain's state and submitting messages.
**If you don't already have the API port enabled and accessible from your Smartnode machine, you will need to set it up now.**
See [Lighthouse's documentation](https://lighthouse-book.sigmaprime.io/api-bn.html) for instructions on how to do this.

::: warning NOTE
Because the Smartnode will run in its own Docker container, it will use Docker's internal network.
You won't be able to use hostnames like `localhost` or `127.0.0.1` here; if your client is running on the same machine as the Smartnode, you will need to provide the machine's LAN IP address instead. 
:::

Next, it will ask about your validator's **graffiti** message:

<center>

![](./images/tui-external-graffiti.png)

</center>

This is an optional custom message you can attach to any blocks you propose on the Beacon Chain.
The message will be preserved forever, so think of it like a fun little way to leave your mark!

**Note the maximum length of the graffiti is 16 characters.**

If you'd like to see some examples of what validators are using for Graffiti today, [take a look here](https://beaconcha.in/blocks).

The final question will ask if you want to enable Doppelgänger Protection:

<center>

![](./images/tui-external-dd.png)

</center>

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

::::
:::: tab Prysm

Start by specifying the URL for your Prysm Beacon Node's API and the URL for its JSON-RPC API:

<center>

![](./images/tui-external-prysm.png)

</center>

The Smartnode will use the HTTP URL to communicate with it and perform blockchain activities, such as querying the chain's state and submitting messages.
It will prepare its Prysm Validator Client with the JSON-RPC URL so it can communicate with your Beacon Node, as *Prysm's Validator Client currently cannot work over the HTTP API.*

**If you don't already have the API ports enabled and accessible from your Smartnode machine, you will need to set them up now.**
See [Prysm's documentation](https://docs.prylabs.network/docs/prysm-usage/parameters) for instructions on how to do this.
**You will need the `grpc-gateway` *and* the `rpc-host` enabled.**

::: warning NOTE
Because the Smartnode will run in its own Docker container, it will use Docker's internal network.
You won't be able to use hostnames like `localhost` or `127.0.0.1` here; if your client is running on the same machine as the Smartnode, you will need to provide the machine's LAN IP address instead. 
:::

Next, it will ask about your validator's **graffiti** message:

<center>

![](./images/tui-external-graffiti.png)

</center>

This is an optional custom message you can attach to any blocks you propose on the Beacon Chain.
The message will be preserved forever, so think of it like a fun little way to leave your mark!

**Note the maximum length of the graffiti is 16 characters.**

If you'd like to see some examples of what validators are using for Graffiti today, [take a look here](https://beaconcha.in/blocks).

The final question will ask if you want to enable Doppelgänger Protection:

<center>

![](./images/tui-external-dd.png)

</center>

Prysm supports a feature called Doppelgänger Protection.
In a nutshell, this feature will **intentionally** miss a few attestations after Prysm's Validator Client restarts; while doing this, it will listen to see if attestations are still being sent to the network using your validator keys.

Ideally, there would not be any attestations (which means no other machine is running with your validator keys attached).
After its short waiting period, Prysm would start validating normally.

*However*, if there *is* another machine running with your validator keys attached, then Prysm will immediately shut down and issue an error message in its log files.
The reason for this is that if it were to start attesting as well, then you would start **double attesting** which is a **slashable offense**.
When slashed, your validator would be forcibly exited from the Beacon chain and you would be penalized a significant amount of ETH.

Most of the time, doppelgänger detection will result in nothing but a few missed attestations after a client restart.
In situations where you are moving your validator to a new machine or you are changing to a new Beacon client, however, **doppelgänger detection can prevent you from being slashed by double attesting accidentally**.

Think of it as cheap insurance for your minipools; you'll miss a trivial bit of profit every time you restart, but you can be fairly confident that you won't accidentally run your keys in two places and get slashed for it.

::::
:::: tab Teku

Start by specifying the URL for your Teku Beacon Node's API:

<center>

![](./images/tui-external-teku.png)

</center>

The Smartnode will use the HTTP URL to communicate with it and perform blockchain activities, such as querying the chain's state and submitting messages.
**If you don't already have the API port enabled and accessible from your Smartnode machine, you will need to set it up now.**
See [Teku's documentation](https://docs.teku.consensys.net/en/latest/Reference/CLI/CLI-Syntax/#rest-api-enabled) for instructions on how to do this.

::: warning NOTE
Because the Smartnode will run in its own Docker container, it will use Docker's internal network.
You won't be able to use hostnames like `localhost` or `127.0.0.1` here; if your client is running on the same machine as the Smartnode, you will need to provide the machine's LAN IP address instead. 
:::

Next, it will ask about your validator's **graffiti** message:

<center>

![](./images/tui-external-graffiti.png)

</center>

This is an optional custom message you can attach to any blocks you propose on the Beacon Chain.
The message will be preserved forever, so think of it like a fun little way to leave your mark!

**Note the maximum length of the graffiti is 16 characters.**

If you'd like to see some examples of what validators are using for Graffiti today, [take a look here](https://beaconcha.in/blocks).

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

The next question in the Wizard will ask you if you want to enable this:

<center>

![](./images/tui-metrics.png)

</center>

If you choose to enable it, you will learn more about setting it up and how to use it in the [Setting up the Grafana Dashboard](./grafana.md) section later in the process.

::: warning NOTE
All of the data collected by this system **stays on your machine**.
Rocket Pool does not collect any of the telemetry or send it to a separate service.
It's purely there for you to use so you can monitor your own node!
:::

After this question, you've finished setting up the Smartnode!
You will see the following dialog:

<center>

![](./images/tui-finished.png)

</center>

If you're happy with your setup and are ready to start the Smartnode, click `Save and Exit` here and go to the [Wrapping Up](#wrapping-up) section next.

If you would like to review all of the settings and customize many additional settings that weren't included in the Wizard, click `Review All Settings` and go to the [next section](#configuring-the-smartnode-stack-via-the-settings-manager).


## Configuring the Smartnode Stack via the Settings Manager

If you've already run `rocketpool service config`, instead of being greeted by the Wizard, you will see the **Settings Manager** screen:

<center>

![](./images/tui-settings-manager.png)

</center>

There are three main features of this screen:

1. The **Category List**, which lets you drill down into the settings for each category of the Smartnode stack
2. The **Review Changes and Save** button, which you can use when you're ready to see what settings you've changed and save the updated configuration
3. The **Open the Config Wizard** button, which will bring you to the [Setup Wizard](#configuring-the-smartnode-stack-via-the-wizard) if you prefer that interface instead

::: tip TIP
To use the Settings Manager, **press the `Arrow Keys` (up/down/left/right) to navigate between options in the home page**.

Press `Tab` to go **between the category list (1) and the buttons (2 and 3)** at the bottom of the screen. 
The button that's currently selected will be **highlighted in green**.

**Press `Enter` or `Space` to select a button**, analogous to clicking on it with the mouse.

**Hold `Ctrl` and press `C` at any time to exit the Settings Manager without saving anything**.
:::

As you scroll through the categories list, each option will have a helpful description appear in the **Description Box** to the right of the screen.
Feel free to explore them; nothing you do will be saved until you go through the Review dialog via the **Review Changes and Save** button, and you can press **Ctrl+C** at any time to exit without saving, so you won't accidentally mess something up by playing with the settings here.


### Configuring the Settings

From the home screen, select any one of the categories with the `Enter` key to view the settings for that category.
For example, here is the screen for the **Smartnode and TX Fees** category:

<center>

![](./images/tui-smartnode.png)

</center>

Use the `Arrow Keys` to move up and down between the settings.
The currently selected one will have a white square at the end of it (if it's a text box or a check box), or will be highlighted in white (if it's a drop down).

Press `Escape` to go back to the home screen of the Settings Manager when you're done.

As you scroll through the settings, each one will show a brief description of what it does in the **Description Box** on the right.
It will also show the **default value** there in case you want to revert it to its stock setting.

In this example, the **RPL Claim Gas Threshold** setting is currently selected (highlighted with a green box on the left-hand side of the screen).
It has been changed to `40`, but you can see that it has a default of `150` in the top-right corner (the top of the **Description Box**).

::: tip TIP
As a reminder, nothing will be saved to disk until you go through the Review dialog via the **Review Changes and Save** button.
You are encouraged to explore all of the settings to learn about them and see what your Smartnode can do!
:::


### The Setting Types and How to Use Them

The settings manager uses the following setting types and UI elements:

#### Text Boxes

Text boxes are used to enter arbitrary strings of text or numbers.
They look like this:

<center>

![](./images/tui-textbox.png)

</center>

Enter your desired values into them, then **press `Enter` or use the `Arrow Keys` to navigate to a different setting in order to preserve your changes.**
If you don't, the Settings Manager will assume you're still updating that setting and won't mark it as changed yet.


#### Drop Downs

Drop downs are used to select an option from a list of choices.
They look like this (when they're open):

<center>

![](./images/tui-dropdown-open.png)

</center>

The **green** item is the one that is currently selected.
Use the `Arrow Keys` to change options - as you do, the **Description Box** on the right will update to tell you more about the currently selected option.
When you're happy with your choice, press `Enter` to choose the selected option and the drop down will close, revealing the option that is currently selected:

<center>

![](./images/tui-dropdown-closed.png)

</center>


#### Check Boxes

Check boxes are used for simple Yes/No questions.
They look like this:

<center>

![](./images/tui-checkbox-checked.png)

</center>

When they are checked, they will have an `X` in the middle as you see above.
When they are *unchecked*, they will simply be blank like this:

<center>

![](./images/tui-checkbox-unchecked.png)

</center>

To change the setting, simply select it and press `Enter`.


### Saving Changes

When you're happy with your changes and you'd like to review them before saving, press the **Review Changes and Save** button on the home screen.
As a reminder, to get to it, press the `Tab` key.

You will be presented with a view that looks like this:

<center>

![](./images/tui-review.png)

</center>

The **Review Box** here will present all of the settings you've changed, showing the old values and the new ones.
For example, the first line here shows that the **RPL Claim Gas Threshold** used to be `150`, and it's been changed to `40`.

It will also show you which containers are affected by the settings you've modified and will offer to restart them for you after you've saved your changes.

::: tip NOTE
At this point, your changes **still haven't been saved yet**.
If you want to go back and modify something, press `Escape` to return to the home screen.
:::

When you are satisfied with the changes, press `Enter` to save the new configuration to disk.
You will then exit the Terminal UI and be presented with something like this message:

```
Your changes have been saved!
The following containers must be restarted for the changes to take effect:
	rocketpool_watchtower
	rocketpool_validator
	rocketpool_eth2
	rocketpool_node
Would you like to restart them automatically now? [y/n]
```

Press `y` and `Enter` if you want to automatically apply your new configuration changes and restart the affected containers.

Press `n` and `Enter` if you have other things you want to do before restarting them, and will do it manually later.

In either case, your configuration is done!



## Wrapping Up

At this point, your configuration is complete.
Congratulations!
You're ready to secure your operating system to protect your node.
Move on to the [Securing your Node](./securing-your-node.md) section next.
