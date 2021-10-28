# Class: RocketPool

RocketPool

## Constructors

### constructor

• **new RocketPool**(`web3`, `RocketStorage`)

Create a new Rocket Pool instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `web3` | `default` | A Web3 instance |
| `RocketStorage` | `string` \| [`ContractArtifact`](../interfaces/internal_/ContractArtifact.md) | a RocketStorage address as a string or ContractArtifact (JSON ABI file) |

#### Defined in

rocketpool/rocketpool.ts:87

## Properties

### contracts

• `Readonly` **contracts**: [`Contracts`](Contracts.md)

#### Defined in

rocketpool/rocketpool.ts:33

___

### auction

• `Readonly` **auction**: [`Auction`](Auction.md)

#### Defined in

rocketpool/rocketpool.ts:34

___

### dao

• `Readonly` **dao**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `node` | `Object` |
| `node.trusted` | `Object` |
| `node.trusted.actions` | [`DAONodeTrustedActions`](DAONodeTrustedActions.md) |
| `node.trusted.node` | [`DAONodeTrusted`](DAONodeTrusted.md) |
| `node.trusted.proposals` | [`DAONodeTrustedProposals`](DAONodeTrustedProposals.md) |
| `node.trusted.settings` | [`DAONodeTrustedSettings`](DAONodeTrustedSettings.md) |
| `proposals` | [`DAOProposal`](DAOProposal.md) |

#### Defined in

rocketpool/rocketpool.ts:35

___

### deposit

• `Readonly` **deposit**: [`Deposit`](Deposit.md)

#### Defined in

rocketpool/rocketpool.ts:46

___

### minipool

• `Readonly` **minipool**: [`Minipool`](Minipool.md)

#### Defined in

rocketpool/rocketpool.ts:47

___

### network

• `Readonly` **network**: [`Network`](Network.md)

#### Defined in

rocketpool/rocketpool.ts:48

___

### node

• `Readonly` **node**: [`Node`](Node.md)

#### Defined in

rocketpool/rocketpool.ts:49

___

### settings

• `Readonly` **settings**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `auction` | [`AuctionSettings`](AuctionSettings.md) |
| `deposit` | [`DepositSettings`](DepositSettings.md) |
| `minipool` | [`MinipoolSettings`](MinipoolSettings.md) |
| `network` | [`NetworkSettings`](NetworkSettings.md) |
| `node` | [`NodeSettings`](NodeSettings.md) |

#### Defined in

rocketpool/rocketpool.ts:50

___

### tokens

• `Readonly` **tokens**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `reth` | [`RETH`](RETH.md) |
| `rpl` | [`RPL`](RPL.md) |
| `legacyrpl` | [`LegacyRPL`](LegacyRPL.md) |

#### Defined in

rocketpool/rocketpool.ts:57

___

### rewards

• `Readonly` **rewards**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `pool` | [`Pool`](Pool.md) |
| `claimNode` | [`Rewards`](Rewards.md) |
| `claimDAO` | [`Rewards`](Rewards.md) |
| `claimTrustedNode` | [`Rewards`](Rewards.md) |

#### Defined in

rocketpool/rocketpool.ts:58

___

### vault

• `Readonly` **vault**: [`Vault`](Vault.md)

#### Defined in

rocketpool/rocketpool.ts:64

___

### web3

• `Readonly` **web3**: `default`

___

### RocketStorage

• `Readonly` **RocketStorage**: `string` \| [`ContractArtifact`](../interfaces/internal_/ContractArtifact.md)
