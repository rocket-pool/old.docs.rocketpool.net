# Claiming Node Operator Rewards

As a Rocket Pool node operator, you are entitled to regular rewards that will be provided in the form of the RPL token and (if you are opted into the Smoothing Pool) some ETH as well.
This section will describe how these rewards work and how you can claim them.

## Rewards and Checkpoints

At regular intervals, Rocket Pool will flag a **checkpoint** on the network.
Currently, checkpoints occur **every 28 days**.

At a new checkpoint, the Oracle DAO will collectively create a **true snapshot** of the state of the node operators in the Rocket Pool network, which it will use to determine the RPL and Smoothing Pool ETH rewards for each node during that interval.

This information is compiled into a [Merkle Tree](https://en.wikipedia.org/wiki/Merkle_tree) - an extremely efficient way to make all of the details available to smart contracts.
The Merkle Tree is built into a JSON file and hosted on the [InterPlanetary File System (IPFS)](https://en.wikipedia.org/wiki/InterPlanetary_File_System) and mirrored on [a GitHub repository that we maintain](https://github.com/rocket-pool/rewards-trees/).

Once the tree is submitted, the Rocket Pool smart contracts will mint new RPL tokens and move them, along with the Smoothing Pool's entire ETH balance, into the Rocket Pool vault for secure storage.
You can then view how many RPL and ETH rewards you earned during that interval and claim those rewards.

The rewards system has the following features:

- Each interval is independent. The amount of RPL and ETH you earned in one interval does not affect the earnings for subsequent intervals.
- You can **let rewards accumulate** for as long as you want. You do not need to claim rewards by a specific time; they will always be available for you to claim, and will always provide exactly the same amount of RPL and ETH **regardless of when you claim them**.
- You can claim one interval or a time, or **multiple intervals** all at once.
- Your first claim transaction uses about 85k gas. Each subsequent claim transaction costs about 55k gas.
  - If you're claiming multiple intervals at once, each supplemental interval costs **6k gas** so it's most cost-effective to claim as many of them at once as possible.
- You can **restake some (or all) of your RPL rewards** as part of the claiming transaction so it's all done in a single transaction (which further reduces gas costs).
- Currently, **all of your claims must be on Mainnet** but we have the infrastructure in place to build the ability to claim on Layer 2 networks at a later date.

For more information on how the Merkle Tree is built and how rewards are calculated, [please visit our `research` repository and view the official specifications](https://github.com/rocket-pool/rocketpool-research/tree/master/Merkle%20Rewards%20System).
We've provided a brief explanation of them below.


### RPL Rewards

RPL's current rewards rate is **5% inflation per year**.
This means that for the first year of operation, with a total supply of 18,000,000 RPL, the protocol will mint **900,000 RPL**.
70% of this (630,000 RPL) will be distributed to Rocket Pool node operators, which is roughly **48,300 RPL per checkpoint**.

This amount will be divided among all of the node operators on the network, weighted by their **total effective stake**.
The effective stake is essentially how much RPL collateral they've staked against their minipools, capped at 150%.
Thus, for a single minipool with a 16 ETH deposit, the maximum effective stake is 24 ETH worth of RPL (which varies with the ETH/RPL ratio).
Staking more RPL than this will not result in higher rewards.

For example: if 48,300 RPL were minted, your node had 1000 effective RPL staked, and the total effective stake of the network was 1,000,000 RPL, then your rewards for the checkpoint would be 48,300 * 1000 / 1000000 = **48.3 RPL**. 

If less than 28 days have passed between the time when you registered your node and the checkpoint, your rewards in that first rewards interval will be **pro-rated** to account for that. For example, if you registered on day 14 if the interval, you would receive 50% of normal rewards.

After that first interval, your node will have been registered long enough on subsequent intervals that you will receive full rewards for all of them.

::: danger NOTE
In order to claim your rewards, you must have a minimum collateralization ratio of **10%** at the time of the checkpoint.
This means if you have a single minipool that you deposited 16 ETH into, you must have staked at least 1.6 ETH worth of RPL in order to claim your rewards.
The `rocketpool node status` command will show you your current collateralization ratio.

If you are below 10% during the checkpoint, **you will not be eligible for any rewards for that interval.**
**Even if you increase above 10% at a later date, you will not have any rewards to claim for that interval.**
Therefore it is **crucial** that you maintain at least 10% collateral at all times.
:::


### Smoothing Pool ETH Rewards

Along with RPL rewards, the Smoothing Pool's entire ETH balance is distributed during rewards checkpoints.
Half of it (minus the average node commission) will be sent to the rETH contract where it can be burned for ETH from pool stakers that want to exit or used to create more minipools.
The remaining portion will be distributed amongst the eligible node operators.

Nodes that are opted into the smoothing pool for the interval, even if only part of the time, are eligible for a portion of the Smoothing Pool's total balance.
The balance is snapshotted at the rewards checkpoint, and the Oracle DAO determines each eligible node's portion.
The portion is determined by the following factors:
- Amount of time in the Smoothing Pool this interval
- Attestation performance on the Beacon Chain for each minipool
- The commission of each minipool

If you'd like to know more, please see the `research` repository linked above for a full breakdown of how the rewards are calculated.


### (Optional) Generating the Rewards Tree

When a new rewards checkpoint is reached, the Oracle DAO will begin to build the rewards tree for that interval.
Building this tree currently takes approximately 2 hours, and the rewards for the interval aren't available to claim until the tree has been built and submitted.
Once it's available, your node will automatically download this file and you'll be able to view and claim your rewards for that interval.

If you'd like to generate the tree yourself instead of downloading the pre-built one from the Oracle DAO, you can do so!
- Enter the `rocketpool service config` TUI.
- Navigate to the `Smartnode and TX Fees` section.
- Change the `Rewards Tree Mode` from `Download` to `Generate`.
- If your primary Execution client is not an archive node, you can add a URL for a separate archive node in the `Archive-Mode EC URL` box.
  - This is needed to generate historical rewards trees.
  - The Archive EC will only be used for tree generation; it will not be used for any other Smartnode duties.
  - [Infura](https://infura.io/product/ethereum) and [Alchemy](https://www.alchemy.com/supernode) offer archive node access. **Note that the free tiers are usually not sufficient to handle tree generation, so you will need one of the paid tiers.**

Now your Smartnode will build the tree completely independently from the Oracle DAO, using only the data provided by your Execution and Consensus clients.
You can watch it during a rewards interval checkpoint with `rocketpool service logs watchtower`.

If you'd like to rebuild past trees from previous intervals, you can do so with the following command:

```
rocketpool network generate-rewards-tree
```

Follow the prompts, and then use `rocketpool service logs watchtower` to view its progress.


## Claiming Rewards

To view your pending unclaimed rewards, run the following command:

```
rocketpool node claim-rewards
```

As intervals go by and you accumulate rewards, the output will look like this:

<center>

![](./images/claim-rewards-gb.png)

</center>

Here you can quickly see how many rewards you've earned at each interval, and can decide which one(s) you want to claim.

You can also specify an amount you want to restake during this claim:

<center>

![](./images/autostake.png)

</center>

This will let you compound your RPL rewards in one transaction, which saves on gas costs.

Simply follow the prompts, ensure your node wallet has enough ETH to pay for the gas costs of claiming, and you're done!
**Your rewards will be sent to your withdrawal address.**

::: tip TIP
To view your node's total rewards, including those you've already claimed, use the following command:

```
rocketpool node rewards
```

This will provide a breakdown of how much RPL and ETH you've claimed so far, and how much is still unclaimed:

```
=== ETH ===
You have earned 8.1935 ETH from the Beacon Chain (including your commissions) so far.
You have claimed 0.0634 ETH from the Smoothing Pool.
You still have 3.4788 ETH in unclaimed Smoothing Pool rewards.

=== RPL ===
The current rewards cycle started on 27 Sep 22 21:26 EDT.
It will end on 30 Sep 22 21:26 EDT (20h35m17s from now).
You currently have 675.616380 unclaimed RPL from staking rewards.

Your estimated RPL staking rewards for this cycle: 36.851544 RPL (this may change based on network activity).
Based on your current total stake of 6615.797278 RPL, this is approximately 67.77% APR.
Your node has received 208.551820 RPL staking rewards in total.

You may claim these rewards at any time. You no longer need to claim them within this interval.
```
:::


## Execution-Layer Rewards in your Fee Distributor

If you're **not** opted into the Smoothing Pool, the Execution-layer portion of your rewards from block proposals (including transaction fees and MEV) will be sent to your node's [Fee Distributor](./fee-distrib-sp.md#fee-distributors-and-the-smoothing-pool) contract instead.

To check the balance of your Fee Distributor, you can either use a chain explorer like [https://etherscan.io](https://etherscan.io) or simply run `rocketpool node status` - there will be a section called **Fee Distributor and Smoothing Pool** that shows it:

```
=== Fee Distributor and Smoothing Pool ===
The node is not opted into the Smoothing Pool.
To learn more about the Smoothing Pool, please visit https://docs.rocketpool.net/guides/redstone/whats-new.html#smoothing-pool.
The node's fee distributor 0xA0bfbFC582f5814585f8455Ed6D7B620eA9a9EE4 has a balance of 1.143598 ETH.
```


### Distributing the Balance

To access the Fee Distributor's balance, you will **distribute** it (hence the name, *Fee Distributor*).
This will calculate your share of the rewards (based on your node's average minipool commission) and send it to your node's withdrawal address; the rest is sent to the staking pool.

Distribution can be done **at any time**.
You can sit on the balance and let it accumulate if you choose, or distribute it regularly.

To distribute the balance, run the following command:

```
rocketpool node distribute-fees
```

This will show how much goes to you and how much goes to the staking pool:
```
Your node's average commission is 15.00%.
Your fee distributor's balance of 1.143599 ETH will be distributed as follows:
	Your withdrawal address will receive 0.657569 ETH.
	rETH pool stakers will receive 0.486030 ETH.
```

Simply confirm the gas price you want and submit the transaction.
Once it's been completed, your portion of the rewards will be available in your node's withdrawal address.