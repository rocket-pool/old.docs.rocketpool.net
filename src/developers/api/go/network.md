# network

```go
import "github.com/rocket-pool/rocketpool-go/network"
```

## Index

- [func EstimateSubmitBalancesGas(rp *rocketpool.RocketPool, block uint64, totalEth, stakingEth, rethSupply *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimatesubmitbalancesgas>)
- [func EstimateSubmitPricesGas(rp *rocketpool.RocketPool, block uint64, rplPrice *big.Int, effectiveRplStake *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimatesubmitpricesgas>)
- [func GetBalancesBlock(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)](<#func-getbalancesblock>)
- [func GetETHUtilizationRate(rp *rocketpool.RocketPool, opts *bind.CallOpts) (float64, error)](<#func-getethutilizationrate>)
- [func GetLatestReportableBalancesBlock(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)](<#func-getlatestreportablebalancesblock>)
- [func GetLatestReportablePricesBlock(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)](<#func-getlatestreportablepricesblock>)
- [func GetNodeDemand(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)](<#func-getnodedemand>)
- [func GetNodeFee(rp *rocketpool.RocketPool, opts *bind.CallOpts) (float64, error)](<#func-getnodefee>)
- [func GetNodeFeeByDemand(rp *rocketpool.RocketPool, nodeDemand *big.Int, opts *bind.CallOpts) (float64, error)](<#func-getnodefeebydemand>)
- [func GetPricesBlock(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)](<#func-getpricesblock>)
- [func GetRPLPrice(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)](<#func-getrplprice>)
- [func GetStakingETHBalance(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)](<#func-getstakingethbalance>)
- [func GetTotalETHBalance(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)](<#func-gettotalethbalance>)
- [func GetTotalRETHSupply(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)](<#func-gettotalrethsupply>)
- [func InConsensus(rp *rocketpool.RocketPool, opts *bind.CallOpts) (bool, error)](<#func-inconsensus>)
- [func SubmitBalances(rp *rocketpool.RocketPool, block uint64, totalEth, stakingEth, rethSupply *big.Int, opts *bind.TransactOpts) (common.Hash, error)](<#func-submitbalances>)
- [func SubmitPrices(rp *rocketpool.RocketPool, block uint64, rplPrice, effectiveRplStake *big.Int, opts *bind.TransactOpts) (common.Hash, error)](<#func-submitprices>)


## func [EstimateSubmitBalancesGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/network/balances.go#L86>)

```go
func EstimateSubmitBalancesGas(rp *rocketpool.RocketPool, block uint64, totalEth, stakingEth, rethSupply *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of SubmitBalances

## func [EstimateSubmitPricesGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/network/prices.go#L43>)

```go
func EstimateSubmitPricesGas(rp *rocketpool.RocketPool, block uint64, rplPrice *big.Int, effectiveRplStake *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of SubmitPrices

## func [GetBalancesBlock](<https://github.com/rocket-pool/rocketpool-go/blob/release/network/balances.go#L16>)

```go
func GetBalancesBlock(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)
```

Get the block number which network balances are current for

## func [GetETHUtilizationRate](<https://github.com/rocket-pool/rocketpool-go/blob/release/network/balances.go#L72>)

```go
func GetETHUtilizationRate(rp *rocketpool.RocketPool, opts *bind.CallOpts) (float64, error)
```

Get the current network ETH utilization rate

## func [GetLatestReportableBalancesBlock](<https://github.com/rocket-pool/rocketpool-go/blob/release/network/balances.go#L110>)

```go
func GetLatestReportableBalancesBlock(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)
```

Returns the latest block number that oracles should be reporting balances for

## func [GetLatestReportablePricesBlock](<https://github.com/rocket-pool/rocketpool-go/blob/release/network/prices.go#L81>)

```go
func GetLatestReportablePricesBlock(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)
```

Returns the latest block number that oracles should be reporting prices for

## func [GetNodeDemand](<https://github.com/rocket-pool/rocketpool-go/blob/release/network/fees.go#L16>)

```go
func GetNodeDemand(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)
```

Get the current network node demand in ETH

## func [GetNodeFee](<https://github.com/rocket-pool/rocketpool-go/blob/release/network/fees.go#L30>)

```go
func GetNodeFee(rp *rocketpool.RocketPool, opts *bind.CallOpts) (float64, error)
```

Get the current network node commission rate

## func [GetNodeFeeByDemand](<https://github.com/rocket-pool/rocketpool-go/blob/release/network/fees.go#L44>)

```go
func GetNodeFeeByDemand(rp *rocketpool.RocketPool, nodeDemand *big.Int, opts *bind.CallOpts) (float64, error)
```

Get the network node fee for a node demand value

## func [GetPricesBlock](<https://github.com/rocket-pool/rocketpool-go/blob/release/network/prices.go#L15>)

```go
func GetPricesBlock(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)
```

Get the block number which network prices are current for

## func [GetRPLPrice](<https://github.com/rocket-pool/rocketpool-go/blob/release/network/prices.go#L29>)

```go
func GetRPLPrice(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)
```

Get the current network RPL price in ETH

## func [GetStakingETHBalance](<https://github.com/rocket-pool/rocketpool-go/blob/release/network/balances.go#L44>)

```go
func GetStakingETHBalance(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)
```

Get the current network staking ETH balance

## func [GetTotalETHBalance](<https://github.com/rocket-pool/rocketpool-go/blob/release/network/balances.go#L30>)

```go
func GetTotalETHBalance(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)
```

Get the current network total ETH balance

## func [GetTotalRETHSupply](<https://github.com/rocket-pool/rocketpool-go/blob/release/network/balances.go#L58>)

```go
func GetTotalRETHSupply(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)
```

Get the current network total rETH supply

## func [InConsensus](<https://github.com/rocket-pool/rocketpool-go/blob/release/network/prices.go#L67>)

```go
func InConsensus(rp *rocketpool.RocketPool, opts *bind.CallOpts) (bool, error)
```

Check if the network is currently in consensus about the RPL price\, or if it is still reaching consensus

## func [SubmitBalances](<https://github.com/rocket-pool/rocketpool-go/blob/release/network/balances.go#L96>)

```go
func SubmitBalances(rp *rocketpool.RocketPool, block uint64, totalEth, stakingEth, rethSupply *big.Int, opts *bind.TransactOpts) (common.Hash, error)
```

Submit network balances for an epoch

## func [SubmitPrices](<https://github.com/rocket-pool/rocketpool-go/blob/release/network/prices.go#L53>)

```go
func SubmitPrices(rp *rocketpool.RocketPool, block uint64, rplPrice, effectiveRplStake *big.Int, opts *bind.TransactOpts) (common.Hash, error)
```

Submit network prices and total effective RPL stake for an epoch

