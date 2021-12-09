# auction

```go
import "github.com/rocket-pool/rocketpool-go/auction"
```

## Index

- [Constants](<#constants>)
- [func ClaimBid(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.TransactOpts) (common.Hash, error)](<#func-claimbid>)
- [func CreateLot(rp *rocketpool.RocketPool, opts *bind.TransactOpts) (uint64, common.Hash, error)](<#func-createlot>)
- [func EstimateClaimBidGas(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimateclaimbidgas>)
- [func EstimateCreateLotGas(rp *rocketpool.RocketPool, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimatecreatelotgas>)
- [func EstimatePlaceBidGas(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimateplacebidgas>)
- [func EstimateRecoverUnclaimedRPLGas(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimaterecoverunclaimedrplgas>)
- [func GetAllottedRPLBalance(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)](<#func-getallottedrplbalance>)
- [func GetLotAddressBidAmount(rp *rocketpool.RocketPool, lotIndex uint64, bidder common.Address, opts *bind.CallOpts) (*big.Int, error)](<#func-getlotaddressbidamount>)
- [func GetLotClaimedRPLAmount(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.CallOpts) (*big.Int, error)](<#func-getlotclaimedrplamount>)
- [func GetLotCount(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)](<#func-getlotcount>)
- [func GetLotCurrentPrice(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.CallOpts) (*big.Int, error)](<#func-getlotcurrentprice>)
- [func GetLotEndBlock(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.CallOpts) (uint64, error)](<#func-getlotendblock>)
- [func GetLotExists(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.CallOpts) (bool, error)](<#func-getlotexists>)
- [func GetLotIsCleared(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.CallOpts) (bool, error)](<#func-getlotiscleared>)
- [func GetLotPriceAtBlock(rp *rocketpool.RocketPool, lotIndex, blockNumber uint64, opts *bind.CallOpts) (*big.Int, error)](<#func-getlotpriceatblock>)
- [func GetLotPriceAtCurrentBlock(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.CallOpts) (*big.Int, error)](<#func-getlotpriceatcurrentblock>)
- [func GetLotPriceByTotalBids(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.CallOpts) (*big.Int, error)](<#func-getlotpricebytotalbids>)
- [func GetLotRPLRecovered(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.CallOpts) (bool, error)](<#func-getlotrplrecovered>)
- [func GetLotRemainingRPLAmount(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.CallOpts) (*big.Int, error)](<#func-getlotremainingrplamount>)
- [func GetLotReservePrice(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.CallOpts) (*big.Int, error)](<#func-getlotreserveprice>)
- [func GetLotStartBlock(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.CallOpts) (uint64, error)](<#func-getlotstartblock>)
- [func GetLotStartPrice(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.CallOpts) (*big.Int, error)](<#func-getlotstartprice>)
- [func GetLotTotalBidAmount(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.CallOpts) (*big.Int, error)](<#func-getlottotalbidamount>)
- [func GetLotTotalRPLAmount(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.CallOpts) (*big.Int, error)](<#func-getlottotalrplamount>)
- [func GetRemainingRPLBalance(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)](<#func-getremainingrplbalance>)
- [func GetTotalRPLBalance(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)](<#func-gettotalrplbalance>)
- [func PlaceBid(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.TransactOpts) (common.Hash, error)](<#func-placebid>)
- [func RecoverUnclaimedRPL(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.TransactOpts) (common.Hash, error)](<#func-recoverunclaimedrpl>)
- [type LotDetails](<#type-lotdetails>)
  - [func GetLotDetails(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.CallOpts) (LotDetails, error)](<#func-getlotdetails>)
  - [func GetLotDetailsWithBids(rp *rocketpool.RocketPool, lotIndex uint64, bidder common.Address, opts *bind.CallOpts) (LotDetails, error)](<#func-getlotdetailswithbids>)
  - [func GetLots(rp *rocketpool.RocketPool, opts *bind.CallOpts) ([]LotDetails, error)](<#func-getlots>)
  - [func GetLotsWithBids(rp *rocketpool.RocketPool, bidder common.Address, opts *bind.CallOpts) ([]LotDetails, error)](<#func-getlotswithbids>)


## Constants

Settings

```go
const LotDetailsBatchSize = 10
```

## func [ClaimBid](<https://github.com/rocket-pool/rocketpool-go/blob/release/auction/auction.go#L575>)

```go
func ClaimBid(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.TransactOpts) (common.Hash, error)
```

Claim RPL from a lot that was bid on

## func [CreateLot](<https://github.com/rocket-pool/rocketpool-go/blob/release/auction/auction.go#L523>)

```go
func CreateLot(rp *rocketpool.RocketPool, opts *bind.TransactOpts) (uint64, common.Hash, error)
```

Create a new lot

## func [EstimateClaimBidGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/auction/auction.go#L565>)

```go
func EstimateClaimBidGas(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of ClaimBid

## func [EstimateCreateLotGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/auction/auction.go#L513>)

```go
func EstimateCreateLotGas(rp *rocketpool.RocketPool, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of CreateLot

## func [EstimatePlaceBidGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/auction/auction.go#L541>)

```go
func EstimatePlaceBidGas(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of PlaceBid

## func [EstimateRecoverUnclaimedRPLGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/auction/auction.go#L589>)

```go
func EstimateRecoverUnclaimedRPLGas(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of RecoverUnclaimedRPL

## func [GetAllottedRPLBalance](<https://github.com/rocket-pool/rocketpool-go/blob/release/auction/auction.go#L286>)

```go
func GetAllottedRPLBalance(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)
```

Get the allotted RPL balance of the auction contract

## func [GetLotAddressBidAmount](<https://github.com/rocket-pool/rocketpool-go/blob/release/auction/auction.go#L499>)

```go
func GetLotAddressBidAmount(rp *rocketpool.RocketPool, lotIndex uint64, bidder common.Address, opts *bind.CallOpts) (*big.Int, error)
```

Get the ETH amount bid on a lot by an address

## func [GetLotClaimedRPLAmount](<https://github.com/rocket-pool/rocketpool-go/blob/release/auction/auction.go#L449>)

```go
func GetLotClaimedRPLAmount(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.CallOpts) (*big.Int, error)
```

## func [GetLotCount](<https://github.com/rocket-pool/rocketpool-go/blob/release/auction/auction.go#L314>)

```go
func GetLotCount(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)
```

Get the number of lots for auction

## func [GetLotCurrentPrice](<https://github.com/rocket-pool/rocketpool-go/blob/release/auction/auction.go#L438>)

```go
func GetLotCurrentPrice(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.CallOpts) (*big.Int, error)
```

## func [GetLotEndBlock](<https://github.com/rocket-pool/rocketpool-go/blob/release/auction/auction.go#L350>)

```go
func GetLotEndBlock(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.CallOpts) (uint64, error)
```

## func [GetLotExists](<https://github.com/rocket-pool/rocketpool-go/blob/release/auction/auction.go#L328>)

```go
func GetLotExists(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.CallOpts) (bool, error)
```

Lot details

## func [GetLotIsCleared](<https://github.com/rocket-pool/rocketpool-go/blob/release/auction/auction.go#L471>)

```go
func GetLotIsCleared(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.CallOpts) (bool, error)
```

## func [GetLotPriceAtBlock](<https://github.com/rocket-pool/rocketpool-go/blob/release/auction/auction.go#L485>)

```go
func GetLotPriceAtBlock(rp *rocketpool.RocketPool, lotIndex, blockNumber uint64, opts *bind.CallOpts) (*big.Int, error)
```

Get the price of a lot at a specific block

## func [GetLotPriceAtCurrentBlock](<https://github.com/rocket-pool/rocketpool-go/blob/release/auction/auction.go#L416>)

```go
func GetLotPriceAtCurrentBlock(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.CallOpts) (*big.Int, error)
```

## func [GetLotPriceByTotalBids](<https://github.com/rocket-pool/rocketpool-go/blob/release/auction/auction.go#L427>)

```go
func GetLotPriceByTotalBids(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.CallOpts) (*big.Int, error)
```

## func [GetLotRPLRecovered](<https://github.com/rocket-pool/rocketpool-go/blob/release/auction/auction.go#L405>)

```go
func GetLotRPLRecovered(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.CallOpts) (bool, error)
```

## func [GetLotRemainingRPLAmount](<https://github.com/rocket-pool/rocketpool-go/blob/release/auction/auction.go#L460>)

```go
func GetLotRemainingRPLAmount(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.CallOpts) (*big.Int, error)
```

## func [GetLotReservePrice](<https://github.com/rocket-pool/rocketpool-go/blob/release/auction/auction.go#L372>)

```go
func GetLotReservePrice(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.CallOpts) (*big.Int, error)
```

## func [GetLotStartBlock](<https://github.com/rocket-pool/rocketpool-go/blob/release/auction/auction.go#L339>)

```go
func GetLotStartBlock(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.CallOpts) (uint64, error)
```

## func [GetLotStartPrice](<https://github.com/rocket-pool/rocketpool-go/blob/release/auction/auction.go#L361>)

```go
func GetLotStartPrice(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.CallOpts) (*big.Int, error)
```

## func [GetLotTotalBidAmount](<https://github.com/rocket-pool/rocketpool-go/blob/release/auction/auction.go#L394>)

```go
func GetLotTotalBidAmount(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.CallOpts) (*big.Int, error)
```

## func [GetLotTotalRPLAmount](<https://github.com/rocket-pool/rocketpool-go/blob/release/auction/auction.go#L383>)

```go
func GetLotTotalRPLAmount(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.CallOpts) (*big.Int, error)
```

## func [GetRemainingRPLBalance](<https://github.com/rocket-pool/rocketpool-go/blob/release/auction/auction.go#L300>)

```go
func GetRemainingRPLBalance(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)
```

Get the remaining RPL balance of the auction contract

## func [GetTotalRPLBalance](<https://github.com/rocket-pool/rocketpool-go/blob/release/auction/auction.go#L272>)

```go
func GetTotalRPLBalance(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)
```

Get the total RPL balance of the auction contract

## func [PlaceBid](<https://github.com/rocket-pool/rocketpool-go/blob/release/auction/auction.go#L551>)

```go
func PlaceBid(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.TransactOpts) (common.Hash, error)
```

Place a bid on a lot

## func [RecoverUnclaimedRPL](<https://github.com/rocket-pool/rocketpool-go/blob/release/auction/auction.go#L599>)

```go
func RecoverUnclaimedRPL(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.TransactOpts) (common.Hash, error)
```

Recover unclaimed RPL from a lot

## type [LotDetails](<https://github.com/rocket-pool/rocketpool-go/blob/release/auction/auction.go#L20-L37>)

Lot details

```go
type LotDetails struct {
    Index               uint64   `json:"index"`
    Exists              bool     `json:"exists"`
    StartBlock          uint64   `json:"startBlock"`
    EndBlock            uint64   `json:"endBlock"`
    StartPrice          *big.Int `json:"startPrice"`
    ReservePrice        *big.Int `json:"reservePrice"`
    PriceAtCurrentBlock *big.Int `json:"priceAtCurrentBlock"`
    PriceByTotalBids    *big.Int `json:"priceByTotalBids"`
    CurrentPrice        *big.Int `json:"currentPrice"`
    TotalRPLAmount      *big.Int `json:"totalRplAmount"`
    ClaimedRPLAmount    *big.Int `json:"claimedRplAmount"`
    RemainingRPLAmount  *big.Int `json:"remainingRplAmount"`
    TotalBidAmount      *big.Int `json:"totalBidAmount"`
    AddressBidAmount    *big.Int `json:"addressBidAmount"`
    Cleared             bool     `json:"cleared"`
    RPLRecovered        bool     `json:"rplRecovered"`
}
```

### func [GetLotDetails](<https://github.com/rocket-pool/rocketpool-go/blob/release/auction/auction.go#L121>)

```go
func GetLotDetails(rp *rocketpool.RocketPool, lotIndex uint64, opts *bind.CallOpts) (LotDetails, error)
```

Get a lot's details

### func [GetLotDetailsWithBids](<https://github.com/rocket-pool/rocketpool-go/blob/release/auction/auction.go#L240>)

```go
func GetLotDetailsWithBids(rp *rocketpool.RocketPool, lotIndex uint64, bidder common.Address, opts *bind.CallOpts) (LotDetails, error)
```

Get a lot's details with address bid amounts

### func [GetLots](<https://github.com/rocket-pool/rocketpool-go/blob/release/auction/auction.go#L41>)

```go
func GetLots(rp *rocketpool.RocketPool, opts *bind.CallOpts) ([]LotDetails, error)
```

Get all lot details

### func [GetLotsWithBids](<https://github.com/rocket-pool/rocketpool-go/blob/release/auction/auction.go#L81>)

```go
func GetLotsWithBids(rp *rocketpool.RocketPool, bidder common.Address, opts *bind.CallOpts) ([]LotDetails, error)
```

Get all lot details with bids from an address

