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

Next, log out and log back in (or close SSH and reconnect), or simply restart.
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

rocketpool version 1.0.0-rc1
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

::: tab Windows

The Windows CLI can be downloaded [here](https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-cli-windows-amd64.exe).
Note that it only supports x64 installations of Windows.

Simply download it, rename it to `rocketpool.exe`, and place it anywhere you like in your filesystem (e.g. `C:\Program Files\Rocket Pool\rocketpool.exe`).
For the easiest use, make sure that the containing folder you put it into is [added to your system path](https://stackoverflow.com/a/44272417).

Once this is done, open a Command Prompt and test it by running the CLI with the `--version` flag.
You should see output like this:
```
$ rocketpool --version

rocketpool version 1.0.0-rc1
```
:::

::::


## Installing the Smartnode Stack

Now that you have the CLI installed, you can deploy the Smartnode stack.
This will prepare your system with Docker, [docker-compose](https://docs.docker.com/compose/), and load the Smartnode files so they're ready to go.
It won't actually run anything yet; that comes later.

There are two different ways to install the Smartnode stack:

- A **local** install, which you should do if you're running the Rocket Pool CLI on the machine that you want to turn into a node.
  *Note: If you are already using SSH to connect to your remote node, you will be creating a local installation on that node, so follow the local setup.* 
- A **remote** install, where you use the CLI to connect to a different machine that you want to turn into a node

Choose the appropriate setup below.

:::: tabs

::: tab Local Installation

To install the stack locally, simply run this command:
```
rocketpool service install
```

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
```
rocketpool service install -d
```

Once this is finished, the Smartnode stack will be ready to run.
:::

::: tab Remote Installation

To install the stack remotely, you will need to first have SSH key-based authentication configured.
This means you'll use an SSH key to log into the remote system instead of a password (though you can put a password on the key itself).
This improves your node's security and is generally considered good practice anyway.
There is an excellent guide on [how to set it up for Linux systems here](https://www.howtogeek.com/424510/how-to-create-and-install-ssh-keys-from-the-linux-shell/).

Once the key is set up, use this command to install the Smartnode stack:
```
rocketpool --host <your remote hostname> --user <your remote username> --key <your private SSH key> service install
```

Where:

- `<your remote hostname>` is the hostname or IP of your node
- `<your remote username>` is the name of your user account on the remote node
- `<your private SSH key>` is the path to the private SSH key you created to log into the remote system 

For example:
```
rocketpool --host https://example.com --user me --key ~/.ssh/id_rsa service install
```

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
Perform the following on your remote node, **not on your local machine**:

Docker provides common [install instructions here](https://docs.docker.com/engine/install/).

Docker-compose provides common [install instructions here](https://docs.docker.com/compose/install/).

Next, give your user account permission to use Docker:
```shell
sudo usermod -aG docker $USER
```

After this, **close SSH** for the permission settings to take effect.

Finally, re-run the installer on your local machine with the `-d` flag to skip Docker installation:
```
rocketpool --host <your remote hostname> --user <your remote username> --key <your private SSH key> service install -d
```

Once this is finished, the Smartnode stack will be ready to run.
:::

::::


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
In the case of Raspberry Pi users, it should be `/mnt/rpdata` or whatever folder you set up in the [Preparing a Raspberry Pi](./local/prepare-pi) section.

Press `Ctrl+O, Enter` to save the file, and `Ctrl+X, Enter` to exit the editor.

Next, make the folder:
```
mkdir -p <your external mount point>/docker
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


### ETH1 Configuration

First, it will ask you about which ETH1 client you want to use.
For help deciding on an option, consult the [Choosing your ETH Clients](./eth-clients) section.

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

For this configuration mode, where Rocket Pool will install and manage your ETH1 and ETH2 clients, select between Geth, Infura, or Pocket.

:::: tabs

::: tab Geth

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

::: tab Infura

If you select Infura, you will be presented with the following questions:

```
Please enter the Infura Project ID
(the ID of your project created in Infura)
```

When you create an Infura account, you will be given a unique project ID which is a 32-character hexadecimal string.
Enter it here.
:::

::: tab Pocket

If you select Pocket, you will be presented with the following questions:

```
Please enter the Pocket App or Load Balancer ID (leave blank for the standard Rocket Pool project ID for Pocket)
(the ID of your Pocket App; if you use a Load Balancer, prefix it with lb/)
```

Pocket has generously allowed Rocket Pool node operators to use their network for free.
If you leave this blank, you can connect to the Pocket network using Rocket Pool's default project ID.
If you have your own account with Pocket and would like to use that instead, you can enter it here.
:::

::::

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
Users with low-power systems, such as the **Raspberry Pi**, may want to do this as it allows you to explicitly pick an ETH2 client that is tailored to systems with low resources.

For help comparing the ETH2 clients, consult the [Choosing your ETH Clients](./eth-clients) section.

Regardless of which client you choose, the next question will be this:

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

Similar to Geth, each ETH2 client lets you specify a maximum number of P2P peers to connect to in order to share the state of the beacon chain.
The default values depend on the client and whether you're on an x64 or an arm64 machine but are generally safe to use.
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

## Wrapping Up

At this point, your configuration is complete.
Congratulations!
You're ready to secure your operating system to protect your node.
Move on to the [Securing your Node](./securing-your-node) section next.
