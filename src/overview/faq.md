---
permalink: /overview/faq
---
# :thinking: Frequently Asked Questions

This FAQ section aims to compliment the [explainer series of articles](/overview/explainer-series) with concise answers to common questions we receive.

![Rocket Pool FAQs](/images/headers/faq.png)

## General

[**What is Proof of Stake?**](#what-is-proof-of-stake)  
*A brief overview of what Proof of Stake is and why it is awesome.*

[**What does Rocket Pool do?**](#what-does-rocket-pool-do)  
*A quick introduction into what Rocket Pool actually does.*

[**Why would I need to use it?**](#why-would-i-need-to-use-it)  
*Good question and hopefully even better answers.*

[**How does it work?**](#how-does-it-work)  
*Smart contracts, smart nodes & decentralised infrastructure.*

[**Protocol vs Staking as a Service (SaaS) provider?**](#protocol-vs-staking-as-a-service-saas-provider)  
*Protocols can be used by everyone, from regular users to professional SaaS providers.*

[**What tokens does Rocket Pool use?**](#what-tokens-does-rocket-pool-use)  
*We use three tokens. RPL, rETH and nETH. Find out more here.*

[**Who's making it?**](#who-s-making-it)  
*It not aliens or lizard people. Well, fairly sure anyway.*  

## Staking

[**What is the minimum deposit to get rETH?**](#t)  
*I’ll save you a scroll, it’s 0.01 ETH.*

[**What is the maximum deposit?**](#r)  
*I’ll save you another scroll, there is no limit.*

[**What are the staking periods?**](#t)  
*None for both stakers and node operators. Come and go as you please.*

[**How much does it cost to stake with Rocket Pool?**](#t)  
*If we could do it for free, we would :)*

[**How do you keep my funds safe?**](#t)  
*Our top priority! We have lots of features in place.*

[**How are rewards generated on a deposit? What is the return?**](#t)  
*OK, expect your mind to be blown.*

[**How can I access my deposit + rewards before ETH2 Phase 2?**](#t)  
*I heard something about withdrawals not being allowed for a while...*

[**What is a decentralized staking network?**](#t)  
*It is a very good idea to be part of a decentralised staking network.*

[**Are your smart contracts audited and open source?**](#t)  
*For sure! Audits and bug bounties coming out the wazoo.*


---

### What is Proof of Stake?

Proof of Stake is a consensus protocol used in Ethereum 2.0. It is different to the Proof of Work (PoW) protocol, which you may have heard of before, because Bitcoin uses PoW. With a decentralised blockchain, these consensus protocols help keep everyone on the same page, so we all know what transactions have been processed and in what order.

Ethereum currently has a Proof of Stake (PoS) chain called the beacon chain, which is faster, more energy efficient and more decentralised than PoW. It's powered by users depositing ETH and providing an Ethereum node online 24/7 to perform the required validation. As a reward for providing the node, the beacon chain gives node operators additional ETH on top of their deposits. It can be viewed similarly to earning interest in a bank account, with the exception these rewards are generated in return for helping secure the network.

### What does Rocket Pool do?

Rocket Pool is the base layer protocol for decentralised and trustless ETH2 staking.

Designed to support stakers of all shapes and sizes, Rocket Pool was built with the intent to allow anyone to trustlessly stake as little as **0.01** ETH to a network of decentralised node operators with full autonomy underpinned by RPL collateral. You can stake **ETH** by trading it for **rETH**, a [token which gains staking rewards over time](https://medium.com/rocket-pool/rocket-pool-2-5-tokenised-staking-48601d52d924#92b0) based on the performance of an entire network of decentralised node operators. You can also stake **16 ETH** as a node operator in the protocol, earn rewards on your own stake fee free + earn commissions & RPL rewards from the network, generating a higher ROI by staking in the protocol vs staking outside of it as a solo node operator. 

### Why would I need to use it?

Rocket Pool removes several high barriers to entry that exist with Proof of Stake on the Ethereum 2.0 for both individuals, groups and businesses.

- The beacon chain requires a deposit of at least **32 ETH**. Rocket Pool will allow anyone to earn rewards on deposits as small as **0.01 ETH**.

- Depositing ETH with the beacon chain will also require the user to have knowledge on how to interact with smart contracts. Rocket Pool handles all interactions with the beacon chain for you.

- Ethereum 2.0 is being rolled out over several phases. Depositing during the early phase 0 or 1 means your deposit is locked until phase 2 arrives which could be several years. With Rocket Pool you instantly get our rETH token when depositing, this is a tokenised staking deposit which gains rewards over time and doesn't need to be locked with us. It can be traded/sold/held at anytime providing our users with liquidity. It can also be traded back to Rocket Pool for ETH + rewards at anytime if there is liquidity available, no need to wait years.

- The beacon chain will require a user who makes a deposit to be technically proficient at running an Ethereum node 24/7 and keeping that node online + secure. Rocket Pool has a decentralised network of independent Ethereum node operators that provide this service.

- The beacon chain will penalise users who make a deposit but fail to keep their node online. Rocket Pool socialises any penalties or losses that occur on nodes across the whole network which minimises the effect greatly for any single user.

- Some users may be confident in running their own node but do not have the 32 ETH required for the deposit. If they join Rocket Pool's decentralised network of Ethereum node operators, they only need 16 ETH minimum to solo stake. They also get the added benefit of receiving extra income from the network for providing this service which generates a higher ROI than staking solo.

### How does it work?

Hold tight, this is a meaty one! The protocol is primarily composed of 3 main elements, Smart Contracts, the Smart Node Network and Minipool Validators.

- Our Smart Contracts accept ETH deposits, assign them to node operators with staking commission rates based on current node operator demand and also issue + track various tokens. 

- Our Smart Node Network is a decentralised network of special Ethereum nodes that run our Smart Node software. They feature custom background processes that allow them to communicate with the protocols smart contracts, and just as importantly, provide the network consensus required by the beacon chain.
- Any user can run one of these smart nodes and stake their own ETH fee-free if they have the minimum 16 ETH required. For providing the protocol with a smart node, the user also receives extra rewards from the network on top of the rewards they earn staking their own ETH. They also earn RPL generated by the protocol in return for providing the network with an insurance promise, done by adding collateral to their node in the form of RPL tokens.

- Minipool Validators are another smart contract, but these are worth defining on their own due to being such a key aspect of the protocol. These are smart contracts that are created by node operators who deposit 16 ETH on their node. When they do this, their minipool contract receives 16 ETH in deposits from users who just want to stake but not run a node (rETH stakers). When this contract contains a total of 32 ETH, that amount is sent to begin staking and at the same time a new validator is created on the node which performs the consensus duties for that deposit to earn those staking rewards, neat!

View the visual guide below to get a glimpse of how these components work together in the Rocket Pool protocol.

[![How staking in the protocol flows](/images/rp-infographic-staking-protocol-flow.png)](https://www.rocketpool.net/images/infographic-rocket-pool-2.png)

### Protocol vs Staking as a Service (SaaS) provider?

Protocols support a wide array of actors, including service providers.

Web3 is full of highly knowledgeable Staking as a Service providers, helping the world better access the proof of stake landscape with projects like Ethereum. They support everything from institutional capital, to hedge funds, family offices and everything in between.

Rocket Pool was designed to support those providers, meaning ETH staked through SaaS solutions can be put to use through Rocket Pool, rather than having to spin up bespoke staking solutions to deal with each client.

ETH holders can choose between paying a service provider or being paid to be an operator. With Rocket Pool, service providers maximize their return by being paid to run a node, both in ETH and RPL. The protocol allows teams to run their own infrastructure, and use Rocket Pool to trustlessly stake ETH in batches of 16 ETH — allowing them to put their capital to work further and earn a larger share of returns.

This design means Bison Trails or Gemini could use Rocket Pool the same as a DeFi power user. Simply show up with 16 ETH and you’re treated the same as any other node operator. Rocket Pool’s democratized staking system doesn’t favor any one party as ETH staked through Rocket Pool always directly supports the network.

Rocket Pool’s staked ETH wrapper, rETH, is the purest in DeFi. We foresee a vibrant ecosystem of integrations ranging from lending markets to run validators more efficiently to composability for productivity.

In short, rETH is a natural building block for Etherum, and the most trust-minimised form of staked ETH.

### What tokens does Rocket Pool use?

**RPL — Rocket Pool Protocol Token**  
RPL is the primary protocol token that will be used in goverance of the protocol and can also be staked on a Rocket Pool node as a form of insurance. 

When creating a 16 ETH minipool validator in the protocol, a minimum of 10% of that ETH's value must also be staked in RPL as a security promise to the protocol. The insurance promise acts as collatoral, where if the node operator is penalised heavily or slashed and finishes staking with less than 16ETH. Their collateral is sold for ETH via auction to help compensate the protocol for the missing ETH. For providing this insurance promise, the protocol also rewards the node operator with RPL rewards generated by the inflation built into the protocol. The more RPL staked as insurance, the more RPL rewards the node operator receives, up to a maximum of 150% of the staked ETH's value.

**rETH — Rocket Pool Staking Deposit Token**  
When a user deposits into the protocol, they will instantly receive the rETH token which represents a tokenised staking deposit and the rewards it gains over time in the Rocket Pool network.

This token does not need to be locked within the network and it can be traded, sold or held as the user desires. It also importantly provides Rocket Pool users with liquidity over Phase 0 and 1 of the ETH2 rollout in which any staking deposit is locked until Phase 2, which does not have any set date as yet on the ETH2 rollout map.

This token can also be traded back to the protocol for ETH + rewards earned at anytime, providing there is sufficient liquidty in the protocol to meet the trade.

**nETH — Rocket Pool Staking Deposit Token for Node Operators**  

If a node operator wishes to quite staking, they can do so in the protocol and receive the nETH token which is a 1:1 representation of their staked ETH + rewards. There is a 3 month delay for receiving this token to make sure node operators only use it in an emergency situation. This is a temporary token which will be removed with ETH2 withdrawals for staked ETH is enabled in Phase 1.5 or 2 of the ETH2 rollout.

### Who's making it?

Rocket Pool was originally started in [late 2016 by David Rugendyke](https://medium.com/rocket-pool/rocket-pool-your-new-casper-friendly-ethereum-pos-pool-in-alpha-75709bd19936), a senior developer with over 18 years commercial experience and a computer science background.

In May 2017, an alpha version of the product was released. A vibrant community started to form and the team began expanding.

Today there is a great team working on Rocket Pool passionately alongside a fantastic community. Both have helped Rocket Pool run five public betas with over 100,000 ETH (testnet) staked and hundreds of users participating over the last 1–2 years.

---  
 
---  

### What is the minimum deposit to get rETH?

Rocket Pool protocol allows anyone to earn rewards on deposits as low as 0.01 ETH. When you trade ETH, you will receive rETH, a token that gains staking rewards over time based on the performance of all decentralised node operators in the protocol.


