# node

```go
import "github.com/rocket-pool/rocketpool-go/node"
```

## Index

- [Constants](<#constants>)
- [func CalculateTotalEffectiveRPLStake(rp *rocketpool.RocketPool, offset, limit, rplPrice *big.Int, opts *bind.CallOpts) (*big.Int, error)](<#func-calculatetotaleffectiverplstake>)
- [func Deposit(rp *rocketpool.RocketPool, minimumNodeFee float64, opts *bind.TransactOpts) (common.Hash, error)](<#func-deposit>)
- [func EstimateDepositGas(rp *rocketpool.RocketPool, minimumNodeFee float64, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimatedepositgas>)
- [func EstimateRegisterNodeGas(rp *rocketpool.RocketPool, timezoneLocation string, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimateregisternodegas>)
- [func EstimateSetTimezoneLocationGas(rp *rocketpool.RocketPool, timezoneLocation string, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimatesettimezonelocationgas>)
- [func EstimateStakeGas(rp *rocketpool.RocketPool, rplAmount *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimatestakegas>)
- [func EstimateWithdrawRPLGas(rp *rocketpool.RocketPool, rplAmount *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimatewithdrawrplgas>)
- [func GetBalancesSubmissions(rp *rocketpool.RocketPool, nodeAddress common.Address, fromBlock uint64, intervalSize *big.Int) (*[]uint64, error)](<#func-getbalancessubmissions>)
- [func GetNodeAddresses(rp *rocketpool.RocketPool, opts *bind.CallOpts) ([]common.Address, error)](<#func-getnodeaddresses>)
- [func GetNodeAt(rp *rocketpool.RocketPool, index uint64, opts *bind.CallOpts) (common.Address, error)](<#func-getnodeat>)
- [func GetNodeCount(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)](<#func-getnodecount>)
- [func GetNodeEffectiveRPLStake(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.CallOpts) (*big.Int, error)](<#func-getnodeeffectiverplstake>)
- [func GetNodeExists(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.CallOpts) (bool, error)](<#func-getnodeexists>)
- [func GetNodeMaximumRPLStake(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.CallOpts) (*big.Int, error)](<#func-getnodemaximumrplstake>)
- [func GetNodeMinimumRPLStake(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.CallOpts) (*big.Int, error)](<#func-getnodeminimumrplstake>)
- [func GetNodeMinipoolLimit(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.CallOpts) (uint64, error)](<#func-getnodeminipoollimit>)
- [func GetNodeRPLStake(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.CallOpts) (*big.Int, error)](<#func-getnoderplstake>)
- [func GetNodeRPLStakedTime(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.CallOpts) (uint64, error)](<#func-getnoderplstakedtime>)
- [func GetNodeTimezoneLocation(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.CallOpts) (string, error)](<#func-getnodetimezonelocation>)
- [func GetPricesSubmissions(rp *rocketpool.RocketPool, nodeAddress common.Address, fromBlock uint64, intervalSize *big.Int) (*[]uint64, error)](<#func-getpricessubmissions>)
- [func GetTotalEffectiveRPLStake(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)](<#func-gettotaleffectiverplstake>)
- [func GetTotalRPLStake(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)](<#func-gettotalrplstake>)
- [func RegisterNode(rp *rocketpool.RocketPool, timezoneLocation string, opts *bind.TransactOpts) (common.Hash, error)](<#func-registernode>)
- [func SetTimezoneLocation(rp *rocketpool.RocketPool, timezoneLocation string, opts *bind.TransactOpts) (common.Hash, error)](<#func-settimezonelocation>)
- [func StakeRPL(rp *rocketpool.RocketPool, rplAmount *big.Int, opts *bind.TransactOpts) (common.Hash, error)](<#func-stakerpl>)
- [func WithdrawRPL(rp *rocketpool.RocketPool, rplAmount *big.Int, opts *bind.TransactOpts) (common.Hash, error)](<#func-withdrawrpl>)
- [type NodeDetails](<#type-nodedetails>)
  - [func GetNodeDetails(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.CallOpts) (NodeDetails, error)](<#func-getnodedetails>)
  - [func GetNodes(rp *rocketpool.RocketPool, opts *bind.CallOpts) ([]NodeDetails, error)](<#func-getnodes>)
- [type TimezoneCount](<#type-timezonecount>)
  - [func GetNodeCountPerTimezone(rp *rocketpool.RocketPool, offset, limit *big.Int, opts *bind.CallOpts) ([]TimezoneCount, error)](<#func-getnodecountpertimezone>)
- [type TrustedNodeParticipation](<#type-trustednodeparticipation>)
  - [func CalculateTrustedNodeBalancesParticipation(rp *rocketpool.RocketPool, intervalSize *big.Int, opts *bind.CallOpts) (*TrustedNodeParticipation, error)](<#func-calculatetrustednodebalancesparticipation>)
  - [func CalculateTrustedNodePricesParticipation(rp *rocketpool.RocketPool, intervalSize *big.Int, opts *bind.CallOpts) (*TrustedNodeParticipation, error)](<#func-calculatetrustednodepricesparticipation>)


## Constants

Settings

```go
const (
    NodeAddressBatchSize = 50
    NodeDetailsBatchSize = 20
)
```

## func [CalculateTotalEffectiveRPLStake](<https://github.com/rocket-pool/rocketpool-go/blob/release/node/staking.go#L175>)

```go
func CalculateTotalEffectiveRPLStake(rp *rocketpool.RocketPool, offset, limit, rplPrice *big.Int, opts *bind.CallOpts) (*big.Int, error)
```

Calculate total effective RPL stake

## func [Deposit](<https://github.com/rocket-pool/rocketpool-go/blob/release/node/deposit.go#L25>)

```go
func Deposit(rp *rocketpool.RocketPool, minimumNodeFee float64, opts *bind.TransactOpts) (common.Hash, error)
```

Make a node deposit

## func [EstimateDepositGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/node/deposit.go#L15>)

```go
func EstimateDepositGas(rp *rocketpool.RocketPool, minimumNodeFee float64, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of Deposit

## func [EstimateRegisterNodeGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/node/node.go#L261>)

```go
func EstimateRegisterNodeGas(rp *rocketpool.RocketPool, timezoneLocation string, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of RegisterNode

## func [EstimateSetTimezoneLocationGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/node/node.go#L293>)

```go
func EstimateSetTimezoneLocationGas(rp *rocketpool.RocketPool, timezoneLocation string, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of SetTimezoneLocation

## func [EstimateStakeGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/node/staking.go#L127>)

```go
func EstimateStakeGas(rp *rocketpool.RocketPool, rplAmount *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of Stake

## func [EstimateWithdrawRPLGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/node/staking.go#L151>)

```go
func EstimateWithdrawRPLGas(rp *rocketpool.RocketPool, rplAmount *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of WithdrawRPL

## func [GetBalancesSubmissions](<https://github.com/rocket-pool/rocketpool-go/blob/release/node/node.go#L352>)

```go
func GetBalancesSubmissions(rp *rocketpool.RocketPool, nodeAddress common.Address, fromBlock uint64, intervalSize *big.Int) (*[]uint64, error)
```

Returns an array of block numbers for balances submissions the given trusted node has submitted since fromBlock

## func [GetNodeAddresses](<https://github.com/rocket-pool/rocketpool-go/blob/release/node/node.go#L102>)

```go
func GetNodeAddresses(rp *rocketpool.RocketPool, opts *bind.CallOpts) ([]common.Address, error)
```

Get all node addresses

## func [GetNodeAt](<https://github.com/rocket-pool/rocketpool-go/blob/release/node/node.go#L219>)

```go
func GetNodeAt(rp *rocketpool.RocketPool, index uint64, opts *bind.CallOpts) (common.Address, error)
```

Get a node address by index

## func [GetNodeCount](<https://github.com/rocket-pool/rocketpool-go/blob/release/node/node.go#L191>)

```go
func GetNodeCount(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)
```

Get the number of nodes in the network

## func [GetNodeEffectiveRPLStake](<https://github.com/rocket-pool/rocketpool-go/blob/release/node/staking.go#L57>)

```go
func GetNodeEffectiveRPLStake(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.CallOpts) (*big.Int, error)
```

Get a node's effective RPL stake

## func [GetNodeExists](<https://github.com/rocket-pool/rocketpool-go/blob/release/node/node.go#L233>)

```go
func GetNodeExists(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.CallOpts) (bool, error)
```

Check whether a node exists

## func [GetNodeMaximumRPLStake](<https://github.com/rocket-pool/rocketpool-go/blob/release/node/staking.go#L85>)

```go
func GetNodeMaximumRPLStake(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.CallOpts) (*big.Int, error)
```

Get a node's maximum RPL stake to collateralize their minipools

## func [GetNodeMinimumRPLStake](<https://github.com/rocket-pool/rocketpool-go/blob/release/node/staking.go#L71>)

```go
func GetNodeMinimumRPLStake(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.CallOpts) (*big.Int, error)
```

Get a node's minimum RPL stake to collateralize their minipools

## func [GetNodeMinipoolLimit](<https://github.com/rocket-pool/rocketpool-go/blob/release/node/staking.go#L113>)

```go
func GetNodeMinipoolLimit(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.CallOpts) (uint64, error)
```

Get a node's minipool limit based on RPL stake

## func [GetNodeRPLStake](<https://github.com/rocket-pool/rocketpool-go/blob/release/node/staking.go#L43>)

```go
func GetNodeRPLStake(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.CallOpts) (*big.Int, error)
```

Get a node's RPL stake

## func [GetNodeRPLStakedTime](<https://github.com/rocket-pool/rocketpool-go/blob/release/node/staking.go#L99>)

```go
func GetNodeRPLStakedTime(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.CallOpts) (uint64, error)
```

Get the time a node last staked RPL

## func [GetNodeTimezoneLocation](<https://github.com/rocket-pool/rocketpool-go/blob/release/node/node.go#L247>)

```go
func GetNodeTimezoneLocation(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.CallOpts) (string, error)
```

Get a node's timezone location

## func [GetPricesSubmissions](<https://github.com/rocket-pool/rocketpool-go/blob/release/node/node.go#L324>)

```go
func GetPricesSubmissions(rp *rocketpool.RocketPool, nodeAddress common.Address, fromBlock uint64, intervalSize *big.Int) (*[]uint64, error)
```

Returns an array of block numbers for prices submissions the given trusted node has submitted since fromBlock

## func [GetTotalEffectiveRPLStake](<https://github.com/rocket-pool/rocketpool-go/blob/release/node/staking.go#L29>)

```go
func GetTotalEffectiveRPLStake(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)
```

Get the effective RPL staked in the network

## func [GetTotalRPLStake](<https://github.com/rocket-pool/rocketpool-go/blob/release/node/staking.go#L15>)

```go
func GetTotalRPLStake(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)
```

Get the total RPL staked in the network

## func [RegisterNode](<https://github.com/rocket-pool/rocketpool-go/blob/release/node/node.go#L275>)

```go
func RegisterNode(rp *rocketpool.RocketPool, timezoneLocation string, opts *bind.TransactOpts) (common.Hash, error)
```

Register a node

## func [SetTimezoneLocation](<https://github.com/rocket-pool/rocketpool-go/blob/release/node/node.go#L307>)

```go
func SetTimezoneLocation(rp *rocketpool.RocketPool, timezoneLocation string, opts *bind.TransactOpts) (common.Hash, error)
```

Set a node's timezone location

## func [StakeRPL](<https://github.com/rocket-pool/rocketpool-go/blob/release/node/staking.go#L137>)

```go
func StakeRPL(rp *rocketpool.RocketPool, rplAmount *big.Int, opts *bind.TransactOpts) (common.Hash, error)
```

Stake RPL

## func [WithdrawRPL](<https://github.com/rocket-pool/rocketpool-go/blob/release/node/staking.go#L161>)

```go
func WithdrawRPL(rp *rocketpool.RocketPool, rplAmount *big.Int, opts *bind.TransactOpts) (common.Hash, error)
```

Withdraw staked RPL

## type [NodeDetails](<https://github.com/rocket-pool/rocketpool-go/blob/release/node/node.go#L33-L39>)

Node details

```go
type NodeDetails struct {
    Address                  common.Address `json:"address"`
    Exists                   bool           `json:"exists"`
    WithdrawalAddress        common.Address `json:"withdrawalAddress"`
    PendingWithdrawalAddress common.Address `json:"pendingWithdrawalAddress"`
    TimezoneLocation         string         `json:"timezoneLocation"`
}
```

### func [GetNodeDetails](<https://github.com/rocket-pool/rocketpool-go/blob/release/node/node.go#L142>)

```go
func GetNodeDetails(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.CallOpts) (NodeDetails, error)
```

Get a node's details

### func [GetNodes](<https://github.com/rocket-pool/rocketpool-go/blob/release/node/node.go#L61>)

```go
func GetNodes(rp *rocketpool.RocketPool, opts *bind.CallOpts) ([]NodeDetails, error)
```

Get all node details

## type [TimezoneCount](<https://github.com/rocket-pool/rocketpool-go/blob/release/node/node.go#L43-L46>)

Count of nodes belonging to a timezone

```go
type TimezoneCount struct {
    Timezone string   `abi:"timezone"`
    Count    *big.Int `abi:"count"`
}
```

### func [GetNodeCountPerTimezone](<https://github.com/rocket-pool/rocketpool-go/blob/release/node/node.go#L205>)

```go
func GetNodeCountPerTimezone(rp *rocketpool.RocketPool, offset, limit *big.Int, opts *bind.CallOpts) ([]TimezoneCount, error)
```

Get a breakdown of the number of nodes per timezone

## type [TrustedNodeParticipation](<https://github.com/rocket-pool/rocketpool-go/blob/release/node/node.go#L49-L57>)

The results of the trusted node participation calculation

```go
type TrustedNodeParticipation struct {
    StartBlock          uint64
    UpdateFrequency     uint64
    UpdateCount         uint64
    Probability         float64
    ExpectedSubmissions float64
    ActualSubmissions   map[common.Address]float64
    Participation       map[common.Address][]bool
}
```

### func [CalculateTrustedNodeBalancesParticipation](<https://github.com/rocket-pool/rocketpool-go/blob/release/node/node.go#L503>)

```go
func CalculateTrustedNodeBalancesParticipation(rp *rocketpool.RocketPool, intervalSize *big.Int, opts *bind.CallOpts) (*TrustedNodeParticipation, error)
```

Calculates the participation rate of every trusted node on balance submission since the last block that member count changed

### func [CalculateTrustedNodePricesParticipation](<https://github.com/rocket-pool/rocketpool-go/blob/release/node/node.go#L416>)

```go
func CalculateTrustedNodePricesParticipation(rp *rocketpool.RocketPool, intervalSize *big.Int, opts *bind.CallOpts) (*TrustedNodeParticipation, error)
```

Calculates the participation rate of every trusted node on price submission since the last block that member count changed

