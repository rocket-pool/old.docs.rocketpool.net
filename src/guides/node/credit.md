# The Deposit Credit System

The deposit credit system is a mechanism to track ETH that was previously bonded by node operators but is no longer required and make it available for use again.
The source of this credit comes from two places:
- [Migrating an existing 16-ETH bonded minipool down to an 8-ETH bonded minipool](./leb-migration.md) (which adds 8 ETH to the node operator's credit balance)
- [Migrating an existing solo validator](../node/solo-staker-migration.md) into a minipool (which adds either 16 or 24 ETH to the node operator's credit balance, depending on which type of minipool they create during migration)

Every node operator begins with a credit balance of **0 ETH**.
Either of these two actions will increase that balance accordingly.

This ETH is *not* made liquid and returned to the node operator; instead, it can be used to **create additional minipools** without requiring any ETH from the node operator.

The credit system is **transparent** to the node operator; it will automatically be used (with notifications in the Smartnode CLI explaining that it will be used) during either `rocketpool node deposit` or `rocketpool node create-vacant-minipool` operations if possible.
If it *cannot* be used, the Smartnode will alert the user that it cannot be used and will require a normal ETH bond during either operation.

See the [Credit Availability](#credit-availability) section below for more details.


## An Example

Say you have a credit balance of 0 ETH, and a single minipool with a 16-ETH bond.
You can then [migrate that minipool to an 8-ETH bond](./leb-migration.md).
This will result in **8 ETH** that is no longer bonded.
That 8 ETH will be placed into your **credit balance**.

Now, say you want to create a *second* 8-ETH minipool.
You run `rocketpool node deposit` as usual, and select 8-ETH as the bond amount.
This normally requires you to provide 8 of your own ETH for the minipool.
However, because you have a credit balance of 8 ETH, Rocket Pool will **automatically use that instead**:

```
Please choose an amount of ETH to deposit:
1: 8 ETH
2: 16 ETH
1

Your minipool will use the current fixed commission rate of 14.00%.
You currently have 8.00 ETH in your credit balance.
This deposit will use 8.000000 ETH from your credit balance and will not require any ETH from your node.

Your consensus client is synced, you may safely create a minipool.
```

The second set of lines here is the relevant one: they tell you that you have enough ETH in your credit balance to cover this deposit *and that it is available for use*, so it will use the balance automatically and won't require any supplemental ETH from your node wallet.

See [the availability section below](#credit-availability) for details on credit balance availability.


## Viewing your Current Credit Balance

To view your current credit balance, simply run the following command:

```
rocketpool node status
```

This produces a comprehensive list of details about your node, including its credit balance right at the top:


```
Your Smartnode is currently using the Zhejiang Test Network.

=== Account and Balances ===
The node 0x9BA1401Eb7D779eC51f910B066e9C4351cD28911 has a balance of 347.796908 ETH and 16799.835547 RPL.
The node has 8.000000 ETH in its credit balance, which can be used to make new minipools.
...
```


## Credit Availability

In some situations, your node might have a credit balance available but cannot currently use it to deploy additional minipools.

The ETH for your credit balance is taken from the **deposit pool**.
Thus, if you want to use 8 ETH in credit to create a new 8-ETH minipool, it will end up taking **all 32 ETH for that minipool** from the deposit pool and require none from you.
Because of this, if the deposit pool does not have enough ETH in it to cover the pre-deposit value (currently set to 1 ETH), **the balance will not be available**.

In this situation, the Smartnode will alert you during a `rocketpool node deposit` operation that it **cannot** use your credit balance, and must instead use ETH from your node wallet to complete the bond.
Doing so will **not** consume your credit balance; it will be left as-is and available for use later once the deposit pool has enough balance to cover it.
