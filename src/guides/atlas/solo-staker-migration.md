# Converting a Solo Validator into a Minipool

::: warning NOTE
This page describes features that are currently in BETA and only apply to certain test networks.
Nothing here is live on Mainnet yet.
:::

When the Beacon Chain was first launched, validators were created with a special pair of cryptographic keys - the **validator key** and the **withdrawal key**.

The validator key is a "hot key", which means it needs to be stored on an active machine connected to the Internet; this is the key used to sign your attestations and proposals, and also serves as your "address" on the Beacon Chain (the hex string used to identify your validator).

The withdrawal key, on the other hand, is a "cold key" which means it does *not* (and in fact, *should not*) be stored on an active machine connected to the Internet.
It is intended to be locked away in cold storage so it cannot be accessed until it is needed.
Unlike the validator key, the withdrawal key isn't responsible for validation duties at all.
Instead, its only job is to manage the withdrawing of your validator's funds on the Beacon Chain (once withdrawals had been implemented).

This dual-key system was the initial architecture the Beacon Chain launched with.
At the time, neither the Merge nor withdrawals had been designed yet but this system was considered robust enough to handle whatever form the protocol took when both of them were implemented.

Fast forward to today, and now we have a much better understanding of how withdrawals work.
Luckily, they have been implemented in a way that makes it possible for an existing solo staking validator on the Beacon Chain (that is using the old withdrawal key credentials) to convert **directly into a Rocket Pool minipool** without needing to exit the validator from the Beacon Chain!

If you are interested in learning more about this process, then this guide is for you.
We'll cover how withdrawals work on Ethereum at a high-level, explain how the conversion process works, and end with a detailed walkthrough of how to convert your validator into a minipool.


## Why Would I Convert?

Before getting into the technical details, a very important question to answer is *why* a solo staker would consider this process in the first place.
Conversion into a minipool is not for everyone, but this section will help you make an informed choice about whether or not it's something you'd like to pursue.

