# tokens

```go
import "github.com/rocket-pool/rocketpool-go/tokens"
```

## Index

- [func ApproveFixedSupplyRPL(rp *rocketpool.RocketPool, spender common.Address, amount *big.Int, opts *bind.TransactOpts) (common.Hash, error)](<#func-approvefixedsupplyrpl>)
- [func ApproveRETH(rp *rocketpool.RocketPool, spender common.Address, amount *big.Int, opts *bind.TransactOpts) (common.Hash, error)](<#func-approvereth>)
- [func ApproveRPL(rp *rocketpool.RocketPool, spender common.Address, amount *big.Int, opts *bind.TransactOpts) (common.Hash, error)](<#func-approverpl>)
- [func BurnRETH(rp *rocketpool.RocketPool, amount *big.Int, opts *bind.TransactOpts) (common.Hash, error)](<#func-burnreth>)
- [func EstimateApproveFixedSupplyRPLGas(rp *rocketpool.RocketPool, spender common.Address, amount *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimateapprovefixedsupplyrplgas>)
- [func EstimateApproveRETHGas(rp *rocketpool.RocketPool, spender common.Address, amount *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimateapproverethgas>)
- [func EstimateApproveRPLGas(rp *rocketpool.RocketPool, spender common.Address, amount *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimateapproverplgas>)
- [func EstimateBurnRETHGas(rp *rocketpool.RocketPool, amount *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimateburnrethgas>)
- [func EstimateMintInflationRPLGas(rp *rocketpool.RocketPool, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimatemintinflationrplgas>)
- [func EstimateSwapFixedSupplyRPLForRPLGas(rp *rocketpool.RocketPool, amount *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimateswapfixedsupplyrplforrplgas>)
- [func EstimateTransferFixedSupplyRPLGas(rp *rocketpool.RocketPool, to common.Address, amount *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimatetransferfixedsupplyrplgas>)
- [func EstimateTransferFromFixedSupplyRPLGas(rp *rocketpool.RocketPool, from, to common.Address, amount *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimatetransferfromfixedsupplyrplgas>)
- [func EstimateTransferFromRETHGas(rp *rocketpool.RocketPool, from, to common.Address, amount *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimatetransferfromrethgas>)
- [func EstimateTransferFromRPLGas(rp *rocketpool.RocketPool, from, to common.Address, amount *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimatetransferfromrplgas>)
- [func EstimateTransferRETHGas(rp *rocketpool.RocketPool, to common.Address, amount *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimatetransferrethgas>)
- [func EstimateTransferRPLGas(rp *rocketpool.RocketPool, to common.Address, amount *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimatetransferrplgas>)
- [func GetETHValueOfRETH(rp *rocketpool.RocketPool, rethAmount *big.Int, opts *bind.CallOpts) (*big.Int, error)](<#func-getethvalueofreth>)
- [func GetFixedSupplyRPLAllowance(rp *rocketpool.RocketPool, owner, spender common.Address, opts *bind.CallOpts) (*big.Int, error)](<#func-getfixedsupplyrplallowance>)
- [func GetFixedSupplyRPLBalance(rp *rocketpool.RocketPool, address common.Address, opts *bind.CallOpts) (*big.Int, error)](<#func-getfixedsupplyrplbalance>)
- [func GetFixedSupplyRPLTotalSupply(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)](<#func-getfixedsupplyrpltotalsupply>)
- [func GetRETHAllowance(rp *rocketpool.RocketPool, owner, spender common.Address, opts *bind.CallOpts) (*big.Int, error)](<#func-getrethallowance>)
- [func GetRETHBalance(rp *rocketpool.RocketPool, address common.Address, opts *bind.CallOpts) (*big.Int, error)](<#func-getrethbalance>)
- [func GetRETHCollateralRate(rp *rocketpool.RocketPool, opts *bind.CallOpts) (float64, error)](<#func-getrethcollateralrate>)
- [func GetRETHContractETHBalance(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)](<#func-getrethcontractethbalance>)
- [func GetRETHExchangeRate(rp *rocketpool.RocketPool, opts *bind.CallOpts) (float64, error)](<#func-getrethexchangerate>)
- [func GetRETHTotalCollateral(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)](<#func-getrethtotalcollateral>)
- [func GetRETHTotalSupply(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)](<#func-getrethtotalsupply>)
- [func GetRETHValueOfETH(rp *rocketpool.RocketPool, ethAmount *big.Int, opts *bind.CallOpts) (*big.Int, error)](<#func-getrethvalueofeth>)
- [func GetRPLAllowance(rp *rocketpool.RocketPool, owner, spender common.Address, opts *bind.CallOpts) (*big.Int, error)](<#func-getrplallowance>)
- [func GetRPLBalance(rp *rocketpool.RocketPool, address common.Address, opts *bind.CallOpts) (*big.Int, error)](<#func-getrplbalance>)
- [func GetRPLInflationIntervalRate(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)](<#func-getrplinflationintervalrate>)
- [func GetRPLTotalSupply(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)](<#func-getrpltotalsupply>)
- [func MintInflationRPL(rp *rocketpool.RocketPool, opts *bind.TransactOpts) (common.Hash, error)](<#func-mintinflationrpl>)
- [func SwapFixedSupplyRPLForRPL(rp *rocketpool.RocketPool, amount *big.Int, opts *bind.TransactOpts) (common.Hash, error)](<#func-swapfixedsupplyrplforrpl>)
- [func TransferFixedSupplyRPL(rp *rocketpool.RocketPool, to common.Address, amount *big.Int, opts *bind.TransactOpts) (common.Hash, error)](<#func-transferfixedsupplyrpl>)
- [func TransferFromFixedSupplyRPL(rp *rocketpool.RocketPool, from, to common.Address, amount *big.Int, opts *bind.TransactOpts) (common.Hash, error)](<#func-transferfromfixedsupplyrpl>)
- [func TransferFromRETH(rp *rocketpool.RocketPool, from, to common.Address, amount *big.Int, opts *bind.TransactOpts) (common.Hash, error)](<#func-transferfromreth>)
- [func TransferFromRPL(rp *rocketpool.RocketPool, from, to common.Address, amount *big.Int, opts *bind.TransactOpts) (common.Hash, error)](<#func-transferfromrpl>)
- [func TransferRETH(rp *rocketpool.RocketPool, to common.Address, amount *big.Int, opts *bind.TransactOpts) (common.Hash, error)](<#func-transferreth>)
- [func TransferRPL(rp *rocketpool.RocketPool, to common.Address, amount *big.Int, opts *bind.TransactOpts) (common.Hash, error)](<#func-transferrpl>)
- [type Balances](<#type-balances>)
  - [func GetBalances(rp *rocketpool.RocketPool, address common.Address, opts *bind.CallOpts) (Balances, error)](<#func-getbalances>)


## func [ApproveFixedSupplyRPL](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/rpl-fixed.go#L78>)

```go
func ApproveFixedSupplyRPL(rp *rocketpool.RocketPool, spender common.Address, amount *big.Int, opts *bind.TransactOpts) (common.Hash, error)
```

Approve an fixed\-supply RPL spender

## func [ApproveRETH](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/reth.go#L80>)

```go
func ApproveRETH(rp *rocketpool.RocketPool, spender common.Address, amount *big.Int, opts *bind.TransactOpts) (common.Hash, error)
```

Approve a rETH spender

## func [ApproveRPL](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/rpl.go#L79>)

```go
func ApproveRPL(rp *rocketpool.RocketPool, spender common.Address, amount *big.Int, opts *bind.TransactOpts) (common.Hash, error)
```

Approve an RPL spender

## func [BurnRETH](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/reth.go#L205>)

```go
func BurnRETH(rp *rocketpool.RocketPool, amount *big.Int, opts *bind.TransactOpts) (common.Hash, error)
```

Burn rETH for ETH

## func [EstimateApproveFixedSupplyRPLGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/rpl-fixed.go#L68>)

```go
func EstimateApproveFixedSupplyRPLGas(rp *rocketpool.RocketPool, spender common.Address, amount *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of ApproveFixedSupplyRPL

## func [EstimateApproveRETHGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/reth.go#L70>)

```go
func EstimateApproveRETHGas(rp *rocketpool.RocketPool, spender common.Address, amount *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of ApproveRETH

## func [EstimateApproveRPLGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/rpl.go#L69>)

```go
func EstimateApproveRPLGas(rp *rocketpool.RocketPool, spender common.Address, amount *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of ApproveRPL

## func [EstimateBurnRETHGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/reth.go#L195>)

```go
func EstimateBurnRETHGas(rp *rocketpool.RocketPool, amount *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of BurnRETH

## func [EstimateMintInflationRPLGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/rpl.go#L114>)

```go
func EstimateMintInflationRPLGas(rp *rocketpool.RocketPool, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of MintInflationRPL

## func [EstimateSwapFixedSupplyRPLForRPLGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/rpl.go#L138>)

```go
func EstimateSwapFixedSupplyRPLForRPLGas(rp *rocketpool.RocketPool, amount *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of SwapFixedSupplyRPLForRPL

## func [EstimateTransferFixedSupplyRPLGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/rpl-fixed.go#L48>)

```go
func EstimateTransferFixedSupplyRPLGas(rp *rocketpool.RocketPool, to common.Address, amount *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of TransferFixedSupplyRPL

## func [EstimateTransferFromFixedSupplyRPLGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/rpl-fixed.go#L88>)

```go
func EstimateTransferFromFixedSupplyRPLGas(rp *rocketpool.RocketPool, from, to common.Address, amount *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of TransferFromFixedSupplyRPL

## func [EstimateTransferFromRETHGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/reth.go#L90>)

```go
func EstimateTransferFromRETHGas(rp *rocketpool.RocketPool, from, to common.Address, amount *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of TransferFromRETH

## func [EstimateTransferFromRPLGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/rpl.go#L89>)

```go
func EstimateTransferFromRPLGas(rp *rocketpool.RocketPool, from, to common.Address, amount *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of TransferFromRPL

## func [EstimateTransferRETHGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/reth.go#L50>)

```go
func EstimateTransferRETHGas(rp *rocketpool.RocketPool, to common.Address, amount *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of TransferRETH

## func [EstimateTransferRPLGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/rpl.go#L49>)

```go
func EstimateTransferRPLGas(rp *rocketpool.RocketPool, to common.Address, amount *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of TransferRPL

## func [GetETHValueOfRETH](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/reth.go#L125>)

```go
func GetETHValueOfRETH(rp *rocketpool.RocketPool, rethAmount *big.Int, opts *bind.CallOpts) (*big.Int, error)
```

Get the ETH value of an amount of rETH

## func [GetFixedSupplyRPLAllowance](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/rpl-fixed.go#L38>)

```go
func GetFixedSupplyRPLAllowance(rp *rocketpool.RocketPool, owner, spender common.Address, opts *bind.CallOpts) (*big.Int, error)
```

Get fixed\-supply RPL allowance

## func [GetFixedSupplyRPLBalance](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/rpl-fixed.go#L28>)

```go
func GetFixedSupplyRPLBalance(rp *rocketpool.RocketPool, address common.Address, opts *bind.CallOpts) (*big.Int, error)
```

Get fixed\-supply RPL balance

## func [GetFixedSupplyRPLTotalSupply](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/rpl-fixed.go#L18>)

```go
func GetFixedSupplyRPLTotalSupply(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)
```

Get fixed\-supply RPL total supply

## func [GetRETHAllowance](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/reth.go#L40>)

```go
func GetRETHAllowance(rp *rocketpool.RocketPool, owner, spender common.Address, opts *bind.CallOpts) (*big.Int, error)
```

Get rETH allowance

## func [GetRETHBalance](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/reth.go#L30>)

```go
func GetRETHBalance(rp *rocketpool.RocketPool, address common.Address, opts *bind.CallOpts) (*big.Int, error)
```

Get rETH balance

## func [GetRETHCollateralRate](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/reth.go#L181>)

```go
func GetRETHCollateralRate(rp *rocketpool.RocketPool, opts *bind.CallOpts) (float64, error)
```

Get the rETH collateralization rate

## func [GetRETHContractETHBalance](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/reth.go#L115>)

```go
func GetRETHContractETHBalance(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)
```

Get the rETH contract ETH balance

## func [GetRETHExchangeRate](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/reth.go#L153>)

```go
func GetRETHExchangeRate(rp *rocketpool.RocketPool, opts *bind.CallOpts) (float64, error)
```

Get the current ETH : rETH exchange rate

## func [GetRETHTotalCollateral](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/reth.go#L167>)

```go
func GetRETHTotalCollateral(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)
```

Get the total amount of ETH collateral available for rETH trades

## func [GetRETHTotalSupply](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/reth.go#L20>)

```go
func GetRETHTotalSupply(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)
```

Get rETH total supply

## func [GetRETHValueOfETH](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/reth.go#L139>)

```go
func GetRETHValueOfETH(rp *rocketpool.RocketPool, ethAmount *big.Int, opts *bind.CallOpts) (*big.Int, error)
```

Get the rETH value of an amount of ETH

## func [GetRPLAllowance](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/rpl.go#L39>)

```go
func GetRPLAllowance(rp *rocketpool.RocketPool, owner, spender common.Address, opts *bind.CallOpts) (*big.Int, error)
```

Get RPL allowance

## func [GetRPLBalance](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/rpl.go#L29>)

```go
func GetRPLBalance(rp *rocketpool.RocketPool, address common.Address, opts *bind.CallOpts) (*big.Int, error)
```

Get RPL balance

## func [GetRPLInflationIntervalRate](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/rpl.go#L162>)

```go
func GetRPLInflationIntervalRate(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)
```

Get the RPL inflation interval rate

## func [GetRPLTotalSupply](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/rpl.go#L19>)

```go
func GetRPLTotalSupply(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)
```

Get RPL total supply

## func [MintInflationRPL](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/rpl.go#L124>)

```go
func MintInflationRPL(rp *rocketpool.RocketPool, opts *bind.TransactOpts) (common.Hash, error)
```

Mint new RPL tokens from inflation

## func [SwapFixedSupplyRPLForRPL](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/rpl.go#L148>)

```go
func SwapFixedSupplyRPLForRPL(rp *rocketpool.RocketPool, amount *big.Int, opts *bind.TransactOpts) (common.Hash, error)
```

Swap fixed\-supply RPL for new RPL tokens

## func [TransferFixedSupplyRPL](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/rpl-fixed.go#L58>)

```go
func TransferFixedSupplyRPL(rp *rocketpool.RocketPool, to common.Address, amount *big.Int, opts *bind.TransactOpts) (common.Hash, error)
```

Transfer fixed\-supply RPL

## func [TransferFromFixedSupplyRPL](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/rpl-fixed.go#L98>)

```go
func TransferFromFixedSupplyRPL(rp *rocketpool.RocketPool, from, to common.Address, amount *big.Int, opts *bind.TransactOpts) (common.Hash, error)
```

Transfer fixed\-supply RPL from a sender

## func [TransferFromRETH](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/reth.go#L100>)

```go
func TransferFromRETH(rp *rocketpool.RocketPool, from, to common.Address, amount *big.Int, opts *bind.TransactOpts) (common.Hash, error)
```

Transfer rETH from a sender

## func [TransferFromRPL](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/rpl.go#L99>)

```go
func TransferFromRPL(rp *rocketpool.RocketPool, from, to common.Address, amount *big.Int, opts *bind.TransactOpts) (common.Hash, error)
```

Transfer RPL from a sender

## func [TransferRETH](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/reth.go#L60>)

```go
func TransferRETH(rp *rocketpool.RocketPool, to common.Address, amount *big.Int, opts *bind.TransactOpts) (common.Hash, error)
```

Transfer rETH

## func [TransferRPL](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/rpl.go#L59>)

```go
func TransferRPL(rp *rocketpool.RocketPool, to common.Address, amount *big.Int, opts *bind.TransactOpts) (common.Hash, error)
```

Transfer RPL

## type [Balances](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/tokens.go#L16-L21>)

Token balances

```go
type Balances struct {
    ETH            *big.Int `json:"eth"`
    RETH           *big.Int `json:"reth"`
    RPL            *big.Int `json:"rpl"`
    FixedSupplyRPL *big.Int `json:"fixedSupplyRpl"`
}
```

### func [GetBalances](<https://github.com/rocket-pool/rocketpool-go/blob/release/tokens/tokens.go#L25>)

```go
func GetBalances(rp *rocketpool.RocketPool, address common.Address, opts *bind.CallOpts) (Balances, error)
```

Get token balances of an address

