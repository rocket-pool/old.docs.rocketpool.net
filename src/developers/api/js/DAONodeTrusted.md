# Class: DAONodeTrusted

Rocket Pool DAO Trusted Node

## Constructors

### constructor

• **new DAONodeTrusted**(`web3`, `contracts`)

Create a new DAONodeTrusted instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `web3` | `default` | A valid Web3 instance |
| `contracts` | [`Contracts`](Contracts.md) | A Rocket Pool contract manager instance |

#### Defined in

rocketpool/dao/node/trusted/node.ts:18

## Accessors

### rocketDAONodeTrusted

• `Private` `get` **rocketDAONodeTrusted**(): `Promise`<`Contract`\>

Private accessor use to retrieve the related contract

#### Returns

`Promise`<`Contract`\>

a Promise<Contract\> with a web3.eth.contract instance of the rocketDAONodeTrusted contract

#### Defined in

rocketpool/dao/node/trusted/node.ts:24

## Methods

### getMemberID

▸ **getMemberID**(`address`): `Promise`<`string`\>

Return the member id given an address

**`example`** using Typescript
const account = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
```ts
const memberID = rp.dao.node.trusted.node.getMemberID(account).then((val: string) => { val };
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the member id

#### Defined in

rocketpool/dao/node/trusted/node.ts:39

___

### getMemberCount

▸ **getMemberCount**(): `Promise`<`number`\>

Get the number of DAO Members

**`example`** using Typescript
```ts
const memberCount = rp.dao.node.trusted.node.getMemberCount().then((val: number) => { val };
```

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the number of DAO members

#### Defined in

rocketpool/dao/node/trusted/node.ts:54

___

### getBootstrapModeDisabled

▸ **getBootstrapModeDisabled**(): `Promise`<`boolean`\>

Check if Bootstrap Mode is enabled

**`example`** using Typescript
```ts
const enabled = rp.dao.node.trusted.node.getBootstrapModeDisabled().then((val: number) => { val };
```

#### Returns

`Promise`<`boolean`\>

a Promise<boolean\> that resolves to a boolean representing if bootstrap mode is enabled

#### Defined in

rocketpool/dao/node/trusted/node.ts:69

___

### getProposalQuorumVotesRequired

▸ **getProposalQuorumVotesRequired**(): `Promise`<`number`\>

Get the number of votes needed for a proposal to pass

**`example`** using Typescript
```ts
const votes = rp.dao.node.trusted.node.getProposalQuorumVotesRequired().then((val: number) => { val };
```

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the number of votes needed for a proposal to pass

#### Defined in

rocketpool/dao/node/trusted/node.ts:84

___

### getMemberIsValid

▸ **getMemberIsValid**(`address`): `Promise`<`boolean`\>

Check if a member is valid

**`example`** using Typescript
```ts
const address = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const valid = rp.dao.node.trusted.node.getMemberIsValid(address).then((val: boolean) => { val };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | A string representing the address you wish to check if a member is valid |

#### Returns

`Promise`<`boolean`\>

a Promise<boolean\> that resolves to a boolean representing if a member is valid

#### Defined in

rocketpool/dao/node/trusted/node.ts:101

___

### getMemberRPLBondAmount

▸ **getMemberRPLBondAmount**(`address`): `Promise`<`string`\>

Get a member's RPL bond amount

**`example`** using Typescript
```ts
const address = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const bondAmount = rp.dao.node.trusted.node.getMemberRPLBondAmount(address).then((val: string) => { val };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | A string representing the address you wish to lookup |

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing if a member is valid

#### Defined in

rocketpool/dao/node/trusted/node.ts:118

___

### getMemberIsChallenged

▸ **getMemberIsChallenged**(`address`): `Promise`<`boolean`\>

Check if a member has been challenged

**`example`** using Typescript
```ts
const address = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const challenged = rp.dao.node.trusted.node.getMemberRPLBondAmount(address).then((val: boolean) => { val };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | A string representing the address you wish to lookup |

#### Returns

`Promise`<`boolean`\>

a Promise<boolean\> that resolves to a boolean representing if a member is valid

#### Defined in

rocketpool/dao/node/trusted/node.ts:135

___

### bootstrapMember

▸ **bootstrapMember**(`id`, `url`, `nodeAddress`, `options?`, `onConfirmation?`): `Promise`<`TransactionReceipt`\>

Bootstrap a DAO Member

**`example`** using Typescript
```ts
const id = "kermit";
const url = "https://kermit.xyz";
const guardian = "0x421433c3f99529A704Ec2270E1A68fa66DD8bD79";
const nodeAddress = "0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294";
const options = {
		from: guardian, // bootstrap can only be performed by guardian and if bootstrap mode is enabled
		gas: 1000000
};
const txReceipt = rp.dao.node.trusted.bootstrapMember(id, url, nodeAddress, options).then((txReceipt: TransactionReceipt) => { txReceipt };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | A string representing the id or name of the member |
| `url` | `string` | A string representing the url for the member |
| `nodeAddress` | `string` | A string representing the address of the member you are adding |
| `options?` | `SendOptions` | An optional object of web3.eth.Contract SendOptions |
| `onConfirmation?` | [`ConfirmationHandler`](../interfaces/internal_/ConfirmationHandler.md) | An optional confirmation handler object |

#### Returns

`Promise`<`TransactionReceipt`\>

a Promise<TransactionReceipt\> that resolves to a TransactionReceipt object representing the receipt of the transaction

#### Defined in

rocketpool/dao/node/trusted/node.ts:163

___

### bootstrapSettingBool

▸ **bootstrapSettingBool**(`settingContractInstance`, `settingPath`, `value`, `options?`, `onConfirmation?`): `Promise`<`TransactionReceipt`\>

Bootstrap a Boolean Setting

**`example`** using Typescript
```ts
const settingContractInstance = "kermit";
const settingPath = "https://kermit.xyz";
const value = true;
const guardian = "0x421433c3f99529A704Ec2270E1A68fa66DD8bD79";
const options = {
		from: guardian, // bootstrap can only be performed by guardian
		gas: 1000000
};
const txReceipt = rp.dao.node.trusted.bootstrapSettingBool(settingContractInstance, settingPath, value, options).then((txReceipt: TransactionReceipt) => { txReceipt };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `settingContractInstance` | `string` | A string representing contract instance |
| `settingPath` | `string` | A string representing the path for the setting |
| `value` | `boolean` | A boolean representing the value of the setting you wish to set |
| `options?` | `SendOptions` | An optional object of web3.eth.Contract SendOptions |
| `onConfirmation?` | [`ConfirmationHandler`](../interfaces/internal_/ConfirmationHandler.md) | An optional confirmation handler object |

#### Returns

`Promise`<`TransactionReceipt`\>

a Promise<TransactionReceipt\> that resolves to a TransactionReceipt object representing the receipt of the transaction

#### Defined in

rocketpool/dao/node/trusted/node.ts:197

___

### bootstrapSettingUint

▸ **bootstrapSettingUint**(`settingContractInstance`, `settingPath`, `value`, `options?`, `onConfirmation?`): `Promise`<`TransactionReceipt`\>

Bootstrap a Uint Setting

**`example`** using Typescript
```ts
// Turn off the ability to create auction lots
const settingContractInstance = "rocketDAOProtocolSettingsAuction";
const settingPath = "auction.lot.create.enabled";
const value = false;
const guardian = "0x421433c3f99529A704Ec2270E1A68fa66DD8bD79";
const options = {
		from: guardian, // bootstrap can only be performed by guardian
		gas: 1000000
};
const txReceipt = rp.dao.node.trusted.bootstrapSettingUint(settingContractInstance, settingPath, value, options).then((txReceipt: TransactionReceipt) => { txReceipt };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `settingContractInstance` | `string` | A string representing contract instance |
| `settingPath` | `string` | A string representing the path for the setting |
| `value` | `string` \| `number` \| `object` | A string, number or object representing the value of the setting you wish to set |
| `options?` | `SendOptions` | An optional object of web3.eth.Contract SendOptions |
| `onConfirmation?` | [`ConfirmationHandler`](../interfaces/internal_/ConfirmationHandler.md) | An optional confirmation handler object |

#### Returns

`Promise`<`TransactionReceipt`\>

a Promise<TransactionReceipt\> that resolves to a TransactionReceipt object representing the receipt of the transaction

#### Defined in

rocketpool/dao/node/trusted/node.ts:232

___

### bootstrapDisable

▸ **bootstrapDisable**(`value`, `options?`, `onConfirmation?`): `Promise`<`TransactionReceipt`\>

Disable Bootstrap Mode for RP (only RP can call this to hand over full control to the DAO)

**`example`** using Typescript
```ts
const mode = true;
const guardian = "0x421433c3f99529A704Ec2270E1A68fa66DD8bD79";
const options = {
		from: guardian, // bootstrap can only be performed by guardian
		gas: 1000000
};
const txReceipt = rp.dao.node.trusted.bootstrapDisable(mode, options).then((txReceipt: TransactionReceipt) => { txReceipt };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `boolean` | A boolean representing if you are turning bootstrap mode on or off |
| `options?` | `SendOptions` | An optional object of web3.eth.Contract SendOptions |
| `onConfirmation?` | [`ConfirmationHandler`](../interfaces/internal_/ConfirmationHandler.md) | An optional confirmation handler object |

#### Returns

`Promise`<`TransactionReceipt`\>

a Promise<TransactionReceipt\> that resolves to a TransactionReceipt object representing the receipt of the transaction

#### Defined in

rocketpool/dao/node/trusted/node.ts:262

___

### memberJoinRequired

▸ **memberJoinRequired**(`id`, `url`, `options?`, `onConfirmation?`): `Promise`<`TransactionReceipt`\>

In an explicable black swan scenario where the DAO loses more than the min membership required (3), this method can be used by a regular node operator to join the DAO
Must have their ID, URL, current RPL bond amount available and must be called by their current registered node account

**`example`** using Typescript
```ts
const id = "rocketpool_emergency_node_op";
const url = "https://rocketpool.net";
const registeredNode = "0x421433c3f99529A704Ec2270E1A68fa66DD8bD79";
const options = {
		from: registeredNode,
		gas: 1000000
};
const txReceipt = rp.dao.node.trusted.memberJoinRequired(id, url, options).then((txReceipt: TransactionReceipt) => { txReceipt };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | A string representing the id for the member |
| `url` | `string` | A string representing the url for the member |
| `options?` | `SendOptions` | An optional object of web3.eth.Contract SendOptions |
| `onConfirmation?` | [`ConfirmationHandler`](../interfaces/internal_/ConfirmationHandler.md) | An optional confirmation handler object |

#### Returns

`Promise`<`TransactionReceipt`\>

a Promise<TransactionReceipt\> that resolves to a TransactionReceipt object representing the receipt of the transaction

#### Defined in

rocketpool/dao/node/trusted/node.ts:289
