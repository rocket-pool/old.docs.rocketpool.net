# Class: Pool

Rocket Pool Rewards

## Constructors

### constructor

• **new Pool**(`web3`, `contracts`)

Create a new Pool instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `web3` | `default` | A valid Web3 instance |
| `contracts` | [`Contracts`](Contracts.md) | A Rocket Pool contract manager instance |

#### Defined in

rocketpool/rewards/pool.ts:16

## Accessors

### rocketRewardsPool

• `Private` `get` **rocketRewardsPool**(): `Promise`<`Contract`\>

Private accessor use to retrieve the related contract

#### Returns

`Promise`<`Contract`\>

a Promise<Contract\> with a web3.eth.contract instance of the rocketRewardsPool contract

#### Defined in

rocketpool/rewards/pool.ts:22

## Methods

### getClaimIntervalsPassed

▸ **getClaimIntervalsPassed**(): `Promise`<`number`\>

Get claim intervals passed

**`example`** using Typescript
```ts
const claimIntervalsPassed = rp.rewards.pool.getClaimIntervalsPassed().then((val: number) => { val };
```

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the claim intervals passed

#### Defined in

rocketpool/rewards/pool.ts:35

___

### getClaimIntervalTimeStart

▸ **getClaimIntervalTimeStart**(): `Promise`<`string`\>

Get the claim intervals start time

**`example`** using Typescript
```ts
const claimIntervalTimeStart = rp.rewards.pool.getClaimIntervalTimeStart().then((val: number) => { val };
```

#### Returns

`Promise`<`string`\>

a Promise<number\> that resolves to a number representing the claim intervals start time

#### Defined in

rocketpool/rewards/pool.ts:50

___

### getRPLBalance

▸ **getRPLBalance**(): `Promise`<`string`\>

Get the rpl balance

**`example`** using Typescript
```ts
const rplBalance = rp.rewards.pool.getRPLBalance().then((val: string) => { val };
```

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the claim RPL balance in Wei

#### Defined in

rocketpool/rewards/pool.ts:65

___

### getClaimingContractPerc

▸ **getClaimingContractPerc**(`contract`): `Promise`<`string`\>

Get the claiming contract percentage

**`params`** contract a string representing the contract address

**`example`** using Typescript
```ts
const contract = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const claimingContractPercentage = rp.rewards.pool.getClaimingContractPerc(contract).then((val: string) => { val };
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | `string` |

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the claiming contract percentage

#### Defined in

rocketpool/rewards/pool.ts:82

___

### getClaimingContractAllowance

▸ **getClaimingContractAllowance**(`contract`): `Promise`<`number`\>

Get the claiming contract allowance

**`params`** contract a string representing the contract address

**`example`** using Typescript
```ts
const contract = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const claimingContractAllowance = rp.rewards.pool.getClaimingContractAllowance(contract).then((val: string) => { val };
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | `string` |

#### Returns

`Promise`<`number`\>

a Promise<string\> that resolves to a string representing the claiming contract allowance

#### Defined in

rocketpool/rewards/pool.ts:99

___

### getClaimingContractTotalClaimed

▸ **getClaimingContractTotalClaimed**(`contract`): `Promise`<`string`\>

Get the claiming contract total claimed

**`params`** contract a string representing the contract address

**`example`** using Typescript
```ts
const contract = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const claimingContractTotalClaimed = rp.rewards.pool.getClaimingContractTotalClaimed(contract).then((val: string) => { val };
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | `string` |

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the claiming contract total claimed

#### Defined in

rocketpool/rewards/pool.ts:116

___

### getClaimIntervalRewardsTotal

▸ **getClaimIntervalRewardsTotal**(): `Promise`<`string`\>

Get the claim interval rewards total

**`example`** using Typescript
```ts
const claimIntervalRewardsTotal = rp.rewards.pool.getClaimIntervalRewardsTotal().then((val: string) => { val };
```

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the claiming interval rewards total

#### Defined in

rocketpool/rewards/pool.ts:131

___

### getClaimContractRegisteredTime

▸ **getClaimContractRegisteredTime**(`contractAddress`, `trustedNodeAddress`): `Promise`<`string`\>

Get the claim contract registered time

**`params`** contractAddress a string representing the contract address

**`params`** trustedNodeAddress a string representing a trusted node address

**`example`** using Typescript
```ts
const contractAddress = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const trustedNodeAddress = "0x421433c3f99529A704Ec2270E1A68fa66DD8bD79";
const claimContractRegisteredTime = rp.rewards.pool.getClaimContractRegisteredTime(contractAddress, trustedNodeAddress).then((val: string) => { val };
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractAddress` | `string` |
| `trustedNodeAddress` | `string` |

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the claim contract registered block

#### Defined in

rocketpool/rewards/pool.ts:150

___

### getClaimingContractUserTotalCurrent

▸ **getClaimingContractUserTotalCurrent**(`contract`): `Promise`<`string`\>

Get the number of claimers for the current interval per claiming contract

**`params`** contract a string representing the contract address

**`example`** using Typescript
```ts
const contract = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const claimingContractTotalClaimed = rp.rewards.pool.getClaimingContractUserTotalCurrent(contract).then((val: string) => { val };
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | `string` |

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the claim contract registered block

#### Defined in

rocketpool/rewards/pool.ts:167
