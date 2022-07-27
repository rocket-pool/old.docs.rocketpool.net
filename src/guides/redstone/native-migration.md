# [Native Mode] Guide to the Redstone Update and the Merge

This guide will cover everything you need to know in order to prepare your node for the Redstone Update and The Merge if you are using **Native Mode**.


## Things to Do Before Upgrading to v1.5.0

Before upgrading to v1.5.0 and higher of the Smartnode, please go through the following checklist to make sure you're prepared:


### Switch to a Full Execution Client

The Merge requires you to run your own Execution client, so you won't be able to use light clients like Infura or Pocket anymore.

Because of this change, if you're currently using a light Execution client, you should switch to a full client while you're still on v1.4, let it sync to completion, and then upgrade to v1.5.


### Set Up the Engine API

The Merge changes the way your Execution client talks to your Consensus client.
Instead of using the old HTTP or Websocket based RPC system, The Merge requires a new system exposed by your Execution client called the Engine API.

This is a special connection that lets the Consensus client replace the old Proof-of-Work mining system with Proof-of-Stake; it's the heart of The Merge.
It's also **authenticated** with a secret token, so only your Consensus client can connect to your Execution client - nothing else can.

As you manage your own Execution and Consensus clients, you'll need to set up the Engine API manually.
How to do it depends entirely on which clients you're running.

