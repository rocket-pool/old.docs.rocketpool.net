# [WIP] Javascript

## Introduction

The Rocket Pool JavaScript library is the primary means of interaction with the Rocket Pool network for users and applications. It is used by applications such as the Rocket Pool website to retrieve information about the network and facilitate user interaction. It provides wrapper methods which load the Rocket Pool contracts with web3.js and abstractions to use many of their features easily.

This guide assumes familiarity with JavaScript and provides all code samples as JS.


## Getting Started

### Installation
The Rocket Pool JavaScript library can be added to your application via NPM, and requires [web3.js](https://github.com/ethereum/web3.js/):

``` shell
npm install github:rocket-pool/rocketpool-js
npm install web3
```

### Initialization

The library must be initialized with a web3 instance and a [Truffle](https://github.com/trufflesuite/truffle) `RocketStorage` contract artifact:
``` javascript
import Web3 from 'web3';
import RocketPool from 'rocketpool';
import RocketStorage from './contracts/RocketStorage.json';

const web3 = new Web3('http://localhost:8545');

const rp = new RocketPool(web3, RocketStorage);
```

### Usage
The Rocket Pool library is divided into several modules, each for interacting with a different aspect of the network:

* `contracts`: Handles dynamic loading of the Rocket Pool contracts
* `deposit`: Handles user deposits
* `minipool`: Manages minipools in the Rocket Pool network
* `network`: Handles miscellaneous network functionality
* `node`: Manages the nodes making up the Rocket Pool network
* `settings.deposit`: Provides information on user deposit settings
* `settings.minipool`: Provides information on minipool settings
* `settings.network`: Provides information on network settings
* `settings.node`: Provides information on smart node settings
* `tokens.neth`: Manages nETH token interactions
* `tokens.reth`: Manages rETH token interactions

All methods typically return promises due to the asynchronous nature of working with the Ethereum network. Getters return promises which resolve to their value, while mutators (methods which send transactions) return promises which resolve to a transaction receipt. Mutators also accept a transaction options object, and an `onConfirmation` callback handler to handle specific confirmation numbers on transactions.

When using the Rocket Pool library in your project, you may handle the promises returned in the traditional way, or use async/await syntax if supported, e.g.:
``` solidity
rp.contracts.get('rocketDepositPool')
    .then(rocketDepositPool => rocketDepositPool.methods.getBalance().call())
    .then(balance => { console.log(balance); });
```
or:
``` solidity
let rocketDepositPool = await rp.contracts.get('rocketDepositPool');
let balance = await rocketDepositPool.methods.getBalance().call();
console.log(balance);
```

## Contracts
### Overview
The `contracts` module loads Rocket Pool contract ABIs and addresses from `RocketStorage`, where all network contracts are registered. Contract ABIs and addresses are loaded from the chain, the ABIs are decompressed and decoded, and then web3 contract instances are created from them. This is performed dynamically because Rocket Pool contracts can be upgraded and their ABIs and addresses may change.

This module is used by other library modules internally, and generally does not need to be used directly. However, it is exposed publicly for when direct access to web3 contract instances is desired, or the library wrapper methods are insufficient.

### Loading Contracts & ABIs
Network contracts can be loaded via the `contracts.get()` method, which accepts either a single contract name as a string, or a list of contract names as an array of strings. If a single contract name is passed, this method returns a promise resolving to a web3 contract instance. If a list of contract names is passed, it returns a promise resolving to an array of web3 contract instances, in the same order.

Contract addresses and ABIs can be loaded in a similar fashion via the `contracts.address()` and `contracts.abi()` methods, which accept either a single contract name, or a list of names, to retrieve data for.

### Creating Contract Instances
Some network contracts, such as `RocketMinipool`, have multiple instances deployed at a number of different addresses. To create an instance of one of these contracts, use the `contracts.make(name, address)` method. It accepts the name of the contract and the address of the specific instance required, both as strings, and returns a promise resolving to a web3 contract instance.

### Alternate Contract Versions
When Rocket Pool network contracts are upgraded, old versions remain on the chain and can still be accessed if required. A “contract version set”, consisting of all versions of a contract by name, can be loaded with the `contracts.versions(name)` method. This method accepts the name of the contract to load, and returns a promise resolving to the version set object.

Contract version sets are primarily used for accessing old event data. They provide the following methods:

* `versionSet.current()`: Returns the current version of the contract
* `versionSet.first()`: Returns the first version of the contract deployed
* `versionSet.at(index)`: Returns the version of the contract at the specified version index (0 = first version)
* `versionSet.getPastEvents(eventName, options)`: As per [web3’s contract.getPastEvents](https://web3js.readthedocs.io/en/v1.2.1/web3-eth-contract.html#getpastevents), but returns a promise resolving to the events for all versions of the contract


## Deposit

### Overview
The `deposit` module is used to get the current deposit pool balance, make user deposits, and assign deposited ETH to minipools.

### Methods
* `deposit.getBalance()`: Get the current balance of the deposit pool in wei; returns `Promise<string>`
* `deposit.deposit(options, onConfirmation)`: Make a user deposit; returns `Promise<TransactionReceipt>`
* `deposit.assignDeposits(options, onConfirmation)`: Assign deposited ETH to queued minipools; returns `Promise<TransactionReceipt>`

## Minipool

### Overview
The `minipool` module loads general minipool data from the chain. It also provides minipool contract functionality (which manages individual minipools and loads their data).

### Data Types
`MinipoolDetails` objects contain various globally registered details of a minipool:
```
MinipoolDetails {
    address                 // The registered address of the minipool
    exists                  // Whether the minipool exists
    pubkey                  // The minipool's associated validator pubkey
    withdrawalTotalBalance  // The minipool's total validator balance at withdrawal
    withdrawalNodeBalance   // The node's share of the validator balance at withdrawal
    withdrawable            // Whether the minipool has become withdrawable yet
    withdrawalProcessed     // Whether the minipool's withdrawal has been processed yet
}
```
`StatusDetails` objects define the current status of a minipool:
```
StatusDetails {
    status                  // The minipool's current status code
    block                   // The block at which the status was last changed
    time                    // The timestamp at which the status was last changed
}
```
`NodeDetails` objects contain details about the node owning a minipool:
```
NodeDetails {
    address                 // The address of the node owning the minipool
    fee                     // The node commission rate as a fraction of 1
    depositBalance          // The balance of ETH deposited by the node
    refundBalance           // The balance of ETH available for refund to the node
    depositAssigned         // Whether the node's ETH deposit has been assigned
}
```
`UserDetails` objects contain details about user ETH assigned to a minipool:
```
UserDetails {
    depositBalance          // The balance of ETH from Rocket Pool user deposits
    depositAssigned         // Whether user-deposited ETH has been assigned
    depositAssignedTime     // The timestamp at which user-deposited ETH was assigned
}
```
`StakingDetails` objects contain details about a minipool’s balance during staking:
```
StakingDetails {
    startBalance            // The minipool's balance when shared staking began
    endBalance              // The minipool's balance when shared staking finished
}
```
`MinipoolContract` objects wrap a web3 contract instance and provide methods for managing a minipool and retrieving its information.

### Methods
Minipool Module:

* `minipool.getMinipools()`: Get the details of all minipools in the network; returns `Promise<MinipoolDetails[]>`
* `minipool.getMinipoolAddresses()`: Get the addresses of all minipools in the network; returns `Promise<string[]>`
* `minipool.getNodeMinipools(nodeAddress)`: Get the details of all minipools owned by a node; returns `Promise<MinipoolDetails[]>`
* `minipool.getNodeMinipoolAddresses(nodeAddress)`: Get the addresses of all minipools owned by a node; returns `Promise<string[]>`
* `minipool.getMinipoolDetails(address)`: Get the details of the specified minipool; returns `Promise<MinipoolDetails>`
* `minipool.getMinipoolCount()`: Get the total number of minipools in the network; returns `Promise<number>`
* `minipool.getMinipoolAt(index)`: Get the address of a minipool in the network by index; returns `Promise<string>`
* `minipool.getNodeMinipoolCount(nodeAddress)`: Get the total number of minipools owned by a node; returns `Promise<number>`
* `minipool.getNodeMinipoolAt(nodeAddress, index)`: Get the address of a minipool owned by a node by index; returns `Promise<string>`
* `minipool.getMinipoolByPubkey(validatorPubkey)`: Get the address of a minipool by its validator pubkey; returns `Promise<string>`
* `minipool.getMinipoolExists(address)`: Check whether the specified minipool exists; returns `Promise<boolean>`
* `minipool.getMinipoolPubkey(address)`: Get the specified minipool’s validator pubkey; returns `Promise<string>`
* `minipool.getMinipoolWithdrawalTotalBalance(address)`: Get the specified minipool’s total validator balance at withdrawal in wei; returns `Promise<string>`
* `minipool.getMinipoolWithdrawalNodeBalance(address)`: Get the node’s share of the specified minipool’s validator balance at withdrawal in wei; returns `Promise<string>`
* `minipool.getMinipoolWithdrawable(address)`: Get whether the specified minipool has become withdrawable yet; returns `Promise<boolean>`
* `minipool.getMinipoolWithdrawalProcessed(address)`: Get whether the specified minipool’s withdrawal has been processed yet; returns `Promise<boolean>`
* `minipool.getQueueTotalLength()`: Get the total length of the minipool queue; returns `Promise<number>`
* `minipool.getQueueTotalCapacity()`: Get the total capacity of the minipool queue in wei; returns `Promise<string>`
* `minipool.getQueueEffectiveCapacity()`: Get the capacity of the minipool queue, ignoring “empty” minipools, in wei; returns `Promise<string>`
* `minipool.getQueueNextCapacity()`: Get the capacity of the next available minipool in the queue in wei; returns `Promise<string>`
* `minipool.getMinipoolNodeRewardAmount(nodeFee, userDepositBalance, startBalance, endBalance)`: Get the node reward amount for a minipool by staking details in wei; returns `Promise<string>`
* `minipool.getMinipoolContract(address)`: Get a MinipoolContract instance for the specified minipool; returns `Promise<MinipoolContract>`
* `minipool.submitMinipoolWithdrawable(minipoolAddress, stakingStartBalance, stakingEndBalance, options, onConfirmation)`: Submit a minipool’s withdrawable status (watchtower nodes only); returns `Promise<TransactionReceipt>`

MinipoolContract:

* `MinipoolContract.getStatusDetails()`: Get the minipool’s status details; returns `Promise<StatusDetails>`
* `MinipoolContract.getStatus()`: Get the minipool’s status code; returns `Promise<number>`
* `MinipoolContract.getStatusBlock()`: Get the block at which the minipool’s status was last changed; returns `Promise<number>`
* `MinipoolContract.getStatusTime()`: Get the time at which the minipool’s status was last changed; returns `Promise<Date>`
* `MinipoolContract.getDepositType()`: Get the code for the type of node deposit assigned to the minipool; returns `Promise<number>`
* `MinipoolContract.getNodeDetails()`: Get the minipool’s node details; returns `Promise<NodeDetails>`
* `MinipoolContract.getNodeAddress()`: Get the address of the node owning the minipool; returns `Promise<string>`
* `MinipoolContract.getNodeFee()`: Get the node commission rate for the minipool as a fraction of 1; returns `Promise<number>`
* `MinipoolContract.getNodeDepositBalance()`: Get the balance of ETH deposited to the minipool by the node in wei; returns `Promise<string>`
* `MinipoolContract.getNodeRefundBalance()`: Get the balance of ETH available for refund to the node in wei; returns `Promise<string>`
* `MinipoolContract.getNodeDepositAssigned()`: Get whether the node deposit has been assigned to the minipool; returns `Promise<boolean>`
* `MinipoolContract.getUserDetails()`: Get the minipool’s user deposit details; returns `Promise<UserDetails>`
* `MinipoolContract.getUserDepositBalance()`: Get the balance of ETH deposited to the minipool by RP users in wei; returns `Promise<string>`
* `MinipoolContract.getUserDepositAssigned()`: Get whether RP user ETH has been assigned to the minipool; returns `Promise<boolean>`
* `MinipoolContract.getUserDepositAssignedTime()`: Get the time at which RP user ETH was assigned to the minipool; returns `Promise<Date>`
* `MinipoolContract.getStakingDetails()`: Get the minipool’s staking details; returns `Promise<StakingDetails>`
* `MinipoolContract.getStakingStartBalance()`: Get the minipool’s balance when staking begain in wei; returns `Promise<string>`
* `MinipoolContract.getStakingEndBalance()`: Get the minipool’s balance when staking finished in wei; returns `Promise<string>`
* `MinipoolContract.dissolve(options, onConfirmation)`: Dissolve the prelaunch minipool and return its ETH to the node & deposit pool; returns `Promise<TransactionReceipt>`
* `MinipoolContract.refund(options, onConfirmation)`: Refund ETH owned by the node to the node account; returns `Promise<TransactionReceipt>`
* `MinipoolContract.stake(validatorPubkey, validatorSignature, depositDataRoot, options, onConfirmation)`: Stake the prelaunch minipool with the specified validator details; returns `Promise<TransactionReceipt>`
* `MinipoolContract.withdraw(options, onConfirmation)`: Withdraw the final balance & rewards from the withdrawable minipool and close it; returns `Promise<TransactionReceipt>`
* `MinipoolContract.close(options, onConfirmation)`: Close the dissolved minipool and refund its node ETH balance; returns `Promise<TransactionReceipt>`

## Network
### Overview
The network module loads miscellaneous network data from the chain. It also provides some watchtower node functionality.

### Methods
* `network.getBalancesBlock()`: Get the block that current network balances are set for; returns `Promise<number>`
* `network.getTotalETHBalance()`: Get the total ETH value of the network in wei; returns `Promise<string>`
* `network.getStakingETHBalance()`: Get the total amount of actively staking ETH in the network in wei; returns `Promise<string>`
* `network.getTotalRETHSupply()`: Get the last recorded total rETH token supply in the network in wei; returns `Promise<string>`
* `network.getETHUtilizationRate()`: Get the proportion of ETH in the network which is actively staking, as a fraction of 1; returns `Promise<number>`
* `network.getNodeDemand()`: Get the current network node demand in wei; returns `Promise<string>`
* `network.getNodeFee()`: Get the current network node commission rate as a fraction of 1; returns `Promise<number>`
* `network.getNodeFeeByDemand(demand)`: Get the network node commission rate for a specified node demand value (in wei); returns `Promise<number>`
* `network.getWithdrawalBalance()`: Get the current ETH balance of the network withdrawal pool in wei; returns `Promise<string>`
* `network.getWithdrawalCredentials()`: Get the network-wide withdrawal credentials submitted for all validators; returns `Promise<string>`
* `network.submitBalances(block, totalEthWe, stakingEthWei, rethSupplyWei, options, onConfirmation)`: Submit network balances (watchtower nodes only); returns `Promise<TransactionReceipt>`
* `network.processWithdrawal(validatorPubkey, options, onConfirmation)`: Process a validator withdrawal (watchtower nodes only); returns `Promise<TransactionReceipt>`

## Node
### Overview
The `node` module manages nodes in the Rocket Pool network. It loads node data from the chain, and can be used to register new nodes and make node deposits.

### Data Types
`NodeDetails` objects define the various details of a node:
```
NodeDetails {
    address           // The address of the node
    exists            // Whether the node is registered in the network
    trusted           // Whether the node is a trusted (watchtower) node
    timezoneLocation  // The node's timezone location
}
```
### Methods
* `node.getNodes()`: Get the details of all nodes in the network; returns `Promise<NodeDetails[]>`
* `node.getNodeAddresses()`: Get the addresses of all nodes in the network; returns `Promise<string[]>`
* `node.getTrustedNodes()`: Get the details of all trusted nodes in the network; returns `Promise<NodeDetails[]>`
* `node.getTrustedNodeAddresses()`: Get the addresses of all trusted nodes in the network; returns `Promise<string[]>`
* `node.getNodeDetails(address)`: Get the details of the specified node; returns `Promise<NodeDetails>`
* `node.getNodeCount()`: Get the total number of nodes in the network; returns `Promise<number>`
* `node.getNodeAt(index)`: Get the address of a node in the network by index; returns `Promise<string>`
* `node.getTrustedNodeCount()`: Get the total number of trusted nodes in the network; returns `Promise<number>`
* `node.getTrustedNodeAt(index)`: Get the address of a trusted node in the network by index; returns `Promise<string>`
* `node.getNodeExists(address)`: Check whether the specified node is registered; returns `Promise<boolean>`
* `node.getNodeTrusted(address)`: Check whether the specified node is trusted; returns `Promise<boolean>`
* `node.getNodeTimezoneLocation(address)`: Get the timezone location of the specified node; returns `Promise<string>`
* `node.registerNode(timezoneLocation, options, onConfirmation)`: Register the calling address as a node in the network; returns `Promise<TransactionReceipt>`
* `node.setTimezoneLocation(timezoneLocation, options, onConfirmation)`: Update the timezone location of the calling node; returns `Promise<TransactionReceipt>`
* `node.deposit(minimumNodeFee, options, onConfirmation)`: Make a deposit to create a minipool, with a minimum acceptable commission rate; returns `Promise<TransactionReceipt>`

## Settings
### Overview
The `settings` module loads Rocket Pool network settings data from the chain, and is divided into 4 submodules:

* `settings.deposit`: Loads information on user deposit settings
* `settings.minipool`: Loads information on minipool settings
* `settings.network`: Loads information on network settings
* `settings.node`: Loads information on smart node settings

### Methods
#### Deposit Settings:

* `settings.deposit.getDepositEnabled()`: Get whether user deposits are currently enabled; returns `Promise<boolean>`
* `settings.deposit.getAssignDepositsEnabled()`: Get whether assignment of deposits to minipools is currently enabled; returns `Promise<boolean>`
* `settings.deposit.getMinimumDeposit()`: Get the minimum deposit amount in wei; returns `Promise<string>`
* `settings.deposit.getMaximumDepositPoolSize()`: Get the maximum size of the deposit pool in wei; returns `Promise<string>`
* `settings.deposit.getMaximumDepositAssignments()`: Get the maximum number of deposit assignments to perform per transaction; returns `Promise<number>`
#### Minipool Settings:

* `settings.minipool.getLaunchBalance()`: Get the required balance of a minipool for launch in wei; returns `Promise<string>`
* `settings.minipool.getFullDepositNodeAmount()`: Get the amount of eth in wei to be deposited by a node for a “full” deposit; returns `Promise<string>`
* `settings.minipool.getHalfDepositNodeAmount()`: Get the amount of eth in wei to be deposited by a node for a “half” deposit; returns `Promise<string>`
* `settings.minipool.getEmptyDepositNodeAmount()`: Get the amount of eth in wei to be deposited by a node for an “empty” deposit; returns `Promise<string>`
* `settings.minipool.getFullDepositUserAmount()`: Get the amount of eth in wei to be deposited by RP users for a “full” deposit; returns `Promise<string>`
* `settings.minipool.getHalfDepositUserAmount()`: Get the amount of eth in wei to be deposited by RP users for a “half” deposit; returns `Promise<string>`
* `settings.minipool.getEmptyDepositUserAmount()`: Get the amount of eth in wei to be deposited by RP users for an “empty” deposit; returns `Promise<string>`
* `settings.minipool.getSubmitWithdrawableEnabled()`: Get whether submission of minipool withdrawable status is enabled; returns `Promise<boolean>`
* `settings.minipool.getLaunchTimeout()`: Get the timeout period in blocks for minipools to launch within; returns `Promise<number>`
* `settings.minipool.getWithdrawalDelay()`: Get the delay in blocks before nodes can withdraw nETH from minipools; returns `Promise<number>`

#### Network Settings:

* `settings.network.getNodeConsensusThreshold()`: Get the threshold of watchtower node submissions for consensus as a fraction of 1; returns `Promise<number>`
* `settings.network.getSubmitBalancesEnabled()`: Get whether network balance submission is enabled; returns `Promise<boolean>`
* `settings.network.getSubmitBalancesFrequency()`: Get the frequency at which network balances are submitted in blocks; returns `Promise<number>`
* `settings.network.getProcessWithdrawalsEnabled()`: Get whether processing validator withdrawals is enabled; returns `Promise<boolean>`
* `settings.network.getMinimumNodeFee()`: Get the minimum node commission rate as a fraction of 1; returns `Promise<number>`
* `settings.network.getTargetNodeFee()`: Get the target node commission rate as a fraction of 1; returns `Promise<number>`
* `settings.network.getMaximumNodeFee()`: Get the maximum node commission rate as a fraction of 1; returns `Promise<number>`
* `settings.network.getNodeFeeDemandRange()`: Get the range of node demand values in wei to base fee calculations on; returns `Promise<string>`
* `settings.network.getTargetRethCollateralRate()`: Get the target rETH contract collateral rate as a fraction of 1; returns `Promise<number>`

#### Node Settings:

* `settings.node.getRegistrationEnabled()`: Get whether node registrations are currently enabled; returns `Promise<boolean>`
* `settings.node.getDepositEnabled()`: Get whether node deposits are currently enabled; returns `Promise<boolean>`

## Tokens
### Overview
The `tokens` module manages the various Rocket Pool tokens, and is broken down into two submodules:

* `tokens.neth`: Manages rETH token interactions
* `tokens.reth`: Manages rETH token interactions
Each submodule shares common methods for interacting with its underlying ERC-20 token. Mutator methods are restricted to their respective accounts.

### Methods
#### All Tokens:

* `tokens.[token].balanceOf(account)`: Get the token balance of the specified account (address) in wei; returns `Promise<string>`
* `tokens.[token].allowance(account, spender)`: Get the allowance of the specified account, for the specified spender (addresses) in wei; returns `Promise<string>`
* `tokens.[token].transfer(to, amount, options, onConfirmation)`: Transfer the specified amount of tokens in wei to the ‘to’ address; returns `Promise<TransactionReceipt>`
* `tokens.[token].approve(spender, amount, options, onConfirmation)`: Approve an allowance of the specified amount in wei for the specified spender (address); returns `Promise<TransactionReceipt>`
* `tokens.[token].transferFrom(from, to, amount, options, onConfirmation)`: Transfer the specified amount of tokens in wei from the ‘from’ address to the ‘to’ address; returns `Promise<TransactionReceipt>`
#### nETH Token:

* `tokens.neth.burn(amount, options, onConfirmation)`: Burn the specified amount of nETH in wei for ETH; returns `Promise<TransactionReceipt>`
#### rETH Token:

* `tokens.reth.getEthValue(rethAmount)`: Get the amount of ETH in wei backing an amount of rETH in wei; returns `Promise<string>`
* `tokens.reth.getRethValue(ethAmount)`: Get the amount of rETH in wei backed by an amount of ETH in wei; returns `Promise<string>`
* `tokens.reth.getExchangeRate()`: Get the amount of ETH backing 1 rETH; returns `Promise<number>`
* `tokens.reth.getTotalCollateral()`: Get the total amount of ETH collateral available for exchage in wei; returns `Promise<string>`
* `tokens.reth.getCollateralRate()`: Get the proportion of rETH backed by ETH collateral in the contract as a fraction of 1; returns `Promise<number>`
* `tokens.reth.burn(amount, options, onConfirmation)`: Burn the specified amount of rETH in wei for ETH; returns `Promise<TransactionReceipt>`

