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


## Running the Rocket Pool Service Outside Docker

Users with advanced setups may wish to run the Rocket Pool service on their host OS, outside of a Docker environment. Note that when using this method, users must install and manage their own Eth 1.0 and Eth 2.0 beacon & validator clients. The Rocket Pool service daemons must also be manually registered with the OS service manager (e.g. systemd).

The following commands are unavailable when running the Rocket Pool service outside of Docker:

- `rocketpool service status`
- `rocketpool service start`
- `rocketpool service pause`
- `rocketpool service stop`
- `rocketpool service terminate`
- `rocketpool service logs`
- `rocketpool service stats`

To run the Rocket Pool service on your host OS, follow these steps:

1. [Install Go](https://golang.org/doc/install)
1. Clone the Rocket Pool smartnode repository and checkout the tag for the desired version:
   ``` shell
   git clone https://github.com/rocket-pool/smartnode.git
   cd smartnode
   git checkout vX.X.X
   ```
1. Build the Rocket Pool CLI client from source and install it:
   ``` shell
   cd rocketpool-cli
   go build rocketpool-cli.go
   sudo mv rocketpool-cli /usr/local/bin/rocketpool
   ```
1. Build the Rocket Pool service daemon from source and install it:
   ``` shell
   cd ../rocketpool
   go build rocketpool.go
   sudo mv rocketpool /usr/local/bin/rocketpoold
   ```
1. Install the smart node service files for the desired version, skipping OS dependency (Docker) installation:
   ```
   rocketpool service install -v X.X.X -d
   ```
1. Optionally, delete the following unused files (for Docker setups only):
   - `~/.rocketpool/docker-compose.yml`
   - `~/.rocketpool/chains/*`
1. Make the following modifications to your Rocket Pool config file (`~/.rocketpool/config.yml`):
   - Update `smartnode.passwordPath` to e.g. `/home/[USERNAME]/.rocketpool/data/password`
   - Update `smartnode.walletPath` to e.g. `/home/[USERNAME]/.rocketpool/data/wallet`
   - Update `smartnode.validatorKeychainPath` to e.g. `/home/[USERNAME]/.rocketpool/data/validators`
   - Update `chains.eth1.provider` to e.g. `http://127.0.0.1:8545`
   - Update `chains.eth2.provider` to e.g. `127.0.0.1:5052` (if using Prysm, use the port for gRPC)
1. Configure the Rocket Pool service, selecting Geth for your Eth 1.0 client, and the appropriate Eth 2.0 client:
   ```
   rocketpool service config
   ```
1. Register the following services with your operating system (example systemd units are provided below):
   - Geth
   - Lighthouse / Prysm beacon chain
   - Lighthouse / Prysm validator
   - `/usr/local/bin/rocketpoold node`
   - `/usr/local/bin/rocketpoold watchtower`
1. Add the following alias to your `.profile` (or `.bash_profile` / `.zprofile` as appropriate) and start a new shell session:
   - `alias rp="rocketpool -d /usr/local/bin/rocketpoold"`
1. Use the alias `rp` to interact with the Rocket Pool service, e.g.: `rp node status`


### Example systemd Units for Rocket Pool Services

Geth:

```
[Unit]
Description=Geth
After=network.target

[Service]
Type=simple
Restart=always
RestartSec=5
ExecStart=/path/to/geth --goerli --http --http.addr 127.0.0.1 --http.port 8545 --http.api eth,net,personal,web3 --http.vhosts *

[Install]
WantedBy=multi-user.target
```

Lighthouse - Beacon Chain:

```
[Unit]
Description=Lighthouse Beacon
After=geth.service

[Service]
Type=simple
Restart=always
RestartSec=5
ExecStart=/path/to/lighthouse beacon --testnet medalla --eth1 --eth1-endpoint http://127.0.0.1:8545 --http --http-address 127.0.0.1 --http-port 5052

[Install]
WantedBy=multi-user.target
```

Lighthouse - Validator:

```
[Unit]
Description=Lighthouse Validator
After=lighthouse-beacon.service

[Service]
Type=simple
Restart=always
RestartSec=5
ExecStart=/path/to/lighthouse validator --testnet medalla --datadir /home/[USERNAME]/.rocketpool/data/validators/lighthouse --init-slashing-protection --delete-lockfiles --beacon-node http://127.0.0.1:5052

[Install]
WantedBy=multi-user.target
```

Prysm - Beacon Chain:

```
[Unit]
Description=Prysm Beacon
After=geth.service

[Service]
Type=simple
Restart=always
RestartSec=5
ExecStart=/path/to/prysm/beacon-chain --accept-terms-of-use --medalla --http-web3provider http://127.0.0.1:8545 --rpc-host 127.0.0.1 --rpc-port 5052

[Install]
WantedBy=multi-user.target
```

Prysm - Validator:

```
[Unit]
Description=Prysm Validator
After=prysm-beacon.service

[Service]
Type=simple
Restart=always
RestartSec=5
ExecStart=/path/to/prysm/validator --accept-terms-of-use --medalla --wallet-dir /home/[USERNAME]/.rocketpool/data/validators/prysm-non-hd --wallet-password-file /home/[USERNAME]/.rocketpool/data/password --beacon-rpc-provider 127.0.0.1:5052

[Install]
WantedBy=multi-user.target
```

Rocket Pool Node Daemon:

```
[Unit]
Description=Rocketpool Node
After=geth.service

[Service]
Type=simple
Restart=always
RestartSec=5
ExecStart=/usr/local/bin/rocketpoold --config /home/[USERNAME]/.rocketpool/config.yml --settings /home/[USERNAME]/.rocketpool/settings.yml node

[Install]
WantedBy=multi-user.target
```

Rocket Pool Watchtower Daemon:
```
[Unit]
Description=Rocketpool Watchtower
After=geth.service

[Service]
Type=simple
Restart=always
RestartSec=5
ExecStart=/usr/local/bin/rocketpoold --config /home/[USERNAME]/.rocketpool/config.yml --settings /home/[USERNAME]/.rocketpool/settings.yml watchtower

[Install]
WantedBy=multi-user.target
```


## The Rocket Pool Service

### Starting the Service

Start the Rocket Pool service by running:

```
rocketpool service start
```

This will “build up” the smart node stack, which runs it and also ensures that it stays running. If any of the running containers crash or you restart your node, Docker will start them back up to ensure that no uptime is lost.

You can check that the containers are running correctly with:

```
rocketpool service status
```

You should see (in any order) containers with the following names:

- `rocketpool_eth1`
- `rocketpool_eth2`
- `rocketpool_validator`
- `rocketpool_api`
- `rocketpool_node`
- `rocketpool_watchtower`

### Pausing the Service

If you want to pause the Rocket Pool service for any reason, run:

```
rocketpool service stop
```

This will stop all running containers, suspending their execution, but leave them intact. Note that this will stop validators from performing their validation duties, so use this command with caution. The service can be started up again with `rocketpool service start`.

### Stopping the Service

If you have finished interacting with the Rocket Pool network and want to stop the service entirely, run:

```
rocketpool service terminate
```

This will “tear down” the smart node stack, stopping and removing all running containers, and deleting their state. Not only will validators stop performing validation duties, but all Ethereum clients will need to re-sync if the service is restarted. It is advised to use this command only if the node has no active minipools.

As a security measure, node data at `~/.rocketpool` (including the node wallet) will be preserved, and must be manually deleted if desired (this is not recommended).

### Reconfiguring the Service

If you want to make any configuration changes to the Rocket Pool service, run:

```
rocketpool service config
```

This will repeat the configuration process performed after installation, and will overwrite your node’s configuration file accordingly. For the changes to take effect, restart the Rocket Pool service with `rocketpool service start`.

### Viewing Service Information

You can check the version of the CLI client and the service with:

```
rocketpool service version
```

You can check the current status of the service (its running containers) with:

```
rocketpool service status
```

You can view the logs for all running containers in real-time with:
```
rocketpool service logs
```

To view the logs for a single container, add its name at the end, e.g.:

```
rocketpool service logs eth2
```

Press Ctrl-C to stop.

You can also view the hardware usage for each container with:

```
rocketpool service stats
```

Press Ctrl-C to stop.

### Forwarding Service Ports

Optionally, you can forward ports for Eth 1.0 and Eth 2.0 client peer discovery to the Rocket Pool service containers. This may allow you to connect to more peers, and can potentially increase sync times. The method for forwarding ports depends on your local network setup and is not covered in this document. The port ranges to forward are:

    Eth 1.0: `30303-30305 (TCP & UDP)`
    Eth 2.0: `9001 (TCP & UDP)`


## Node Setup, Registration & Management

### Initializing Your Node Wallet

With the Rocket Pool service running, the first thing you’ll need to do is initialize your node wallet:

```
rocketpool wallet init
```

This will prompt you to enter a node password, and will then save it to disk. You won’t need to enter your node password again, it will simply be used by the smart node to unlock your wallet.

Next, a HD wallet will be generated to store your node account and all validator keys for your minipools. You will be shown a mnemonic phrase to recover your wallet in case of hardware failure, and prompted to record it and enter it to confirm it is correct. You can make sure your wallet was created successfully with:

```
rocketpool wallet status
```

Your node password is stored at `~/.rocketpool/data/password`, while your wallet is stored at `~/.rocketpool/data/wallet`. You can export the contents of both of these files and display them on screen with:

```
rocketpool wallet export
```

Feel free to back these up in a safe and secure storage area which can’t be accessed by anyone else. You do not need to back your wallet up repeatedly, even after creating new minipools.

### Recovering Your Node Wallet

If you lose your node wallet, you can recover it with:

```
rocketpool wallet recover
```

This will prompt you to enter the recovery mnemonic phrase for your wallet. If successful, the wallet will be restored along with your node account and all validator keys for created minipools.

### Seeding Your Node Account

Next, you’ll need to load your node account up with ETH to deposit into Rocket Pool. Find your node address with:

```
rocketpool node status
```

If you’re participating in a testnet beta, you can obtain GoETH from one of the following faucets:

- [ethstaker discord](https://discord.gg/GGGmqZdCBf)
- [faucet.goerli.mudit.blog](https://faucet.goerli.mudit.blog/)

Then check your node status again to ensure your ETH balance has increased.

### Registering Your Node

Once you have some ETH, register with:

```
rocketpool node register
```

You will be prompted to either detect your timezone location automatically, or enter it manually. This information is not used for KYC purposes, but is sent to Rocket Pool during registration in order to display accurate node information to users. You may abstain by manually entering a location such as `Hidden/Hidden`.

Once you’ve registered successfully, you can check your status with:

```
rocketpool node status
```

This should now display additional information like: `The node is registered with Rocket Pool with a timezone location of Australia/Brisbane`.

### Updating Your Registration

If you want to update the timezone your node is registered in, run:

```
rocketpool node set-timezone
```

This will repeat the prompts run during registration, and update your node’s information in the network.

### Sending From Your Node Account

If you want to send ETH or tokens from your node account to another Ethereum address at any time, use:

```
rocketpool node send [amount] [token] [to-address]
```

This will send the specified amount of ETH or nETH from the node account to the specified address.


## Making Deposits

### Checking the Node Commission Rate

Before making a deposit, you may wish to view the current Rocket Pool network node commission rate. The commission rate varies depending on network node supply & demand dynamics, and changes as user deposits are made and minipools are created. Check the current node commission rate with:

```
rocketpool network node-fee
```

This will display the current rate, along with the minimum and maximum rates possible. If you’re happy with the current rate, you can make a deposit to create a minipool and start validating.

### Making a Deposit

You can make a deposit with:

```
rocketpool node deposit
```

You will then be prompted to select an amount of ETH to deposit. 16 ETH deposits create minipools which must wait for user-deposited ETH to be assigned to them before they begin staking. 32 ETH deposits create minipools which can begin staking immediately, and will have the excess 16 ETH refunded once they are assigned to.

Next, you will be shown the current network node commission rate and prompted to enter a minimum commission rate you will accept. You may either use the suggested value based on the data provided, or enter a custom one. If the network node commission rate drops below this threshold before your deposit transaction is mined, the deposit will be cancelled.

If the deposit is made successfully, the address of the newly created minipool will be displayed.


## Managing Minipools

### Checking Minipool Status

Once you have made one or more deposits from your node, you can view the status of your created minipools with:

```
rocketpool minipool status
```

This will list various properties of each minipool created by your node, including:

- Its address
- Its current status, and the time & block number it was last updated at
- The node commission rate on rewards earned by it
- The amount of ETH deposited by the node operator
- The amount of user-deposited ETH assigned, and the time it was assigned at
- The associated validator’s public key

You will also be notified if any of your minipools have ETH available for refund or withdrawal.

### Refunding From Minipools

If you have made any deposits of 32 ETH, the created minipools will have 16 ETH available for refund once user-deposited ETH is assigned to them. You can refund this ETH to your node account with:

```
rocketpool minipool refund

```

This will display a list of all eligible minipools, and prompt you to select one or all of them to refund your ETH from. Once refunded, you should see their balances reflected in your node account.

### Exiting Minipools

Once you’re ready to finish staking, you can exit your minipool validators from the beacon chain with:

```
rocketpool minipool exit
```

This will display a list of all eligible minipools, and prompt you to select one or all of them to exit. When you successfully exit a minipool, it can take several hours for its status to be reflected by your node. It can also take longer for it to be marked as withdrawable by the Rocket Pool network and for nETH to be minted to it for withdrawal.

### Withdrawing From Minipools

If any of your minipools have exited and been marked as withdrawable by the Rocket Pool network, you can withdraw your deposit & rewards from them with:

```
rocketpool minipool withdraw
```

This will display a list of all eligible minipools, and prompt you to select one or all of them to withdraw from. Once withdrawn, the minipool/s will be destroyed, and you should see their balances reflected in your node account.

**Note that before phase 2 of the Eth 2.0 rollout, rewards can only be withdrawn from exited minipools after a significant delay.**

### Dissolving Minipools

If you create a minipool and decide you want to back out before it begins staking, you can do so with:

```
rocketpool minipool dissolve
```

This will display a list of all minipools which do not yet have user-deposited ETH assigned to them. You will be prompted to select one or all of them to dissolve, returning your ETH deposit to your node account. Once dissolved, the minipool/s will be destroyed, and you should see their balances reflected in your node account.

If you create a minipool and it fails to stake within a set time period after user-deposited ETH is assigned to it, it may be dissolved by another party. This returns the user-deposited ETH to the deposit pool to be reassigned. If this occurs, you can close the dissolved minipools with:

```
rocketpool minipool close
```

This will display a list of all eligible minipools, and prompt you to select one or all of them to close. Once closed, the minipool/s will be destroyed, and you should see their balances reflected in your node account.


## Command Reference

### Service Commands

- `rocketpool service install`: Install the Rocket Pool service either locally or to a remote server
- `rocketpool service config`: Configure the Rocket Pool service and select Eth 1.0 and Eth 2.0 clients
- `rocketpool service status`: Display the current status of the Rocket Pool service
- `rocketpool service start`: Start the Rocket Pool service to begin running a smart node
- `rocketpool service pause`: Pause the Rocket Pool service temporarily
- `rocketpool service stop`: Pause the Rocket Pool service temporarily
- `rocketpool service terminate`: Terminate the Rocket Pool service and remove all associated docker containers & volumes
- `rocketpool service logs [services...]`: View the logs for one or more services running as part of the docker stack
- `rocketpool service stats`: Display resource usage statistics for the Rocket Pool service
- `rocketpool service version`: Display version information for the Rocket Pool client & service

### Wallet Commands

- `rocketpool wallet status`: Display the current status of the node’s wallet
- `rocketpool wallet init`: Initialize the node’s password and wallet
- `rocketpool wallet recover`: Recover a node wallet from a mnemonic phrase
- `rocketpool wallet rebuild`: Rebuild validator keystores from derived keys
- `rocketpool wallet export`: Display the node password and wallet file contents

### Node Commands

- `rocketpool node status`: Display the current status of the node
- `rocketpool node register`: Register the node with the Rocket Pool network
- `rocketpool node set-timezone`: Update the node’s timezone location
- `rocketpool node deposit`: Make a deposit to create a minipool and begin staking
- `rocketpool node send [amount] [token] [to]`: Send an amount of ETH or tokens to an address

### Minipool Commands

- `rocketpool minipool status`: Display the current status of all minipools run by the node
- `rocketpool minipool refund`: Refund ETH from minipools which have had user-deposited ETH assigned to them
- `rocketpool minipool dissolve`: Dissolve initialized minipools and recover deposited ETH from them
- `rocketpool minipool exit`: Exit active minipool validators from the beacon chain
- `rocketpool minipool withdraw`: Withdraw rewards from minipools which have finished staking and close them
- `rocketpool minipool close`: Close minipools which have timed out and been dissolved

### Miscellaneous Commands

- `rocketpool network node-fee`: Display the current network node commission rate for new minipools
- `rocketpool queue status`: Display the current status of the deposit pool
- `rocketpool queue process`: Process the deposit pool by assigning user-deposited ETH to available minipools


## API Reference

### The Smart Node API

The Rocket Pool smart node service includes an API accessible via the `api` container. API commands can be invoked via `docker exec` on the machine running the service:

``` shell
docker exec rocketpool_api /go/bin/rocketpool api [command] [subcommand] [args...]
```

The API is consumed by the smart node client, which offers a CLI interface for all provided functionality. API endpoints are provided for extension by applications wishing to interact with a running smart node.

All arguments for ETH or token amounts are given in wei. All endpoints return data in JSON format, always including `status` and `error` properties.

### Wallet Commands

- wallet status: Get the current status of the password & wallet
- wallet set-password [password]: Set the node password to the specified string
- wallet init: Initialize the node wallet
- wallet recover [mnemonic]: Recover the node wallet from a mnemonic phrase (must be quoted)
- wallet rebuild: Rebuild validator keystores from derived keys
- wallet export: Get the node password & wallet file contents

### Node Commands

- `node status`: Get the current status of the node
- `node can-register`: Check whether the node can be registered with Rocket Pool
- `node register [timezone-location]`: Register the node with Rocket Pool
- `node set-timezone [timezone-location]`: Set the node’s timezone location
- `node can-deposit [amount]`: Check whether the node can deposit the specified amount of ETH
- `node deposit [amount] [min-fee]`: Deposit the specified amount of ETH with a minimum commission rate
- `node can-send [amount] [token]`: Check whether the node can send an amount of tokens
- `node send [amount] [token] [to-address]`: Send the specified amount of tokens to an address
- `node can-burn [amount] [token]`: Check whether the node can burn an amount of tokens
- `node burn [amount] [token]`: Burn the specified amount of tokens for ETH

### Minipool Commands

- `minipool status`: Get the current status of all minipools owned by the node
- `minipool can-refund [minipool-address]`: Check whether the specified minipool has a refund available
- `minipool refund [minipool-address]`: Refund ETH from the specified minipool
- `minipool can-dissolve [minipool-address]`: Check whether the specified minipool can be dissolved
- `minipool dissolve [minipool-address]`: Dissolve the specified minipool
- `minipool can-exit [minipool-address]`: Check whether the specified minipool can be exited from the beacon chain
- `minipool exit [minipool-address]`: Exit the specified minipool from the beacon chain
- `minipool can-withdraw [minipool-address]`: Check whether the specified minipool can be withdrawn from
- `minipool withdraw [minipool-address]`: Withdraw deposit & rewards from the specified minipool
- `minipool can-close [minipool-address]`: Check whether the specified minipool can be closed
- `minipool close [minipool-address]`: Close the specified minipool

### Miscellaneous Commands

- `network node-fee`: Get the current network node commission rate
- `queue status`: Get the current status of the deposit pool and minipool queue
- `queue can-process`: Check whether the deposit pool can be processed
- `queue process`: Process the deposit pool

!!!include(./documentation/smart-node-sections/security-considerations.md)!!!