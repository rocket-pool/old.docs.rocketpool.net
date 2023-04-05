# The Minipool Delegate

Every validator you run has a **minipool** contract as its "owner" so-to-speak.
The minipool is a unique contract specifically assigned to that validator; it acts as its **withdrawal address**.
All reward and staking balance withdrawals from the Beacon Chain will be sent to the minipool contract.

Each minipool is unique to ensure that you (the node operator) have ultimate control over it.
Nobody else controls it, nobody else can change it; it's entirely at your command.

That being said, in order to minimize gas costs during node deposits, the minipool *itself* contains very little actual functionality.
Almost everything it can do is deferred to a **delegate** contract.

The minipool delegate contract is a special contract that contains the bulk of the logic required by minipools - things like fairly distributing the balance between you and the pool stakers, for example.
Unlike minipools, where each minipool is a unique contract, the delegate is a single contract that many minipools can "forward" requests to.

Occasionally, the Rocket Pool development team will publish a new minipool delegate that adds new functionality.
For example, in the Atlas update, we introduced a new delegate that had support for distributing skimmed rewards without needing to close the minipool.

Minipool can have their delegates upgraded to take advantage of this new functionality.
Delegate upgrades are **opt-in**, so you can decide if and when you want to use them.
That being said, they are usually required in order to take advantage of new functionality that network upgrades introduce.


### Upgrading your Delegate

To upgrade a minipool to a new delegate contract, simply run the following command:

```
rocketpool minipool delegate-upgrade
```

This will present you with a list of your minipools that are not currently using the latest delegate and are eligible for upgrading:

```
Please select a minipool to upgrade:
1: All available minipools
2: 0x7e5702a2cE66B5B35E59B9Ac00eEAAa547881e40 (using delegate 0x5c2D33A015D132D4f590f00df807Bb1052531ab9)
3: 0x7E5703fdA638CD86c316B9EbAF76927fF695ADC5 (using delegate 0x5c2D33A015D132D4f590f00df807Bb1052531ab9)
4: 0x7E5704aD2a63eb90880426Dcd4a3811246dF3cB0 (using delegate 0x5c2D33A015D132D4f590f00df807Bb1052531ab9)
5: 0x7E5705c149D11efc951fFc20349D7A96bc6b819C (using delegate 0x5c2D33A015D132D4f590f00df807Bb1052531ab9)
6: 0x7E570625cE8F586c90ACa7fe8792EeAA79751778 (using delegate 0x5c2D33A015D132D4f590f00df807Bb1052531ab9)
7: 0x7E5700c82E38434C6c72890bb82f5B5305f4328a (using delegate 0x6aCEA7f89574Dd8BC6ffDfDca1965A3d756d5B20)
```

Select the one(s) you would like to upgrade from the list by entering the corresponding number on the left of the minipool address.
Once selected, you will be prompted to confirm your gas price settings, and after that a transaction to upgrade the minipool will be sent:

```
Using a max fee of 26.00 gwei and a priority fee of 2.00 gwei.
Are you sure you want to upgrade 1 minipools? [y/n]
y

Upgrading minipool 0x7e5702a2cE66B5B35E59B9Ac00eEAAa547881e40...
Transaction has been submitted with hash 0xcd91c9a38f3438c3d8a45bb5f439014e5935dcb50b0704f3c5077f54174e99bb.
Waiting for the transaction to be included in a block... you may wait here for it, or press CTRL+C to exit and return to the terminal.

Successfully upgraded minipool 0x7e5702a2cE66B5B35E59B9Ac00eEAAa547881e40.
```

You can verify that it's using the latest delegate with `rocketpool minipool status`.
Any minipools that are *not* using the latest delegate will have a yellow notification under their status letting you know that they can be upgraded:

```
Address:              0x7E5703fdA638CD86c316B9EbAF76927fF695ADC5
Penalties:            0
...
Delegate address:      0x5c2D33A015D132D4f590f00df807Bb1052531ab9
Rollback delegate:     <none>
Effective delegate:    0x5c2D33A015D132D4f590f00df807Bb1052531ab9
*Minipool can be upgraded to delegate 0x149aE025fFC7E7bbcCc8d373d56797D637bF5D33!
```
