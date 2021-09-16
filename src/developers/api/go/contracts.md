# contracts

```go
import "github.com/rocket-pool/rocketpool-go/contracts"
```

## Index

- [Constants](<#constants>)
- [type RocketStorage](<#type-rocketstorage>)
  - [func NewRocketStorage(address common.Address, backend bind.ContractBackend) (*RocketStorage, error)](<#func-newrocketstorage>)
- [type RocketStorageCaller](<#type-rocketstoragecaller>)
  - [func NewRocketStorageCaller(address common.Address, caller bind.ContractCaller) (*RocketStorageCaller, error)](<#func-newrocketstoragecaller>)
  - [func (_RocketStorage *RocketStorageCaller) GetAddress(opts *bind.CallOpts, _key [32]byte) (common.Address, error)](<#func-rocketstoragecaller-getaddress>)
  - [func (_RocketStorage *RocketStorageCaller) GetBool(opts *bind.CallOpts, _key [32]byte) (bool, error)](<#func-rocketstoragecaller-getbool>)
  - [func (_RocketStorage *RocketStorageCaller) GetBytes(opts *bind.CallOpts, _key [32]byte) ([]byte, error)](<#func-rocketstoragecaller-getbytes>)
  - [func (_RocketStorage *RocketStorageCaller) GetBytes32(opts *bind.CallOpts, _key [32]byte) ([32]byte, error)](<#func-rocketstoragecaller-getbytes32>)
  - [func (_RocketStorage *RocketStorageCaller) GetInt(opts *bind.CallOpts, _key [32]byte) (*big.Int, error)](<#func-rocketstoragecaller-getint>)
  - [func (_RocketStorage *RocketStorageCaller) GetString(opts *bind.CallOpts, _key [32]byte) (string, error)](<#func-rocketstoragecaller-getstring>)
  - [func (_RocketStorage *RocketStorageCaller) GetUint(opts *bind.CallOpts, _key [32]byte) (*big.Int, error)](<#func-rocketstoragecaller-getuint>)
- [type RocketStorageCallerRaw](<#type-rocketstoragecallerraw>)
  - [func (_RocketStorage *RocketStorageCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error](<#func-rocketstoragecallerraw-call>)
- [type RocketStorageCallerSession](<#type-rocketstoragecallersession>)
  - [func (_RocketStorage *RocketStorageCallerSession) GetAddress(_key [32]byte) (common.Address, error)](<#func-rocketstoragecallersession-getaddress>)
  - [func (_RocketStorage *RocketStorageCallerSession) GetBool(_key [32]byte) (bool, error)](<#func-rocketstoragecallersession-getbool>)
  - [func (_RocketStorage *RocketStorageCallerSession) GetBytes(_key [32]byte) ([]byte, error)](<#func-rocketstoragecallersession-getbytes>)
  - [func (_RocketStorage *RocketStorageCallerSession) GetBytes32(_key [32]byte) ([32]byte, error)](<#func-rocketstoragecallersession-getbytes32>)
  - [func (_RocketStorage *RocketStorageCallerSession) GetInt(_key [32]byte) (*big.Int, error)](<#func-rocketstoragecallersession-getint>)
  - [func (_RocketStorage *RocketStorageCallerSession) GetString(_key [32]byte) (string, error)](<#func-rocketstoragecallersession-getstring>)
  - [func (_RocketStorage *RocketStorageCallerSession) GetUint(_key [32]byte) (*big.Int, error)](<#func-rocketstoragecallersession-getuint>)
- [type RocketStorageFilterer](<#type-rocketstoragefilterer>)
  - [func NewRocketStorageFilterer(address common.Address, filterer bind.ContractFilterer) (*RocketStorageFilterer, error)](<#func-newrocketstoragefilterer>)
- [type RocketStorageRaw](<#type-rocketstorageraw>)
  - [func (_RocketStorage *RocketStorageRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error](<#func-rocketstorageraw-call>)
  - [func (_RocketStorage *RocketStorageRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error)](<#func-rocketstorageraw-transact>)
  - [func (_RocketStorage *RocketStorageRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error)](<#func-rocketstorageraw-transfer>)
- [type RocketStorageSession](<#type-rocketstoragesession>)
  - [func (_RocketStorage *RocketStorageSession) DeleteAddress(_key [32]byte) (*types.Transaction, error)](<#func-rocketstoragesession-deleteaddress>)
  - [func (_RocketStorage *RocketStorageSession) DeleteBool(_key [32]byte) (*types.Transaction, error)](<#func-rocketstoragesession-deletebool>)
  - [func (_RocketStorage *RocketStorageSession) DeleteBytes(_key [32]byte) (*types.Transaction, error)](<#func-rocketstoragesession-deletebytes>)
  - [func (_RocketStorage *RocketStorageSession) DeleteBytes32(_key [32]byte) (*types.Transaction, error)](<#func-rocketstoragesession-deletebytes32>)
  - [func (_RocketStorage *RocketStorageSession) DeleteInt(_key [32]byte) (*types.Transaction, error)](<#func-rocketstoragesession-deleteint>)
  - [func (_RocketStorage *RocketStorageSession) DeleteString(_key [32]byte) (*types.Transaction, error)](<#func-rocketstoragesession-deletestring>)
  - [func (_RocketStorage *RocketStorageSession) DeleteUint(_key [32]byte) (*types.Transaction, error)](<#func-rocketstoragesession-deleteuint>)
  - [func (_RocketStorage *RocketStorageSession) GetAddress(_key [32]byte) (common.Address, error)](<#func-rocketstoragesession-getaddress>)
  - [func (_RocketStorage *RocketStorageSession) GetBool(_key [32]byte) (bool, error)](<#func-rocketstoragesession-getbool>)
  - [func (_RocketStorage *RocketStorageSession) GetBytes(_key [32]byte) ([]byte, error)](<#func-rocketstoragesession-getbytes>)
  - [func (_RocketStorage *RocketStorageSession) GetBytes32(_key [32]byte) ([32]byte, error)](<#func-rocketstoragesession-getbytes32>)
  - [func (_RocketStorage *RocketStorageSession) GetInt(_key [32]byte) (*big.Int, error)](<#func-rocketstoragesession-getint>)
  - [func (_RocketStorage *RocketStorageSession) GetString(_key [32]byte) (string, error)](<#func-rocketstoragesession-getstring>)
  - [func (_RocketStorage *RocketStorageSession) GetUint(_key [32]byte) (*big.Int, error)](<#func-rocketstoragesession-getuint>)
  - [func (_RocketStorage *RocketStorageSession) SetAddress(_key [32]byte, _value common.Address) (*types.Transaction, error)](<#func-rocketstoragesession-setaddress>)
  - [func (_RocketStorage *RocketStorageSession) SetBool(_key [32]byte, _value bool) (*types.Transaction, error)](<#func-rocketstoragesession-setbool>)
  - [func (_RocketStorage *RocketStorageSession) SetBytes(_key [32]byte, _value []byte) (*types.Transaction, error)](<#func-rocketstoragesession-setbytes>)
  - [func (_RocketStorage *RocketStorageSession) SetBytes32(_key [32]byte, _value [32]byte) (*types.Transaction, error)](<#func-rocketstoragesession-setbytes32>)
  - [func (_RocketStorage *RocketStorageSession) SetInt(_key [32]byte, _value *big.Int) (*types.Transaction, error)](<#func-rocketstoragesession-setint>)
  - [func (_RocketStorage *RocketStorageSession) SetString(_key [32]byte, _value string) (*types.Transaction, error)](<#func-rocketstoragesession-setstring>)
  - [func (_RocketStorage *RocketStorageSession) SetUint(_key [32]byte, _value *big.Int) (*types.Transaction, error)](<#func-rocketstoragesession-setuint>)
- [type RocketStorageTransactor](<#type-rocketstoragetransactor>)
  - [func NewRocketStorageTransactor(address common.Address, transactor bind.ContractTransactor) (*RocketStorageTransactor, error)](<#func-newrocketstoragetransactor>)
  - [func (_RocketStorage *RocketStorageTransactor) DeleteAddress(opts *bind.TransactOpts, _key [32]byte) (*types.Transaction, error)](<#func-rocketstoragetransactor-deleteaddress>)
  - [func (_RocketStorage *RocketStorageTransactor) DeleteBool(opts *bind.TransactOpts, _key [32]byte) (*types.Transaction, error)](<#func-rocketstoragetransactor-deletebool>)
  - [func (_RocketStorage *RocketStorageTransactor) DeleteBytes(opts *bind.TransactOpts, _key [32]byte) (*types.Transaction, error)](<#func-rocketstoragetransactor-deletebytes>)
  - [func (_RocketStorage *RocketStorageTransactor) DeleteBytes32(opts *bind.TransactOpts, _key [32]byte) (*types.Transaction, error)](<#func-rocketstoragetransactor-deletebytes32>)
  - [func (_RocketStorage *RocketStorageTransactor) DeleteInt(opts *bind.TransactOpts, _key [32]byte) (*types.Transaction, error)](<#func-rocketstoragetransactor-deleteint>)
  - [func (_RocketStorage *RocketStorageTransactor) DeleteString(opts *bind.TransactOpts, _key [32]byte) (*types.Transaction, error)](<#func-rocketstoragetransactor-deletestring>)
  - [func (_RocketStorage *RocketStorageTransactor) DeleteUint(opts *bind.TransactOpts, _key [32]byte) (*types.Transaction, error)](<#func-rocketstoragetransactor-deleteuint>)
  - [func (_RocketStorage *RocketStorageTransactor) SetAddress(opts *bind.TransactOpts, _key [32]byte, _value common.Address) (*types.Transaction, error)](<#func-rocketstoragetransactor-setaddress>)
  - [func (_RocketStorage *RocketStorageTransactor) SetBool(opts *bind.TransactOpts, _key [32]byte, _value bool) (*types.Transaction, error)](<#func-rocketstoragetransactor-setbool>)
  - [func (_RocketStorage *RocketStorageTransactor) SetBytes(opts *bind.TransactOpts, _key [32]byte, _value []byte) (*types.Transaction, error)](<#func-rocketstoragetransactor-setbytes>)
  - [func (_RocketStorage *RocketStorageTransactor) SetBytes32(opts *bind.TransactOpts, _key [32]byte, _value [32]byte) (*types.Transaction, error)](<#func-rocketstoragetransactor-setbytes32>)
  - [func (_RocketStorage *RocketStorageTransactor) SetInt(opts *bind.TransactOpts, _key [32]byte, _value *big.Int) (*types.Transaction, error)](<#func-rocketstoragetransactor-setint>)
  - [func (_RocketStorage *RocketStorageTransactor) SetString(opts *bind.TransactOpts, _key [32]byte, _value string) (*types.Transaction, error)](<#func-rocketstoragetransactor-setstring>)
  - [func (_RocketStorage *RocketStorageTransactor) SetUint(opts *bind.TransactOpts, _key [32]byte, _value *big.Int) (*types.Transaction, error)](<#func-rocketstoragetransactor-setuint>)
- [type RocketStorageTransactorRaw](<#type-rocketstoragetransactorraw>)
  - [func (_RocketStorage *RocketStorageTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error)](<#func-rocketstoragetransactorraw-transact>)
  - [func (_RocketStorage *RocketStorageTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error)](<#func-rocketstoragetransactorraw-transfer>)
- [type RocketStorageTransactorSession](<#type-rocketstoragetransactorsession>)
  - [func (_RocketStorage *RocketStorageTransactorSession) DeleteAddress(_key [32]byte) (*types.Transaction, error)](<#func-rocketstoragetransactorsession-deleteaddress>)
  - [func (_RocketStorage *RocketStorageTransactorSession) DeleteBool(_key [32]byte) (*types.Transaction, error)](<#func-rocketstoragetransactorsession-deletebool>)
  - [func (_RocketStorage *RocketStorageTransactorSession) DeleteBytes(_key [32]byte) (*types.Transaction, error)](<#func-rocketstoragetransactorsession-deletebytes>)
  - [func (_RocketStorage *RocketStorageTransactorSession) DeleteBytes32(_key [32]byte) (*types.Transaction, error)](<#func-rocketstoragetransactorsession-deletebytes32>)
  - [func (_RocketStorage *RocketStorageTransactorSession) DeleteInt(_key [32]byte) (*types.Transaction, error)](<#func-rocketstoragetransactorsession-deleteint>)
  - [func (_RocketStorage *RocketStorageTransactorSession) DeleteString(_key [32]byte) (*types.Transaction, error)](<#func-rocketstoragetransactorsession-deletestring>)
  - [func (_RocketStorage *RocketStorageTransactorSession) DeleteUint(_key [32]byte) (*types.Transaction, error)](<#func-rocketstoragetransactorsession-deleteuint>)
  - [func (_RocketStorage *RocketStorageTransactorSession) SetAddress(_key [32]byte, _value common.Address) (*types.Transaction, error)](<#func-rocketstoragetransactorsession-setaddress>)
  - [func (_RocketStorage *RocketStorageTransactorSession) SetBool(_key [32]byte, _value bool) (*types.Transaction, error)](<#func-rocketstoragetransactorsession-setbool>)
  - [func (_RocketStorage *RocketStorageTransactorSession) SetBytes(_key [32]byte, _value []byte) (*types.Transaction, error)](<#func-rocketstoragetransactorsession-setbytes>)
  - [func (_RocketStorage *RocketStorageTransactorSession) SetBytes32(_key [32]byte, _value [32]byte) (*types.Transaction, error)](<#func-rocketstoragetransactorsession-setbytes32>)
  - [func (_RocketStorage *RocketStorageTransactorSession) SetInt(_key [32]byte, _value *big.Int) (*types.Transaction, error)](<#func-rocketstoragetransactorsession-setint>)
  - [func (_RocketStorage *RocketStorageTransactorSession) SetString(_key [32]byte, _value string) (*types.Transaction, error)](<#func-rocketstoragetransactorsession-setstring>)
  - [func (_RocketStorage *RocketStorageTransactorSession) SetUint(_key [32]byte, _value *big.Int) (*types.Transaction, error)](<#func-rocketstoragetransactorsession-setuint>)


## Constants

RocketStorageABI is the input ABI used to generate the binding from\.

```go
const RocketStorageABI = "[{\"inputs\": [],\"stateMutability\": \"nonpayable\",\"type\": \"constructor\"},{\"anonymous\": false,\"inputs\": [{\"indexed\": false,\"internalType\": \"address\",\"name\": \"oldGuardian\",\"type\": \"address\"},{\"indexed\": false,\"internalType\": \"address\",\"name\": \"newGuardian\",\"type\": \"address\"}],\"name\": \"GuardianChanged\",\"type\": \"event\"},{\"anonymous\": false,\"inputs\": [{\"indexed\": true,\"internalType\": \"address\",\"name\": \"node\",\"type\": \"address\"},{\"indexed\": true,\"internalType\": \"address\",\"name\": \"withdrawalAddress\",\"type\": \"address\"},{\"indexed\": false,\"internalType\": \"uint256\",\"name\": \"time\",\"type\": \"uint256\"}],\"name\": \"NodeWithdrawalAddressSet\",\"type\": \"event\"},{\"inputs\": [],\"name\": \"getGuardian\",\"outputs\": [{\"internalType\": \"address\",\"name\": \"\",\"type\": \"address\"}],\"stateMutability\": \"view\",\"type\": \"function\",\"constant\": true},{\"inputs\": [{\"internalType\": \"address\",\"name\": \"_newAddress\",\"type\": \"address\"}],\"name\": \"setGuardian\",\"outputs\": [],\"stateMutability\": \"nonpayable\",\"type\": \"function\"},{\"inputs\": [],\"name\": \"confirmGuardian\",\"outputs\": [],\"stateMutability\": \"nonpayable\",\"type\": \"function\"},{\"inputs\": [],\"name\": \"getDeployedStatus\",\"outputs\": [{\"internalType\": \"bool\",\"name\": \"\",\"type\": \"bool\"}],\"stateMutability\": \"view\",\"type\": \"function\",\"constant\": true},{\"inputs\": [],\"name\": \"setDeployedStatus\",\"outputs\": [],\"stateMutability\": \"nonpayable\",\"type\": \"function\"},{\"inputs\": [{\"internalType\": \"address\",\"name\": \"_nodeAddress\",\"type\": \"address\"}],\"name\": \"getNodeWithdrawalAddress\",\"outputs\": [{\"internalType\": \"address\",\"name\": \"\",\"type\": \"address\"}],\"stateMutability\": \"view\",\"type\": \"function\",\"constant\": true},{\"inputs\": [{\"internalType\": \"address\",\"name\": \"_nodeAddress\",\"type\": \"address\"}],\"name\": \"getNodePendingWithdrawalAddress\",\"outputs\": [{\"internalType\": \"address\",\"name\": \"\",\"type\": \"address\"}],\"stateMutability\": \"view\",\"type\": \"function\",\"constant\": true},{\"inputs\": [{\"internalType\": \"address\",\"name\": \"_nodeAddress\",\"type\": \"address\"},{\"internalType\": \"address\",\"name\": \"_newWithdrawalAddress\",\"type\": \"address\"},{\"internalType\": \"bool\",\"name\": \"_confirm\",\"type\": \"bool\"}],\"name\": \"setWithdrawalAddress\",\"outputs\": [],\"stateMutability\": \"nonpayable\",\"type\": \"function\"},{\"inputs\": [{\"internalType\": \"address\",\"name\": \"_nodeAddress\",\"type\": \"address\"}],\"name\": \"confirmWithdrawalAddress\",\"outputs\": [],\"stateMutability\": \"nonpayable\",\"type\": \"function\"},{\"inputs\": [{\"internalType\": \"bytes32\",\"name\": \"_key\",\"type\": \"bytes32\"}],\"name\": \"getAddress\",\"outputs\": [{\"internalType\": \"address\",\"name\": \"r\",\"type\": \"address\"}],\"stateMutability\": \"view\",\"type\": \"function\",\"constant\": true},{\"inputs\": [{\"internalType\": \"bytes32\",\"name\": \"_key\",\"type\": \"bytes32\"}],\"name\": \"getUint\",\"outputs\": [{\"internalType\": \"uint256\",\"name\": \"r\",\"type\": \"uint256\"}],\"stateMutability\": \"view\",\"type\": \"function\",\"constant\": true},{\"inputs\": [{\"internalType\": \"bytes32\",\"name\": \"_key\",\"type\": \"bytes32\"}],\"name\": \"getString\",\"outputs\": [{\"internalType\": \"string\",\"name\": \"\",\"type\": \"string\"}],\"stateMutability\": \"view\",\"type\": \"function\",\"constant\": true},{\"inputs\": [{\"internalType\": \"bytes32\",\"name\": \"_key\",\"type\": \"bytes32\"}],\"name\": \"getBytes\",\"outputs\": [{\"internalType\": \"bytes\",\"name\": \"\",\"type\": \"bytes\"}],\"stateMutability\": \"view\",\"type\": \"function\",\"constant\": true},{\"inputs\": [{\"internalType\": \"bytes32\",\"name\": \"_key\",\"type\": \"bytes32\"}],\"name\": \"getBool\",\"outputs\": [{\"internalType\": \"bool\",\"name\": \"r\",\"type\": \"bool\"}],\"stateMutability\": \"view\",\"type\": \"function\",\"constant\": true},{\"inputs\": [{\"internalType\": \"bytes32\",\"name\": \"_key\",\"type\": \"bytes32\"}],\"name\": \"getInt\",\"outputs\": [{\"internalType\": \"int256\",\"name\": \"r\",\"type\": \"int256\"}],\"stateMutability\": \"view\",\"type\": \"function\",\"constant\": true},{\"inputs\": [{\"internalType\": \"bytes32\",\"name\": \"_key\",\"type\": \"bytes32\"}],\"name\": \"getBytes32\",\"outputs\": [{\"internalType\": \"bytes32\",\"name\": \"r\",\"type\": \"bytes32\"}],\"stateMutability\": \"view\",\"type\": \"function\",\"constant\": true},{\"inputs\": [{\"internalType\": \"bytes32\",\"name\": \"_key\",\"type\": \"bytes32\"},{\"internalType\": \"address\",\"name\": \"_value\",\"type\": \"address\"}],\"name\": \"setAddress\",\"outputs\": [],\"stateMutability\": \"nonpayable\",\"type\": \"function\"},{\"inputs\": [{\"internalType\": \"bytes32\",\"name\": \"_key\",\"type\": \"bytes32\"},{\"internalType\": \"uint256\",\"name\": \"_value\",\"type\": \"uint256\"}],\"name\": \"setUint\",\"outputs\": [],\"stateMutability\": \"nonpayable\",\"type\": \"function\"},{\"inputs\": [{\"internalType\": \"bytes32\",\"name\": \"_key\",\"type\": \"bytes32\"},{\"internalType\": \"string\",\"name\": \"_value\",\"type\": \"string\"}],\"name\": \"setString\",\"outputs\": [],\"stateMutability\": \"nonpayable\",\"type\": \"function\"},{\"inputs\": [{\"internalType\": \"bytes32\",\"name\": \"_key\",\"type\": \"bytes32\"},{\"internalType\": \"bytes\",\"name\": \"_value\",\"type\": \"bytes\"}],\"name\": \"setBytes\",\"outputs\": [],\"stateMutability\": \"nonpayable\",\"type\": \"function\"},{\"inputs\": [{\"internalType\": \"bytes32\",\"name\": \"_key\",\"type\": \"bytes32\"},{\"internalType\": \"bool\",\"name\": \"_value\",\"type\": \"bool\"}],\"name\": \"setBool\",\"outputs\": [],\"stateMutability\": \"nonpayable\",\"type\": \"function\"},{\"inputs\": [{\"internalType\": \"bytes32\",\"name\": \"_key\",\"type\": \"bytes32\"},{\"internalType\": \"int256\",\"name\": \"_value\",\"type\": \"int256\"}],\"name\": \"setInt\",\"outputs\": [],\"stateMutability\": \"nonpayable\",\"type\": \"function\"},{\"inputs\": [{\"internalType\": \"bytes32\",\"name\": \"_key\",\"type\": \"bytes32\"},{\"internalType\": \"bytes32\",\"name\": \"_value\",\"type\": \"bytes32\"}],\"name\": \"setBytes32\",\"outputs\": [],\"stateMutability\": \"nonpayable\",\"type\": \"function\"},{\"inputs\": [{\"internalType\": \"bytes32\",\"name\": \"_key\",\"type\": \"bytes32\"}],\"name\": \"deleteAddress\",\"outputs\": [],\"stateMutability\": \"nonpayable\",\"type\": \"function\"},{\"inputs\": [{\"internalType\": \"bytes32\",\"name\": \"_key\",\"type\": \"bytes32\"}],\"name\": \"deleteUint\",\"outputs\": [],\"stateMutability\": \"nonpayable\",\"type\": \"function\"},{\"inputs\": [{\"internalType\": \"bytes32\",\"name\": \"_key\",\"type\": \"bytes32\"}],\"name\": \"deleteString\",\"outputs\": [],\"stateMutability\": \"nonpayable\",\"type\": \"function\"},{\"inputs\": [{\"internalType\": \"bytes32\",\"name\": \"_key\",\"type\": \"bytes32\"}],\"name\": \"deleteBytes\",\"outputs\": [],\"stateMutability\": \"nonpayable\",\"type\": \"function\"},{\"inputs\": [{\"internalType\": \"bytes32\",\"name\": \"_key\",\"type\": \"bytes32\"}],\"name\": \"deleteBool\",\"outputs\": [],\"stateMutability\": \"nonpayable\",\"type\": \"function\"},{\"inputs\": [{\"internalType\": \"bytes32\",\"name\": \"_key\",\"type\": \"bytes32\"}],\"name\": \"deleteInt\",\"outputs\": [],\"stateMutability\": \"nonpayable\",\"type\": \"function\"},{\"inputs\": [{\"internalType\": \"bytes32\",\"name\": \"_key\",\"type\": \"bytes32\"}],\"name\": \"deleteBytes32\",\"outputs\": [],\"stateMutability\": \"nonpayable\",\"type\": \"function\"},{\"inputs\": [{\"internalType\": \"bytes32\",\"name\": \"_key\",\"type\": \"bytes32\"},{\"internalType\": \"uint256\",\"name\": \"_amount\",\"type\": \"uint256\"}],\"name\": \"addUint\",\"outputs\": [],\"stateMutability\": \"nonpayable\",\"type\": \"function\"},{\"inputs\": [{\"internalType\": \"bytes32\",\"name\": \"_key\",\"type\": \"bytes32\"},{\"internalType\": \"uint256\",\"name\": \"_amount\",\"type\": \"uint256\"}],\"name\": \"subUint\",\"outputs\": [],\"stateMutability\": \"nonpayable\",\"type\": \"function\"}]\r\n"
```

## type [RocketStorage](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L33-L37>)

RocketStorage is an auto generated Go binding around an Ethereum contract\.

```go
type RocketStorage struct {
    RocketStorageCaller     // Read-only binding to the contract
    RocketStorageTransactor // Write-only binding to the contract
    RocketStorageFilterer   // Log filterer for contract events
}
```

### func [NewRocketStorage](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L92>)

```go
func NewRocketStorage(address common.Address, backend bind.ContractBackend) (*RocketStorage, error)
```

NewRocketStorage creates a new instance of RocketStorage\, bound to a specific deployed contract\.

## type [RocketStorageCaller](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L40-L42>)

RocketStorageCaller is an auto generated read\-only Go binding around an Ethereum contract\.

```go
type RocketStorageCaller struct {
    // contains filtered or unexported fields
}
```

### func [NewRocketStorageCaller](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L101>)

```go
func NewRocketStorageCaller(address common.Address, caller bind.ContractCaller) (*RocketStorageCaller, error)
```

NewRocketStorageCaller creates a new read\-only instance of RocketStorage\, bound to a specific deployed contract\.

### func \(\*RocketStorageCaller\) [GetAddress](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L177>)

```go
func (_RocketStorage *RocketStorageCaller) GetAddress(opts *bind.CallOpts, _key [32]byte) (common.Address, error)
```

GetAddress is a free data retrieval call binding the contract method 0x21f8a721\.

Solidity: function getAddress\(bytes32 \_key\) view returns\(address\)

### func \(\*RocketStorageCaller\) [GetBool](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L208>)

```go
func (_RocketStorage *RocketStorageCaller) GetBool(opts *bind.CallOpts, _key [32]byte) (bool, error)
```

GetBool is a free data retrieval call binding the contract method 0x7ae1cfca\.

Solidity: function getBool\(bytes32 \_key\) view returns\(bool\)

### func \(\*RocketStorageCaller\) [GetBytes](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L239>)

```go
func (_RocketStorage *RocketStorageCaller) GetBytes(opts *bind.CallOpts, _key [32]byte) ([]byte, error)
```

GetBytes is a free data retrieval call binding the contract method 0xc031a180\.

Solidity: function getBytes\(bytes32 \_key\) view returns\(bytes\)

### func \(\*RocketStorageCaller\) [GetBytes32](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L270>)

```go
func (_RocketStorage *RocketStorageCaller) GetBytes32(opts *bind.CallOpts, _key [32]byte) ([32]byte, error)
```

GetBytes32 is a free data retrieval call binding the contract method 0xa6ed563e\.

Solidity: function getBytes32\(bytes32 \_key\) view returns\(bytes32\)

### func \(\*RocketStorageCaller\) [GetInt](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L301>)

```go
func (_RocketStorage *RocketStorageCaller) GetInt(opts *bind.CallOpts, _key [32]byte) (*big.Int, error)
```

GetInt is a free data retrieval call binding the contract method 0xdc97d962\.

Solidity: function getInt\(bytes32 \_key\) view returns\(int256\)

### func \(\*RocketStorageCaller\) [GetString](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L332>)

```go
func (_RocketStorage *RocketStorageCaller) GetString(opts *bind.CallOpts, _key [32]byte) (string, error)
```

GetString is a free data retrieval call binding the contract method 0x986e791a\.

Solidity: function getString\(bytes32 \_key\) view returns\(string\)

### func \(\*RocketStorageCaller\) [GetUint](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L363>)

```go
func (_RocketStorage *RocketStorageCaller) GetUint(opts *bind.CallOpts, _key [32]byte) (*big.Int, error)
```

GetUint is a free data retrieval call binding the contract method 0xbd02d0f5\.

Solidity: function getUint\(bytes32 \_key\) view returns\(uint256\)

## type [RocketStorageCallerRaw](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L82-L84>)

RocketStorageCallerRaw is an auto generated low\-level read\-only Go binding around an Ethereum contract\.

```go
type RocketStorageCallerRaw struct {
    Contract *RocketStorageCaller // Generic read-only contract binding to access the raw methods on
}
```

### func \(\*RocketStorageCallerRaw\) [Call](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L159>)

```go
func (_RocketStorage *RocketStorageCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error
```

Call invokes the \(constant\) contract method with params as input values and sets the output to result\. The result type might be a single field for simple returns\, a slice of interfaces for anonymous returns and a struct for named returns\.

## type [RocketStorageCallerSession](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L64-L67>)

RocketStorageCallerSession is an auto generated read\-only Go binding around an Ethereum contract\, with pre\-set call options\.

```go
type RocketStorageCallerSession struct {
    Contract *RocketStorageCaller // Generic contract caller binding to set the session for
    CallOpts bind.CallOpts        // Call options to use throughout this session
}
```

### func \(\*RocketStorageCallerSession\) [GetAddress](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L201>)

```go
func (_RocketStorage *RocketStorageCallerSession) GetAddress(_key [32]byte) (common.Address, error)
```

GetAddress is a free data retrieval call binding the contract method 0x21f8a721\.

Solidity: function getAddress\(bytes32 \_key\) view returns\(address\)

### func \(\*RocketStorageCallerSession\) [GetBool](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L232>)

```go
func (_RocketStorage *RocketStorageCallerSession) GetBool(_key [32]byte) (bool, error)
```

GetBool is a free data retrieval call binding the contract method 0x7ae1cfca\.

Solidity: function getBool\(bytes32 \_key\) view returns\(bool\)

### func \(\*RocketStorageCallerSession\) [GetBytes](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L263>)

```go
func (_RocketStorage *RocketStorageCallerSession) GetBytes(_key [32]byte) ([]byte, error)
```

GetBytes is a free data retrieval call binding the contract method 0xc031a180\.

Solidity: function getBytes\(bytes32 \_key\) view returns\(bytes\)

### func \(\*RocketStorageCallerSession\) [GetBytes32](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L294>)

```go
func (_RocketStorage *RocketStorageCallerSession) GetBytes32(_key [32]byte) ([32]byte, error)
```

GetBytes32 is a free data retrieval call binding the contract method 0xa6ed563e\.

Solidity: function getBytes32\(bytes32 \_key\) view returns\(bytes32\)

### func \(\*RocketStorageCallerSession\) [GetInt](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L325>)

```go
func (_RocketStorage *RocketStorageCallerSession) GetInt(_key [32]byte) (*big.Int, error)
```

GetInt is a free data retrieval call binding the contract method 0xdc97d962\.

Solidity: function getInt\(bytes32 \_key\) view returns\(int256\)

### func \(\*RocketStorageCallerSession\) [GetString](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L356>)

```go
func (_RocketStorage *RocketStorageCallerSession) GetString(_key [32]byte) (string, error)
```

GetString is a free data retrieval call binding the contract method 0x986e791a\.

Solidity: function getString\(bytes32 \_key\) view returns\(string\)

### func \(\*RocketStorageCallerSession\) [GetUint](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L387>)

```go
func (_RocketStorage *RocketStorageCallerSession) GetUint(_key [32]byte) (*big.Int, error)
```

GetUint is a free data retrieval call binding the contract method 0xbd02d0f5\.

Solidity: function getUint\(bytes32 \_key\) view returns\(uint256\)

## type [RocketStorageFilterer](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L50-L52>)

RocketStorageFilterer is an auto generated log filtering Go binding around an Ethereum contract events\.

```go
type RocketStorageFilterer struct {
    // contains filtered or unexported fields
}
```

### func [NewRocketStorageFilterer](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L119>)

```go
func NewRocketStorageFilterer(address common.Address, filterer bind.ContractFilterer) (*RocketStorageFilterer, error)
```

NewRocketStorageFilterer creates a new log filterer instance of RocketStorage\, bound to a specific deployed contract\.

## type [RocketStorageRaw](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L77-L79>)

RocketStorageRaw is an auto generated low\-level Go binding around an Ethereum contract\.

```go
type RocketStorageRaw struct {
    Contract *RocketStorage // Generic contract binding to access the raw methods on
}
```

### func \(\*RocketStorageRaw\) [Call](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L140>)

```go
func (_RocketStorage *RocketStorageRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error
```

Call invokes the \(constant\) contract method with params as input values and sets the output to result\. The result type might be a single field for simple returns\, a slice of interfaces for anonymous returns and a struct for named returns\.

### func \(\*RocketStorageRaw\) [Transact](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L151>)

```go
func (_RocketStorage *RocketStorageRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error)
```

Transact invokes the \(paid\) contract method with params as input values\.

### func \(\*RocketStorageRaw\) [Transfer](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L146>)

```go
func (_RocketStorage *RocketStorageRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error)
```

Transfer initiates a plain transaction to move funds to the contract\, calling its default method if one is available\.

## type [RocketStorageSession](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L56-L60>)

RocketStorageSession is an auto generated Go binding around an Ethereum contract\, with pre\-set call and transact options\.

```go
type RocketStorageSession struct {
    Contract     *RocketStorage    // Generic contract binding to set the session for
    CallOpts     bind.CallOpts     // Call options to use throughout this session
    TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}
```

### func \(\*RocketStorageSession\) [DeleteAddress](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L401>)

```go
func (_RocketStorage *RocketStorageSession) DeleteAddress(_key [32]byte) (*types.Transaction, error)
```

DeleteAddress is a paid mutator transaction binding the contract method 0x0e14a376\.

Solidity: function deleteAddress\(bytes32 \_key\) returns\(\)

### func \(\*RocketStorageSession\) [DeleteBool](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L422>)

```go
func (_RocketStorage *RocketStorageSession) DeleteBool(_key [32]byte) (*types.Transaction, error)
```

DeleteBool is a paid mutator transaction binding the contract method 0x2c62ff2d\.

Solidity: function deleteBool\(bytes32 \_key\) returns\(\)

### func \(\*RocketStorageSession\) [DeleteBytes](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L443>)

```go
func (_RocketStorage *RocketStorageSession) DeleteBytes(_key [32]byte) (*types.Transaction, error)
```

DeleteBytes is a paid mutator transaction binding the contract method 0x616b59f6\.

Solidity: function deleteBytes\(bytes32 \_key\) returns\(\)

### func \(\*RocketStorageSession\) [DeleteBytes32](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L464>)

```go
func (_RocketStorage *RocketStorageSession) DeleteBytes32(_key [32]byte) (*types.Transaction, error)
```

DeleteBytes32 is a paid mutator transaction binding the contract method 0x0b9adc57\.

Solidity: function deleteBytes32\(bytes32 \_key\) returns\(\)

### func \(\*RocketStorageSession\) [DeleteInt](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L485>)

```go
func (_RocketStorage *RocketStorageSession) DeleteInt(_key [32]byte) (*types.Transaction, error)
```

DeleteInt is a paid mutator transaction binding the contract method 0x8c160095\.

Solidity: function deleteInt\(bytes32 \_key\) returns\(\)

### func \(\*RocketStorageSession\) [DeleteString](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L506>)

```go
func (_RocketStorage *RocketStorageSession) DeleteString(_key [32]byte) (*types.Transaction, error)
```

DeleteString is a paid mutator transaction binding the contract method 0xf6bb3cc4\.

Solidity: function deleteString\(bytes32 \_key\) returns\(\)

### func \(\*RocketStorageSession\) [DeleteUint](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L527>)

```go
func (_RocketStorage *RocketStorageSession) DeleteUint(_key [32]byte) (*types.Transaction, error)
```

DeleteUint is a paid mutator transaction binding the contract method 0xe2b202bf\.

Solidity: function deleteUint\(bytes32 \_key\) returns\(\)

### func \(\*RocketStorageSession\) [GetAddress](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L194>)

```go
func (_RocketStorage *RocketStorageSession) GetAddress(_key [32]byte) (common.Address, error)
```

GetAddress is a free data retrieval call binding the contract method 0x21f8a721\.

Solidity: function getAddress\(bytes32 \_key\) view returns\(address\)

### func \(\*RocketStorageSession\) [GetBool](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L225>)

```go
func (_RocketStorage *RocketStorageSession) GetBool(_key [32]byte) (bool, error)
```

GetBool is a free data retrieval call binding the contract method 0x7ae1cfca\.

Solidity: function getBool\(bytes32 \_key\) view returns\(bool\)

### func \(\*RocketStorageSession\) [GetBytes](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L256>)

```go
func (_RocketStorage *RocketStorageSession) GetBytes(_key [32]byte) ([]byte, error)
```

GetBytes is a free data retrieval call binding the contract method 0xc031a180\.

Solidity: function getBytes\(bytes32 \_key\) view returns\(bytes\)

### func \(\*RocketStorageSession\) [GetBytes32](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L287>)

```go
func (_RocketStorage *RocketStorageSession) GetBytes32(_key [32]byte) ([32]byte, error)
```

GetBytes32 is a free data retrieval call binding the contract method 0xa6ed563e\.

Solidity: function getBytes32\(bytes32 \_key\) view returns\(bytes32\)

### func \(\*RocketStorageSession\) [GetInt](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L318>)

```go
func (_RocketStorage *RocketStorageSession) GetInt(_key [32]byte) (*big.Int, error)
```

GetInt is a free data retrieval call binding the contract method 0xdc97d962\.

Solidity: function getInt\(bytes32 \_key\) view returns\(int256\)

### func \(\*RocketStorageSession\) [GetString](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L349>)

```go
func (_RocketStorage *RocketStorageSession) GetString(_key [32]byte) (string, error)
```

GetString is a free data retrieval call binding the contract method 0x986e791a\.

Solidity: function getString\(bytes32 \_key\) view returns\(string\)

### func \(\*RocketStorageSession\) [GetUint](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L380>)

```go
func (_RocketStorage *RocketStorageSession) GetUint(_key [32]byte) (*big.Int, error)
```

GetUint is a free data retrieval call binding the contract method 0xbd02d0f5\.

Solidity: function getUint\(bytes32 \_key\) view returns\(uint256\)

### func \(\*RocketStorageSession\) [SetAddress](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L548>)

```go
func (_RocketStorage *RocketStorageSession) SetAddress(_key [32]byte, _value common.Address) (*types.Transaction, error)
```

SetAddress is a paid mutator transaction binding the contract method 0xca446dd9\.

Solidity: function setAddress\(bytes32 \_key\, address \_value\) returns\(\)

### func \(\*RocketStorageSession\) [SetBool](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L569>)

```go
func (_RocketStorage *RocketStorageSession) SetBool(_key [32]byte, _value bool) (*types.Transaction, error)
```

SetBool is a paid mutator transaction binding the contract method 0xabfdcced\.

Solidity: function setBool\(bytes32 \_key\, bool \_value\) returns\(\)

### func \(\*RocketStorageSession\) [SetBytes](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L590>)

```go
func (_RocketStorage *RocketStorageSession) SetBytes(_key [32]byte, _value []byte) (*types.Transaction, error)
```

SetBytes is a paid mutator transaction binding the contract method 0x2e28d084\.

Solidity: function setBytes\(bytes32 \_key\, bytes \_value\) returns\(\)

### func \(\*RocketStorageSession\) [SetBytes32](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L611>)

```go
func (_RocketStorage *RocketStorageSession) SetBytes32(_key [32]byte, _value [32]byte) (*types.Transaction, error)
```

SetBytes32 is a paid mutator transaction binding the contract method 0x4e91db08\.

Solidity: function setBytes32\(bytes32 \_key\, bytes32 \_value\) returns\(\)

### func \(\*RocketStorageSession\) [SetInt](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L632>)

```go
func (_RocketStorage *RocketStorageSession) SetInt(_key [32]byte, _value *big.Int) (*types.Transaction, error)
```

SetInt is a paid mutator transaction binding the contract method 0x3e49bed0\.

Solidity: function setInt\(bytes32 \_key\, int256 \_value\) returns\(\)

### func \(\*RocketStorageSession\) [SetString](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L653>)

```go
func (_RocketStorage *RocketStorageSession) SetString(_key [32]byte, _value string) (*types.Transaction, error)
```

SetString is a paid mutator transaction binding the contract method 0x6e899550\.

Solidity: function setString\(bytes32 \_key\, string \_value\) returns\(\)

### func \(\*RocketStorageSession\) [SetUint](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L674>)

```go
func (_RocketStorage *RocketStorageSession) SetUint(_key [32]byte, _value *big.Int) (*types.Transaction, error)
```

SetUint is a paid mutator transaction binding the contract method 0xe2a4853a\.

Solidity: function setUint\(bytes32 \_key\, uint256 \_value\) returns\(\)

## type [RocketStorageTransactor](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L45-L47>)

RocketStorageTransactor is an auto generated write\-only Go binding around an Ethereum contract\.

```go
type RocketStorageTransactor struct {
    // contains filtered or unexported fields
}
```

### func [NewRocketStorageTransactor](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L110>)

```go
func NewRocketStorageTransactor(address common.Address, transactor bind.ContractTransactor) (*RocketStorageTransactor, error)
```

NewRocketStorageTransactor creates a new write\-only instance of RocketStorage\, bound to a specific deployed contract\.

### func \(\*RocketStorageTransactor\) [DeleteAddress](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L394>)

```go
func (_RocketStorage *RocketStorageTransactor) DeleteAddress(opts *bind.TransactOpts, _key [32]byte) (*types.Transaction, error)
```

DeleteAddress is a paid mutator transaction binding the contract method 0x0e14a376\.

Solidity: function deleteAddress\(bytes32 \_key\) returns\(\)

### func \(\*RocketStorageTransactor\) [DeleteBool](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L415>)

```go
func (_RocketStorage *RocketStorageTransactor) DeleteBool(opts *bind.TransactOpts, _key [32]byte) (*types.Transaction, error)
```

DeleteBool is a paid mutator transaction binding the contract method 0x2c62ff2d\.

Solidity: function deleteBool\(bytes32 \_key\) returns\(\)

### func \(\*RocketStorageTransactor\) [DeleteBytes](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L436>)

```go
func (_RocketStorage *RocketStorageTransactor) DeleteBytes(opts *bind.TransactOpts, _key [32]byte) (*types.Transaction, error)
```

DeleteBytes is a paid mutator transaction binding the contract method 0x616b59f6\.

Solidity: function deleteBytes\(bytes32 \_key\) returns\(\)

### func \(\*RocketStorageTransactor\) [DeleteBytes32](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L457>)

```go
func (_RocketStorage *RocketStorageTransactor) DeleteBytes32(opts *bind.TransactOpts, _key [32]byte) (*types.Transaction, error)
```

DeleteBytes32 is a paid mutator transaction binding the contract method 0x0b9adc57\.

Solidity: function deleteBytes32\(bytes32 \_key\) returns\(\)

### func \(\*RocketStorageTransactor\) [DeleteInt](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L478>)

```go
func (_RocketStorage *RocketStorageTransactor) DeleteInt(opts *bind.TransactOpts, _key [32]byte) (*types.Transaction, error)
```

DeleteInt is a paid mutator transaction binding the contract method 0x8c160095\.

Solidity: function deleteInt\(bytes32 \_key\) returns\(\)

### func \(\*RocketStorageTransactor\) [DeleteString](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L499>)

```go
func (_RocketStorage *RocketStorageTransactor) DeleteString(opts *bind.TransactOpts, _key [32]byte) (*types.Transaction, error)
```

DeleteString is a paid mutator transaction binding the contract method 0xf6bb3cc4\.

Solidity: function deleteString\(bytes32 \_key\) returns\(\)

### func \(\*RocketStorageTransactor\) [DeleteUint](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L520>)

```go
func (_RocketStorage *RocketStorageTransactor) DeleteUint(opts *bind.TransactOpts, _key [32]byte) (*types.Transaction, error)
```

DeleteUint is a paid mutator transaction binding the contract method 0xe2b202bf\.

Solidity: function deleteUint\(bytes32 \_key\) returns\(\)

### func \(\*RocketStorageTransactor\) [SetAddress](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L541>)

```go
func (_RocketStorage *RocketStorageTransactor) SetAddress(opts *bind.TransactOpts, _key [32]byte, _value common.Address) (*types.Transaction, error)
```

SetAddress is a paid mutator transaction binding the contract method 0xca446dd9\.

Solidity: function setAddress\(bytes32 \_key\, address \_value\) returns\(\)

### func \(\*RocketStorageTransactor\) [SetBool](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L562>)

```go
func (_RocketStorage *RocketStorageTransactor) SetBool(opts *bind.TransactOpts, _key [32]byte, _value bool) (*types.Transaction, error)
```

SetBool is a paid mutator transaction binding the contract method 0xabfdcced\.

Solidity: function setBool\(bytes32 \_key\, bool \_value\) returns\(\)

### func \(\*RocketStorageTransactor\) [SetBytes](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L583>)

```go
func (_RocketStorage *RocketStorageTransactor) SetBytes(opts *bind.TransactOpts, _key [32]byte, _value []byte) (*types.Transaction, error)
```

SetBytes is a paid mutator transaction binding the contract method 0x2e28d084\.

Solidity: function setBytes\(bytes32 \_key\, bytes \_value\) returns\(\)

### func \(\*RocketStorageTransactor\) [SetBytes32](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L604>)

```go
func (_RocketStorage *RocketStorageTransactor) SetBytes32(opts *bind.TransactOpts, _key [32]byte, _value [32]byte) (*types.Transaction, error)
```

SetBytes32 is a paid mutator transaction binding the contract method 0x4e91db08\.

Solidity: function setBytes32\(bytes32 \_key\, bytes32 \_value\) returns\(\)

### func \(\*RocketStorageTransactor\) [SetInt](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L625>)

```go
func (_RocketStorage *RocketStorageTransactor) SetInt(opts *bind.TransactOpts, _key [32]byte, _value *big.Int) (*types.Transaction, error)
```

SetInt is a paid mutator transaction binding the contract method 0x3e49bed0\.

Solidity: function setInt\(bytes32 \_key\, int256 \_value\) returns\(\)

### func \(\*RocketStorageTransactor\) [SetString](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L646>)

```go
func (_RocketStorage *RocketStorageTransactor) SetString(opts *bind.TransactOpts, _key [32]byte, _value string) (*types.Transaction, error)
```

SetString is a paid mutator transaction binding the contract method 0x6e899550\.

Solidity: function setString\(bytes32 \_key\, string \_value\) returns\(\)

### func \(\*RocketStorageTransactor\) [SetUint](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L667>)

```go
func (_RocketStorage *RocketStorageTransactor) SetUint(opts *bind.TransactOpts, _key [32]byte, _value *big.Int) (*types.Transaction, error)
```

SetUint is a paid mutator transaction binding the contract method 0xe2a4853a\.

Solidity: function setUint\(bytes32 \_key\, uint256 \_value\) returns\(\)

## type [RocketStorageTransactorRaw](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L87-L89>)

RocketStorageTransactorRaw is an auto generated low\-level write\-only Go binding around an Ethereum contract\.

```go
type RocketStorageTransactorRaw struct {
    Contract *RocketStorageTransactor // Generic write-only contract binding to access the raw methods on
}
```

### func \(\*RocketStorageTransactorRaw\) [Transact](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L170>)

```go
func (_RocketStorage *RocketStorageTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error)
```

Transact invokes the \(paid\) contract method with params as input values\.

### func \(\*RocketStorageTransactorRaw\) [Transfer](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L165>)

```go
func (_RocketStorage *RocketStorageTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error)
```

Transfer initiates a plain transaction to move funds to the contract\, calling its default method if one is available\.

## type [RocketStorageTransactorSession](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L71-L74>)

RocketStorageTransactorSession is an auto generated write\-only Go binding around an Ethereum contract\, with pre\-set transact options\.

```go
type RocketStorageTransactorSession struct {
    Contract     *RocketStorageTransactor // Generic contract transactor binding to set the session for
    TransactOpts bind.TransactOpts        // Transaction auth options to use throughout this session
}
```

### func \(\*RocketStorageTransactorSession\) [DeleteAddress](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L408>)

```go
func (_RocketStorage *RocketStorageTransactorSession) DeleteAddress(_key [32]byte) (*types.Transaction, error)
```

DeleteAddress is a paid mutator transaction binding the contract method 0x0e14a376\.

Solidity: function deleteAddress\(bytes32 \_key\) returns\(\)

### func \(\*RocketStorageTransactorSession\) [DeleteBool](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L429>)

```go
func (_RocketStorage *RocketStorageTransactorSession) DeleteBool(_key [32]byte) (*types.Transaction, error)
```

DeleteBool is a paid mutator transaction binding the contract method 0x2c62ff2d\.

Solidity: function deleteBool\(bytes32 \_key\) returns\(\)

### func \(\*RocketStorageTransactorSession\) [DeleteBytes](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L450>)

```go
func (_RocketStorage *RocketStorageTransactorSession) DeleteBytes(_key [32]byte) (*types.Transaction, error)
```

DeleteBytes is a paid mutator transaction binding the contract method 0x616b59f6\.

Solidity: function deleteBytes\(bytes32 \_key\) returns\(\)

### func \(\*RocketStorageTransactorSession\) [DeleteBytes32](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L471>)

```go
func (_RocketStorage *RocketStorageTransactorSession) DeleteBytes32(_key [32]byte) (*types.Transaction, error)
```

DeleteBytes32 is a paid mutator transaction binding the contract method 0x0b9adc57\.

Solidity: function deleteBytes32\(bytes32 \_key\) returns\(\)

### func \(\*RocketStorageTransactorSession\) [DeleteInt](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L492>)

```go
func (_RocketStorage *RocketStorageTransactorSession) DeleteInt(_key [32]byte) (*types.Transaction, error)
```

DeleteInt is a paid mutator transaction binding the contract method 0x8c160095\.

Solidity: function deleteInt\(bytes32 \_key\) returns\(\)

### func \(\*RocketStorageTransactorSession\) [DeleteString](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L513>)

```go
func (_RocketStorage *RocketStorageTransactorSession) DeleteString(_key [32]byte) (*types.Transaction, error)
```

DeleteString is a paid mutator transaction binding the contract method 0xf6bb3cc4\.

Solidity: function deleteString\(bytes32 \_key\) returns\(\)

### func \(\*RocketStorageTransactorSession\) [DeleteUint](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L534>)

```go
func (_RocketStorage *RocketStorageTransactorSession) DeleteUint(_key [32]byte) (*types.Transaction, error)
```

DeleteUint is a paid mutator transaction binding the contract method 0xe2b202bf\.

Solidity: function deleteUint\(bytes32 \_key\) returns\(\)

### func \(\*RocketStorageTransactorSession\) [SetAddress](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L555>)

```go
func (_RocketStorage *RocketStorageTransactorSession) SetAddress(_key [32]byte, _value common.Address) (*types.Transaction, error)
```

SetAddress is a paid mutator transaction binding the contract method 0xca446dd9\.

Solidity: function setAddress\(bytes32 \_key\, address \_value\) returns\(\)

### func \(\*RocketStorageTransactorSession\) [SetBool](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L576>)

```go
func (_RocketStorage *RocketStorageTransactorSession) SetBool(_key [32]byte, _value bool) (*types.Transaction, error)
```

SetBool is a paid mutator transaction binding the contract method 0xabfdcced\.

Solidity: function setBool\(bytes32 \_key\, bool \_value\) returns\(\)

### func \(\*RocketStorageTransactorSession\) [SetBytes](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L597>)

```go
func (_RocketStorage *RocketStorageTransactorSession) SetBytes(_key [32]byte, _value []byte) (*types.Transaction, error)
```

SetBytes is a paid mutator transaction binding the contract method 0x2e28d084\.

Solidity: function setBytes\(bytes32 \_key\, bytes \_value\) returns\(\)

### func \(\*RocketStorageTransactorSession\) [SetBytes32](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L618>)

```go
func (_RocketStorage *RocketStorageTransactorSession) SetBytes32(_key [32]byte, _value [32]byte) (*types.Transaction, error)
```

SetBytes32 is a paid mutator transaction binding the contract method 0x4e91db08\.

Solidity: function setBytes32\(bytes32 \_key\, bytes32 \_value\) returns\(\)

### func \(\*RocketStorageTransactorSession\) [SetInt](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L639>)

```go
func (_RocketStorage *RocketStorageTransactorSession) SetInt(_key [32]byte, _value *big.Int) (*types.Transaction, error)
```

SetInt is a paid mutator transaction binding the contract method 0x3e49bed0\.

Solidity: function setInt\(bytes32 \_key\, int256 \_value\) returns\(\)

### func \(\*RocketStorageTransactorSession\) [SetString](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L660>)

```go
func (_RocketStorage *RocketStorageTransactorSession) SetString(_key [32]byte, _value string) (*types.Transaction, error)
```

SetString is a paid mutator transaction binding the contract method 0x6e899550\.

Solidity: function setString\(bytes32 \_key\, string \_value\) returns\(\)

### func \(\*RocketStorageTransactorSession\) [SetUint](<https://github.com/rocket-pool/rocketpool-go/blob/release/contracts/rocket-storage.go#L681>)

```go
func (_RocketStorage *RocketStorageTransactorSession) SetUint(_key [32]byte, _value *big.Int) (*types.Transaction, error)
```

SetUint is a paid mutator transaction binding the contract method 0xe2a4853a\.

Solidity: function setUint\(bytes32 \_key\, uint256 \_value\) returns\(\)