CoinCashew has [a great and concise guide](https://www.coincashew.com/coins/overview-eth/ethereum-merge-upgrade-checklist-for-home-stakers-and-validators) on how to set up the Engine API on your Execution and Consensus clients.
Give that a look, and test the new configuration out by making sure it still attests properly before upgrading.

We'll show you how to set up your Validator client so that it uses the correct fee recipient required by the Smartnode software automatically below.


## Upgrading to v1.5.0

Upgrading the Smartnode stack to v1.5.0 is no different than any other upgrade.
Simply follow [the normal directions here](../node/updates.md#updating-the-smartnode-stack).


## Things You Should Do After Upgrading

In Native mode, there are several things you will need to do manually after upgrading:


### Ensure a Successful Upgrade

The first thing to do is ensure that your node is working correctly.
Consider taking the following steps:

- Check your log scripts for the Execution client, the Consensus client, the Validator client, and the Smartnode daemon (the `rp-node` service) to ensure they're all functioning normally without errors.
- Confirm with a Block Explorer (such as your Grafana dashboard and [https://beaconcha.in](https://beaconcha.in)) that you are still attesting properly
    - Remember that if you have Doppelganger protection enabled, you will miss a few attestations after the restart. This is normal!


### Set up the Fee Recipient in your Validator Client

One of the **critical** details to set up prior to the Merge is the **fee recipient** specified by your validator client.
As described in the [overview article](./whats-new.md#fee-recipients-and-your-distributor), this can be one of two values:

- If you **are opted into** the Smoothing Pool, this must be the address of the **Smoothing Pool contract**. You can get the address from [the official contracts page](../../overview/contracts-integrations.md#protocol-contracts).
- If you are **not** in the Smoothing Pool, this must be the address of your node's **fee distributor contract**. You can get the address by running `rocketpool node status`, under the `Fee Distributor and Smoothing Pool` section.

In Native mode, you have the choice of letting the Smartnode manage this for you if you use the Smartnode daemon service, `rp-node`, or managing it yourself if you do not use the daemon.


#### Automatic Management via the Daemon

The Smartnode daemon will automatically determine the appropriate fee recipient for your node and manage it in case it changes (such as opting into and out of the Smoothing Pool).
This is the **safest** option, because the Smartnode will always ensure it's set to a value that **prevents [penalization](https://github.com/rocket-pool/rocketpool-research/blob/master/Penalties/penalty-system.md)**.

The way it does this is by maintaining a file with the correct fee recipient in it, and regularly refreshing it to ensure its correctness.
When it needs to be updated, it modifies the file and restarts your Validator client automatically so it loads the new recipient - similarly to how it restarts your Validator client after staking a new minipool.

Select your client below to learn how to set it up:

:::::: tabs
::::: tab Lighthouse
Create a new file called `<data dir>/validators/lighthouse/rp-fee-recipient.txt` where `<data dir>` is the absolute path of your Smartnode data directory (for example, `/srv/rocketpool/data/validators/lighthouse/rp-fee-recipient.txt`).

The contents of this file should simply be the hex address of the **rETH** token for the network you're running on.
You can find the full list of rETH token addresses for each network [on the contracts page](https://docs.rocketpool.net/overview/contracts-integrations/#token-contracts).

For example, on Mainnet, this file would simply hold:

```
0xae78736Cd615f374D3085123A210448E74Fc6393 
```

::: tip NOTE
Using the rETH token address as the default fee recipient is the **safe** default option prior to the Redstone upgrade, after which it will be updated to your node's fee distributor automatically.
The default `0x000...000` address is **not safe** and will result in a [penalty](https://github.com/rocket-pool/rocketpool-research/blob/master/Penalties/penalty-system.md) if, for any reason, you accidentally propose with it after The Merge.
:::

Next, modify your Validator Client service by adding the following command line argument to your service definition file:

```
--suggested-fee-recipient $(cat <data dir>/validators/lighthouse/rp-fee-recipient.txt)
```

For example:

```
--suggested-fee-recipient $(cat /srv/rocketpool/data/validators/lighthouse/rp-fee-recipient.txt)
```

Your VC will now use the file managed by the Smartnode daemon, and will automatically be restarted whenever the fee recipient changes.
:::::
::::: tab Nimbus
Create a new file called `<data dir>/validators/nimbus/rp-fee-recipient.txt` where `<data dir>` is the absolute path of your Smartnode data directory (for example, `/srv/rocketpool/data/validators/nimbus/rp-fee-recipient.txt`).

The contents of this file should simply be the hex address of the **rETH** token for the network you're running on.
You can find the full list of rETH token addresses for each network [on the contracts page](https://docs.rocketpool.net/overview/contracts-integrations/#token-contracts).

For example, on Mainnet, this file would simply hold:

```
0xae78736Cd615f374D3085123A210448E74Fc6393 
```

::: tip NOTE
Using the rETH token address as the default fee recipient is the **safe** default option prior to the Redstone upgrade, after which it will be updated to your node's fee distributor automatically.
The default `0x000...000` address is **not safe** and will result in a [penalty](https://github.com/rocket-pool/rocketpool-research/blob/master/Penalties/penalty-system.md) if, for any reason, you accidentally propose with it after The Merge.
:::

Next, modify the Nimbus service by adding the following command line argument to its service definition file:

```
--suggested-fee-recipient=$(cat <data dir>/validators/nimbus/$FEE_RECIPIENT_FILE)
```

For example:

```
--suggested-fee-recipient=$(cat /srv/rocketpool/data/validators/nimbus/rp-fee-recipient.txt)
```

Nimbus will now use the file managed by the Smartnode daemon, and will automatically be restarted whenever the fee recipient changes.
:::::
::::: tab Prysm
Create a new file called `<data dir>/validators/prysm-non-hd/rp-fee-recipients.json` where `<data dir>` is the absolute path of your Smartnode data directory (for example, `/srv/rocketpool/data/validators/prysm-non-hd/rp-fee-recipients.json`).

The contents of this file should be as follows:

```json
{
    "proposer_config": {
    },
    "default_config": {
        "fee_recipient": "${RETH_ADDRESS}"
    }
}
```

Where `${RETH_ADDRESS}` is the hex address of the **rETH** token for the network you're running on.
You can find the full list of rETH token addresses for each network [on the contracts page](https://docs.rocketpool.net/overview/contracts-integrations/#token-contracts).

For example, on Mainnet, this file would contain:

```json
{
    "proposer_config": {
    },
    "default_config": {
        "fee_recipient": "0xae78736Cd615f374D3085123A210448E74Fc6393"
    }
} 
```

::: tip NOTE
Using the rETH token address as the default fee recipient is the **safe** default option prior to the Redstone upgrade, after which it will be updated to your node's fee distributor automatically.
The default `0x000...000` address is **not safe** and will result in a [penalty](https://github.com/rocket-pool/rocketpool-research/blob/master/Penalties/penalty-system.md) if, for any reason, you accidentally propose with it after The Merge.
:::

Next, modify your Validator Client service by adding the following command line argument to your service definition file:

```
--proposer-settings-file <data dir>/validators/prysm-non-hd/rp-fee-recipients.json
```

For example:

```
--proposer-settings-file /srv/rocketpool/data/validators/prysm-non-hd/rp-fee-recipients.json
```

Your VC will now use the file managed by the Smartnode daemon, and will automatically be restarted whenever the fee recipient changes.
:::::
::::: tab Teku
Create a new file called `<data dir>/validators/teku/rp-fee-recipients.json` where `<data dir>` is the absolute path of your Smartnode data directory (for example, `/srv/rocketpool/data/validators/teku/rp-fee-recipients.json`).

The contents of this file should be as follows:

```json
{
    "proposer_config": {
    },
    "default_config": {
        "fee_recipient": "${RETH_ADDRESS}"
    }
}
```

Where `${RETH_ADDRESS}` is the hex address of the **rETH** token for the network you're running on.
You can find the full list of rETH token addresses for each network [on the contracts page](https://docs.rocketpool.net/overview/contracts-integrations/#token-contracts).

For example, on Mainnet, this file would contain:

```json
{
    "proposer_config": {
    },
    "default_config": {
        "fee_recipient": "0xae78736Cd615f374D3085123A210448E74Fc6393"
    }
} 
```

::: tip NOTE
Using the rETH token address as the default fee recipient is the **safe** default option prior to the Redstone upgrade, after which it will be updated to your node's fee distributor automatically.
The default `0x000...000` address is **not safe** and will result in a [penalty](https://github.com/rocket-pool/rocketpool-research/blob/master/Penalties/penalty-system.md) if, for any reason, you accidentally propose with it after The Merge.
:::

Next, modify your Validator Client service by adding the following command line argument to your service definition file:

```
--proposer-settings-file <data dir>/validators/teku/rp-fee-recipients.json
```

For example:

```
--proposer-settings-file /srv/rocketpool/data/validators/teku/rp-fee-recipients.json
```

Your VC will now use the file managed by the Smartnode daemon, and will automatically be restarted whenever the fee recipient changes.
:::::
::::::


#### Manual Fee Recipient Management

::: danger WARNING
By doing this, you assume full responsibility for ensuring your fee recipient is always set to the correct address.

Please read the [penalty specification](https://github.com/rocket-pool/rocketpool-research/blob/master/Penalties/penalty-system.md) to understand what it must be set to given your configuration, and when you can safely change it from one value to another.

Failure to do so could result in your minipools being penalized!
:::

Select your Consensus client below to learn how to configure it.

:::::: tabs
::::: tab Lighthouse
Add the following command line argument to your Validator Client's service definition file:

```
--suggested-fee-recipient <address>...
```

Where `<address>` is:

- The [rETH address](https://docs.rocketpool.net/overview/contracts-integrations/#token-contracts) **before** the Redstone update is deployed (e.g., `0xae78736Cd615f374D3085123A210448E74Fc6393` on Mainnet)
- Your node's **fee distributor** after Redstone is deployed, which you can retrieve with `rocketpool node status` once the contract upgrade occurs
- The [Smoothing Pool address](https://docs.rocketpool.net/overview/contracts-integrations/#protocol-contracts) if you opt into the Smoothing Pool

**Please read the [penalty specification](https://github.com/rocket-pool/rocketpool-research/blob/master/Penalties/penalty-system.md) carefully to understand the conditions and expectations around the fee recipient.**
:::::
::::: tab Nimbus
Add the following command line argument to Nimbus's service definition file:

```
--suggested-fee-recipient=<address>...
```

Where `<address>` is:

- The [rETH address](https://docs.rocketpool.net/overview/contracts-integrations/#token-contracts) **before** the Redstone update is deployed (e.g., `0xae78736Cd615f374D3085123A210448E74Fc6393` on Mainnet)
- Your node's **fee distributor** after Redstone is deployed, which you can retrieve with `rocketpool node status` once the contract upgrade occurs
- The [Smoothing Pool address](https://docs.rocketpool.net/overview/contracts-integrations/#protocol-contracts) if you opt into the Smoothing Pool

**Please read the [penalty specification](https://github.com/rocket-pool/rocketpool-research/blob/master/Penalties/penalty-system.md) carefully to understand the conditions and expectations around the fee recipient.**
:::::
::::: tab Prysm
Create a new file called `<data dir>/validators/prysm-non-hd/rp-fee-recipients.json` where `<data dir>` is the absolute path of your Smartnode data directory (for example, `/srv/rocketpool/data/validators/prysm-non-hd/rp-fee-recipients.json`).

The contents of this file should be as follows:

```json
{
    "proposer_config": {
    },
    "default_config": {
        "fee_recipient": "<address>"
    }
}
```

Where `<address>` is:

- The [rETH address](https://docs.rocketpool.net/overview/contracts-integrations/#token-contracts) **before** the Redstone update is deployed (e.g., `0xae78736Cd615f374D3085123A210448E74Fc6393` on Mainnet)
- Your node's **fee distributor** after Redstone is deployed, which you can retrieve with `rocketpool node status` once the contract upgrade occurs
- The [Smoothing Pool address](https://docs.rocketpool.net/overview/contracts-integrations/#protocol-contracts) if you opt into the Smoothing Pool

Next, add the following command line argument to your Validator Client's service definition file:

```
--proposer-settings-file <data dir>/validators/prysm-non-hd/rp-fee-recipients.json
```

For example:

```
--proposer-settings-file /srv/rocketpool/data/validators/prysm-non-hd/rp-fee-recipients.json
```

**Please read the [penalty specification](https://github.com/rocket-pool/rocketpool-research/blob/master/Penalties/penalty-system.md) carefully to understand the conditions and expectations around the fee recipient.**
:::::
::::: tab Teku
Create a new file called `<data dir>/validators/teku/rp-fee-recipients.json` where `<data dir>` is the absolute path of your Smartnode data directory (for example, `/srv/rocketpool/data/validators/teku/rp-fee-recipients.json`).

The contents of this file should be as follows:

```json
{
    "proposer_config": {
    },
    "default_config": {
        "fee_recipient": "<address>"
    }
}
```

Where `<address>` is:

- The [rETH address](https://docs.rocketpool.net/overview/contracts-integrations/#token-contracts) **before** the Redstone update is deployed (e.g., `0xae78736Cd615f374D3085123A210448E74Fc6393` on Mainnet)
- Your node's **fee distributor** after Redstone is deployed, which you can retrieve with `rocketpool node status` once the contract upgrade occurs
- The [Smoothing Pool address](https://docs.rocketpool.net/overview/contracts-integrations/#protocol-contracts) if you opt into the Smoothing Pool

Next, add the following command line argument to your Validator Client's service definition file:

```
--proposer-settings-file <data dir>/validators/teku/rp-fee-recipients.json
```

For example:

```
--proposer-settings-file /srv/rocketpool/data/validators/teku/rp-fee-recipients.json
```

**Please read the [penalty specification](https://github.com/rocket-pool/rocketpool-research/blob/master/Penalties/penalty-system.md) carefully to understand the conditions and expectations around the fee recipient.**
:::::
:::::: 


### Set Up MEV-Boost

[MEV-boost](https://boost.flashbots.net/) is the system Flashbots provides to give MEV rewards to Proof-of-Stake validators after The Merge.

**Rocket Pool requires all nodes to use it to maximize their returns and thus keep the protocol competitive with other staking services.**

You will need to make some adjustments to your Beacon Node / Consensus client to connect it to MEV-boost.

MEV-boost is currently not available on Prater or Mainnet, so you do not need to set it up at this time.
Of course, you will not be penalized for not using it during this transition period.

Once it becomes available, we will announce a date at which it must be installed and connected to your node.
Flashbots will provide instructions you can follow at that time, and we will link to them here.

::: danger NOTE
Once we make the announcement that MEV-boost must be enabled by all node operators, you must ensure you have it properly installed and configured with your Beacon Node!

Not doing so will result in your minipool being [penalized](https://github.com/rocket-pool/rocketpool-research/blob/master/Penalties/penalty-system.md).
::: 


### Set Up a Fallback Node

Because The Merge is not compatible with light clients like Infura and Pocket, you'll lose the ability to use them as fallback Execution clients when your primary goes offline.

The Smartnode still has the ability to provide a fallback Execution client (and now a fallback Consensus client as well), but you will now need to use Execution and Consensus clients that you control.

For more information on setting up a fallback node, see the [Fallback node guide](../node/fallback.md).


### Initialize your Fee Distributor

If you aren't planning to opt into the [Smoothing Pool](./whats-new.md#smoothing-pool) and claim all of your priority fees and MEV rewards to your [fee distributor contract](./whats-new.md#fee-recipients-and-your-distributor), you will eventually have to initialize it (create the contract instance on the chain) in order to claim rewards from it to your withdrawal address.

This is a fairly cheap operation and only needs to be done once.

::: tip TIP
Initializing your fee distributor can be done at **any time**.
You can let rewards accumulate in its address long before you initialize it, and your balance will remain after initialization.

We recommend you do so when gas prices are low to minimize the overhead cost.

Note that it **must be initialized in order to claim your rewards.**
:::


### Opt Into the Smoothing Pool

If you plan on taking advantage of the [Smoothing Pool](./whats-new.md#smoothing-pool) right away, you should opt in before the end of the first Redstone rewards period to maximize your "eligibility" amount.

Opting in can be done via running the following command:

```
rocketpool node join-smoothing-pool
```


### Claim Rewards

The Redstone upgrade replaces the expensive, problematic old rewards system with a [brand new one](./whats-new.md#new-rewards-system) that's much cheaper, supports automatic restaking of RPL (both partial and full amounts), and - most importantly - **lets you claim your rewards whenever you want**.

Because there is no longer a time limit on claiming rewards, and because it's cheaper to claim many rewards intervals at once, the automatic rewards claiming feature of the Smartnode **has been removed**.
You will now be able to claim rewards via the following command:

```
rocketpool node claim-rewards
```

This will show you all of the rewards you've accumulated across all of the rewards intervals starting with the Redstone upgrade.