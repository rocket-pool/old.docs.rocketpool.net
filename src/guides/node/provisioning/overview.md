# Overview

This section covers the details of how to provision your node for staking with Rocket Pool once you've installed and configured the Smartnode.
It's a long one because there's a lot of information around staking to cover, so **please read through each guide before creating your first minipool!**


## Prerequisites

Before provisioning your node for staking, please make sure you've done the following:
- Set up a node machine (or virtual machine) and secured it (via the [Securing your Node](../securing-your-node.md) guide)
- Have the Smartnode [installed](../installing/overview.md) and [configured](../config/overview.md) on it


## Guides

[Starting Rocket Pool](../starting-rp.md) will show you how to start the Smartnode services for each mode and how to check on the sync progress of your Execution and Consensus clients.

[Creating a New Wallet](../wallet-init.md) walks through the process of creating a brand new wallet with the Smartnode if this is your first time setting up a node.

[Importing / Recovering an Existing Wallet](../recovering-rp.md) is an alternative to creating a new wallet.
Use this guide if you already have a node wallet that you want to recover onto your node (or if you're migrating from a service like Allnodes to your own hardware).

[Preparing your Node for Operation](../prepare-node.md) covers some important first steps you'll want to take once you have a wallet loaded onto your node, well before you fund it with any ETH or RPL (other than a small amount of ETH for gas costs, of course).

[Specifying a Fallback Node](../fallback.md) walks you through the optional process of pointing your node at a second (externally-managed) pair of Execution and Consensus clients that can act as a backup for your primary clients if they ever go down, so your node can keep validating while you perform maintenance on them.

[Fee Distributors and the Smoothing Pool](../fee-distrib-sp.md) discuss the way Execution layer rewards are provided to your node every time one of your validators proposes a block, how to collect those rewards, and describes Rocket Pool's **Smoothing Pool** - a popular feature that combines Execution layer rewards from everyone and evenly distributes them during Rocket Pool's regular rewards intervals.

[MEV, MEV-Boost, and MEV Rewards](../mev.md) explains **Maximum-Extractable Value** (MEV), its role in the staking ecosystem, and how you can configure it to your liking using the Smartnode.