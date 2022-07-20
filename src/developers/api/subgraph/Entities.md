---
sidebar_position: 2
title: Subgraph Entities
---

# Entities
- RocketPoolProtocol
- Staker 
- RocketETHTransaction
- NetworkStakerBalanceCheckpoint
- StakerBalanceCheckpoint 
- Node 
- NodeRPLStakeTransaction 
- RPLRewardInterval 
- RPLRewardClaim 
- NetworkNodeTimezone 
- NetworkNodeBalanceCheckpoint 
- NodeBalanceCheckpoint 
- Minipool 

## RocketPoolProtocol 
Description: Entity that represents the RocketPool protocol.

| Field | Type | Description |
| ----------- | ----------- | ----------- |
| id | ID! | The name of the RocketPool protocol. |
| stakersWithETHRewards | [Staker!]! | All stakers that have had ETH rewards while staking with RocketPool. |
| activeStakers | [Staker!]! | All stakers that currently have an rETH balance greater than 0. |
| stakers | [Staker!]! | All stakers that have ever held rETH. |
| lastNetworkStakerBalanceCheckPoint | NetworkStakerBalanceCheckpoint | Last known staker network balance checkpoint. |
| nodes | [Node!]! | All nodes that are registered with the RocketPool protocol. |
| nodeTimezones | [NetworkNodeTimezone!]! | All timezones associated with registered nodes. |
| lastRPLRewardInterval | RPLRewardInterval | Last known RPL reward interval. |
| lastNetworkNodeBalanceCheckPoint | NetworkNodeBalanceCheckpoint | Last known node network balance checkpoint. |
| networkNodeBalanceCheckpoints | [NetworkNodeBalanceCheckpoint!]! | All node network balance checkpoints for the RocketPool protocol. |

## Staker
Description: An address that is/was associated with an rETH balance.

| Field | Type | Description |
| ----------- | ----------- | ----------- |
| id | ID! | Address that holds rETH. |
| rETHBalance | BigInt! | Current rETH balance in WEI. |
| ethBalance | BigInt! | Current ETH balance in WEI. |
| totalETHRewards | BigInt! | Total ETH rewards (in WEI) accrued during the lifecycle of the staker.  |
| hasAccruedETHRewardsDuringLifecycle | Boolean! | Indicates if this staker has accrued ETH rewards at some point in time during its lifetime. |
| lastBalanceCheckpoint | StakerBalanceCheckpoint | The last known staker balance checkpoint for this staker. |
| block | BigInt! | Block number at which this staker first received rETH. |
| blockTime | BigInt! | Block timestamp at which this staker first received rETH. |

## RocketETHTransaction
Description: Tracks the mint, burn and transfers of rETH. 

| Field | Type | Description |
| ----------- | ----------- | ----------- |
| id | ID! | Composite key based on transaction hash of the triggered event and its log index. |
| from | Staker! | The address that was the original owner of the rETH. |
| amount | BigInt! | The rETH amount (in WEI) being transferred. |
| to | Staker! | The address that was the recipient of the rETH. |
| block | BigInt! | The block number of this transaction. |
| blockTime | BigInt! | The block timestamp of this transaction. |
| transactionHash | Bytes! | The transaction hash. |

## NetworkStakerBalanceCheckpoint
Description: Summarizes staker related balances at a specific block and timestamp.

