# Class: NodeSettings

Rocket Pool Node Settings Manager

## Constructors

### constructor

• **new NodeSettings**(`web3`, `contracts`)

Create a new Node Settings instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `web3` | `default` | A valid Web3 instance |
| `contracts` | [`Contracts`](Contracts.md) | A Rocket Pool contract manager instance |

#### Defined in

rocketpool/settings/node.ts:16

## Accessors

### rocketDAOProtocolSettingsNode

• `Private` `get` **rocketDAOProtocolSettingsNode**(): `Promise`<`Contract`\>

Private accessor use to retrieve the related contract

#### Returns

`Promise`<`Contract`\>

a Promise<Contract\> with a web3.eth.contract instance of the rocketDAOProtocolSettingsNode contract

#### Defined in

rocketpool/settings/node.ts:22

## Methods

### getRegistrationEnabled

▸ **getRegistrationEnabled**(): `Promise`<`boolean`\>

Return if node registrations are currently enabled

**`example`** using Typescript
```ts
const enabled = rp.settings.node.getRegistrationEnabled().then((val: boolean) => { val };
```

#### Returns

`Promise`<`boolean`\>

a Promise<boolean\> that resolves to a boolean representing if node registrations are enabled

#### Defined in

rocketpool/settings/node.ts:35

___

### getDepositEnabled

▸ **getDepositEnabled**(): `Promise`<`boolean`\>

Return if node deposits are currently enabled

**`example`** using Typescript
```ts
const enabled = rp.settings.node.getDepositEnabled().then((val: boolean) => { val };
```

#### Returns

`Promise`<`boolean`\>

a Promise<boolean\> that resolves to a boolean representing if node deposits are enabled

#### Defined in

rocketpool/settings/node.ts:50
