# :memo: Smart Contracts

## Introduction

The Rocket Pool Smart Contracts form the foundation of the Rocket Pool protocol. They are the base layer of infrastructure which all other elements of the network are built on top of, including the JavaScript library, the Smart Node software stack, and all web or application interfaces.

Direct interaction with the contracts is usually not necessary, and is facilitated through the use of other software (such as the JavaScript library). This section provides a detailed description of the contract design, and information on how to build on top of Rocket Pool for developers wishing to extend it. All code examples are given as Solidity `v0.7.6`.

### Contract Design

The Rocket Pool network contracts are built with upgradability in mind, using a hub-and-spoke architecture. The central hub of the network is the `RocketStorage` contract, which is responsible for storing the state of the entire protocol. This is implemented through the use of maps for key-value storage, and getter and setter methods for reading and writing values for a key.

The `RocketStorage` contract also stores the addresses of all other network contracts (keyed by name), and restricts data modification to those contracts only. Using this architecture, the protocol can be upgraded by deploying new versions of an existing contract, and updating its address in storage. This gives Rocket Pool the flexibility required to fix bugs or implement new features to improve the protocol.

### Interacting With Rocket Pool

To begin interacting with the Rocket Pool network, first create an instance of the `RocketStorage` contract using its [interface](https://github.com/rocket-pool/rocketpool/blob/master/contracts/interface/RocketStorageInterface.sol):

``` solidity
import "RocketStorageInterface.sol";

contract Example {

    RocketStorageInterface rocketStorage = RocketStorageInterface(0);

    constructor(address _rocketStorageAddress) public {
        rocketStorage = RocketStorageInterface(_rocketStorageAddress);
    }

}
```
The above constructor should be called with the address of the `RocketStorage` contract on the appropriate network.

Because of Rocket Pool's architecture, the addresses of other contracts should not be used directly but retrieved from the blockchain before use. Network upgrades may have occurred since the previous interaction, resulting in outdated addresses.

Other contract instances can be created using the appropriate interface taken from the [Rocket Pool repository](https://github.com/rocket-pool/rocketpool/tree/master/contracts/interface), e.g.:

``` solidity
import "RocketStorageInterface.sol";
import "RocketDepositPoolInterface.sol";

contract Example {

    RocketStorageInterface rocketStorage = RocketStorageInterface(0);

    constructor(address _rocketStorageAddress) public {
        rocketStorage = RocketStorageInterface(_rocketStorageAddress);
    }

    exampleMethod() public {
        address rocketDepositPoolAddress = rocketStorage.getAddress(keccak256(abi.encodePacked("contract.address", "rocketDepositPool")));
        RocketDepositPoolInterface rocketDepositPool = RocketDepositPoolInterface(rocketDepositPoolAddress);
        ...
    }

}
```
The Rocket Pool contracts, as defined in `RocketStorage`, are:
* `rocketRole` - Handles assignment of privileged admin roles (internal)
* `rocketVault` - Stores ETH held by network contracts (internal, not upgradeable)
* `rocketUpgrade` - Provides upgrade functionality for the network (internal)
* `rocketDepositPool` - Accepts user-deposited ETH and handles assignment to minipools
* `rocketMinipoolFactory` - Creates minipool contract instances (internal)
* `rocketMinipoolManager` - Creates & manages all minipools in the network
* `rocketMinipoolQueue` - Organises minipools into a queue for ETH assignment
* `rocketMinipoolStatus` - Handles minipool status updates from watchtower nodes
* `rocketNetworkBalances` - Handles network balance updates from watchtower nodes
* `rocketNetworkFees` - Calculates node commission rates based on network node demand
* `rocketNetworkWithdrawal` - Handles processing of beacon chain validator withdrawals
* `rocketNodeDeposit` - Handles node deposits for minipool creation
* `rocketNodeManager` - Registers & manages all nodes in the network
* `rocketDepositSettings` - Provides network settings relating to deposits
* `rocketMinipoolSettings` - Provides network settings relating to minipools
* `rocketNetworkSettings` - Provides miscellaneous network settings
* `rocketNodeSettings` - Provides network settings relating to nodes
* `rocketETHToken` - The rETH token contract (not upgradeable)
* `rocketNodeETHToken` - The nETH token contract (not upgradeable)
* `addressQueueStorage` - A utility contract (internal)
* `addressSetStorage` - A utility contract (internal)

Contracts marked as “internal” do not provide methods which are accessible to the general public, and so are generally not useful for extension. For information on specific contract methods, consult their interfaces in the [Rocket Pool repository](https://github.com/rocket-pool/rocketpool/tree/master/contracts/interface).

## Deposits

The main reason for extending the Rocket Pool network is to implement custom deposit logic which funnels user deposits into the deposit pool. For example, a fund manager may wish to stake their users’ ETH in Rocket Pool via their own smart contracts, and abstract the use of Rocket Pool itself away from their users.

Note: the `RocketDepositPool` contract address should not be hard-coded in your contracts, but retrieved from `RocketStorage` dynamically. See [Interacting With Rocket Pool](http://localhost:8080/documentation/smart-contracts.html#interacting-with-rocket-pool) for more details.

### Implementation

The following describes a basic example contract which forwards deposited ETH into Rocket Pool and minted rETH back to the caller:

``` solidity
import "RocketStorageInterface.sol";
import "RocketDepositPoolInterface.sol";
import "RocketETHTokenInterface.sol";

contract Example {

    RocketStorageInterface rocketStorage = RocketStorageInterface(0);

    constructor(address _rocketStorageAddress) public {
        rocketStorage = RocketStorageInterface(_rocketStorageAddress);
    }

    receive() external payable {
        // Check deposit amount
        require(msg.value > 0, "Invalid deposit amount");
        // Load contracts
        address rocketDepositPoolAddress = rocketStorage.getAddress(keccak256(abi.encodePacked("contract.address", "rocketDepositPool")));
        RocketDepositPoolInterface rocketDepositPool = RocketDepositPoolInterface(rocketDepositPoolAddress);
        address rocketETHTokenAddress = rocketStorage.getAddress(keccak256(abi.encodePacked("contract.address", "rocketETHToken")));
        RocketETHTokenInterface rocketETHToken = RocketETHTokenInterface(rocketETHTokenAddress);
        // Forward deposit to RP & get amount of rETH minted
        uint256 rethBalance1 = rocketETHToken.balanceOf(address(this));
        rocketDepositPool.deposit{value: msg.value}();
        uint256 rethBalance2 = rocketETHToken.balanceOf(address(this));
        require(rethBalance2 > rethBalance1, "No rETH was minted");
        uint256 rethMinted = rethBalance2 - rethBalance1;
        // Transfer rETH to caller
        require(rocketETHToken.transfer(msg.sender, rethMinted), "rETH was not transferred to caller");
    }

}
```




*TODO:* Finish porting rest of: [old docs for this section](https://rocket-pool.readthedocs.io/en/latest/contracts/design.html#architecture)

