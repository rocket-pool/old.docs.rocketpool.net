# Choosing your ETH Clients

::: danger WARNING
This documentation is currently out of date with the release of Smartnode v1.5.0.

It will be updated shortly.
:::

Rocket Pool's Smartnode installer can transform your machine into a full Ethereum node, as it requires both Execution and Consensus clients in order to operate properly.

The terms ETH1/ETH2 have been deprecated; the proper names are now Execution Clients (ETH1) and Consensus Clients (ETH2).
The chains will be referred to as the **Execution Layer (ETH1)** and the **Beacon Chain or Consensus Layer (ETH2)** in the rest of these guides.

If you already have Execution and Consensus clients up and running on a separate machine (for example, if you're already solo-staking), then skip this section and move onto the [Configuring a Hybrid Rocket Pool Node with External Clients](./install-modes.md#the-hybrid-configuration-with-external-clients) section.

Otherwise, read on to learn more about your choices for Execution and Consensus clients.

::: warning NOTE

As of May 2022, the distribution of clients on the Beacon Chain looks roughly like this:

<center>

![](./images/ethereum-client-diversity.png)

*Data obtained from [https://clientdiversity.org](https://clientdiversity.org)*

</center>

The overwhelming majority of node operators are currently using Geth and Prysm.
In the interest of supporting the health of the Execution Layer (formerly ETH1) and the Beacon Chain (formerly ETH2), we currently recommend that you consider using a different clients.
Here are some relevant articles about why an even client diversity is crucial to the health of the network if you would like to learn more:

[https://clientdiversity.org/#why](https://clientdiversity.org/#why)

[https://blog.ethereum.org/2020/08/21/validated-why-client-diversity-matters/](https://blog.ethereum.org/2020/08/21/validated-why-client-diversity-matters/)

[https://our.status.im/the-importance-of-client-diversity/](https://our.status.im/the-importance-of-client-diversity/)

[https://medium.com/prysmatic-labs/eth2-mainnet-incident-retrospective-f0338814340c](https://medium.com/prysmatic-labs/eth2-mainnet-incident-retrospective-f0338814340c)
:::

For users that would like to get up and running quickly, the Smartnode installer provides a `Random Client` option which may be the best choice.
For users that have a specific client they'd like to use in mind, we provide the ability to easily choose one during Rocket Pool's installation.
The options below help to describe each client so you can make an informed decision if you'd like to specify which one you want.


## Execution Clients (ETH1)

Out of the box, Rocket Pool supports three different execution clients: **Geth**, **Besu**, and **Nethermind**.

::: warning
Light clients (**Infura** and **Pocket**) will not be usable after the Ethereum Merge and are now deprecated.
You **should not** use them for new installations.
:::

Running an Execution Client involves storing a copy of the Execution layer blockchain on your machine.
It interacts via peer-to-peer communications with other EC nodes to record and verify new blocks and transactions.

By running an EC node, you contribute to the decentralization and overall health of the ETH network.


### Geth

[Geth](https://geth.ethereum.org/) (formally named `Go Ethereum`) is one of the three original implementations (along with C++ and Python) of the Ethereum protocol.
It is written in Go, fully open source and licensed under the GNU LGPL v3.

Geth is the oldest and most widely-used Execution Client around the world.
It has a reputation for being very stable and reliable.

It is multithreaded, meaning it can take advantage of your entire CPU.
Its RAM usage is configurable, down to a **minimum of about 4 GB for Mainnet**.
This makes it viable for low-power systems and high-power systems alike.

::: warning NOTE
Geth requires **offline pruning** of its database periodically: its database will grow over time and gradually consume all of your free disk space unless you prune it when your disk runs low on free space.
The frequency you need to prune will depend on your SSD's size.

For more information on pruning Geth, view the [Pruning Geth](./geth-pruning.md) page.
:::


### Besu
Hyperledger [Besu](https://besu.hyperledger.org/en/stable/) is an open-source Ethereum client developed under the Apache 2.0 license and written in [Java](https://en.wikipedia.org/wiki/Java_%28programming_language%29).
Besu's most exciting features is its use of [Bonsai Tries](https://consensys.net/blog/news/bonsai-tries-a-big-update-for-small-state-storage-in-hyperledger-besu/) for state storage. In addition to their better performance characterstics, Bonsai Tries give Besu two interesting advantages over the other clients:

1. Besu does *not* need to be pruned at all; it is effectively maintenance-free in that respect
2. Besu is able to revisit any past block in the blockchain, though it does this by rewinding each block so reaching blocks from long ago may take some time.

Besu currently runs best with **at least 16 GB of RAM**, though more is preferable.

::: warning NOTE
Besu is a relatively new addition to the Smartnode.
The development team and support community are still familiarizing themselves with it, so it may take longer to get help with it in Rocket Pool's Discord server.
:::


### Nethermind

[Nethermind](https://nethermind.io/nethermind-client/) is written in [.NET Core](https://en.wikipedia.org/wiki/.NET).
It boasts the fastest sync speed of the Execution clients and has a rich set of configuration options.
It is designed with node operators in mind and has many features that they will find helpful.

Like Geth, Nethermind requires periodic pruning of its database.
Unlike Geth, however, Nethermind's database can [be pruned while it stays online](https://medium.com/nethermind-eth/netherminds-full-pruning-is-here-cutting-the-gordian-knot-5e3450f02de9).
This means you do not need to turn your client off and rely on a fallback in order to prune.
However, Nethermind's online pruning process is quite resource intensive so users running low-power nodes may see some performance degradation during the process.

Nethermind requires **at least 16GB of RAM**, though more is preferable.

::: warning
As of Smartnode v1.4.1, we have seen reports of memory leaks using Nethermind v1.13.1 which cause it to gradually consume all of the node's available RAM until it crashes.
Users may want to choose a different client while these issues are resolved.
:::


## Execution Light Clients (ETH1)

::: danger
Light clients are **deprecated**; they will not work as an Execution client after the Merge.
You will need to run a **full** Execution client.
:::


### Infura

[Infura](https://infura.io/) is a web service that provides instant access over HTTPS and WebSockets to the Ethereum and IPFS networks.
It is a **light client**, meaning that it can be interacted with just like a local ETH1 node for information about the chain's state or to submit transactions; however, it doesn't require a full node on your local machine.
Instead, Infura essentially hosts a full node and gives you remote access to it.
This convenience comes at a cost: using a light client does not contribute to the decentralization of Ethereum, and instead adds a somewhat centralized component (as you are now depending on it as an external service).

Infura has several pricing tiers, including a free tier for low amounts of usage.
Rocket Pool may fit into the free tier, depending on what you do with your node.
Because of this restriction, it is possible to exceed the limits of the free tier, which will prevent Rocket Pool from working correctly.
We therefore do not recommend using Infura regularly for production, but it is a useful fallback for periods where your local ETH1 client is down for maintenance.

::: warning
If you choose a light client, you are trusting that it will represent the ETH1 chain accurately and to pass your transactions onto the network without modifying or abusing them.
You do not have control over the remote node that you're connecting to, and you must accept any risks that come with using it.
:::


### Pocket

[Pocket](https://www.pokt.network/) is a decentralized peer-to-peer network of thousands of independent nodes that service requests for a variety of blockchains, including Ethereum.
Like Infura, Pocket is a **light client**.
It is constructed from routers, relays and nodes that combine to listen for incoming blockchain requests, execute them on a node for the blockchain of choice, and transmit the reponse back to the original caller.

Pocket is an interesting option for running a light client, in that it does not have a truly centralized component.
While using it doesn't contribute to the decentralization of Ethereum, it also doesn't rely on a single-point-of-failure, making this an attractive option for situations where a light client is necessary.

Pocket normally relies on users paying for transactions via their POKT token, but they have agreed to allow Rocket Pool node operators to use their network **free of charge**.

One potential downside of Pocket is that it cannot support websockets based on the nature of the protocol so it is incompatible with the Nimbus ETH2 client.

::: warning
If you choose a light client, you are trusting that it will represent the ETH1 chain accurately and to pass your transactions onto the network without modifying or abusing them.
You do not have control over the remote node that you're connecting to, and you must accept any risks that come with using it.
:::


### Client Comparison Table

| Client     | Type  | CPU Usage | Minimum RAM Usage | Sync Time |
| ---------- | ----- | --------- | ----------------- | --------- |
| Geth       | Full  | Moderate  | 4 GB              | Moderate  |
| Besu       | Full  | Moderate  | 16 GB             | Moderate  |
| Nethermind | Full  | Moderate  | 16 GB             | Fast      |
| Infura*    | Light | Low       | ---               | None      |
| Pocket*    | Light | Low       | ---               | None      |

*Currently in deprecated status, not supported post-merge


## Consensus Clients (ETH2)

Rocket Pool's installer is proud to support all four currently available Consensus clients: **Lighthouse**, **Nimbus**, **Prysm**, and **Teku**.

Each of these is a **full client**, meaning you will contribute to the decentralization of the Consensus network regardless of which client you choose.

All four clients are quite low-risk, low-maintenance, and will generate practically identical total rewards from validation.
They differ slightly in terms of resource requirements and features, but you cannot go wrong with any of them.

By default, the Rocket Pool installer will offer to select a random consensus client for you.
This will help contribute to the overall **diversity of the network**.
This is important from a security perspective: if one client is used by a majority of nodes and suffers from a severe bug or attack, it might cause all of those nodes to fail and thus threaten the entire Beacon Chain's stability.


### Lighthouse

[Lighthouse](https://lighthouse.sigmaprime.io/) is an open-source Ethereum 2.0 maintained by [Sigma Prime](https://sigmaprime.io/).
It implements the [Ethereum 2.0 specification](https://github.com/ethereum/consensus-specs) as defined by the Ethereum Foundation Research team.

Lighthouse is a cutting-edge distributed systems project implementing technologies at the forefront of blockchain research; including proof-of-stake consensus, parallel transaction execution and state separation (sharding).

Lighthouse has no official affiliation with the Ethereum Foundation and will continue to follow its guidance as long it is remains in the best interest of the Ethereum protocol and community surrounding it.

Lighthouse is implemented in [Rust](https://www.rust-lang.org/) and will maintain a focus on security and efficiency.


### Nimbus

[Nimbus](https://nimbus.team/) is a client implementation for both Ethereum 2.0 and Ethereum 1.0 that strives to be as lightweight as possible in terms of resources used.
This allows it to perform well on embedded systems and resource-restricted devices - including **Raspberry Pis** and mobile devices.

However, resource-restricted hardware is not the only thing Nimbus is good for.
Its low resource consumption makes it easy to run Nimbus together with other workloads on your server (this is especially valuable for stakers looking to lower the cost of their server instances).

Nimbus is written in [Nim](https://nim-lang.org/) and maintained by the [Status.im team](https://status.im/about/).


### Prysm

The [Prysm](https://docs.prylabs.network/docs/getting-started/#what-is-prysm) project is a full-featured implementation for the Ethereum 2.0 network written entirely in the [Go programming language](https://golang.org/).

Created by [Prysmatic Labs](https://prysmaticlabs.com/), Prysm implements the official [Ethereum 2.0 specification](https://github.com/ethereum/eth2.0-specs), which is the product of an ongoing collective research and development effort by various teams across the Ethereum ecosystem including the [Ethereum Foundation](https://ethereum.org/).


### Teku

[Teku](https://docs.teku.consensys.net/en/stable/) (formerly known as Artemis) is a [Java](https://en.wikipedia.org/wiki/Java_%28programming_language%29)-based Ethereum 2.0 client designed & built to meet institutional needs and security requirements.
PegaSys is an arm of [ConsenSys](https://consensys.net/) dedicated to building enterprise-ready clients and tools for interacting with the core Ethereum platform.

Teku is Apache 2.0 licensed and written in Java, a language notable for its maturity & ubiquity.


### Client Comparison Table

| Client     | CPU Usage | Minimum RAM Usage | Sync Time                                               |
| ---------- | --------- | ----------------- | ------------------------------------------------------- |
| Lighthouse | Moderate  | 2 GB              | Moderate (normal sync)<br/>Instant with checkpoint sync |
| Nimbus     | Low       | 0.75 GB           | Moderate (normal sync)<br/>Instant with checkpoint sync |
| Prysm      | Moderate  | 2 GB              | Moderate                                                |
| Teku       | Moderate  | 4 GB              | Slow (normal sync)<br/>Instant with checkpoint sync     |
