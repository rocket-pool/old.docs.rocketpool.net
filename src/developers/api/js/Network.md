# Class: Network

Rocket Pool Network Manager

## Constructors

### constructor

• **new Network**(`web3`, `contracts`)

Create a new Network instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `web3` | `default` | A valid Web3 instance |
| `contracts` | [`Contracts`](Contracts.md) | A Rocket Pool contract manager instance |

#### Defined in

rocketpool/network/network.ts:18

## Accessors

### rocketNetworkBalances

• `Private` `get` **rocketNetworkBalances**(): `Promise`<`Contract`\>

Private accessor use to retrieve the related contract

#### Returns

`Promise`<`Contract`\>

a Promise<Contract\> with a web3.eth.contract instance of the rocketNetworkBalances contract

#### Defined in

rocketpool/network/network.ts:24

___

### rocketNetworkFees

• `Private` `get` **rocketNetworkFees**(): `Promise`<`Contract`\>

Private accessor use to retrieve the related contract

#### Returns

`Promise`<`Contract`\>

a Promise<Contract\> with a web3.eth.contract instance of the rocketNetworkFees contract

#### Defined in

rocketpool/network/network.ts:32

___

### rocketNetworkPrices

• `Private` `get` **rocketNetworkPrices**(): `Promise`<`Contract`\>

Private accessor use to retrieve the related contract

#### Returns

`Promise`<`Contract`\>

a Promise<Contract\> with a web3.eth.contract instance of the rocketNetworkPrices contract

#### Defined in

rocketpool/network/network.ts:40

## Methods

### getBalancesBlock

▸ **getBalancesBlock**(): `Promise`<`number`\>

Get the block that current network balances are set for

**`example`** using Typescript
```ts
const block = rp.network.getBalancesBlock().then((val: number) => { val };
```

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the block that the current network balances are
set for

#### Defined in

rocketpool/network/network.ts:54

___

### getTotalETHBalance

▸ **getTotalETHBalance**(): `Promise`<`string`\>

Get the current network total ETH balance in Wei

**`example`** using Typescript
```ts
const balanceInWei = rp.network.getTotalETHBalance().then((val: string) => { val };
// convert to Ether if needed
const balanceInEth = web3.utils.fromWei(balanceInWei, 'ether')
```

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the current network total ETH balance in Wei

#### Defined in

rocketpool/network/network.ts:73

___

### getStakingETHBalance

▸ **getStakingETHBalance**(): `Promise`<`string`\>

Get the current network staking ETH balance in Wei

**`example`** using Typescript
```ts
const balanceInWei = rp.network.getStakingETHBalance().then((val: string) => { val };
// convert to Ether if needed
const balanceInEth = web3.utils.fromWei(balanceInWei, 'ether')
```

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the current network staking ETH balance in Wei

#### Defined in

rocketpool/network/network.ts:90

___

### getTotalRETHSupply

▸ **getTotalRETHSupply**(): `Promise`<`string`\>

Get the current network total rETH supply in Wei

**`example`** using Typescript
```ts
const balanceInWei = rp.network.getTotalRETHSupply().then((val: string) => { val };
// convert to Ether if needed
const balanceInEth = web3.utils.fromWei(balanceInWei, 'ether')
```

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the rETH supply in Wei

#### Defined in

rocketpool/network/network.ts:107

___

### getETHUtilizationRate

▸ **getETHUtilizationRate**(): `Promise`<`number`\>

Get the current network ETH utilization rate

**`example`** using Typescript
```ts
const utilizationRate = rp.network.getETHUtilizationRate().then((val: string) => { val };
```

#### Returns

`Promise`<`number`\>

a Promise<string\> that resolves to a string representing the ETH utilization rate in ETH (automatically
parsed from Wei)

#### Defined in

rocketpool/network/network.ts:123

___

### getNodeDemand

▸ **getNodeDemand**(): `Promise`<`string`\>

Get the current network node demand in Wei

**`example`** using Typescript
```ts
const balanceInWei = rp.network.getNodeDemand().then((val: string) => { val };
// convert to Ether if needed
const balanceInEth = web3.utils.fromWei(balanceInWei, 'ether')
```

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the current node demand in Wei

#### Defined in

rocketpool/network/network.ts:142

___

### getNodeFee

▸ **getNodeFee**(): `Promise`<`number`\>

Get the current network node demand

**`example`** using Typescript
```ts
const nodeFee = rp.network.getNodeFee().then((val: number) => { val };
```

