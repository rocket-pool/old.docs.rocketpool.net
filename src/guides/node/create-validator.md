# :mag: [NYI] Creating a Minipool and ETH2 Validator

At this point, you should have the complete Rocket Pool infrastructure running, including the Smartnode stack, an ETH1 client, and an ETH2 client.
You should also have hardened your operating system from outside attackers.
If you've completed both of these steps, you're ready to create a Rocket Pool node and begin staking.
If not, please review the previous sections and return here once you've completed those steps.


## Starting and Stopping the Rocket Pool Services




## Setting up a Wallet

The first thing you'll need to do in order to create your node is to set up an ETH1 wallet.
This is simply an ETH1 address that will hold your wallet's funds - it will use this to send ETH to your minipool when you begin staking, pay for gas during various transactions, and other various operations.

---
:warning: **NOTE: As of the current build, Rocket Pool needs to have access to your wallet's private key in order to perform its automatic duties.
This means that the private key will exist in a file on your machine.
If an attacker manages to gain access to your machine, they could gain access to your node wallet and steal all of the tokens that it contains!
Please ensure that you have followed the security guide in the [Securing your Node](./securing-your-node) section before you continue, and are comfortable with your security posture.**

---


### Creating a New Wallet

The most common way to run a node is to create a new ETH1 address that is dedicated to the node.
The Smartnode CLI provides a way to do this easily:




# TODO

How to use the CLI to create a minipool.
Cover the whole process:
- Creating a node wallet 
- Register the node
- Stake RPL
- `node deposit`