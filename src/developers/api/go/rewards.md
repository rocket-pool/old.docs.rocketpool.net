# rewards

```go
import "github.com/rocket-pool/rocketpool-go/rewards"
```

## Index

- [func CalculateLifetimeNodeRewards(rp *rocketpool.RocketPool, claimerAddress common.Address, intervalSize *big.Int) (*big.Int, error)](<#func-calculatelifetimenoderewards>)
- [func CalculateLifetimeTrustedNodeRewards(rp *rocketpool.RocketPool, claimerAddress common.Address, intervalSize *big.Int) (*big.Int, error)](<#func-calculatelifetimetrustednoderewards>)
- [func ClaimNodeRewards(rp *rocketpool.RocketPool, opts *bind.TransactOpts) (common.Hash, error)](<#func-claimnoderewards>)
- [func ClaimTrustedNodeRewards(rp *rocketpool.RocketPool, opts *bind.TransactOpts) (common.Hash, error)](<#func-claimtrustednoderewards>)
- [func EstimateClaimNodeRewardsGas(rp *rocketpool.RocketPool, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimateclaimnoderewardsgas>)
- [func EstimateClaimTrustedNodeRewardsGas(rp *rocketpool.RocketPool, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimateclaimtrustednoderewardsgas>)
- [func GetClaimIntervalTime(rp *rocketpool.RocketPool, opts *bind.CallOpts) (time.Duration, error)](<#func-getclaimintervaltime>)
- [func GetClaimIntervalTimeStart(rp *rocketpool.RocketPool, opts *bind.CallOpts) (time.Time, error)](<#func-getclaimintervaltimestart>)
- [func GetNodeClaimPossible(rp *rocketpool.RocketPool, claimerAddress common.Address, opts *bind.CallOpts) (bool, error)](<#func-getnodeclaimpossible>)
- [func GetNodeClaimRewardsAmount(rp *rocketpool.RocketPool, claimerAddress common.Address, opts *bind.CallOpts) (*big.Int, error)](<#func-getnodeclaimrewardsamount>)
- [func GetNodeClaimRewardsPerc(rp *rocketpool.RocketPool, claimerAddress common.Address, opts *bind.CallOpts) (float64, error)](<#func-getnodeclaimrewardsperc>)
- [func GetNodeClaimsEnabled(rp *rocketpool.RocketPool, opts *bind.CallOpts) (bool, error)](<#func-getnodeclaimsenabled>)
- [func GetNodeOperatorRewardsPercent(rp *rocketpool.RocketPool, opts *bind.CallOpts) (float64, error)](<#func-getnodeoperatorrewardspercent>)
- [func GetNodeRegistrationTime(rp *rocketpool.RocketPool, claimerAddress common.Address, opts *bind.CallOpts) (time.Time, error)](<#func-getnoderegistrationtime>)
- [func GetTrustedNodeClaimPossible(rp *rocketpool.RocketPool, claimerAddress common.Address, opts *bind.CallOpts) (bool, error)](<#func-gettrustednodeclaimpossible>)
- [func GetTrustedNodeClaimRewardsAmount(rp *rocketpool.RocketPool, claimerAddress common.Address, opts *bind.CallOpts) (*big.Int, error)](<#func-gettrustednodeclaimrewardsamount>)
- [func GetTrustedNodeClaimRewardsPerc(rp *rocketpool.RocketPool, claimerAddress common.Address, opts *bind.CallOpts) (float64, error)](<#func-gettrustednodeclaimrewardsperc>)
- [func GetTrustedNodeClaimsEnabled(rp *rocketpool.RocketPool, opts *bind.CallOpts) (bool, error)](<#func-gettrustednodeclaimsenabled>)
- [func GetTrustedNodeOperatorRewardsPercent(rp *rocketpool.RocketPool, opts *bind.CallOpts) (float64, error)](<#func-gettrustednodeoperatorrewardspercent>)
- [func GetTrustedNodeRegistrationTime(rp *rocketpool.RocketPool, claimerAddress common.Address, opts *bind.CallOpts) (time.Time, error)](<#func-gettrustednoderegistrationtime>)


## func [CalculateLifetimeNodeRewards](<https://github.com/rocket-pool/rocketpool-go/blob/release/rewards/node.go#L75>)

```go
func CalculateLifetimeNodeRewards(rp *rocketpool.RocketPool, claimerAddress common.Address, intervalSize *big.Int) (*big.Int, error)
```

Filters through token claim events and sums the total amount claimed by claimerAddress

## func [CalculateLifetimeTrustedNodeRewards](<https://github.com/rocket-pool/rocketpool-go/blob/release/rewards/trusted-node.go#L76>)

```go
func CalculateLifetimeTrustedNodeRewards(rp *rocketpool.RocketPool, claimerAddress common.Address, intervalSize *big.Int) (*big.Int, error)
```

Filters through token claim events and sums the total amount claimed by claimerAddress

## func [ClaimNodeRewards](<https://github.com/rocket-pool/rocketpool-go/blob/release/rewards/node.go#L66>)

```go
func ClaimNodeRewards(rp *rocketpool.RocketPool, opts *bind.TransactOpts) (common.Hash, error)
```

Claim node rewards

## func [ClaimTrustedNodeRewards](<https://github.com/rocket-pool/rocketpool-go/blob/release/rewards/trusted-node.go#L66>)

```go
func ClaimTrustedNodeRewards(rp *rocketpool.RocketPool, opts *bind.TransactOpts) (common.Hash, error)
```

Claim trusted node rewards

## func [EstimateClaimNodeRewardsGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/rewards/node.go#L56>)

```go
func EstimateClaimNodeRewardsGas(rp *rocketpool.RocketPool, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of ClaimNodeRewards

## func [EstimateClaimTrustedNodeRewardsGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/rewards/trusted-node.go#L56>)

```go
func EstimateClaimTrustedNodeRewardsGas(rp *rocketpool.RocketPool, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of ClaimTrustedNodeRewards

## func [GetClaimIntervalTime](<https://github.com/rocket-pool/rocketpool-go/blob/release/rewards/rewards.go#L103>)

```go
func GetClaimIntervalTime(rp *rocketpool.RocketPool, opts *bind.CallOpts) (time.Duration, error)
```

Get the number of seconds in a claim interval

## func [GetClaimIntervalTimeStart](<https://github.com/rocket-pool/rocketpool-go/blob/release/rewards/rewards.go#L89>)

```go
func GetClaimIntervalTimeStart(rp *rocketpool.RocketPool, opts *bind.CallOpts) (time.Time, error)
```

Get the timestamp that the current rewards interval started

## func [GetNodeClaimPossible](<https://github.com/rocket-pool/rocketpool-go/blob/release/rewards/node.go#L26>)

```go
func GetNodeClaimPossible(rp *rocketpool.RocketPool, claimerAddress common.Address, opts *bind.CallOpts) (bool, error)
```

Get whether a node rewards claimer can claim

## func [GetNodeClaimRewardsAmount](<https://github.com/rocket-pool/rocketpool-go/blob/release/rewards/node.go#L46>)

```go
func GetNodeClaimRewardsAmount(rp *rocketpool.RocketPool, claimerAddress common.Address, opts *bind.CallOpts) (*big.Int, error)
```

Get the total amount of rewards available for a node rewards claimer

## func [GetNodeClaimRewardsPerc](<https://github.com/rocket-pool/rocketpool-go/blob/release/rewards/node.go#L36>)

```go
func GetNodeClaimRewardsPerc(rp *rocketpool.RocketPool, claimerAddress common.Address, opts *bind.CallOpts) (float64, error)
```

Get the percentage of rewards available for a node rewards claimer

## func [GetNodeClaimsEnabled](<https://github.com/rocket-pool/rocketpool-go/blob/release/rewards/node.go#L16>)

```go
func GetNodeClaimsEnabled(rp *rocketpool.RocketPool, opts *bind.CallOpts) (bool, error)
```

Get whether node reward claims are enabled

## func [GetNodeOperatorRewardsPercent](<https://github.com/rocket-pool/rocketpool-go/blob/release/rewards/rewards.go#L117>)

```go
func GetNodeOperatorRewardsPercent(rp *rocketpool.RocketPool, opts *bind.CallOpts) (float64, error)
```

Get the percent of checkpoint rewards that goes to node operators

## func [GetNodeRegistrationTime](<https://github.com/rocket-pool/rocketpool-go/blob/release/rewards/node.go#L114>)

```go
func GetNodeRegistrationTime(rp *rocketpool.RocketPool, claimerAddress common.Address, opts *bind.CallOpts) (time.Time, error)
```

Get the time that the user registered as a claimer

## func [GetTrustedNodeClaimPossible](<https://github.com/rocket-pool/rocketpool-go/blob/release/rewards/trusted-node.go#L26>)

```go
func GetTrustedNodeClaimPossible(rp *rocketpool.RocketPool, claimerAddress common.Address, opts *bind.CallOpts) (bool, error)
```

Get whether a trusted node rewards claimer can claim

## func [GetTrustedNodeClaimRewardsAmount](<https://github.com/rocket-pool/rocketpool-go/blob/release/rewards/trusted-node.go#L46>)

```go
func GetTrustedNodeClaimRewardsAmount(rp *rocketpool.RocketPool, claimerAddress common.Address, opts *bind.CallOpts) (*big.Int, error)
```

Get the total amount of rewards available for a trusted node rewards claimer

## func [GetTrustedNodeClaimRewardsPerc](<https://github.com/rocket-pool/rocketpool-go/blob/release/rewards/trusted-node.go#L36>)

```go
func GetTrustedNodeClaimRewardsPerc(rp *rocketpool.RocketPool, claimerAddress common.Address, opts *bind.CallOpts) (float64, error)
```

Get the percentage of rewards available for a trusted node rewards claimer

## func [GetTrustedNodeClaimsEnabled](<https://github.com/rocket-pool/rocketpool-go/blob/release/rewards/trusted-node.go#L16>)

```go
func GetTrustedNodeClaimsEnabled(rp *rocketpool.RocketPool, opts *bind.CallOpts) (bool, error)
```

Get whether trusted node reward claims are enabled

## func [GetTrustedNodeOperatorRewardsPercent](<https://github.com/rocket-pool/rocketpool-go/blob/release/rewards/rewards.go#L131>)

```go
func GetTrustedNodeOperatorRewardsPercent(rp *rocketpool.RocketPool, opts *bind.CallOpts) (float64, error)
```

Get the percent of checkpoint rewards that goes to ODAO members

## func [GetTrustedNodeRegistrationTime](<https://github.com/rocket-pool/rocketpool-go/blob/release/rewards/trusted-node.go#L115>)

```go
func GetTrustedNodeRegistrationTime(rp *rocketpool.RocketPool, claimerAddress common.Address, opts *bind.CallOpts) (time.Time, error)
```

Get the time that the user registered as a claimer

