# Class: Minipool

Rocket Pool Minipool Manager

## Constructors

### constructor

• **new Minipool**(`web3`, `contracts`)

Create a new Minipool instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `web3` | `default` | A valid Web3 instance |
| `contracts` | [`Contracts`](Contracts.md) | A Rocket Pool Contract Manager Instance |

#### Defined in

rocketpool/minipool/minipool.ts:27

## Accessors

### rocketMinipoolManager

• `Private` `get` **rocketMinipoolManager**(): `Promise`<`Contract`\>

Private accessor use to retrieve the related contract

#### Returns

`Promise`<`Contract`\>

a Promise<Contract\> with a web3.eth.contract instance of the rocketMinipoolManager contract

#### Defined in

rocketpool/minipool/minipool.ts:33

___

### rocketMinipoolQueue

• `Private` `get` **rocketMinipoolQueue**(): `Promise`<`Contract`\>

Private accessor use to retrieve the related contract

#### Returns

`Promise`<`Contract`\>

a Promise<Contract\> with a web3.eth.contract instance of the rocketMinipoolQueue contract

#### Defined in

rocketpool/minipool/minipool.ts:41

___

### rocketMinipoolStatus

• `Private` `get` **rocketMinipoolStatus**(): `Promise`<`Contract`\>

Private accessor use to retrieve the related contract

#### Returns

`Promise`<`Contract`\>

a Promise<Contract\> with a web3.eth.contract instance of the rocketMinipoolStatus contract

#### Defined in

rocketpool/minipool/minipool.ts:49

___

### rocketMinipool

• `Private` `get` **rocketMinipool**(): `Promise`<`Contract`\>

Private accessor use to retrieve the related contract

#### Returns

`Promise`<`Contract`\>

a Promise<Contract\> with a web3.eth.contract instance of the rocketMinipool contract

#### Defined in

rocketpool/minipool/minipool.ts:57

## Methods

### getMinipools

▸ **getMinipools**(): `Promise`<[`MinipoolDetails`](../interfaces/MinipoolDetails.md)[]\>

Get all minipool details

**`example`** using Typescript
```ts
const minipools = rp.minipool.getMinipools().then((val: MinipoolDetails[]) => { val };
```

#### Returns

`Promise`<[`MinipoolDetails`](../interfaces/MinipoolDetails.md)[]\>

a Promise<MinipoolDetails[]\> that resolves to an array of MinipoolDetails (address, exists, pubkey)

#### Defined in

rocketpool/minipool/minipool.ts:70

___

### getMinipoolAddresses

▸ **getMinipoolAddresses**(): `Promise`<`string`[]\>

Get all minipool addresses

**`example`** using Typescript
```ts
const addresses = rp.minipool.getMinipoolAddresses().then((val: string[]) => { val };
```

#### Returns

`Promise`<`string`[]\>

a Promise<string[]\> that resolves to an array of minipool addresses as strings

#### Defined in

rocketpool/minipool/minipool.ts:89

___

### getNodeMinipools

▸ **getNodeMinipools**(`nodeAddress`): `Promise`<[`MinipoolDetails`](../interfaces/MinipoolDetails.md)[]\>

Get all node's minipool details

**`params`** nodeAddress a string representing the node address you which to return details for

**`example`** using Typescript
```ts
const nodeAddress = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const details = rp.minipool.getNodeMinipools(nodeAddress).then((val: MinipoolDetails[]) => { val };
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeAddress` | `string` |

#### Returns

`Promise`<[`MinipoolDetails`](../interfaces/MinipoolDetails.md)[]\>

a Promise<MinipoolDetails[]\> that resolves to an array of MinipoolDetails about a specific node

#### Defined in

rocketpool/minipool/minipool.ts:110

___

### getNodeMinipoolAddresses

▸ **getNodeMinipoolAddresses**(`nodeAddress`): `Promise`<`string`[]\>

Get all node's minipool addresses

