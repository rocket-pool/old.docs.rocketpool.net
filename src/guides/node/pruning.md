# Pruning the Execution Client

::: tip NOTE
This is meant for `geth` and `nethermind` users.
Besu does *not* need to be pruned.
:::

If you use `geth` or `nethermind` as your primary Execution (ETH1) client, you will likely notice that your node's free disk space slowly decreases over time.
The Execution client is by far the biggest contributor to this; depending on how much RAM you allocated to its cache during `rocketpool service config`, it can grow at a rate of several gigabytes per day!

To handle this, Execution clients provide a special function called **pruning** that lets them scan and clean up their database safely to reclaim some free space.
Every node operator using Geth or Nethermind will have to prune it eventually.

If you have a 2 TB SSD, you can usually go for months between rounds of pruning.
For 1 TB SSD users, you will have to prune more frequently.

If you have [the Grafana dashboard](./grafana.md) enabled, a good rule of thumb is to start thinking about pruning your Execution client when your node's used disk space exceeds 80%.

When you decide that it's time, the Smartnode comes with the ability to prune it for you upon request.
Read below to learn how it works, and what to expect.

::: warning NOTE
Pruning your Execution client is only possible in Docker Mode.

If you use your own Execution (ETH1) client, such as an external client in Hybrid mode or Native mode, you cannot use the Smartnode to prune the Execution client.
You will need to do it manually.
Please refer to the documentation for your Execution client to learn how to prune it.
:::


## Prerequisites

Select the client you're using from the tabs below.

:::::: tabs
::::: tab Geth
Pruning Geth means taking the primary Execution (ETH1) client offline so it can clean itself up.
When this happens, the Smartnode (and your Consensus (ETH2) client) will need some other way to access the ETH1 chain in order to function properly.

The easiest way to provide this is with a **fallback node**.
If you [configured a fall back node](./fallback.md) using `rocketpool service config` already, then the Smartnode will automatically switch over to it when your Geth container goes down for maintenance for you.
It will also inform your Consensus (ETH2) client to use the fallback as well.

::: danger WARNING
If you don't have a fallback node configured, your node will stop validating during the pruning process.
It will miss all attestations and block proposals until it's finished and has resynced with the network.
**You will leak ETH due to missed validations during this time!**
:::

With that in mind, the following two conditions are required to successfully prune Geth:

- A working fallback node configured
- At least **50 GB** of free space remaining on your SSD
:::::
::::: tab Nethermind
Nethermind is able to stay online while it prunes, meaning you do not require a fallback node to continue attesting.
Note, however, that pruning is **an extremely resource-intesive task** and you may see an increase in your attestations' inclusion distance and missed attestations during it.

Nethermind does not require any special prerequisites; you are able to prune it at any time.
:::::
::::::


## Starting a Prune

Select the client you're using from the tabs below.

:::::: tabs
::::: tab Geth
When you want to prune Geth, simply run this command:

```
rocketpool service prune-eth1
```

If you do not have a fallback client pair enabled, you will receive the following warning:

```
This will shut down your main execution client and prune its database, freeing up disk space.
Once pruning is complete, your execution client will restart automatically.

You do not have a fallback execution client configured.
Your node will no longer be able to perform any validation duties (attesting or proposing blocks) until Geth is done pruning and has synced again.
Please configure a fallback client with `rocketpool service config` before running this.
Are you sure you want to prune your main execution client? [y/n]
```

If you do have one enabled, you will see the following prompt instead:
```
This will shut down your main execution client and prune its database, freeing up disk space.
Once pruning is complete, your execution client will restart automatically.

You have fallback clients enabled. Rocket Pool (and your consensus client) will use that while the main client is pruning.
Are you sure you want to prune your main execution client? [y/n]
```

If you accept, you'll see a few details as the Smartnode prepares things; it should end with a success message:

```
Are you sure you want to prune your main ETH1 client? [y/n]
y

Your disk has 303 GiB free, which is enough to prune.
Stopping rocketpool_eth1...
Provisioning pruning on volume rocketpool_eth1clientdata...
Restarting rocketpool_eth1...

Done! Your main ETH1 client is now pruning. You can follow its progress with `rocketpool service logs eth1`.
Once it's done, it will restart automatically and resume normal operation.
NOTE: While pruning, you **cannot** interrupt the client (e.g. by restarting) or you risk corrupting the database!
You must let it run to completion!
```

With that, Geth is now pruning and you're all set!
You can follow its progress with:

```
rocketpool service logs eth1
```

Once it's done pruning, it will restart automatically and the Smartnode will resume using it again instead of your fallback.
:::::
::::: tab Nethermind
When you want to prune Nethermind, simply run this command:

```
rocketpool service prune-eth1
```

You will see the following prompt:

```
This will shut down your main execution client and prune its database, freeing up disk space.
Once pruning is complete, your execution client will restart automatically.

Are you sure you want to prune your main execution client? [y/n]
```

If you accept, you'll see a few messages similar to the following:

```
Your disk has 790 GiB free, which is enough to prune.
Stopping rocketpool_eth1...
Provisioning pruning on volume rocketpool_eth1clientdata...
Restarting rocketpool_eth1...
Error requesting prune: AggregateException - One or more errors occurred. (Connection refused (127.0.0.1:7434))
Trying again in 3 seconds... (1/100)
...
Trying again in 3 seconds... (10/100)
Success: Pruning is now "Starting"

Done! Your main execution client is now pruning. You can follow its progress with `rocketpool service logs eth1`.
Once it's done, it will restart automatically and resume normal operation.
NOTE: While pruning, you **cannot** interrupt the client (e.g. by restarting) or you risk corrupting the database!
You must let it run to completion!
```

With that, Nethermind is now pruning and you're all set!
You can follow its progress with:

```
rocketpool service logs eth1
```

Once it's done pruning, it will restart automatically.
:::::
::::::