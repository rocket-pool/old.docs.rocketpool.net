# [WIP] Go Library

*The following page is written for **v1.0.1** of the library.*
*We will update it with any breaking changes as they come, but otherwise assume that newer versions are still compatible with the descriptions here.*

Rocket Pool is a decentralized staking platform for the Ethereum Beacon Chain that is built entirely using smart contracts on the Ethereum blockchain.
This library wraps those smart contracts so they can be used in Go programs.

This page demonstrates several simple examples that a provide a walkthrough of Rocket Pool's Go bindings for the smart contracts.

::: warning NOTE
This guide assumes you are already familiar with the Go ecosystem and how to use the language.
:::


## Installing and Importing the Go Library

To get the Go library, simply run the following:

```
go get github.com/rocket-pool/rocketpool-go@v1.0.1
```

You can also add it manually to `go.mod` with the following:

```
require (
	github.com/rocket-pool/rocketpool-go v1.0.1
    ...
)
```

Run `go mod tidy` afterwards to pull down the appropriate version into your cache.

As you may expect, all of the packages contained in the library stem from the `"github.com/rocket-pool/rocketpool-go/` package.


## Initializing the Rocket Pool Manager

The core interface to all of Rocket Pool's contracts is the [rocketpool.RocketPool](../../api/go/rocketpool.md#type-rocketpool) type.
It is created in this section using the [rocketpool.NewRocketPool()](../../api/go/rocketpool.md#func-newrocketpool) function.

Use the following imports:
```go
import (
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
	
	"github.com/rocket-pool/rocketpool-go/rocketpool"
)
```

Now, create the contract manager:
```go
// Set up the arguments
eth1Address := "http://my-eth1-client:port"
rocketStorage := "hex-string-address-of-rocket-storage-contract"

// Connect to ETH1
ethClient, err := ethclient.Dial(eth1Address)
if err != nil {
    fmt.Printf("Error connecting to ETH1 client on %s: %s\n", eth1Address, err.Error())
    os.Exit(1)
}

// Create RP manager
rp, err := rocketpool.NewRocketPool(ethClient, common.HexToAddress(rocketStorage))
if err != nil {
    fmt.Printf("Error getting RocketStorage contract at address %s: %s\n", rocketStorage, err.Error())
    os.Exit(1)
}
```

You will need to pass in an `ethclient.Client` object which is connected to an Eth1 client on the appropriate network (Goerli for the testnet, or mainnet once it's released).
This is created using the `ethclient.Dial()` function from `go-ethereum`, which we assume you are already familiar with.

The second parameter is created using the hex string of the `RocketStorage` contract.
You can retrieve this address from the [Smartnode configuration file for Prater](https://github.com/rocket-pool/smartnode-install/blob/master/amd64/rp-smartnode-install/network/prater/config.yml#L2) or [the configuration file for Mainnet](https://github.com/rocket-pool/smartnode-install/blob/master/amd64/rp-smartnode-install/network/mainnet/config.yml#L2), depending on which you want to use.

Once you have this manager object created, you can use it to interact with the rest of the library.


## A Simple Example: Reading the Deposit Pool's Balance

As a simple first demonstration of how to use the API, let's get the balance of the Deposit Pool (also known as the Staking Pool).
This is the available balance that pool stakers have deposited, which has yet to be put to work on the Beacon Chain by node operators.

Start with the following additional imports:

```go
import (
    "github.com/rocket-pool/rocketpool-go/deposit"
    "github.com/rocket-pool/rocketpool-go/utils/eth"
)
```

Next, use the following snippet:

```go
    // Get the deposit pool balance
    depositPoolBalance, err := deposit.GetBalance(rp, nil)
    if err != nil {
        fmt.Printf("Error getting the deposit pool balance: %s\n", err.Error())
        os.Exit(1)
    }
    fmt.Printf("Deposit Pool Balance: %f\n", eth.WeiToEth(depositPoolBalance))
```

The [deposit.GetBalance()](../../api/go/deposit.md#func-getbalance) function will return the amount of ETH in the staking pool.


### Converting Between Wei, Gwei, and ETH Values

Note that most of the functions in the Go bindings use `*big.Int` as a construct for passing numbers back and forth between the smart contracts.
To make these more user-friendly, they can be easily converted into floats using the [eth.WeiToEth()](../../api/go/utils-eth.md#func-weitoeth) utility function and back using the [eth.EthToWei()](../../api/go/utils-eth.md#func-ethtowei) function.
The [utils/eth](../../api/go/utils-eth.md) package has several such helper methods to convert back and forth between human-readable values and values that are used by the smart contracts.


## Transaction Example: Staking with the Staking Pool

The following snippet demonstrates how to stake ETH into the Staking Pool and receive rETH in return.

You will need the following imports:

```go
import (
	"context"
	"crypto/ecdsa"
	"fmt"
	"math/big"
	"os"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"

	"github.com/rocket-pool/rocketpool-go/deposit"
	"github.com/rocket-pool/rocketpool-go/rocketpool"
	"github.com/rocket-pool/rocketpool-go/utils"
	"github.com/rocket-pool/rocketpool-go/utils/eth"
)
```

Start by retrieving the private key used for signing the transaction, and specifying the chain ID you want to execute the transaction on:

```go
    // You'll have to retrieve this key for your user in your system
    var privateKey *ecdsa.PrivateKey

    // 1 for Mainnet, but insert your chain ID of choice here (e.g. 5 for Goerli)
    chainID := big.NewInt(1)
```


### Preparing Transactor Options

Next, prepare the transactor options:

```go
    // Set up the transactor options
    opts, err := bind.NewKeyedTransactorWithChainID(privateKey, chainID)
    if err != nil {
        fmt.Printf("Error getting Transactor options: %s\n", err.Error())
        os.Exit(1)
    }
    opts.GasFeeCap = nil // Max total gas fee - nil uses the internal oracle
    opts.GasTipCap = nil // Max priority fee - nil uses the internal oracle
    opts.GasLimit = 0 // When set to 0, the library will automatically calculate it
    opts.Context = context.Background()
```

Note that the current Geth library uses `opts.GasFeeCap` and `opts.GasTipCap` to specify the total maximum fee and the maximum priority fee (introduced with EIP 1559) respectively.

The `opts.GasLimit` can be left at 0; the library will automatically calculate the appropriate value (the estimated gas limit produced by simulating the transaction, multiplied by 1.5 for a wide margin of safety).

Next, specify the amount of ETH to deposit into the Staking Pool:

```go
    // Set Value to be the amount of ETH you want to stake, in wei
    amountToStake := 1.0
    opts.Value = eth.EthToWei(amountToStake)
```

This is another instance where the `eth.EthToWei()` utility function comes in handy.


### Simulating Transactions and Calculating Gas Limits

Now that the options are set, simulate the transaction:

```go
    // Simulate the transaction to make sure it is allowed, and get the gas estimate
    gasInfo, err := deposit.EstimateDepositGas(rp, opts)
    if err != nil {
        fmt.Printf("Error simulating Deposit: %s\n", err.Error())
        os.Exit(1)
    }
    fmt.Printf("Staking %f ETH\n", amountToStake)
    fmt.Printf("Estimated gas needed: %d to %d", gasInfo.EstGasLimit, gasInfo.SafeGasLimit)
```

Each transaction function in the Rocket Pool library comes with a corresponding `EstimateXYZGas()` function - in this example, the function is [deposit.EstimateDepositGas()](../../api/go/deposit.md#func-estimatedepositgas).
This will run through the transaction as though it were real, but not actually commit anything to the blockchain.
It will verify that the transaction is valid and will succeed (e.g. nothing in the current state will cause it to revert).
If the simulation succeeds, it will provide some information about the expected gas cost of the function.
If the simulation fails, it will return an error indicating why (e.g. the revert message that the contract returned).


### Executing Transactions

At this point, it's a good idea to present the gas information to the user so they can decide if they accept the cost of the transaction, or modify it accordingly.
Once they're satisfied, run the actual transaction:

```go
    // This is where you can ask the user if they're alright with these gas limits,
    // and let them overwrite the max fees if desired

    // Run the deposit to stake the ETH and receive rETH
    txHash, err := deposit.Deposit(rp, opts)
    if err != nil {
        fmt.Printf("Error during Deposit: %s\n", err.Error())
        os.Exit(1)
    }

    fmt.Printf("Transaction submitted with hash %s\n", txHash.Hex())
```

All transaction functions (such as [deposit.Deposit()](../../api/go/deposit.md#func-deposit) used here) will return the hash of the transaction that was submitted.
You can display this to the user (presumably with a link to a chain explorer).


### Waiting for Transactions to Finish

If you want to wait for the transaction to complete before moving forward, you can do the following:

```go
    // Print a waiting message
    fmt.Println("Waiting for it to be mined...")

    // Wait for the transaction to be mined
    _, err = utils.WaitForTransaction(ethClient, txHash)
    if err != nil {
        fmt.Printf("Error waiting for transaction: %s\n", err.Error())
        os.Exit(1)
    }

    fmt.Println("Successfully staked ETH for rETH!")
```

This leverages the [utils.WaitForTransaction()](../../api/go/utils.md#func-waitfortransaction) function to block until the transaction has been successfully mined.

