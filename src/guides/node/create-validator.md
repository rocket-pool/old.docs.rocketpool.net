# Creating a New Minipool (ETH2 Validator)

As a reminder, a `minipool` in Rocket Pool terms refers to a unique smart contract instance on the eth1.0 chain that your node manages.
The minipool handles 16 of your ETH, 16 ETH from the rETH staking pool, and merges them together so that it can send 32 ETH to the Beacon Chain deposit contract to create a new eth2.0 validator.
Thus, in order to create a validator using Rocket Pool, you need to **create a minipool**.

::: warning
Creating a minipool means depositing 16 of your own ETH to the Beacon Chain.
These funds **cannot be retrieved** until after the eth1.0 chain has merged with the eth2.0 chain, and withdrawals have been implemented.
By creating the minipool, you are acknowledging that you are effectively locking these funds until that system is in place.
:::


## Staking RPL

Before you can create a minipool, you'll first need to stake some RPL as collateral.
**At a minimum**, you'll need to stake 1.6 ETH worth of RPL which is 10% of your total bond in the node.
The exact amount of RPL will change based on the ETH/RPL price ratio, which is snapshotted on-chain at regular intervals by the Oracle DAO.

There is no maximum to the amount you can stake, though **you will only receive rewards for the first 150%** at each checkpoint - anything above that will go unrewarded.

::: tip NOTE
RPL stake isn't handled on a per-minipool basis.
When you stake RPL, you do it for your **entire node**.
This means you'll only need to handle the total RPL stake for your node if you plan to run multiple minipools.
:::


Run the following command, and the CLI will tell you how much this is (as well as give you a list of options with respect to how much you want to stake):

```
rocketpool node stake-rpl
```

Here is the output:

```
Please choose an amount of RPL to stake:
1: The minimum minipool stake amount (284.477473 RPL)?
2: The maximum effective minipool stake amount (4267.162095 RPL)?
3: Your entire RPL balance (1440.000000 RPL)?
4: A custom amount
```

Select how much you'd like to stake, then confirm the operation.

::: tip NOTE
Note that the gas estimates here will likely be incorrect, because this operation will require two sequential transactions: one to give the minipool contract access to your RPL, and one to perform the staking.
The gas estimator can't calculate the price for the second transaction until the first one is completed.
:::

Once both transactions finish, you can check your staked RPL amount with `rocketpool node status`.
The following portion of the output is what you want to verify:

```
The node has a total stake of 11763.477483 RPL and an effective stake of 11763.477483 RPL, allowing it to run 41 minipool(s) in total.
This is currently a 10.88% collateral ratio.
The node must keep at least 10810.143971 RPL staked to collateralize its minipools and claim RPL rewards.
```

If the `collateral ratio` is 10% or higher, then you have enough staked to create a new minipool.


## (Optional) Finding a Custom Vanity Address for your Minipool

By default, when you create a new minipool, Rocket Pool will generate a random unique address for it.
However, the Smartnode provides the ability to search for a custom **vanity address** for the minipool.

A vanity address is one where you effectively pick some set of characters that the address starts with - with the caveat that they must be hexadecimal characters since Ethereum addresses are all hexadecimal.
That means any of the following characters are legal:

```
0 1 2 3 4 5 6 7 8 9 a b c d e f
```

For example, you could make your minipool's address start with a bunch of zeros (`0x000000...`), `0x600d` (hex for "good") or `0xa77e57ed` (hex for "attested", a fitting prefix for a minipool).
Here is one of the team's test pools with such a prefix: [https://goerli.etherscan.io/address/0xA77E57c892C9e98B0B81289e4AfdA62fb59c5DDD](https://goerli.etherscan.io/address/0xA77E57c892C9e98B0B81289e4AfdA62fb59c5DDD)

To find such a vanity address, you will need to **search for it**.
This searching process involves picking a number, applying it as a "salt" to the hashing algorithm, and comparing the results against what you're looking for.
The results are effectively random (though any given salt always produces the same result), so the only way to find an address with the prefix you want is to try lots and lots of them until you find a salt that works.

If you would like a custom vanity address to use for your minipool when you create it, you can use the following command to search for one:

```
rocketpool minipool find-vanity-address
```

This will prompt you for the prefix you want to search for, and ask which type of deposit you will be doing (a 16 ETH or a 32 ETH deposit - see below for more info on these types).
Once you enter that information, it will begin trying lots and lots of salts until it finds one that produces your desired prefix!

Here is a complete example of the process:

```
$ rocketpool minipool find-vanity-address

Please specify the address prefix you would like to search for (must start with 0x):
0xa77e57

Please choose a deposit type to search for:
1: 32 ETH (minipool begins staking immediately)
2: 16 ETH (minipool begins staking after ETH is assigned)
2

Running with 12 threads.
Found on thread 3: salt 0x5cd7fb = 0xA77E57c892C9e98B0B81289e4AfdA62fb59c5DDD
Finished in 1.91145873s
```

