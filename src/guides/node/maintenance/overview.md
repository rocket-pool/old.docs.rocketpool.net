# Overview

In this section, you'll learn about how to monitor the health of your node and your validators, track your earnings, and perform periodic maintenance such as updates.


## Prerequisites

Before configuring your Smartnode, please make sure you:
- Have set up a node machine (or virtual machine) and secured it (via the [Securing your Node](../securing-your-node.md) guide)
- Have the Smartnode [installed](../installing/overview.md) and [configured](../config/overview.md) on it
- Have a node wallet loaded on your Smartnode
- Synced your Execution and Consensus clients
- Provisioned your node with [a withdrawal address](../prepare-node.md#setting-your-withdrawal-address), set up your [fallback clients](../fallback.md) (optional), opted into the [Smoothing Pool](../fee-distrib-sp.md#the-smoothing-pool) (optional), and configured [MEV](../mev.md)
- Created at least one [minipool](../create-validator.md)


## Guides

[Monitoring your Node's Performance](../performance.md) provides some tools and tutorials for keeping tabs on your node's health (from a resource perspective, such as CPU and RAM consumption) and your validators' performance on the Beacon Chain.
It covers a lot of fundamental tools you'll use during your tenure as an Ethereum validator.

[Setting up the Grafana Dashboard](../grafana.md) walks through setting up the Smartnode stack's metrics tracker and the Grafana dashboard - a one stop shop for monitoring everything about your node and validators, and a staple in each node operator's arsenal.
We *strongly* recommend exploring the Grafana dashboard and regularly checking in on it.

[Checking for Updates](../updates.md) covers the crucial processes of regularly updating your node with new security patches, how to update the Smartnode after a new release, and how to manually update client versions if your clients of choice release a new version that the Smartnode's latest release doesn't include yet.
You should familiarize yourself with this entire section, as you may need to refer to it whenever an update is released.

[Backing Up Your Node](../backups.md) is an optional guide that describes how to back up your node's configuration and its chain data in case of a hardware failure.

[Pruning the Execution Client](../pruning.md) is **important** for anyone running an Execution client that gradually consumes all of your SSD's disk space and requires periodic pruning (such as Geth or Nethermind) to reclaim some of that space.
If you are running one of those clients, you should definitely familiarize yourself with the pruning process.

[Changing Execution or Consensus Clients](../change-clients.md) is a useful guide; it goes through the process of changing your client choice(s) and what can be expected during the process.
This is another good guide to familiarize yourself with, just in case you ever have to switch clients for any reason down the line.