#### Returns

`Promise`<`number`\>

a Promise<string\> that resolves to a number representing the current node fee

#### Defined in

rocketpool/network/network.ts:157

___

### getNodeFeeByDemand

▸ **getNodeFeeByDemand**(`demand`): `Promise`<`number`\>

Get the network node commission rate by demand value

**`example`** using Typescript
```ts
const demand = web3.utils.toWei("0.75", "ether");
const nodeFeeByDemand = rp.network.getNodeFeeByDemand(demand).then((val: string) => { val };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `demand` | `string` | A string representing the demand |

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the network node commission rate by demand value

#### Defined in

rocketpool/network/network.ts:174

___

### getRPLPrice

▸ **getRPLPrice**(): `Promise`<`number`\>

Get the network RPL Price

**`example`** using Typescript
```ts
const rplPrice = rp.network.getRPLPrice().then((val: number) => { val };
```

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the network RPL price

#### Defined in

rocketpool/network/network.ts:189

___

### getPricesBlock

▸ **getPricesBlock**(): `Promise`<`number`\>

Get the prices block

**`example`** using Typescript
```ts
const block = rp.network.getPricesBlock().then((val: number) => { val };
```

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the prices block

#### Defined in

rocketpool/network/network.ts:204

___

### getLatestReportableBlock

▸ **getLatestReportableBlock**(): `Promise`<`string`\>

Get latest reportable block

**`example`** using Typescript
```ts
const latestReportableBlock = rp.network.getLatestReportableBlock().then((val: string) => { val };
```

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the latest reportable block

#### Defined in

rocketpool/network/network.ts:219

___

### getEffectiveRPLStake

▸ **getEffectiveRPLStake**(): `Promise`<`string`\>

Get effective RPL stake

**`example`** using Typescript
```ts
const effectiveRPLStake = rp.network.getEffectiveRPLStake().then((val: string) => { val };
```

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the effective RPL stake

#### Defined in

rocketpool/network/network.ts:234

___

### getEffectiveRPLStakeUpdatedBlock

▸ **getEffectiveRPLStakeUpdatedBlock**(): `Promise`<`string`\>

Get the block that the effective RPL stake was updated at

**`example`** using Typescript
```ts
const block = rp.network.getEffectiveRPLStakeUpdatedBlock().then((val: string) => { val };
```

#### Returns

`Promise`<`string`\>

a Promise<string\> that resolves to a string representing the block the effective RPL stake was updated at

#### Defined in

rocketpool/network/network.ts:249

___

### submitBalances

▸ **submitBalances**(`block`, `totalEth`, `stakingEth`, `rethSupply`, `options?`, `onConfirmation?`): `Promise`<`TransactionReceipt`\>

Submit node balances (Restricted to oDAO nodes)

**`example`** using Typescript
```ts
const block = await web3.eth.getBlockNumber();
const totalEth = web3.utils.toWei("1", "ether");
const stakingEth = "0";
const rethSupply = rp.network.getTotalRETHSupply().then((val: string) => { val };
const trustedNode = "0x18A58E43c37DdC9ccCf3AC642c6f430ad663E400"; // must be an oDAO member

const options = {
		from: trustedNode,
		gas: 1000000
}
const txReceipt = rp.network.submitBalances(block, totalEth, stakingEth, rethSupply, options).then((txReceipt: TransactionReceipt) => { txReceipt };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `block` | `number` | A string representing the block |
| `totalEth` | `string` | A string representing the totalEth in Wei |
| `stakingEth` | `string` | A string representing the stakingEth in Wei |
| `rethSupply` | `string` | A string representing the rethSupply in Wei |
| `options?` | `SendOptions` | An optional object of web3.eth.Contract SendOptions |
| `onConfirmation?` | [`ConfirmationHandler`](../interfaces/internal_/ConfirmationHandler.md) | An optional confirmation handler object |

#### Returns

`Promise`<`TransactionReceipt`\>

a Promise<TransactionReceipt\> that resolves to a TransactionReceipt object representing the receipt of the transaction

#### Defined in

rocketpool/network/network.ts:280

___

### submitPrices

▸ **submitPrices**(`block`, `rplPrice`, `effectiveRplStake`, `options?`, `onConfirmation?`): `Promise`<`TransactionReceipt`\>

Submit prices (Restricted to oDAO nodes)

**`example`** using Typescript
```ts
const block = await web3.eth.getBlockNumber();
const rplPrice = web3.utils.toWei("1", "ether");
const effectiveRPLStake = rp.node.calculateTotalEffectiveRPLStake(0, 0, rplPrice).then((val: string) => { val };
const trustedNode = "0x18A58E43c37DdC9ccCf3AC642c6f430ad663E400"; // must be an oDAO member

const options = {
		from: trustedNode,
		gas: 1000000
}
const txReceipt = rp.network.submitPrices(block, rplPrice, effectiveRplStake, options).then((txReceipt: TransactionReceipt) => { txReceipt };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `block` | `number` | A string representing the block |
| `rplPrice` | `string` | A string representing the rplPrice in Wei |
| `effectiveRplStake` | `string` | A string representing the effective RPL stake |
| `options?` | `SendOptions` | An optional object of web3.eth.Contract SendOptions |
| `onConfirmation?` | [`ConfirmationHandler`](../interfaces/internal_/ConfirmationHandler.md) | An optional confirmation handler object |

#### Returns

`Promise`<`TransactionReceipt`\>

a Promise<TransactionReceipt\> that resolves to a TransactionReceipt object representing the receipt of the transaction

#### Defined in

rocketpool/network/network.ts:316

___

### executeUpdatePrices

▸ **executeUpdatePrices**(`block`, `rplPrice`, `effectiveRplStake`, `options?`, `onConfirmation?`): `Promise`<`TransactionReceipt`\>

Execute prices (Restricted to oDAO nodes)

**`example`** using Typescript
```ts
const block = await web3.eth.getBlockNumber();
const rplPrice = web3.utils.toWei("1", "ether");
const effectiveRPLStake = rp.node.calculateTotalEffectiveRPLStake(0, 0, rplPrice).then((val: string) => { val };
const trustedNode = "0x18A58E43c37DdC9ccCf3AC642c6f430ad663E400"; // must be an oDAO member

const options = {
		from: trustedNode,
		gas: 1000000
}
const txReceipt = rp.network.executeUpdatePrices(block, rplPrice, effectiveRplStake, options).then((txReceipt: TransactionReceipt) => { txReceipt };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `block` | `number` | A string representing the block |
| `rplPrice` | `string` | A string representing the rplPrice in Wei |
| `effectiveRplStake` | `string` | A string representing the effective RPL stake |
| `options?` | `SendOptions` | An optional object of web3.eth.Contract SendOptions |
| `onConfirmation?` | [`ConfirmationHandler`](../interfaces/internal_/ConfirmationHandler.md) | An optional confirmation handler object |

#### Returns

`Promise`<`TransactionReceipt`\>

a Promise<TransactionReceipt\> that resolves to a TransactionReceipt object representing the receipt of the transaction

#### Defined in

rocketpool/network/network.ts:351

___

### executeUpdateBalances

▸ **executeUpdateBalances**(`block`, `totalEth`, `stakingEth`, `rethSupply`, `options?`, `onConfirmation?`): `Promise`<`TransactionReceipt`\>

Execute Update Balances (Restricted to oDAO nodes)

**`example`** using Typescript
```ts
const block = await web3.eth.getBlockNumber();
const totalEth = web3.utils.toWei("1", "ether");
const stakingEth = "0";
const rethSupply = rp.network.getTotalRETHSupply().then((val: string) => { val };
const trustedNode = "0x18A58E43c37DdC9ccCf3AC642c6f430ad663E400"; // must be an oDAO member

const options = {
		from: trustedNode,
		gas: 1000000
}
const txReceipt = rp.network.executeUpdateBalances(block, totalEth, stakingEth, rethSupply, options).then((txReceipt: TransactionReceipt) => { txReceipt };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `block` | `number` | A string representing the block |
| `totalEth` | `string` | A string representing the totalEth in Wei |
| `stakingEth` | `string` | A string representing the stakingEth in Wei |
| `rethSupply` | `string` | A string representing the rethSupply in Wei |
| `options?` | `SendOptions` | An optional object of web3.eth.Contract SendOptions |
| `onConfirmation?` | [`ConfirmationHandler`](../interfaces/internal_/ConfirmationHandler.md) | An optional confirmation handler object |

#### Returns

`Promise`<`TransactionReceipt`\>

a Promise<TransactionReceipt\> that resolves to a TransactionReceipt object representing the receipt of the transaction

#### Defined in

rocketpool/network/network.ts:388