In this case, we searched for `0xa77e57` as the prefix and found the salt `0x5cd7fb` which could generate it.
In the next step, when we create a minipool, we can specify this salt as an optional argument to create the new minipool at the address associated with the salt (`0xA77E57c892C9e98B0B81289e4AfdA62fb59c5DDD` as shown above).

In general, each additional character you search for will multiply the search time by about 16.
Because of this, **we recommend you only look for prefixes of 7 or 8 characters max unless you have a very powerful machine with many CPU cores**.
Otherwise, it might take prohibitively long to find a salt that produces the prefix you want.

::: tip NOTE
The salt that gets generated is specific to the following variables:
- The network you're using (either the Prater Testnet or Mainnet)
- The node address
- The deposit type (16 or 32 ETH)
- The salt

If you change any of those variables, the minipool address for a given salt will change as well.
:::

For more advanced usage (such as searching for a different node address or changing how many CPU cores are used for searching), take a look at the help text with `rocketpool minipool find-vanity-address --help`.


## Depositing ETH and Creating a Minipool

After everything you've done so far, you are finally ready to deposit your ETH, create a new minipool, and create an ETH2 validator.
This is done with the following command:

```
rocketpool node deposit
```

::: tip NOTE
If you want to use a salt for a vanity address that you found using the process above, run the following command instead:

```
rocketpool node deposit --salt <your salt, e.g. 0x1234abcd>
```
:::

You will first be prompted to choose how much ETH you want to deposit to your new minipool:

```
Please choose an amount of ETH to deposit:
1: 32 ETH (minipool begins staking immediately)
2: 16 ETH (minipool begins staking after ETH is assigned)
```

If you choose **16 ETH**, you will enter the Rocket Pool minipool queue.
This queue will wait for 16 ETH to become available from the rETH staking pool.
Once it's available, it will be merged with your own 16 ETH, used to create a minipool, and deposited into the Beacon Chain deposit contract to create a new validator.

If you choose **32 ETH**, you will bypass the Rocket Pool minipool queue entirely.
You will immediately create a minipool and a new Beacon Chain validator.
When 16 ETH becomes available from the rETH staking pool and there are no other minipools in the queue that chose the 16 ETH deposit option, then **you will be given 16 ETH back from the rETH staking pool**.
You can then use the `rocketpool minipool refund` command to receive that 16 ETH back to your withdrawal address.

::: tip NOTE
Though depositing 32 ETH lets you bypass the *Rocket Pool queue*, it does **not** bypass the *Beacon Chain queue*.
You still have to wait through the validator queue until your validator is activated on the Beacon Chain.
::: 

Next, you will be prompted about the current network commission rate:

```
The current network node commission rate that your minipool should receive is 20.000000%.
The suggested maximum commission rate slippage for your deposit transaction is 1.000000%.
This will result in your minipool receiving a minimum possible commission rate of 19.000000%.
Do you want to use the suggested maximum commission rate slippage? [y/n]
```

This will tell you what the **current** commission rate is, which is based on how many minipools are in the queue and how much rETH is available in the staking pool, waiting to be staked.
The lowest it can go is 5%, and the highest it can go is 20%.
Once your minipool is created, **its commission rate will be locked until you exit the validator and close the minipool**.

The commission rate chosen is ultimately set when your minipool enters the Rocket Pool queue, which can be a few minutes after you issue the deposit command to the network.
Because of this, it's possible that it might move slightly between the time when you issued the deposit command, and when the minipool is added to the queue.
This prompt asks you how much you are willing to allow the commission to drop by during this period before you would rather just cancel the deposit entirely.

For example: say the CLI claims that the current commission is 20% when you issue the `deposit` command.
It takes 5 minutes for your minipool to be added to the Rocket Pool queue.
In that time, the commission rate falls to 17%.

If you set a slippage of 2%, then the lowest you are willing to let it go down is 18%.
Since 17% is less than 18%, your deposit will be cancelled and your ETH will be refunded to you.
**Note that you will still have to pay some gas fees, even if the transaction is reverted in this way.**

If you set a slippage of 4%, then the lowest you are willing to let it go down is 16%.
Since 17% is greater than 16%, your minipool will be created and added to the queue with a commission rate of 17% for its entire life.

Using this knowledge, answer the prompt by deciding if the suggested slippage rate is acceptable or if you want to change it.

::: danger
After you set your acceptable slippage, the CLI will then check to ensure that your ETH2 client is synced.
If not synced, then it will warn you in large red letters.
A situation may arise where **your ETH2 validator is activated before your ETH2 node finishes syncing**.
If this happens, your validator will be assigned attestation and block proposal duties on the Beacon Chain, but it cannot perform those duties until your ETH2 client is fully synced.

