# Overview

This section covers how to access the rewards your node generates while validating.


## Prerequisites

Before configuring your Smartnode, please make sure you:
- Have set up a node machine (or virtual machine) and secured it (via the [Securing your Node](../securing-your-node.md) guide)
- Have the Smartnode [installed](../installing/overview.md) and [configured](../config/overview.md) on it
- Have a node wallet loaded on your Smartnode
- Synced your Execution and Consensus clients
- Provisioned your node with [a withdrawal address](../prepare-node.md#setting-your-withdrawal-address), set up your [fallback clients](../fallback.md) (optional), opted into the [Smoothing Pool](../fee-distrib-sp.md#the-smoothing-pool) (optional), and configured [MEV](../mev.md)
- Created at least one [minipool](../create-validator.md)


## Guides

[Claiming Node Operator Rewards](../rewards.md) explains how RPL rewards and Execution-layer rewards work, and how to access them.

[Distributing Skimmed Rewards](../skimming.md) covers accessing rewards from the Beacon Chain that periodically get "skimmed" by the protocol and delivered to your minipools.
