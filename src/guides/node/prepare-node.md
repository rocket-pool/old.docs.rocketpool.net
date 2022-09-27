# Preparing your Node for Operation

If you're here, then you've succesfully started the Smartnode services, created a wallet, and finished syncing both the Execution (ETH1) and Consensus (ETH2) chains on your respective clients. 
If so, then you are ready to register your node on the Rocket Pool network and create a minipool with an ETH2 validator!
If not, please review the previous sections and return here once you've completed those steps.

Before creating a new minipool and ETH2 validator, there are a few steps to take to finish preparing your node.
These only need to be done once though; once you've done them, you can skip to the [Creating a New Minipool](./create-validator.md) section if you want to create multiple minipools on your node.


## Loading your Node Wallet

Registering your node and standing up a validator both involve submitting transactions to the Ethereum network from your node wallet.
This means **you'll need to have some ETH on it** to pay for the gas costs of those transactions.
You'll also need to stake some of the **RPL token** prior to creating a minipool as collateral; you can do this directly on the node, or (preferably) you can use the Rocket Pool website's **Stake on Behalf** function to stake for your node with RPL in your cold wallet.
We'll discuss the Stake on Behalf feature later in this guide when it's time to stake your RPL.

The ETH required for gas fees to set up a node with one minipool is about 0.0025 ETH times the current gas price in gwei.
For example, with a gas price of 30 gwei, you would pay about 0.075 ETH in gas fees.

