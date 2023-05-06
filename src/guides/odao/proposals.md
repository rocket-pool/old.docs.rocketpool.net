# Oracle DAO Proposals

As a reminder, there are two types of Oracle DAO duties:

1. **Automated duties** - these are duties related to routine Rocket Pool operation, such as shuttling information from the Consensus Layer to the Execution Layer, calculating various aspects of the protocol off-chain, and submitting them as updates to the Smart Contracts. Each of these is performed automatically by the `watchtower` daemon process and do not require manual intervention so long as your Execution and Consensus Clients, and your `watchtower` daemon, are all operating normally. You set up the `watchtower` daemon in the previous steps already, so this section will not go over them again.
   
2. **Manual duties** - these are duties that require your own decision making and out-of-band communication with the rest of the Oracle DAO to perform. They include things such as voting on contract upgrades, changing parameters, and inviting or kicking members to/from the Oracle DAO. These can all be done via the standard Smartnode CLI. This section describes each of these duties and how to perform them.

Proposals form the core of your responsibities outside of the automated `watchtower` duties.
Essentially, they work as follows:

- The collective Oracle DAO should discuss an upcoming proposal extensively ahead of time, so each member is aware of it and understands what that proposal will entail.
- An Oracle DAO member then creates the proposal via an on-chain transaction.
- The proposal will then enter a **wait period** before voting can begin to have further discussion and form their opinion on it. This is currently **7 days** on Mainnet.
- After the wait period is over, members can vote on the proposal via a simple yes-or-no vote.
- When a quorum of 51% of the Oracle DAO members has voted the same way, the vote is concluded. If 51% agreed to the proposal, it will be able to be **executed**. Any member can execute the proposal once it is approved.
- Execution refers to formally triggering the change on-chain, thus modifying the state of the core Rocket Pool contracts.


## Making a Proposal

Once you make a proposal, it will enter a **review period** where the other members can see it and discuss it, but will not be able to vote on it.
At the time of writing, this is currently **7 days**.

After the review period, there will be a **voting period** where members can vote either for the proposal, or against it.
At the time of writing, this is currently **14 days**.

If the proposal reaches quorum before it expires (that is, if enough members vote in favor of it to reach consensus), it will be **passed**.
Quorum is a configurable parameter by the Oracle DAO; it is currently set to at least **51%** of the total member pool.

Once a vote is passed, it can be **executed** which causes its changes to go into effect.
At the time of writing, the execution is **14 days** after the proposal was passed.

The process for making a new proposal depends on the type of proposal you want to make.
Select a type from the tabs below.

:::::: tabs
::::: tab Oracle DAO Member List

To propose modifying the list of Oracle DAO members, use the `rocketpool odao propose member` command which provides the following options:

```
NAME:
   rocketpool odao propose member - Make an oracle DAO member proposal

USAGE:
   rocketpool odao propose member command [command options] [arguments...]

COMMANDS:
   invite, i  Propose inviting a new member
   leave, l   Propose leaving the oracle DAO
   kick, k    Propose kicking a member

OPTIONS:
   --help, -h  show help
```

#### invite

Inviting a member is done via `rocketpool odao propose member invite` which will take 3 additional arguments:
- The node address to invite (must be a registered Rocket Pool node)
- The name / label for this node
- The URL or contact info for the user or organization running the node

For example: to invite a new member, run `rocketpool odao propose member invite 0xabcd1234abcd1234abcd1234abcd1234abcd1234 some-user user@example.com`.


#### kick

Kicking a member out of the Oracle DAO is done via the `rocketpool odao propose member kick` command.
It will ask you to select which member you want to kick, and issue an optional fine (from 0 RPL up to the bonded RPL amount, currently 1750 RPL).
This fine, if provided, will burn part of (or all of) the member's RPL bond if the Oracle DAO votes to kick that member.


#### leave

If you would like to voluntarily resign from the Oracle DAO, use the `rocketpool odao propose member leave` command.
This will create a new proposal so the other members can vote on whether or not to approve your resignation.

:::::
::::: tab Oracle DAO Parameters

To propose modifying the parameters that govern how Oracle DAO votes and membership modification work, use the `rocketpool odao propose setting` command which provides the following options:

```
NAME:
   rocketpool odao propose setting - Make an oracle DAO setting proposal

USAGE:
   rocketpool odao propose setting command [command options] [arguments...]

COMMANDS:
   members-quorum, q                 Propose updating the members.quorum setting - takes a percent, from 0 to 100
   members-rplbond, b                Propose updating the members.rplbond setting - takes an RPL amount (e.g. 5000)
   proposal-cooldown, c              Propose updating the proposal.cooldown.time setting - format is e.g. 1h30m45s
   proposal-vote-timespan, v         Propose updating the proposal.vote.time setting - format is e.g. 1h30m45s
   proposal-vote-delay-timespan, d   Propose updating the proposal.vote.delay.time setting - format is e.g. 1h30m45s
   proposal-execute-timespan, x      Propose updating the proposal.execute.time setting - format is e.g. 1h30m45s
   proposal-action-timespan, a       Propose updating the proposal.action.time setting - format is e.g. 1h30m45s
   scrub-period, s                   Propose updating the minipool.scrub.period setting - format is e.g. 1h30m45s

OPTIONS:
   --help, -h  show help
```


