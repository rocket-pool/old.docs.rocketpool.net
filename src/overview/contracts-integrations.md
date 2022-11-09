---
permalink: /overview/contracts-integrations
---

# :handshake: Contracts & Integrations

Do you love RPL and rETH? Us too! So we put together a list of integrations and services, as well as official contract deployments, to help you discover new places these assets can be used!

If you would like to contribute by helping integrate Rocket Pool into more services and protocols, reach out on [Discord](https://discord.gg/MYrazaZZC4)!


## Protocol Contracts

Chain    | Contract | Address
---------|----------|---------
Mainnet  | Deposit  | [0x2cac916b2A963Bf162f076C0a8a4a8200BCFBfb4](https://etherscan.io/address/0x2cac916b2A963Bf162f076C0a8a4a8200BCFBfb4)
&nbsp;   | Storage  | [0x1d8f8f00cfa6758d7bE78336684788Fb0ee0Fa46](https://etherscan.io/address/0x1d8f8f00cfa6758d7bE78336684788Fb0ee0Fa46)
Goerli*  | Deposit  | [0x2cac916b2A963Bf162f076C0a8a4a8200BCFBfb4](https://goerli.etherscan.io/address/0x2cac916b2A963Bf162f076C0a8a4a8200BCFBfb4)
&nbsp;   | Storage  | [0xd8Cd47263414aFEca62d6e2a3917d6600abDceB3](https://goerli.etherscan.io/address/0xd8Cd47263414aFEca62d6e2a3917d6600abDceB3)

<small>* Testnet</small>


## Token Contracts

Chain    | Asset | Address
---------|-------|---------
Mainnet  | RPL   | [0xD33526068D116cE69F19A9ee46F0bd304F21A51f](https://etherscan.io/token/0xd33526068d116ce69f19a9ee46f0bd304f21a51f)
&nbsp;   | rETH  | [0xae78736Cd615f374D3085123A210448E74Fc6393](https://etherscan.io/token/0xae78736cd615f374d3085123a210448e74fc6393)
Arbitrum | RPL   | [0xb766039cc6db368759c1e56b79affe831d0cc507](https://arbiscan.io/token/0xb766039cc6db368759c1e56b79affe831d0cc507)
&nbsp;   | rETH  | [0xec70dcb4a1efa46b8f2d97c310c9c4790ba5ffa8](https://arbiscan.io/token/0xec70dcb4a1efa46b8f2d97c310c9c4790ba5ffa8)
Optimism | RPL   | (not deployed to Optimism - *in progress*)
&nbsp;   | rETH  | [0x9bcef72be871e61ed4fbbc7630889bee758eb81d](https://optimistic.etherscan.io/token/0x9bcef72be871e61ed4fbbc7630889bee758eb81d)
Polygon  | RPL   | [0x7205705771547cf79201111b4bd8aaf29467b9ec](https://polygonscan.com/token/0x7205705771547cf79201111b4bd8aaf29467b9ec)
&nbsp;   | rETH  | [0x0266F4F08D82372CF0FcbCCc0Ff74309089c74d1](https://polygonscan.com/token/0x0266F4F08D82372CF0FcbCCc0Ff74309089c74d1)
Goerli*  | RPL   | [0x5e932688e81a182e3de211db6544f98b8e4f89c7](https://goerli.etherscan.io/address/0x5e932688e81a182e3de211db6544f98b8e4f89c7)
&nbsp;   | rETH  | [0x178E141a0E3b34152f73Ff610437A7bf9B83267A](https://goerli.etherscan.io/address/0x178E141a0E3b34152f73Ff610437A7bf9B83267A)

<small>* Testnet</small>

## Deposit Pool Contract Version History

Chain    | Version        | Address
---------|----------------|---------
Mainnet  | v1.1 (current) | [0x2cac916b2A963Bf162f076C0a8a4a8200BCFBfb4](https://etherscan.io/address/0x2cac916b2A963Bf162f076C0a8a4a8200BCFBfb4)
&nbsp;   | v1.0           | [0x4D05E3d48a938db4b7a9A59A802D5b45011BDe58](https://etherscan.io/address/0x4D05E3d48a938db4b7a9A59A802D5b45011BDe58)
Goerli*  | v1.1 (current) | [0x2cac916b2A963Bf162f076C0a8a4a8200BCFBfb4](https://goerli.etherscan.io/address/0x2cac916b2A963Bf162f076C0a8a4a8200BCFBfb4)
&nbsp;   | v1.0           | [0x923Ed282Cda8952910B71B5efcA7CDa09e39c633](https://goerli.etherscan.io/address/0x923Ed282Cda8952910B71B5efcA7CDa09e39c633)

<small>* Testnet</small>


## Integrations

Category        | Service             | Link    | Link
----------------|---------------------|---------|--------
Data Feeds      | Subgraph            | [RPL](https://github.com/Data-Nexus/rocket-pool-mainnet) | [rETH](https://github.com/Data-Nexus/rocket-pool-mainnet)
Exchanges       | 1inch (Mainnet)     | -       | [ETH/rETH](https://app.1inch.io/#/1/unified/swap/ETH/rETH)
&nbsp;          | Balancer (Mainnet)  | -       | [ETH/rETH](https://app.balancer.fi/#/trade/ether/0xae78736Cd615f374D3085123A210448E74Fc6393)
&nbsp;          | Bancor (Mainnet)    | [ETH/RPL](https://app.bancor.network/swap?from=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&to=0xD33526068D116cE69F19A9ee46F0bd304F21A51f) | [ETH/rETH](https://app.bancor.network/swap?from=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&to=0xae78736Cd615f374D3085123A210448E74Fc6393)
&nbsp;          | Curve (Mainnet)     | -       | [wstETH/rETH](https://curve.fi/factory-crypto/14)
&nbsp;          | Uniswap (Mainnet)   | [ETH/RPL](https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0xd33526068d116ce69f19a9ee46f0bd304f21a51f&chainId=1) | [ETH/rETH](https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0xae78736Cd615f374D3085123A210448E74Fc6393&chainId=1)
&nbsp;          | Uniswap (Arbitrum)  | [ETH/RPL](https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0xb766039cc6db368759c1e56b79affe831d0cc507&chain=arbitrum) | [ETH/rETH](https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0xec70dcb4a1efa46b8f2d97c310c9c4790ba5ffa8&chain=arbitrum)
&nbsp;          | Uniswap (Optimism)  | -       | [ETH/rETH](https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x9bcef72be871e61ed4fbbc7630889bee758eb81d&chain=optimism)
&nbsp;          | Uniswap (Polygon)   | -       | [wETH/rETH](https://app.uniswap.org/#/swap?inputCurrency=0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619&outputCurrency=0x0266F4F08D82372CF0FcbCCc0Ff74309089c74d1&chain=polygon)
&nbsp;          | Zigzag (zkSync)     | -       | [ETH/rETH](https://trade.zigzag.exchange/?market=rETH-ETH&network=zksync)
Lending         | Alchemix (Mainnet)  | -       | [wETH/rETH](https://alchemix.fi/vaults)
&nbsp;          | Maker (Mainnet)     | -       | DAI/rETH [(coming soon)](https://vote.makerdao.com/polling/QmfMswF2)
Oracles         | Maker (Mainnet)     | -       | rETH [(coming soon)](https://vote.makerdao.com/polling/QmfMswF2)
Trackers        | DefiLlama           | [RPL](https://defillama.com/protocol/rocket-pool) | -
&nbsp;          | Delta               | -       | [rETH](https://delta.app/)
&nbsp;          | RocketScan          | [RPL](https://rocketscan.io/rpl) | [rETH](https://rocketscan.io/reth)
Vaults          | Convex (Mainnet)    | -       | [Curve-rETHwstETH](https://www.convexfinance.com/stake)
&nbsp;          | Ribbon (Mainnet)    | -       | [rETH](https://app.ribbon.finance/v2/theta-vault/T-rETH-C)
&nbsp;          | Yearn** (Mainnet)   | -       | [Curve-rETHwstETH](https://yearn.finance/#/vault/0xBfedbcbe27171C418CDabC2477042554b1904857)

<small>** Likely not profitable</small>

<!-- Staged Integrations -->
<!-- 
- RPL ZigZag listing (waiting for MM)
&nbsp;          | Zigzag (zkSync)     | [RPL](https://trade.zigzag.exchange/?market=RPL-ETH&network=zksync) | [rETH](https://trade.zigzag.exchange/?market=rETH-ETH&network=zksync)
 -->
