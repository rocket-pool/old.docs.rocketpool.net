# :package: Smart Node

## Getting Started

### OS & Hardware Requirements

The smart node client is supported on Linux, MacOS and Windows. **Note that a smart node cannot be run locally on Windows at this stage; the Windows client can only be used to manage a remote server**.

The smart node service is supported on AMD64 architecture and all Unix platforms, with automatic OS dependency installation for Ubuntu, Debian, CentOS and Fedora. **OS dependencies (docker engine and docker-compose) must be installed manually on all other Unix platforms.**

Support for additional architectures (e.g. ARM) and operating systems will be added incrementally, after successful testing of the existing version.

The Smart Node service requires at least 16GB of memory and 200GB of (SSD) hard disk space in order to run. Note that a node operator must have root access to their node in order to install and run the smart node service.

### Installation

Firstly, install the smart node client locally. For Linux & MacOS, run either the cURL or wget command depending on which utilities are installed on your system. You can check with `curl --version` and `wget --version` respectively.

#### Linux (64 bit)

<section-header :title="'With cURL:'" />

``` shell 
curl -L https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-cli-linux-amd64 --create-dirs -o ~/bin/rocketpool && chmod +x ~/bin/rocketpool
```

With wget:
``` shell 
mkdir -p ~/bin && wget https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-cli-linux-amd64 -O ~/bin/rocketpool && chmod +x ~/bin/rocketpool
```

#### MacOS (64 bit):

With cURL:

``` shell
curl -L https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-cli-darwin-amd64 -o /usr/local/bin/rocketpool && chmod +x /usr/local/bin/rocketpool
```

With wget:
``` shell
wget https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-cli-darwin-amd64 -O /usr/local/bin/rocketpool && chmod +x /usr/local/bin/rocketpool
```

#### Windows (64 bit):

1. Download the [smart node client](https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-cli-windows-amd64.exe).
1. Move it to the desired location on your system (e.g. `C:\bin\rocketpool.exe`).
1. Open the command prompt and run it via its full path (e.g. `C:\bin\rocketpool.exe`).

Secondly, install the smart node service either locally or on a remote server. To install locally, simply run `rocketpool service install`. To install remotely, provide flags for the remote host address, username, and SSH identity file, e.g.:

``` shell
rocketpool --host example.com --user username --key /path/to/identity.pem service install
```

