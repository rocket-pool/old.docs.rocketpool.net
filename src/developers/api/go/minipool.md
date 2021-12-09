# minipool

```go
import "github.com/rocket-pool/rocketpool-go/minipool"
```

## Index

- [Constants](<#constants>)
- [func EstimateSubmitMinipoolWithdrawableGas(rp *rocketpool.RocketPool, minipoolAddress common.Address, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimatesubmitminipoolwithdrawablegas>)
- [func GetActiveMinipoolCount(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)](<#func-getactiveminipoolcount>)
- [func GetFinalisedMinipoolCount(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)](<#func-getfinalisedminipoolcount>)
- [func GetMinipoolAddresses(rp *rocketpool.RocketPool, opts *bind.CallOpts) ([]common.Address, error)](<#func-getminipooladdresses>)
- [func GetMinipoolAt(rp *rocketpool.RocketPool, index uint64, opts *bind.CallOpts) (common.Address, error)](<#func-getminipoolat>)
- [func GetMinipoolByPubkey(rp *rocketpool.RocketPool, pubkey rptypes.ValidatorPubkey, opts *bind.CallOpts) (common.Address, error)](<#func-getminipoolbypubkey>)
- [func GetMinipoolCount(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)](<#func-getminipoolcount>)
- [func GetMinipoolExists(rp *rocketpool.RocketPool, minipoolAddress common.Address, opts *bind.CallOpts) (bool, error)](<#func-getminipoolexists>)
- [func GetMinipoolPubkey(rp *rocketpool.RocketPool, minipoolAddress common.Address, opts *bind.CallOpts) (rptypes.ValidatorPubkey, error)](<#func-getminipoolpubkey>)
- [func GetNodeActiveMinipoolCount(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.CallOpts) (uint64, error)](<#func-getnodeactiveminipoolcount>)
- [func GetNodeFinalisedMinipoolCount(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.CallOpts) (uint64, error)](<#func-getnodefinalisedminipoolcount>)
- [func GetNodeMinipoolAddresses(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.CallOpts) ([]common.Address, error)](<#func-getnodeminipooladdresses>)
- [func GetNodeMinipoolAt(rp *rocketpool.RocketPool, nodeAddress common.Address, index uint64, opts *bind.CallOpts) (common.Address, error)](<#func-getnodeminipoolat>)
- [func GetNodeMinipoolCount(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.CallOpts) (uint64, error)](<#func-getnodeminipoolcount>)
- [func GetNodeValidatingMinipoolAt(rp *rocketpool.RocketPool, nodeAddress common.Address, index uint64, opts *bind.CallOpts) (common.Address, error)](<#func-getnodevalidatingminipoolat>)
- [func GetNodeValidatingMinipoolCount(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.CallOpts) (uint64, error)](<#func-getnodevalidatingminipoolcount>)
- [func GetNodeValidatingMinipoolPubkeys(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.CallOpts) ([]rptypes.ValidatorPubkey, error)](<#func-getnodevalidatingminipoolpubkeys>)
- [func GetQueueEffectiveCapacity(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)](<#func-getqueueeffectivecapacity>)
- [func GetQueueLength(rp *rocketpool.RocketPool, depositType rptypes.MinipoolDeposit, opts *bind.CallOpts) (uint64, error)](<#func-getqueuelength>)
- [func GetQueueNextCapacity(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)](<#func-getqueuenextcapacity>)
- [func GetQueueTotalCapacity(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)](<#func-getqueuetotalcapacity>)
- [func GetQueueTotalLength(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)](<#func-getqueuetotallength>)
- [func SubmitMinipoolWithdrawable(rp *rocketpool.RocketPool, minipoolAddress common.Address, opts *bind.TransactOpts) (common.Hash, error)](<#func-submitminipoolwithdrawable>)
- [type Minipool](<#type-minipool>)
  - [func NewMinipool(rp *rocketpool.RocketPool, address common.Address) (*Minipool, error)](<#func-newminipool>)
  - [func (mp *Minipool) CalculateNodeShare(balance *big.Int, opts *bind.CallOpts) (*big.Int, error)](<#func-minipool-calculatenodeshare>)
  - [func (mp *Minipool) CalculateUserShare(balance *big.Int, opts *bind.CallOpts) (*big.Int, error)](<#func-minipool-calculateusershare>)
  - [func (mp *Minipool) Close(opts *bind.TransactOpts) (common.Hash, error)](<#func-minipool-close>)
  - [func (mp *Minipool) DelegateRollback(opts *bind.TransactOpts) (common.Hash, error)](<#func-minipool-delegaterollback>)
  - [func (mp *Minipool) DelegateUpgrade(opts *bind.TransactOpts) (common.Hash, error)](<#func-minipool-delegateupgrade>)
  - [func (mp *Minipool) Dissolve(opts *bind.TransactOpts) (common.Hash, error)](<#func-minipool-dissolve>)
  - [func (mp *Minipool) DistributeBalance(opts *bind.TransactOpts) (common.Hash, error)](<#func-minipool-distributebalance>)
  - [func (mp *Minipool) DistributeBalanceAndFinalise(opts *bind.TransactOpts) (common.Hash, error)](<#func-minipool-distributebalanceandfinalise>)
  - [func (mp *Minipool) EstimateCloseGas(opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-minipool-estimateclosegas>)
  - [func (mp *Minipool) EstimateDelegateRollbackGas(opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-minipool-estimatedelegaterollbackgas>)
  - [func (mp *Minipool) EstimateDelegateUpgradeGas(opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-minipool-estimatedelegateupgradegas>)
  - [func (mp *Minipool) EstimateDissolveGas(opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-minipool-estimatedissolvegas>)
  - [func (mp *Minipool) EstimateDistributeBalanceAndFinaliseGas(opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-minipool-estimatedistributebalanceandfinalisegas>)
  - [func (mp *Minipool) EstimateDistributeBalanceGas(opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-minipool-estimatedistributebalancegas>)
  - [func (mp *Minipool) EstimateFinaliseGas(opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-minipool-estimatefinalisegas>)
  - [func (mp *Minipool) EstimateRefundGas(opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-minipool-estimaterefundgas>)
  - [func (mp *Minipool) EstimateSetUseLatestDelegateGas(setting bool, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-minipool-estimatesetuselatestdelegategas>)
  - [func (mp *Minipool) EstimateStakeGas(validatorPubkey rptypes.ValidatorPubkey, validatorSignature rptypes.ValidatorSignature, depositDataRoot common.Hash, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-minipool-estimatestakegas>)
  - [func (mp *Minipool) Finalise(opts *bind.TransactOpts) (common.Hash, error)](<#func-minipool-finalise>)
  - [func (mp *Minipool) GetDelegate(opts *bind.CallOpts) (common.Address, error)](<#func-minipool-getdelegate>)
  - [func (mp *Minipool) GetDepositType(opts *bind.CallOpts) (rptypes.MinipoolDeposit, error)](<#func-minipool-getdeposittype>)
  - [func (mp *Minipool) GetEffectiveDelegate(opts *bind.CallOpts) (common.Address, error)](<#func-minipool-geteffectivedelegate>)
  - [func (mp *Minipool) GetFinalised(opts *bind.CallOpts) (bool, error)](<#func-minipool-getfinalised>)
  - [func (mp *Minipool) GetNodeAddress(opts *bind.CallOpts) (common.Address, error)](<#func-minipool-getnodeaddress>)
  - [func (mp *Minipool) GetNodeDepositAssigned(opts *bind.CallOpts) (bool, error)](<#func-minipool-getnodedepositassigned>)
  - [func (mp *Minipool) GetNodeDepositBalance(opts *bind.CallOpts) (*big.Int, error)](<#func-minipool-getnodedepositbalance>)
  - [func (mp *Minipool) GetNodeDetails(opts *bind.CallOpts) (NodeDetails, error)](<#func-minipool-getnodedetails>)
  - [func (mp *Minipool) GetNodeFee(opts *bind.CallOpts) (float64, error)](<#func-minipool-getnodefee>)
  - [func (mp *Minipool) GetNodeRefundBalance(opts *bind.CallOpts) (*big.Int, error)](<#func-minipool-getnoderefundbalance>)
  - [func (mp *Minipool) GetPreviousDelegate(opts *bind.CallOpts) (common.Address, error)](<#func-minipool-getpreviousdelegate>)
  - [func (mp *Minipool) GetStatus(opts *bind.CallOpts) (rptypes.MinipoolStatus, error)](<#func-minipool-getstatus>)
  - [func (mp *Minipool) GetStatusBlock(opts *bind.CallOpts) (uint64, error)](<#func-minipool-getstatusblock>)
  - [func (mp *Minipool) GetStatusDetails(opts *bind.CallOpts) (StatusDetails, error)](<#func-minipool-getstatusdetails>)
  - [func (mp *Minipool) GetStatusTime(opts *bind.CallOpts) (time.Time, error)](<#func-minipool-getstatustime>)
  - [func (mp *Minipool) GetUseLatestDelegate(opts *bind.CallOpts) (bool, error)](<#func-minipool-getuselatestdelegate>)
  - [func (mp *Minipool) GetUserDepositAssigned(opts *bind.CallOpts) (bool, error)](<#func-minipool-getuserdepositassigned>)
  - [func (mp *Minipool) GetUserDepositAssignedTime(opts *bind.CallOpts) (time.Time, error)](<#func-minipool-getuserdepositassignedtime>)
  - [func (mp *Minipool) GetUserDepositBalance(opts *bind.CallOpts) (*big.Int, error)](<#func-minipool-getuserdepositbalance>)
  - [func (mp *Minipool) GetUserDetails(opts *bind.CallOpts) (UserDetails, error)](<#func-minipool-getuserdetails>)
  - [func (mp *Minipool) GetWithdrawalCredentials(opts *bind.CallOpts) (common.Hash, error)](<#func-minipool-getwithdrawalcredentials>)
  - [func (mp *Minipool) Refund(opts *bind.TransactOpts) (common.Hash, error)](<#func-minipool-refund>)
  - [func (mp *Minipool) SetUseLatestDelegate(setting bool, opts *bind.TransactOpts) (common.Hash, error)](<#func-minipool-setuselatestdelegate>)
  - [func (mp *Minipool) Stake(validatorPubkey rptypes.ValidatorPubkey, validatorSignature rptypes.ValidatorSignature, depositDataRoot common.Hash, opts *bind.TransactOpts) (common.Hash, error)](<#func-minipool-stake>)
- [type MinipoolCountsPerStatus](<#type-minipoolcountsperstatus>)
  - [func GetMinipoolCountPerStatus(rp *rocketpool.RocketPool, offset, limit uint64, opts *bind.CallOpts) (MinipoolCountsPerStatus, error)](<#func-getminipoolcountperstatus>)
- [type MinipoolDetails](<#type-minipooldetails>)
  - [func GetMinipoolDetails(rp *rocketpool.RocketPool, minipoolAddress common.Address, opts *bind.CallOpts) (MinipoolDetails, error)](<#func-getminipooldetails>)
  - [func GetMinipools(rp *rocketpool.RocketPool, opts *bind.CallOpts) ([]MinipoolDetails, error)](<#func-getminipools>)
  - [func GetNodeMinipools(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.CallOpts) ([]MinipoolDetails, error)](<#func-getnodeminipools>)
- [type NodeDetails](<#type-nodedetails>)
- [type QueueCapacity](<#type-queuecapacity>)
  - [func GetQueueCapacity(rp *rocketpool.RocketPool, opts *bind.CallOpts) (QueueCapacity, error)](<#func-getqueuecapacity>)
- [type QueueLengths](<#type-queuelengths>)
  - [func GetQueueLengths(rp *rocketpool.RocketPool, opts *bind.CallOpts) (QueueLengths, error)](<#func-getqueuelengths>)
- [type StatusDetails](<#type-statusdetails>)
- [type UserDetails](<#type-userdetails>)


## Constants

Settings

```go
const (
    MinipoolAddressBatchSize = 50
    MinipoolDetailsBatchSize = 20
)
```

## func [EstimateSubmitMinipoolWithdrawableGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/status.go#L14>)

```go
func EstimateSubmitMinipoolWithdrawableGas(rp *rocketpool.RocketPool, minipoolAddress common.Address, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of SubmitMinipoolWithdrawable

## func [GetActiveMinipoolCount](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool.go#L287>)

```go
func GetActiveMinipoolCount(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)
```

Get the number of active minipools in the network

## func [GetFinalisedMinipoolCount](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool.go#L273>)

```go
func GetFinalisedMinipoolCount(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)
```

Get the number of finalised minipools in the network

## func [GetMinipoolAddresses](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool.go#L97>)

```go
func GetMinipoolAddresses(rp *rocketpool.RocketPool, opts *bind.CallOpts) ([]common.Address, error)
```

Get all minipool addresses

## func [GetMinipoolAt](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool.go#L315>)

```go
func GetMinipoolAt(rp *rocketpool.RocketPool, index uint64, opts *bind.CallOpts) (common.Address, error)
```

Get a minipool address by index

## func [GetMinipoolByPubkey](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool.go#L413>)

```go
func GetMinipoolByPubkey(rp *rocketpool.RocketPool, pubkey rptypes.ValidatorPubkey, opts *bind.CallOpts) (common.Address, error)
```

Get a minipool address by validator pubkey

## func [GetMinipoolCount](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool.go#L259>)

```go
func GetMinipoolCount(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)
```

Get the minipool count

## func [GetMinipoolExists](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool.go#L427>)

```go
func GetMinipoolExists(rp *rocketpool.RocketPool, minipoolAddress common.Address, opts *bind.CallOpts) (bool, error)
```

Check whether a minipool exists

## func [GetMinipoolPubkey](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool.go#L441>)

```go
func GetMinipoolPubkey(rp *rocketpool.RocketPool, minipoolAddress common.Address, opts *bind.CallOpts) (rptypes.ValidatorPubkey, error)
```

Get a minipool's validator pubkey

## func [GetNodeActiveMinipoolCount](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool.go#L343>)

```go
func GetNodeActiveMinipoolCount(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.CallOpts) (uint64, error)
```

Get the number of minipools owned by a node that are not finalised

## func [GetNodeFinalisedMinipoolCount](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool.go#L357>)

```go
func GetNodeFinalisedMinipoolCount(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.CallOpts) (uint64, error)
```

Get the number of minipools owned by a node that are finalised

## func [GetNodeMinipoolAddresses](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool.go#L137>)

```go
func GetNodeMinipoolAddresses(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.CallOpts) ([]common.Address, error)
```

Get a node's minipool addresses

## func [GetNodeMinipoolAt](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool.go#L371>)

```go
func GetNodeMinipoolAt(rp *rocketpool.RocketPool, nodeAddress common.Address, index uint64, opts *bind.CallOpts) (common.Address, error)
```

Get a node's minipool address by index

## func [GetNodeMinipoolCount](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool.go#L329>)

```go
func GetNodeMinipoolCount(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.CallOpts) (uint64, error)
```

Get a node's minipool count

## func [GetNodeValidatingMinipoolAt](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool.go#L399>)

```go
func GetNodeValidatingMinipoolAt(rp *rocketpool.RocketPool, nodeAddress common.Address, index uint64, opts *bind.CallOpts) (common.Address, error)
```

Get a node's validating minipool address by index

## func [GetNodeValidatingMinipoolCount](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool.go#L385>)

```go
func GetNodeValidatingMinipoolCount(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.CallOpts) (uint64, error)
```

Get a node's validating minipool count

## func [GetNodeValidatingMinipoolPubkeys](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool.go#L177>)

```go
func GetNodeValidatingMinipoolPubkeys(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.CallOpts) ([]rptypes.ValidatorPubkey, error)
```

Get a node's validating minipool pubkeys

## func [GetQueueEffectiveCapacity](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/queue.go#L165>)

```go
func GetQueueEffectiveCapacity(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)
```

Get the total effective capacity of the minipool queue \(used in node demand calculation\)

## func [GetQueueLength](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/queue.go#L137>)

```go
func GetQueueLength(rp *rocketpool.RocketPool, depositType rptypes.MinipoolDeposit, opts *bind.CallOpts) (uint64, error)
```

Get the length of a single minipool queue

## func [GetQueueNextCapacity](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/queue.go#L179>)

```go
func GetQueueNextCapacity(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)
```

Get the capacity of the next minipool in the queue

## func [GetQueueTotalCapacity](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/queue.go#L151>)

```go
func GetQueueTotalCapacity(rp *rocketpool.RocketPool, opts *bind.CallOpts) (*big.Int, error)
```

Get the total capacity of the minipool queue

## func [GetQueueTotalLength](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/queue.go#L123>)

```go
func GetQueueTotalLength(rp *rocketpool.RocketPool, opts *bind.CallOpts) (uint64, error)
```

Get the total length of the minipool queue

## func [SubmitMinipoolWithdrawable](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/status.go#L24>)

```go
func SubmitMinipoolWithdrawable(rp *rocketpool.RocketPool, minipoolAddress common.Address, opts *bind.TransactOpts) (common.Hash, error)
```

Submit a minipool withdrawable event

## type [Minipool](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L39-L43>)

Minipool contract

```go
type Minipool struct {
    Address    common.Address
    Contract   *rocketpool.Contract
    RocketPool *rocketpool.RocketPool
}
```

### func [NewMinipool](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L47>)

```go
func NewMinipool(rp *rocketpool.RocketPool, address common.Address) (*Minipool, error)
```

Create new minipool contract

### func \(\*Minipool\) [CalculateNodeShare](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L513>)

```go
func (mp *Minipool) CalculateNodeShare(balance *big.Int, opts *bind.CallOpts) (*big.Int, error)
```

Given a validator balance\, calculates how much belongs to the node taking into consideration rewards and penalties

### func \(\*Minipool\) [CalculateUserShare](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L522>)

```go
func (mp *Minipool) CalculateUserShare(balance *big.Int, opts *bind.CallOpts) (*big.Int, error)
```

Given a validator balance\, calculates how much belongs to rETH users taking into consideration rewards and penalties

### func \(\*Minipool\) [Close](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L399>)

```go
func (mp *Minipool) Close(opts *bind.TransactOpts) (common.Hash, error)
```

Withdraw node balances from the dissolved minipool and close it

### func \(\*Minipool\) [DelegateRollback](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L447>)

```go
func (mp *Minipool) DelegateRollback(opts *bind.TransactOpts) (common.Hash, error)
```

Rollback to previous delegate contract

### func \(\*Minipool\) [DelegateUpgrade](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L431>)

```go
func (mp *Minipool) DelegateUpgrade(opts *bind.TransactOpts) (common.Hash, error)
```

Upgrade this minipool to the latest network delegate contract

### func \(\*Minipool\) [Dissolve](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L383>)

```go
func (mp *Minipool) Dissolve(opts *bind.TransactOpts) (common.Hash, error)
```

Dissolve the initialized or prelaunch minipool

### func \(\*Minipool\) [DistributeBalance](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L331>)

```go
func (mp *Minipool) DistributeBalance(opts *bind.TransactOpts) (common.Hash, error)
```

Distribute the minipool's ETH balance to the node operator and rETH staking pool\. \!\!\! WARNING \!\!\! DO NOT CALL THIS until the minipool's validator has exited from the Beacon Chain and the balance has been deposited into the minipool\!

### func \(\*Minipool\) [DistributeBalanceAndFinalise](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L351>)

```go
func (mp *Minipool) DistributeBalanceAndFinalise(opts *bind.TransactOpts) (common.Hash, error)
```

Distribute the minipool's ETH balance to the node operator and rETH staking pool\, then finalises the minipool \!\!\! WARNING \!\!\! DO NOT CALL THIS until the minipool's validator has exited from the Beacon Chain and the balance has been deposited into the minipool\!

### func \(\*Minipool\) [EstimateCloseGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L393>)

```go
func (mp *Minipool) EstimateCloseGas(opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of Close

### func \(\*Minipool\) [EstimateDelegateRollbackGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L441>)

```go
func (mp *Minipool) EstimateDelegateRollbackGas(opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of DelegateRollback

### func \(\*Minipool\) [EstimateDelegateUpgradeGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L425>)

```go
func (mp *Minipool) EstimateDelegateUpgradeGas(opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of DelegateUpgrade

### func \(\*Minipool\) [EstimateDissolveGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L377>)

```go
func (mp *Minipool) EstimateDissolveGas(opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of Dissolve

### func \(\*Minipool\) [EstimateDistributeBalanceAndFinaliseGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L341>)

```go
func (mp *Minipool) EstimateDistributeBalanceAndFinaliseGas(opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of DistributeBalanceAndFinalise

### func \(\*Minipool\) [EstimateDistributeBalanceGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L322>)

```go
func (mp *Minipool) EstimateDistributeBalanceGas(opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of DistributeBalance

### func \(\*Minipool\) [EstimateFinaliseGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L409>)

```go
func (mp *Minipool) EstimateFinaliseGas(opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of Finalise

### func \(\*Minipool\) [EstimateRefundGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L306>)

```go
func (mp *Minipool) EstimateRefundGas(opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of Refund

### func \(\*Minipool\) [EstimateSetUseLatestDelegateGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L457>)

```go
func (mp *Minipool) EstimateSetUseLatestDelegateGas(setting bool, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of SetUseLatestDelegate

### func \(\*Minipool\) [EstimateStakeGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L361>)

```go
func (mp *Minipool) EstimateStakeGas(validatorPubkey rptypes.ValidatorPubkey, validatorSignature rptypes.ValidatorSignature, depositDataRoot common.Hash, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of Stake

### func \(\*Minipool\) [Finalise](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L415>)

```go
func (mp *Minipool) Finalise(opts *bind.TransactOpts) (common.Hash, error)
```

Finalise a minipool to get the RPL stake back

### func \(\*Minipool\) [GetDelegate](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L483>)

```go
func (mp *Minipool) GetDelegate(opts *bind.CallOpts) (common.Address, error)
```

Returns the address of the minipool's stored delegate

### func \(\*Minipool\) [GetDepositType](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L134>)

```go
func (mp *Minipool) GetDepositType(opts *bind.CallOpts) (rptypes.MinipoolDeposit, error)
```

Get deposit type

### func \(\*Minipool\) [GetEffectiveDelegate](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L503>)

```go
func (mp *Minipool) GetEffectiveDelegate(opts *bind.CallOpts) (common.Address, error)
```

Returns the delegate which will be used when calling this minipool taking into account useLatestDelegate setting

### func \(\*Minipool\) [GetFinalised](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L124>)

```go
func (mp *Minipool) GetFinalised(opts *bind.CallOpts) (bool, error)
```

### func \(\*Minipool\) [GetNodeAddress](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L196>)

```go
func (mp *Minipool) GetNodeAddress(opts *bind.CallOpts) (common.Address, error)
```

### func \(\*Minipool\) [GetNodeDepositAssigned](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L224>)

```go
func (mp *Minipool) GetNodeDepositAssigned(opts *bind.CallOpts) (bool, error)
```

### func \(\*Minipool\) [GetNodeDepositBalance](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L210>)

```go
func (mp *Minipool) GetNodeDepositBalance(opts *bind.CallOpts) (*big.Int, error)
```

### func \(\*Minipool\) [GetNodeDetails](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L144>)

```go
func (mp *Minipool) GetNodeDetails(opts *bind.CallOpts) (NodeDetails, error)
```

Get node details

### func \(\*Minipool\) [GetNodeFee](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L203>)

```go
func (mp *Minipool) GetNodeFee(opts *bind.CallOpts) (float64, error)
```

### func \(\*Minipool\) [GetNodeRefundBalance](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L217>)

```go
func (mp *Minipool) GetNodeRefundBalance(opts *bind.CallOpts) (*big.Int, error)
```

### func \(\*Minipool\) [GetPreviousDelegate](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L493>)

```go
func (mp *Minipool) GetPreviousDelegate(opts *bind.CallOpts) (common.Address, error)
```

Returns the address of the minipool's previous delegate \(or address\(0\) if not set\)

### func \(\*Minipool\) [GetStatus](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L103>)

```go
func (mp *Minipool) GetStatus(opts *bind.CallOpts) (rptypes.MinipoolStatus, error)
```

### func \(\*Minipool\) [GetStatusBlock](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L110>)

```go
func (mp *Minipool) GetStatusBlock(opts *bind.CallOpts) (uint64, error)
```

### func \(\*Minipool\) [GetStatusDetails](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L65>)

```go
func (mp *Minipool) GetStatusDetails(opts *bind.CallOpts) (StatusDetails, error)
```

Get status details

### func \(\*Minipool\) [GetStatusTime](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L117>)

```go
func (mp *Minipool) GetStatusTime(opts *bind.CallOpts) (time.Time, error)
```

### func \(\*Minipool\) [GetUseLatestDelegate](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L473>)

```go
func (mp *Minipool) GetUseLatestDelegate(opts *bind.CallOpts) (bool, error)
```

Getter for useLatestDelegate setting

### func \(\*Minipool\) [GetUserDepositAssigned](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L279>)

```go
func (mp *Minipool) GetUserDepositAssigned(opts *bind.CallOpts) (bool, error)
```

### func \(\*Minipool\) [GetUserDepositAssignedTime](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L286>)

```go
func (mp *Minipool) GetUserDepositAssignedTime(opts *bind.CallOpts) (time.Time, error)
```

### func \(\*Minipool\) [GetUserDepositBalance](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L272>)

```go
func (mp *Minipool) GetUserDepositBalance(opts *bind.CallOpts) (*big.Int, error)
```

### func \(\*Minipool\) [GetUserDetails](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L234>)

```go
func (mp *Minipool) GetUserDetails(opts *bind.CallOpts) (UserDetails, error)
```

Get user deposit details

### func \(\*Minipool\) [GetWithdrawalCredentials](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L296>)

```go
func (mp *Minipool) GetWithdrawalCredentials(opts *bind.CallOpts) (common.Hash, error)
```

Get withdrawal credentials

### func \(\*Minipool\) [Refund](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L312>)

```go
func (mp *Minipool) Refund(opts *bind.TransactOpts) (common.Hash, error)
```

Refund node ETH from the minipool

### func \(\*Minipool\) [SetUseLatestDelegate](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L463>)

```go
func (mp *Minipool) SetUseLatestDelegate(setting bool, opts *bind.TransactOpts) (common.Hash, error)
```

If set to true\, will automatically use the latest delegate contract

### func \(\*Minipool\) [Stake](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L367>)

```go
func (mp *Minipool) Stake(validatorPubkey rptypes.ValidatorPubkey, validatorSignature rptypes.ValidatorSignature, depositDataRoot common.Hash, opts *bind.TransactOpts) (common.Hash, error)
```

Progress the prelaunch minipool to staking

## type [MinipoolCountsPerStatus](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool.go#L32-L38>)

The counts of minipools per status

```go
type MinipoolCountsPerStatus struct {
    Initialized  *big.Int `abi:"initializedCount"`
    Prelaunch    *big.Int `abi:"prelaunchCount"`
    Staking      *big.Int `abi:"stakingCount"`
    Withdrawable *big.Int `abi:"withdrawableCount"`
    Dissolved    *big.Int `abi:"dissolvedCount"`
}
```

### func [GetMinipoolCountPerStatus](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool.go#L301>)

```go
func GetMinipoolCountPerStatus(rp *rocketpool.RocketPool, offset, limit uint64, opts *bind.CallOpts) (MinipoolCountsPerStatus, error)
```

Get the minipool count by status

## type [MinipoolDetails](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool.go#L24-L28>)

Minipool details

```go
type MinipoolDetails struct {
    Address common.Address          `json:"address"`
    Exists  bool                    `json:"exists"`
    Pubkey  rptypes.ValidatorPubkey `json:"pubkey"`
}
```

### func [GetMinipoolDetails](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool.go#L224>)

```go
func GetMinipoolDetails(rp *rocketpool.RocketPool, minipoolAddress common.Address, opts *bind.CallOpts) (MinipoolDetails, error)
```

Get a minipool's details

### func [GetMinipools](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool.go#L42>)

```go
func GetMinipools(rp *rocketpool.RocketPool, opts *bind.CallOpts) ([]MinipoolDetails, error)
```

Get all minipool details

### func [GetNodeMinipools](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool.go#L52>)

```go
func GetNodeMinipools(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.CallOpts) ([]MinipoolDetails, error)
```

Get a node's minipool details

## type [NodeDetails](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L24-L30>)

```go
type NodeDetails struct {
    Address         common.Address `json:"address"`
    Fee             float64        `json:"fee"`
    DepositBalance  *big.Int       `json:"depositBalance"`
    RefundBalance   *big.Int       `json:"refundBalance"`
    DepositAssigned bool           `json:"depositAssigned"`
}
```

## type [QueueCapacity](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/queue.go#L26-L30>)

Minipool queue capacity

```go
type QueueCapacity struct {
    Total        *big.Int
    Effective    *big.Int
    NextMinipool *big.Int
}
```

### func [GetQueueCapacity](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/queue.go#L82>)

```go
func GetQueueCapacity(rp *rocketpool.RocketPool, opts *bind.CallOpts) (QueueCapacity, error)
```

Get minipool queue capacity

## type [QueueLengths](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/queue.go#L17-L22>)

Minipool queue lengths

```go
type QueueLengths struct {
    Total        uint64
    FullDeposit  uint64
    HalfDeposit  uint64
    EmptyDeposit uint64
}
```

### func [GetQueueLengths](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/queue.go#L34>)

```go
func GetQueueLengths(rp *rocketpool.RocketPool, opts *bind.CallOpts) (QueueLengths, error)
```

Get minipool queue lengths

## type [StatusDetails](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L19-L23>)

Minipool detail types

```go
type StatusDetails struct {
    Status      rptypes.MinipoolStatus `json:"status"`
    StatusBlock uint64                 `json:"statusBlock"`
    StatusTime  time.Time              `json:"statusTime"`
}
```

## type [UserDetails](<https://github.com/rocket-pool/rocketpool-go/blob/release/minipool/minipool-contract.go#L31-L35>)

```go
type UserDetails struct {
    DepositBalance      *big.Int  `json:"depositBalance"`
    DepositAssigned     bool      `json:"depositAssigned"`
    DepositAssignedTime time.Time `json:"depositAssignedTime"`
}
```

