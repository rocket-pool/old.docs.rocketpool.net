# Class: Node

Rocket Pool Node Manager

## Constructors

### constructor

• **new Node**(`web3`, `contracts`)

Create a new Node instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `web3` | `default` | A valid Web3 instance |
| `contracts` | [`Contracts`](Contracts.md) | A Rocket Pool contract manager instance |

#### Defined in

rocketpool/node/node.ts:25

## Accessors

### rocketNodeDeposit

• `Private` `get` **rocketNodeDeposit**(): `Promise`<`Contract`\>

Private accessor use to retrieve the related contract

#### Returns

`Promise`<`Contract`\>

a Promise<Contract\> with a web3.eth.contract instance of the rocketNodeDeposit contract

#### Defined in

rocketpool/node/node.ts:31

___

### rocketNodeManager

• `Private` `get` **rocketNodeManager**(): `Promise`<`Contract`\>

Private accessor use to retrieve the related contract

#### Returns

`Promise`<`Contract`\>

a Promise<Contract\> with a web3.eth.contract instance of the rocketNodeManager contract

#### Defined in

rocketpool/node/node.ts:39

___

### rocketNodeStaking

• `Private` `get` **rocketNodeStaking**(): `Promise`<`Contract`\>

Private accessor use to retrieve the related contract

#### Returns

`Promise`<`Contract`\>

a Promise<Contract\> with a web3.eth.contract instance of the rocketNodeStaking contract

#### Defined in

rocketpool/node/node.ts:47

___

### rocketStorage

• `Private` `get` **rocketStorage**(): `Promise`<`Contract`\>

Private accessor use to retrieve the related contract

#### Returns

`Promise`<`Contract`\>

a Promise<Contract\> with a web3.eth.contract instance of the rocketStorage contract

#### Defined in

rocketpool/node/node.ts:55

## Methods

### getNodes

▸ **getNodes**(): `Promise`<[`NodeDetails`](../interfaces/NodeDetails.md)[]\>

Get an array of Node Details

**`example`** using Typescript
```ts
const nodes = rp.node.getNodes().then((val: string) => { val };
```

#### Returns

`Promise`<[`NodeDetails`](../interfaces/NodeDetails.md)[]\>

a Promise<NodeDetails[]\> that resolves to an array of NodeDetails

#### Defined in

rocketpool/node/node.ts:68

___

### getNodeAddresses

▸ **getNodeAddresses**(): `Promise`<`string`[]\>

Get an array of node addresses

**`example`** using Typescript
```ts
const addresses = rp.node.getNodesAddresses().then((val: string[]) => { val };
```

#### Returns

`Promise`<`string`[]\>

a Promise<string[]\> that resolves to an array of node addresses

#### Defined in

rocketpool/node/node.ts:87

___

### getNodeDetails

▸ **getNodeDetails**(`address`): `Promise`<[`NodeDetails`](../interfaces/NodeDetails.md)\>

Get a node's details

