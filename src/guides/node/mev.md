# MEV, MEV-Boost, and MEV Rewards

Now that [the Merge](https://ethereum.org/en/upgrades/merge/) has passed, node operators receive priority fees (tips) from the transactions they include in any blocks that they propose.
These fees come from and stay on the Execution layer, so unlike most validation rewards locked on the Beacon Chain, these fees are *immediately liquid*.
In general, priority fees provide almost as much ETH to you as Beacon Chain rewards do, so they are a very nice benefit of the Merge.

That being said, they aren't the *only* form of liquid reward available to you on the Execution layer.


## What is MEV

When your validator creates a block, it usually does so with a very simple algorithm: keep track of a list of pending transactions, shove as many as them into the block you're building as possible (sorted so the ones with the highest tips come first), and submit that block to the chain.

However, Ethereum network users have discovered an interesting side-effect of being able to see the publicly available pool of pending transactions (known as the **mempool**).
Having this knowledge allows them to employ clever and sophisticated algorithms to modify the ordering of those transactions, and in some cases, introduce *new* transactions between them.
These two techniques combined can be used to extract additional ETH from a block proposal.

This extra ETH is known as **Maximal Extractable Value**, or MEV for short.

In general, there are two "flavors" of MEV:
- MEV that comes from "benign" sources, such as being the first to arbitrage between exchanges after a large buy or sell
- MEV that comes at the cost of the Ethereum users, by front-running their transactions and profiting from the user's resulting slippage (see [Sandwich Attacks](https://trustwallet.com/blog/how-to-protect-yourself-from-sandwich-attacks) for more information on this technique)


## Block Builders and Relays

Finding MEV opportunities is not an easy thing; state-of-the-art opportunity finders, known as **searchers**, require immensely powerful computers and employ complex AI algorithms to quickly identify and extract MEV.
Searchers then take these opportunities and provide them to **block builders** - entities that aggregate these bundles of opportunities together to form a complete Ethereum block (which can be the searchers themselves or other parties).

The hardware and software requirements for running a profitable searcher prevent most node operators from using them (or at least using them *competitively*), and thus prevent them from finding their own MEV opportunities to capitalize on.
Luckily, simply *finding* MEV opportunities is only half of the equation.

Every Epoch (6.4 minutes, or 32 slots), the Beacon Chain randomly selects a validator from the entire list of active validators to propose a block that will fit in one of the slots for in that Epoch.
This list can be seen for the next upcoming Epoch, which means everyone can see which validators are assigned to each slot a few minutes in advance.

Some [clever entities](https://docs.flashbots.net/) have leveraged this advance knowledge to essentially construct a kind of "marketplace" of sorts.
In this marketplace, validators can register themselves when they have upcoming block proposals and block builders can submit bids for blocks they'd like the validators to propose.
These bids always give the priority fees from each transaction in the block to the proposer, and they *also* offer a supplemental tip to the proposer that comes from the MEV the builder was able to extract for themselves. 

The validators can then examine these bids, determine which one ultimately provides the most profit, and propose that block instead of building their own.

This "marketplace" where block builders interact with validators is known as a **relay**.
Different relays have different rules (such as which of the aforementioned "flavors" of MEV they permit from block builders, and whether or not they comply with certain government sanction regulations), but ultimately they all serve this same marketplace function.

Rocket Pool currently offers its node operators access to **six different relays**:

| Name | Regulation | MEV Types |
| - | - | - |
| [Flashbots](https://boost.flashbots.net/) | Complies with OFAC Sanctions* | All types |
| [bloXroute Max Profit](https://docs.bloxroute.com/apis/mev-solution/mev-relay-for-validators) | Unregulated | All types |
| [bloXroute Ethical](https://docs.bloxroute.com/apis/mev-solution/mev-relay-for-validators) | Unregulated | "Benign" (no front-running or sandwiching) |
| [bloXroute Regulated](https://docs.bloxroute.com/apis/mev-solution/mev-relay-for-validators) | Complies with OFAC Sanctions* | All types |
| [Blocknative](https://docs.blocknative.com/) | Complies with OFAC Sanctions* | All types |
| [Eden Network](https://v2.docs.edennetwork.io/eden-relay/overview) | Complies with OFAC Sanctions* | All types |

::: warning NOTE
*Relays that comply with OFAC sanctions follow the blacklist of addresses that the United States Office of Foreign Assets Control (OFAC) maintains.
We **strongly encourage** you to read more about the OFAC sanctions, network censorship, and make a carefully-informed decision about whether or not you believe you should comply with those sanctions and which relays you are comfortable using.

More information can be found in articles such as these:
- [https://home.treasury.gov/news/press-releases/jy0916](https://home.treasury.gov/news/press-releases/jy0916)
- [https://www.coindesk.com/tech/2022/08/23/as-censorship-on-ethereum-begins-could-this-open-sourced-code-help-counter-it/](https://www.coindesk.com/tech/2022/08/23/as-censorship-on-ethereum-begins-could-this-open-sourced-code-help-counter-it/)
- [https://blog.bitmex.com/ofac-sanctions-ethereum-pos-some-technical-nuances/](https://blog.bitmex.com/ofac-sanctions-ethereum-pos-some-technical-nuances/)
- [https://www.paradigm.xyz/2022/09/base-layer-neutrality](https://www.paradigm.xyz/2022/09/base-layer-neutrality)
:::


## MEV-Boost

There are many relays out there, and having your node automatically register and maintain contact with each of them can be a burdensome task.
Luckily, the engineers at Flashbots produced and maintain a program explicitly designed to handle this relay management known as [MEV-Boost](https://boost.flashbots.net/).

MEV-Boost is a simple program: you tell it which relays you want to use and tell your Consensus client how to reach it, and it takes care of all of the registration, bidding, blind signing, and proposal management in conjunction with your Consensus client.
It lets you passively participate in this builder-proposer-marketplace, and thus earn extra rewards with zero effort on your part.

MEV-Boost is [open source](https://github.com/flashbots/mev-boost) and has been [audited](https://github.com/flashbots/mev-boost/blob/main/docs/audit-20220620.md).

Below is a good visual depiction of how the entire MEV ecosystem functions, and where MEV-Boost fits in:

![](https://raw.githubusercontent.com/flashbots/mev-boost/main/docs/mev-boost-integration-overview.png)

<center>

*Image courtesy of Flashbots*

</center>

The Rocket Pool Smartnode comes with MEV-Boost directly bundled in by default, enabling our **Docker Mode** and **Hybrid Mode** node operators to seamlessly take advantage of it.
**Native Mode** users will need to set it up manually.


## Rocket Pool and MEV

Because Rocket Pool validators are partially funded by the rETH stakers, the protocol requires that MEV rewards (as well as priority fees) be **shared with the rETH stakers** (minus the node operator's commission, of course).
Node operators are not permitted to pocket the entire MEV reward for themselves when proposing with a Rocket Pool validator.

To that end, MEV-Boost is a critical component of the Rocket Pool network for several reasons:
- It provides easy access to the network of MEV relays
- It ensures that the node operator isn't building their own blocks; this is important to ensure that a node operator isn't running their own searcher and stealing MEV without sharing it with the rETH stakers
- It increases the overall returns for the rETH stakers, which keeps the protocol competitive with other, more centralized staking providers

The second point here is important: Rocket Pool as a protocol will ultimately rely on a [Trusted Block Builder](https://github.com/rocket-pool/rocketpool-research/blob/master/Post%20Merge/Security.md#option-2-trusted-block-builders) (or more accurately, a Trusted Relay) design to ensure that rETH stakers always receive their fair share of MEV rewards and priority fees.

Each of the relays listed above currently act in this role.

We are taking a three-phase approach towards tranistioning to the Trusted Block Builder design:


### Phase 1: Opt-In

In phase 1, MEV-Boost is provided to all node operators as an **opt-in** configuration.
Node operators are encouraged to use it because it improves rETH's returns and thus keeps the protocol competitive, but are not required to use it.
Node operators can elect to use **one or more** of the trusted relays listed above but cannot use a custom (untrusted) relay.

This is the **current** phase.


### Phase 2: Opt-Out

In phase 2, MEV-Boost is enabled by default for all node operators.
Node operators can elect to use **one or more** of the trusted relays listed above but cannot use a custom (untrusted) relay.
Node operators that choose to opt-out of MEV-boost must do so explicitly before starting the Smartnode.

This phase is estimated to begin in **October 2022**.


### Phase 3: Required

In phase 3, MEV-Boost is no longer optional; it will be required for all node operators.
Node operators **must** elect to use **one or more** of the trusted relays listed above but cannot use a custom (untrusted) relay.

There is currently **no scheduled date** for this phase.


## Configuring MEV-Boost in the Smartnode

To learn how to configure MEV-Boost, please select which mode you are using below.

:::::: tabs
::::: tab Docker Mode
Configuring MEV-Boost is easy with the Smartnode's configuration TUI.
Start by running `rocketpool service config` and navigate to the `MEV-Boost` option:

<center>

![](./images/tui-mev-boost.png)

</center>



:::::

::::: tab Hybrid Mode

:::::

::::: tab Native Mode

:::::
::::::

