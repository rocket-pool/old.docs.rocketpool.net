# Class: DAOProposal

Rocket Pool DAO Proposals

## Constructors

### constructor

• **new DAOProposal**(`web3`, `contracts`)

Create a new DAOProposal instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `web3` | `default` | A valid Web3 instance |
| `contracts` | [`Contracts`](Contracts.md) | A Rocket Pool contract manager instance |

#### Defined in

rocketpool/dao/proposals.ts:18

## Accessors

### rocketDAOProposal

• `Private` `get` **rocketDAOProposal**(): `Promise`<`Contract`\>

Private accessor use to retrieve the related contract

#### Returns

`Promise`<`Contract`\>

a Promise<Contract\> with a web3.eth.contract instance of the rocketDAOProposal contract

#### Defined in

rocketpool/dao/proposals.ts:24

## Methods

### getTotal

▸ **getTotal**(): `Promise`<`number`\>

Return the total of DAO Proposals

**`example`** using Typescript
```ts
const enabled = rp.dao.proposals.getTotal().then((val: number) => { val };
```

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing if node registrations are enabled

#### Defined in

rocketpool/dao/proposals.ts:37

___

### getState

▸ **getState**(`proposalID`): `Promise`<`number`\>

Return the state of a DAO proposal

**`example`** using Typescript
```ts
const proposalID = 5; // fictional proposal to invite user Kermit
const state = rp.dao.proposals.getState(proposalID).then((val: number) => { val };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `proposalID` | `number` | A number representing proposalID |

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the state of a DAO proposal

#### Defined in

rocketpool/dao/proposals.ts:54

___

### getVotesFor

▸ **getVotesFor**(`proposalID`): `Promise`<`number`\>

Return the number of votes for a specific DAO proposal

**`example`** using Typescript
```ts
const proposalID = 5; // fictional proposal to invite user Kermit
const voteFor = rp.dao.proposals.getVotesFor(proposalID).then((val: number) => { val };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `proposalID` | `number` | A number representing proposalID |

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the votes for a specific DAO proposal

#### Defined in

rocketpool/dao/proposals.ts:71

___

### getVotesRequired

▸ **getVotesRequired**(`proposalID`): `Promise`<`number`\>

Return the number of votes required for a specific DAO proposal

**`example`** using Typescript
```ts
const proposalID = 5; // fictional proposal to invite user Kermit
const votesRequired = rp.dao.proposals.getVotesRequired(proposalID).then((val: number) => { val };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `proposalID` | `number` | A number representing proposalID |

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the votes required for a specific DAO proposal

#### Defined in

rocketpool/dao/proposals.ts:88

___

### getStart

▸ **getStart**(`proposalID`): `Promise`<`number`\>

Return the start block of this proposal

**`example`** using Typescript
```ts
const proposalID = 5; // fictional proposal to invite user Kermit
const state = rp.dao.proposals.getStart(proposalID).then((val: number) => { val };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `proposalID` | `number` | A number representing proposalID |

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the start block for the specific DAO proposal

#### Defined in

rocketpool/dao/proposals.ts:105

___

### getEnd

▸ **getEnd**(`proposalID`): `Promise`<`number`\>

Return the end block of this proposal

**`example`** using Typescript
```ts
const proposalID = 5; // fictional proposal to invite user Kermit
const state = rp.dao.proposals.getEnd(proposalID).then((val: number) => { val };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `proposalID` | `number` | A number representing proposalID |

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the end block for the specific DAO proposal

#### Defined in

rocketpool/dao/proposals.ts:122

___

### getVotesAgainst

▸ **getVotesAgainst**(`proposalID`): `Promise`<`number`\>

Return the number of votes against a specific DAO proposal

**`example`** using Typescript
```ts
const proposalID = 5; // fictional proposal to invite user Kermit
const voteFor = rp.dao.proposals.getVotesAgainst(proposalID).then((val: number) => { val };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `proposalID` | `number` | A number representing proposalID |

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the votes against a specific DAO proposal

#### Defined in

rocketpool/dao/proposals.ts:139

___

### getExpires

▸ **getExpires**(`proposalID`): `Promise`<`number`\>

Return the block a specific DAO proposal expires

**`example`** using Typescript
```ts
const proposalID = 5; // fictional proposal to invite user Kermit
const state = rp.dao.proposals.getEnd(proposalID).then((val: number) => { val };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `proposalID` | `number` | A number representing proposalID |

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the block that a specific DAO proposal expires

#### Defined in

rocketpool/dao/proposals.ts:156
