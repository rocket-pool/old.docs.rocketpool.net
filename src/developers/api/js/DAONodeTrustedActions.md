# Class: DAONodeTrustedActions

Rocket Pool DAO Trusted Node Actions

## Constructors

### constructor

• **new DAONodeTrustedActions**(`web3`, `contracts`)

Create a new DAONodeTrustedActions instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `web3` | `default` | A valid Web3 instance |
| `contracts` | [`Contracts`](Contracts.md) | A Rocket Pool contract manager instance |

#### Defined in

rocketpool/dao/node/trusted/actions.ts:18

## Accessors

### rocketDAONodeTrustedActions

• `Private` `get` **rocketDAONodeTrustedActions**(): `Promise`<`Contract`\>

Private accessor use to retrieve the related contract

#### Returns

`Promise`<`Contract`\>

a Promise<Contract\> with a web3.eth.contract instance of the rocketDAONodeTrustedActions contract

#### Defined in

rocketpool/dao/node/trusted/actions.ts:24

## Methods

### actionJoin

▸ **actionJoin**(`options?`, `onConfirmation?`): `Promise`<`TransactionReceipt`\>

Join the DAO

**`example`** using Typescript
```ts
const nodeAddress = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const options = {
		from: nodeAddress,
		gas: 1000000
}
const txReceipt = rp.dao.node.trusted.actions.actionJoin(options).then((txReceipt: TransactionReceipt) => { txReceipt };
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

rocketpool/dao/node/trusted/actions.ts:44

___

### actionLeave

▸ **actionLeave**(`refundAddress`, `options?`, `onConfirmation?`): `Promise`<`TransactionReceipt`\>

Leave the DAO

**`example`** using Typescript
```ts
const nodeAddress = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const options = {
		from: nodeAddress,
		gas: 1000000
}
const txReceipt = rp.dao.node.trusted.actions.actionLeave(options).then((txReceipt: TransactionReceipt) => { txReceipt };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `refundAddress` | `string` | - |
| `options?` | `SendOptions` | An optional object of web3.eth.Contract SendOptions |
| `onConfirmation?` | [`ConfirmationHandler`](../interfaces/internal_/ConfirmationHandler.md) | An optional confirmation handler object |

#### Returns

`Promise`<`TransactionReceipt`\>

a Promise<TransactionReceipt\> that resolves to a TransactionReceipt object representing the receipt of the transaction

#### Defined in

rocketpool/dao/node/trusted/actions.ts:66

___

### actionChallengeMake

▸ **actionChallengeMake**(`address`, `options?`, `onConfirmation?`): `Promise`<`TransactionReceipt`\>

Challenge another DAO member

**`example`** using Typescript
```ts
const addressToChallenge = "0x421433c3f99529A704Ec2270E1A68fa66DD8bD79";
const nodeAddress = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const options = {
		from: nodeAddress,
		gas: 1000000
}
const txReceipt = rp.dao.node.trusted.actions.actionChallengeMake(addressToChallenge, options).then((txReceipt: TransactionReceipt) => { txReceipt };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | A string representing the address of the DAO member you want challenge |
| `options?` | `SendOptions` | An optional object of web3.eth.Contract SendOptions |
| `onConfirmation?` | [`ConfirmationHandler`](../interfaces/internal_/ConfirmationHandler.md) | An optional confirmation handler object |

#### Returns

`Promise`<`TransactionReceipt`\>

a Promise<TransactionReceipt\> that resolves to a TransactionReceipt object representing the receipt of the transaction

#### Defined in

rocketpool/dao/node/trusted/actions.ts:90

___

### actionChallengeDecide

▸ **actionChallengeDecide**(`address`, `options?`, `onConfirmation?`): `Promise`<`TransactionReceipt`\>

Decides the success of a challenge

**`example`** using Typescript
```ts
const addressToChallenge = "0x421433c3f99529A704Ec2270E1A68fa66DD8bD79";
const nodeAddress = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const options = {
		from: nodeAddress,
		gas: 1000000
}
const txReceipt = rp.dao.node.trusted.actions.actionChallengeMake(addressToChallenge, options).then((txReceipt: TransactionReceipt) => { txReceipt };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | A string representing the address of the DAO member you want challenge |
| `options?` | `SendOptions` | An optional object of web3.eth.Contract SendOptions |
| `onConfirmation?` | [`ConfirmationHandler`](../interfaces/internal_/ConfirmationHandler.md) | An optional confirmation handler object |

#### Returns

`Promise`<`TransactionReceipt`\>

a Promise<TransactionReceipt\> that resolves to a TransactionReceipt object representing the receipt of the transaction

#### Defined in

rocketpool/dao/node/trusted/actions.ts:114
