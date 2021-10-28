# Class: RETH

Rocket Pool RETH Token Manager

## Hierarchy

- [`ERC20`](ERC20.md)

  ↳ **`RETH`**

## Constructors

### constructor

• **new RETH**(`web3`, `contracts`)

Create a new rETH instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `web3` | `default` | A valid Web3 instance |
| `contracts` | [`Contracts`](Contracts.md) | A Rocket Pool contract manager instance |

#### Overrides

[ERC20](ERC20.md).[constructor](ERC20.md#constructor)

#### Defined in

rocketpool/tokens/reth.ts:19

## Properties

### web3

• `Protected` **web3**: `default`

#### Inherited from

[ERC20](ERC20.md).[web3](ERC20.md#web3)

___

### contracts

• `Protected` **contracts**: [`Contracts`](Contracts.md)

#### Inherited from

[ERC20](ERC20.md).[contracts](ERC20.md#contracts)

___

### tokenContractName

• `Protected` **tokenContractName**: `string`

#### Inherited from

[ERC20](ERC20.md).[tokenContractName](ERC20.md#tokencontractname)

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

#### Inherited from

[ERC20](ERC20.md).[balanceOf](ERC20.md#balanceof)

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

#### Inherited from

[ERC20](ERC20.md).[allowance](ERC20.md#allowance)

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

#### Inherited from

[ERC20](ERC20.md).[transfer](ERC20.md#transfer)

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

#### Inherited from

[ERC20](ERC20.md).[approve](ERC20.md#approve)

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

#### Inherited from

[ERC20](ERC20.md).[transferFrom](ERC20.md#transferfrom)

#### Defined in

rocketpool/tokens/erc20.ts:138

___

### getEthValue

▸ **getEthValue**(`rethAmountWei`): `Promise`<`string`\>

Get the amount of ETH backing an amount of rETH

**`params`** rethAmountWei a string representing the rETH amount in Wei

**`example`** using Typescript
```ts
const rethAmountWei = web3.utils.toWei("1", "ether");
const ethValue = rp.tokens.reth.getEthValue(rethAmountWei).then((val: string) => { val };
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `rethAmountWei` | `string` |

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the amount amount of rETH backing an amount of ETH

#### Defined in

rocketpool/tokens/reth.ts:34

___

### getRethValue

▸ **getRethValue**(`ethAmountWei`): `Promise`<`string`\>

Get the amount of rETH backing an amount of ETH

**`params`** ethAmountWei a string representing the ETH amount in Wei

**`example`** using Typescript
```ts
const ethAmountWei = web3.utils.toWei("1", "ether");
const rethValue = rp.tokens.reth.getRethValue(ethAmountWei).then((val: string) => { val };
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `ethAmountWei` | `string` |

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the amount amount of rETH backing an amount of ETH

#### Defined in

rocketpool/tokens/reth.ts:51

___

### getExchangeRate

▸ **getExchangeRate**(): `Promise`<`number`\>

Get the current ETH to rETH exchange rate

**`example`** using Typescript
```ts
const exchangeRate = rp.tokens.reth.getTotalCollateral().then((val: number) => { val };
```

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the amount of ETH backing 1 rETH

#### Defined in

rocketpool/tokens/reth.ts:66

___

### getTotalCollateral

▸ **getTotalCollateral**(): `Promise`<`string`\>

Get the total amount of ETH collateral available

**`example`** using Typescript
```ts
const totalCollateral = rp.tokens.reth.getTotalCollateral().then((val: string) => { val };
```

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the portion of rETH backed by ETH in the contract as a fraction

#### Defined in

rocketpool/tokens/reth.ts:81

___

### getCollateralRate

▸ **getCollateralRate**(): `Promise`<`number`\>

Get the current ETH collateral rate

**`example`** using Typescript
```ts
const rate = rp.tokens.reth.getCollateralRate().then((val: number) => { val };
```

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the portion of rETH backed by ETH in the contract as a fraction

#### Defined in

rocketpool/tokens/reth.ts:96

___

### getTotalSupply

▸ **getTotalSupply**(): `Promise`<`number`\>

Get the total supply

**`example`** using Typescript
```ts
const supply = rp.tokens.reth.totalSupply().then((val: number) => { val };
```

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the total supply

#### Defined in

rocketpool/tokens/reth.ts:111

___

### burn

▸ **burn**(`amountWei`, `options?`, `onConfirmation?`): `Promise`<`TransactionReceipt`\>

Burn rETH for ETH

**`example`** using Typescript
```ts
const fromAddress = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const amountWei = web3.utils.toWei("1", "ether");
const options = {
		from: fromAddress,
		gas: 1000000
};
const txReceipt = rp.tokens.reth.burn(amountWei, options).then((txReceipt: TransactionReceipt) => { txReceipt };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amountWei` | `string` | A string representing the amount to burn in Wei |
| `options?` | `SendOptions` | An optional object of web3.eth.Contract SendOptions |
| `onConfirmation?` | [`ConfirmationHandler`](../interfaces/internal_/ConfirmationHandler.md) | An optional confirmation handler object |

#### Returns

`Promise`<`TransactionReceipt`\>

a Promise<TransactionReceipt\> that resolves to a TransactionReceipt object representing the receipt of the transaction

#### Defined in

rocketpool/tokens/reth.ts:135
