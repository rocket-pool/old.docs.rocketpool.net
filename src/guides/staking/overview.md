# Staking Overview

## How ETH2 Staking Works

As a reminder, staking on the [Beacon Chain](https://ethereum.org/en/eth2/beacon-chain/) (ETH2) is done via **validators**.
A validator is a single ETH2 address, to which 32 ETH was deposited, which is now responsible for helping maintain the consistency and security of the Beacon Chain.
They do this by listening for transactions and new block proposals, and **attesting** that the proposed block contains legal, valid transactions by doing some number crunching and verification behind the scenes.
Occasionally, they get to propose new blocks themselves. 

Validators in ETH2 are assigned attestations and block proposals **on a schedule**.
This is very different from ETH1's proof of work system, where everyone is constantly trying to race each other and come up with the next block before everyone else.
This means that unlike ETH1 where a miner isn't guaranteed to earn a block reward unless they find the next block, ETH2 validators are guaranteed to have slow, steady income as long as they perform their duties.
If a validator is offline and misses an attestation or a block proposal, it will be **slightly penalized**.
The penalties are quite small though; as a rule of thumb, if a validator is offline for X hours, it will make all of its lost ETH back after the same X hours of being back online.

ETH2 validators are rewarded for attestations and block proposals, but **those rewards stay on the ETH2 chain**.
There is no way to retrieve them back on the ETH1 chain right now, so unlike mining, operators will not be given ETH slowly over time to use as they see fit.
Instead, validators will simply accrue larger and larger balances over time, but their operators won't be able to access it until they **voluntarily exit** the validator (or get **slashed** for attempting to attack the network).
Both of these actions will retire it from its duties and return the balance back to the operator on the ETH1 chain.
Note that *this is not currently possible until the ETH1 and ETH2 chains merge, and withdrawals have been implemented*.


## How Rocket Pool Works

Unlike solo stakers, who are required to put 32 ETH up for deposit to create a new validator, Rocket Pool nodes only need to deposit 16 ETH per validator.
This will be coupled with 16 ETH from the staking pool (which stakers deposited in exchange for rETH) to create a new ETH2 validator.
This new validator is called a **minipool**.

To the Beacon chain, a minipool looks exactly the same as a normal validator.
It has the same responsibilities, same rules it must follow, same rewards, and so on.
The only difference is in how the minipool was created on the ETH1 chain, and how withdrawals work when the node operator decides to voluntarily exit the minipool or gets slashed.
All of the creation, withdrawing, and rewards delegation is handled by Rocket Pool's **smart contracts** on the ETH1 chain.
This makes it completely decentralized.


## The rETH Token

As a Rocket Pool staker, your role is to deposit ETH into the deposit pool which will enable a node operator to create a new Beacon Chain validator.
You can stake at little as **0.01 ETH**.

In doing so, you will be given a token called **rETH**. rETH represents both **how much** ETH you deposited, and **when** you deposited it.
The value of rETH is determined by the following ratio:

```
ETH:rETH ratio = (amount of ETH staked on ETH1) / (total validator balance on ETH2)
```

As a simple example, say you stake at the very beginning when 1 ETH = 1 rETH.
You deposit 10 ETH and receive 10 rETH back.

After a few years, the balances on the Beacon Chain grow due to validator rewards.
Say 128 ETH had been staked with Rocket Pool and the sum of all validator balances on ETH2 was 160 ETH.
Then 1 ETH would be worth (128/160) = 0.8 rETH; conversely, 1 rETH would be worth (160/128) = 1.25 ETH.

At this point, you could trade your 10 rETH back to Rocket Pool's smart contracts and receive 12.5 ETH in return.

::: warning NOTE
Trading rETH back for ETH is only possible when the staking pool has enough ETH in it to handle your trade.
ETH in this pool comes from two sources:

1. ETH that other stakers have deposited, which hasn't been used by a node operator to create a new validator yet
2. ETH that was returned by a node operator after they exited one of their validators and received their rewards from the Beacon Chain (**note that this is not possible until after the ETH1-ETH2 Merge occurs and withdrawals are enabled**)

It's possible that if node operators have put all of the staking pool to work on the Beacon chain, then the liquidity pool won't have enough balance to cover your unstaking.
In this scenario, you may find other ways to trade your rETH back to ETH (such as a decentralized exchange like [Uniswap](https://app.uniswap.org/#/swap)) - though they will likely come with a small premium.
:::

As an alternative to holding onto and eventually returning your rETH to the Rocket Pool, you are also free to **use it in DeFi applications**.
You can trade it, lend it, use it as collateral... as rETH is a standard ERC20 token, you can use it in any way you could use any other token.


## Tax Implications

Each country has their own tax laws, and it would be impossible to document them all here.  
In some countries, depositing ETH for rETH may be considered **a taxable event**.  
Tax laws related to crypotcurrencies are in their infancy; each user should do their own research and consider speaking with a tax professional.  

Below are some helpful sites that offer tax assistance to users related to Ethereum.
**This is not an official endorsement - users are advised to do their own research regarding tax implications and strategies**:
 - [https://koinly.io/](https://koinly.io/)
 - [https://cryptotaxcalculator.io/](https://cryptotaxcalculator.io/)

If you understand the responsibilities and terms associated with Rocket Pool staking and would like to be walked through the process, move ahead to the next page.