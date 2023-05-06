# [Hybrid Mode] Guide to the Redstone Update and the Merge

This guide will cover everything you need to know in order to prepare your node for the Redstone Update and The Merge if you are using **Hybrid Mode**.


## Things to Do Before Upgrading to v1.5.0

Before upgrading to v1.5.0 and higher of the Smartnode, please go through the following checklist to make sure you're prepared:


### Switch to a Full Execution Client

The Merge requires you to run your own Execution client, so you won't be able to use remote providers like Infura or Pocket anymore.

Because of this change, if you're currently using a light Execution client, you should switch to a full client while you're still on v1.4, let it sync to completion, and then upgrade to v1.5.


### Ensure the EC and CC are Both Externally Managed

Previous versions of the Smartnode stack allowed you to have one client locally managed, and the other externally managed.
For example, you could have an Execution client that the Smartnode manages and connect it to a Consensus client that you manage externaly.

Starting with v1.5, this configuration is no longer supported.
You'll have to switch to either a locally managed Execution and Consensus client (also known as [Docker Mode](./docker-migration.md)), or set up both an Execution and a Consensus client that you manage on your own.

::: tip TIP
If you are interested in letting the Smartnode maintain its own Execution and Consensus client but want to keep control over your own Validator client (e.g., if you have your own solo staking validator keys attached to it), you may want to consider [Reverse Hybrid Mode](../node/advanced-config.md#allowing-external-validator-clients-to-connect-to-the-smartnode) which does exactly this!
:::


### Set Up the Engine API

The Merge changes the way your Execution client talks to your Consensus client.
Instead of using the old HTTP or Websocket based RPC system, The Merge requires a new system exposed by your Execution client called the Engine API.

This is a special connection that lets the Consensus client replace the old Proof-of-Work mining system with Proof-of-Stake; it's the heart of The Merge.
It's also **authenticated** with a secret token, so only your Consensus client can connect to your Execution client - nothing else can.

As you manage your own Execution and Consensus clients, you'll need to set up the Engine API manually.
How to do it depends entirely on which clients you're running.

CoinCashew has [a great and concise guide](https://www.coincashew.com/coins/overview-eth/ethereum-merge-upgrade-checklist-for-home-stakers-and-validators) on how to set up the Engine API on your Execution and Consensus clients.
Give that a look, and test the new configuration out by making sure it still attests properly before upgrading.

As always, Rocket Pool will manage its own Validator client so you don't need to worry about manually modifying it.


## Upgrading to v1.5.0

Upgrading the Smartnode stack to v1.5.0 is no different than any other upgrade.
Simply follow [the normal directions here](../node/updates.md#updating-the-smartnode-stack).


## Things the Smartnode Handles Automatically

In Hybrid mode, the Smartnode will take care of some of the changes needed to support Redstone automatically once you update to v1.5.0, but you will need to handle others manually in Hybrid Mode.

Here's a brief list of what it will do for you without any manual intervention:


### Your Fee Recipient

The **fee recipient** is the address on the Execution layer (eth1) chain that will receive all of the priority fees for blocks you propose.
It is a setting provided to your Validator client when it first starts.

The Smartnode will handle setting it up to the correct address on the Validator client it manages when you upgrade to v1.5, and will constantly check to make sure you're using the correct one so you don't get [penalized accidentally](https://github.com/rocket-pool/rocketpool-research/blob/master/Penalties/penalty-system.md).

If you opted into the [Smoothing Pool](./whats-new.md#smoothing-pool), it will make that your fee recipient.
If you didn't, it will make your [fee distributor contract](./whats-new.md#fee-recipients-and-your-distributor) the fee recipient.


## Things You Should Do After Upgrading

While the Smartnode handles most of the changes for you, there are a few additional things you should do manually:


### Ensure a Successful Upgrade

The first thing to do is ensure that your node is working correctly.
Consider taking the following steps:

- Check the logs for errors with `rocketpool service logs validator` and `rocketpool service logs node`.
- Confirm with a Block Explorer (such as your Grafana dashboard and [https://beaconcha.in](https://beaconcha.in)) that you are still attesting properly
    - Remember that if you have Doppelganger protection enabled, you will miss a few attestations after the restart. This is normal!


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

Because The Merge is not compatible with remote providers like Infura and Pocket, you'll lose the ability to use them as fallback Execution clients when your primary goes offline.

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


## Reverting to v1.4.3

If, for any reason, something isn't to your liking and you want to revert to the previous Smartnode release, you can do so easily.
The Smartnode automatically backs up your settings from the previous version when you upgrade it, so simply get the previous version (here we're demonstrating **v1.4.3**) and replace the settings with the backup:

1. Stop the service:
```
rocketpool service stop
```

1. Download the v1.4.3 CLI:
    :::: tabs
    ::: tab Linux x64
    ```
    wget https://github.com/rocket-pool/smartnode-install/releases/download/v1.4.3/rocketpool-cli-linux-amd64 -O ~/bin/rocketpool
    ```
    :::
    ::: tab Linux arm64
    ```
    wget https://github.com/rocket-pool/smartnode-install/releases/download/v1.4.3/rocketpool-cli-linux-arm64 -O ~/bin/rocketpool
    ```
    :::
    ::: tab Mac x64
    ```
    curl -L https://github.com/rocket-pool/smartnode-install/releases/download/v1.4.3/rocketpool-cli-darwin-amd64 > /usr/local/bin/rocketpool
    ```
    :::
    ::: tab Mac arm64
    ```
    curl -L https://github.com/rocket-pool/smartnode-install/releases/download/v1.4.3/rocketpool-cli-darwin-arm64 > /usr/local/bin/rocketpool
    ```
    :::
    ::::

1. Install the v1.4.3 package:
```
rocketpool service install -d
```

1. Replace your old configuration with the v1.4.3 backup configuration:
```
cp ~/.rocketpool/user-settings-backup.yml ~/.rocketpool/user-settings.yml
```

1. Verify all of your old settings are now being used:
```
rocketpool service config
```

1. If it looks good, start the Smartnode stack:
```
rocketpool service start
```

All set! You're now back on the old version and should begin attesting shortly after starting the service.

::: danger WARNING
v1.4.3 is **deprecated** and will no longer be usable after the Redstone update is deployed.
If you do need to revert to it, please make plans to upgrade back to v1.5.0 before the contracts are updated!
:::