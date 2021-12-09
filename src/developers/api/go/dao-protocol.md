# protocol

```go
import "github.com/rocket-pool/rocketpool-go/dao/protocol"
```

## Index

- [func BootstrapAddress(rp *rocketpool.RocketPool, contractName, settingPath string, value common.Address, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapaddress>)
- [func BootstrapBool(rp *rocketpool.RocketPool, contractName, settingPath string, value bool, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapbool>)
- [func BootstrapClaimer(rp *rocketpool.RocketPool, contractName string, amount float64, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapclaimer>)
- [func BootstrapUint(rp *rocketpool.RocketPool, contractName, settingPath string, value *big.Int, opts *bind.TransactOpts) (common.Hash, error)](<#func-bootstrapuint>)
- [func EstimateBootstrapAddressGas(rp *rocketpool.RocketPool, contractName, settingPath string, value common.Address, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimatebootstrapaddressgas>)
- [func EstimateBootstrapBoolGas(rp *rocketpool.RocketPool, contractName, settingPath string, value bool, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimatebootstrapboolgas>)
- [func EstimateBootstrapClaimerGas(rp *rocketpool.RocketPool, contractName string, amount float64, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimatebootstrapclaimergas>)
- [func EstimateBootstrapUintGas(rp *rocketpool.RocketPool, contractName, settingPath string, value *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimatebootstrapuintgas>)


## func [BootstrapAddress](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/protocol/dao.go#L74>)

```go
func BootstrapAddress(rp *rocketpool.RocketPool, contractName, settingPath string, value common.Address, opts *bind.TransactOpts) (common.Hash, error)
```

Bootstrap an address setting

## func [BootstrapBool](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/protocol/dao.go#L26>)

```go
func BootstrapBool(rp *rocketpool.RocketPool, contractName, settingPath string, value bool, opts *bind.TransactOpts) (common.Hash, error)
```

Bootstrap a bool setting

## func [BootstrapClaimer](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/protocol/dao.go#L98>)

```go
func BootstrapClaimer(rp *rocketpool.RocketPool, contractName string, amount float64, opts *bind.TransactOpts) (common.Hash, error)
```

Bootstrap a rewards claimer

## func [BootstrapUint](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/protocol/dao.go#L50>)

```go
func BootstrapUint(rp *rocketpool.RocketPool, contractName, settingPath string, value *big.Int, opts *bind.TransactOpts) (common.Hash, error)
```

Bootstrap a uint256 setting

## func [EstimateBootstrapAddressGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/protocol/dao.go#L64>)

```go
func EstimateBootstrapAddressGas(rp *rocketpool.RocketPool, contractName, settingPath string, value common.Address, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of BootstrapAddress

## func [EstimateBootstrapBoolGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/protocol/dao.go#L16>)

```go
func EstimateBootstrapBoolGas(rp *rocketpool.RocketPool, contractName, settingPath string, value bool, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of BootstrapBool

## func [EstimateBootstrapClaimerGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/protocol/dao.go#L88>)

```go
func EstimateBootstrapClaimerGas(rp *rocketpool.RocketPool, contractName string, amount float64, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of BootstrapClaimer

## func [EstimateBootstrapUintGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/dao/protocol/dao.go#L40>)

```go
func EstimateBootstrapUintGas(rp *rocketpool.RocketPool, contractName, settingPath string, value *big.Int, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of BootstrapUint

