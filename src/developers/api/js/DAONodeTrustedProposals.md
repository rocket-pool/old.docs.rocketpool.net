# Class: DAONodeTrustedProposals

Rocket Pool DAO Trusted Node Proposals

## Constructors

### constructor

• **new DAONodeTrustedProposals**(`web3`, `contracts`)

Create a new DAONodeTrustedProposals instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `web3` | `default` | A valid Web3 instance |
| `contracts` | [`Contracts`](Contracts.md) | A Rocket Pool contract manager instance |

#### Defined in

rocketpool/dao/node/trusted/proposals.ts:18

## Accessors

### rocketDAONodeTrustedProposals

• `Private` `get` **rocketDAONodeTrustedProposals**(): `Promise`<`Contract`\>

Private accessor use to retrieve the related contract

#### Returns

`Promise`<`Contract`\>

a Promise<Contract\> with a web3.eth.contract instance of the rocketDAONodeTrustedProposals contract

#### Defined in

rocketpool/dao/node/trusted/proposals.ts:24

## Methods

### propose

▸ **propose**(`message`, `payload`, `options?`, `onConfirmation?`): `Promise`<`TransactionReceipt`\>

Create a DAO proposal with calldata

**`example`** using Typescript
```ts
const proposerDAOMember = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const toBeKickedDAOMember = "0x6f10Fd508321D27D8F19CBCC2F2f3d5527B637eC";
const fineAmount = "5000000000000000000000";
const message = "hey guys, this member hasn't logged on for weeks, lets boot them with a 33% fine!";
const proposalCalldata = web3.eth.abi.encodeFunctionCall(
{
				name: "proposalKick",
				type: "function",
					inputs: [
						{ type: "address", name: "_nodeAddress" },
						{ type: "uint256", name: "_rplFine" },
					],
},
[toBeKickedDAOMember, registeredNodeTrusted2BondAmountFine.toString()]
);

const options = {
		from: proposerDAOMember,
		gas: 1000000
}
const txReceipt = rp.dao.node.trusted.proposals.propose(message, payload, options).then((txReceipt: TransactionReceipt) => { txReceipt };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | A string representing the message |
| `payload` | `string` | A string representing the calldata payload |
| `options?` | `SendOptions` | An optional object of web3.eth.Contract SendOptions |
| `onConfirmation?` | [`ConfirmationHandler`](../interfaces/internal_/ConfirmationHandler.md) | An optional confirmation handler object |

#### Returns

`Promise`<`TransactionReceipt`\>

a Promise<TransactionReceipt\> that resolves to a TransactionReceipt object representing the receipt of the transaction

#### Defined in

rocketpool/dao/node/trusted/proposals.ts:61

___

### vote

▸ **vote**(`proposalID`, `vote`, `options?`, `onConfirmation?`): `Promise`<`TransactionReceipt`\>

Vote on an existing proposal

**`example`** using Typescript
```ts
const proposalID = 1;
const vote = true;
const daoMember = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";

const options = {
		from: daoMember,
		gas: 1000000
}
const txReceipt = rp.dao.node.trusted.proposals.vote(proposalID, vote, options).then((txReceipt: TransactionReceipt) => { txReceipt };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `proposalID` | `number` | A number representing the proposalID |
| `vote` | `boolean` | A boolean representing the vote |
| `options?` | `SendOptions` | An optional object of web3.eth.Contract SendOptions |
| `onConfirmation?` | [`ConfirmationHandler`](../interfaces/internal_/ConfirmationHandler.md) | An optional confirmation handler object |

#### Returns

`Promise`<`TransactionReceipt`\>

a Promise<TransactionReceipt\> that resolves to a TransactionReceipt object representing the receipt of the transaction

#### Defined in

rocketpool/dao/node/trusted/proposals.ts:88

___

### execute

▸ **execute**(`proposalID`, `options?`, `onConfirmation?`): `Promise`<`TransactionReceipt`\>

Execute on an existing proposal

**`example`** using Typescript
```ts
const proposalID = 1;
const daoMember = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";

const options = {
		from: daoMember,
		gas: 1000000
}
const txReceipt = rp.dao.node.trusted.proposals.execute(proposalID, vote, options).then((txReceipt: TransactionReceipt) => { txReceipt };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `proposalID` | `number` | A number representing the proposalID |
| `options?` | `SendOptions` | An optional object of web3.eth.Contract SendOptions |
| `onConfirmation?` | [`ConfirmationHandler`](../interfaces/internal_/ConfirmationHandler.md) | An optional confirmation handler object |

#### Returns

`Promise`<`TransactionReceipt`\>

a Promise<TransactionReceipt\> that resolves to a TransactionReceipt object representing the receipt of the transaction

#### Defined in

rocketpool/dao/node/trusted/proposals.ts:113

___

### cancel

▸ **cancel**(`proposalID`, `options?`, `onConfirmation?`): `Promise`<`TransactionReceipt`\>

Cancel an existing proposal

**`example`** using Typescript
```ts
const proposalID = 1;
const daoMember = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";

const options = {
		from: daoMember,
		gas: 1000000
}
const txReceipt = rp.dao.node.trusted.proposals.cancel(proposalID, vote, options).then((txReceipt: TransactionReceipt) => { txReceipt };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `proposalID` | `number` | A number representing the proposalID |
| `options?` | `SendOptions` | An optional object of web3.eth.Contract SendOptions |
| `onConfirmation?` | [`ConfirmationHandler`](../interfaces/internal_/ConfirmationHandler.md) | An optional confirmation handler object |

#### Returns

`Promise`<`TransactionReceipt`\>

a Promise<TransactionReceipt\> that resolves to a TransactionReceipt object representing the receipt of the transaction

#### Defined in

rocketpool/dao/node/trusted/proposals.ts:138
