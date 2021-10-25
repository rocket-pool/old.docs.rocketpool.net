# Class: NetworkSettings

Rocket Pool Network Settings Manager

## Constructors

### constructor

• **new NetworkSettings**(`web3`, `contracts`)

Create a new Network Settings instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `web3` | `default` | A valid Web3 instance |
| `contracts` | [`Contracts`](Contracts.md) | A Rocket Pool contract manager instance |

#### Defined in

rocketpool/settings/network.ts:16

## Accessors

### rocketDAOProtocolSettingsNetwork

• `Private` `get` **rocketDAOProtocolSettingsNetwork**(): `Promise`<`Contract`\>

Private accessor use to retrieve the related contract

#### Returns

`Promise`<`Contract`\>

a Promise<Contract\> with a web3.eth.contract instance of the rocketDAOProtocolSettingsNetwork contract

#### Defined in

rocketpool/settings/network.ts:22

## Methods

### getNodeConsensusThreshold

▸ **getNodeConsensusThreshold**(): `Promise`<`number`\>

Return the threshold of trusted nodes that must reach consensus on oracle data to commit it

**`example`** using Typescript
```ts
const nodeConsensusThreshold = rp.settings.network.getNodeConsensusThreshold().then((val: number) => { val };
```

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the threshold of trusted nodes that must reach consensus on oracle daa to commit it

#### Defined in

rocketpool/settings/network.ts:35

___

### getSubmitBalancesEnabled

▸ **getSubmitBalancesEnabled**(): `Promise`<`boolean`\>

Return if balance submissions are enabled

**`example`** using Typescript
```ts
const enabled = rp.settings.network.getSubmitBalancesEnabled().then((val: boolean) => { val };
```

#### Returns

`Promise`<`boolean`\>

a Promise<boolean\> that resolves to a boolean representing the threshold of trusted nodes that must reach consensus on oracle daa to commit it

#### Defined in

rocketpool/settings/network.ts:52

___

### getSubmitBalancesFrequency

▸ **getSubmitBalancesFrequency**(): `Promise`<`number`\>

Return the frequency in blocks at which network balances should be submitted by trusted nodes

**`example`** using Typescript
```ts
const enabled = rp.settings.network.getSubmitBalancesFrequency().then((val: number) => { val };
```

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the frequency in blocks at which network balances should be submitted by trusted nodes

#### Defined in

rocketpool/settings/network.ts:67

___

### getMinimumNodeFee

▸ **getMinimumNodeFee**(): `Promise`<`number`\>

Return the minimum node fee

**`example`** using Typescript
```ts
const enabled = rp.settings.network.getMinimumNodeFee().then((val: number) => { val };
```

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the minimum node fee

#### Defined in

rocketpool/settings/network.ts:84

___

### getTargetNodeFee

▸ **getTargetNodeFee**(): `Promise`<`number`\>

Return the target node fee

**`example`** using Typescript
```ts
const enabled = rp.settings.network.getTargetNodeFee().then((val: number) => { val };
```

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the target node fee

#### Defined in

rocketpool/settings/network.ts:101

___

### getMaximumNodeFee

▸ **getMaximumNodeFee**(): `Promise`<`number`\>

Return the maximum node fee

**`example`** using Typescript
```ts
const enabled = rp.settings.network.getMaximumNodeFee().then((val: number) => { val };
```

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the maximum node fee

#### Defined in

rocketpool/settings/network.ts:118

___

### getNodeFeeDemandRange

▸ **getNodeFeeDemandRange**(): `Promise`<`string`\>

Return the range of node demand values in Wei to base fee calculations on (from negative to positive value)

**`example`** using Typescript
```ts
const enabled = rp.settings.network.getNodeFeeDemandRange().then((val: string) => { val };
```

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the range of node demand values in Wei

#### Defined in

rocketpool/settings/network.ts:135

___

### getTargetRethCollateralRate

▸ **getTargetRethCollateralRate**(): `Promise`<`number`\>

Return the target rETH collateralization rate

**`example`** using Typescript
```ts
const enabled = rp.settings.network.getTargetRethCollateralRate().then((val: number) => { val };
```

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the target rETH collateralization rate

#### Defined in

rocketpool/settings/network.ts:150

___

### getRethDespositDelay

▸ **getRethDespositDelay**(): `Promise`<`number`\>

Return the rETH deposit delay setting

**`example`** using Typescript
```ts
const enabled = rp.settings.network.getRethDespositDelay().then((val: number) => { val };
```

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the rETH deposit delay setting

#### Defined in

rocketpool/settings/network.ts:167
