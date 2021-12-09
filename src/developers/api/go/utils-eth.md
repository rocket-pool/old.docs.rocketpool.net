# eth

```go
import "github.com/rocket-pool/rocketpool-go/utils/eth"
```

## Index

- [Constants](<#constants>)
- [func EstimateSendTransactionGas(client *ethclient.Client, toAddress common.Address, opts *bind.TransactOpts) (rocketpool.GasInfo, error)](<#func-estimatesendtransactiongas>)
- [func EthToWei(eth float64) *big.Int](<#func-ethtowei>)
- [func FilterContractLogs(rp *rocketpool.RocketPool, contractName string, q FilterQuery, intervalSize *big.Int) ([]types.Log, error)](<#func-filtercontractlogs>)
- [func GetLogs(rp *rocketpool.RocketPool, addressFilter []common.Address, topicFilter [][]common.Hash, intervalSize, fromBlock, toBlock *big.Int, blockHash *common.Hash) ([]types.Log, error)](<#func-getlogs>)
- [func GweiToWei(gwei float64) *big.Int](<#func-gweitowei>)
- [func SendTransaction(client *ethclient.Client, toAddress common.Address, opts *bind.TransactOpts) (common.Hash, error)](<#func-sendtransaction>)
- [func WeiToEth(wei *big.Int) float64](<#func-weitoeth>)
- [func WeiToGwei(wei *big.Int) float64](<#func-weitogwei>)
- [type FilterQuery](<#type-filterquery>)


## Constants

Conversion factors

```go
const (
    WeiPerEth  float64 = 1e18
    WeiPerGwei float64 = 1e9
)
```

## func [EstimateSendTransactionGas](<https://github.com/rocket-pool/rocketpool-go/blob/release/utils/eth/transactions.go#L16>)

```go
func EstimateSendTransactionGas(client *ethclient.Client, toAddress common.Address, opts *bind.TransactOpts) (rocketpool.GasInfo, error)
```

Estimate the gas of SendTransaction

## func [EthToWei](<https://github.com/rocket-pool/rocketpool-go/blob/release/utils/eth/units.go#L28>)

```go
func EthToWei(eth float64) *big.Int
```

Convert eth to wei

## func [FilterContractLogs](<https://github.com/rocket-pool/rocketpool-go/blob/release/utils/eth/logs.go#L21>)

```go
func FilterContractLogs(rp *rocketpool.RocketPool, contractName string, q FilterQuery, intervalSize *big.Int) ([]types.Log, error)
```

## func [GetLogs](<https://github.com/rocket-pool/rocketpool-go/blob/release/utils/eth/logs.go#L51>)

```go
func GetLogs(rp *rocketpool.RocketPool, addressFilter []common.Address, topicFilter [][]common.Hash, intervalSize, fromBlock, toBlock *big.Int, blockHash *common.Hash) ([]types.Log, error)
```

Gets the logs for a particular log request\, breaking the calls into batches if necessary

## func [GweiToWei](<https://github.com/rocket-pool/rocketpool-go/blob/release/utils/eth/units.go#L51>)

```go
func GweiToWei(gwei float64) *big.Int
```

Convert gigawei to wei

## func [SendTransaction](<https://github.com/rocket-pool/rocketpool-go/blob/release/utils/eth/transactions.go#L55>)

```go
func SendTransaction(client *ethclient.Client, toAddress common.Address, opts *bind.TransactOpts) (common.Hash, error)
```

Send a transaction to an address

## func [WeiToEth](<https://github.com/rocket-pool/rocketpool-go/blob/release/utils/eth/units.go#L17>)

```go
func WeiToEth(wei *big.Int) float64
```

Convert wei to eth

## func [WeiToGwei](<https://github.com/rocket-pool/rocketpool-go/blob/release/utils/eth/units.go#L40>)

```go
func WeiToGwei(wei *big.Int) float64
```

Convert wei to gigawei

## type [FilterQuery](<https://github.com/rocket-pool/rocketpool-go/blob/release/utils/eth/logs.go#L14-L19>)

```go
type FilterQuery struct {
    BlockHash *common.Hash
    FromBlock *big.Int
    ToBlock   *big.Int
    Topics    [][]common.Hash
}
```

