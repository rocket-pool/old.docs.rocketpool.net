# Overview

This section covers the processes of creating and migrating minipools (Rocket Pool validators).
This is where you'll learn how to start validating the Ethereum network and earn rewards for it.


## Prerequisites

Before running minipools, please make sure you:
- Have set up a node machine (or virtual machine) and secured it (via the [Securing your Node](../securing-your-node.md) guide)
- Have the Smartnode [installed](../installing/overview.md) and [configured](../config/overview.md) on it
- Have a node wallet loaded on your Smartnode
- Synced your Execution and Consensus clients
- Provisioned your node with [a withdrawal address](../prepare-node.md#setting-your-withdrawal-address), set up your [fallback clients](../fallback.md) (optional), opted into the [Smoothing Pool](../fee-distrib-sp.md#the-smoothing-pool) (optional), and configured [MEV](../mev.md)


## Guides

[Creating a New Minipool (Validator)](../create-validator.md) explains the process of creating a new Rocket Pool minipool and corresponding validator on the Beacon Chain.
Whether you're making your very first minipool or already have some and would like to make another one, this guide will walk you through it step-by-step.

[The Minipool Delegate](./delegates.md) explains a bit about what the minipool contract is, and introduces the **delegate** contract that contains most of its functionality.
It also demonstrates how to update the delegate for your minipools after a network upgrade to take advantage of new features.

[Converting a Solo Validator into a Minipool](../solo-staker-migration.md) walks through the process of converting an existing validator outside of Rocket Pool (such as one you use for solo staking) directly into a Rocket Pool minipool without needing to exit the Beacon Chain and create a new minipool.
If you're a solo staker that wants to take advantage of this capability, this is the guide for you!

[Migrating a 16-ETH Minipool to 8-ETH](../leb-migration.md) shows how to reduce the bonded amount of ETH for a minipool from 16 ETH down to 8 ETH, giving you 8 ETH in credit that can be used to create a new minipool for free (though it still costs ETH for gas, of course).

[The Deposit Credit System](../credit.md) covers the "ETH Credit" system that lets you create new minipools without having to pay for their ETH bonds after you perform one of the above migrations.