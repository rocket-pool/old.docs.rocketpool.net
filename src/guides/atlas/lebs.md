# 8-ETH Bonded Minipools

::: warning NOTE
This page describes features that are currently in BETA and only apply to certain test networks.
Nothing here is live on Mainnet yet.
:::

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
**This can be done as soon as Atlas is launched on the network.**

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


## Migrating a 16-ETH Minipool to 8-ETH

::: warning NOTE
This process requires both the Atlas *and* the Shapella upgrades to occur.
It *cannot* be done with Atlas alone; if you're interested in leveraging it, you must wait for both to occur.
:::

Once both the Atlas and Shapella upgrades have been deployed, node operators have the ability to **directly migrate** their existing 16-ETH minipools into 8-ETH minipools.
Doing so will add 8 ETH to their [deposit credit balances](./credit.md) which can be used to **create additional minipools without requiring any ETH from the node operators**.

In effect, this process allows a node operator to **convert one 16-ETH minipool into two 8-ETH minipools for free** (*though it will still require ETH for gas and require enough RPL collateral to handle both minipools*).

Migrating an existing 16-ETH minipool to an 8-ETH one is formally known as **bond reduction**.
It is a two-step process and involves validation by the Oracle DAO.
We'll walk you through the whole process in the sections below.


### Bond Reduction Rules

A bond reduction involves the following steps:

1. Starting the bond reduction, done by the node operator.
2. A waiting period (the "bond reduction scrub check"), allowing the Oracle DAO time to verify the bond reduction is legal and cancel any bond reductions that violate the rules.
3. Completing the bond reduction, done by the node operator.

To perform a successful bond reduction without being scrubbed, the minipool must follow these rules:

1. The minipool's validator on the Beacon Chain must be **pending or actively staking**. It cannot be slashed, exiting / exited, or withdrawable / withdrawn.
2. The minipool's validator balance on the Beacon Chain must be **at least 31.999 ETH** (32 ETH with a small buffer for poorly-timed complications resulting in missed attestations after a rewards skim).

The minipool must obey these conditions for the **entire duration** of the scrub check, during which time the Oracle DAO will be watching it to ensure compliance with the conditions above.

If, at any time during the scrub check, a minipool is found to be in violation of these conditions, the bond reduction will be **scrubbed**.
The minipool itself will not be affected; it will still happily live on as a 16 ETH minipool, validating and acting as though the whole bond-reduction process never happened.
However, **it will no longer be eligible for bond reductions**.
Once a minipool's bond reduction is scrubbed, it can never be attempted again.

::: warning NOTE
Upon a successful bond reduction, the minipool's bond amount will be reduced from 16 ETH to 8 ETH and **the minipool's commission will be reset to whatever the current network value is**.

If you reduce a 16-ETH minipool with a 20% commission, **you will not keep that 20% commission**.
It will be reduced to the network value (**currently set to a flat 14%**).

