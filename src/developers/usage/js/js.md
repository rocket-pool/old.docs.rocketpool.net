# Javascript

## Introduction

The Rocket Pool JavaScript library is the primary means of interaction with the Rocket Pool network for users and applications. It is used by applications such as the Rocket Pool website to retrieve information about the network and facilitate user interaction. It provides wrapper methods which load the Rocket Pool contracts with web3.js and abstractions to use many of their features easily.

This guide assumes familiarity with JavaScript and provides all code samples as JS.


## Getting Started

### Installation
The Rocket Pool JavaScript library can be added to your application via NPM, and requires [web3.js](https://github.com/ethereum/web3.js/):

``` shell
npm install @rocketpool/api
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

Alternatively you can also initialize it using a Contract Storage Address:
```
``` javascript
import Web3 from 'web3';
import RocketPool from 'rocketpool';

const web3 = new Web3('http://localhost:8545');
const RocketStorage = "0xd8Cd47263414aFEca62d6e2a3917d6600abDceB3"; // Current Testnet Storage Contract
const rp = new RocketPool(web3, RocketStorage);
```

### Usage
The Rocket Pool library is divided into several modules, each for interacting with a different aspect of the network:

* `auction`: Handles interactions with Auctions
* `contracts`: Handles dynamic loading of the Rocket Pool contracts
* `deposit`: Handles user deposits
* `dao`: Handles DAO related interactions
* `minipool`: Manages minipools in the Rocket Pool network
* `network`: Handles miscellaneous network functionality
* `node`: Manages the nodes making up the Rocket Pool network
* `rewards`: Handles interactions with rewards
* `settings`: Provides information on settings
* `tokens`: Manages token interactions
* `vault`: Handles interactions with the vault

All methods typically return promises due to the asynchronous nature of working with the Ethereum network. Getters return promises which resolve to their value, while mutators (methods which send transactions) return promises which resolve to a transaction receipt. Mutators also accept a transaction options object, and an `onConfirmation` callback handler to handle specific confirmation numbers on transactions.

When using the Rocket Pool library in your project, you may handle the promises returned in the traditional way, or use async/await syntax if supported, e.g.:
``` javascript
rp.contracts.get('rocketDepositPool')
    .then(rocketDepositPool => rocketDepositPool.methods.getBalance().call())
    .then(balance => { console.log(balance); });
```
or:
``` javascript
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

## API Reference

For more information and examples please review the [API Reference.](../../api/js/RocketPool.html#constructors)