| Field | Type | Description |
| ----------- | ----------- | ----------- |
| id | ID! | Composite key based on transaction hash of the triggered event and its log index. |
| previousCheckpointId | String | Id to the the previous checkpoint. |
| nextCheckpointId | String | Id to the the next checkpoint. |
| stakerETHActivelyStaking | BigInt! | Staker ETH (in WEI) balance (initial deposit + (ETH network rewards - average node fee)) on the beacon chain at this checkpoint.  |
| stakerETHWaitingInDepositPool | BigInt! | Staker ETH (in WEI) waiting in the deposit pool at this checkpoint. |
| stakerETHInRocketETHContract | BigInt! | Staker ETH (in WEI) in the RocketETH contract at this checkpoint. |
| stakerETHInProtocol | BigInt! | Staker ETH (in WEI) in RocketPool at this checkpoint. |
| totalStakerETHRewards | BigInt! | Staker ETH rewards (+/-) (in WEI) for all staker balance checkpoints up to this checkpoint. |
| totalStakersWithETHRewards | BigInt! | Stakers that have had ETH rewards (+/-) up to this checkpoint. |
| averageStakerETHRewards | BigInt! | Average staker ETH rewards (+/-) (in WEI) up to this checkpoint. |
| stakersWithAnRETHBalance | BigInt! | Total unique stakers that have an rETH balance (in WEI) greater than 0 at this checkpoint. |
| totalRETHSupply | BigInt! | Total rETH supply at this checkpoint. |
| rETHExchangeRate | BigInt! | Exchange rate of ETH:rETH (in WEI) at this checkpoint. |
| block | BigInt! | Block Number of this checkpoint. |
| blockTime | BigInt! | Block Timestamp of this checkpoint. |

## StakerBalanceCheckpoint
Description: Summarizes balances for a staker at a specific block and timestamp.

| Field | Type | Description |
| ----------- | ----------- | ----------- |
| id | ID! | Composite key consisting of the NetworkBalanceCheckpoint ID and the Staker ID. |
| stakerId | String! | Staker that is associated with this balance checkpoint. |
| networkStakerBalanceCheckpointId | String! | The network staker balance checkpoint that triggered the creation of this reward. |
| ethBalance | BigInt! | ETH balance (in WEI) of the staker of this checkpoint. |
| rETHBalance | BigInt! | rETH balance (in WEI) of the staker of this checkpoint. |
| totalETHRewards | BigInt! | Total ETH rewards (in WEI) up to this checkpoint. |
| block | BigInt! | Block Number of this checkpoint. |
| blockTime | BigInt! | Block Timestamp of this checkpoint. |

## Node
Description: A node address that was registered by a node operator.

| Field | Type | Description |
| ----------- | ----------- | ----------- |
| id | ID! | Address that is associated with a node on RocketPool. |
| timezone | NetworkNodeTimezone! | Current timezone for this node. |
| isOracleNode | Boolean! | Indicator that determines if a node is currently an oracle node or not. |
| oracleNodeRPLBond | BigInt | If this node is currently an oracle node, signifies the RPL bond of the ODAO node. |
| oracleNodeBlockTime | BigInt | Identifies the block time of the last ODAO state change for this node. |
| rplStaked | BigInt! | Current RPL staked. |
| effectiveRPLStaked | BigInt! | Current effective RPL staked. |
| totalRPLSlashed | BigInt! | Total RPL slashed since this node was registered with RocketPool. |
| totalODAORewardsClaimed | BigInt! | Total claim amount accrued via the ODAO reward claim contract. |
| totalNodeRewardsClaimed | BigInt! | Total claim amount accrued via the regular reward claim contract. |
| averageODAORewardClaim | BigInt! | Average reward claim this node has done via the ODAO reward claim contract. |
| averageNodeRewardClaim | BigInt! | Average reward claim this node has done via the regular reward claim contract. |
| odaoRewardClaimCount | BigInt! | Total amount of successfull RPL claims a node has done via the ODAO reward claim contract. |
| nodeRewardClaimCount | BigInt! | Total amount of successfull RPL claims a node has done via the regular node reward claim contract. |
| minimumEffectiveRPL | BigInt! | Current minimum RPL needed to collateralize all staking minipools of this node by the bare minimum. |
| maximumEffectiveRPL | BigInt! | Current maximum RPL needed to collateralize all staking minipools of this node to the absolute maximum. |
| queuedMinipools | BigInt! | Current queueud minipools |
| stakingMinipools | BigInt! | Current staking minipools |
| stakingUnbondedMinipools | BigInt! | Current unbonded staking minipools |
| withdrawableMinipools | BigInt! | Current withdrawable minipools. |
| totalFinalizedMinipools | BigInt! | Finalized minipools since this node was registered with RocketPool. |
| averageFeeForActiveMinipools | BigInt! | Average minipool fee for the active (NOT finalized or destroyed) minipools for this node operator. |
| lastNodeBalanceCheckpoint | NodeBalanceCheckpoint | Last node balance checkpoint for this node. |
| minipools | [Minipool!]! | Associated minipools for this node. |
| block | BigInt | Block number at which this node was first registered with the protocol. |
| blockTime | BigInt | Block timestamp at which this node was first registered with the protocol. |

