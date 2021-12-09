# trustednode

```go
import "github.com/rocket-pool/rocketpool-go/dao/trustednode"
```

## Index

- [Constants](<#constants>)
- [func BootstrapBool(rp *rocketpool.RocketPool, contractName, settingPath string, value bool, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapbool>)
- [func BootstrapMember(rp *rocketpool.RocketPool, id, url string, nodeAddress common.Address, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapmember>)
- [func BootstrapUint(rp *rocketpool.RocketPool, contractName, settingPath string, value *big.Int, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapuint>)
- [func BootstrapUpgrade(rp *rocketpool.RocketPool, upgradeType, contractName, contractAbi string, contractAddress common.Address, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapupgrade>)
- [func CancelProposal(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.TransactOpts) (common.Hash, error)](<#func-cancelproposal>)
- [func DecideChallenge(rp *rocketpool.RocketPool, memberAddress common.Address, opts *bind.TransactOpts) (common.Hash, error)](<#func-decidechallenge>)
- [func EstimateBootstrapBoolGas(rp *rocketpool.RocketPool, contractName, settingPath string, value bool, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimatebootstrapboolgas>)
- [func EstimateBootstrapMemberGas(rp *rocketpool.RocketPool, id, url string, nodeAddress common.Address, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimatebootstrapmembergas>)
- [func EstimateBootstrapUintGas(rp *rocketpool.RocketPool, contractName, settingPath string, value *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimatebootstrapuintgas>)
- [func EstimateBootstrapUpgradeGas(rp *rocketpool.RocketPool, upgradeType, contractName, contractAbi string, contractAddress common.Address, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimatebootstrapupgradegas>)
- [func EstimateCancelProposalGas(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimatecancelproposalgas>)
- [func EstimateDecideChallengeGas(rp *rocketpool.RocketPool, memberAddress common.Address, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimatedecidechallengegas>)
- [func EstimateExecuteProposalGas(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimateexecuteproposalgas>)
- [func EstimateJoinGas(rp *rocketpool.RocketPool, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimatejoingas>)
- [func EstimateLeaveGas(rp *rocketpool.RocketPool, rplBondRefundAddress common.Address, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimateleavegas>)
- [func EstimateMakeChallengeGas(rp *rocketpool.RocketPool, memberAddress common.Address, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimatemakechallengegas>)
- [func EstimateProposalGas(rp *rocketpool.RocketPool, message string, payload []byte, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimateproposalgas>)
- [func EstimateProposeInviteMemberGas(rp *rocketpool.RocketPool, message string, newMemberAddress common.Address, newMemberId, newMemberUrl string, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimateproposeinvitemembergas>)
- [func EstimateProposeKickMemberGas(rp *rocketpool.RocketPool, message string, memberAddress common.Address, rplFineAmount *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimateproposekickmembergas>)
- [func EstimateProposeMemberLeaveGas(rp *rocketpool.RocketPool, message string, memberAddress common.Address, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimateproposememberleavegas>)
- [func EstimateProposeReplaceMemberGas(rp *rocketpool.RocketPool, message string, memberAddress, newMemberAddress common.Address, newMemberId, newMemberUrl string, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimateproposereplacemembergas>)
- [func EstimateProposeSetBoolGas(rp *rocketpool.RocketPool, message, contractName, settingPath string, value bool, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimateproposesetboolgas>)
- [func EstimateProposeSetUintGas(rp *rocketpool.RocketPool, message, contractName, settingPath string, value *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimateproposesetuintgas>)
- [func EstimateProposeUpgradeContractGas(rp *rocketpool.RocketPool, message, upgradeType, contractName, contractAbi string, contractAddress common.Address, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimateproposeupgradecontractgas>)
- [func EstimateVoteOnProposalGas(rp *rocketpool.RocketPool, proposalId uint64, support bool, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimatevoteonproposalgas>)
- [func ExecuteProposal(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.TransactOpts) (common.Hash, error)](<#func-executeproposal>)
- [func GetMemberAddresses(rp *rocketpool.RocketPool, opts *bind.CallOpts) ([]common.Address, error)](<#func-getmemberaddresses>)
- [func GetMemberAt(rp *rocketpool.RocketPool, index uint64, opts *bind.CallOpts) (common.Address, error)](<#func-getmemberat>)
- [func GetMemberCount(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)](<#func-getmembercount>)
- [func GetMemberExists(rp *rocketpool.RocketPool, memberAddress common.Address, opts *bind.CallOpts) (bool, error)](<#func-getmemberexists>)
- [func GetMemberID(rp *rocketpool.RocketPool, memberAddress common.Address, opts *bind.CallOpts) (string, error)](<#func-getmemberid>)
- [func GetMemberInviteProposalExecutedTime(rp *rocketpool.RocketPool, memberAddress common.Address, opts *bind.CallOpts) (uint64, error)](<#func-getmemberinviteproposalexecutedtime>)
- [func GetMemberIsChallenged(rp *rocketpool.RocketPool, memberAddress common.Address, opts *bind.CallOpts) (bool, error)](<#func-getmemberischallenged>)
- [func GetMemberJoinedTime(rp *rocketpool.RocketPool, memberAddress common.Address, opts *bind.CallOpts) (uint64, error)](<#func-getmemberjoinedtime>)
- [func GetMemberLastProposalTime(rp *rocketpool.RocketPool, memberAddress common.Address, opts *bind.CallOpts) (uint64, error)](<#func-getmemberlastproposaltime>)
- [func GetMemberLeaveProposalExecutedTime(rp *rocketpool.RocketPool, memberAddress common.Address, opts *bind.CallOpts) (uint64, error)](<#func-getmemberleaveproposalexecutedtime>)
- [func GetMemberProposalExecutedTime(rp *rocketpool.RocketPool, proposalType string, memberAddress common.Address, opts *bind.CallOpts) (uint64, error)](<#func-getmemberproposalexecutedtime>)
- [func GetMemberRPLBondAmount(rp *rocketpool.RocketPool, memberAddress common.Address, opts *bind.CallOpts) (*big.Int, error)](<#func-getmemberrplbondamount>)
- [func GetMemberReplaceProposalExecutedTime(rp *rocketpool.RocketPool, memberAddress common.Address, opts *bind.CallOpts) (uint64, error)](<#func-getmemberreplaceproposalexecutedtime>)
- [func GetMemberReplacementAddress(rp *rocketpool.RocketPool, memberAddress common.Address, opts *bind.CallOpts) (common.Address, error)](<#func-getmemberreplacementaddress>)
- [func GetMemberUnbondedValidatorCount(rp *rocketpool.RocketPool, memberAddress common.Address, opts *bind.CallOpts) (uint64, error)](<#func-getmemberunbondedvalidatorcount>)
- [func GetMemberUrl(rp *rocketpool.RocketPool, memberAddress common.Address, opts *bind.CallOpts) (string, error)](<#func-getmemberurl>)
- [func GetMinimumMemberCount(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)](<#func-getminimummembercount>)
- [func Join(rp *rocketpool.RocketPool, opts *bind.TransactOpts) (common.Hash, error)](<#func-join>)
- [func Leave(rp *rocketpool.RocketPool, rplBondRefundAddress common.Address, opts *bind.TransactOpts) (common.Hash, error)](<#func-leave>)
- [func MakeChallenge(rp *rocketpool.RocketPool, memberAddress common.Address, opts *bind.TransactOpts) (common.Hash, error)](<#func-makechallenge>)
- [func ProposeInviteMember(rp *rocketpool.RocketPool, message string, newMemberAddress common.Address, newMemberId, newMemberUrl string, opts *bind.TransactOpts) (uint64, common.Hash, error)](<#func-proposeinvitemember>)
- [func ProposeKickMember(rp *rocketpool.RocketPool, message string, memberAddress common.Address, rplFineAmount *big.Int, opts *bind.TransactOpts) (uint64, common.Hash, error)](<#func-proposekickmember>)
- [func ProposeMemberLeave(rp *rocketpool.RocketPool, message string, memberAddress common.Address, opts *bind.TransactOpts) (uint64, common.Hash, error)](<#func-proposememberleave>)
- [func ProposeReplaceMember(rp *rocketpool.RocketPool, message string, memberAddress, newMemberAddress common.Address, newMemberId, newMemberUrl string, opts *bind.TransactOpts) (uint64, common.Hash, error)](<#func-proposereplacemember>)
- [func ProposeSetBool(rp *rocketpool.RocketPool, message, contractName, settingPath string, value bool, opts *bind.TransactOpts) (uint64, common.Hash, error)](<#func-proposesetbool>)
- [func ProposeSetUint(rp *rocketpool.RocketPool, message, contractName, settingPath string, value *big.Int, opts *bind.TransactOpts) (uint64, common.Hash, error)](<#func-proposesetuint>)
- [func ProposeUpgradeContract(rp *rocketpool.RocketPool, message, upgradeType, contractName, contractAbi string, contractAddress common.Address, opts *bind.TransactOpts) (uint64, common.Hash, error)](<#func-proposeupgradecontract>)
- [func SubmitProposal(rp *rocketpool.RocketPool, message string, payload []byte, opts *bind.TransactOpts) (uint64, common.Hash, error)](<#func-submitproposal>)
- [func VoteOnProposal(rp *rocketpool.RocketPool, proposalId uint64, support bool, opts *bind.TransactOpts) (common.Hash, error)](<#func-voteonproposal>)
- [type MemberDetails](<#type-memberdetails>)
  - [func GetMemberDetails(rp *rocketpool.RocketPool, memberAddress common.Address, opts *bind.CallOpts) (MemberDetails, error)](<#func-getmemberdetails>)
  - [func GetMembers(rp *rocketpool.RocketPool, opts *bind.CallOpts) ([]MemberDetails, error)](<#func-getmembers>)


## Constants

Settings

```go
const (
    MemberAddressBatchSize = 50
    MemberDetailsBatchSize = 20
)
```

## func [BootstrapBool](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/dao.go#L371>)

```go
func BootstrapBool(rp *rocketpool.RocketPool, contractName, settingPath string, value bool, opts *bind.TransactOpts) (common.Hash, error)
```

Bootstrap a bool setting

## func [BootstrapMember](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/dao.go#L420>)

```go
func BootstrapMember(rp *rocketpool.RocketPool, id, url string, nodeAddress common.Address, opts *bind.TransactOpts) (common.Hash, error)
```

Bootstrap a DAO member

## func [BootstrapUint](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/dao.go#L395>)

```go
func BootstrapUint(rp *rocketpool.RocketPool, contractName, settingPath string, value *big.Int, opts *bind.TransactOpts) (common.Hash, error)
```

Bootstrap a uint256 setting

## func [BootstrapUpgrade](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/dao.go#L449>)

```go
func BootstrapUpgrade(rp *rocketpool.RocketPool, upgradeType, contractName, contractAbi string, contractAddress common.Address, opts *bind.TransactOpts) (common.Hash, error)
```

Bootstrap a contract upgrade

## func [CancelProposal](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/proposals.go#L264>)

```go
func CancelProposal(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.TransactOpts) (common.Hash, error)
```

Cancel a submitted proposal

## func [DecideChallenge](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/actions.go#L98>)

```go
func DecideChallenge(rp *rocketpool.RocketPool, memberAddress common.Address, opts *bind.TransactOpts) (common.Hash, error)
```

Decide a challenge against a node

## func [EstimateBootstrapBoolGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/dao.go#L361>)

```go
func EstimateBootstrapBoolGas(rp *rocketpool.RocketPool, contractName, settingPath string, value bool, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of BootstrapBool

## func [EstimateBootstrapMemberGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/dao.go#L409>)

```go
func EstimateBootstrapMemberGas(rp *rocketpool.RocketPool, id, url string, nodeAddress common.Address, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of BootstrapMember

## func [EstimateBootstrapUintGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/dao.go#L385>)

```go
func EstimateBootstrapUintGas(rp *rocketpool.RocketPool, contractName, settingPath string, value *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of BootstrapUint

## func [EstimateBootstrapUpgradeGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/dao.go#L435>)

```go
func EstimateBootstrapUpgradeGas(rp *rocketpool.RocketPool, upgradeType, contractName, contractAbi string, contractAddress common.Address, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of BootstrapUpgrade

## func [EstimateCancelProposalGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/proposals.go#L254>)

```go
func EstimateCancelProposalGas(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of CancelProposal

## func [EstimateDecideChallengeGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/actions.go#L88>)

```go
func EstimateDecideChallengeGas(rp *rocketpool.RocketPool, memberAddress common.Address, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of DecideChallenge

## func [EstimateExecuteProposalGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/proposals.go#L302>)

```go
func EstimateExecuteProposalGas(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of ExecuteProposal

## func [EstimateJoinGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/actions.go#L14>)

```go
func EstimateJoinGas(rp *rocketpool.RocketPool, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of Join

## func [EstimateLeaveGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/actions.go#L39>)

```go
func EstimateLeaveGas(rp *rocketpool.RocketPool, rplBondRefundAddress common.Address, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of Leave

## func [EstimateMakeChallengeGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/actions.go#L64>)

```go
func EstimateMakeChallengeGas(rp *rocketpool.RocketPool, memberAddress common.Address, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of MakeChallenge

## func [EstimateProposalGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/proposals.go#L225>)

```go
func EstimateProposalGas(rp *rocketpool.RocketPool, message string, payload []byte, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of a proposal submission

## func [EstimateProposeInviteMemberGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/proposals.go#L17>)

```go
func EstimateProposeInviteMemberGas(rp *rocketpool.RocketPool, message string, newMemberAddress common.Address, newMemberId, newMemberUrl string, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of ProposeInviteMember

## func [EstimateProposeKickMemberGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/proposals.go#L105>)

```go
func EstimateProposeKickMemberGas(rp *rocketpool.RocketPool, message string, memberAddress common.Address, rplFineAmount *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of ProposeKickMember

## func [EstimateProposeMemberLeaveGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/proposals.go#L47>)

```go
func EstimateProposeMemberLeaveGas(rp *rocketpool.RocketPool, message string, memberAddress common.Address, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of ProposeMemberLeave

## func [EstimateProposeReplaceMemberGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/proposals.go#L75>)

```go
func EstimateProposeReplaceMemberGas(rp *rocketpool.RocketPool, message string, memberAddress, newMemberAddress common.Address, newMemberId, newMemberUrl string, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of ProposeReplaceMember

## func [EstimateProposeSetBoolGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/proposals.go#L133>)

```go
func EstimateProposeSetBoolGas(rp *rocketpool.RocketPool, message, contractName, settingPath string, value bool, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of ProposeSetBool

## func [EstimateProposeSetUintGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/proposals.go#L161>)

```go
func EstimateProposeSetUintGas(rp *rocketpool.RocketPool, message, contractName, settingPath string, value *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of ProposeSetUint

## func [EstimateProposeUpgradeContractGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/proposals.go#L189>)

```go
func EstimateProposeUpgradeContractGas(rp *rocketpool.RocketPool, message, upgradeType, contractName, contractAbi string, contractAddress common.Address, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of ProposeUpgradeContract

## func [EstimateVoteOnProposalGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/proposals.go#L278>)

```go
func EstimateVoteOnProposalGas(rp *rocketpool.RocketPool, proposalId uint64, support bool, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of VoteOnProposal

## func [ExecuteProposal](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/proposals.go#L312>)

```go
func ExecuteProposal(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.TransactOpts) (common.Hash, error)
```

Execute a submitted proposal

## func [GetMemberAddresses](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/dao.go#L78>)

```go
func GetMemberAddresses(rp *rocketpool.RocketPool, opts *bind.CallOpts) ([]common.Address, error)
```

Get all member addresses

## func [GetMemberAt](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/dao.go#L216>)

```go
func GetMemberAt(rp *rocketpool.RocketPool, index uint64, opts *bind.CallOpts) (common.Address, error)
```

Get a member address by index

## func [GetMemberCount](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/dao.go#L202>)

```go
func GetMemberCount(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)
```

Get the member count

## func [GetMemberExists](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/dao.go#L230>)

```go
func GetMemberExists(rp *rocketpool.RocketPool, memberAddress common.Address, opts *bind.CallOpts) (bool, error)
```

Member details

## func [GetMemberID](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/dao.go#L241>)

```go
func GetMemberID(rp *rocketpool.RocketPool, memberAddress common.Address, opts *bind.CallOpts) (string, error)
```

## func [GetMemberInviteProposalExecutedTime](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/dao.go#L310>)

```go
func GetMemberInviteProposalExecutedTime(rp *rocketpool.RocketPool, memberAddress common.Address, opts *bind.CallOpts) (uint64, error)
```

Get the time that a proposal for a member was executed at

## func [GetMemberIsChallenged](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/dao.go#L347>)

```go
func GetMemberIsChallenged(rp *rocketpool.RocketPool, memberAddress common.Address, opts *bind.CallOpts) (bool, error)
```

Get whether a member has an active challenge against them

## func [GetMemberJoinedTime](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/dao.go#L263>)

```go
func GetMemberJoinedTime(rp *rocketpool.RocketPool, memberAddress common.Address, opts *bind.CallOpts) (uint64, error)
```

## func [GetMemberLastProposalTime](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/dao.go#L274>)

```go
func GetMemberLastProposalTime(rp *rocketpool.RocketPool, memberAddress common.Address, opts *bind.CallOpts) (uint64, error)
```

## func [GetMemberLeaveProposalExecutedTime](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/dao.go#L313>)

```go
func GetMemberLeaveProposalExecutedTime(rp *rocketpool.RocketPool, memberAddress common.Address, opts *bind.CallOpts) (uint64, error)
```

## func [GetMemberProposalExecutedTime](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/dao.go#L319>)

```go
func GetMemberProposalExecutedTime(rp *rocketpool.RocketPool, proposalType string, memberAddress common.Address, opts *bind.CallOpts) (uint64, error)
```

## func [GetMemberRPLBondAmount](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/dao.go#L285>)

```go
func GetMemberRPLBondAmount(rp *rocketpool.RocketPool, memberAddress common.Address, opts *bind.CallOpts) (*big.Int, error)
```

## func [GetMemberReplaceProposalExecutedTime](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/dao.go#L316>)

```go
func GetMemberReplaceProposalExecutedTime(rp *rocketpool.RocketPool, memberAddress common.Address, opts *bind.CallOpts) (uint64, error)
```

## func [GetMemberReplacementAddress](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/dao.go#L333>)

```go
func GetMemberReplacementAddress(rp *rocketpool.RocketPool, memberAddress common.Address, opts *bind.CallOpts) (common.Address, error)
```

Get a member's replacement address if being replaced

## func [GetMemberUnbondedValidatorCount](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/dao.go#L296>)

```go
func GetMemberUnbondedValidatorCount(rp *rocketpool.RocketPool, memberAddress common.Address, opts *bind.CallOpts) (uint64, error)
```

## func [GetMemberUrl](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/dao.go#L252>)

```go
func GetMemberUrl(rp *rocketpool.RocketPool, memberAddress common.Address, opts *bind.CallOpts) (string, error)
```

## func [GetMinimumMemberCount](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/dao.go#L188>)

```go
func GetMinimumMemberCount(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)
```

Get the minimum member count

## func [Join](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/actions.go#L25>)

```go
func Join(rp *rocketpool.RocketPool, opts *bind.TransactOpts) (common.Hash, error)
```

Join the trusted node DAO Requires an executed invite proposal

## func [Leave](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/actions.go#L50>)

```go
func Leave(rp *rocketpool.RocketPool, rplBondRefundAddress common.Address, opts *bind.TransactOpts) (common.Hash, error)
```

Leave the trusted node DAO Requires an executed leave proposal

## func [MakeChallenge](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/actions.go#L74>)

```go
func MakeChallenge(rp *rocketpool.RocketPool, memberAddress common.Address, opts *bind.TransactOpts) (common.Hash, error)
```

Make a challenge against a node

## func [ProposeInviteMember](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/proposals.go#L32>)

```go
func ProposeInviteMember(rp *rocketpool.RocketPool, message string, newMemberAddress common.Address, newMemberId, newMemberUrl string, opts *bind.TransactOpts) (uint64, common.Hash, error)
```

Submit a proposal to invite a new member to the trusted node DAO

## func [ProposeKickMember](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/proposals.go#L119>)

```go
func ProposeKickMember(rp *rocketpool.RocketPool, message string, memberAddress common.Address, rplFineAmount *big.Int, opts *bind.TransactOpts) (uint64, common.Hash, error)
```

Submit a proposal to kick a member from the trusted node DAO

## func [ProposeMemberLeave](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/proposals.go#L61>)

```go
func ProposeMemberLeave(rp *rocketpool.RocketPool, message string, memberAddress common.Address, opts *bind.TransactOpts) (uint64, common.Hash, error)
```

Submit a proposal for a member to leave the trusted node DAO

## func [ProposeReplaceMember](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/proposals.go#L90>)

```go
func ProposeReplaceMember(rp *rocketpool.RocketPool, message string, memberAddress, newMemberAddress common.Address, newMemberId, newMemberUrl string, opts *bind.TransactOpts) (uint64, common.Hash, error)
```

Submit a proposal to replace a member in the trusted node DAO

## func [ProposeSetBool](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/proposals.go#L147>)

```go
func ProposeSetBool(rp *rocketpool.RocketPool, message, contractName, settingPath string, value bool, opts *bind.TransactOpts) (uint64, common.Hash, error)
```

Submit a proposal to update a bool trusted node DAO setting

## func [ProposeSetUint](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/proposals.go#L175>)

```go
func ProposeSetUint(rp *rocketpool.RocketPool, message, contractName, settingPath string, value *big.Int, opts *bind.TransactOpts) (uint64, common.Hash, error)
```

Submit a proposal to update a uint trusted node DAO setting

## func [ProposeUpgradeContract](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/proposals.go#L207>)

```go
func ProposeUpgradeContract(rp *rocketpool.RocketPool, message, upgradeType, contractName, contractAbi string, contractAddress common.Address, opts *bind.TransactOpts) (uint64, common.Hash, error)
```

Submit a proposal to upgrade a contract

## func [SubmitProposal](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/proposals.go#L236>)

```go
func SubmitProposal(rp *rocketpool.RocketPool, message string, payload []byte, opts *bind.TransactOpts) (uint64, common.Hash, error)
```

Submit a trusted node DAO proposal Returns the ID of the new proposal

## func [VoteOnProposal](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/proposals.go#L288>)

```go
func VoteOnProposal(rp *rocketpool.RocketPool, proposalId uint64, support bool, opts *bind.TransactOpts) (common.Hash, error)
```

Vote on a submitted proposal

## type [MemberDetails](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/dao.go#L24-L33>)

Proposal details

```go
type MemberDetails struct {
    Address                common.Address `json:"address"`
    Exists                 bool           `json:"exists"`
    ID                     string         `json:"id"`
    Url                    string         `json:"url"`
    JoinedTime             uint64         `json:"joinedTime"`
    LastProposalTime       uint64         `json:"lastProposalTime"`
    RPLBondAmount          *big.Int       `json:"rplBondAmount"`
    UnbondedValidatorCount uint64         `json:"unbondedValidatorCount"`
}
```

### func [GetMemberDetails](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/dao.go#L118>)

```go
func GetMemberDetails(rp *rocketpool.RocketPool, memberAddress common.Address, opts *bind.CallOpts) (MemberDetails, error)
```

Get a member's details

### func [GetMembers](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/trustednode/dao.go#L37>)

```go
func GetMembers(rp *rocketpool.RocketPool, opts *bind.CallOpts) ([]MemberDetails, error)
```

Get all member details

