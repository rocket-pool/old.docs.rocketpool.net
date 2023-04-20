# A Node Operator's Responsibilities

## How Ethereum Staking Works

As a reminder, staking in Proof of Stake is done via **validators**.
A validator is essentially a single Beacon Chain address to which 32 ETH was deposited on the Execution layer.
Validators are responsible for maintaining the consistency and security of the Beacon Chain.
They do this by listening for transactions and new block proposals and **attesting** that the proposed block contains legal, valid transactions by doing some number crunching and verification behind the scenes.
Occasionally, they get to propose new blocks themselves.

Validators are assigned attestations and block proposals **on a randomized schedule**.
This is very different from the old Proof of Work system, where everyone was constantly trying to race each other and come up with the next block before everyone else.
This means that unlike Proof of Work where miners weren't guaranteed to earn a block reward unless they found the next block, Proof of Stake validators *are* guaranteed to have slow, steady income as long as they perform their duties.
If a validator is offline and misses an attestation or a block proposal, it will be **slightly penalized**.
The penalties are quite small though; as a rule of thumb, if a validator is offline for X hours, it will make all of its lost ETH back after the same X hours of being back online.

### Rewards

Now that [the Execution and Consensus layers have merged](https://ethereum.org/en/upgrades/merge/), validators are able to earn five different types of rewards:

| Type | Layer | Frequency | Amount |
| - | - | - | - |
| Attestation | Consensus | Once per Epoch (every 6.4 minutes on average) | 0.000014 ETH* |
| Block Proposal | Consensus | [Every 2 months on average](https://proposalprobab.web.app/)** | 0.02403 ETH* |
| [Sync Committee](https://github.com/ethereum/annotated-spec/blob/master/altair/sync-protocol.md) | Consensus | Every 2 years on average** | 0.11008 ETH* |
| Slashing Reward | Consensus | Very rarely included in Block Proposals | Up to 0.0625 ETH |
| Priority Fees | Execution | Included in Block Proposals | Typically 0.01 to 0.1 ETH; very rarely 1+ ETH |
| MEV Rewards | Execution | Also included in Block Proposals when using [MEV-boost](https://boost.flashbots.net/) | Typically 0.01 to 0.1 ETH; very rarely 1+ ETH |

**Varies based on the total number of validators in the network.
Approximated for 435,000 active validators.*

***These are subject to randomness; there can be "dry spells" multiple times longer than the average without being given one.*

Rewards for performing validation duties are routinely ["skimmed"](./skimming.md) to minipools and can be distributed by
Node Operators as desired.

Rewards provided by participating in MEV are either paid to Node Operators' fee distributor for immediate distribution or
once per Rocket Pool rewards interval, if opted into the **Smoothing Pool**.

We will describe these rewards in more detail, including how to configure and access them, later on in the guide.


### Penalties

Validators are penalized for small amounts of ETH if they are offline and fail to perform their assigned duties.
This is called **leaking**.
If a validator violates one of the core rules of the Beacon chain and appears to be attacking the network, it may get **slashed**.
Slashing is a forceful exit of your validator without your permission, accompanied by a relatively large fine that removes some of your validator's ETH balance.

Realistically, the only condition that can cause a slashing is if you run your validator's keys on two nodes at the same time (such as a failover / redundancy setup, where your backup node accidentally turns on while your main node is still running).
Don't let this happen, and **you won't get slashed**.
Slashing *cannot occur* from being offline for maintenance.

Below is a table that shows the penalties that can happen to a validator:

| Type | Layer | Amount |
| - | - | - |
| Missed Attestation | Consensus | -0.000011 ETH* per attestation (-9/10 the value of a normal attestation reward) |
| Missed Proposal | Consensus | 0 |
| Missed Sync Committee | Consensus | -0.00047 ETH* per epoch (-0.1 ETH total if offline for the whole sync committee) |
| Slashing | Consensus | At least 1/32 of your balance, up to your entire balance in extreme circumstances |

**Varies based on the total number of validators in the network.
Approximated for 435,000 active validators.*

::: tip TIP
As a rule of thumb, if you're offline for X hours (and you aren't in a sync committee), then you'll make all of your leaked ETH back after X hours once you're back online and attesting.
:::


## How Rocket Pool Nodes Work

Unlike solo stakers which are required to put 32 ETH up for deposit to create a new validator, Rocket Pool nodes only need to deposit 8 or 16 ETH per validator (the "bond").
This will be coupled with 24 or 16 ETH (the "borrowed") from the staking pool (which "normal" stakers deposited in exchange for rETH) to create a new validator.
This new validator is called a **minipool**.

To the Beacon chain, a minipool looks exactly the same as a normal validator.
It has the same responsibilities, same rules it must follow, same rewards, and so on.
The only difference is in how the minipool was created on the ETH1 chain, and how withdrawals work when the node operator decides to voluntarily exit the minipool.
All of the creation, withdrawing, and rewards delegation is handled by Rocket Pool's **smart contracts** on the Ethereum chain.
This makes it completely decentralized.

A Rocket Pool **Node** is a single computer with an Ethereum wallet that was registered with Rocket Pool's smart contracts.
The node can then create as many minipools as it can afford, all running happily on the same machine together.
**A single Rocket Pool node can run many, many minipools.**
Each minipool has a negligible impact on overall system performance; some people have been able to run hundreds of them on a single node during Rocket Pool's beta tests.

A minipool's upfront cost is either 16 ETH, plus at least 1.6 ETH worth of the **RPL token**, or 8 ETH plus at least 2.4 ETH worth of the RPL token.
The supplemental RPL collateral acts as supplemental insurance against particularly egregious slashing incidents, and lets you participate in Rocket Pool's DAO where you can vote on changes to the smart contracts.


## Rocket Pool Node Operators

**Node operators** are the heart and soul of Rocket Pool.
They are the individuals that run Rocket Pool nodes.
They put ETH from the staking pool to work by running minipools with it, which earn staking rewards for the Rocket Pool protocol (and thus, increase rETH's value).
Their job is straightforward, but crucially important: *run validators with the highest quality possible, and maximize staking rewards*.

Node operators are responsible for:

- Setting up a computer (either physical or virtual)
- Configuring it correctly, including their home network if applicable
- Installing Rocket Pool on it and setting up minipools to perform validation
- Securing it, both from outside and inside threats
- Maintaining it for the life of their validators

It's a big responsibility, and not a simple set-it-and-forget-it kind of job; you need to care for your node for as long as it's staking.
With great responsibility, however, comes great rewards.
Here are the major benefits of running a Rocket Pool node:

- You earn half of the validator's total ETH rewards, *plus* an extra 14% commission paid by the pool staker's half 
- You earn interest on the RPL you stake as supplemental insurance
- You can participate in the DAO and get to vote on changes to Rocket Pool's protocol or settings

That being said, as a node operator **you are responsible for your own performance**.
If your node performs poorly and you actually end up losing ETH by the time you decide to exit your minipool, all of the lost ETH is coming out of your share.
For example: if you exit with a balance of 30 ETH, then your minipool lost 2 ETH from its initial 32 ETH deposit.
You will receive 14 or 6 ETH (depending on your **bond size**), and 24 or 16 ETH will be returned to the staking pool.

If you're fairly new to using the command line or computer maintenance, this can seem like a scary challenge.
Luckily, one of Rocket Pool's most core principles is *decentralization* - the fact that anyone, anywhere, can run a node if they have the determination and knowledge.
While we can't help with determination, we *can* help with knowledge.
This section is packed with guides, walkthroughs, and information that will help you understand how to run a great Rocket Pool node.
