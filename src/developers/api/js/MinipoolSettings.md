# Class: MinipoolSettings

Rocket Pool Minipool Settings Manager

## Constructors

### constructor

• **new MinipoolSettings**(`web3`, `contracts`)

Create a new Minipool Settings instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `web3` | `default` | A valid Web3 instance |
| `contracts` | [`Contracts`](Contracts.md) | A Rocket Pool contract manager instance |

#### Defined in

rocketpool/settings/minipool.ts:16

## Accessors

### rocketDAOProtocolSettingsMinipool

• `Private` `get` **rocketDAOProtocolSettingsMinipool**(): `Promise`<`Contract`\>

Private accessor use to retrieve the related contract

#### Returns

`Promise`<`Contract`\>

a Promise<Contract\> with a web3.eth.contract instance of the rocketDAOProtocolSettingsMinipool contract

#### Defined in

rocketpool/settings/minipool.ts:22

## Methods

### getLaunchBalance

▸ **getLaunchBalance**(): `Promise`<`string`\>

Return the balance required to launch a minipool setting in Wei

**`example`** using Typescript
```ts
const launchBalance = rp.settings.minipool.getLaunchBalance().then((val: string) => { val };
```

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the balance required to launch a minipool setting

#### Defined in

rocketpool/settings/minipool.ts:35

___

### getFullDepositNodeAmount

▸ **getFullDepositNodeAmount**(): `Promise`<`string`\>

Return the full node deposit amounts setting in Wei

**`example`** using Typescript
```ts
const fullDepositNodeAmount = rp.settings.minipool.getFullDepositNodeAmount().then((val: string) => { val };
```

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the full node deposit amounts setting in wei

#### Defined in

rocketpool/settings/minipool.ts:50

___

### getHalfDepositNodeAmount

▸ **getHalfDepositNodeAmount**(): `Promise`<`string`\>

Return the half node deposit amounts setting in Wei

**`example`** using Typescript
```ts
const halfDepositNodeAmount = rp.settings.minipool.getHalfDepositNodeAmount().then((val: string) => { val };
```

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the half node deposit amounts setting in wei

#### Defined in

rocketpool/settings/minipool.ts:65

___

### getEmptyDepositNodeAmount

▸ **getEmptyDepositNodeAmount**(): `Promise`<`string`\>

Return the empty node deposit amounts setting in Wei

**`example`** using Typescript
```ts
const emptyDepositNodeAmount = rp.settings.minipool.getEmptyDepositNodeAmount().then((val: string) => { val };
```

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the empty node deposit amounts setting in wei

#### Defined in

rocketpool/settings/minipool.ts:80

___

### getFullDepositUserAmount

▸ **getFullDepositUserAmount**(): `Promise`<`string`\>

Return the full user deposit amount setting in Wei

**`example`** using Typescript
```ts
const fullDepositUserAmount = rp.settings.minipool.getFullDepositUserAmount().then((val: string) => { val };
```

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the full user deposit amount setting in wei

#### Defined in

rocketpool/settings/minipool.ts:95

___

### getHalfDepositUserAmount

▸ **getHalfDepositUserAmount**(): `Promise`<`string`\>

Return the half user deposit amount setting in Wei

**`example`** using Typescript
```ts
const halfDepositUserAmount = rp.settings.minipool.getHalfDepositUserAmount().then((val: string) => { val };
```

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the half user deposit amount setting in wei

#### Defined in

rocketpool/settings/minipool.ts:110

___

### getEmptyDepositUserAmount

▸ **getEmptyDepositUserAmount**(): `Promise`<`string`\>

Return the empty user deposit amount setting in Wei

**`example`** using Typescript
```ts
const emptyDepositUserAmount = rp.settings.minipool.getEmptyDepositUserAmount().then((val: string) => { val };
```

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the empty user deposit amount setting in wei

#### Defined in

rocketpool/settings/minipool.ts:125

___

### getSubmitWithdrawableEnabled

▸ **getSubmitWithdrawableEnabled**(): `Promise`<`boolean`\>

Return the minipool withdrawable event submissions setting

**`example`** using Typescript
```ts
const enabled = rp.settings.minipool.getSubmitWithdrawableEnabled().then((val: boolean) => { val };
```

#### Returns

`Promise`<`boolean`\>

a Promise<boolean\> that resolves to a boolean representing if minipool withdrawable events submissions are enabled

#### Defined in

rocketpool/settings/minipool.ts:140

___

### getLaunchTimeout

▸ **getLaunchTimeout**(): `Promise`<`number`\>

Return the period in blocks for prelaunch minipools to launch

**`example`** using Typescript
```ts
const launchTimeout = rp.settings.minipool.getLaunchTimeout().then((val: number) => { val };
```

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the period in blocks for prelaunch minipools to launch

#### Defined in

rocketpool/settings/minipool.ts:155

___

### getWithdrawalDelay

▸ **getWithdrawalDelay**(): `Promise`<`number`\>

Return the withdrawal delay setting in blocks

**`example`** using Typescript
```ts
const withdrawalDelay = rp.settings.minipool.getWithdrawalDelay().then((val: number) => { val };
```

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the withdrawal delay setting in blocks

#### Defined in

rocketpool/settings/minipool.ts:172
