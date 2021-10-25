# Class: DAONodeTrustedSettings

Rocket Pool DAO Trusted Node Settings

## Constructors

### constructor

• **new DAONodeTrustedSettings**(`web3`, `contracts`)

Create a new DAONodeTrustedSettings instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `web3` | `default` | A valid Web3 instance |
| `contracts` | [`Contracts`](Contracts.md) | A Rocket Pool contract manager instance |

#### Defined in

rocketpool/dao/node/trusted/settings.ts:18

## Accessors

### rocketDAONodeTrustedSettingsProposals

• `Private` `get` **rocketDAONodeTrustedSettingsProposals**(): `Promise`<`Contract`\>

Private accessor use to retrieve the related contract

#### Returns

`Promise`<`Contract`\>

a Promise<Contract\> with a web3.eth.contract instance of the rocketDAONodeTrustedSettingsProposals contract

#### Defined in

rocketpool/dao/node/trusted/settings.ts:24

___

### rocketDAONodeTrustedSettingsMembers

• `Private` `get` **rocketDAONodeTrustedSettingsMembers**(): `Promise`<`Contract`\>

Private accessor use to retrieve the related contract

#### Returns

`Promise`<`Contract`\>

a Promise<Contract\> with a web3.eth.contract instance of the rocketDAONodeTrustedSettingsMembers contract

#### Defined in

rocketpool/dao/node/trusted/settings.ts:32

___

### rocketDAOProtocolSettingsDeposit

• `Private` `get` **rocketDAOProtocolSettingsDeposit**(): `Promise`<`Contract`\>

Private accessor use to retrieve the related contract

#### Returns

`Promise`<`Contract`\>

a Promise<Contract\> with a web3.eth.contract instance of the rocketDAOProtocolSettingsDeposit contract

#### Defined in

rocketpool/dao/node/trusted/settings.ts:40

___

### rocketDAOProtocolSettingsMinipool

• `Private` `get` **rocketDAOProtocolSettingsMinipool**(): `Promise`<`Contract`\>

Private accessor use to retrieve the related contract

#### Returns

`Promise`<`Contract`\>

a Promise<Contract\> with a web3.eth.contract instance of the rocketDAOProtocolSettingsMinipool contract

#### Defined in

rocketpool/dao/node/trusted/settings.ts:48

## Methods

### getMaximumDepositAssignments

▸ **getMaximumDepositAssignments**(): `Promise`<`string`\>

Get the maximum deposit assignments

**`example`** using Typescript
```ts
const maxDepositsAssignments = rp.dao.node.trusted.getMaximumDepositAssignments().then((val: string) => { val };
```

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the maximum deposit assignments

#### Defined in

rocketpool/dao/node/trusted/settings.ts:61

___

### getChallengeCost

▸ **getChallengeCost**(): `Promise`<`string`\>

Get the cost of a challenge (How much it costs a non-member to challenge a members node. It's free for current members to challenge other members.)

**`example`** using Typescript
```ts
const maxDepositsAssignments = rp.dao.node.trusted.getMaximumDepositAssignments().then((val: string) => { val };
```

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the inflation intervals that have passed (in time)

#### Defined in

rocketpool/dao/node/trusted/settings.ts:76
