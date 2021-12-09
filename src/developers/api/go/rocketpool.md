# rocketpool

```go
import "github.com/rocket-pool/rocketpool-go/rocketpool"
```

## Index

- [Constants](<#constants>)
- [func DecodeAbi(abiEncoded string) (*abi.ABI, error)](<#func-decodeabi>)
- [func EncodeAbiStr(abiStr string) (string, error)](<#func-encodeabistr>)
- [type Contract](<#type-contract>)
  - [func (c *Contract) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error](<#func-contract-call>)
  - [func (c *Contract) GetTransactionEvents(txReceipt *types.Receipt, eventName string, eventPrototype interface{}) ([]interface{}, error)](<#func-contract-gettransactionevents>)
  - [func (c *Contract) GetTransactionGasInfo(opts *bind.TransactOpts, method string, params ...interface{}) (GasInfo, error)](<#func-contract-gettransactiongasinfo>)
  - [func (c *Contract) GetTransferGasInfo(opts *bind.TransactOpts) (GasInfo, error)](<#func-contract-gettransfergasinfo>)
  - [func (c *Contract) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (common.Hash, error)](<#func-contract-transact>)
  - [func (c *Contract) Transfer(opts *bind.TransactOpts) (common.Hash, error)](<#func-contract-transfer>)
- [type GasInfo](<#type-gasinfo>)
- [type RocketPool](<#type-rocketpool>)
  - [func NewRocketPool(client *ethclient.Client, rocketStorageAddress common.Address) (*RocketPool, error)](<#func-newrocketpool>)
  - [func (rp *RocketPool) GetABI(contractName string) (*abi.ABI, error)](<#func-rocketpool-getabi>)
  - [func (rp *RocketPool) GetABIs(contractNames ...string) ([]*abi.ABI, error)](<#func-rocketpool-getabis>)
  - [func (rp *RocketPool) GetAddress(contractName string) (*common.Address, error)](<#func-rocketpool-getaddress>)
  - [func (rp *RocketPool) GetAddresses(contractNames ...string) ([]*common.Address, error)](<#func-rocketpool-getaddresses>)
  - [func (rp *RocketPool) GetContract(contractName string) (*Contract, error)](<#func-rocketpool-getcontract>)
  - [func (rp *RocketPool) GetContracts(contractNames ...string) ([]*Contract, error)](<#func-rocketpool-getcontracts>)
  - [func (rp *RocketPool) MakeContract(contractName string, address common.Address) (*Contract, error)](<#func-rocketpool-makecontract>)


## Constants

Transaction settings

```go
const (
    GasLimitMultiplier float64 = 1.5
    MaxGasLimit                = 12000000
)
```

Cache settings

```go
const CacheTTL = 300 // 5 minutes
```

## func [DecodeAbi](<https://github.com/rocket-pool/rocketpool-go/blob/release/rocketpool/abi.go#L13>)

```go
func DecodeAbi(abiEncoded string) (*abi.ABI, error)
```

Decode\, decompress and parse a zlib\-compressed\, base64\-encoded ABI

## func [EncodeAbiStr](<https://github.com/rocket-pool/rocketpool-go/blob/release/rocketpool/abi.go#L44>)

```go
func EncodeAbiStr(abiStr string) (string, error)
```

zlib\-compress and base64\-encode an ABI JSON string

## type [Contract](<https://github.com/rocket-pool/rocketpool-go/blob/release/rocketpool/contract.go#L27-L32>)

Contract type wraps go\-ethereum bound contract

```go
type Contract struct {
    Contract *bind.BoundContract
    Address  *common.Address
    ABI      *abi.ABI
    Client   *ethclient.Client
}
```

### func \(\*Contract\) [Call](<https://github.com/rocket-pool/rocketpool-go/blob/release/rocketpool/contract.go#L46>)

```go
func (c *Contract) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error
```

Call a contract method

### func \(\*Contract\) [GetTransactionEvents](<https://github.com/rocket-pool/rocketpool-go/blob/release/rocketpool/contract.go#L212>)

```go
func (c *Contract) GetTransactionEvents(txReceipt *types.Receipt, eventName string, eventPrototype interface{}) ([]interface{}, error)
```

Get contract events from a transaction eventPrototype must be an event struct type Returns a slice of untyped values; assert returned events to event struct type

### func \(\*Contract\) [GetTransactionGasInfo](<https://github.com/rocket-pool/rocketpool-go/blob/release/rocketpool/contract.go#L54>)

```go
func (c *Contract) GetTransactionGasInfo(opts *bind.TransactOpts, method string, params ...interface{}) (GasInfo, error)
```

Get Gas Price and Gas Limit for transaction

### func \(\*Contract\) [GetTransferGasInfo](<https://github.com/rocket-pool/rocketpool-go/blob/release/rocketpool/contract.go#L115>)

```go
func (c *Contract) GetTransferGasInfo(opts *bind.TransactOpts) (GasInfo, error)
```

Get gas price and gas limit for a transfer call

### func \(\*Contract\) [Transact](<https://github.com/rocket-pool/rocketpool-go/blob/release/rocketpool/contract.go#L88>)

```go
func (c *Contract) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (common.Hash, error)
```

Transact on a contract method and wait for a receipt

### func \(\*Contract\) [Transfer](<https://github.com/rocket-pool/rocketpool-go/blob/release/rocketpool/contract.go#L143>)

```go
func (c *Contract) Transfer(opts *bind.TransactOpts) (common.Hash, error)
```

Transfer ETH to a contract and wait for a receipt

## type [GasInfo](<https://github.com/rocket-pool/rocketpool-go/blob/release/rocketpool/contract.go#L36-L42>)

Response for gas prices and limits from network and from user request

```go
type GasInfo struct {
    EstGasPrice  *big.Int `json:"estGasPrice"`
    EstGasLimit  uint64   `json:"estGasLimit"`
    SafeGasLimit uint64   `json:"safeGasLimit"`
    ReqGasPrice  *big.Int `json:"reqGasPrice"`
    ReqGasLimit  uint64   `json:"reqGasLimit"`
}
```

## type [RocketPool](<https://github.com/rocket-pool/rocketpool-go/blob/release/rocketpool/rocketpool.go#L39-L49>)

Rocket Pool contract manager

```go
type RocketPool struct {
    Client                *ethclient.Client
    RocketStorage         *contracts.RocketStorage
    RocketStorageContract *Contract
    // contains filtered or unexported fields
}
```

### func [NewRocketPool](<https://github.com/rocket-pool/rocketpool-go/blob/release/rocketpool/rocketpool.go#L53>)

```go
func NewRocketPool(client *ethclient.Client, rocketStorageAddress common.Address) (*RocketPool, error)
```

Create new contract manager

### func \(\*RocketPool\) [GetABI](<https://github.com/rocket-pool/rocketpool-go/blob/release/rocketpool/rocketpool.go#L142>)

```go
func (rp *RocketPool) GetABI(contractName string) (*abi.ABI, error)
```

Load Rocket Pool contract ABIs

### func \(\*RocketPool\) [GetABIs](<https://github.com/rocket-pool/rocketpool-go/blob/release/rocketpool/rocketpool.go#L175>)

```go
func (rp *RocketPool) GetABIs(contractNames ...string) ([]*abi.ABI, error)
```

### func \(\*RocketPool\) [GetAddress](<https://github.com/rocket-pool/rocketpool-go/blob/release/rocketpool/rocketpool.go#L87>)

```go
func (rp *RocketPool) GetAddress(contractName string) (*common.Address, error)
```

Load Rocket Pool contract addresses

### func \(\*RocketPool\) [GetAddresses](<https://github.com/rocket-pool/rocketpool-go/blob/release/rocketpool/rocketpool.go#L114>)

```go
func (rp *RocketPool) GetAddresses(contractNames ...string) ([]*common.Address, error)
```

### func \(\*RocketPool\) [GetContract](<https://github.com/rocket-pool/rocketpool-go/blob/release/rocketpool/rocketpool.go#L203>)

```go
func (rp *RocketPool) GetContract(contractName string) (*Contract, error)
```

Load Rocket Pool contracts

### func \(\*RocketPool\) [GetContracts](<https://github.com/rocket-pool/rocketpool-go/blob/release/rocketpool/rocketpool.go#L254>)

```go
func (rp *RocketPool) GetContracts(contractNames ...string) ([]*Contract, error)
```

### func \(\*RocketPool\) [MakeContract](<https://github.com/rocket-pool/rocketpool-go/blob/release/rocketpool/rocketpool.go#L282>)

```go
func (rp *RocketPool) MakeContract(contractName string, address common.Address) (*Contract, error)
```

Create a Rocket Pool contract instance

