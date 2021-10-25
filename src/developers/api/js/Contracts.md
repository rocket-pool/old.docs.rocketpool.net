# Class: Contracts

Rocket Pool Contract Manager

## Constructors

### constructor

• **new Contracts**(`web3`, `RocketStorage`)

Create a new Contract instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `web3` | `default` | A valid Web3 instance |
| `RocketStorage` | `string` \| [`ContractArtifact`](../interfaces/internal_/ContractArtifact.md) | a RocketStorage address as a string or ContractArtifact (JSON ABI file) |

#### Defined in

rocketpool/contracts/contracts.ts:23

## Properties

### rocketStorage

• `Readonly` **rocketStorage**: `Promise`<`Contract`\>

#### Defined in

rocketpool/contracts/contracts.ts:12

___

### addresses

• `Private` **addresses**: `Object` = `{}`

#### Index signature

▪ [name: `string`]: `Promise`<`string`\>

#### Defined in

rocketpool/contracts/contracts.ts:13

___

### abis

• `Private` **abis**: `Object` = `{}`

#### Index signature

▪ [name: `string`]: `Promise`<`AbiItem`[]\>

#### Defined in

rocketpool/contracts/contracts.ts:14

___

### contracts

• `Private` **contracts**: `Object` = `{}`

#### Index signature

▪ [name: `string`]: `Promise`<`Contract`\>

#### Defined in

rocketpool/contracts/contracts.ts:15

## Methods

### address

▸ **address**(`name`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

rocketpool/contracts/contracts.ts:35

▸ **address**(`names`): `Promise`<`string`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `names` | `string`[] |

#### Returns

`Promise`<`string`[]\>

#### Defined in

rocketpool/contracts/contracts.ts:36

___

### abi

▸ **abi**(`name`): `Promise`<`AbiItem`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`<`AbiItem`[]\>

#### Defined in

rocketpool/contracts/contracts.ts:55

▸ **abi**(`names`): `Promise`<`AbiItem`[][]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `names` | `string`[] |

#### Returns

`Promise`<`AbiItem`[][]\>

#### Defined in

rocketpool/contracts/contracts.ts:56

___

### get

▸ **get**(`name`): `Promise`<`Contract`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`<`Contract`\>

#### Defined in

rocketpool/contracts/contracts.ts:75

▸ **get**(`names`): `Promise`<`Contract`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `names` | `string`[] |

#### Returns

`Promise`<`Contract`[]\>

#### Defined in

rocketpool/contracts/contracts.ts:76

___

### make

▸ **make**(`name`, `address`): `Promise`<`Contract`\>

Create a new contract instance with the specified ABI name and address

**`example`** using Typescript
```ts
const minipool = await rp.contracts.make("rocketMinipoolDelegate", "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294");
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | A string representing the name of the contract |
| `address` | `string` | A string representing the address of the specific instance |

#### Returns

`Promise`<`Contract`\>

a Promise<Contract\> that resolves to a web3.eth.contract instance of the contract

#### Defined in

rocketpool/contracts/contracts.ts:105
