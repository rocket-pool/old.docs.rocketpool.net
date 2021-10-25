# Class: Auction

Rocket Pool Auction

## Constructors

### constructor

• **new Auction**(`web3`, `contracts`)

Create a new Auction instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `web3` | `default` | A valid Web3 instance |
| `contracts` | [`Contracts`](Contracts.md) | A Rocket Pool contract manager instance |

#### Defined in

rocketpool/auction/auction.ts:18

## Accessors

### rocketAuctionManager

• `Private` `get` **rocketAuctionManager**(): `Promise`<`Contract`\>

Private accessor use to retrieve the related contract

#### Returns

`Promise`<`Contract`\>

a Promise<Contract\> that resolves to a web3.eth.contract instance of the rocketAuctionManager contract

#### Defined in

rocketpool/auction/auction.ts:24

## Methods

### getLotExists

▸ **getLotExists**(`lotIndex`): `Promise`<`boolean`\>

Check if the lot exists given a lot index

**`example`** using Typescript
```ts
const exists = rp.auction.getLotExists(lotIndex).then((val: boolean) => { val };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lotIndex` | `number` | A number representing the lot index |

#### Returns

`Promise`<`boolean`\>

a Promise<boolean\> that resolves to a boolean representing whether the lot exists or not

#### Defined in

rocketpool/auction/auction.ts:38

___

### getLotStartBlock

▸ **getLotStartBlock**(`lotIndex`): `Promise`<`number`\>

Return the lot start block given a lot index

**`example`** using Typescript
```ts
const lotStartBlock = rp.auction.getLotStartBlock(lotIndex).then((val: number) => { val };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lotIndex` | `number` | A number representing the Lot Index |

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the lot start block

#### Defined in

rocketpool/auction/auction.ts:54

___

### getLotEndBlock

▸ **getLotEndBlock**(`lotIndex`): `Promise`<`number`\>

Return the lot end block given a lot index

**`example`** using Typescript
```ts
const lotEndBlock = rp.auction.getLotEndBlock(lotIndex).then((val: number) => { val };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lotIndex` | `number` | A number representing the lot index |

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the lot end block

#### Defined in

rocketpool/auction/auction.ts:70

___

### getLotStartPrice

▸ **getLotStartPrice**(`lotIndex`): `Promise`<`number`\>

Return the lot start price given a lot index

**`example`** using Typescript
```ts
const lotStartPrice = rp.auction.getLotStartPrice(lotIndex).then((val: number) => { val };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lotIndex` | `number` | A number representing the lot index |

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the lot start price

#### Defined in

rocketpool/auction/auction.ts:86

___

### getLotReservePrice

▸ **getLotReservePrice**(`lotIndex`): `Promise`<`number`\>

Return the lot reserve price given a lot index

**`example`** using Typescript
```ts
const lotReservePrice = rp.auction.getLotReservePrice(lotIndex).then((val: number) => { val };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lotIndex` | `number` | A number representing the lot index |

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the Lot Reserve Price

#### Defined in

rocketpool/auction/auction.ts:102

___

### getLotTotalBidAmount

▸ **getLotTotalBidAmount**(`lotIndex`): `Promise`<`number`\>

Return the lot total bid amount given a lot index

**`example`** using Typescript
```ts
const lotTotalBidAmount = rp.auction.getLotTotalBidAmount(lotIndex).then((val: number) => { val };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lotIndex` | `number` | A number representing the lot index |

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the lot total bid amount

#### Defined in

rocketpool/auction/auction.ts:118

___

### getLotTotalRPLAmount

▸ **getLotTotalRPLAmount**(`lotIndex`): `Promise`<`number`\>

Return the lot total RPL amount given a lot index

**`example`** using Typescript
```ts
const lotTotalRPLAmount = rp.auction.getLotTotalRPLAmount(lotIndex).then((val: number) => { val };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lotIndex` | `number` | A number representing the lot index |

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the lot total RPL amount

#### Defined in

rocketpool/auction/auction.ts:134

___

### getLotAddressBidAmount

▸ **getLotAddressBidAmount**(`lotIndex`, `bidderAddress`): `Promise`<`number`\>

Return the lot address bid amount given a lot index and a bidder address

