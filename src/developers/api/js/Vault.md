# Class: Vault

Rocket Pool Vault

## Constructors

### constructor

• **new Vault**(`web3`, `contracts`)

Create a new Vault instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `web3` | `default` | A valid Web3 instance |
| `contracts` | [`Contracts`](Contracts.md) | A Rocket Pool contract manager instance |

#### Defined in

rocketpool/vault/vault.ts:16

## Accessors

### rocketVault

• `Private` `get` **rocketVault**(): `Promise`<`Contract`\>

Private accessor use to retrieve the related contract

#### Returns

`Promise`<`Contract`\>

a Promise<Contract\> with a web3.eth.contract instance of the rocketVault contract

#### Defined in

rocketpool/vault/vault.ts:22

## Methods

### getAddress

▸ **getAddress**(): `Promise`<`string`\>

Retrieve the RocketVault contract address

**`example`** using Typescript
```ts
const rocketVault = rp.vault.getAddress().then((val: string) => { val };
```

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to the Rocket Vault contract address

#### Defined in

rocketpool/vault/vault.ts:35

___

### balanceOfToken

▸ **balanceOfToken**(`contractAddress`, `tokenAddress`): `Promise`<`string`\>

Retrieve the balance of a token when providing a contract & token address

**`example`** using Typescript
```ts
const rplBalance = rp.vault.balanceOfToken("rocketClaimDAO", rocketTokenRPLAddress).then((val: string) => { val }
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractAddress` | `string` | A string representing the contract address |
| `tokenAddress` | `string` | A string representing the token address |

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to the Rocket Vault contract address

#### Defined in

rocketpool/vault/vault.ts:52
