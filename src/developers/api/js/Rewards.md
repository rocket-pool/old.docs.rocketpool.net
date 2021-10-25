# Class: Rewards

Rocket Pool Rewards

## Constructors

### constructor

• **new Rewards**(`web3`, `contracts`)

Create a new Rewards instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `web3` | `default` | A valid Web3 instance |
| `contracts` | [`Contracts`](Contracts.md) | A Rocket Pool contract manager instance |

#### Defined in

rocketpool/rewards/claim-trusted-node.ts:19

## Accessors

### rocketClaimTrustedNode

• `Private` `get` **rocketClaimTrustedNode**(): `Promise`<`Contract`\>

Private accessor use to retrieve the related contract

#### Returns

`Promise`<`Contract`\>

a Promise<Contract\> with a web3.eth.contract instance of the rocketClaimTrustedNode contract

#### Defined in

rocketpool/rewards/claim-trusted-node.ts:25

## Methods

### getClaimRewardsAmount

▸ **getClaimRewardsAmount**(`address`): `Promise`<`string`\>

Get claim rewards amount

**`params`** address a string representing the node address

**`example`** using Typescript
```ts
const address = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const claimPossible = rp.rewards.claimTrustedNode.getClaimRewardsAmount(address).then((val: string) => { val };
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the claim rewards amount in Wei

#### Defined in

rocketpool/rewards/claim-trusted-node.ts:40

___

### claim

▸ **claim**(`options?`, `onConfirmation?`): `Promise`<`TransactionReceipt`\>

Claim from a trusted node

**`example`** using Typescript
```ts
const trustedNode = "0x421433c3f99529A704Ec2270E1A68fa66DD8bD79";
const options = {
		from: trustedNode,
		gas: 1000000
};
const txReceipt = rp.rewards.claimTrustedNode(options).then((txReceipt: TransactionReceipt) => { txReceipt };
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

rocketpool/rewards/claim-trusted-node.ts:62