## NodeRPLStakeTransaction
Description: Keeps track of the RPL staking transactions for a node.

| Field | Type | Description |
| ----------- | ----------- | ----------- |
| id | ID! | Composite key based on transaction hash of the triggered event and its log index. |
| node | Node! | Total number of nodes registered with this timezone. |
| amount | BigInt! | The total RPL amount that concerns this transaction. |
| ethAmount | BigInt! | The total ETH equivalent at the time of this transaction. |
| type | NodeRPLStakeTransactionType! | The type of RPL stake transaction. |
| block | BigInt! | On what block number did this transaction occur. |
| blockTime | BigInt! | At what time did this transaction occur. |

## RPLRewardInterval
Description: Represents an reward interval during which RPL can be claimed by different types of claimers.

| Field | Type | Description |
| ----------- | ----------- | ----------- |
| id | ID! | Composite key based on transaction hash of the triggered event and its log index. |
| previousIntervalId | String | ID to the previous. |
| nextIntervalId | String | ID to the next interval. |
| claimableRewards | BigInt! | The total RPL rewards that are claimable for this interval. |
| claimableRewardsFromPreviousInterval | BigInt! | The total RPL rewards from the previous interval that rolled over into this interval. |
| claimablePDAORewards | BigInt! | The total RPL rewards that are claimable for this interval via the PDAO reward claim contract. |
| claimableODAORewards | BigInt! | The total RPL rewards that are claimable for this interval via the ODAO reward claim contract. |
| claimableNodeRewards | BigInt! | The total RPL rewards that are claimable for this interval via the regula node reward claim contract. |
| totalRPLClaimed | BigInt! | The total RPL rewards claimed during this interval. |
| totalPDAORewardsClaimed | BigInt! | The total RPL rewards that have been claimed during this interval for the PDAO reward claim contract. |
| totalODAORewardsClaimed | BigInt! | The total RPL rewards that have been claimed during this interval for the ODAO reward claim contract. |
| totalNodeRewardsClaimed | BigInt! | The total RPL rewards that have been claimed during this interval for the regular node reward claim contract. |
| averageODAORewardClaim | BigInt! | Average RPL claim for the ODAO reward claim contract during this interval. |
| averageNodeRewardClaim | BigInt! | Average RPL claim for the regular node reward claim contract during this interval. |
| odaoRewardClaimCount | BigInt! | The total number of claims done for the ODAO reward claim contract during this interval. |
| nodeRewardClaimCount | BigInt! | The total number of claims done for the regular node reward claim contract during this interval. |
| rplRewardClaims | [RPLRewardClaim!]! | The total RPL rewards that were given out in this interval. |
| isClosed | Boolean! | Indicates if this interval is still active. |
| intervalStartTime | BigInt! | Indicates when this interval started. |
| intervalClosedTime | BigInt | Indicates when this interval ended. |
| intervalDuration | BigInt! | Indicates how long the interval was supposed to last. |
| intervalDurationActual | BigInt | Indicates how long the interval actually lasted. |
| block | BigInt! | On what block number was this interval created. |
| blockTime | BigInt! | At what time was this interval created. |

## RPLRewardClaim
Description: Represents an RPL reward that has been claimed by an address.

| Field | Type | Description |
| ----------- | ----------- | ----------- |
| id | ID! | Composite key based on transaction hash of the triggered event and its log index. |
| rplRewardIntervalId | String! | Id of the associated RPL reward interval parent. |
| claimer | String! | The claiming address. |
| claimerType | RPLRewardClaimerType! | The type of the claimer. |
| amount | BigInt! | The total RPL amount of this claim. |
| ethAmount | BigInt! | The total ETH equivalent (in WEI) at the time of this reward. |
| transactionHash | String! | The transaction hash associated with this claim. |
| block | BigInt! | The block number associated with this claim. |
| blockTime | BigInt! | The block timestamp associated with this claim. |