Note that as demonstrated by the [example math](#rewards) section, an 8-ETH minipool at 14% is *still more profitable* than a 16-ETH minipool at 20% so holding onto a high commission rate is not a compelling reason to retain a 16 ETH bond.
:::

### Step 1: Beginning Bond Reduction

To begin the bond reduction process, enter the following command:

```
rocketpool minipool begin-bond-reduction
```

This will start by providing a brief blurb on the process (though, if you have read through this guide, it should all be familiar to you already).
Once you acknowledge that you understand the process, it will show you which minipools currently have a bond that can be reduced, along with their current bond and commission: 

```
Please select a minipool to begin the ETH bond reduction for:
1: All available minipools
2: 0x7E5703fdA638CD86c316B9EbAF76927fF695ADC5 (Current bond: 16 ETH, commission: 15.00%)
3: 0x7E5704aD2a63eb90880426Dcd4a3811246dF3cB0 (Current bond: 16 ETH, commission: 15.00%)
4: 0x7E5705c149D11efc951fFc20349D7A96bc6b819C (Current bond: 16 ETH, commission: 15.00%)
5: 0x7E570625cE8F586c90ACa7fe8792EeAA79751778 (Current bond: 16 ETH, commission: 15.00%)

```

Once you've selected one or more minipools to reduce, the Smartnode will check if those minipools are eligible for bond reduction.

To be eligible, these conditions must be satisfied:
- The minipool has been upgraded to use the [Atlas minipool delegate contract](./withdrawals.md#the-minipool-delegate).
- The minipool's validator must have a Beacon Chain balance of at least 32 ETH.
- The minipool's validator must be pending or active.
- You have enough RPL staked to support the minimum RPL collateral level that would be required *after* the bond reduction.

If not, it will print a warning error explaining what needs to be done first; for example:

```
Please select a minipool to begin the ETH bond reduction for:
1: All available minipools
2: 0x7E5703fdA638CD86c316B9EbAF76927fF695ADC5 (Current bond: 16 ETH, commission: 15.00%)
3: 0x7E5704aD2a63eb90880426Dcd4a3811246dF3cB0 (Current bond: 16 ETH, commission: 15.00%)
4: 0x7E5705c149D11efc951fFc20349D7A96bc6b819C (Current bond: 16 ETH, commission: 15.00%)
5: 0x7E570625cE8F586c90ACa7fe8792EeAA79751778 (Current bond: 16 ETH, commission: 15.00%)
2

Cannot reduce bond for minipool 0x7E5703fdA638CD86c316B9EbAF76927fF695ADC5:
The minipool version is too low. It must be upgraded first using `rocketpool minipool delegate-upgrade`.
You do not have enough RPL staked to support this bond reduction; it would bring you below the minimum RPL staking requirement. You will have to stake more RPL first.
```

This shows that the selected minipool requires a delegate upgrade and the node needs more RPL staked in order to reduce that minipool's bond.

When you have satisfied the preconditions, selecting a minipool in this command will simply prompt you to choose your gas price for the transaction and confirmation of the action.
Upon accepting the confirmation, the minipool's bond reduction will begin.


### Monitoring the Scrub Check Timer

Once you've started a bond reduction, you can view how long until it's able to be completed in your `node` daemon logs:

:::: tabs
::: tab Docker and Hybrid Mode
For **Docker Mode** and **Hybrid Mode** users, this can be done with the following command:
```
rocketpool service logs node
```
:::
::: tab Native Mode
Consult the script you use to review your node daemon's system logs.
:::
::::

You will see a new entry noting how much time is left until the scrub check for your bond reduction is complete:

```
rocketpool_node  | 2023/02/25 09:04:21 Checking for minipool bonds to reduce...
rocketpool_node  | 2023/02/25 09:04:21 Minipool 0x7E5703fdA638CD86c316B9EbAF76927fF695ADC5 has 12m0s left until it can have its bond reduced.
```

Once this timer reaches zero and no longer appears in these logs, you can complete the bond reduction.


### Step 2: Completing Bond Reduction

When the scrub timer has successfully ended, there are two ways to complete your minipool's bond reduction:

1. Let the `node` daemon handle it for you; it does this during the routine check it performs every five minutes (the same one that prints the time-remaining line in the log above). If it notices you have an eligible bond reduction, **it will complete the reduction automatically** - just as it does with staking pending minipools and checking your fee recipient. You will see output in the `node` log showing when it has detected, and completed, a bond reduction.
2. Complete the bond reduction manually using the following command:
   ```
   rocketpool minipool reduce-bond
   ```
   The command is simple; follow the prompts to complete the process once your minipool is eligible for bond reduction.

During the bond reduction, Rocket Pool **distributes your minipool's existing balance** using the minipool's pre-bond-reduction bond and commission to ensure both you and the rETH stakers get your fair share of the existing balance, and the bond reduction doesn't change the rewards either party *would* have gotten on that balance.


### The Results of a Reduced Bond

You can verify the successful bond reduction using `rocketpool minipool status`.

**Before** the bond reduction, for the example minipool we've been following, that command would produce the following output:

```
Address:              0x7E5703fdA638CD86c316B9EbAF76927fF695ADC5
...
Node fee:             15.000000%
Node deposit:         16.000000 ETH
RP ETH assigned:       2023-02-08, 06:13 +0000 UTC
RP deposit:            16.000000 ETH
Minipool Balance (EL): 0.150713 ETH
Your portion:          0.086660 ETH
Available refund:      0.000000 ETH
Total EL rewards:      0.086660 ETH
...
Beacon balance (CL):   32.000152 ETH
Your portion:          16.000087 ETH
...
```

**After** the bond reduction, the command would return this output:

```
Address:              0x7E5703fdA638CD86c316B9EbAF76927fF695ADC5
...
Node fee:             14.000000%
Node deposit:         8.000000 ETH
RP ETH assigned:       2023-02-08, 06:13 +0000 UTC
RP deposit:            24.000000 ETH
Minipool Balance (EL): 0.086769 ETH
Your portion:          0.000000 ETH
Available refund:      0.086769 ETH
Total EL rewards:      0.086769 ETH
...
Beacon balance (CL):   32.000037 ETH
Your portion:          8.000013 ETH
...
```

Note how things have changed:
- `Node fee` (commission) went from 15% to 14%
- `Node deposit` (your bond) went from 16 ETH to 8 ETH
- `RP deposit` (the amount you borrowed) went from 16 ETH to 24 ETH
- `Minipool Balance (EL)` went from 0.150713 ETH to 0.086769 ETH
- `Your portion (EL)` went from 0.086660 ETH to 0 ETH
- `Available refund` went from 0 ETH to 0.086769 ETH
- `Your portion (CL)` went from 16.000087 ETH to 8.000013 ETH

The changes to `Node fee`, `Node deposit`, `RP deposit`, and `Your portion (CL)` indicate that the bond was successfully reduced.

The changes to `Minipool Balance (EL)`, `Your portion (EL)`, and `Available refund` indicate the results of the **minipool balance distribution** that occured as part of the bond reduction process.
To clarify how to interpret these results:

- If you look at [the transaction](https://zhejiang.beaconcha.in/tx/0xf02f6b1a4ea68f356909e6f1974dc3c24d301ba115b97f3013c3c829ba2ca57c), you will also see that it sent 0.06413383 ETH from the minipool to the staking pool.
- In the "before" example, the staking pool's share is the minipool's balance minus the node operator's portion, or `0.150713 - 0.086660 = 0.064053` which is the amount transferred to the staking pool during the bond reduction (plus a small amount from a rewards skim that occurred during the scrub check).
- The *node operator's* share, on the other hand, doesn't get sent to the node operator's withdrawal address. It is instead bookmarked as an **available refund**, which is why the refund amount increased from 0 ETH to what was previously the "your portion" amount of the minipool's balance on the EL.
  - You can claim this refund at any time using the following command:
    ```
    rocketpool minipool refund
    ```

There is one more important result of the bond reduction, which can be observed using `rocketpool node status`:

```
Your Smartnode is currently using the Zhejiang Test Network.

=== Account and Balances ===
The node 0x9BA1401Eb7D779eC51f910B066e9C4351cD28911 has a balance of 347.796908 ETH and 16799.835547 RPL.
The node has 8.000000 ETH in its credit balance, which can be used to make new minipools.
...
```

The bond reduction process has **increased the node's** [deposit credit balance](./credit.md) by 8 ETH.
This credit can be used to make another 8-ETH minipool for free (no ETH required from the node wallet, except for gas)!