**`example`** using Typescript
```ts
const lotAddressBidAmount = rp.auction.getLotAddressBidAmount(lotIndex, bidderAddress).then((val: number) => { val };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lotIndex` | `number` | A number representing the lot index |
| `bidderAddress` | `string` | A string representing the bidder address |

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the lot address bid amount

#### Defined in

rocketpool/auction/auction.ts:151

___

### getLotPriceByTotalBids

▸ **getLotPriceByTotalBids**(`lotIndex`): `Promise`<`number`\>

Return the lot current orice by total bids given a lot index

**`example`** using Typescript
```ts
const lotPriceByTotalBids = rp.auction.getLotPriceByTotalBids(lotIndex).then((val: number) => { val };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lotIndex` | `number` | A number representing the lot index |

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the lot price by total bids

#### Defined in

rocketpool/auction/auction.ts:167

___

### getLotCurrentPrice

▸ **getLotCurrentPrice**(`lotIndex`): `Promise`<`number`\>

Return the current lot price given a lot index

**`example`** using Typescript
```ts
const lotCurrentPrice = rp.auction.getLotCurrentPrice(lotIndex).then((val: number) => { val };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lotIndex` | `number` | A number representing the lot index |

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the lot's current price

#### Defined in

rocketpool/auction/auction.ts:183

___

### getLotClaimedRPLAmount

▸ **getLotClaimedRPLAmount**(`lotIndex`): `Promise`<`number`\>

Return the lot claimed RPL amount given a lot index

**`example`** using Typescript
```ts
const lotClaimedRPLAmount = rp.auction.getLotClaimedRPLAmount(lotIndex).then((val: number) => { val };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lotIndex` | `number` | A number representing the lot Index |

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the lot's claimed RPL amount

#### Defined in

rocketpool/auction/auction.ts:199

___

### getLotRemainingRPLAmount

▸ **getLotRemainingRPLAmount**(`lotIndex`): `Promise`<`number`\>

Return the lot remaining RPL amount given a lot index

**`example`** using Typescript
```ts
const lotRemainingRPLAmount = rp.auction.getLotRemainingRPLAmount(lotIndex).then((val: number) => { val };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lotIndex` | `number` | A number representing the lot index |

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the lot's remaining RPL amount

#### Defined in

rocketpool/auction/auction.ts:215

___

### getLotIsCleared

▸ **getLotIsCleared**(`lotIndex`): `Promise`<`boolean`\>

Check if a lot is cleared given a lot index

**`example`** using Typescript
```ts
const lotCleared = rp.auction.getLotIsCleared(lotIndex).then((val: number) => { val };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lotIndex` | `number` | A number representing the lot index |

#### Returns

`Promise`<`boolean`\>

a Promise<boolean\> that resolves to a boolean representing whether the lot is cleared

#### Defined in

rocketpool/auction/auction.ts:231

___

### getTotalRPLBalance

▸ **getTotalRPLBalance**(): `Promise`<`number`\>

Return the total RPL balance

**`example`** using Typescript
```ts
const totalRPLBalance = rp.auction.getTotalRPLBalance(lotIndex).then((val: number) => { val };
```

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the total RPL balance

#### Defined in

rocketpool/auction/auction.ts:247

___

### getAllottedRPLBalance

▸ **getAllottedRPLBalance**(): `Promise`<`number`\>

Return the allotted RPL balance

**`example`** using Typescript
```ts
const allottedRPLBalance = rp.auction.getAllottedRPLBalance(lotIndex).then((val: number) => { val };
```

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the allotted RPL balance

#### Defined in

rocketpool/auction/auction.ts:263

___

### getRemainingRPLBalance

▸ **getRemainingRPLBalance**(): `Promise`<`number`\>

Return the remaining RPL balance

**`example`** using Typescript
```ts
const remainingRPLBalance = rp.auction.getRemainingRPLBalance(lotIndex).then((val: number) => { val };
```

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the remaining RPL balance

#### Defined in

rocketpool/auction/auction.ts:279

___

### getLotCount

▸ **getLotCount**(): `Promise`<`number`\>

Return the Lot Count

**`example`** using Typescript
```ts
const lotCount = rp.auction.getLotCount(lotIndex).then((val: number) => { val };
```

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the lot count

#### Defined in

rocketpool/auction/auction.ts:295

___

### getLotPriceAtBlock

