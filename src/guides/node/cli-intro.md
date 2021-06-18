# :computer: [WIP] Intro to the Command Line Interface

As a node operator, the CLI is your primary tool for interacting with Rocket Pool.
You will use it to create new minipools, check on the status of everything, claim periodic RPL rewards, exit and withdraw from your minipools when you're ready, and a host of other activities.

Once you've finished syncing the ETH1 and ETH2 chains, all of the commands will be available for you to use.
In this section, we'll go over a brief tour of some of the more common ones and some other tricks that the CLI can do.


## Learning About the Commands

To list all of the available commands, type:

```
rocketpool help
```

The output will look like this:

```
NAME:
   rocketpool - Rocket Pool CLI

USAGE:
   rocketpool [global options] command [command options] [arguments...]

VERSION:
   1.0.0-rc3

AUTHORS:
   David Rugendyke <david@rocketpool.net>
   Jake Pospischil <jake@rocketpool.net>
   Joe Clapis <joe@rocketpool.net>

COMMANDS:
   auction, a   Manage Rocket Pool RPL auctions
   minipool, m  Manage the node's minipools
   network, e   Manage Rocket Pool network parameters
   node, n      Manage the node
   odao, o      Manage the Rocket Pool oracle DAO
   queue, q     Manage the Rocket Pool deposit queue
   service, s   Manage Rocket Pool service
   wallet, w    Manage the node wallet
   help, h      Shows a list of commands or help for one command

GLOBAL OPTIONS:
   --allow-root, -r             Allow rocketpool to be run as the root user
   --config-path path, -c path  Rocket Pool config asset path (default: "~/.rocketpool")
   --daemon-path path, -d path  Interact with a Rocket Pool service daemon at a path on the host OS, running outside of docker
   --host address, -o address   Smart node SSH host address
   --user name, -u name         Smart node SSH user name
   --key file, -k file          Smart node SSH key file
   --passphrase file, -p file   Smart node SSH key passphrase file
   --known-hosts file, -n file  Smart node SSH known_hosts file (default: current user's ~/.ssh/known_hosts)
   --gasPrice value, -g value   Desired gas price in gwei
   --gasLimit value, -l value   Desired gas limit
   --nonce value                Use this flag to explicitly specify the nonce that this transaction should use, so it can override an existing 'stuck' transaction (default: 0)
   --help, -h                   show help
   --version, -v                print the version

COPYRIGHT:
   (c) 2021 Rocket Pool Pty Ltd
```

This lists out each of the available commands along with a shortcut for them (the letter next to them), as well as some of the advanced flags you can set when running a command.
Below, we'll go through the common operations you can expect to use as a node operator.

