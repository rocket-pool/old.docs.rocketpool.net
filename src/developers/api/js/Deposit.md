# Class: Deposit

Rocket Pool Deposit Pool Manager

## Constructors

### constructor

• **new Deposit**(`web3`, `contracts`)

Create a new Deposit instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `web3` | `default` | A valid Web3 instance |
| `contracts` | [`Contracts`](Contracts.md) | A Rocket Pool contract manager instance |

#### Defined in

rocketpool/deposit/deposit.ts:18

## Accessors

### rocketDepositPool

• `Private` `get` **rocketDepositPool**(): `Promise`<`Contract`\>

Private accessor use to retrieve the related contract

#### Returns

`Promise`<`Contract`\>

a Promise<Contract\> with a web3.eth.contract instance of the rocketDepositPool contract

#### Defined in

rocketpool/deposit/deposit.ts:24

## Methods

### getBalance

▸ **getBalance**(): `Promise`<`string`\>

Get the current deposit pool balance in Wei

**`example`** using Typescript
```ts
const balanceInWei = rp.deposit.getBalance().then((val: string) => { val };
// convert to Ether if needed
const balanceInEth = web3.utils.fromWei(balanceInWei, 'ether')
```

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the current deposit pool balance in Wei

#### Defined in

rocketpool/deposit/deposit.ts:39

___

### getExcessBalance

▸ **getExcessBalance**(): `Promise`<`string`\>

Get the excess balance in Wei

**`example`** using Typescript
```ts
const balanceInWei = rp.deposit.getExcessBalance().then((val: string) => { val };
// convert to Ether if needed
const balanceInEth = web3.utils.fromWei(balanceInWei, 'ether')
```

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the current excess balance in Wei

#### Defined in

rocketpool/deposit/deposit.ts:56

___

### getUserLastDepositBlock

▸ **getUserLastDepositBlock**(`address`): `Promise`<`number`\>

Get the block of the last user deposit

**`example`** using Typescript
```ts
const block = rp.deposit.getUserLastDepositBlock().then((val: number) => { val };
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the block of the last user deposit

#### Defined in

rocketpool/deposit/deposit.ts:71

___

### deposit

▸ **deposit**(`options?`, `onConfirmation?`): `Promise`<`TransactionReceipt`\>

Make a deposit

**`example`** using Typescript
```ts
const nodeAddress = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const options = {
		from: nodeAddress,
	  value: web3.utils.toWei("10", "ether"),
		gas: 1000000
}
const txReceipt = rp.deposit.deposit(options).then((txReceipt: TransactionReceipt) => { txReceipt };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | `SendOptions` | An optional object of web3.eth.Contract SendOptions |
| `onConfirmation?` | [`ConfirmationHandler`](../interfaces/internal_/ConfirmationHandler.md) | An optional confirmation handler object |

#### Returns

`Promise`<`TransactionReceipt`\>

a Promise<TransactionReceipt\> that resolves to a TransactionReceipt object representing the receipt of the transaction

#### Defined in

rocketpool/deposit/deposit.ts:94

___

### assignDeposits

▸ **assignDeposits**(`options?`, `onConfirmation?`): `Promise`<`TransactionReceipt`\>

Assign Deposits

**`example`** using Typescript
```ts
const nodeAddress = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const options = {
		from: nodeAddress,
		gas: 1000000
}
const txReceipt = rp.deposit.assignDeposits(options).then((txReceipt: TransactionReceipt) => { txReceipt };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | `SendOptions` | An optional object of web3.eth.Contract SendOptions |
| `onConfirmation?` | [`ConfirmationHandler`](../interfaces/internal_/ConfirmationHandler.md) | An optional confirmation handler object |

#### Returns

`Promise`<`TransactionReceipt`\>

a Promise<TransactionReceipt\> that resolves to a TransactionReceipt object representing the receipt of the transaction

#### Defined in

rocketpool/deposit/deposit.ts:116
