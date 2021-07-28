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

There are two main faucets available to help you test Rocket Pool.

::: warning NOTE
You will need to provide an Ethereum address in order to receive test ETH.

If you are just trying to stake your ETH normally and receive rETH, please review the [Staking Guide](../staking/overview.md) before getting Goerli ETH.
You will be prompted to return here at the appropriate step.

If you are planning to run a node, please go through the [Node Operator Guide](../node/responsibilities.md) to set up a node and create a new wallet first.
You will be prompted to return here at the appropriate step.
:::

### The EthStaker Discord Server

EthStaker is a community aimed at helping people learn how to stake ETH, run validators, stay informed of the latest developments and news, and promote the overall health and diversity of the Beacon Chain.
They have generously collaborated with Rocket Pool to make a faucet available for testers that have a Discord account.

Click on [this link](https://discord.gg/GGGmqZdCBf) to join the EthStaker server on Discord.
Once there, head to the `request-goerli-eth` channel.
[TODO] *Complete this once they've enabled the faucet again*


### Mudit Gupta's Blog

The second way to get test ETH is via [the service that Mudit Gupta hosts on his blog](https://faucet.goerli.mudit.blog/).

For this, you'll need a Twitter or Facebook account.
Follow the directions on that page, which involve posting your Goerli wallet address and pasting a link to that message onto the service's site.
You should receive some Goerli ETH into the wallet you posted shortly after doing this.


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
rocketpool faucet withdraw
```

After a short wait, you'll see the following output:

```
Successfully withdrew 600.000000 RPL from the faucet.
```

This will provide you with 600 of the **legacy (v1) RPL** token, which is analogous to the original RPL token on mainnet.
Rocket Pool uses a **new (v2) RPL** token which supports the inflation used to reward node operators.

To learn how to swap legacy RPL for new RPL, follow the steps in the [Creating a Minipool (ETH2 Validator)](../node/create-validator.md) guide.
