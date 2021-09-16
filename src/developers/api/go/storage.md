# storage

```go
import "github.com/rocket-pool/rocketpool-go/storage"
```

## Index

- [func ConfirmWithdrawalAddress(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.TransactOpts) (common.Hash, error)](<#func-confirmwithdrawaladdress>)
- [func EstimateConfirmWithdrawalAddressGas(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimateconfirmwithdrawaladdressgas>)
- [func EstimateSetWithdrawalAddressGas(rp *rocketpool.RocketPool, nodeAddress common.Address, withdrawalAddress common.Address, confirm bool, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimatesetwithdrawaladdressgas>)
- [func GetNodePendingWithdrawalAddress(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.CallOpts) (common.Address, error)](<#func-getnodependingwithdrawaladdress>)
- [func GetNodeWithdrawalAddress(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.CallOpts) (common.Address, error)](<#func-getnodewithdrawaladdress>)
- [func SetWithdrawalAddress(rp *rocketpool.RocketPool, nodeAddress common.Address, withdrawalAddress common.Address, confirm bool, opts *bind.TransactOpts) (common.Hash, error)](<#func-setwithdrawaladdress>)


## func [ConfirmWithdrawalAddress](<https://github.com/rocket-pool/rocketpool-go/blob/release/storage/rocket-storage.go#L54>)

```go
func ConfirmWithdrawalAddress(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.TransactOpts) (common.Hash, error)
```

Set a node's withdrawal address

## func [EstimateConfirmWithdrawalAddressGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/storage/rocket-storage.go#L48>)

```go
func EstimateConfirmWithdrawalAddressGas(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of ConfirmWithdrawalAddress

## func [EstimateSetWithdrawalAddressGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/storage/rocket-storage.go#L32>)

```go
func EstimateSetWithdrawalAddressGas(rp *rocketpool.RocketPool, nodeAddress common.Address, withdrawalAddress common.Address, confirm bool, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of SetWithdrawalAddress

## func [GetNodePendingWithdrawalAddress](<https://github.com/rocket-pool/rocketpool-go/blob/release/storage/rocket-storage.go#L22>)

```go
func GetNodePendingWithdrawalAddress(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.CallOpts) (common.Address, error)
```

Get a node's pending withdrawal address

## func [GetNodeWithdrawalAddress](<https://github.com/rocket-pool/rocketpool-go/blob/release/storage/rocket-storage.go#L12>)

```go
func GetNodeWithdrawalAddress(rp *rocketpool.RocketPool, nodeAddress common.Address, opts *bind.CallOpts) (common.Address, error)
```

Get a node's withdrawal address

## func [SetWithdrawalAddress](<https://github.com/rocket-pool/rocketpool-go/blob/release/storage/rocket-storage.go#L38>)

```go
func SetWithdrawalAddress(rp *rocketpool.RocketPool, nodeAddress common.Address, withdrawalAddress common.Address, confirm bool, opts *bind.TransactOpts) (common.Hash, error)
```

Set a node's withdrawal address