#### members-quorum

Using `rocketpool odao propose setting members-quorum <value>` will change the quorum required for the Oracle DAO's duties before they are considered canonized.
`<value>` here can be a floating point number between 0 and 100, indicating the percent of members needed to reach quorum on Oracle DAO votes.

::: warning NOTE
Note that this does **not** affect the quorum required for automated duties such as RPL price and rETH balance submission; those settings are controlled by the Protocol DAO (pDAO), *not* the Oracle DAO.
:::


#### members-rplbond

Use `rocketpool odao propose setting members-rplbond <value>` to change the amount of RPL required as a bond for new members invited to the Oracle DAO.
For example, entering `5000` for `<value>` will set the bond at 5000 RPL.
Note that this does not affect members that already exist; it only affects new members invited after the change.


#### proposal-cooldown

Use `rocketpool odao propose setting proposal-cooldown <value>` to change the cooldown time that a member must wait between submitting proposals.

`<value>` is a string-formatted time duration, such as `1h30m45s` for one hour, thirty minutes, and forty-five seconds.
It does not accept days; for multiple days, simply use the total number of hours.


#### proposal-vote-timespan

Use `rocketpool odao propose setting proposal-vote-timespan <value>` to change how long a vote can exist before expiring.

`<value>` is a string-formatted time duration, such as `1h30m45s` for one hour, thirty minutes, and forty-five seconds.
It does not accept days; for multiple days, simply use the total number of hours.


#### proposal-vote-delay-timespan

Use `rocketpool odao propose setting proposal-vote-delay-timespan <value>` to change how long the Oracle DAO must wait before being able to vote on a new proposal.

`<value>` is a string-formatted time duration, such as `1h30m45s` for one hour, thirty minutes, and forty-five seconds.
It does not accept days; for multiple days, simply use the total number of hours.


#### proposal-execute-timespan

Use `rocketpool odao propose setting proposal-execute-timespan <value>` to change how long the Oracle DAO has to execute (enact) a proposal after it is approved.
If none of the members execute the proposal during this window, it will expire and the proposal will become invalid.

`<value>` is a string-formatted time duration, such as `1h30m45s` for one hour, thirty minutes, and forty-five seconds.
It does not accept days; for multiple days, simply use the total number of hours.


#### proposal-action-timespan

Certain proposals require secondary actions after being executed for them to finish taking effect (such as inviting a member to join, then them actually joining).
Use `rocketpool odao propose setting proposal-action-timespan <value>` to change how long this secondary action is able to be run after the proposal is executed.
The user will be unable to take this action *after* this window; if the action isn't taken in time, the proposal is essentially invalid.

`<value>` is a string-formatted time duration, such as `1h30m45s` for one hour, thirty minutes, and forty-five seconds.
It does not accept days; for multiple days, simply use the total number of hours.


#### scrub-period

Use `rocketpool odao propose setting scrub-period <value>` to change how long the "scrub period" lasts (the time between a new minipool entering `prelaunch` status and entering `staking` status).
The Oracle DAO has this long to check new minipools for the [withdrawal credentials exploit](https://github.com/rocket-pool/rocketpool-research/blob/master/Reports/withdrawal-creds-exploit.md) and scrub them if the exploit is detected, thus ensuring rETH funds are not stolen.
This duty is performed automatically by the `watchtower` daemon.
As the check is usually done in a matter of minutes, this value is simply designed to act as an insurance buffer in the case that the Oracle DAO cannot come to consensus due to node failure; the members have this long to resolve the problem and reach the quorum on scrubbing an exploited minipool.

`<value>` is a string-formatted time duration, such as `1h30m45s` for one hour, thirty minutes, and forty-five seconds.
It does not accept days; for multiple days, simply use the total number of hours.

:::::
::::: tab Contract Upgrades

Contract upgrades are currently outside the scope of the CLI.
The transactions must be submitted manually; please consult the Rocket Pool team if you would like to learn how to propose a contract upgrade to the network.

:::::
::::::


## Viewing Proposals

To view a brief summary of all of the proposals in the protocol's history, use `rocketpool odao proposals list`.
This will sort the proposals by their status and show who proposed it and what it does.

To view the details of a specific proposal, use `rocketpool odao proposals details <value>` where `<value>` is the ID of the proposal you would like to view.
This will show a comprehensive breakdown of the proposal's information including who created it, when it was created, the payload body, how many members voted in favor of it, how many members voted against it, and whether or not your node has voted on it yet.


## Voting on Proposals

To vote on a proposal, use the following command:

```
rocketpool odao proposals vote
```

This will provide you with an interactive dialog asking which proposal you would like to vote on, and whether you would like to vote in favor of it or against it.
Follow the prompts carefully to complete the vote.


## Executing Proposals

When a proposal has received enough votes in favor of it to reach quorum, any member of the Oracle DAO can then *execute* the proposal (apply its changes) using the following command:

```
rocketpool odao proposals execute
```

This will provide you with an interactive dialog asking which proposal you would like to execute.
Follow the prompts carefully to complete the execution.