## NetworkNodeTimezone
Description: Represents the network timezones and the registered node(s).

| Field | Type | Description |
| ----------- | ----------- | ----------- |
| id | ID! | Timezone name. |
| totalRegisteredNodes | BigInt! | Total nodes registered with this timezone. |
| block | BigInt! | Block Number on which this timezone was created. |
| blockTime | BigInt! | Block Timestamp on which this timezone was created. |


## NetworkNodeBalanceCheckpoint
Description: Represents a network balance checkpoint for all nodes.

| Field | Type | Description |
| ----------- | ----------- | ----------- |
| id | ID! | Composite key based on transaction hash of the triggered event and its log index. |
| previousCheckpointId | String | Id to the the previous checkpoint. |
| nextCheckpointId | String | Id to the the next checkpoint. |
| nodesRegistered | BigInt! | Total number of registered RocketPool nodes at this checkpoint. |
| oracleNodesRegistered | BigInt! | Total number of oracle nodes registrered with RocketPool at this checkpoint. |
| rplStaked | BigInt! | RPL staked accross all nodes at this checkpoint. |
| effectiveRPLStaked | BigInt! | Effective RPL staked accross all nodes at this checkpoint. |
| minimumEffectiveRPL | BigInt! | Minimum RPL needed to collateralize the staking minipools by the absolute minimum at this checkpoint. |
| maximumEffectiveRPL | BigInt! | maximum RPL needed to collateralize the staking minipools to the absolute maximum at this checkpoint. |
| minimumEffectiveRPLNewMinipool | BigInt! | Minimum RPL needed to start a new minipool at this checkpoint. |
| maximumEffectiveRPLNewMinipool | BigInt! | Maximum RPL needed to start a new minipool at this checkpoint. |
| totalRPLSlashed | BigInt! | Total RPL slashed from all previous checkpoints up to this checkpoint. |
| totalODAORewardsClaimed | BigInt! | Total accrued rewards via the ODAO reward claim contract from all previous checkpoints up to this checkpoint. |
| totalNodeRewardsClaimed | BigInt! | Total accrued rewards via the regular node reward claim contract from all previous checkpoints up to this checkpoint. |
| averageTotalODAORewardsClaimed | BigInt! | Average total accrued rewards via the ODAO reward claim contract from all previous checkpoints up to this checkpoint. |
| averageODAORewardClaim | BigInt! | Average reward per claim via the ODAO reward claim contract from all previous checkpoints up to this checkpoint. |
| averageNodeTotalRewardsClaimed | BigInt! | Average total accrued rewards via the regular node reward claim contract from all previous checkpoints up to this checkpoint. |
| averageNodeRewardClaim | BigInt! | Average reward per claim via the regular node reward claim contract from all previous checkpoints up to this checkpoint. |
| rplPriceInETH | BigInt! | The RPL price in ETH at this checkpoint. |
| averageRplPriceInETH | BigInt! | The average RPL price in ETH up to this checkpoint. |
| queuedMinipools | BigInt! | Current queued minipools accross all nodes at this checkpoint. |
| stakingMinipools | BigInt! | Current staking minipools accross all nodes at this checkpoint. |
| stakingUnbondedMinipools | BigInt! | Current unbonded staking minipools accross all nodes at this checkpoint. |
| withdrawableMinipools | BigInt! | Withdrawable minipools accross all nodes at this checkpoint. |
| totalFinalizedMinipools | BigInt! | Total finalized minipools accross all nodes up to this checkpoint. |
| averageFeeForActiveMinipools | BigInt! | Average minipool fee accross all nodes and the active (NOT finalized or destroyed) minipools at this checkpoint. |
| newMinipoolFee | BigInt! | Fee to start a new minipool at this checkpoint. |
| block | BigInt! | Block number that was associated with this checkpoint. |
| blockTime | BigInt! | Block timestamp that was associated with this checkpoint. |

## NodeBalanceCheckpoint
Description: Represents a balance checkpoint for a node.