If automatic dependency installation is not supported on your platform (or if you would prefer to install OS dependencies yourself), use the `-d` option to skip this step (e.g. `rocketpool service install -d`). Then, manually install [docker engine](https://docs.docker.com/engine/install/) and [docker-compose](https://docs.docker.com/compose/install/).

The following installation options are available:

- `-r`: Verbose mode (print all output from the installation process)
- `-d`: Skip automatic installation of OS dependencies
- `-n`: Specify a network to run the smart node on (default: medalla)
- `-v`: Specify a version of the smart node service package files to use (default: latest)

Once the smart node service has been installed, you may need to start a new shell session if working locally. This is required for updated user permissions to take effect (for interacting with docker engine).


### Configuration

Once the smart node service is installed, it must be configured before use. Simply run `rocketpool service config` and follow the prompts to select which Eth 1.0 and Eth 2.0 clients to run in the smart node stack.

You may use [Infura](https://infura.io/) rather than run a full Eth 1.0 client if desired. If you do, you will need to create an account and set up a new project to obtain a project ID. Note that Infura will limit requests after a certain threshold, so uptime is not guaranteed.

By default, the smart node will select a random Eth 2.0 client to run, in order to increase network client diversity. You may, however, select a specific client to run if you prefer.


## Upgrading Your Smart Node

Rocket Pool smart nodes are not upgraded automatically, as ethereum client updates **may contain breaking changes** and prevent validators from working. As such, node operators need to be aware of Rocket Pool smart node updates, and apply them manually. Node operators are encouraged to read the changelogs of the relevant repositories.

### Upgrading the Smart Node Client

The smart node client can be upgraded simply by downloading a new version of the binary and replacing the existing version with it. For Linux & MacOS, run either the cURL or wget command depending on which utilities are installed on your system. You can check with `curl --version` and `wget --version` respectively.

#### Linux (64 bit):

With cURL:

``` shell
curl -L https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-cli-linux-amd64 --create-dirs -o ~/bin/rocketpool && chmod +x ~/bin/rocketpool
```

With wget:

``` shell
mkdir -p ~/bin && wget https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-cli-linux-amd64 -O ~/bin/rocketpool && chmod +x ~/bin/rocketpool
```

#### MacOS (64 bit):

With cURL:

``` shell
curl -L https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-cli-darwin-amd64 -o /usr/local/bin/rocketpool && chmod +x /usr/local/bin/rocketpool
```

With wget:

``` shell
wget https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-cli-darwin-amd64 -O /usr/local/bin/rocketpool && chmod +x /usr/local/bin/rocketpool
```

#### Windows (64 bit):

1. Download the [smart node client](https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-cli-windows-amd64.exe).
1. Overwrite your existing client executable with it (e.g. `C:\bin\rocketpool.exe`).


### Upgrading the Smart Node Service

To upgrade the smart node service, first back up your `~/.rocketpool` directory (e.g. `cp -r ~/.rocketpool ~/.rocketpool.bak`). If you have made any customizations to your service configuration files, these will be overwritten.

Next, pause the service before making changes to it:

```
rocketpool service pause
```

Then, upgrade the service configuration files with:

```
rocketpool service install -d
```

You may optionally specify a version of the Rocket Pool smart node service to use, e.g.:

```
rocketpool service install -d -v 0.0.9
```

Once you’ve upgraded the service configuration files, restore any customizations you made to the previous ones. Then, start the service back up:

```
rocketpool service start
```


### Post-Upgrade Tasks

Once you have upgraded the smart node client and/or service, check you are running the correct versions with:

```
rocketpool service version
```

In some cases, you may need to rebuild your validator keystores (e.g. if the Eth 2.0 client you are using has updated wallet functionality). If in doubt, you can always do this with no risk to your existing validator keys. Once your Eth 1.0 client has finished re-syncing, rebuild your validator keystores with:

```
rocketpool wallet rebuild
```

You can check to see if your validator keys have been loaded correctly with:

```
rocketpool service logs validator
```

Always ensure that your validator container has loaded the keys for each of your minipools.


## Customizing the Rocket Pool Service

This section describes how to customize the Rocket Pool service, and is intended for advanced users with custom setups. If you’re happy to run your smart node as provided “out of the box” by Rocket Pool, skip ahead.

All examples given below assume you are working locally on your smart node. If you manage your node remotely, SSH into it before running any commands.


### Customizing Storage Location

By default, chain data for your Eth 1.0 and Eth 2.0 clients will be stored in persistent volumes created by Docker. These volumes are managed by Docker and are usually stored on your primary partition.

If you would like to change the location at which your chain data is stored (for example, to store it on a different drive), you may instead mount local filesystem paths to your `eth1` and `eth2` containers.

**Do not mount an existing chain data directory to your client container if it is still in use by a running process. Never share a chain database between multiple processes, as this will result in a corrupted database.**

1. If the Rocket Pool service is already running, stop it with:
   ```
   rocketpool service terminate
   ```
1. Open `~/.rocketpool/docker-compose.yml`, and modify the `services.eth1` and `services.eth2` sections as follows:
   - Change `eth1clientdata:/ethclient` to `/path/to/eth1/storage:/ethclient` (example only) to set a local filesystem path for your Eth 1.0 chain database
   - Change `eth2clientdata:/ethclient` to `/path/to/eth2/storage:/ethclient` (example only) to set a local filesystem path for your Eth 2.0 chain database
1. Modify the `volumes` section at the bottom of the file as follows:
   - Remove the `eth1clientdata:` line if you set a custom path for your Eth 1.0 chain database
   - Remove the `eth2clientdata:` line if you set a custom path for your Eth 2.0 chain database
   - Remove the `volumes` section entirely if it’s empty
1. Restart the Rocket Pool service with:
   ```
   rocketpool service start
   ```


### Using External Eth 1.0 and Eth 2.0 Clients

By default, the Rocket Pool service will run its own Eth 1.0 (Geth) and Eth 2.0 (Lighthouse / Prysm) clients. However, you may already have your own clients running on your host OS which you want to configure Rocket Pool to communicate with. Note that you should still run the validator process provided by Rocket Pool, as the service performs its own key management and loads validator keys into it.

To configure Rocket Pool to use external Eth 1.0 and/or Eth 2.0 clients:

1. Configure your router’s DHCP settings to lease a static IP address to your machine
1. Reconnect to your network, then find your machine’s local IP address with `ifconfig`
1. Ensure your Eth 1.0 and/or Eth 2.0 clients are listening on the address `0.0.0.0`:
   - Geth: `--http --http.addr 0.0.0.0 --http.port 8545 --http.vhosts *`
   - Lighthouse: `--http --http-address 0.0.0.0 --http-port 5052`
   - Prysm: `--rpc-host 0.0.0.0 --rpc-port 5052`
1. If the Rocket Pool service is already running, pause it with:
   ```
   rocketpool service stop
   ```
1. Open `~/.rocketpool/docker-compose.yml`, and modify the `services` section as follows:
   - If you want to use your own Geth instance, remove the `eth1` section, then remove all `- eth1` entries under `depends_on:` sections
   - If you want to use your own Lighthouse or Prysm instance, remove the `eth2` section, then remove all `- eth2` entries under `depends_on:` sections
   - Remove any `depends_on:` sections which are empty
1. Open `~/.rocketpool/config.yml`, and make the following changes:
   - To use your own Geth instance, update `chains.eth1.provider` to `http://XXX.XXX.XXX.XXX:8545`, where `XXX.XXX.XXX.XXX` is your machine’s local IP address
   - To use your own Lighthouse or Prysm instance, update `chains.eth2.provider` to `XXX.XXX.XXX.XXX:5052`, where `XXX.XXX.XXX.XXX` is your machine’s local IP address
1. Configure the Rocket Pool service, selecting Geth for your Eth 1.0 client, and the appropriate Eth 2.0 client:
   ```
   rocketpool service config
   ```
1. Restart the Rocket Pool service with:
   ```
   rocketpool service start
   ```


### Customizing Eth 1.0 and Eth 2.0 Client Options

The Eth 1.0 and Eth 2.0 clients are bootstrapped via shell scripts at the following locations:

- Eth 1.0 Client: `~/.rocketpool/chains/eth1/start-node.sh`
- Eth 2.0 Beacon Chain: `~/.rocketpool/chains/eth2/start-beacon.sh`
- Eth 2.0 Validator: `~/.rocketpool/chains/eth2/start-validator.sh`

To customize the command-line options passed to the clients:

1. If the Rocket Pool service is already running, pause it with:
   ```
   rocketpool service stop
   ```
1. Modify the above files as desired
1. Restart the Rocket Pool service with:
   ```
   rocketpool service start
   ```

Please consult the documentation for specific Eth 1.0 and Eth 2.0 clients for a full list of command-line options.