**`example`** using Typescript
```ts
const nodeDetail = rp.node.getNodeDetails("0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294").then((val: NodeDetails) => { val }
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | A string representing a node address |

#### Returns

`Promise`<[`NodeDetails`](../interfaces/NodeDetails.md)\>

a Promise<NodeDetails\> that resolves to a NodeDetails object

#### Defined in

rocketpool/node/node.ts:107

___

### getNodeCount

▸ **getNodeCount**(): `Promise`<`number`\>

Get the total node count

**`example`** using Typescript
```ts
const nodeCount = rp.node.getNodeCount().then((val: number) => { val };
```

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the quantity of total nodes

#### Defined in

rocketpool/node/node.ts:126

___

### getNodeAt

▸ **getNodeAt**(`index`): `Promise`<`string`\>

Get a node address by index

**`example`** using Typescript
```ts
const nodeAddress = rp.node.getNodeAt(5).then((val: string) => { val };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | A number representing the index of the node |

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing a node address

#### Defined in

rocketpool/node/node.ts:144

___

### getNodeExists

▸ **getNodeExists**(`address`): `Promise`<`boolean`\>

Check whether a node exists

**`example`** using Typescript
```ts
const exists = rp.node.getNodeExists("0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294").then((val: boolean) => { val };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | A string representing a node address |

#### Returns

`Promise`<`boolean`\>

a Promise<boolean\> that resolves to a boolean representing whether the node exists or not

#### Defined in

rocketpool/node/node.ts:160

___

### getNodeTimezoneLocation

▸ **getNodeTimezoneLocation**(`address`): `Promise`<`string`\>

Get a node's timezone location

**`example`** using Typescript
```ts
const tz = rp.node.getNodeTimezoneLocation("0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294").then((val: string) => { val };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | A string representing a node address |

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the node's timezone

#### Defined in

rocketpool/node/node.ts:176

___

### getNodeWithdrawalAddress

▸ **getNodeWithdrawalAddress**(`address`): `Promise`<`string`\>

Get a node's withdrawal address

**`example`** using Typescript
```ts
const withdrawalAddress = rp.node.getNodeWithdrawalAddress("0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294").then((val: string) => { val };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | A string representing a node address |

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the node's withdrawal address

#### Defined in

rocketpool/node/node.ts:192

___

### getNodeRPLStake

▸ **getNodeRPLStake**(`address`): `Promise`<`string`\>

Get a node's RPL stake

**`example`** using Typescript
```ts
const nodeRPLStake = rp.node.getNodeRPLStake("0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294").then((val: string) => { val };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | A string representing a node address |

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the node's RPL stake

#### Defined in

rocketpool/node/node.ts:208

___

### getNodeEffectiveRPLStake

▸ **getNodeEffectiveRPLStake**(`address`): `Promise`<`string`\>

Get a node's effective RPL stake

**`example`** using Typescript
```ts
const nodeEffectiveRPLStake = rp.node.getNodeEffectiveRPLStake("0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294").then((val: string) => { val };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | A string representing a node address |

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the node's effective RPL stake

#### Defined in

rocketpool/node/node.ts:224

___

### getNodeMinipoolLimit

▸ **getNodeMinipoolLimit**(`address`): `Promise`<`string`\>

Get the node minipool limit

**`example`** using Typescript
```ts
const nodeMinipoolLimit = rp.node.getNodeMinipoolLimit("0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294").then((val: string) => { val };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | A string representing a node address |

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the node minipool limit

#### Defined in

rocketpool/node/node.ts:240

___

### getNodeTotalEffectiveRPLStake

▸ **getNodeTotalEffectiveRPLStake**(): `Promise`<`string`\>

Get a node's total effective RPL stake

**`example`** using Typescript
```ts
const nodeTotalEffectiveRPLStake = rp.node.getNodeTotalEffectiveRPLStake("0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294").then((val: string) => { val };
```

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the node's RPL stake

#### Defined in

rocketpool/node/node.ts:256

___

### getNodeMinimumRPLStake

▸ **getNodeMinimumRPLStake**(`address`): `Promise`<`string`\>

Get a node's minimum RPL stake

**`example`** using Typescript
```ts
const nodeRPLStake = rp.node.getNodeRPLStake("0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294").then((val: string) => { val };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | A string representing a node address |

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the node's minimum RPL stake

#### Defined in

rocketpool/node/node.ts:272

___

### getNodePendingWithdrawalAddress

▸ **getNodePendingWithdrawalAddress**(`address`): `Promise`<`string`\>

Get a node's pending withdrawal address

**`example`** using Typescript
```ts
const pendingWithdrawalAddress = rp.node.getNodePendingWithdrawalAddress("0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294").then((val: string) => { val };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | A string representing a node address |

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the node's pending withdrawal address

#### Defined in

rocketpool/node/node.ts:288

___

### getTotalEffectiveRPLStake

▸ **getTotalEffectiveRPLStake**(): `Promise`<`string`\>

Get the total effective RPL stake

**`example`** using Typescript
```ts
const totalEffectiveRPLStake = rp.node.getTotalEffectiveRPLStake().then((val: string) => { val };
```

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the total effective rpl stake

#### Defined in

rocketpool/node/node.ts:303

___

### getTotalRPLStake

▸ **getTotalRPLStake**(): `Promise`<`string`\>

Get the total RPL stake

**`example`** using Typescript
```ts
const totalRPLStake = rp.node.getTotalRPLStake().then((val: string) => { val };
```

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the total rpl stake

#### Defined in

rocketpool/node/node.ts:318

___

### calculateTotalEffectiveRPLStake

▸ **calculateTotalEffectiveRPLStake**(`offset`, `limit`, `rplPrice`): `Promise`<`string`\>

Calculate the total effective RPL stake provided inputs

**`params`** offset a number representing the offset

**`params`** limit a number representing the limit

**`params`** rplPrice a string representing the rplPrice

**`example`** using Typescript
```ts
const calculatedTotalEffectiveRPLStake = rp.node.calculateTotalEffectiveRPLStake(offset, limit, rplPrice).then((val: string) => { val };
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `offset` | `number` |
| `limit` | `number` |
| `rplPrice` | `string` |

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the calculated RPL stake given inputs

#### Defined in

rocketpool/node/node.ts:336

___

### getNodeCountPerTimezone

▸ **getNodeCountPerTimezone**(`offset`, `limit`): `Promise`<`object`\>

Get a breakdown of the number of nodes per timezone

**`params`** offset a number representing the offset

**`params`** limit a number representing the limit

**`example`** using Typescript
```ts
const nodeCountPerTimezone = rp.node.getNodeCountPerTimezone(offset, limit).then((val: object) => { val };
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `offset` | `number` |
| `limit` | `number` |

#### Returns

`Promise`<`object`\>

a Promise<object\> that resolves to an object node counts per timezone

#### Defined in

rocketpool/node/node.ts:353

___

### getDepositType

▸ **getDepositType**(`amount`): `Promise`<`number`\>

Get the deposit type

**`params`** amount a number representing the deposit amount

**`example`** using Typescript
```ts
const nodeCountPerTimezone = rp.node.getNodeCountPerTimezone(offset, limit).then((val: object) => { val };
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | `string` |

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the minipool deposit enum value type

#### Defined in

rocketpool/node/node.ts:369

___

### registerNode

▸ **registerNode**(`timezoneLocation`, `options?`, `onConfirmation?`): `Promise`<`TransactionReceipt`\>

Register a node

**`example`** using Typescript
```ts
const timezoneLocation = "Australia/Brisbane";
const nodeAddress = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const options = {
		from: nodeAddress,
		gas: 1000000
}
const txReceipt = rp.node.registerNode(timezoneLocation, options).then((txReceipt: TransactionReceipt) => { txReceipt };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timezoneLocation` | `string` | A string representing the timezone location |
| `options?` | `SendOptions` | An optional object of web3.eth.Contract SendOptions |
| `onConfirmation?` | [`ConfirmationHandler`](../interfaces/internal_/ConfirmationHandler.md) | An optional confirmation handler object |

#### Returns

`Promise`<`TransactionReceipt`\>

a Promise<TransactionReceipt\> that resolves to a TransactionReceipt object representing the receipt of the transaction

#### Defined in

rocketpool/node/node.ts:393

___

### setWithdrawalAddress

▸ **setWithdrawalAddress**(`nodeAddress`, `withdrawalAddress`, `confirm`, `options?`, `onConfirmation?`): `Promise`<`TransactionReceipt`\>

Set a node's withdrawal address

**`example`** using Typescript
```ts
const nodeAddress = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const withdrawalAddress = "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7";
const confirm = false; // will set the withdrawalAddress to pending
const options = {
		from: nodeAddress,
		gas: 1000000
}
const txReceipt = rp.node.setWithdrawalAddress(nodeAddress, withdrawalAddress, confirm, options).then((txReceipt: TransactionReceipt) => { txReceipt };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nodeAddress` | `string` | A string representing the node's address |
| `withdrawalAddress` | `string` | A string representing the withdrawalAddress |
| `confirm` | `boolean` | A boolean representing as to whether you which to auto confirm, true will auto confirm (negating the need to prove your ownership of the withdrawal address), false will set the withdrawal address to pending and will require an additional transaction (see confirmWithdrawalAddress) signed by the withdrawalAddress to prove ownership. |
| `options?` | `SendOptions` | An optional object of web3.eth.Contract SendOptions |
| `onConfirmation?` | [`ConfirmationHandler`](../interfaces/internal_/ConfirmationHandler.md) | An optional confirmation handler object |

#### Returns

`Promise`<`TransactionReceipt`\>

a Promise<TransactionReceipt\> that resolves to a TransactionReceipt object representing the receipt of the transaction

#### Defined in

rocketpool/node/node.ts:422

___

### stakeRPL

▸ **stakeRPL**(`amount`, `options?`, `onConfirmation?`): `Promise`<`TransactionReceipt`\>

Stake RPL for a node address

**`example`** using Typescript
```ts
const amount = web3.utils.toWei("5000", "ether");
const nodeAddress = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const options = {
		from: nodeAddress,
		gas: 1000000
}
const txReceipt = rp.node.stakeRPL(nodeAddress, options).then((txReceipt: TransactionReceipt) => { txReceipt };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `string` | A string representing the amount in Wei |
| `options?` | `SendOptions` | An optional object of web3.eth.Contract SendOptions |
| `onConfirmation?` | [`ConfirmationHandler`](../interfaces/internal_/ConfirmationHandler.md) | An optional confirmation handler object |

#### Returns

`Promise`<`TransactionReceipt`\>

a Promise<TransactionReceipt\> that resolves to a TransactionReceipt object representing the receipt of the transaction

#### Defined in

rocketpool/node/node.ts:452

___

### confirmWithdrawalAddress

▸ **confirmWithdrawalAddress**(`nodeAddress`, `options?`, `onConfirmation?`): `Promise`<`TransactionReceipt`\>

Confirm a  node's withdrawal address

**`example`** using Typescript
```ts
const nodeAddress = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const withdrawalAddress = "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7";
const options = {
		from: withdrawalAddress,
		gas: 1000000
}
const txReceipt = rp.node.confirmWithdrawalAddress(nodeAddress, options).then((txReceipt: TransactionReceipt) => { txReceipt };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nodeAddress` | `string` | A string representing the node's address |
| `options?` | `SendOptions` | An optional object of web3.eth.Contract SendOptions |
| `onConfirmation?` | [`ConfirmationHandler`](../interfaces/internal_/ConfirmationHandler.md) | An optional confirmation handler object |

#### Returns

`Promise`<`TransactionReceipt`\>

a Promise<TransactionReceipt\> that resolves to a TransactionReceipt object representing the receipt of the transaction

#### Defined in

rocketpool/node/node.ts:476

___

### withdrawRPL

▸ **withdrawRPL**(`amount`, `options?`, `onConfirmation?`): `Promise`<`TransactionReceipt`\>

Withdraw RPL for a node address

**`example`** using Typescript
```ts
const amount = web3.utils.toWei("5000", "ether");
const nodeAddress = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const options = {
		from: nodeAddress,
		gas: 1000000
}
const txReceipt = rp.node.withdrawRPL(nodeAddress, options).then((txReceipt: TransactionReceipt) => { txReceipt };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `string` | A string representing the amount in Wei |
| `options?` | `SendOptions` | An optional object of web3.eth.Contract SendOptions |
| `onConfirmation?` | [`ConfirmationHandler`](../interfaces/internal_/ConfirmationHandler.md) | An optional confirmation handler object |

#### Returns

`Promise`<`TransactionReceipt`\>

a Promise<TransactionReceipt\> that resolves to a TransactionReceipt object representing the receipt of the transaction

#### Defined in

rocketpool/node/node.ts:500

___

### setTimezoneLocation

▸ **setTimezoneLocation**(`timezoneLocation`, `options?`, `onConfirmation?`): `Promise`<`TransactionReceipt`\>

Set the node's timezone location

**`example`** using Typescript
```ts
const timezoneLocation = "Brisbane/Australia";
const nodeAddress = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const options = {
		from: nodeAddress,
		gas: 1000000
}
const txReceipt = rp.node.setTimezoneLocation(nodeAddress, options).then((txReceipt: TransactionReceipt) => { txReceipt };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timezoneLocation` | `string` | A string representing the timezone location |
| `options?` | `SendOptions` | An optional object of web3.eth.Contract SendOptions |
| `onConfirmation?` | [`ConfirmationHandler`](../interfaces/internal_/ConfirmationHandler.md) | An optional confirmation handler object |

#### Returns

`Promise`<`TransactionReceipt`\>

a Promise<TransactionReceipt\> that resolves to a TransactionReceipt object representing the receipt of the transaction

#### Defined in

rocketpool/node/node.ts:524

___

### deposit

▸ **deposit**(`minimumNodeFee`, `validatorPubKey`, `validatorSignature`, `depositDataRoot`, `salt`, `expectedMinipoolAddress`, `options?`, `onConfirmation?`): `Promise`<`TransactionReceipt`\>

Make a node deposit

**`example`** using Typescript
```ts
const minimumNodeFee = web3.utils.toWei("0", "ether");
const nodeAddress = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const options = {
		from: nodeAddress,
		gas: 1000000
}
const txReceipt = rp.node.deposit(minimumNodeFee, depositData.pubkey, depositData.signature, depositDataRoot, salt, minipoolAddress, options).then((txReceipt: TransactionReceipt) => { txReceipt };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `minimumNodeFee` | `string` | A string representing the minimumNodeFee in Wei |
| `validatorPubKey` | `Buffer` | A buffer representing the validator pub key |
| `validatorSignature` | `Buffer` | A buffer representing the validator signature |
| `depositDataRoot` | `Buffer` | A buffer representing the deposit data root |
| `salt` | `number` | A number representing the salt |
| `expectedMinipoolAddress` | `string` | A string representing the expected minipool address |
| `options?` | `SendOptions` | An optional object of web3.eth.Contract SendOptions |
| `onConfirmation?` | [`ConfirmationHandler`](../interfaces/internal_/ConfirmationHandler.md) | An optional confirmation handler object |

#### Returns

`Promise`<`TransactionReceipt`\>

a Promise<TransactionReceipt\> that resolves to a TransactionReceipt object representing the receipt of the transaction

#### Defined in

rocketpool/node/node.ts:553
