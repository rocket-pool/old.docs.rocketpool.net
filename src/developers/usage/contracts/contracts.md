# Smart Contracts

## Introduction

The Rocket Pool [Smart Contracts](https://www.ethereum.org/learn/#smart-contracts) form the foundation of the Rocket Pool protocol. They are the base layer of infrastructure which all other elements of the network are built on top of, including the JavaScript library, the Smart Node software stack, and all web or application interfaces.

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

Because of Rocket Pool's architecture, the addresses of other contracts should not be used directly but retrieved from the blockchain before use. Network upgrades may have occurred since the previous interaction, resulting in outdated addresses. `RocketStorage` can never change address, so it is safe to store a reference to it.

Other contract instances can be created using the appropriate interface taken from the [Rocket Pool repository](https://github.com/rocket-pool/rocketpool/tree/master/contracts/interface), e.g.:

``` solidity
import "RocketStorageInterface.sol";
import "RocketDepositPoolInterface.sol";

contract Example {

    RocketStorageInterface rocketStorage = RocketStorageInterface(0);

    constructor(address _rocketStorageAddress) public {
        // It is safe to store reference to RocketStorage
        rocketStorage = RocketStorageInterface(_rocketStorageAddress);
    }

    exampleMethod() public {
        // All other contracts should be queried each time they are used
        address rocketDepositPoolAddress = rocketStorage.getAddress(keccak256(abi.encodePacked("contract.address", "rocketDepositPool")));
        RocketDepositPoolInterface rocketDepositPool = RocketDepositPoolInterface(rocketDepositPoolAddress);
        ...
    }

}
```
The Rocket Pool contracts, as defined in `RocketStorage`, are:
* `rocketVault` - Stores ETH held by network contracts (internal, not upgradeable)
* `rocketAuctionManager` - Handles the auctioning of RPL slashed from node operators' stake
* `rocketDepositPool` - Accepts user-deposited ETH and handles assignment to minipools
* `rocketMinipoolManager` - Creates & manages all minipools in the network
* `rocketMinipoolQueue` - Organises minipools into a queue for ETH assignment
* `rocketMinipoolStatus` - Handles minipool status updates from watchtower nodes
* `rocketMinipoolPenalty` - Stores penalties applied to node operators by the oDAO
* `rocketNetworkBalances` - Handles network balance updates from watchtower nodes
* `rocketNetworkFees` - Calculates node commission rates based on network node demand
* `rocketNetworkPrices` - Handles RPL price and effective stake updates from watchtower nodes
* `rocketNetworkWithdrawal` - Handles processing of beacon chain validator withdrawals
* `rocketRewardsPool` - Handles the distribution of rewards to each rewards contract
* `rocketClaimDAO` - Handles the claiming of rewards for the pDAO
* `rocketClaimNode` - Handles the claiming of rewards for node operators
* `rocketClaimTrustedNode` - Handles the claiming of rewards for the oDAO
* `rocketNodeDeposit` - Handles node deposits for minipool creation
* `rocketNodeManager` - Registers & manages all nodes in the network
* `rocketNodeStaking` - Handles node staking and unstaking
* `rocketDAOProposal` - Contains common oDAO and pDAO functionality
* `rocketDAONodeTrusted` - Handles oDAO related proposals
* `rocketDAONodeTrustedProposals` - Contains oDAO proposal functionality (internal)
* `rocketDAONodeTrustedActions` - Contains oDAO action functionality (internal)
* `rocketDAONodeTrustedUpgrade` - Handles oDAO contract upgrade functionality (internal)
* `rocketDAONodeTrustedSettingsMembers` - Handles settings relating to trusted members
* `rocketDAONodeTrustedSettingsProposals` - Handles settings relating to proposals
* `rocketDAONodeTrustedSettingsMinipool` - Handles settings relating to minipools
* `rocketDAOProtocol` - Handles pDAO related proposals
* `rocketDAOProtocolProposals` - Handles pDAO proposal functionality (internal)
* `rocketDAOProtocolActions` - Handles pDAO action functionality (internal)
* `rocketDAOProtocolSettingsInflation` - Handles settings related to inflation
* `rocketDAOProtocolSettingsRewards` - Handles settings related to rewards
* `rocketDAOProtocolSettingsAuction` - Handles settings related to auction system
* `rocketDAOProtocolSettingsNode` - Handles settings related to node operators
* `rocketDAOProtocolSettingsNetwork` - Handles settings related to the network
* `rocketDAOProtocolSettingsDeposit` - Handles settings related to deposits
* `rocketDAOProtocolSettingsMinipool` - Handles settings related to minipools
* `rocketTokenRETH` - The rETH token contract (not upgradeable)
* `rocketTokenRPL` - The RPL token contract (not upgradeable)
* `addressQueueStorage` - A utility contract (internal)
* `addressSetStorage` - A utility contract (internal)

Contracts marked as “internal” do not provide methods which are accessible to the general public, and so are generally not useful for extension. For information on specific contract methods, consult their interfaces in the [Rocket Pool repository](https://github.com/rocket-pool/rocketpool/tree/master/contracts/interface).

## Deposits

The main reason for extending the Rocket Pool network is to implement custom deposit logic which funnels user deposits into the deposit pool. For example, a fund manager may wish to stake their users’ ETH in Rocket Pool via their own smart contracts, and abstract the use of Rocket Pool itself away from their users.

Note: the `RocketDepositPool` contract address should not be hard-coded in your contracts, but retrieved from `RocketStorage` dynamically. See [Interacting With Rocket Pool](#interacting-with-rocket-pool) for more details.

### Implementation

The following describes a basic example contract which forwards deposited ETH into Rocket Pool and minted rETH back to the caller:

``` solidity
import "RocketStorageInterface.sol";
import "RocketDepositPoolInterface.sol";
import "RocketETHTokenInterface.sol";

contract Example {

    RocketStorageInterface rocketStorage = RocketStorageInterface(0);
    mapping(address => uint256) balances;

    constructor(address _rocketStorageAddress) public {
        rocketStorage = RocketStorageInterface(_rocketStorageAddress);
    }

    deposit() external payable {
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
        // Update user's balance
        balances[msg.sender] += rethMinted;
    }
    
    // After 24 hours it's possible to transfer the tokens
    withdraw() external {
        // Load contracts
        address rocketETHTokenAddress = rocketStorage.getAddress(keccak256(abi.encodePacked("contract.address", "rocketETHToken")));
        RocketETHTokenInterface rocketETHToken = RocketETHTokenInterface(rocketETHTokenAddress);
        // Transfer rETH to caller
        uint256 balance = balances[msg.sender];
        balances[msg.sender] = 0;
        require(rocketETHToken.transfer(msg.sender, balance), "rETH was not transferred to caller");
    }

}
```
