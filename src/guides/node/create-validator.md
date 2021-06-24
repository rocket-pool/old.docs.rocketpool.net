# :mag: [WIP] Creating a Minipool (ETH2 Validator)

If you're here, then you've succesfully started the Smartnode services, created a wallet, and finished syncing both the ETH1 and ETH2 chains on your respective clients. 
If so, then you are ready to register your node on the Rocket Pool network and create a minipool with an ETH2 validator!
If not, please review the previous sections and return here once you've completed those steps.


## Preparing for Minipool Creation

Before creating a new minipool and ETH2 validator, there are a few steps to take to finish preparing your node.
These only need to be done once though; once you've done them, you can skip to the [Creating a New Minipool](#creating-a-new-minipool) section if you want to create multiple minipools on your node.


### Loading your Node Wallet

Registering your node and standing up a validator both involve submitting transactions to the Ethereum network from your node wallet.
This means **you'll need to have some ETH on it** to pay for the gas costs of those transactions.
You'll also want to provide it with the **RPL token**, because you'll need to stake some of that prior to creating a minipool as collateral.

:::: tabs
::: tab Running on the Prater Test Network
If you're running on the Prater test network, please see the [Getting Test Ether from a Faucet](../testnet/faucet.md) section to learn how to acquire test ETH.

For test RPL, we have added a similar faucet function directly to the CLI.
You can use the command `rocketpool faucet withdraw-rpl` to acquire some RPL on the test network.
:::
::: tab Running on the Main Network
We assume that you already have a separate Ethereum-compatible wallet that is holding your ETH and RPL tokens.
Start by transferring some ETH and RPL from your existing wallet to the node wallet.
As a reminder, you can use `rocketpool wallet status` to get the address of the node wallet if you need it.
If you are not sure how to send cryptocurrency from your existing wallet, please consult your wallet's documentation.

::: danger
Sending cryptocurrency across wallets is a non-reversible operation!
If you enter the wrong recipient address, **there is no way to retrieve your tokens**.
We recommend you send a small amount of ETH first as a **test transaction** to verify that you correctly entered the node wallet's address, and then **whitelist** that address in your other wallet if possible to avoid mistyping it.
:::
::::


### Registering your Node with the Network

Once you have ETH and RPL in your wallet, you can register your node with the Rocket Pool network to access all of its features.
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


### Setting your Withdrawal Address

TODO


### Swapping RPL v1 for RPL v2

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


## Creating a New Minipool

As a reminder, a `minipool` in Rocket Pool terms refers to a unique smart contract instance on the eth1.0 chain that your node manages.
The minipool handles 16 of your ETH, 16 ETH from the rETH staking pool, and merges them together so that it can send 32 ETH to the Beacon Chain deposit contract to create a new eth2.0 validator.
Thus, in order to create a validator using Rocket Pool, you need to **create a minipool**.

::: warning
Creating a minipool means depositing 16 of your own ETH to the Beacon Chain.
These funds **cannot be retrieved** until after the eth1.0 chain has merged with the eth2.0 chain, and withdrawals have been implemented.
By creating the minipool, you are acknowledging that you are effectively locking these funds until that system is in place.
:::


### Staking RPL

TODO


### Depositing ETH

This is done with the following command:

```
rocketpool node deposit
```

TODO
