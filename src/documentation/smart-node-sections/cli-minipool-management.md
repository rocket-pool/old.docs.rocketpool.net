## Making Deposits

### Checking the Node Commission Rate

Before making a deposit, you may wish to view the current Rocket Pool network node commission rate. The commission rate varies depending on network node supply & demand dynamics, and changes as user deposits are made and minipools are created. Check the current node commission rate with:

```
rocketpool network node-fee
```

This will display the current rate, along with the minimum and maximum rates possible. If you’re happy with the current rate, you can make a deposit to create a minipool and start validating.

### Making a Deposit

You can make a deposit with:

```
rocketpool node deposit
```

You will then be prompted to select an amount of ETH to deposit. 16 ETH deposits create minipools which must wait for user-deposited ETH to be assigned to them before they begin staking. 32 ETH deposits create minipools which can begin staking immediately, and will have the excess 16 ETH refunded once they are assigned to.

Next, you will be shown the current network node commission rate and prompted to enter a minimum commission rate you will accept. You may either use the suggested value based on the data provided, or enter a custom one. If the network node commission rate drops below this threshold before your deposit transaction is mined, the deposit will be cancelled.

If the deposit is made successfully, the address of the newly created minipool will be displayed.


## Managing Minipools

### Checking Minipool Status

Once you have made one or more deposits from your node, you can view the status of your created minipools with:

```
rocketpool minipool status
```

This will list various properties of each minipool created by your node, including:

- Its address
- Its current status, and the time & block number it was last updated at
- The node commission rate on rewards earned by it
- The amount of ETH deposited by the node operator
- The amount of user-deposited ETH assigned, and the time it was assigned at
- The associated validator’s public key

You will also be notified if any of your minipools have ETH available for refund or withdrawal.

### Refunding From Minipools

If you have made any deposits of 32 ETH, the created minipools will have 16 ETH available for refund once user-deposited ETH is assigned to them. You can refund this ETH to your node account with:

```
rocketpool minipool refund
```

This will display a list of all eligible minipools, and prompt you to select one or all of them to refund your ETH from. Once refunded, you should see their balances reflected in your node account.

### Exiting Minipools

Once you’re ready to finish staking, you can exit your minipool validators from the beacon chain with:

```
rocketpool minipool exit
```

This will display a list of all eligible minipools, and prompt you to select one or all of them to exit. When you successfully exit a minipool, it can take several hours for its status to be reflected by your node. It can also take longer for it to be marked as withdrawable by the Rocket Pool network and for nETH to be minted to it for withdrawal.

### Withdrawing From Minipools

If any of your minipools have exited and been marked as withdrawable by the Rocket Pool network, you can withdraw your deposit & rewards from them with:

```
rocketpool minipool withdraw
```

This will display a list of all eligible minipools, and prompt you to select one or all of them to withdraw from. Once withdrawn, the minipool/s will be destroyed, and you should see their balances reflected in your node account.

**Note that before phase 2 of the Eth 2.0 rollout, rewards can only be withdrawn from exited minipools after a significant delay.**

### Dissolving Minipools

If you create a minipool and decide you want to back out before it begins staking, you can do so with:

```
rocketpool minipool dissolve
```

This will display a list of all minipools which do not yet have user-deposited ETH assigned to them. You will be prompted to select one or all of them to dissolve, returning your ETH deposit to your node account. Once dissolved, the minipool/s will be destroyed, and you should see their balances reflected in your node account.

If you create a minipool and it fails to stake within a set time period after user-deposited ETH is assigned to it, it may be dissolved by another party. This returns the user-deposited ETH to the deposit pool to be reassigned. If this occurs, you can close the dissolved minipools with:

```
rocketpool minipool close
```

This will display a list of all eligible minipools, and prompt you to select one or all of them to close. Once closed, the minipool/s will be destroyed, and you should see their balances reflected in your node account.