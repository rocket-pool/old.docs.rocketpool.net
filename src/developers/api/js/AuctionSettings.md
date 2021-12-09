# Class: AuctionSettings

Rocket Pool Auction Settings Manager

## Constructors

### constructor

• **new AuctionSettings**(`web3`, `contracts`)

Create a new AuctionSettings instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `web3` | `default` | A valid Web3 instance |
| `contracts` | [`Contracts`](Contracts.md) | A Rocket Pool contract manager instance |

#### Defined in

rocketpool/settings/auction.ts:16

## Accessors

### rocketDAOProtocolSettingsAuction

• `Private` `get` **rocketDAOProtocolSettingsAuction**(): `Promise`<`Contract`\>

Private accessor use to retrieve the related contract

#### Returns

`Promise`<`Contract`\>

a Promise<Contract\> with a web3.eth.contract instance of the rocketDAOProtocolSettingsAuction contract

#### Defined in

rocketpool/settings/auction.ts:22

## Methods

### getLotMaximumEthValue

▸ **getLotMaximumEthValue**(): `Promise`<`number`\>

Return the lot maximum ETH value setting

**`example`** using Typescript
```ts
const lotMaximumEthValue = rp.settings.auction.getLotMaximumEthValue().then((val: number) => { val };
```

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the lot maximum ETH value setting

#### Defined in

rocketpool/settings/auction.ts:35

___

### getLotDuration

▸ **getLotDuration**(): `Promise`<`number`\>

Return the lot duration setting

**`example`** using Typescript
```ts
const lotMaximumEthValue = rp.settings.auction.getLotDuration().then((val: number) => { val };
```

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the lot duration setting

#### Defined in

rocketpool/settings/auction.ts:50

___

### getStartingPriceRatio

▸ **getStartingPriceRatio**(): `Promise`<`number`\>

Return the starting price ratio setting

**`example`** using Typescript
```ts
const startingPriceRatio = rp.settings.auction.getStartingPriceRatio().then((val: number) => { val };
```

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the starting price ratio setting

#### Defined in

rocketpool/settings/auction.ts:65

___

### getReservePriceRatio

▸ **getReservePriceRatio**(): `Promise`<`number`\>

Return the reserve price ratio setting

**`example`** using Typescript
```ts
const reservePriceRatio = rp.settings.auction.getReservePriceRatio().then((val: number) => { val };
```

#### Returns

`Promise`<`number`\>

a Promise<number\> that resolves to a number representing the reserve price ratio setting

#### Defined in

rocketpool/settings/auction.ts:80
