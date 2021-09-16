# types

```go
import "github.com/rocket-pool/rocketpool-go/types"
```

## Index

- [Constants](<#constants>)
- [Variables](<#variables>)
- [type MinipoolDeposit](<#type-minipooldeposit>)
  - [func StringToMinipoolDeposit(value string) (MinipoolDeposit, error)](<#func-stringtominipooldeposit>)
  - [func (d MinipoolDeposit) MarshalJSON() ([]byte, error)](<#func-minipooldeposit-marshaljson>)
  - [func (d MinipoolDeposit) String() string](<#func-minipooldeposit-string>)
  - [func (d *MinipoolDeposit) UnmarshalJSON(data []byte) error](<#func-minipooldeposit-unmarshaljson>)
- [type MinipoolStatus](<#type-minipoolstatus>)
  - [func StringToMinipoolStatus(value string) (MinipoolStatus, error)](<#func-stringtominipoolstatus>)
  - [func (s MinipoolStatus) MarshalJSON() ([]byte, error)](<#func-minipoolstatus-marshaljson>)
  - [func (s MinipoolStatus) String() string](<#func-minipoolstatus-string>)
  - [func (s *MinipoolStatus) UnmarshalJSON(data []byte) error](<#func-minipoolstatus-unmarshaljson>)
- [type ProposalState](<#type-proposalstate>)
  - [func StringToProposalState(value string) (ProposalState, error)](<#func-stringtoproposalstate>)
  - [func (s ProposalState) MarshalJSON() ([]byte, error)](<#func-proposalstate-marshaljson>)
  - [func (s ProposalState) String() string](<#func-proposalstate-string>)
  - [func (s *ProposalState) UnmarshalJSON(data []byte) error](<#func-proposalstate-unmarshaljson>)
- [type ValidatorPubkey](<#type-validatorpubkey>)
  - [func BytesToValidatorPubkey(value []byte) ValidatorPubkey](<#func-bytestovalidatorpubkey>)
  - [func HexToValidatorPubkey(value string) (ValidatorPubkey, error)](<#func-hextovalidatorpubkey>)
  - [func (v ValidatorPubkey) Bytes() []byte](<#func-validatorpubkey-bytes>)
  - [func (v ValidatorPubkey) Hex() string](<#func-validatorpubkey-hex>)
  - [func (v ValidatorPubkey) MarshalJSON() ([]byte, error)](<#func-validatorpubkey-marshaljson>)
  - [func (v ValidatorPubkey) String() string](<#func-validatorpubkey-string>)
  - [func (v *ValidatorPubkey) UnmarshalJSON(data []byte) error](<#func-validatorpubkey-unmarshaljson>)
- [type ValidatorSignature](<#type-validatorsignature>)
  - [func BytesToValidatorSignature(value []byte) ValidatorSignature](<#func-bytestovalidatorsignature>)
  - [func HexToValidatorSignature(value string) (ValidatorSignature, error)](<#func-hextovalidatorsignature>)
  - [func (v ValidatorSignature) Bytes() []byte](<#func-validatorsignature-bytes>)
  - [func (v ValidatorSignature) Hex() string](<#func-validatorsignature-hex>)
  - [func (v ValidatorSignature) MarshalJSON() ([]byte, error)](<#func-validatorsignature-marshaljson>)
  - [func (v ValidatorSignature) String() string](<#func-validatorsignature-string>)
  - [func (v *ValidatorSignature) UnmarshalJSON(data []byte) error](<#func-validatorsignature-unmarshaljson>)


## Constants

Validator pubkey

```go
const ValidatorPubkeyLength = 48 // bytes
```

Validator signature

```go
const ValidatorSignatureLength = 96 // bytes
```

## Variables

```go
var MinipoolDepositTypes = []string{"None", "Full", "Half", "Empty"}
```

```go
var MinipoolStatuses = []string{"Initialized", "Prelaunch", "Staking", "Withdrawable", "Dissolved"}
```

```go
var ProposalStates = []string{"Pending", "Active", "Cancelled", "Defeated", "Succeeded", "Expired", "Executed"}
```

## type [MinipoolDeposit](<https://github.com/rocket-pool/rocketpool-go/blob/release/types/minipool.go#L52>)

Minipool deposit types

```go
type MinipoolDeposit uint8
```

```go
const (
    None MinipoolDeposit = iota
    Full
    Half
    Empty
)
```

### func [StringToMinipoolDeposit](<https://github.com/rocket-pool/rocketpool-go/blob/release/types/minipool.go#L67>)

```go
func StringToMinipoolDeposit(value string) (MinipoolDeposit, error)
```

### func \(MinipoolDeposit\) [MarshalJSON](<https://github.com/rocket-pool/rocketpool-go/blob/release/types/minipool.go#L76>)

```go
func (d MinipoolDeposit) MarshalJSON() ([]byte, error)
```

JSON encoding

### func \(MinipoolDeposit\) [String](<https://github.com/rocket-pool/rocketpool-go/blob/release/types/minipool.go#L63>)

```go
func (d MinipoolDeposit) String() string
```

String conversion

### func \(\*MinipoolDeposit\) [UnmarshalJSON](<https://github.com/rocket-pool/rocketpool-go/blob/release/types/minipool.go#L83>)

```go
func (d *MinipoolDeposit) UnmarshalJSON(data []byte) error
```

## type [MinipoolStatus](<https://github.com/rocket-pool/rocketpool-go/blob/release/types/minipool.go#L10>)

Minipool statuses

```go
type MinipoolStatus uint8
```

```go
const (
    Initialized MinipoolStatus = iota
    Prelaunch
    Staking
    Withdrawable
    Dissolved
)
```

### func [StringToMinipoolStatus](<https://github.com/rocket-pool/rocketpool-go/blob/release/types/minipool.go#L26>)

```go
func StringToMinipoolStatus(value string) (MinipoolStatus, error)
```

### func \(MinipoolStatus\) [MarshalJSON](<https://github.com/rocket-pool/rocketpool-go/blob/release/types/minipool.go#L35>)

```go
func (s MinipoolStatus) MarshalJSON() ([]byte, error)
```

JSON encoding

### func \(MinipoolStatus\) [String](<https://github.com/rocket-pool/rocketpool-go/blob/release/types/minipool.go#L22>)

```go
func (s MinipoolStatus) String() string
```

String conversion

### func \(\*MinipoolStatus\) [UnmarshalJSON](<https://github.com/rocket-pool/rocketpool-go/blob/release/types/minipool.go#L42>)

```go
func (s *MinipoolStatus) UnmarshalJSON(data []byte) error
```

## type [ProposalState](<https://github.com/rocket-pool/rocketpool-go/blob/release/types/dao.go#L10>)

DAO proposal states

```go
type ProposalState uint8
```

```go
const (
    Pending ProposalState = iota
    Active
    Cancelled
    Defeated
    Succeeded
    Expired
    Executed
)
```

### func [StringToProposalState](<https://github.com/rocket-pool/rocketpool-go/blob/release/types/dao.go#L28>)

```go
func StringToProposalState(value string) (ProposalState, error)
```

### func \(ProposalState\) [MarshalJSON](<https://github.com/rocket-pool/rocketpool-go/blob/release/types/dao.go#L37>)

```go
func (s ProposalState) MarshalJSON() ([]byte, error)
```

JSON encoding

### func \(ProposalState\) [String](<https://github.com/rocket-pool/rocketpool-go/blob/release/types/dao.go#L24>)

```go
func (s ProposalState) String() string
```

String conversion

### func \(\*ProposalState\) [UnmarshalJSON](<https://github.com/rocket-pool/rocketpool-go/blob/release/types/dao.go#L44>)

```go
func (s *ProposalState) UnmarshalJSON(data []byte) error
```

## type [ValidatorPubkey](<https://github.com/rocket-pool/rocketpool-go/blob/release/types/beacon.go#L13>)

```go
type ValidatorPubkey [ValidatorPubkeyLength]byte
```

### func [BytesToValidatorPubkey](<https://github.com/rocket-pool/rocketpool-go/blob/release/types/beacon.go#L20>)

```go
func BytesToValidatorPubkey(value []byte) ValidatorPubkey
```

### func [HexToValidatorPubkey](<https://github.com/rocket-pool/rocketpool-go/blob/release/types/beacon.go#L34>)

```go
func HexToValidatorPubkey(value string) (ValidatorPubkey, error)
```

### func \(ValidatorPubkey\) [Bytes](<https://github.com/rocket-pool/rocketpool-go/blob/release/types/beacon.go#L17>)

```go
func (v ValidatorPubkey) Bytes() []byte
```

Bytes conversion

### func \(ValidatorPubkey\) [Hex](<https://github.com/rocket-pool/rocketpool-go/blob/release/types/beacon.go#L28>)

```go
func (v ValidatorPubkey) Hex() string
```

String conversion

### func \(ValidatorPubkey\) [MarshalJSON](<https://github.com/rocket-pool/rocketpool-go/blob/release/types/beacon.go#L47>)

```go
func (v ValidatorPubkey) MarshalJSON() ([]byte, error)
```

JSON encoding

### func \(ValidatorPubkey\) [String](<https://github.com/rocket-pool/rocketpool-go/blob/release/types/beacon.go#L31>)

```go
func (v ValidatorPubkey) String() string
```

### func \(\*ValidatorPubkey\) [UnmarshalJSON](<https://github.com/rocket-pool/rocketpool-go/blob/release/types/beacon.go#L50>)

```go
func (v *ValidatorPubkey) UnmarshalJSON(data []byte) error
```

## type [ValidatorSignature](<https://github.com/rocket-pool/rocketpool-go/blob/release/types/beacon.go#L61>)

```go
type ValidatorSignature [ValidatorSignatureLength]byte
```

### func [BytesToValidatorSignature](<https://github.com/rocket-pool/rocketpool-go/blob/release/types/beacon.go#L68>)

```go
func BytesToValidatorSignature(value []byte) ValidatorSignature
```

### func [HexToValidatorSignature](<https://github.com/rocket-pool/rocketpool-go/blob/release/types/beacon.go#L82>)

```go
func HexToValidatorSignature(value string) (ValidatorSignature, error)
```

### func \(ValidatorSignature\) [Bytes](<https://github.com/rocket-pool/rocketpool-go/blob/release/types/beacon.go#L65>)

```go
func (v ValidatorSignature) Bytes() []byte
```

Bytes conversion

### func \(ValidatorSignature\) [Hex](<https://github.com/rocket-pool/rocketpool-go/blob/release/types/beacon.go#L76>)

```go
func (v ValidatorSignature) Hex() string
```

String conversion

### func \(ValidatorSignature\) [MarshalJSON](<https://github.com/rocket-pool/rocketpool-go/blob/release/types/beacon.go#L95>)

```go
func (v ValidatorSignature) MarshalJSON() ([]byte, error)
```

JSON encoding

### func \(ValidatorSignature\) [String](<https://github.com/rocket-pool/rocketpool-go/blob/release/types/beacon.go#L79>)

```go
func (v ValidatorSignature) String() string
```

### func \(\*ValidatorSignature\) [UnmarshalJSON](<https://github.com/rocket-pool/rocketpool-go/blob/release/types/beacon.go#L98>)

```go
func (v *ValidatorSignature) UnmarshalJSON(data []byte) error
```

