# dao

```go
import "github.com/rocket-pool/rocketpool-go/dao"
```

## Index

- [Constants](<#constants>)
- [func GetDAOProposalIDs(rp *rocketpool.RocketPool, daoName string, opts *bind.CallOpts) ([]uint64, error)](<#func-getdaoproposalids>)
- [func GetProposalCount(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)](<#func-getproposalcount>)
- [func GetProposalCreatedTime(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.CallOpts) (uint64, error)](<#func-getproposalcreatedtime>)
- [func GetProposalDAO(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.CallOpts) (string, error)](<#func-getproposaldao>)
- [func GetProposalEndTime(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.CallOpts) (uint64, error)](<#func-getproposalendtime>)
- [func GetProposalExpiryTime(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.CallOpts) (uint64, error)](<#func-getproposalexpirytime>)
- [func GetProposalIsCancelled(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.CallOpts) (bool, error)](<#func-getproposaliscancelled>)
- [func GetProposalIsExecuted(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.CallOpts) (bool, error)](<#func-getproposalisexecuted>)
- [func GetProposalMemberSupported(rp *rocketpool.RocketPool, proposalId uint64, memberAddress common.Address, opts *bind.CallOpts) (bool, error)](<#func-getproposalmembersupported>)
- [func GetProposalMemberVoted(rp *rocketpool.RocketPool, proposalId uint64, memberAddress common.Address, opts *bind.CallOpts) (bool, error)](<#func-getproposalmembervoted>)
- [func GetProposalMessage(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.CallOpts) (string, error)](<#func-getproposalmessage>)
- [func GetProposalPayload(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.CallOpts) ([]byte, error)](<#func-getproposalpayload>)
- [func GetProposalPayloadStr(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.CallOpts) (string, error)](<#func-getproposalpayloadstr>)
- [func GetProposalPayloadString(rp *rocketpool.RocketPool, daoName string, payload []byte) (string, error)](<#func-getproposalpayloadstring>)
- [func GetProposalProposerAddress(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.CallOpts) (common.Address, error)](<#func-getproposalproposeraddress>)
- [func GetProposalStartTime(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.CallOpts) (uint64, error)](<#func-getproposalstarttime>)
- [func GetProposalState(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.CallOpts) (rptypes.ProposalState, error)](<#func-getproposalstate>)
- [func GetProposalVotesAgainst(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.CallOpts) (float64, error)](<#func-getproposalvotesagainst>)
- [func GetProposalVotesFor(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.CallOpts) (float64, error)](<#func-getproposalvotesfor>)
- [func GetProposalVotesRequired(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.CallOpts) (float64, error)](<#func-getproposalvotesrequired>)
- [type ProposalDetails](<#type-proposaldetails>)
  - [func GetDAOProposals(rp *rocketpool.RocketPool, daoName string, opts *bind.CallOpts) ([]ProposalDetails, error)](<#func-getdaoproposals>)
  - [func GetDAOProposalsWithMember(rp *rocketpool.RocketPool, daoName string, memberAddress common.Address, opts *bind.CallOpts) ([]ProposalDetails, error)](<#func-getdaoproposalswithmember>)
  - [func GetProposalDetails(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.CallOpts) (ProposalDetails, error)](<#func-getproposaldetails>)
  - [func GetProposalDetailsWithMember(rp *rocketpool.RocketPool, proposalId uint64, memberAddress common.Address, opts *bind.CallOpts) (ProposalDetails, error)](<#func-getproposaldetailswithmember>)
  - [func GetProposals(rp *rocketpool.RocketPool, opts *bind.CallOpts) ([]ProposalDetails, error)](<#func-getproposals>)
  - [func GetProposalsWithMember(rp *rocketpool.RocketPool, memberAddress common.Address, opts *bind.CallOpts) ([]ProposalDetails, error)](<#func-getproposalswithmember>)


## Constants

Settings

```go
const (
    ProposalDAONamesBatchSize = 50
    ProposalDetailsBatchSize  = 10
)
```

## func [GetDAOProposalIDs](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/proposals.go#L210>)

```go
func GetDAOProposalIDs(rp *rocketpool.RocketPool, daoName string, opts *bind.CallOpts) ([]uint64, error)
```

Get the IDs of proposals filtered by a DAO

## func [GetProposalCount](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/proposals.go#L421>)

```go
func GetProposalCount(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)
```

Get the proposal count

## func [GetProposalCreatedTime](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/proposals.go#L468>)

```go
func GetProposalCreatedTime(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.CallOpts) (uint64, error)
```

## func [GetProposalDAO](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/proposals.go#L435>)

```go
func GetProposalDAO(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.CallOpts) (string, error)
```

Proposal details

## func [GetProposalEndTime](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/proposals.go#L490>)

```go
func GetProposalEndTime(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.CallOpts) (uint64, error)
```

## func [GetProposalExpiryTime](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/proposals.go#L501>)

```go
func GetProposalExpiryTime(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.CallOpts) (uint64, error)
```

## func [GetProposalIsCancelled](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/proposals.go#L545>)

```go
func GetProposalIsCancelled(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.CallOpts) (bool, error)
```

## func [GetProposalIsExecuted](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/proposals.go#L556>)

```go
func GetProposalIsExecuted(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.CallOpts) (bool, error)
```

## func [GetProposalMemberSupported](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/proposals.go#L621>)

```go
func GetProposalMemberSupported(rp *rocketpool.RocketPool, proposalId uint64, memberAddress common.Address, opts *bind.CallOpts) (bool, error)
```

Get whether a member has voted in support of a proposal

## func [GetProposalMemberVoted](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/proposals.go#L607>)

```go
func GetProposalMemberVoted(rp *rocketpool.RocketPool, proposalId uint64, memberAddress common.Address, opts *bind.CallOpts) (bool, error)
```

Get whether a member has voted on a proposal

## func [GetProposalMessage](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/proposals.go#L457>)

```go
func GetProposalMessage(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.CallOpts) (string, error)
```

## func [GetProposalPayload](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/proposals.go#L567>)

```go
func GetProposalPayload(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.CallOpts) ([]byte, error)
```

## func [GetProposalPayloadStr](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/proposals.go#L578>)

```go
func GetProposalPayloadStr(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.CallOpts) (string, error)
```

## func [GetProposalPayloadString](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/proposal-payload.go#L19>)

```go
func GetProposalPayloadString(rp *rocketpool.RocketPool, daoName string, payload []byte) (string, error)
```

## func [GetProposalProposerAddress](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/proposals.go#L446>)

```go
func GetProposalProposerAddress(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.CallOpts) (common.Address, error)
```

## func [GetProposalStartTime](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/proposals.go#L479>)

```go
func GetProposalStartTime(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.CallOpts) (uint64, error)
```

## func [GetProposalState](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/proposals.go#L593>)

```go
func GetProposalState(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.CallOpts) (rptypes.ProposalState, error)
```

## func [GetProposalVotesAgainst](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/proposals.go#L534>)

```go
func GetProposalVotesAgainst(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.CallOpts) (float64, error)
```

## func [GetProposalVotesFor](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/proposals.go#L523>)

```go
func GetProposalVotesFor(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.CallOpts) (float64, error)
```

## func [GetProposalVotesRequired](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/proposals.go#L512>)

```go
func GetProposalVotesRequired(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.CallOpts) (float64, error)
```

## type [ProposalDetails](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/proposals.go#L27-L46>)

Proposal details

```go
type ProposalDetails struct {
    ID              uint64                `json:"id"`
    DAO             string                `json:"dao"`
    ProposerAddress common.Address        `json:"proposerAddress"`
    Message         string                `json:"message"`
    CreatedTime     uint64                `json:"createdTime"`
    StartTime       uint64                `json:"startTime"`
    EndTime         uint64                `json:"endTime"`
    ExpiryTime      uint64                `json:"expiryTime"`
    VotesRequired   float64               `json:"votesRequired"`
    VotesFor        float64               `json:"votesFor"`
    VotesAgainst    float64               `json:"votesAgainst"`
    MemberVoted     bool                  `json:"memberVoted"`
    MemberSupported bool                  `json:"memberSupported"`
    IsCancelled     bool                  `json:"isCancelled"`
    IsExecuted      bool                  `json:"isExecuted"`
    Payload         []byte                `json:"payload"`
    PayloadStr      string                `json:"payloadStr"`
    State           rptypes.ProposalState `json:"state"`
}
```

### func [GetDAOProposals](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/proposals.go#L130>)

```go
func GetDAOProposals(rp *rocketpool.RocketPool, daoName string, opts *bind.CallOpts) ([]ProposalDetails, error)
```

Get DAO proposal details

### func [GetDAOProposalsWithMember](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/proposals.go#L170>)

```go
func GetDAOProposalsWithMember(rp *rocketpool.RocketPool, daoName string, memberAddress common.Address, opts *bind.CallOpts) ([]ProposalDetails, error)
```

Get DAO proposal details with member data

### func [GetProposalDetails](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/proposals.go#L256>)

```go
func GetProposalDetails(rp *rocketpool.RocketPool, proposalId uint64, opts *bind.CallOpts) (ProposalDetails, error)
```

Get a proposal's details

### func [GetProposalDetailsWithMember](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/proposals.go#L382>)

```go
func GetProposalDetailsWithMember(rp *rocketpool.RocketPool, proposalId uint64, memberAddress common.Address, opts *bind.CallOpts) (ProposalDetails, error)
```

Get a proposal's details with member data

### func [GetProposals](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/proposals.go#L50>)

```go
func GetProposals(rp *rocketpool.RocketPool, opts *bind.CallOpts) ([]ProposalDetails, error)
```

Get all proposal details

### func [GetProposalsWithMember](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/proposals.go#L90>)

```go
func GetProposalsWithMember(rp *rocketpool.RocketPool, memberAddress common.Address, opts *bind.CallOpts) ([]ProposalDetails, error)
```

Get all proposal details with member data

