# trustednode

```go
import "github.com/rocket-pool/rocketpool-go/settings/trustednode"
```

## Index

- [Constants](<#constants>)
- [func BootstrapChallengeCooldown(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapchallengecooldown>)
- [func BootstrapChallengeCost(rp *rocketpool.RocketPool, value *big.Int, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapchallengecost>)
- [func BootstrapChallengeWindow(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapchallengewindow>)
- [func BootstrapMinipoolUnbondedMax(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapminipoolunbondedmax>)
- [func BootstrapMinipoolUnbondedMinFee(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapminipoolunbondedminfee>)
- [func BootstrapProposalActionTime(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapproposalactiontime>)
- [func BootstrapProposalCooldownTime(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapproposalcooldowntime>)
- [func BootstrapProposalExecuteTime(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapproposalexecutetime>)
- [func BootstrapProposalVoteDelayTime(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapproposalvotedelaytime>)
- [func BootstrapProposalVoteTime(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapproposalvotetime>)
- [func BootstrapQuorum(rp *rocketpool.RocketPool, value float64, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapquorum>)
- [func BootstrapRPLBond(rp *rocketpool.RocketPool, value *big.Int, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstraprplbond>)
- [func EstimateProposeChallengeCooldownGas(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimateproposechallengecooldowngas>)
- [func EstimateProposeChallengeCostGas(rp *rocketpool.RocketPool, value *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimateproposechallengecostgas>)
- [func EstimateProposeChallengeWindowGas(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimateproposechallengewindowgas>)
- [func EstimateProposeMinipoolUnbondedMaxGas(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimateproposeminipoolunbondedmaxgas>)
- [func EstimateProposeMinipoolUnbondedMinFeeGas(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimateproposeminipoolunbondedminfeegas>)
- [func EstimateProposeProposalActionTimeGas(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimateproposeproposalactiontimegas>)
- [func EstimateProposeProposalCooldownTimeGas(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimateproposeproposalcooldowntimegas>)
- [func EstimateProposeProposalExecuteTimeGas(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimateproposeproposalexecutetimegas>)
- [func EstimateProposeProposalVoteDelayTimeGas(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimateproposeproposalvotedelaytimegas>)
- [func EstimateProposeProposalVoteTimeGas(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimateproposeproposalvotetimegas>)
- [func EstimateProposeQuorumGas(rp *rocketpool.RocketPool, value float64, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimateproposequorumgas>)
- [func EstimateProposeRPLBondGas(rp *rocketpool.RocketPool, value *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimateproposerplbondgas>)
- [func GetChallengeCooldown(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)](<#func-getchallengecooldown>)
- [func GetChallengeCost(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)](<#func-getchallengecost>)
- [func GetChallengeWindow(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)](<#func-getchallengewindow>)
- [func GetMinipoolUnbondedMax(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)](<#func-getminipoolunbondedmax>)
- [func GetMinipoolUnbondedMinFee(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)](<#func-getminipoolunbondedminfee>)
- [func GetProposalActionTime(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)](<#func-getproposalactiontime>)
- [func GetProposalCooldownTime(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)](<#func-getproposalcooldowntime>)
- [func GetProposalExecuteTime(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)](<#func-getproposalexecutetime>)
- [func GetProposalVoteDelayTime(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)](<#func-getproposalvotedelaytime>)
- [func GetProposalVoteTime(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)](<#func-getproposalvotetime>)
- [func GetQuorum(rp *rocketpool.RocketPool, opts *bind.CallOpts) (float64, error)](<#func-getquorum>)
- [func GetRPLBond(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)](<#func-getrplbond>)
- [func ProposeChallengeCooldown(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (uint64, common.Hash, error)](<#func-proposechallengecooldown>)
- [func ProposeChallengeCost(rp *rocketpool.RocketPool, value *big.Int, opts *bind.TransactOpts) (uint64, common.Hash, error)](<#func-proposechallengecost>)
- [func ProposeChallengeWindow(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (uint64, common.Hash, error)](<#func-proposechallengewindow>)
- [func ProposeMinipoolUnbondedMax(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (uint64, common.Hash, error)](<#func-proposeminipoolunbondedmax>)
- [func ProposeMinipoolUnbondedMinFee(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (uint64, common.Hash, error)](<#func-proposeminipoolunbondedminfee>)
- [func ProposeProposalActionTime(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (uint64, common.Hash, error)](<#func-proposeproposalactiontime>)
- [func ProposeProposalCooldownTime(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (uint64, common.Hash, error)](<#func-proposeproposalcooldowntime>)
- [func ProposeProposalExecuteTime(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (uint64, common.Hash, error)](<#func-proposeproposalexecutetime>)
- [func ProposeProposalVoteDelayTime(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (uint64, common.Hash, error)](<#func-proposeproposalvotedelaytime>)
- [func ProposeProposalVoteTime(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (uint64, common.Hash, error)](<#func-proposeproposalvotetime>)
- [func ProposeQuorum(rp *rocketpool.RocketPool, value float64, opts *bind.TransactOpts) (uint64, common.Hash, error)](<#func-proposequorum>)
- [func ProposeRPLBond(rp *rocketpool.RocketPool, value *big.Int, opts *bind.TransactOpts) (uint64, common.Hash, error)](<#func-proposerplbond>)


## Constants

Config

```go
const (
    MembersSettingsContractName       = "rocketDAONodeTrustedSettingsMembers"
    QuorumSettingPath                 = "members.quorum"
    RPLBondSettingPath                = "members.rplbond"
    MinipoolUnbondedMaxSettingPath    = "members.minipool.unbonded.max"
    MinipoolUnbondedMinFeeSettingPath = "members.minipool.unbonded.min.fee"
    ChallengeCooldownSettingPath      = "members.challenge.cooldown"
    ChallengeWindowSettingPath        = "members.challenge.window"
    ChallengeCostSettingPath          = "members.challenge.cost"
)
```

Config

```go
const (
    ProposalsSettingsContractName = "rocketDAONodeTrustedSettingsProposals"
    CooldownTimeSettingPath       = "proposal.cooldown.time"
    VoteTimeSettingPath           = "proposal.vote.time"
    VoteDelayTimeSettingPath      = "proposal.vote.delay.time"
    ExecuteTimeSettingPath        = "proposal.execute.time"
    ActionTimeSettingPath         = "proposal.action.time"
)
```

## func [BootstrapChallengeCooldown](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/members.go#L134>)

```go
func BootstrapChallengeCooldown(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapChallengeCost](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/members.go#L180>)

```go
func BootstrapChallengeCost(rp *rocketpool.RocketPool, value *big.Int, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapChallengeWindow](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/members.go#L157>)

```go
func BootstrapChallengeWindow(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapMinipoolUnbondedMax](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/members.go#L87>)

```go
func BootstrapMinipoolUnbondedMax(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapMinipoolUnbondedMinFee](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/members.go#L111>)

```go
func BootstrapMinipoolUnbondedMinFee(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapProposalActionTime](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/proposals.go#L130>)

```go
func BootstrapProposalActionTime(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapProposalCooldownTime](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/proposals.go#L38>)

```go
func BootstrapProposalCooldownTime(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapProposalExecuteTime](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/proposals.go#L107>)

```go
func BootstrapProposalExecuteTime(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapProposalVoteDelayTime](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/proposals.go#L84>)

```go
func BootstrapProposalVoteDelayTime(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapProposalVoteTime](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/proposals.go#L61>)

```go
func BootstrapProposalVoteTime(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapQuorum](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/members.go#L41>)

```go
func BootstrapQuorum(rp *rocketpool.RocketPool, value float64, opts *bind.TransactOpts) (common.Hash, error)
```

## func [BootstrapRPLBond](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/members.go#L64>)

```go
func BootstrapRPLBond(rp *rocketpool.RocketPool, value *big.Int, opts *bind.TransactOpts) (common.Hash, error)
```

## func [EstimateProposeChallengeCooldownGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/members.go#L140>)

```go
func EstimateProposeChallengeCooldownGas(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

## func [EstimateProposeChallengeCostGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/members.go#L186>)

```go
func EstimateProposeChallengeCostGas(rp *rocketpool.RocketPool, value *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

## func [EstimateProposeChallengeWindowGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/members.go#L163>)

```go
func EstimateProposeChallengeWindowGas(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

## func [EstimateProposeMinipoolUnbondedMaxGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/members.go#L93>)

```go
func EstimateProposeMinipoolUnbondedMaxGas(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

## func [EstimateProposeMinipoolUnbondedMinFeeGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/members.go#L117>)

```go
func EstimateProposeMinipoolUnbondedMinFeeGas(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

## func [EstimateProposeProposalActionTimeGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/proposals.go#L136>)

```go
func EstimateProposeProposalActionTimeGas(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

## func [EstimateProposeProposalCooldownTimeGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/proposals.go#L44>)

```go
func EstimateProposeProposalCooldownTimeGas(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

## func [EstimateProposeProposalExecuteTimeGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/proposals.go#L113>)

```go
func EstimateProposeProposalExecuteTimeGas(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

## func [EstimateProposeProposalVoteDelayTimeGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/proposals.go#L90>)

```go
func EstimateProposeProposalVoteDelayTimeGas(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

## func [EstimateProposeProposalVoteTimeGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/proposals.go#L67>)

```go
func EstimateProposeProposalVoteTimeGas(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

## func [EstimateProposeQuorumGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/members.go#L47>)

```go
func EstimateProposeQuorumGas(rp *rocketpool.RocketPool, value float64, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

## func [EstimateProposeRPLBondGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/members.go#L70>)

```go
func EstimateProposeRPLBondGas(rp *rocketpool.RocketPool, value *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

## func [GetChallengeCooldown](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/members.go#L123>)

```go
func GetChallengeCooldown(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)
```

The period a member must wait for before submitting another challenge\, in blocks

## func [GetChallengeCost](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/members.go#L169>)

```go
func GetChallengeCost(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)
```

The fee for a non\-member to challenge a member\, in wei

## func [GetChallengeWindow](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/members.go#L146>)

```go
func GetChallengeWindow(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)
```

The period during which a member can respond to a challenge\, in blocks

## func [GetMinipoolUnbondedMax](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/members.go#L76>)

```go
func GetMinipoolUnbondedMax(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)
```

The maximum number of unbonded minipools a member can run

## func [GetMinipoolUnbondedMinFee](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/members.go#L100>)

```go
func GetMinipoolUnbondedMinFee(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)
```

The minimum commission rate before unbonded minipools are allowed

## func [GetProposalActionTime](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/proposals.go#L119>)

```go
func GetProposalActionTime(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)
```

The period during which an action can be performed on an executed proposal in seconds

## func [GetProposalCooldownTime](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/proposals.go#L27>)

```go
func GetProposalCooldownTime(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)
```

The cooldown period a member must wait after making a proposal before making another in seconds

## func [GetProposalExecuteTime](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/proposals.go#L96>)

```go
func GetProposalExecuteTime(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)
```

The period during which a passed proposal can be executed in time

## func [GetProposalVoteDelayTime](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/proposals.go#L73>)

```go
func GetProposalVoteDelayTime(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)
```

The delay after creation before a proposal can be voted on in seconds

## func [GetProposalVoteTime](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/proposals.go#L50>)

```go
func GetProposalVoteTime(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)
```

The period a proposal can be voted on for in seconds

## func [GetQuorum](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/members.go#L30>)

```go
func GetQuorum(rp *rocketpool.RocketPool, opts *bind.CallOpts) (float64, error)
```

Member proposal quorum threshold

## func [GetRPLBond](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/members.go#L53>)

```go
func GetRPLBond(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)
```

RPL bond required for a member

## func [ProposeChallengeCooldown](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/members.go#L137>)

```go
func ProposeChallengeCooldown(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (uint64, common.Hash, error)
```

## func [ProposeChallengeCost](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/members.go#L183>)

```go
func ProposeChallengeCost(rp *rocketpool.RocketPool, value *big.Int, opts *bind.TransactOpts) (uint64, common.Hash, error)
```

## func [ProposeChallengeWindow](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/members.go#L160>)

```go
func ProposeChallengeWindow(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (uint64, common.Hash, error)
```

## func [ProposeMinipoolUnbondedMax](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/members.go#L90>)

```go
func ProposeMinipoolUnbondedMax(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (uint64, common.Hash, error)
```

## func [ProposeMinipoolUnbondedMinFee](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/members.go#L114>)

```go
func ProposeMinipoolUnbondedMinFee(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (uint64, common.Hash, error)
```

## func [ProposeProposalActionTime](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/proposals.go#L133>)

```go
func ProposeProposalActionTime(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (uint64, common.Hash, error)
```

## func [ProposeProposalCooldownTime](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/proposals.go#L41>)

```go
func ProposeProposalCooldownTime(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (uint64, common.Hash, error)
```

## func [ProposeProposalExecuteTime](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/proposals.go#L110>)

```go
func ProposeProposalExecuteTime(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (uint64, common.Hash, error)
```

## func [ProposeProposalVoteDelayTime](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/proposals.go#L87>)

```go
func ProposeProposalVoteDelayTime(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (uint64, common.Hash, error)
```

## func [ProposeProposalVoteTime](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/proposals.go#L64>)

```go
func ProposeProposalVoteTime(rp *rocketpool.RocketPool, value uint64, opts *bind.TransactOpts) (uint64, common.Hash, error)
```

## func [ProposeQuorum](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/members.go#L44>)

```go
func ProposeQuorum(rp *rocketpool.RocketPool, value float64, opts *bind.TransactOpts) (uint64, common.Hash, error)
```

## func [ProposeRPLBond](<https://github.com/rocket-pool/rocketpool-go/blob/release/settings/trustednode/members.go#L67>)

```go
func ProposeRPLBond(rp *rocketpool.RocketPool, value *big.Int, opts *bind.TransactOpts) (uint64, common.Hash, error)
```

