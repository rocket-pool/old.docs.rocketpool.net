# Class: DepositSettings

Rocket Pool Deposit Settings Manager

## Constructors

### constructor

• **new DepositSettings**(`web3`, `contracts`)

Create a new Deposit Settings instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `web3` | `default` | A valid Web3 instance |
| `contracts` | [`Contracts`](Contracts.md) | A Rocket Pool contract manager instance |

#### Defined in

rocketpool/settings/deposit.ts:16

## Accessors

### rocketDAOProtocolSettingsDeposit

• `Private` `get` **rocketDAOProtocolSettingsDeposit**(): `Promise`<`Contract`\>

Private accessor use to retrieve the related contract

#### Returns

`Promise`<`Contract`\>

a Promise<Contract\> with a web3.eth.contract instance of the rocketDAOProtocolSettingsDeposit contract

#### Defined in

rocketpool/settings/deposit.ts:22

## Methods

### getDepositEnabled

▸ **getDepositEnabled**(): `Promise`<`boolean`\>

Check to see if deposits are enabled

**`example`** using Typescript
```ts
const enabled = rp.settings.deposit.getDepositsEnabled().then((val: boolean) => { val };
```

#### Returns

`Promise`<`boolean`\>

a Promise<boolean\> that resolves to a boolean representing if deposits are enabled

#### Defined in

rocketpool/settings/deposit.ts:35

___

### getAssignDepositsEnabled

▸ **getAssignDepositsEnabled**(): `Promise`<`boolean`\>

Check to see if deposit assignments are enabled

**`example`** using Typescript
```ts
const enabled = rp.settings.deposit.getAssignDepositsEnabled().then((val: boolean) => { val };
```

#### Returns

`Promise`<`boolean`\>

a Promise<boolean\> that resolves to a boolean representing if deposit assignments are enabled

#### Defined in

rocketpool/settings/deposit.ts:50

___

### getMinimumDeposit

▸ **getMinimumDeposit**(): `Promise`<`string`\>

Return the minimum deposit amount setting in wei

**`example`** using Typescript
```ts
const minimumDeposit = rp.settings.deposit.getMinimumDeposit().then((val: string) => { val };
```

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the minimum deposit amount setting

#### Defined in

rocketpool/settings/deposit.ts:65

___

### getMaximumDepositPoolSize

▸ **getMaximumDepositPoolSize**(): `Promise`<`string`\>

Return the maximum deposit pool size setting in Wei

**`example`** using Typescript
```ts
const maximumDepositPoolSize = rp.settings.deposit.getMaximumDepositPoolSize().then((val: string) => { val };
```

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the maximum deposit pool size setting

#### Defined in

rocketpool/settings/deposit.ts:80

___

### getMaximumDepositAssignments

▸ **getMaximumDepositAssignments**(): `Promise`<`number`\>

Return the maximum number of deposit assignments to perform at once

**`example`** using Typescript
```ts
const maxDepositAssignments = rp.settings.deposit.getMaximumDepositAssignments().then((val: string) => { val };
```

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the maximum number of deposit assignments to perform at once

#### Defined in

rocketpool/settings/deposit.ts:95
