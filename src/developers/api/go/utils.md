# utils

```go
import "github.com/rocket-pool/rocketpool-go/utils"
```

## Index

- [func WaitForTransaction(client *ethclient.Client, hash common.Hash) (*types.Receipt, error)](<#func-waitfortransaction>)


## func [WaitForTransaction](<https://github.com/rocket-pool/rocketpool-go/blob/release/utils/wait.go#L14>)

```go
func WaitForTransaction(client *ethclient.Client, hash common.Hash) (*types.Receipt, error)
```

Wait for a transaction to get mined

