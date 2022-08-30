# Pruning Geth

::: tip NOTE
This is meant for `geth` users only.
Nethermind and Besu do *not* need to be manually pruned.
:::

If you use `geth` as your primary Execution (ETH1) client, you will likely notice that your node's free disk space slowly decreases over time.
Geth is by far the biggest contributor to this; depending on how much RAM you allocated to its cache during `rocketpool service config`, it can grow at a rate of several gigabytes per day!

To handle this, Geth provides a special function called **pruning** that lets it scan and clean up its database safely to reclaim some free space.
Every node operator using Geth will have to prune it eventually.

If you have a 2 TB SSD, you can usually go for months between rounds of pruning.
For 1 TB SSD users, you will have to prune more frequently.

If you have [the Grafana dashboard](./grafana.md) enabled, a good rule of thumb is to start thinking about pruning Geth when your node's used disk space exceeds 80%.

When you decide that it's time, the Smartnode comes with the ability to prune Geth for you upon request.
Read below to learn how it works, and what to expect.

::: warning NOTE
When using the Smartnode to prune Geth, it's assumed that Geth is your **primary** Execution (ETH1) client and is managed by Rocket Pool (e.g. you chose Geth as your Execution (ETH1) client in `rocketpool service config`, and you're using Docker mode or Hybrid mode).

If you use your own Execution (ETH1) client, such as an external client in Hybrid mode or Native mode, you cannot use the Smartnode to prune Geth.
You will need to do it manually.
:::


## Prerequisites

Pruning Geth means taking the primary Execution (ETH1) client offline so it can clean itself up.
When this happens, the Smartnode (and your Consensus (ETH2) client) will need some other way to access the ETH1 chain in order to function properly.

The easiest way to provide this is with a **fallback node**.
If you [configured a fall back node](./fallback.md) using `rocketpool service config` already, then the Smartnode will automatically switch over to it when your Geth contianer goes down for maintenance for you.
It will also inform your Consensus (ETH2) client to use the fallback as well.

::: danger WARNING
If you don't have a fallback node configured, your Smartnode will stop working until Geth finishes pruning.
Your Consensus (ETH2) client will still attest, but it will fail any block proposals it makes.
:::

With that in mind, the following two conditions are required to successfully prune Geth:

- A working fallback node configured
- At least **50 GB** of free space remaining on your SSD


## Starting a Prune

When you want to prune Geth, simply run this command:

```
rocketpool service prune-eth1
```

This will present you something similar to the following message, depending on which ETH1 fallback client you're using:

```
This will shut down your main ETH1 client and prune its database, freeing up disk space.
Once pruning is complete, your ETH1 client will restart automatically.

You have a fallback ETH1 client configured (custom). Rocket Pool (and your ETH2 client) will use that while the main client is pruning.
```



After this, you will be prompted to confirm that you're ready to prune.
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