**`params`** nodeAddress a string representing the node address you which to return details for

**`example`** using Typescript
```ts
const nodeAddress = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const minipoolAddresses = rp.minipool.getNodeMinipoolAddresses(nodeAddress).then((val: string[]) => { val };
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeAddress` | `string` |

#### Returns

`Promise`<`string`[]\>

a Promise<string[]\> that resolves to an array of strings containing the minipool addresses

#### Defined in

rocketpool/minipool/minipool.ts:131

___

### getMinipoolDetails

▸ **getMinipoolDetails**(`address`): `Promise`<[`MinipoolDetails`](../interfaces/MinipoolDetails.md)\>

Get all minipool's details

**`params`** nodeAddress a string representing the node address you which to return details for

**`example`** using Typescript
```ts
const nodeAddress = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const minipoolDetails = rp.minipool.getMinipoolDetails(nodeAddress).then((val: MinipoolDetails) => { val };
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<[`MinipoolDetails`](../interfaces/MinipoolDetails.md)\>

a Promise<MinipoolDetails\> that resolves to a singular MinipoolDetails with details about the minipool you want to look up

#### Defined in

rocketpool/minipool/minipool.ts:152

___

### getMinipoolCount

▸ **getMinipoolCount**(): `Promise`<`number`\>

Get all the total minipool count

**`example`** using Typescript
```ts
const totalMinipools = rp.minipool.getMinipoolCount().then((val: number) => { val };
```

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the total minipool count

#### Defined in

rocketpool/minipool/minipool.ts:171

___

### getMinipoolAt

▸ **getMinipoolAt**(`index`): `Promise`<`string`\>

Get a minipool address by index

**`params`** index a number representing the index of the minipool you wish to lookup

**`example`** using Typescript
```ts
const index = 5;
const address = rp.minipool.getMinipoolAt(index).then((val: string) => { val };
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the minipool address

#### Defined in

rocketpool/minipool/minipool.ts:190

___

### getNodeMinipoolCount

▸ **getNodeMinipoolCount**(`nodeAddress`): `Promise`<`number`\>

Get a node's total minipool count

**`params`** nodeAddress a string representing the node address you which to return details for

**`example`** using Typescript
```ts
const nodeAddress = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const nodeMinipoolCount = rp.minipool.getNodeMinipoolCount(nodeAddress).then((val: number) => { val };
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeAddress` | `string` |

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the node's total minipool count

#### Defined in

rocketpool/minipool/minipool.ts:207

___

### getStakingMinipoolCount

▸ **getStakingMinipoolCount**(): `Promise`<`number`\>

Get the staking minipool count

**`example`** using Typescript
```ts
const stakingMinipoolCount = rp.minipool.getStakingMinipoolCount().then((val: number) => { val };
```

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the total staking minipool count

#### Defined in

rocketpool/minipool/minipool.ts:224

___

### getNodeStakingMinipoolCount

▸ **getNodeStakingMinipoolCount**(`nodeAddress`): `Promise`<`number`\>

Get the node's staking minipool count

**`params`** nodeAddress a string representing the node address you which to return details for

**`example`** using Typescript
```ts
const nodeAddress = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const nodeStakingMinipoolCount = rp.minipool.getNodeStakingMinipoolCount(nodeAddress).then((val: number) => { val };
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeAddress` | `string` |

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the node's staking minipool count

#### Defined in

rocketpool/minipool/minipool.ts:241

___

### getNodeActiveMinipoolCount

▸ **getNodeActiveMinipoolCount**(`nodeAddress`): `Promise`<`string`\>

Get the node's active minipool count

**`params`** nodeAddress a string representing the node address you which to return details for

**`example`** using Typescript
```ts
const nodeAddress = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const nodeActiveMinipoolCount = rp.minipool.getNodeActiveMinipoolCount(nodeAddress).then((val: number) => { val };
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeAddress` | `string` |

#### Returns

`Promise`<`string`\>

a Promise<number\> that resolves to a number representing the node's active minipool count

#### Defined in

rocketpool/minipool/minipool.ts:258

___

### getNodeMinipoolAt

▸ **getNodeMinipoolAt**(`nodeAddress`, `index`): `Promise`<`string`\>

Get the node's minipool address by index

**`params`** nodeAddress a string representing the node address you which to return details for

**`params`** index a number representing the index of

**`example`** using Typescript
```ts
const nodeAddress = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const index = 2;
const address = rp.minipool.getNodeMinipoolAt(nodeAddress, index).then((val: string) => { val };
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeAddress` | `string` |
| `index` | `number` |

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the minipool address at the desired index

#### Defined in

rocketpool/minipool/minipool.ts:277

___

### getMinipoolByPubkey

▸ **getMinipoolByPubkey**(`validatorPubkey`): `Promise`<`string`\>

Get a minipool address by validator pubkey

**`params`** validatorPubkey a string representing the validator pub key

**`example`** using Typescript
```ts
const validatorPubkey = "0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003";
const address = rp.minipool.getMinipoolByPubkey(nodeAddress).then((val: string) => { val };
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `validatorPubkey` | `string` |

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the minipool address at the desired pubkey

#### Defined in

rocketpool/minipool/minipool.ts:294

___

### getMinipoolExists

▸ **getMinipoolExists**(`address`): `Promise`<`boolean`\>

Check whether a minipool exists

**`params`** address a string representing the minipool address you to check against

**`example`** using Typescript
```ts
const address = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const exists = rp.minipool.getMinipoolExists(nodeAddress).then((val: boolean) => { val };
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<`boolean`\>

a Promise<boolean\> that resolves to a boolean representing if a minipool exists at the address

#### Defined in

rocketpool/minipool/minipool.ts:311

___

### getMinipoolPubkey

▸ **getMinipoolPubkey**(`address`): `Promise`<`string`\>

Get a minipool's validator pubkey

**`params`** address a string representing the minipool address

**`example`** using Typescript
```ts
const address = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const address = rp.minipool.getMinipoolPubkey(nodeAddress).then((val: string) => { val };
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the pubkey for the provided minipool address

#### Defined in

rocketpool/minipool/minipool.ts:328

___

### getMinipoolWithdrawalCredentials

▸ **getMinipoolWithdrawalCredentials**(`address`): `Promise`<`string`\>

Get a minipool's withdrawal credentials

**`params`** address a string representing the minipool address

**`example`** using Typescript
```ts
const address = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const address = rp.minipool.getMinipoolWithdrawalCredentials(nodeAddress).then((val: string) => { val };
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the minipool credentials

#### Defined in

rocketpool/minipool/minipool.ts:345

___

### getQueueLength

▸ **getQueueLength**(`depositType`): `Promise`<`number`\>

Get the minipool queue length

**`params`** depositType a number representing the deposit type

**`example`** using Typescript
```ts
const length = rp.minipool.getQueueLength(1).then((val: number) => { val };
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `depositType` | `number` |

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the minipool queue length

#### Defined in

rocketpool/minipool/minipool.ts:361

___

### getQueueTotalLength

▸ **getQueueTotalLength**(): `Promise`<`number`\>

Get the total minipool queue length

**`example`** using Typescript
```ts
const totalLength = rp.minipool.getQueueTotalLength().then((val: number) => { val };
```

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the total minipool queue length

#### Defined in

rocketpool/minipool/minipool.ts:376

___

### getQueueTotalCapacity

▸ **getQueueTotalCapacity**(): `Promise`<`string`\>

Get the total capacity of queued minipools in Wei

**`example`** using Typescript
```ts
const totalLength = rp.minipool.getQueueTotalCapacity().then((val: string) => { val };
```

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a number representing the total capacity of queued minipools in Wei

#### Defined in

rocketpool/minipool/minipool.ts:393

___

### getQueueEffectiveCapacity

▸ **getQueueEffectiveCapacity**(): `Promise`<`string`\>

Get the effective capacity of queued minipools in Wei (used in node demand calculations)

**`example`** using Typescript
```ts
const queueEffectiveCapacity = rp.minipool.getQueueEffectiveCapacity().then((val: string) => { val };
```

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a number representing the effective capacity of queued minipools in Wei

#### Defined in

rocketpool/minipool/minipool.ts:408

___

### getQueueNextCapacity

▸ **getQueueNextCapacity**(): `Promise`<`string`\>

Get the capacity of the next available minipool in Wei

**`example`** using Typescript
```ts
const queueNextCapacity = rp.minipool.getQueueNextCapacity().then((val: string) => { val };
```

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a number representing the capacity of the next available minipool in Wei

#### Defined in

rocketpool/minipool/minipool.ts:423

___

### getMinipoolNodeRewardAmount

▸ **getMinipoolNodeRewardAmount**(`nodeFee`, `userDepositBalance`, `startBalance`, `endBalance`): `Promise`<`string`\>

Get the node reward amount for a minipool by node fee, user deposit balance, and staking start & end balances

**`params`** nodeFee a number representing the node fee

**`params`** userBalanceString a string representing the user balance in Wei

**`params`** startBalance a string representing the start balance in Wei

**`params`** endBalance a sttring representing the end balance in Wei

**`example`** using Typescript
```ts
const rewardsAmount = rp.minipool.getMinipoolNodeRewardAmount(nodeFee, userDepositBalance, startBalance, endBalance).then((val: string) => { val };
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeFee` | `number` |
| `userDepositBalance` | `string` |
| `startBalance` | `string` |
| `endBalance` | `string` |

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the minipool node rewards amount in Wei

#### Defined in

rocketpool/minipool/minipool.ts:442

___

### getMinipoolContract

▸ **getMinipoolContract**(`address`): `Promise`<[`MinipoolContract`](MinipoolContract.md)\>

Get a MinipoolContract instance

**`params`** address a string representing the address of the minipool

**`example`** using Typescript
```ts
const address = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const minipoolContract = rp.minipool.getMinipoolContract(address).then((val: MinipoolContract) => { val };
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<[`MinipoolContract`](MinipoolContract.md)\>

a Promise<MinipoolContract\> that resolves to a MinipoolContract representing the contract of the minipool

#### Defined in

rocketpool/minipool/minipool.ts:461

___

### getEffectiveDelegate

▸ **getEffectiveDelegate**(`address`): `Promise`<`string`\>

Get the effective delegate

**`params`** address a string representing the address of the minipool

**`example`** using Typescript
```ts
const address = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const effectiveDelegate = rp.minipool.getEffectiveDelegate(address).then((val: string) => { val };
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to the address of the effective delegate

#### Defined in

rocketpool/minipool/minipool.ts:478

___

### submitMinipoolWithdrawable

▸ **submitMinipoolWithdrawable**(`minipoolAddress`, `options?`, `onConfirmation?`): `Promise`<`TransactionReceipt`\>

Submit a minipool as withdrawable

**`example`** using Typescript
```ts
const minipoolAddress = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const trustedNode = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const options = {
		from: trustedNode,
		gas: 1000000
};
const txReceipt = rp.minipool.submitWithdrawable(minipoolAddress, options).then((txReceipt: TransactionReceipt) => { txReceipt };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `minipoolAddress` | `string` | A string representing the address of the minipool |
| `options?` | `SendOptions` | An optional object of web3.eth.Contract SendOptions |
| `onConfirmation?` | [`ConfirmationHandler`](../interfaces/internal_/ConfirmationHandler.md) | An optional confirmation handler object |

#### Returns

`Promise`<`TransactionReceipt`\>

a Promise<TransactionReceipt\> that resolves to a TransactionReceipt object representing the receipt of the transaction

#### Defined in

rocketpool/minipool/minipool.ts:502
