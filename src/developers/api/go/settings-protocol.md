# protocol

```go
import "github.com/rocket-pool/rocketpool-go/settings/protocol"
```

## Index

- [Constants](<#constants>)
- [func BootstrapAssignDepositsEnabled(rp *rocketpool.RocketPool, value bool, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapassigndepositsenabled>)
- [func BootstrapBidOnLotEnabled(rp *rocketpool.RocketPool, value bool, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapbidonlotenabled>)
- [func BootstrapCreateLotEnabled(rp *rocketpool.RocketPool, value bool, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapcreatelotenabled>)
- [func BootstrapDepositEnabled(rp *rocketpool.RocketPool, value bool, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapdepositenabled>)
- [func BootstrapInflationIntervalRate(rp *rocketpool.RocketPool, value float64, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapinflationintervalrate>)
- [func BootstrapInflationStartTime(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapinflationstarttime>)
- [func BootstrapLotDuration(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstraplotduration>)
- [func BootstrapLotMaximumEthValue(rp *rocketpool.RocketPool, value *big.Int, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstraplotmaximumethvalue>)
- [func BootstrapLotMinimumEthValue(rp *rocketpool.RocketPool, value *big.Int, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstraplotminimumethvalue>)
- [func BootstrapLotReservePriceRatio(rp *rocketpool.RocketPool, value float64, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstraplotreservepriceratio>)
- [func BootstrapLotStartingPriceRatio(rp *rocketpool.RocketPool, value float64, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstraplotstartingpriceratio>)
- [func BootstrapMaximumDepositAssignments(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapmaximumdepositassignments>)
- [func BootstrapMaximumDepositPoolSize(rp *rocketpool.RocketPool, value *big.Int, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapmaximumdepositpoolsize>)
- [func BootstrapMaximumNodeFee(rp *rocketpool.RocketPool, value float64, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapmaximumnodefee>)
- [func BootstrapMaximumPerMinipoolStake(rp *rocketpool.RocketPool, value float64, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapmaximumperminipoolstake>)
- [func BootstrapMinimumDeposit(rp *rocketpool.RocketPool, value *big.Int, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapminimumdeposit>)
- [func BootstrapMinimumNodeFee(rp *rocketpool.RocketPool, value float64, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapminimumnodefee>)
- [func BootstrapMinimumPerMinipoolStake(rp *rocketpool.RocketPool, value float64, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapminimumperminipoolstake>)
- [func BootstrapMinipoolLaunchTimeout(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapminipoollaunchtimeout>)
- [func BootstrapMinipoolSubmitWithdrawableEnabled(rp *rocketpool.RocketPool, value bool, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapminipoolsubmitwithdrawableenabled>)
- [func BootstrapNodeConsensusThreshold(rp *rocketpool.RocketPool, value float64, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapnodeconsensusthreshold>)
- [func BootstrapNodeDepositEnabled(rp *rocketpool.RocketPool, value bool, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapnodedepositenabled>)
- [func BootstrapNodeFeeDemandRange(rp *rocketpool.RocketPool, value *big.Int, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapnodefeedemandrange>)
- [func BootstrapNodeRegistrationEnabled(rp *rocketpool.RocketPool, value bool, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapnoderegistrationenabled>)
- [func BootstrapRewardsClaimIntervalTime(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstraprewardsclaimintervaltime>)
- [func BootstrapSubmitBalancesEnabled(rp *rocketpool.RocketPool, value bool, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapsubmitbalancesenabled>)
- [func BootstrapSubmitBalancesFrequency(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapsubmitbalancesfrequency>)
- [func BootstrapSubmitPricesEnabled(rp *rocketpool.RocketPool, value bool, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapsubmitpricesenabled>)
- [func BootstrapSubmitPricesFrequency(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapsubmitpricesfrequency>)
- [func BootstrapTargetNodeFee(rp *rocketpool.RocketPool, value float64, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstraptargetnodefee>)
- [func BootstrapTargetRethCollateralRate(rp *rocketpool.RocketPool, value float64, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstraptargetrethcollateralrate>)
- [func GetAssignDepositsEnabled(rp *rocketpool.RocketPool, opts *bind.CallOpts) (bool, error)](<#func-getassigndepositsenabled>)
- [func GetBidOnLotEnabled(rp *rocketpool.RocketPool, opts *bind.CallOpts) (bool, error)](<#func-getbidonlotenabled>)
- [func GetCreateLotEnabled(rp *rocketpool.RocketPool, opts *bind.CallOpts) (bool, error)](<#func-getcreatelotenabled>)
- [func GetDepositEnabled(rp *rocketpool.RocketPool, opts *bind.CallOpts) (bool, error)](<#func-getdepositenabled>)
- [func GetInflationIntervalRate(rp *rocketpool.RocketPool, opts *bind.CallOpts) (float64, error)](<#func-getinflationintervalrate>)
- [func GetInflationStartTime(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)](<#func-getinflationstarttime>)
- [func GetLotDuration(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)](<#func-getlotduration>)
- [func GetLotMaximumEthValue(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)](<#func-getlotmaximumethvalue>)
- [func GetLotMinimumEthValue(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)](<#func-getlotminimumethvalue>)
- [func GetLotReservePriceRatio(rp *rocketpool.RocketPool, opts *bind.CallOpts) (float64, error)](<#func-getlotreservepriceratio>)
- [func GetLotStartingPriceRatio(rp *rocketpool.RocketPool, opts *bind.CallOpts) (float64, error)](<#func-getlotstartingpriceratio>)
- [func GetMaximumDepositAssignments(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)](<#func-getmaximumdepositassignments>)
- [func GetMaximumDepositPoolSize(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)](<#func-getmaximumdepositpoolsize>)
- [func GetMaximumNodeFee(rp *rocketpool.RocketPool, opts *bind.CallOpts) (float64, error)](<#func-getmaximumnodefee>)
- [func GetMaximumPerMinipoolStake(rp *rocketpool.RocketPool, opts *bind.CallOpts) (float64, error)](<#func-getmaximumperminipoolstake>)
- [func GetMinimumDeposit(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)](<#func-getminimumdeposit>)
- [func GetMinimumNodeFee(rp *rocketpool.RocketPool, opts *bind.CallOpts) (float64, error)](<#func-getminimumnodefee>)
- [func GetMinimumPerMinipoolStake(rp *rocketpool.RocketPool, opts *bind.CallOpts) (float64, error)](<#func-getminimumperminipoolstake>)
- [func GetMinipoolEmptyDepositNodeAmount(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)](<#func-getminipoolemptydepositnodeamount>)
- [func GetMinipoolEmptyDepositUserAmount(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)](<#func-getminipoolemptydeposituseramount>)
- [func GetMinipoolFullDepositNodeAmount(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)](<#func-getminipoolfulldepositnodeamount>)
- [func GetMinipoolFullDepositUserAmount(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)](<#func-getminipoolfulldeposituseramount>)
- [func GetMinipoolHalfDepositNodeAmount(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)](<#func-getminipoolhalfdepositnodeamount>)
- [func GetMinipoolHalfDepositUserAmount(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)](<#func-getminipoolhalfdeposituseramount>)
- [func GetMinipoolLaunchBalance(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)](<#func-getminipoollaunchbalance>)
- [func GetMinipoolLaunchTimeout(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)](<#func-getminipoollaunchtimeout>)
- [func GetMinipoolSubmitWithdrawableEnabled(rp *rocketpool.RocketPool, opts *bind.CallOpts) (bool, error)](<#func-getminipoolsubmitwithdrawableenabled>)
- [func GetNodeConsensusThreshold(rp *rocketpool.RocketPool, opts *bind.CallOpts) (float64, error)](<#func-getnodeconsensusthreshold>)
- [func GetNodeDepositEnabled(rp *rocketpool.RocketPool, opts *bind.CallOpts) (bool, error)](<#func-getnodedepositenabled>)
- [func GetNodeFeeDemandRange(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)](<#func-getnodefeedemandrange>)
- [func GetNodeRegistrationEnabled(rp *rocketpool.RocketPool, opts *bind.CallOpts) (bool, error)](<#func-getnoderegistrationenabled>)
- [func GetRewardsClaimIntervalTime(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)](<#func-getrewardsclaimintervaltime>)
- [func GetRewardsClaimerPerc(rp *rocketpool.RocketPool, contractName string, opts *bind.CallOpts) (float64, error)](<#func-getrewardsclaimerperc>)
- [func GetRewardsClaimerPercTimeUpdated(rp *rocketpool.RocketPool, contractName string, opts *bind.CallOpts) (uint64, error)](<#func-getrewardsclaimerperctimeupdated>)
- [func GetRewardsClaimersPercTotal(rp *rocketpool.RocketPool, opts *bind.CallOpts) (float64, error)](<#func-getrewardsclaimersperctotal>)
- [func GetSubmitBalancesEnabled(rp *rocketpool.RocketPool, opts *bind.CallOpts) (bool, error)](<#func-getsubmitbalancesenabled>)
- [func GetSubmitBalancesFrequency(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)](<#func-getsubmitbalancesfrequency>)
- [func GetSubmitPricesEnabled(rp *rocketpool.RocketPool, opts *bind.CallOpts) (bool, error)](<#func-getsubmitpricesenabled>)
- [func GetSubmitPricesFrequency(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)](<#func-getsubmitpricesfrequency>)
- [func GetTargetNodeFee(rp *rocketpool.RocketPool, opts *bind.CallOpts) (float64, error)](<#func-gettargetnodefee>)
- [func GetTargetRethCollateralRate(rp *rocketpool.RocketPool, opts *bind.CallOpts) (float64, error)](<#func-gettargetrethcollateralrate>)


## Constants

Config

```go
const AuctionSettingsContractName = "rocketDAOProtocolSettingsAuction"
```

Config

```go
const DepositSettingsContractName = "rocketDAOProtocolSettingsDeposit"
```

Config

```go
const InflationSettingsContractName = "rocketDAOProtocolSettingsInflation"
```

Config

```go
const MinipoolSettingsContractName = "rocketDAOProtocolSettingsMinipool"
```

Config

```go
const NetworkSettingsContractName = "rocketDAOProtocolSettingsNetwork"
```

Config

```go
const NodeSettingsContractName = "rocketDAOProtocolSettingsNode"
```

Config

```go
const RewardsSettingsContractName = "rocketDAOProtocolSettingsRewards"
```

## func [BootstrapAssignDepositsEnabled](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/deposit.go#L48>)

```go
func BootstrapAssignDepositsEnabled(rp *rocketpool.RocketPool, value bool, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapBidOnLotEnabled](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/auction.go#L49>)

```go
func BootstrapBidOnLotEnabled(rp *rocketpool.RocketPool, value bool, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapCreateLotEnabled](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/auction.go#L32>)

```go
func BootstrapCreateLotEnabled(rp *rocketpool.RocketPool, value bool, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapDepositEnabled](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/deposit.go#L31>)

```go
func BootstrapDepositEnabled(rp *rocketpool.RocketPool, value bool, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapInflationIntervalRate](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/inflation.go#L32>)

```go
func BootstrapInflationIntervalRate(rp *rocketpool.RocketPool, value float64, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapInflationStartTime](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/inflation.go#L49>)

```go
func BootstrapInflationStartTime(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapLotDuration](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/auction.go#L100>)

```go
func BootstrapLotDuration(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapLotMaximumEthValue](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/auction.go#L83>)

```go
func BootstrapLotMaximumEthValue(rp *rocketpool.RocketPool, value *big.Int, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapLotMinimumEthValue](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/auction.go#L66>)

```go
func BootstrapLotMinimumEthValue(rp *rocketpool.RocketPool, value *big.Int, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapLotReservePriceRatio](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/auction.go#L134>)

```go
func BootstrapLotReservePriceRatio(rp *rocketpool.RocketPool, value float64, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapLotStartingPriceRatio](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/auction.go#L117>)

```go
func BootstrapLotStartingPriceRatio(rp *rocketpool.RocketPool, value float64, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapMaximumDepositAssignments](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/deposit.go#L99>)

```go
func BootstrapMaximumDepositAssignments(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapMaximumDepositPoolSize](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/deposit.go#L82>)

```go
func BootstrapMaximumDepositPoolSize(rp *rocketpool.RocketPool, value *big.Int, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapMaximumNodeFee](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/network.go#L151>)

```go
func BootstrapMaximumNodeFee(rp *rocketpool.RocketPool, value float64, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapMaximumPerMinipoolStake](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/node.go#L83>)

```go
func BootstrapMaximumPerMinipoolStake(rp *rocketpool.RocketPool, value float64, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapMinimumDeposit](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/deposit.go#L65>)

```go
func BootstrapMinimumDeposit(rp *rocketpool.RocketPool, value *big.Int, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapMinimumNodeFee](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/network.go#L117>)

```go
func BootstrapMinimumNodeFee(rp *rocketpool.RocketPool, value float64, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapMinimumPerMinipoolStake](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/node.go#L66>)

```go
func BootstrapMinimumPerMinipoolStake(rp *rocketpool.RocketPool, value float64, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapMinipoolLaunchTimeout](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/minipool.go#L134>)

```go
func BootstrapMinipoolLaunchTimeout(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapMinipoolSubmitWithdrawableEnabled](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/minipool.go#L117>)

```go
func BootstrapMinipoolSubmitWithdrawableEnabled(rp *rocketpool.RocketPool, value bool, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapNodeConsensusThreshold](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/network.go#L32>)

```go
func BootstrapNodeConsensusThreshold(rp *rocketpool.RocketPool, value float64, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapNodeDepositEnabled](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/node.go#L49>)

```go
func BootstrapNodeDepositEnabled(rp *rocketpool.RocketPool, value bool, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapNodeFeeDemandRange](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/network.go#L168>)

```go
func BootstrapNodeFeeDemandRange(rp *rocketpool.RocketPool, value *big.Int, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapNodeRegistrationEnabled](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/node.go#L32>)

```go
func BootstrapNodeRegistrationEnabled(rp *rocketpool.RocketPool, value bool, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapRewardsClaimIntervalTime](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/rewards.go#L74>)

```go
func BootstrapRewardsClaimIntervalTime(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapSubmitBalancesEnabled](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/network.go#L49>)

```go
func BootstrapSubmitBalancesEnabled(rp *rocketpool.RocketPool, value bool, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapSubmitBalancesFrequency](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/network.go#L66>)

```go
func BootstrapSubmitBalancesFrequency(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapSubmitPricesEnabled](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/network.go#L83>)

```go
func BootstrapSubmitPricesEnabled(rp *rocketpool.RocketPool, value bool, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapSubmitPricesFrequency](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/network.go#L100>)

```go
func BootstrapSubmitPricesFrequency(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapTargetNodeFee](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/network.go#L134>)

```go
func BootstrapTargetNodeFee(rp *rocketpool.RocketPool, value float64, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapTargetRethCollateralRate](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/network.go#L185>)

```go
func BootstrapTargetRethCollateralRate(rp *rocketpool.RocketPool, value float64, opts *bind.TransactOpts) (common.Hash, error)
```

## func [GetAssignDepositsEnabled](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/deposit.go#L37>)

```go
func GetAssignDepositsEnabled(rp *rocketpool.RocketPool, opts *bind.CallOpts) (bool, error)
```

Deposit assignments currently enabled

## func [GetBidOnLotEnabled](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/auction.go#L38>)

```go
func GetBidOnLotEnabled(rp *rocketpool.RocketPool, opts *bind.CallOpts) (bool, error)
```

Lot bidding currently enabled

## func [GetCreateLotEnabled](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/auction.go#L21>)

```go
func GetCreateLotEnabled(rp *rocketpool.RocketPool, opts *bind.CallOpts) (bool, error)
```

Lot creation currently enabled

## func [GetDepositEnabled](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/deposit.go#L20>)

```go
func GetDepositEnabled(rp *rocketpool.RocketPool, opts *bind.CallOpts) (bool, error)
```

Deposits currently enabled

## func [GetInflationIntervalRate](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/inflation.go#L21>)

```go
func GetInflationIntervalRate(rp *rocketpool.RocketPool, opts *bind.CallOpts) (float64, error)
```

RPL inflation rate per interval

## func [GetInflationStartTime](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/inflation.go#L38>)

```go
func GetInflationStartTime(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)
```

RPL inflation start time

## func [GetLotDuration](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/auction.go#L89>)

```go
func GetLotDuration(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)
```

The lot duration in blocks

## func [GetLotMaximumEthValue](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/auction.go#L72>)

```go
func GetLotMaximumEthValue(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)
```

The maximum lot size in ETH value

## func [GetLotMinimumEthValue](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/auction.go#L55>)

```go
func GetLotMinimumEthValue(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)
```

The minimum lot size in ETH value

## func [GetLotReservePriceRatio](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/auction.go#L123>)

```go
func GetLotReservePriceRatio(rp *rocketpool.RocketPool, opts *bind.CallOpts) (float64, error)
```

The reserve price relative to current ETH price\, as a fraction

## func [GetLotStartingPriceRatio](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/auction.go#L106>)

```go
func GetLotStartingPriceRatio(rp *rocketpool.RocketPool, opts *bind.CallOpts) (float64, error)
```

The starting price relative to current ETH price\, as a fraction

## func [GetMaximumDepositAssignments](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/deposit.go#L88>)

```go
func GetMaximumDepositAssignments(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)
```

Maximum deposit assignments per transaction

## func [GetMaximumDepositPoolSize](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/deposit.go#L71>)

```go
func GetMaximumDepositPoolSize(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)
```

Maximum deposit pool size

## func [GetMaximumNodeFee](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/network.go#L140>)

```go
func GetMaximumNodeFee(rp *rocketpool.RocketPool, opts *bind.CallOpts) (float64, error)
```

Maximum node commission rate

## func [GetMaximumPerMinipoolStake](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/node.go#L72>)

```go
func GetMaximumPerMinipoolStake(rp *rocketpool.RocketPool, opts *bind.CallOpts) (float64, error)
```

The maximum RPL stake per minipool as a fraction of assigned user ETH

## func [GetMinimumDeposit](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/deposit.go#L54>)

```go
func GetMinimumDeposit(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)
```

Minimum deposit amount

## func [GetMinimumNodeFee](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/network.go#L106>)

```go
func GetMinimumNodeFee(rp *rocketpool.RocketPool, opts *bind.CallOpts) (float64, error)
```

Minimum node commission rate

## func [GetMinimumPerMinipoolStake](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/node.go#L55>)

```go
func GetMinimumPerMinipoolStake(rp *rocketpool.RocketPool, opts *bind.CallOpts) (float64, error)
```

The minimum RPL stake per minipool as a fraction of assigned user ETH

## func [GetMinipoolEmptyDepositNodeAmount](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/minipool.go#L56>)

```go
func GetMinipoolEmptyDepositNodeAmount(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)
```

## func [GetMinipoolEmptyDepositUserAmount](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/minipool.go#L92>)

```go
func GetMinipoolEmptyDepositUserAmount(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)
```

## func [GetMinipoolFullDepositNodeAmount](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/minipool.go#L34>)

```go
func GetMinipoolFullDepositNodeAmount(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)
```

Required node deposit amounts

## func [GetMinipoolFullDepositUserAmount](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/minipool.go#L70>)

```go
func GetMinipoolFullDepositUserAmount(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)
```

Required user deposit amounts

## func [GetMinipoolHalfDepositNodeAmount](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/minipool.go#L45>)

```go
func GetMinipoolHalfDepositNodeAmount(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)
```

## func [GetMinipoolHalfDepositUserAmount](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/minipool.go#L81>)

```go
func GetMinipoolHalfDepositUserAmount(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)
```

## func [GetMinipoolLaunchBalance](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/minipool.go#L20>)

```go
func GetMinipoolLaunchBalance(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)
```

Get the minipool launch balance

## func [GetMinipoolLaunchTimeout](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/minipool.go#L123>)

```go
func GetMinipoolLaunchTimeout(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)
```

Timeout period in blocks for prelaunch minipools to launch

## func [GetMinipoolSubmitWithdrawableEnabled](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/minipool.go#L106>)

```go
func GetMinipoolSubmitWithdrawableEnabled(rp *rocketpool.RocketPool, opts *bind.CallOpts) (bool, error)
```

Minipool withdrawable event submissions currently enabled

## func [GetNodeConsensusThreshold](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/network.go#L21>)

```go
func GetNodeConsensusThreshold(rp *rocketpool.RocketPool, opts *bind.CallOpts) (float64, error)
```

The threshold of trusted nodes that must reach consensus on oracle data to commit it

## func [GetNodeDepositEnabled](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/node.go#L38>)

```go
func GetNodeDepositEnabled(rp *rocketpool.RocketPool, opts *bind.CallOpts) (bool, error)
```

Node deposits currently enabled

## func [GetNodeFeeDemandRange](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/network.go#L157>)

```go
func GetNodeFeeDemandRange(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)
```

The range of node demand values to base fee calculations on

## func [GetNodeRegistrationEnabled](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/node.go#L21>)

```go
func GetNodeRegistrationEnabled(rp *rocketpool.RocketPool, opts *bind.CallOpts) (bool, error)
```

Node registrations currently enabled

## func [GetRewardsClaimIntervalTime](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/rewards.go#L63>)

```go
func GetRewardsClaimIntervalTime(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)
```

Rewards claim interval time

## func [GetRewardsClaimerPerc](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/rewards.go#L21>)

```go
func GetRewardsClaimerPerc(rp *rocketpool.RocketPool, contractName string, opts *bind.CallOpts) (float64, error)
```

The claim amount for a claimer as a fraction

## func [GetRewardsClaimerPercTimeUpdated](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/rewards.go#L35>)

```go
func GetRewardsClaimerPercTimeUpdated(rp *rocketpool.RocketPool, contractName string, opts *bind.CallOpts) (uint64, error)
```

The time that a claimer's share was last updated

## func [GetRewardsClaimersPercTotal](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/rewards.go#L49>)

```go
func GetRewardsClaimersPercTotal(rp *rocketpool.RocketPool, opts *bind.CallOpts) (float64, error)
```

The total claim amount for all claimers as a fraction

## func [GetSubmitBalancesEnabled](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/network.go#L38>)

```go
func GetSubmitBalancesEnabled(rp *rocketpool.RocketPool, opts *bind.CallOpts) (bool, error)
```

Network balance submissions currently enabled

## func [GetSubmitBalancesFrequency](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/network.go#L55>)

```go
func GetSubmitBalancesFrequency(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)
```

The frequency in blocks at which network balances should be submitted by trusted nodes

## func [GetSubmitPricesEnabled](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/network.go#L72>)

```go
func GetSubmitPricesEnabled(rp *rocketpool.RocketPool, opts *bind.CallOpts) (bool, error)
```

Network price submissions currently enabled

## func [GetSubmitPricesFrequency](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/network.go#L89>)

```go
func GetSubmitPricesFrequency(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)
```

The frequency in blocks at which network prices should be submitted by trusted nodes

## func [GetTargetNodeFee](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/network.go#L123>)

```go
func GetTargetNodeFee(rp *rocketpool.RocketPool, opts *bind.CallOpts) (float64, error)
```

Target node commission rate

## func [GetTargetRethCollateralRate](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/protocol/network.go#L174>)

```go
func GetTargetRethCollateralRate(rp *rocketpool.RocketPool, opts *bind.CallOpts) (float64, error)
```

The target collateralization rate for the rETH contract as a fraction

