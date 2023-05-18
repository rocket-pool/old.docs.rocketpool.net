# Rescuing a Dissolved Minipool

In the unlikely event your minipool does not stake within the dissolve window, it will be "dissolved" by the oDAO and
user funds provided will be returned to the deposit pool for use by another minipool. In this scenario, you will need
to perform the below process to retrieve your ETH and unlock your RPL to be unstaked.

## Update your Minipool Delegate

It is highly recommended that you use the latest minipool delegate when performing this process. Older delegates contain
a `selfdestruct` operation when they are closed which means, if the process is not completed correctly in the 
specified order, funds may be locked forever. You can check that your minipool is on the latest delegate by attempting 
to [Upgrade your Delegate](minipools/delegates.md#upgrading-your-delegate). If your minipool does not appear in the 
list of minipools that can be upgraded then you can continue on below.

## Retrieve Your Unused Deposit Balance

::: tip NOTE
If your minipool was dissolved prior to Atlas, you may skip this step and head straight to [Increase Your Beaconchain Balance to 32 ETH](#increase-your-beaconchain-balance-to-32-eth).
You do not need to retrieve your unused deposit balance because the entire bond amount was deposited to the beaconchain
prior to Atlas.
:::

1 ETH from your initial bond deposit is used as an initial deposit to the beaconchain to secure your validator's 
withdrawal credentials. The remaining amount is deposited to your minipool when it is assigned ETH from
the deposit pool.

When your minipool is dissolved, the user ETH is returned to the deposit pool and your ETH remains in the minipool ready 
to be returned to you. Use the [Manual Distribution](skimming.md#manual-distribution) of rewards feature to retrieve this 
ETH that can then be used in the next step to activate your validator.

## Increase Your Beaconchain Balance to 32 ETH

You must top up your validator's balance to the minimum required for activation on the beaconchain. This
amount is **32 ETH**. If you have a 16 ETH bonded minipool, you will require an additional 16 ETH and if you have an 8 ETH
bonded minipool you will need an additional 24 ETH during this step.

Deposit the required amount of ETH into your node address and then issue the following command to begin the process:

```
rocketpool minipool rescue-dissolved
```

You will be presented with a list of minipools that meet the criteria for a manual deposit:

```
Please select a minipool to rescue:
1: All available minipools
2: 0x7E5700bcd65B1770bA68abB288D3f53814d376aC (dissolved since 2023-02-08, 06:33 +0000 UTC)
3: 0x7E570195026dC29f4B2DfF08B56c3b5D0FF988Ef (dissolved since 2023-02-08, 06:33 +0000 UTC)
```

After selecting the minipool you want to rescue, you will be asked what amount you want to manually deposit:

```
1. All 16.000000 ETH required to rescue it
2. 1 ETH
3. A custom amount
```

Option 1 will be used in most circumstances. It is the amount required to bring your beaconchain balance up to the required
32 ETH amount. The other options are provided for advanced use cases.

::: tip NOTE
Bringing your beaconchain balance up to 32 ETH means your validator will be able to actively participate in Ethereum
validation duties. The smartnode may not have had a chance to restart your validator since the dissolution. Therefore, 
it is a good idea to manually restart your validator to ensure it has loaded your validator keys and can perform 
validation duties to avoid any penalties during the rescue process.

If you are running the standard Docker mode, this can be done with `docker restart rocketpool_validator`.
:::

Once this step is complete, your validator will enter the entry queue and you will need to wait for the following events
to occur:

1. 2048 execution layer blocks need to pass for your deposit to be accepted (~8 hours)
2. Up to 32 epochs need to pass for validators to vote you in (0.5 - 3.5 hours)
3. A variable amount of time in the validator queue (6.4 minutes per 4 validators in the queue)
4. 256 epochs minimum validating before an exit is allowed (27 hours)

### Exiting your Validator

Once your validator has been active for a minimum of 256 epochs, you may exit your minipool via the same process as 
any other minipool by following the [Exiting your Validator](withdraw.md#exiting-your-validator) guide.

The full 32 ETH balance will be returned to your minipool and dissolved minipools distribute 100% of their balance to the
node operator's withdrawal address.