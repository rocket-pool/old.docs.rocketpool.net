# 8-ETH Bonded Minipools

When Rocket Pool was first launched, it supported two types of minipools:
1. A **16-ETH bond**, where the node operator provided 16 ETH and the remaning 16 ETH would come from the staking pool to create a complete (32 ETH) validator.
2. A **32-ETH temporary bond**, where the node operator would provide all 32 ETH so they could skip the initialization process and start validating on the Beacon Chain right away, then be given a refund of 16 ETH once the deposit pool had enough ETH to cover it. At this point it would turn into a normal 16-ETH bonded minipool.

The latter was removed by a community vote several months into the protocol's life due to it no longer being necessary and resulting in long refund delays.

The former represented the protocol's lowest bond amount because it guaranteed that if a node operator used Rocket Pool to attack the Ethereum protocol and had their *entire bond* slashed, they would stand to lose just as much as the rETH stakers and would not come out ahead.

Since Rocket Pool's launch, the community has done [significant research](https://dao.rocketpool.net/t/leb8-discussion-thread/899) on the security provided by this bond and found that it was very conservative.
For all intents and purposes, a slashing of 16 ETH was deemed unrealistic and a 16-ETH bond effectively provided the same security benefits as a bond of only 8 ETH (plus the supplemental RPL requirement).
Thus, backed by this research, the Atlas upgrade introduces a new type of minipool to the list: the **8-ETH bond**, colloquially referred to by the Rocket Pool community as an "LEB8" (Lower ETH Bond - 8 ETH).

To create an 8-ETH minipool, the node operator only needs to provide **8 of their own ETH** (plus enough RPL to cover the collateral requirement - more on this in [RPL Collateral](#rpl-collateral)).
It will then pull **24 ETH** from the deposit pool in order to complete the validator and get to work on the Beacon Chain.

This **opens the door to new prospective node operators** that want to run a node but don't quite have 16 ETH.
Further, it lets larger node operators **put more pool staker ETH to work** on the Beacon Chain earning rewards.
As this works without meaningfully compromising security, everybody wins!

In this guide, we'll cover three topics:
- How 8-ETH bonded minipools actually work, and the reward numbers behind them
- How to create a new 8-ETH minipool
- How to migrate an *existing* 16-ETH minipool down to an 8-ETH minipool without exiting

Read on to learn more about each topic.


## How 8-ETH Bonded Minipools Work

Mechanically, 8-ETH bonded minipools behave **identically** to every other minipool in the protocol.
They still "own" a validator on the Beacon Chain (they represent that validator's withdrawal credentials), they still come with a commission (though the commission with Atlas **will be fixed at 14%** for all new minipools), and they provide all the same functionality that a 16-ETH bonded minipool does.
The difference lies entirely in the numbers.


### Rewards

From a profitability perspective (looking *purely* at ETH rewards and ignoring RPL), 8-ETH bonded minipools with a 14% commission provide *more rewards* to the node operator than even *16-ETH bonded minipools at 20% commission* (which, as of Redstone, is the highest possible reward configuration).
At the same time, they also provide more rewards to the *rETH holders* as well due to the fact that the node operators are more efficiently putting the capital of the rETH holders to work.

Let's walk through a simple example to illustrate.
Say we are a node operator with 16 ETH available to stake (plus the required RPL bond).
Say we've earned 1 ETH of rewards on the Beacon Chain per validator.
Here's how the math works out for a single 16-ETH minipool with a 20% commission, versus two 8-ETH minipools at 14% commission:

```
1x 16 ETH Minipool @ 20%:
Rewards: 1 ETH
Node Share = (16/32) + (16/32 * 0.2)
           = 0.5 + (0.5 * 0.2)
           = 0.5 + 0.1
           = 0.6 ETH

rETH Share = 1 - 0.6
           = 0.4 ETH


2x 8 ETH Minipools @ 14%:
Rewards: 2 ETH
Node Share = ((8/32) + (24/32 * 0.14)) * 2
           = (0.25 + (0.75 * 0.14)) * 2
           = (0.25 + 0.105) * 2
           = 0.71 ETH

rETH Share = 2 - 0.71
           = 1.29 ETH
```

In other words, a node operator will earn **18% more ETH** via two 8-ETH minipools than they would with a single 16-ETH minipool at 20% commission.


### RPL Collateral

In order to create an 8-ETH minipool, node operators still need to stake enough RPL to cover the minimum collateral requirements for their node (accounting for all of its minipools of all bond sizes).

These rules have been clarified with Atlas:
- The **minimum RPL** per minipool is **10% of the *borrowed* amount**
- The **maximum RPL** per minipool is **150% of the *bonded* amount**

For a 16-ETH minipool, this remains unchanged; the minimum is 1.6 ETH worth of RPL, and the maximum is 24 ETH worth of RPL.

For an 8-ETH minipool, this becomes a **minimum of 2.4 ETH worth of RPL** (10% of the borrowed amount, which is 24 ETH) and a **maximum of 12 ETH worth of RPL** (150% of the bonded amount).

These numbers were selected by the Rocket Pool community [as part of a governance vote](https://vote.rocketpool.net/#/proposal/0x7426469ae1f7c6de482ab4c2929c3e29054991601c95f24f4f4056d424f9f671).


## Creating a New 8-ETH Minipool

The process to create a new minipool with an 8-ETH bond is identical to the process for creating a 16-ETH minipool.

Simply run the following command:

```
rocketpool node deposit
```

When prompted for your bond amount, select `8 ETH`:

```
Your eth2 client is on the correct network.

NOTE: by creating a new minipool, your node will automatically claim and distribute any balance you have in your fee distributor contract. If you don't want to claim your balance at this time, you should not create a new minipool.
Would you like to continue? [y/n]
y

Please choose an amount of ETH to deposit:
1: 8 ETH
2: 16 ETH
1

Your minipool will use the current fixed commission rate of 14.00%.
You currently have 8.00 ETH in your credit balance.
This deposit will use 8.000000 ETH from your credit balance and will not require any ETH from your node.
...
```

::: tip NOTE
This example also shows usage of the [**new Deposit Credit System**](./credit.md).
Since the node operator has 8 ETH in credit, creating this 8-ETH minipool is free!
:::


That's all there is to it!
The rest of the process is the same as [the usual minipool creation instructions](../node/create-validator.md).
