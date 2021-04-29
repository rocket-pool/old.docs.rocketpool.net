# Deposit

<br>

## Overview

The `deposit` module is used to get the current deposit pool balance, make user deposits, and assign deposited ETH to minipools.


<br>

## Methods

* `deposit.getBalance()`:
    Get the current balance of the deposit pool in wei; returns `Promise<string>`

* `deposit.deposit(options, onConfirmation)`:
    Make a user deposit; returns `Promise<TransactionReceipt>`

* `deposit.assignDeposits(options, onConfirmation)`:
    Assign deposited ETH to queued minipools; returns `Promise<TransactionReceipt>`