Rocket Pool minipools enjoy several advantages over conventional solo staking validators:
- They **earn commission** on the portion of ETH they borrow from the pool stakers (currently either 16 or 24 ETH).
- Your existing 32 ETH bond could be used to create up to **three additional validators** (on top of the one you already have).
- They are eligible for participation in the [Smoothing Pool](../node/fee-distrib-sp.md#the-smoothing-pool) which pools all Execution layer rewards (e.g., from block proposals and [MEV rewards](../node/mev.md)) and fairly distributes them among participants during each rewards interval.
- They earn RPL inflation rewards (which currently provide a higher APR than ETH staking rewards).

That being said, there are some differences that are important to highlight:
- Staking with Rocket Pool requires you to buy and stake the **RPL token** as collateral.
- You will have to accept **smart contract risk**, as the protocol is implemented as a series of smart contracts.
- Similarly, conventional node operation leverages the **Smartnode stack**; you will have to accept any risks associated with installing and running that software on your node.
- Being a node operator does involve learning some new concepts, so there is a **learning curve** associated with becoming one.
- Minipools are required to split their rewards with the pool stakers, so the validator's withdrawal address will be a smart contract on the Execution layer, **not an EOA that you control**. This also applies to your **fee recipient** for Execution layer rewards, which must also be a smart contract that can fairly split your rewards.
- Rocket Pool's **Oracle DAO** is responsible for shuttling information from the Beacon Chain to the Execution layer, and for detecting violations that the protocol cannot enforce (such as an illegal fee recipient address). Running a minipool means you will have to trust the Oracle DAO to do that job correctly.

We encourage you to carefully go through these pros and cons before deciding to convert your solo validator.
If you would like to continue with the process, please read the next sections.


## Prerequisites

In order to begin the conversion process, you will need to meet the following criteria:

1. You must have [a node registered with the Rocket Pool network](../node/prepare-node.md) to host the new minipool.
1. The node must have enough RPL staked to support the new minipool (minimum of 1.6 ETH worth of RPL for converting to 16 ETH minipool, minimum of 2.4 ETH worth of RPL if converting to an 8 ETH minipool).
1. The validator you want to migrate must be **active** on the Beacon chain. It cannot be pending, slashed, exiting / exited, or withdrawn.
1. The validator must have a balance of **at least 32 ETH** on the Beacon chain.
1. The validator must have [BLS key withdrawal credentials](insert launchpad withdrawal guide link here) (`0x00` credentials). Conversion **cannot** be done on validators that have already migrated to other Execution layer withdrawal credentials (`0x01` credentials).

If none of these conditions are blockers for you, then you are eligible to begin validator conversion.


## Process Overview

The first step is to **create a new "vacant" minipool**.
Unlike conventional minipools, which make a new validator during their creation, vacant minipools are special minipools designed to manage *existing* validators.
As a consequence, vacant minipools behave slightly differently than conventional minipools during the `prelaunch` stage.
Once initialization is finished and they enter the `staking` stage, they become conventional minipools.

During vacant minipool creation, you will be given the option of having the Smartnode automatically **change your validator's withdrawal credentials** from the old BLS withdrawal key to the new vacant minipool address.
If you don't want to do this right now, you can have the Smartnode do it later with a dedicated command, or you can do it yourself with a third-party tool.
Note that changing the validator's withdrawal credentials to the minipool address is **required** for conversion, so regardless of how you do this, it will need to be done for the process to complete succesfully.

Once the withdrawal credentials have been changed, you will have the option of **importing the validator's private key** into the Validator Client managed by the Smartnode.
If you want the Smartnode to maintain the validator so you don't have to manage your own, this is an attractive option.
If you prefer to maintain your own Validator Client and keep the keys there, you are welcome to do so.

At this point your new minipool will enter the **scrub check** period, where the Oracle DAO will continuously analyze your validator's information on the Beacon Chain to confirm that it remains legal.
This includes:

- The withdrawal credentials either haven't been migrated yet (are still the original `0x00` BLS key credentials) or have been migrated to the minipool's address. Migrating them to any other Execution layer address will cause the pool to be scrubbed.
  - If the withdrawal credentials are still the original `0x00` BLS key credentials by the time the scrub check period ends, the pool will be scrubbed. 
- The validator is in the actively staking state for the duration of the check. If it transitions to the slashed, exited, or withdrawn states, the pool will be scrubbed.

::: tip NOTE
A **scrubbed** vacant minipool means that it is not a part of the Rocket Pool network, but it will still give you (the node operator) access to all of your funds via the typical token retrieval methods in the CLI.
Funds are **not lost** if vacant minipools are scrubbed.
More information on scrubbed minipools, their ramifications, and how to use them is included later in this guide. 
:::

After the scrub check passes, you will be able to **promote** your vacant minipool.
This will finish the conversion and change it from a vacant minipool into a regular one.
At this point the minipool will act like every other minipool on the network, and your solo validator will officially be converted into a Rocket Pool validator!

As part of the process, the network will snapshot your total rewards on the Beacon chain (and within your new minipool, if you get skimmed during the scrub check).
It will recognize that all of those rewards belong to you and shouldn't be shared with the staking pool, so it will provide them all as a **refund** you can claim at any time once promotion is complete.

Below is a detailed walkthrough of the conversion process, including instructions for each step.


## Step 1: Creating a Vacant Minipool

To begin the conversion process, run the following command with the Smartnode CLI:

```
rocketpool node create-vacant-minipool <validator pubkey>
```

For example, if you wanted to convert a solo validator with pubkey `0xb82ccba6093747559361a5495c7e2c607e76ea3543d556319355ce80289bb819fd787f715f60615cdd358c0476b40661`, you would run:

```
rocketpool node create-vacant-minipool 0xb82ccba6093747559361a5495c7e2c607e76ea3543d556319355ce80289bb819fd787f715f60615cdd358c0476b40661
```

You will see a brief summary about what to expect during the process, then be prompted for which bond amount you'd like to use when creating this minipool:

```
Please choose an amount of ETH you want to use as your deposit for the new minipool (this will become your share of the balance, and the remainder will become the pool stakers' share):

1. 8 ETH
2. 16 ETH
```

If you select **8 ETH**, you will convert your validator into an 8-ETH bonded minipool.
Your original 32 ETH deposit will be converted into an 8 ETH deposit, with 24 ETH borrowed from the pool stakers.
Once the conversion process is complete, you will have a [credit balance](./credit.md) of 24 ETH which you can use to create more minipools.
Choosing this option will require your node to have a minimum of **2.4 ETH worth of RPL staked**.

If you select **16 ETH**, you will convert your validator into a 16-ETH bonded minipool.
Your original 32 ETH deposit will be converted into an 16 ETH deposit, with 16 ETH borrowed from the pool stakers.
Once the conversion process is complete, you will have a [credit balance](./credit.md) of 16 ETH which you can use to create more minipools.
Choosing this option will require your node to have a minimum of **1.6 ETH worth of RPL staked**.

Once you select an option, the Smartnode will run a few checks to confirm that the validator you entered and your node both pass all of the prerequisite requirements listed above.
After that, it will ask you to confirm your gas price and then submit the transaction to create the new vacant minipool.
Upon creation, you will be presented with the minipool's address:

```
Your minipool was made successfully!
Your new minipool's address is: 0x8F3F149e4416a94e0ee909dE32f8A11C2F3e211C
```

This is the address you will use when changing your validator's withdrawal credentials.

At this point, the Smartnode will ask if you would like to have the Smartnode do this automatically (along with importing the validator's private key into the Validator Client managed by the Smartnode, which is discussed later):

```
You have the option of importing your validator's private key into the Smartnode's Validator Client instead of running your own Validator Client separately. In doing so, the Smartnode will also automatically migrate your validator's withdrawal credentials from your BLS private key to the minipool you just created.

Would you like to import your key and automatically migrate your withdrawal credentials? [y/n]
```

If you answer `y` to this question, the Smartnode will do Steps 2 and 3 automatically; please see the [Automatic Withdrawal Credential Change and Key Import](#automatic-withdrawal-credential-change-and-key-import) section below.

If you answer `n` to this question, the command will end and you will have finished Step 1.
Please go to the [Step 2](#step-2-changing-the-validators-withdrawal-credentials) section next.

::: tip NOTE
If you decline this process now, you can resume it at a later time using the CLI.
Read the [**Step 2**](#step-2-changing-the-validators-withdrawal-credentials) and [**Step 3**](#optional-step-3-import-the-validator-key) sections below to learn how to do this.
:::


### Automatic Withdrawal Credential Change and Key Import


::: danger WARNING
If you choose to have the Smartnode automatically change your withdrawal credentials and import your validator's private key, it is **essential** that you remove the validator key from your old Validator Client that you manage on your own, and **shut down the old Validator Client** to ensure it does not have the key loaded into memory still.

You must also wait **at least 15 minutes** after doing so to ensure that it has **intentionally missed at least two attestations**.
You can verify this by looking at a chain explorer such as [https://beaconcha.in](https://beaconcha.in).

If you do not wait for at least 15 minutes, your validator **WILL BE SLASHED** when the Smartnode's Validator Client begins attesting with your validator's key!

We strongly recommend you enable **doppelganger detection** in the Smartnode configuration as well, to be as safe as possible against the risk of slashing.
:::  

If you choose to automatically import the validator key and change the withdrawal credentials to the minipool address, the Smartnode will first ask for the mnemonic used to generate both your validator's BLS private key and its corresponding original withdrawal key:

```
Please enter the number of words in your mnemonic phrase (24 by default):
24

Enter Word Number 1 of your mnemonic:
...

Enter Word Number 24 of your mnemonic:
```

Upon entering it, the Smartnode will derive your old BLS-based withdrawal key using the mnemonic and the validator's pubkey.
It will then submit a message to the Beacon Chain, signed by your withdrawal key, indicating that you want to change the withdrawal credentials from the old BLS withdrawal key to the new minipool address:

```
Changing withdrawal credentials to the minipool address... done!
```

Finally, it will import your validator's key into the Smartnode's Validator Client and ask if you'd like to restart it, so it begins validating with that key:

```
Importing validator key... done!
Would you like to restart the Smartnode's Validator Client now so it loads your validator's key? [y/n]
y
Restarting Validator Client... done!
```

With that, steps 2 and 3 have been completed.
You can verify that the withdrawal credentials have been properly changed and that the key is actively validating by using a chain explorer such as [https://beaconcha.in](https://beaconcha.in)


Go to the [Step 4](#step-4-waiting-for-the-scrub-check) section to learn about the scrub check.


## Step 2: Changing the Validator's Withdrawal Credentials

When you've created the new vacant minipool, the next step is to change your validator's withdrawal credentials from the old `0x00` BLS-key credentials to the new `0x01` credentials that contain the new minipool address.

There are two ways to do this:

1. Using the Smartnode CLI, via the `rocketpool minipool set-withdrawal-creds` command.
1. Using an external third-party tool such as [ethdo](https://github.com/wealdtech/ethdo).

In this guide, we'll walk through how to use method 1 (the Smartnode).
For more information on method 2, please consult the documentation for the tool you'd like to use.

Start by running the following command:

```
rocketpool minipool set-withdrawal-creds <minipool address>
```

For example, if the new vacant minipool address was `0x8F3F149e4416a94e0ee909dE32f8A11C2F3e211C`, you would run this:

```
rocketpool minipool set-withdrawal-creds 0x8F3F149e4416a94e0ee909dE32f8A11C2F3e211C
```

The Smartnode will then ask for the mnemonic used to generate both your validator's key and its corresponding withdrawal key:

```
Please enter the number of words in your mnemonic phrase (24 by default):
24

Enter Word Number 1 of your mnemonic:
...

Enter Word Number 24 of your mnemonic:
```

After this, it will perform some safety checks to ensure your validator's withdrawal credentials can be changed.
If it's successful, it will then submit a message to the Beacon Chain, signed by your withdrawal key, indicating that you want to change the withdrawal credentials from the old BLS withdrawal key to the new minipool address:

```
Changing withdrawal credentials to the minipool address... done!
```

That's it!
You can verify that the withdrawal credentials have been properly changed by using a chain explorer such as [https://beaconcha.in](https://beaconcha.in).


## (Optional) Step 3: Import the Validator Key

Once you convert your validator into a minipool, you may want to have the Smartnode's Validator Client run it instead of the one you currently manage on your own.
This has a few advantages:

- It is "cleaner" from an organizational standpoint (the Smartnode manages your minipools, your externally-managed Validator Client manages your solo staking validators).
- It allows commands like `rocketpool minipool exit` (commands that require your validator key for signing messages) to work.

However, there are some **very important considerations** to understand before doing this:

- You **must ensure** that your validator's key has been removed from your own Validator Client, and that you have waited for at least 15 minutes after removing it before importing it into the Smartnode. See the warning box below.
- You **must ensure** that you have your validator keystore *and its password file* backed up, because commands like `rocketpool wallet recover` and `rocketpool wallet rebuild` **cannot** regenerate them without a backup since they weren't derived from the Smartnode wallet's mnemonic.

If you would like to import your validator key into the Smartnode, continue reading below.

::: danger WARNING
If you choose to have the Smartnode import your validator's private key, it is **essential** that you remove the validator key from your old Validator Client that you manage on your own, and **shut down the old Validator Client** to ensure it does not have the key loaded into memory still.

You must also wait **at least 15 minutes** after doing so to ensure that it has **intentionally missed at least two attestations**.
You can verify this by looking at a chain explorer such as [https://beaconcha.in](https://beaconcha.in).

If you do not wait for at least 15 minutes, your validator **WILL BE SLASHED** when the Smartnode's Validator Client begins attesting with your validator's key!

We strongly recommend you enable **doppelganger detection** in the Smartnode configuration as well, to be as safe as possible against the risk of slashing.
:::

Start by running the following command:

```
rocketpool minipool import-key <minipool address>
```

For example, if the new vacant minipool address was `0x8F3F149e4416a94e0ee909dE32f8A11C2F3e211C`, you would run this:

```
rocketpool minipool import-key 0x8F3F149e4416a94e0ee909dE32f8A11C2F3e211C
```

The Smartnode will then ask for the mnemonic used to generate your validator's key:

```
Please enter the number of words in your mnemonic phrase (24 by default):
24

Enter Word Number 1 of your mnemonic:
...

Enter Word Number 24 of your mnemonic:
```

After this, it will cycle through the different keys generated from that mnemonic until it finds your validator's public key.
It will then import it, and ask if you'd like to restart the Smartnode's Validator Client so it loads your key:


```
Importing validator key... done!
Would you like to restart the Smartnode's Validator Client now so it loads your validator's key? [y/n]
y
Restarting Validator Client... done!
```

With that, your validator key is now imported into the Smartnode and you should see it begin attesting.
You can confirm by following the Validator Client's logs with this command:
```
rocketpool service logs validator
```

You can also verify that a chain explorer such as [https://beaconcha.in](https://beaconcha.in) can see your Validator Client attesting with your validator's key.


## Step 4: Waiting for the Scrub Check

By this time, you should have completed steps 1 and 2 (creating the vacant minipool and changing your validator's withdrawal credentials) and optionally step 3 (importing the key into the Smartnode).
The next step is to wait for the **scrub check** to complete.
This is a process carried out by the Oracle DAO to verify the following:

1. Your validator's balance on the Beacon Chain (and your minipool's balance on the Execution layer) must add up to **at least** the balance your validator had when you first created the vacant minipool, minus a small buffer of 0.001 ETH to account for any accidental missed attestations during maintenance.
  - For example, if your validator had a Beacon Chain balance of 35 ETH when you performed step 1, the combined Beacon Chain and minipool balances must be **at least** 34.999 ETH throughout the entire duration of the scrub check.
1. Your validator must remain in the **actively staking** status for the entire scrub check - it cannot be slashed, exited, or withdrawn.
1. Your validator's withdrawal credentials must either be the **original BLS-based withdrawal key credentials**, or the **new 0x01 credentials using the minipool's address**. Any other credentials will cause the minipool to be scrubbed.
  - You are given a grace period of **approximately X days** to perform the withdrawal credentials change (85% of the scrub period's duration).

The scrub check is transient; you don't have to do anything during this time other than keep your validator online and performing well.

To monitor how much time is left in the scrub check, you can look at the `node` logs with the following command:

```
rocketpool service logs node
```

The relevant lines will look like this:

```
rocketpool_node  | 2023/03/06 04:51:32 Checking for minipools to promote...
rocketpool_node  | 2023/03/06 04:51:32 Minipool 0x8F3F149e4416a94e0ee909dE32f8A11C2F3e211C has 44m0s left until it can be promoted.
```

It will last for **X days**, after which you have passed and can proceed to [Step 5](#step-5-promoting-the-minipool) to promote the vacant minipool into a full one.


### Working with Scrubbed Minipools

If your minipool unfortunately fails the scrub check and is dissolved, don't worry - your capital isn't lost.
Dissolved vacant minipools essentially act as simplified withdrawal addresses:

- They are not technically part of the Rocket Pool network.
- Any capital deposited into the minipool belongs *solely* to the node operator. It *does not* get split with the pool stakers.
- You are not awarded a deposit credit for creating the minipool.

You can access the minipool's balance at any time with the following command:

```
rocketpool minipool distribute-balance
```

This will send the minipool's entire balance to your node's withdrawal address.

When you've exited your validator from the Beacon Chain and its full balance has been sent to the minipool, you can retrieve it and close the minipool with the following command:

```
rocketpool minipool close
```

Once again, this will send the minipool's full balance to your node's withdrawal address.


## Step 5: Promoting the Minipool

When the scrub check has been passed successfully, you can promote the vacant minipool to a full minipool.
This can be done two ways:

1. Let the `node` process handle it automatically as soon as the scrub check ends.
1. Do it manually using the CLI.

The first method will promote the minipool for you automatically, assuming you have the `node` process / container running and the network's gas cost is below the automated transaction threshold you specified in the Smartnode configuration process (default of 150).
In the `node` logs, you will see output like the following:

```
rocketpool_node  | 2023/03/06 05:37:00 Checking for minipools to promote...
rocketpool_node  | 2023/03/06 05:37:00 1 minipool(s) are ready for promotion...
rocketpool_node  | 2023/03/06 05:37:00 Promoting minipool 0x8F3F149e4416a94e0ee909dE32f8A11C2F3e211C...
rocketpool_node  | 2023/03/06 05:37:01 This transaction will use a max fee of 34.736742 Gwei, for a total of up to 0.009597 - 0.014396 ETH.
rocketpool_node  | 2023/03/06 05:37:01 Transaction has been submitted with hash 0x93c2662def6097da28e01b9145259736575ffc43b539b002b27e547065e66d7e.
rocketpool_node  | 2023/03/06 05:37:01 Waiting for the transaction to be validated...
rocketpool_node  | 2023/03/06 05:37:13 Successfully promoted minipool 0x8F3F149e4416a94e0ee909dE32f8A11C2F3e211C.
```

If your `node` process is disabled, you can use the second method via the following command:

```
rocketpool minipool promote
```

From here, simply select your vacant minipool from the list of minipools eligible for promotion and submit the transaction.


## Claiming your Original Pre-Conversion Rewards

Upon promotion, your minipool will enter the `staking` status and has officially become a regular Rocket Pool minipool.
You can review the details with this command:
```
rocketpool minipool status
```

This will show you the status of your new minipool, its balances, its refund, and so on.
For example:

```
Address:              0x8F3F149e4416a94e0ee909dE32f8A11C2F3e211C
Penalties:            0
Status updated:       2023-03-06, 05:37 +0000 UTC
Node fee:             14.000000%
Node deposit:         8.000000 ETH
RP ETH assigned:       2023-03-06, 05:37 +0000 UTC
RP deposit:            24.000000 ETH
Minipool Balance (EL): 0.090012 ETH
Your portion:          0.001779 ETH
Available refund:      0.085000 ETH
Total EL rewards:      0.086779 ETH
...
```

Here you can see the following important information:
- `Node deposit` shows how much ETH you personally bonded as part of this minipool (in this case, 8 ETH).
- `RP deposit` shows how much ETH you borrowed from the pool stakers to create the minipool (in this case, 24 ETH).
- `Available refund` shows how much of the minipool's balance goes directly to you (is *not* shared with the pool stakers. This amounts to your all of your rewards on the Beacon Chain at the time you created the vacant minipool.
- `Minipool Balance (EL)` shows the total balance of the minipool contract.
- `Your portion (EL)` shows how much of the balance belongs to you *after* subtracting the refund from the minipool's balance. In other words, this is your share of the rewards you've earned *after* you created the vacant minipool.
- `Total EL rewards` is your refund plus your post-conversion rewards.

To claim your refund, run the following command:

```
rocketpool minipool refund
```

Simply select your minipool from the list, approve the transaction, and your refund will be sent to your node's withdrawal address.


## Using your Node Credit

Now that you have an active promoted minipool, you will notice your node hasa credit balance when you run `rocketpool node status`:

```
Your Smartnode is currently using the Zhejiang Test Network.

=== Account and Balances ===
The node 0x9BA1401Eb7D779eC51f910B066e9C4351cD28911 has a balance of 355.785269 ETH and 16679.835547 RPL.
The node has 24.000000 ETH in its credit balance, which can be used to make new minipools.
```

In this example, since we converted the original 32 ETH validator bond into an 8-ETH minipool, we have received [**24 ETH in credit**](./credit.md).
This credit can be used to create new minipools and validators for free!

Simply run the `rocketpool node deposit` command, and select which bond amount you would like to use.
If there's enough ETH in your credit balance to cover the bond, it will be used automaticaly and you won't have to stake any additonal ETH (though you still have to pay for gas.

::: warning NOTE
The ETH used for your credit balance comes from the staking pool.
If the staking pool doesn't have enough ETH to cover your credit balance, you won't be able to use it until more ETH has been deposited.
:::