::: tip
For a complete description of all of the commands and flags, consult the [Command Reference documentation](../../documentation/smart-node-advanced#command-reference).
:::


## Service Commands

The `service` group is all about managing the Rocket Pool services themselves.
You've already done some of this during the initial setup process.
To see them all, run:

```
rocketpool service help
```

::: warning NOTE
This command doesn't work in Native Mode, because you are in charge of managing your own services in Native Mode.
It only works in Docker or Hybrid Mode.
:::

The output will look like this:

```
NAME:
   rocketpool service - Manage Rocket Pool service

USAGE:
   rocketpool service [global options] command [command options] [arguments...]

VERSION:
   1.0.0-rc3

COMMANDS:
   install, i    Install the Rocket Pool service
   config, c     Configure the Rocket Pool service
   status, u     View the Rocket Pool service status
   start, s      Start the Rocket Pool service
   pause, p      Pause the Rocket Pool service
   stop, o       Pause the Rocket Pool service (alias of 'rocketpool service pause')
   terminate, t  Stop the Rocket Pool service and tear down the service stack
   logs, l       View the Rocket Pool service logs
   stats, a      View the Rocket Pool service stats
   version, v    View the Rocket Pool service version information

GLOBAL OPTIONS:
   --compose-file value, -f value  Optional compose files to override the standard Rocket Pool docker-compose.yml; this flag may be defined multiple times
   --help, -h                      show help
```


### `status`

This command shows you the current running status of each of the Docker containers managed by Rocket Pool.
For example, the default Docker install's output looks like this:

```
        Name                       Command              State                                                       Ports                                                     
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
rocketpool_api          /bin/sleep infinity             Up                                                                                                                    
rocketpool_eth1         sh /setup/start-node.sh         Up      0.0.0.0:30303->30303/tcp,:::30303->30303/tcp, 0.0.0.0:30303->30303/udp,:::30303->30303/udp, 8545/tcp, 8546/tcp
rocketpool_eth2         sh /setup/start-beacon.sh       Up      0.0.0.0:9001->9001/tcp,:::9001->9001/tcp, 0.0.0.0:9001->9001/udp,:::9001->9001/udp                            
rocketpool_node         /go/bin/rocketpool node         Up                                                                                                                    
rocketpool_validator    sh /setup/start-validator.sh    Up                                                                                                                    
rocketpool_watchtower   /go/bin/rocketpool watchtower   Up
```

You can use it to quickly check if any of the Docker containers are having trouble, or to make sure that a `start` or `stop` command worked correctly.


### `start` and `stop`

These two commands you are already familiar with.
They simply start all of the Rocket Pool containers, or stop them.

::: tip
The `pause` command does the same thing as `stop`.
It's just left over as a legacy command from earlier versions of Rocket Pool.
:::


### `logs`

This command is another one you should have already seen.
You can use it to look at the output logs of each Docker container.
This can be useful for troubleshooting or getting a more detailed status report from them.

If you simply do `rocketpool service logs` without any other arguments, it will aggregate all of the logs together and show them to you at once.

If you want to focus on one container's output, you can add an argument to the end to specify the container.
Valid values are `eth1`, `eth2`, `validator`, `api`, `node`, and `watchtower`.


### `stats`

This command shows you some resource stats from each of the containers, which you can use to profile each one's hardware and network consumption.

You might find it useful for monitoring the containers if your system starts running slow or has RAM problems.

Here is some example output:

```
CONTAINER ID   NAME                    CPU %     MEM USAGE / LIMIT     MEM %     NET I/O           BLOCK I/O         PIDS
62314e5a0ecf   rocketpool_api          0.00%     18.89MiB / 62.78GiB   0.03%     50.6kB / 31.1kB   57.4MB / 0B       1
ac629c08c896   rocketpool_eth1         5.44%     18.13GiB / 62.78GiB   28.88%    1.63GB / 1.66GB   24.4GB / 37.7GB   27
4dfc7a2e939b   rocketpool_eth2         97.39%    2.369GiB / 62.78GiB   3.77%     1.79GB / 45MB     333MB / 24.1GB    2
a3c22f54eff0   rocketpool_node         0.00%     12.13MiB / 62.78GiB   0.02%     308kB / 504kB     0B / 0B           15
0d5818868ef6   rocketpool_validator    0.00%     936KiB / 62.78GiB     0.00%     12.1kB / 0B       4.57MB / 0B       2
88bea525fa89   rocketpool_watchtower   0.00%     12.05MiB / 62.78GiB   0.02%     304kB / 503kB     0B / 0B           16
```

::: tip NOTE
The RAM statistic here shows **total allocated memory**, which includes *virtual* memory.
It does not show the raw *resident* memory consumption.

Similarly, the CPU usage shows the total amount of CPU consumption averaged over all of the CPU cores that the container uses.
Here, the CPU for ETH2 shows almost 100% because it is using Nimbus, which is single-threaded.

You may find that a program like `htop` offers better insight into actual resource consumption.
:::


### `config`

This command runs through the configuration interview again.
You can use it if you want to change your selection of ETH1 or ETH2 client, or change some of the parameters that you initially specified when you selected them (such as your validator's graffiti message, the max number of peers to connect to, and so on).

You can call this command at any time, but the changes won't take effect until you call `rocketpool service stop` and `rocketpool service start`.


### `terminate`

This command will shut down the Docker containers, then delete them, delete the Rocket Pool virtual network, and delete the ETH1 and ETH2 chain data volumes.
It essentially removes all of the Rocket Pool items from your Docker setup.
Use it when you want to clean up that portion of the Rocket Pool installation.

::: warning
This will irreversibly remove your chain data, which means you'll need to sync ETH1 and ETH2 again.

This will **not** remove your wallet and password files, your configured settings, or your validator keys.
To remove those, you will need to delete the `~/.rocketpool/data` folder in Docker or Hybrid Mode, or the corresponding directory in Native Mode.
:::


## Node Commands

The `node` group involves operations on your Rocket Pool node.
We'll cover these more in-depth in the next section where we create a minipool, but it may be helpful to see them all at a glance.

Here is what the `rocketpool node help` output will show:

```
NAME:
   rocketpool node - Manage the node

USAGE:
   rocketpool node [global options] command [command options] [arguments...]

VERSION:
   1.0.0-rc3

COMMANDS:
   status, s                  Get the node's status
   sync, y                    Get the sync progress of the eth1 and eth2 clients
   register, r                Register the node with Rocket Pool
   set-withdrawal-address, w  Set the node's withdrawal address
   set-timezone, t            Set the node's timezone location
   swap-rpl, p                Swap old RPL for new RPL
   stake-rpl, k               Stake RPL against the node
   claim-rpl, c               Claim available RPL rewards for the current checkpoint
   withdraw-rpl, i            Withdraw RPL staked against the node
   deposit, d                 Make a deposit and create a minipool
   send, n                    Send ETH or tokens from the node account to an address
   burn, b                    Burn tokens for ETH

GLOBAL OPTIONS:
   --help, -h  show help
```

Below is a summary of some of the commands you'll tend to need during typical node operation.


### `status`

This command will give you a high-level view of your entire node at a glance.
It includes how much ETH and RPL you have staked, how many minipools you have and their statuses, your RPL collateral ratio, and more.

This is an example of what `rocketpool node status` shows once you have your node registered and some minipools set up:

```
The node <node address> has a balance of 852.221778 ETH and 4820.395655 RPL.

The node is registered with Rocket Pool with a timezone location of <timezone>.

The node has a total stake of 11763.477482 RPL and an effective stake of 11763.477482 RPL, allowing it to run 41 minipool(s) in total.
This is currently a 10.60% collateral ratio.
The node must keep at least 11094.621444 RPL staked to collateralize its minipools and claim RPL rewards.

The node has a total of 39 minipool(s):
- 1 staking
- 37 withdrawable (after withdrawal delay)
- 1 dissolved
* 37 minipool(s) are ready for withdrawal!
* 1 dissolved minipool(s) can be closed!
```


### `sync`

This command will show you the current sync status of your ETH1 and ETH2 clients.
You'll probably use it a lot when you first set the node up, then never need it again (unless you change or reset your clients).

The output of `rocketpool node sync` will look like this:

```
Your eth1 client is fully synced.
Your eth2 client is still syncing (76.90%).
```

Note that **Prysm** currently doesn't provide its completion percent - you'll need to look in the `eth2` logs if you use it.


### `stake-rpl`

This command is what you'll use when you want to add more RPL collateral to your node.
Doing so will increase your collateral ratio, which will increase your RPL rewards at each checkpoint (more on this later).
It may allow you to run more minipools or withdraw your rewards for the current checkpoint if your collateral is currently too low.

Unlike the other commands so far, this one is actually *interactive* because it will trigger a transaction - it isn't simply informational.

It will first ask you how much RPL you'd like to stake, with some pre-defined options for convenience or the ability to specify a custom amount:

```
Please choose an amount of RPL to stake:
1: The minimum minipool stake amount (284.477473 RPL)?
2: The maximum effective minipool stake amount (4267.162095 RPL)?
3: Your entire RPL balance (4820.395655 RPL)?
4: A custom amount
```

Once you select an option, you will be shown some information about the suggested gas price and estimated amount to be used, along with a confirmation dialog:

```
Please enter an amount of RPL to stake:
0.00001

Suggested gas price: 1.000000 Gwei
Estimated gas used: 69484 gas
Estimated gas cost: 0.000069 ETH

NOTE: This operation requires multiple transactions.
The actual gas cost may be higher than what is estimated here.
Are you sure you want to stake 0.000010 RPL? You will not be able to unstake this RPL until you exit your validators and close your minipools, or reach over 150% collateral!. [y/n]
```

If you confirm, you will be shown the transaction hash and given a link to [Etherscan](https://etherscan.io) so you can follow its progress:

```
Approving RPL for staking...
Transaction has been submitted with hash <transaction hash>.
You may follow its progress by visiting:
https://goerli.etherscan.io/tx/<transaction hash>

Waiting for the transaction to be mined... **DO NOT EXIT!** This transaction is one of several that must be completed.
```

Most operations only require one transaction, so the CLI will wait until it has been mined and then exit.
However, `stake-rpl` is one of the few commands that requires *two* transactions, so this dialog will appear twice. 