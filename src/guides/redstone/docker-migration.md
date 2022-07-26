# [Docker Mode] Guide to the Redstone Update and the Merge

This guide will cover everything you need to know in order to prepare your node for the Redstone Update and The Merge if you are using **Docker Mode**.


## Things to Do Before Upgrading to v1.5.0

Before upgrading to v1.5.0 and higher of the Smartnode, please go through the following checklist to make sure you're prepared:


### Switch to a Full Execution Client

The Merge requires you to run your own Execution client, so you won't be able to use light clients like Infura or Pocket anymore.
v1.5.0 won't have them anymore, and won't let you start the stack until you select a full Execution client.

Because of this change, you should switch to a full client while you're still on v1.4, let it sync to completion, and then upgrade to v1.5.

Docker Mode makes switching clients very easy.
[This guide](../node/change-clients.md#changing-execution-clients) provides a walkthrough of the process.


## Upgrading to v1.5.0

Upgrading the Smartnode stack to v1.5.0 is no different than any other upgrade.
Simply follow [the normal directions here](../node/updates.md#updating-the-smartnode-stack).


## Things the Smartnode Handles Automatically

In Docker mode, the Smartnode will take care of most of the changes needed to support Redstone and The Merge automatically once you update to v1.5.0.
Here's a brief list of what it will do for you without any manual intervention:


### The Engine API

The Merge changes the way your Execution client talks to your Consensus client.
Instead of using the old HTTP or Websocket based RPC system, The Merge requires a new system exposed by your Execution client called the Engine API.

This is a special connection that lets the Consensus client replace the old Proof-of-Work mining system with Proof-of-Stake; it's the heart of The Merge.
It's also **authenticated** with a secret token, so only your Consensus client can connect to your Execution client - nothing else can.

The Smartnode will handle the set up of the authentication token and the Engine API on both your Execution and Consensus clients automatically.


### Your Fee Recipient

The **fee recipient** is the address on the Execution layer (eth1) chain that will receive all of the priority fees for blocks you propose.
It is a setting provided to your Validator client when it first starts.

The Smartnode will handle setting it up to the correct address when you upgrade to v1.5, and will constantly check to make sure you're using the correct one so you don't get [penalized accidentally](https://github.com/rocket-pool/rocketpool-research/blob/master/Penalties/penalty-system.md).

If you opted into the [Smoothing Pool](./whats-new.md#smoothing-pool), it will make that your fee recipient.
If you didn't, it will make your [fee distributor contract](./whats-new.md#fee-recipients-and-your-distributor) the fee recipient.


### MEV-Boost

[MEV-boost](https://boost.flashbots.net/) is the system Flashbots provides to give MEV rewards to Proof-of-Stake validators after The Merge.
Rocket Pool has MEV-Boost built into the Smartnode and automatically configures your node to use it, so your proposals get the maximum amount of rewards. 


## Things You Should Do After Upgrading

While the Smartnode handles most of the changes for you, there are a few additional things you should do manually:


### Ensure a Successful Upgrade

The first thing to do is ensure that your node is working correctly.
Consider taking the following steps:

- Check the logs for errors with `rocketpool service logs eth1`, `rocketpool service logs eth2`, `rocketpool service logs validator`, and `rocketpool service logs node`.
- Confirm with a Block Explorer (such as your Grafana dashboard and [https://beaconcha.in](https://beaconcha.in)) that you are still attesting properly
    - Remember that if you have Doppelganger protection enabled, you will miss a few attestations after the restart. This is normal!


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