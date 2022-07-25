# Migrating the Smartnode from Previous Beta Tests

If you've been a Rocket Pool node operator during our previous beta tests on Medalla or Pyrmont, thank you for helping us improve the protocol and welcome back!
This brief guide will walk you through the process of purging your own beta build and setting up the newest build for either the Prater testnet, or for real staking on mainnet.

::::: tabs
:::: tab Upgrading to the Prater Testnet

::: warning NOTE
You will need to create a new node wallet to interact with the Prater test network.
Re-using a wallet from a previous beta build may result in failures while creating new validators!
:::

There are three major steps towards upgrading from a beta build to the Prater test network.

First, migrate any goerli ETH you have to a separate wallet.
You can then migrate it back to the new node wallet you create after you reinstall Rocket Pool, so you don't need to rely as much on a faucet for goerli ETH. 

The easiest way to do this is via Metamask - see the [rETH staking guide](../staking/staking.md) for a walkthrough of how to set up a new wallet.
You can do this using the following command:

```
rocketpool node send XXX eth 0xabcd1234...
```

where `XXX` is the amount of goerli ETH to send, and `0xabcd1234...` is the address of the new wallet you created.
**Note that you'll need to leave a little bit of ETH behind to pay for the gas used in the transaction!**

Next, remove all of the old Docker images and chain data with the following command:
```
rocketpool service terminate
```

Once this is done, remove the old Rocket Pool data and settings folder.
**This will delete your old wallet and your old validators, so make sure you no longer need to save them for anything!**

```
sudo rm -rf ~/.rocketpool
```

Once this is done, your old beta setup will be cleaned.
You can follow the [Rocket Pool installation guide](../node/eth-clients.md) for a walkthrough on installing and configuring Rocket Pool for the Prater testnet.

::::
:::: tab Upgrading to Mainnet

*Coming soon!*

::::
:::::