| Field | Type | Description |
| ----------- | ----------- | ----------- |
| id | ID! | Composite key consisting of the NetworkNodeBalanceCheckpoint ID and the Node ID. |
| Node | Node!  | Node that is associated with this checkpoint. |
| NetworkNodeBalanceCheckpoint | NetworkNodeBalanceCheckpoint! | Network node balance checkpoint associated with this checkpoint. |
| isOracleNode | Boolean! | Indicator that determines if a node is an oracle node or not at this checkpoint. |
| oracleNodeRPLBond | BigInt | If this node is an oracle node at this checkpoint then it signifies the RPL bond of the ODAO node. |
| oracleNodeBlockTime | BigInt | Identifies the block time of the last ODAO state change for this node at this checkpoint. |
| rplStaked | BigInt! | RPL staked at this checkpoint. |
| effectiveRPLStaked | BigInt! | Effective RPL staked at this checkpoint. |
| minimumEffectiveRPL | BigInt! | Minimum RPL needed to collateralize the staking minipools by the bare minimum at this checkpoint. |
| maximumEffectiveRPL | BigInt! | Maximum RPL needed to collateralize the staking minipools by the absolute maximum at this checkpoint. |
| totalRPLSlashed | BigInt! | Total RPL slashed up to this checkpoint. |
| totalODAORewardsClaimed | BigInt! | Total accrued rewards via the ODAO reward claim contract up to this checkpoint. |
| totalNodeRewardsClaimed | BigInt! | Total accrued claimed rewards via the regular node reward claim contract up to this checkpoint. |
| averageODAORewardClaim | BigInt! | Average rewards accrued via the ODAO reward claim contract for this node up to this checkpoint. |
| averageNodeRewardClaim | BigInt! | Average rewards accrued via the regular node reward claim contract for this node up to this checkpoint. |
| odaoRewardClaimCount | BigInt! | Total successfull claims a node has done via the ODAO reward claim contract up to this checkpoint. |
| nodeRewardClaimCount | BigInt! | Total successfull claims a node has done via the regular node reward claim contract up to this checkpoint. |
| queuedMinipools | BigInt! | Queued minipools for this node at this checkpoint. |
| stakingMinipools | BigInt! | Staking minipools for this node at this checkpoint. |
| stakingUnbondedMinipools | BigInt! | Unbonded staking minipools for this node at this checkpoint. |
| withdrawableMinipools | BigInt! | Withdrawable minipools accross for this node at this checkpoint. |
| totalFinalizedMinipools | BigInt! | Total Finalized minipools for this node up to this checkpoint. |
| averageFeeForActiveMinipools | BigInt! | Average minipool fee for this node and the active (NOT finalized or destroyed) minipools at this checkpoint. |
| block | BigInt! | Block number that was associated with this checkpoint. |
| blockTime | BigInt! | Block timestamp that was associated with this checkpoint. |

## Minipool
Description: Represents a minipool for a node.

| Field | Type | Description |
| ----------- | ----------- | ----------- |
| id | ID! | Address of the minipool. |
| node | Node! | Node that is associated with this minipool. |
| fee | BigInt!  | Fee that was assigned to this minipool when it was created. |
| nodeDepositETHAmount | BigInt!  | Node deposit ETH amount (in WEI) that was assigned to this minipool when it was created. |
| nodeDepositBlockTime | BigInt!  | Block timestamp at which this minipool received a node deposit. |
| userDepositETHAmount | BigInt! | User deposit ETH amount (in WEI) that was assigned to this minipool. |
| userDepositBlockTime | BigInt!  | Block timestamp at which this minipool received a user deposit. |
| queuedBlockTime | BigInt! | Block timestamp at which this minipool was queued. |
| dequeuedBlockTime | BigInt! | Block timestamp at which this minipool was dequeued. |
| destroyedBlockTime | BigInt! | Block timestamp at which this minipool was destroyed. |
| stakingBlockTime | BigInt! | Block number at which this minipool transitioned to the staking state. |
| withdrawableBlockTime | BigInt! | Block timestamp at which this minipool was marked as withdrawable. |
| finalizedBlockTime | BigInt! | Block timestamp at which this minipool was marked as finalized. |