See [this worksheet](https://docs.google.com/spreadsheets/d/1loB9U8wCIJn73a1DsR-mJJ9PQaYWMlF9asNc7BgM_zc/edit#gid=1413609552https://docs.google.com/spreadsheets/d/1loB9U8wCIJn73a1DsR-mJJ9PQaYWMlF9asNc7BgM_zc/edit#gid=1413609552 ) to help estimate the gas fees for various network conditions.

:::: tabs
::: tab Running on the Prater Test Network
If you're running on the Prater test network, please see the [Practicing with the Test Network](../testnet/overview.md) section to learn how to acquire test ETH.

For test RPL, we have added a similar faucet function directly to the CLI.
Please see the [Getting Test RPL on Goerli](../testnet/overview.md#getting-test-rpl-on-goerli) guide to acquire some.
:::
::: tab Running on the Main Network
We assume that you already have a separate Ethereum-compatible wallet that is holding your ETH and RPL tokens.
Start by transferring some ETH from your existing wallet to the node wallet.
If running on Mainnet, **leave your RPL on the wallet you used to purchase it.**

As a reminder, you can use `rocketpool wallet status` to get the address of the node wallet if you need it.
If you are not sure how to send cryptocurrency from your existing wallet, please consult your wallet's documentation.

::: danger
Sending cryptocurrency across wallets is a non-reversible operation!
If you enter the wrong recipient address, **there is no way to retrieve your tokens**.
We recommend you send a small amount of ETH first as a **test transaction** to verify that you correctly entered the node wallet's address, and then **whitelist** that address in your other wallet, if possible, to avoid mistyping it.
:::
::::


## Registering your Node with the Network

Once you have ETH in your wallet, you can register your node with the Rocket Pool network to access all of its features.
To do this, run the following command:

```
rocketpool node register
```

This will prompt you for the timezone you want to register with.
By default, this will detect the timezone from your system clock, but you can change it if you prefer.
Any of the `Country/City` format timezones [listed on this page](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) should be acceptable.

::: tip NOTE
The timezone is just used for the global map of node operators displayed on the main site.
You don't need to set it to your actual timezone if you have security concerns.
If you prefer to remain anonymous, use a generic option such as `Etc/UTC`.
:::

Once this is complete, you will officially be a member of the Rocket Pool network!


## Setting your Withdrawal Address

Before anything else, we highly recommended you change the **withdrawal address** for your node.
This is the address that all of your RPL checkpoint rewards, your staked RPL, and your Beacon Chain ETH will be sent to when you claim your checkpoint rewards or exit your validator and withdraw from your minipool.

::: warning NOTE
By default, this is set to your node's wallet address.
However, for security reasons, **it's recommended to set this to a different cold wallet that you control, such as a MetaMask address or a hardware wallet.**

This way, if your node wallet is compromised, the attacker doesn't get access to your staked ETH and RPL by forcing you to exit because all of those funds will be sent to your separate cold wallet (which they hopefully do not have).

Withdrawal addresses are set at a node operator level. If you create multiple minipools they will all refer to the same withdrawal address. So you only need to perform this setup once.
:::

There are two different ways to do this.
Please read both options below to determine which one applies to you.

::::: tabs
:::: tab Method 1
**Use this method if your new withdrawal address can be used to sign transactions via MetaMask or WalletConnect.**

::: warning NOTE
This method will require you to **submit a transaction** from your new withdrawal address, so **you must have a small amount of ETH in that address already.**
:::

::: warning NOTE
For users of **Ledger** hardware wallets, note that Ledger Live does not yet support MetaMask or WalletConnect natively.
You will need to use MetaMask and connect it to your Ledger instead.
Follow [the official Ledger instructions](https://www.ledger.com/academy/security/the-safest-way-to-use-metamask) to do this.

To work with the Rocket Pool website, you will need to have your Ledger connected, unlocked, and the ETH app open.
You will also need to **enable "blind signing"** for the current session; you can find this within the Settings portion of the ETH app on the device.
Bind signing will automatically be disabled after you close the session.

If you are using Prater Testnet and want to use your Ledger as your withdrawal address, **you must create a new Ethereum wallet on your Ledger** first to ensure you don't connect your live address to the test network, which tends to cause confusion.
Make sure to select the **Goerli Testnet** in the network selection dropdown when connecting your Ledger to MetaMask.
Note that Ledger Live will not show your balance on the test network, but other applications which support the test network (such as MetaMask and Etherscan) will be able to display it.
:::

1. Run `rocketpool node set-withdrawal-address <your cold wallet address>`. Your new withdrawal address will be marked as "pending". Until you confirm it, **your old withdrawal address will still be used**.
2. To confirm it, you must send a special transaction **from your new withdrawal address** to the minipool contract to verify that you own the withdrawal address.
   1. The easiest way to do this is to navigate to the Rocket Pool withdrawal address site (for the [Prater Testnet](https://testnet.rocketpool.net/withdrawal/) or for [Mainnet](https://stake.rocketpool.net/withdrawal/)).
   2. If you haven't already connected Metamask or WalletConnect to the Rocket Pool website, do this now. Click the **select wallet** button in the center of the screen, and choose MetaMask or WalletConnect based on which wallet you would like to use. You will then be prompted asking you to confirm the connection. For example, using MetaMask:
   <center>
   ![](./images/connect-metamask.png)
   </center>
   Click **Next**, then click **Confirm** to enable the Rocket Pool website to use your wallet.
   3. Select **Withdrawal Address** from the top menu (or the hamburger menu on the left side if you're on a mobile device).
   4. You will see this prompt:
   <center>
   ![](./images/node-address.png)
   </center>
   Type your **node wallet address** here and click on the **Check Mark button** to continue.
   5. You will be prompted with a question asking if you want to set a new node withdrawal address or confirm a pending one. Select **Confirm**.
   6. Now, there should be a new confirmation dialog in your wallet. Again, using MetaMask as an example, click the MetaMask icon to open it and you should see something like this:
   <center>
   ![](./images/confirm-address.png)
   </center>
   Click **Confirm** to send the transaction to the network. This will take some time until it gets mined, but once it does, you will see a confirmation dialog:
   <center>
   ![](./images/confirmed.png)
   </center>
3. Your new withdrawal address will now be confirmed and activated. You can view this with `rocketpool node status`.
::::

:::: tab Method 2

**Use this method only if your withdrawal address *cannot* be used to sign transactions via MetaMask or WalletConnect.**

In this method, you will run:

```
rocketpool node set-withdrawal-address --force <your cold wallet address>
```

You will be offered the chance to send a test transaction before confirming this, to ensure that you have the right address.
If you confirm this command when it prompts you, your new withdrawal address will be set immediately.

::: danger
By doing this, you bypass the safety measure associated with Method 1, which requires you to prove that you own the new address.
If you make a typo here, there is no way to undo it and **your minipool's rewards will be lost forever**.

We **strongly** encourage you to use the test transaction mechanism before confirming this, and if possible, use Method 1 instead.
:::
::::
:::::

Once this is done, you will **no longer be able to change your withdrawal address using the `set-withdrawal-address` command**.
To change it, you will need to send a signed transaction from your **active** withdrawal address (the one you just switched to).
The Rocket Pool website has a function to help you do this.


## Setting your Voting Delegate Address

Rocket Pool's governance process uses [Snapshot](https://snapshot.org/#/about) as the platform for hosting governance proposals.
Voting on them is done in-browser, via a wallet like MetaMask or a bridge like WalletConnect.
Node operators can vote on these proposals using the RPL they have staked (their **effective stake**).

Since your node's wallet should **never leave your node** (e.g. you should **never import your mnemonic into MetaMask or another wallet**), we have set up a system that allows you to **delegate** your node's voting power to a separate address.
This could be another wallet (such as a MetaMask account) that you control, or you could delegate your voting power to [one of the Node Operators that have elected to be official delegates](https://delegates.rocketpool.net/).

::: tip NOTE
If you are an **Allnodes user**, you can use your node account as the voting address and can ignore the following guides.
They are intended for normal Smartnode operators.
:::

Setting up a voting delegate address that can vote on behalf of your node is a one-time action.
Simply run the following command:

```
$ rocketpool node set-voting-delegate <address>
```

The address you use depends on whether you are voting yourself or you are delegating your vote to an official delegate.
If you are voting yourself, use the address of the wallet you want to use in-browser (e.g. your MetaMask account, your hardware wallet, your Argent wallet, etc.).

:::: danger WARNING
As a reminder, **DO NOT enter your node's wallet or mnemonic into MetaMask or any other wallet!**
The voting delegate feature is specifically designed to ensure you have no need to do this, which helps maintain the security of your node!
::::

At anytime, you can reassign your voting power by setting the voting address from your node.

One limitation of Snapshot is that **you must have delegated before the proposal you would like to vote on is created**.
We suggest that you set up your voting address or delegate early so that you don’t miss any proposal votes.

To learn more about how to participate in RocketPool governance, [please check out this medium article](https://medium.com/rocket-pool/rocket-pool-protocol-dao-governance-phase-0-4b8ec7bfe07e)


## Understanding the Redstone Rewards System

One of the most significant changes introduced with the Redstone update is the **new rewards system**.
This is a complete overhaul of the way node operators receive their RPL rewards (and ETH from the Smoothing Pool - discussed later).

The *old* rewards system had the following drawbacks:

- Claiming cost approximately 400k gas, which is quite expensive.
- Node operators had to claim the rewards at each interval (every 28 days), or would forfeit them. This meant the gas costs could become prohibitively expensive for node operators with small amounts of RPL.
- Rewards were determined at the time of the *claim*, not at the time of the checkpoint. If a user staked a significant amount of RPL between the checkpoint and your claim, your rewards could be diluted and you'd receive less RPL than you were expecting.

The *new* claims system solves all of these problems.

At every interval, the Oracle DAO will collectively create a **true snapshot** of the state of the node operators in the Rocket Pool network, including all of their effective stake amounts.
This information is compiled into a [Merkle Tree](https://en.wikipedia.org/wiki/Merkle_tree) - an extremely efficient way to make all of the details available to smart contracts.
The Merkle Tree is built into a JSON file and hosted on the [InterPlanetary File System (IPFS)](https://en.wikipedia.org/wiki/InterPlanetary_File_System), and the root of the Merkle Tree is submitted to the contracts.

This new system has the following features:

- You can now **let rewards accumulate** for as long as you want. No more time limit on when you need to claim.
- You can claim **multiple intervals** all at once.
- Your first claim transaction uses about 85k gas. Each subsequent claim transaction costs about 55k gas.
  - If you're claiming multiple intervals at once, each supplemental interval costs **6k gas** so it's most cost-effective to claim as many of them at once as possible.
- Your RPL rewards **no longer get diluted** - your RPL rewards are fixed at the time of the snapshot, and you are always eligible for that amount.
- You can **restake some (or all) of your RPL rewards** as part of the claiming transaction, which further trims down gas requirements compared to today.
- Currently, **all of your claims must be on Mainnet** but we have the infrastructure in place to build the ability to claim on Layer 2 networks at a later date.

When your node detects a new rewards checkpoint, it will automatically download the JSON file for that interval unless you opt into manual tree generation (see below).
You can then review your rewards using the following command:

```
rocketpool node claim-rewards
```

As intervals go by and you accumulate rewards, the output will look like this:

<center>

![](../node/images/claim-rewards-gb.png)

</center>

Here you can quickly see how many rewards you've earned at each interval, and can decide which ones you want to claim.
Note that **Ropsten's interval time is set to 1 day to facilitate testing.**

You can also specify an amount you want to restake during this claim:

<center>

![](../node/images/autostake.png)

</center>

This will let you compound your RPL rewards in one transaction, using substantially less gas than you currently need to use today.

::: tip NOTE
If you prefer to build the rewards checkpoint manually instead of downloading the one created by the Oracle DAO, you can change this setting from `Download` to `Generate` in the TUI:

<center>

![](../node/images/tui-generate-tree.png)

</center>

As the tip implies, you will need access to an archive node to do this.
If your local Execution client is not an archive node, you can specify a separate one (such as Infura or Alchemy) in the `Archive-Mode EC URL` box below it.
This URL will only be used when generating Merkle trees; it will not be used for validation duties.
::: 

To read more details about the new rewards system, please visit [this medium article](https://medium.com/rocket-pool/the-merge-0x02-mev-and-the-future-of-the-protocol-c7451337ec40)

::: danger WARNING
If you are below 10% RPL collateral *at the time of the snapshot*, you will not be eligible for rewards for that snapshot.
Unlike the current system, where you can simply "top off" before you claim in order to become eligible again, this will be locked in that snapshot forever and **you will never receive rewards for that period**.
You **must** be above 10% collateral at the time of a snapshot in order to receive rewards for that period.
:::


### Fee Recipients and Your Distributor

As validators are now responsible for creating blocks, that means they receive the **priority fees** (also known as **tips**) attached to each transaction.
These fees are paid in ETH, and they are provided directly to you every time one of your minipool validators proposes a block.
Unlike the ETH locked on the Beacon Chain, **you don't have to wait for withdrawals to access your priority fees**!
They are simply awarded to you as part of the block proposal process.

In order to know where to send the fees to, your Validator Client requires an extra parameter known as the `fee recipient`.
This is the address on the Execution Layer (ETH1) that all of the priority fees earned by your node during block proposals will be sent to. 

Rocket Pool is designed to fairly distribute these rewards, the same way it fairly distributes your Beacon chain rewards: half of any priority fees your minipool validators earn will go to you (plus the average commission of all of your minipools), and the other half will go to the pool stakers (minus your average commission).

To that end, the Smartnode will automatically set your Validator Client's `fee recipient` to a special address known as your node's **fee distributor**.
Your fee distributor is a unique contract on the Execution Layer that's **specific to your node**.
It will hold all of the priority fees you've earned over time, and it contains the logic required to fairly split and distribute them.
This distribution process is controlled by you (the node operator), and can be done whenever you please.
It does not have a time limit.

The address for your node's fee distributor is **deterministically based on your node address**.
That means it is known ahead of time, before the fee distributor is even created.
**The Smartnode will use this address as your fee recipient.**

::: tip NOTE
By default, your fee recipient will be set to the **rETH address** when you install Smartnode v1.5.0 (if the Redstone contract updates haven't been deployed yet).
The Smartnode will automatically update this to your node's fee distributor address once the Redstone update has been deployed.

One exception to this rule is if you are opted into the **Smoothing Pool** - see the section at the end of this page for more information on it.
:::

New Rocket Pool nodes will automatically initialize their node's distributor contract upon registration.
Existing nodes will need to do this process manually.
This only needs to be run once.

One interesting ramification of this is that your distributor's address may start accruing a balance **before** you've initialized your node distributor contract.
This is okay, because your distributor will gain access to all of this existing balance as soon as you initialize it.

You can view your fee distributor's balance as part of:

```
rocketpool node status
```

The output will look like this:

<center>

![](../node/images/status-fee-distributor.png)

</center>

To initialize your node's distributor, simply run this new command:

```
rocketpool node initialize-fee-distributor
```

::: warning NOTE
After the Redstone update, you must call this function before you can create any new minipools with `rocketpool node deposit`.
:::

When your distributor has been initialized, you can claim and distribute its entire balance using the following command:

```
rocketpool node distribute-fees
```

This will send your share of the rewards to your **withdrawal address**.


### Smoothing Pool

The Smoothing Pool is **an opt-in feature** that will collectively pool the priority fees of every member opted into it.
During a rewards checkpoint, the total ETH balance of the pool is divided into a pool staker portion and a node operator portion.
All of the rewards in the node operator portion are **distributed fairly to every member of the pool**.

In essence, the Smoothing Pool is a way to effectively eliminate the randomness associated with block proposals on the Beacon Chain.
If you've ever had a streak of bad luck and gone months without a proposal, you may find the Smoothing Pool quite exciting.

::: tip NOTE
The Smoothing Pool rewards are built into the Merkle Tree used for RPL rewards, so you claim them at the same time you claim RPL using `rocketpool node claim-rewards`.
:::

To help clarify the details, the Smoothing Pool uses the following rules:

- Opting into the Smoothing Pool is done on a **node level**. If you opt in, all of your minipools are opted in.

- The node operator's total share is determined by the average commission of every minipool in every node opted into the Smoothing Pool.

- Anyone can opt in at any time. They must wait a full rewards interval (1 day on Ropsten, 28 days on Mainnet) before opting out to prevent gaming the system.
  - Once opted out, you must wait another full interval to opt back in.

- The Smoothing Pool calculates the "share" of each minipool (portion of the pool's ETH for the interval) owned by each node opted in.
  - The share is a function of your minipool's performance during the interval (calculated by looking at how many attestations you sent on the Beacon Chain, and how many you missed), and your minipool's commission rate.

- Your node's total share is the sum of your minipool shares.

- Your node's total share is scaled by the amount of time you were opted in.
  - If you were opted in for the full interval, you receive your full share.
  - If you were opted in for 30% of an interval, you receive 30% of your full share.

To opt into the Smoothing Pool, run the following command:

```
rocketpool node join-smoothing-pool
```

This will record you as opted-in in the Rocket Pool contracts and automatically change your Validator Client's `fee recipient` from your node's distributor contract to the Smoothing Pool contract.

To leave the pool, run this command:

```
rocketpool node leave-smoothing-pool
```


## Swapping RPL v1 for RPL v2

In many cases, the RPL that you start with is going to be the legacy RPL token that is no longer used.
Luckily, the CLI offers a function that allows you to easily swap it for the modern RPL token used by the network today.

**Swapping will be done at a 1-to-1 ratio**; if you have 1000 of the RPL v1 token, you can swap it for 1000 of the RPL v2 token.
All you will need to do is pay a small amount of gas for the transaction.

**This swap can be done at any time.**

To do this, run the following command:

```
rocketpool node swap-rpl
```

This will ask you if you want to swap all of the RPL v1 in your node wallet for RPL v2 or specify a custom amount.
When you've made your choice, confirm the transaction and wait for it to be processed and added to the blockchain.

Once the transaction is accepted, you can confirm that it worked with `rocketpool node status`:

```
The node <node address> has a balance of 131.973495 ETH and 1440.000000 RPL.

The node is registered with Rocket Pool with a timezone location of Etc/UTC.

The node has a total stake of 0.000000 RPL and an effective stake of 0.000000 RPL, allowing it to run 0 minipool(s) in total.
The node does not have any minipools yet.
```

You should see your new RPL v2 balance on the top line where it describes how much RPL you currently have.

With that, your node is prepared!
It's time to make a minipool and start staking your ETH.
Click on the next section to learn about that process next.
