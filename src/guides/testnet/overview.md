# Practicing with the Test Network

An Ethereum **test network** (`testnet` for short) is an Ethereum blockchain, functionally identical to the standard Ethereum blockchain, but it's intended to be used for testing smart contracts before they go live onto the main "real" blockchain (called `mainnet`).
Testnets run in parallel with mainnet - there are actually several of them running right now!

You can read more about some of the ETH1 testnets [here](https://support.mycrypto.com/how-to/getting-started/where-to-get-testnet-ether) if you like.
Rocket Pool uses **Goerli** for its ETH1 testnet.
You can use a block explorer for it here if you'd like to take a look at it: [https://goerli.etherscan.io/](https://goerli.etherscan.io/)

The same concept applies to the ETH2 chain as well.
Rocket Pool uses **Prater** for its ETH2 testnet.
You can find a block explorer for it here: [https://prater.beaconcha.in/](https://prater.beaconcha.in/)

Because the networks are intended for testing, **ETH on them is given out for free to help people test**.
This ETH **cannot be transferred** to mainnet; it must stay on Goerli and has no real value, so you can think of it as **Monopoly money**.

::: danger
**DO NOT use your real ETH from mainnet at any point if you are trying out Rocket Pool's test network!**
You will **lose your funds** forever if you do this!
You should only use test ETH that you received on the Goerli network from a faucet (described below)!
:::

## Configuring the Testnet

[The default configuration of Rocket Pool using Docker](../node/install-modes.md) handles all of the settings involved in using a testnet for you automatically.
There's nothing special you need to do.

If you're using [a different setup](../node/install-modes.md) with an external ETH1 or ETH2 client, or are running your clients [natively without Docker](../node/install-modes.md), then you will need to set this up manually:

- For **Geth**: add `--goerli` to the launch command.
- For **Lighthouse**: add `--network prater` to the launch command.
- For **Nimbus**: add `--network=prater` to the launch command.
- For **Prysm**: add `--prater` to the launch command.
- For **Teku**: add `--network=prater` to the launch command.

Check the next section to learn how to get some test ETH on Goerli, which you'll need to test Rocket Pool out.

## Getting Test ETH on Goerli

To use the Rocket Pool test network, you'll need ETH on Goerli.
Luckily, you can get this for free using a **faucet** - an automated service that will provide you with Goerli ETH to test with.

::: warning NOTE
You will need to provide an Ethereum address in order to receive test ETH.

If you are just trying to stake your ETH normally and receive rETH, please review the [Staking Guide](../staking/overview.md) before getting Goerli ETH.
You will be prompted to return here at the appropriate step.

If you are planning to run a node, please go through the [Node Operator Guide](../node/responsibilities.md) to set up a node and create a new wallet first.
You will be prompted to return here at the appropriate step.
:::

Rocket Pool provides a faucet in its [Discord server](https://discord.gg/rocketpool).
Join the server and head to the `#support` channel.

Here, you can ask the support team for testnet ETH.
You will need to provide the users there with your node address, and they will provide you with ETH.

::: warning NOTE
The testnet faucet bot is no longer directly accessible to the public due to previous abuse.
It is only available to people in the support team with explicit access permission.
Simply state your intentions, and someone with faucet permissions will assist you.
:::

If you aren't planning to register a node and just want some ETH to test staking to receive rETH, or if you are planning to register a node but haven't yet, type the following command in the channel:

```
!goerliEth <your goerli address>
```

without the angle brackets.
If your wallet doesn't have any ETH already, the bot will send your wallet 1 ETH to test with.

If you _are_ planning to run a node, do the following:

1. Start by running the `!goerliEth` command above to acquire enough gas to register your node
2. Register your node (see the [Preparing your Node](../node/prepare-node.md) page for instructions)
3. Run the following command to get 16 Goerli ETH so you can create a validator:

```
!nodeOperator <your goerli address>
```

In order to use `!nodeOperator`, the address you provide it _must_ be a registered Rocket Pool node.
Therefore, you must follow these 3 steps in that order.

::: warning NOTE
To prevent abuse, there is a cooldown timer on sending messages in the faucet channel.
Therefore, there will be a delay between when you can run the `!goerliEth` and `!nodeOperator` commands.
If you want to bypass this, you can always ask for help - someone who has a cooldown available will likely be able to run the command for you.
:::

## Getting Test RPL on Goerli

If you're testing out node operation, you'll need some test RPL in addition to test ETH.
To get this, you'll need to use the Smartnode stack's command line interface (CLI) tool.
You'll want to set up the Smartnode stack following the [Node Operator's guide](../node/responsibilities.md) before collecting RPL from the faucet.

Once your Smartnode CLI is installed and you have a wallet assigned to your node, you can access the built-in RPL faucet.
Use the following command to check on its status:

```
rocketpool faucet status
```

The output will look like this:

```
The faucet has a balance of 1999400.000000 RPL.
You can withdraw 600.000000 RPL (requires a 0.500000 GoETH fee)!
Allowances reset in 26585 blocks.
```

The faucet is on a timer, so each node operator can only use the faucet once every 4 or 5 days.

- The **faucet balance** indicates how much RPL is still available.
- The **withdraw amount** shows how much RPL you can receive from the faucet during the current cycle.
  If you already used the faucet, this line will change to let you know that you can't use it again this cycle.
- The **reset** timer shows how long (in blocks) it is until the next cycle, at which point you can use the faucet again.
  The amount of time remaining (in seconds) is approximately `this number * 13 seconds per block / 60 seconds`.

::: warning NOTE
The RPL faucet charges a 0.5 goerli ETH fee to use it, in order to prevent people from abusing the system.
You'll need to have at least this amount in your node wallet already in order to use it!
:::

When you're ready to receive RPL from the faucet, use the following command:

```
rocketpool faucet withdraw-rpl
```

After a short wait, you'll see the following output:

```
Successfully withdrew 600.000000 RPL from the faucet.
```

This will provide you with 600 of the **legacy (v1) RPL** token, which is analogous to the original RPL token on mainnet.
Rocket Pool uses a **new (v2) RPL** token which supports the inflation used to reward node operators.

## Swapping legacy v1 RPL to v2 RPL

Next, you need to swap the legacy v1 RPL to v2.

```bash
rocketpool node swap-rpl
```

When prompted you cas choose to swap all or some. About 300 v2 RPL should be enough to start a minipool.
Your interaction should look something like this:

```bash
Would you like to swap your entire old RPL balance (600.000000 RPL)? [y/n]
n

Please enter an amount of old RPL to swap:
300

Before swapping legacy RPL for new RPL, you must first give the new RPL contract approval to interact with your legacy RPL.
This only needs to be done once for your node.
+============== Suggested Gas Prices ==============+
| Avg Wait Time |  Max Fee  |    Total Gas Cost    |
| 15 Seconds    | 28 gwei   | 0.0007 to 0.0011 ETH |
| 1 Minute      | 20 gwei   | 0.0005 to 0.0008 ETH |
| 3 Minutes     | 16 gwei   | 0.0004 to 0.0006 ETH |
| >10 Minutes   | 14 gwei   | 0.0003 to 0.0005 ETH |
+==================================================+

These prices include a maximum priority fee of 2.00 gwei.
Please enter your max fee (including the priority fee) or leave blank for the default of 20 gwei:


Using a max fee of 20.00 gwei and a priority fee of 2.00 gwei.
Do you want to let the new RPL contract interact with your legacy RPL? [y/n]
y

Approving legacy RPL for swapping...
Transaction has been submitted with hash 0x18b846e0035fb6f660a30ba83e08ab306695940e638f8a7e9175f33f6383a94e.
You may follow its progress by visiting:
https://goerli.etherscan.io/tx/0x18b846e0035fb6f660a30ba83e08ab306695940e638f8a7e9175f33f6383a94e

Waiting for the transaction to be included in a block... you may wait here for it, or press CTRL+C to exit and return to the terminal.

Successfully approved access to legacy RPL.
RPL Swap Gas Info:
+============== Suggested Gas Prices ==============+
| Avg Wait Time |  Max Fee  |    Total Gas Cost    |
| 15 Seconds    | 28 gwei   | 0.0022 to 0.0033 ETH |
| 1 Minute      | 20 gwei   | 0.0015 to 0.0022 ETH |
| 3 Minutes     | 17 gwei   | 0.0012 to 0.0018 ETH |
| >10 Minutes   | 15 gwei   | 0.0010 to 0.0016 ETH |
+==================================================+

These prices include a maximum priority fee of 2.00 gwei.
Please enter your max fee (including the priority fee) or leave blank for the default of 20 gwei:


Using a max fee of 20.00 gwei and a priority fee of 2.00 gwei.
Are you sure you want to swap 300.000000 old RPL for new RPL? [y/n]
y

Swapping old RPL for new RPL...
Transaction has been submitted with hash 0xf8a2910ad940c9283a513c1904a203ce3137a29f92ac52d9cf9a9536a6646dac.
You may follow its progress by visiting:
https://goerli.etherscan.io/tx/0xf8a2910ad940c9283a513c1904a203ce3137a29f92ac52d9cf9a9536a6646dac

Waiting for the transaction to be included in a block... you may wait here for it, or press CTRL+C to exit and return to the terminal.

Successfully swapped 300.000000 old RPL for new RPL.

```

Now check status:

```bash
rocketpool node status
```

You should see something like this

```bash
Your Smartnode is currently using the Prater Test Network.

=== Account and Balances ===
The node 0x8046c795489c6068883BE04E723a011E5ca556A4 has a balance of 16.576736 ETH and 300.000000 RPL.
The node has a balance of 300.000000 old RPL which can be swapped for new RPL.
The node is registered with Rocket Pool with a timezone location of US/Central.

=== Penalty Status ===
The node does not have any penalties for cheating with an invalid fee recipient.

=== DAO Voting ===
The node does not currently have a voting delegate set, and will not be able to vote on Rocket Pool governance proposals.
Rocket Pool has no governance proposals being voted on.

=== Withdrawal Address ===
The node's withdrawal address has not been changed, so rewards and withdrawals will be sent to the node itself.
Consider changing this to a cold wallet address that you control using the `set-withdrawal-address` command.

=== Fee Distributor and Smoothing Pool ===
The node is not opted into the Smoothing Pool.
To learn more about the Smoothing Pool, please visit https://docs.rocketpool.net/guides/redstone/whats-new.html#smoothing-pool.
The node's fee distributor 0x6d72CeF856ED1add2291cb397B7ed6775018Fd52 has a balance of 0.000000 ETH.

=== RPL Stake and Minipools ===
The node has a total stake of 0.000000 RPL and an effective stake of 0.000000 RPL, allowing it to run 0 minipool(s) in total.
The node does not have any minipools yet.

```

Now you are ready to proceed with [Creating a Minipool (ETH2 Validator)](../node/create-validator.md) guide.