In this situation, **every missed attestation and block proposal will cause you to lose ETH!**
You will continue to slowly leak your ETH until your ETH2 client finishes syncing.

In most cases, **you should cancel the process and wait for your client to sync.**

However, there are situations where the Beacon Chain validator queue is very long, and you believe that your ETH2 client will finish syncing before your validator exits the queue and is activated.
In this case, you may want to do the deposit anyway to save time and begin validating sooner.
If you **understand these risks** and **believe this is the case**, the CLI will let you go ahead with a deposit anyway.
:::

At this point you will be given the typical gas cost estimation:

```
Your eth2 client is synced, you may safely create a minipool.
Suggested gas price: 10.319561 Gwei
Estimated gas used: 1957383 gas
Estimated gas cost: 0.020199 ETH

You are about to deposit 16.000000 ETH to create a minipool with a minimum possible commission rate of 19.000000%.
ARE YOU SURE YOU WANT TO DO THIS? Running a minipool is a long-term commitment, and this action cannot be undone! [y/n]
```

Note that creating a minipool **is an expensive transaction**!
Pay close attention to the total cost and ensure that you accept it.

If you accept, your minipool creation will be triggered.
Once the transaction completes, you will be given the address of your new minipool contract on the eth1 chain and its corresponding validator public key on the Beacon Chain.
You can visit these with any block explorers if you'd like.



## Confirming a Successful Stake

Upon creation, your minipool will be put into the `initialized` state.
It will remain here until it's your turn in the Rocket Pool queue to be given 16 ETH from the staking pool so you can stake your new validator on the Beacon Chain.

::: tip NOTE
If you did a 32 ETH deposit, you will skip this step and go immediately to the `prelaunch` step below.
:::

Once this happens, your minipool will move into the `prelaunch` state for a certain period of time (currently 12 hours).
Your 16 ETH deposit will be transferred to be Beacon Chain, and the Oracle DAO [will verify that it is all correct](https://github.com/rocket-pool/rocketpool-research/blob/master/Reports/withdrawal-creds-exploit.md).
During this time, you can observe the validator by looking up its validator pubkey with a Beacon Chain explorer such as [https://beaconcha.in](https://beaconcha.in) (or [https://prater.beaconcha.in](https://prater.beaconcha.in) for the Prater Testnet).

You can check on the new minipool's status with the `rocketpool minipool status` command.
For example, when it has moved into `prelaunch`, you will likely see something like this:

```
1 Prelaunch minipool(s):

--------------------

Address:              <your minipool address>
Status updated:       2021-06-21, 01:14 +0000 UTC
Node fee:             20.000000%
Node deposit:         16.000000 ETH
RP ETH assigned:      2021-06-21, 01:14 +0000 UTC
RP deposit:           16.000000 ETH

```

After this prelaunch period, your minipool will enter `staking` status and send the additional 16 ETH from the staking pool to the deposit contract.
This will be done by the `rocketpool_node` Docker container (or the `rp-node` service if you used the Native setup) - if, for some reason, you are taking abnormally long to enter `staking` status, looking at the logs for this container / service will likely tell you what's wrong.
You can check these logs with the `rocketpool service logs node` command (or `/srv/rocketpool/node_log.sh` on Native mode setups).

Running `rocketpool minipool status` will then show something like this:

```
$ rocketpool minipool status

1 Staking minipool(s):

--------------------

Address:              <your minipool address>
Status updated:       2021-06-21, 01:19 +0000 UTC
Node fee:             20.000000%
Node deposit:         16.000000 ETH
RP ETH assigned:      2021-06-21, 01:19 +0000 UTC
RP deposit:           16.000000 ETH
Validator pubkey:     <your eth2 validator address>
Validator index:      0
Validator seen:       no

--------------------
```

Once the Beacon Chain accepts both of the 16 ETH deposits (one from you and one from the staking pool), your validator will enter the Beacon Chain queue where it will wait for its turn to become activated and start staking.

::: tip NOTE
If you did a 32 ETH deposit, you will be refunded 16 ETH at this stage which you can claim using `rocketpool minipool refund`.
:::

At this point, you're done!
Congratulations!
You have officially created a validator with Rocket Pool!

Have a look at the next sections in Monitoring and Maintenance to learn how to watch your validator's performance and health over time.


## Creating Multiple Minipools

Conveniently, your Rocket Pool node is capable of hosting as many minipools as you want.
You **do not** need to create a new node for each minipool.

If you would like to make a second (or third, or fourth...) minipool for your node, all you need to do is run `rocketpool node deposit` again.
Note that you may need to stake more RPL first to maintain an overall collateral level of at least 10% before you do this.
Also, you won't be able to reuse an old vanity address salt - you'll need to search for another unique one for each of your minipools.