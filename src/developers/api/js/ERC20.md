# Class: ERC20

ERC20 Token Contract

## Hierarchy

- **`ERC20`**

  ↳ [`LegacyRPL`](LegacyRPL.md)

  ↳ [`RETH`](RETH.md)

  ↳ [`RPL`](RPL.md)

## Constructors

### constructor

• **new ERC20**(`web3`, `contracts`, `tokenContractName`)

Create a new ERC20 instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `web3` | `default` | A valid Web3 instance |
| `contracts` | [`Contracts`](Contracts.md) | A Rocket Pool contract manager instance |
| `tokenContractName` | `string` | A string representing the Token Contract Name |

#### Defined in

rocketpool/tokens/erc20.ts:19

## Properties

### web3

• `Protected` **web3**: `default`

___

### contracts

• `Protected` **contracts**: [`Contracts`](Contracts.md)

___

### tokenContractName

• `Protected` **tokenContractName**: `string`

## Accessors

### tokenContract

• `Protected` `get` **tokenContract**(): `Promise`<`Contract`\>

Private accessor use to retrieve the related contract

#### Returns

`Promise`<`Contract`\>

a Promise<Contract\> with a web3.eth.contract instance of the contract passed into the constructor

#### Defined in

rocketpool/tokens/erc20.ts:25

## Methods

### balanceOf

▸ **balanceOf**(`account`): `Promise`<`string`\>

Return the token balance of an account

**`example`** using Typescript
const account = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
```ts
const balance = rp.tokens.rpl.balanceOf(account).then((val: string) => { val };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | A string representing the address you wish to lookup the balance for |

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the token balance in Wei

#### Defined in

rocketpool/tokens/erc20.ts:40

___

### allowance

▸ **allowance**(`account`, `spender`): `Promise`<`string`\>

Return the token allowance for an account

**`example`** using Typescript
const account = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const contractAddress = rp.api.contracts.get("rocketTokenRPL").then((val: string) => { contract.options.address };
```ts
const balance = rp.tokens.rpl.allowance(account, contractAddress).then((val: string) => { val };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | A string representing the address you wish to lookup the balance for |
| `spender` | `string` | A string representing the spender address (usually a token contract) |

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the token balance in Wei

#### Defined in

rocketpool/tokens/erc20.ts:59

___

### transfer

▸ **transfer**(`to`, `amountWei`, `options?`, `onConfirmation?`): `Promise`<`TransactionReceipt`\>

Transfer tokens to an account to a recipient if approved

**`example`** using Typescript
```ts
const fromAddress = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const toAddress = "0x421433c3f99529A704Ec2270E1A68fa66DD8bD79";
const amountWei = web3.utils.toWei("20", "ether");
const options = {
		from: fromAddress,
		gas: 1000000
};
const txReceipt = rp.tokens.rpl.transfer(toAddress, amountWei, options).then((txReceipt: TransactionReceipt) => { txReceipt };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `to` | `string` | A string representing the to address |
| `amountWei` | `string` | A string representing the amount to send in Wei |
| `options?` | `SendOptions` | An optional object of web3.eth.Contract SendOptions |
| `onConfirmation?` | [`ConfirmationHandler`](../interfaces/internal_/ConfirmationHandler.md) | An optional confirmation handler object |

#### Returns

`Promise`<`TransactionReceipt`\>

a Promise<TransactionReceipt\> that resolves to a TransactionReceipt object representing the receipt of the transaction

#### Defined in

rocketpool/tokens/erc20.ts:85

___

### approve

▸ **approve**(`spender`, `amountWei`, `options?`, `onConfirmation?`): `Promise`<`TransactionReceipt`\>

Approve an allowance for a spender

**`example`** using Typescript
```ts
const fromAddress = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const contractAddress = rp.api.contracts.get("rocketTokenRPL").then((val: string) => { contract.options.address };
const amountWei = web3.utils.toWei("20", "ether");
const options = {
		from: fromAddress,
		gas: 1000000
};
const txReceipt = rp.tokens.rpl.approve(contractAddress, amountWei, options).then((txReceipt: TransactionReceipt) => { txReceipt };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `spender` | `string` | A string representing the spender address (usually a token contract) |
| `amountWei` | `string` | A string representing the amount to send in Wei |
| `options?` | `SendOptions` | An optional object of web3.eth.Contract SendOptions |
| `onConfirmation?` | [`ConfirmationHandler`](../interfaces/internal_/ConfirmationHandler.md) | An optional confirmation handler object |

#### Returns

`Promise`<`TransactionReceipt`\>

a Promise<TransactionReceipt\> that resolves to a TransactionReceipt object representing the receipt of the transaction

#### Defined in

rocketpool/tokens/erc20.ts:111

___

### transferFrom

▸ **transferFrom**(`from`, `to`, `amountWei`, `options?`, `onConfirmation?`): `Promise`<`TransactionReceipt`\>

Transfer tokens from an account to a recipient if approved

**`example`** using Typescript
```ts
const fromAddress = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const toAddress = "0x421433c3f99529A704Ec2270E1A68fa66DD8bD79";
const amountWei = web3.utils.toWei("20", "ether");
const options = {
		from: fromAddress,
		gas: 1000000
};
const txReceipt = rp.tokens.rpl.transferFrom(from, to, options).then((txReceipt: TransactionReceipt) => { txReceipt };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `from` | `string` | A string representing the from address |
| `to` | `string` | A string representing the to address |
| `amountWei` | `string` | A string representing the amount to send in Wei |
| `options?` | `SendOptions` | An optional object of web3.eth.Contract SendOptions |
| `onConfirmation?` | [`ConfirmationHandler`](../interfaces/internal_/ConfirmationHandler.md) | An optional confirmation handler object |

#### Returns

`Promise`<`TransactionReceipt`\>

a Promise<TransactionReceipt\> that resolves to a TransactionReceipt object representing the receipt of the transaction

#### Defined in

rocketpool/tokens/erc20.ts:138