▸ **getLotPriceAtBlock**(`lotIndex`, `block`): `Promise`<`number`\>

Return the lot price at a specified block given a lot index

**`example`** using Typescript
```ts
const lotPrice = rp.auction.getLotPriceAtBlock(lotIndex, block).then((val: number) => { val };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lotIndex` | `number` | A number representing the lot index |
| `block` | `number` | A number representing the block |

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the lot price at the specified block

#### Defined in

rocketpool/auction/auction.ts:312

___

### getLotRPLRecovered

▸ **getLotRPLRecovered**(`lotIndex`): `Promise`<`number`\>

Return the Lot RPL Recovered given a lot index

**`example`** using Typescript
```ts
const lotRPLRecovered = rp.auction.getLotRPLRecovered(lotIndex).then((val: number) => { val };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lotIndex` | `number` | A number representing the lot index |

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the lot RPL recovered

#### Defined in

rocketpool/auction/auction.ts:329

___

### createLot

▸ **createLot**(`options?`, `onConfirmation?`): `Promise`<`TransactionReceipt`\>

Create a new lot for auction

**`example`** using Typescript
```ts
const options = {
		from: '0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294',
		gas: 1000000
}
const txReceipt = rp.auction.createLot(options).then((txReceipt: TransactionReceipt) => { txReceipt };
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

rocketpool/auction/auction.ts:350

___

### claimBid

▸ **claimBid**(`lotIndex`, `options?`, `onConfirmation?`): `Promise`<`TransactionReceipt`\>

Create bid on a lot

**`example`** using Typescript
```ts
const options = {
		from: '0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294',
		gas: 1000000
}
const txReceipt = rp.auction.claimBid(lotIndex, options).then((txReceipt: TransactionReceipt) => { txReceipt };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lotIndex` | `number` | A number representing the lot index |
| `options?` | `SendOptions` | An optional object of web3.eth.Contract SendOptions |
| `onConfirmation?` | [`ConfirmationHandler`](../interfaces/internal_/ConfirmationHandler.md) | An optional confirmation handler object |

#### Returns

`Promise`<`TransactionReceipt`\>

a Promise<TransactionReceipt\> that resolves to a TransactionReceipt object representing the receipt of the transaction

#### Defined in

rocketpool/auction/auction.ts:372

___

### placeBid

▸ **placeBid**(`lotIndex`, `options?`, `onConfirmation?`): `Promise`<`TransactionReceipt`\>

Place bid on a lot

**`example`** using Typescript
```ts
const options = {
		from: '0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294',
		gas: 1000000
}
const txReceipt = rp.auction.placeBid(lotIndex, options).then((txReceipt: TransactionReceipt) => { txReceipt };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lotIndex` | `number` | A number representing the lot ondex |
| `options?` | `SendOptions` | An optional object of web3.eth.Contract SendOptions |
| `onConfirmation?` | [`ConfirmationHandler`](../interfaces/internal_/ConfirmationHandler.md) | An optional confirmation handler object |

#### Returns

`Promise`<`TransactionReceipt`\>

a Promise<TransactionReceipt\> that resolves to a TransactionReceipt object representing the receipt of the transaction

#### Defined in

rocketpool/auction/auction.ts:394

___

### recoverUnclaimedRPL

▸ **recoverUnclaimedRPL**(`lotIndex`, `options?`, `onConfirmation?`): `Promise`<`TransactionReceipt`\>

Recover Unclaimed RPL

**`example`** using Typescript
```ts
const options = {
		from: '0x24fBeD7Ecd625D3f0FD19a6c9113DEd436172294',
		gas: 1000000
}
const txReceipt = rp.auction.recoverUnclaimedRPL(lotIndex, options).then((txReceipt: TransactionReceipt) => { txReceipt };
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lotIndex` | `number` | A number representing the lot index |
| `options?` | `SendOptions` | An optional object of web3.eth.Contract SendOptions |
| `onConfirmation?` | [`ConfirmationHandler`](../interfaces/internal_/ConfirmationHandler.md) | An optional confirmation handler object |

#### Returns

`Promise`<`TransactionReceipt`\>

a Promise<TransactionReceipt\> that resolves to a TransactionReceipt object representing the receipt of the transaction

#### Defined in

rocketpool/auction/auction.ts:416
