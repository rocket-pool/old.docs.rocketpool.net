# Choosing your ETH Clients

Rocket Pool's Smartnode installer can transform your machine into a full ETH1 and ETH2 node, as it requires both clients in order to operate properly.
If you already have ETH1 and ETH2 clients up and running on a separate machine (for example, if you're already solo-staking), then skip this section and move onto the [Configuring a Hybrid Rocket Pool Node with External Clients](./hybrid) section.
Otherwise, read on to learn more about your choices for ETH1 and ETH2 clients. 


## ETH1 Clients

Out of the box, Rocket Pool supports three different ETH1 clients: **Geth**, **Infura**, and **Pocket**.


### Geth

[Geth](https://geth.ethereum.org/) (formally named `Go Ethereum`) is one of the three original implementations (along with C++ and Python) of the Ethereum protocol.
It is written in Go, fully open source and licensed under the GNU LGPL v3.

Geth is very popular and widely used on ETH1 nodes around the world.
It is also currently the only **full client** that Rocket Pool's installer supports.
This means that it stores a copy of the ETH1 chain on your machine.
It interacts via peer-to-peer communications with other ETH1 nodes to record and veryify new blocks and transactions.
By running a Geth node, you contribute to the decentralization and overall health of the ETH1 network.

Geth runs as a single process.
It is multithreaded, meaning it can take advantage of your entire CPU.
Its RAM usage is configurable, down to a minimum of about 2 GB.
This makes it viable for low-power systems.

Geth is compatible with all four of the ETH2 clients.


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

| Client | Type | CPU Usage | Minimum RAM Usage | Sync Time | ETH2 Client Compatibility |
| - | - | - | - | - | - |
| Geth | Full | Moderate | 2 GB | Moderate | All |
| Infura | Light | Low | --- | None | All |
| Pocket | Light | Low | --- | None | Prysm, Lighthouse, Teku |


## ETH2 Clients

Rocket Pool's installer is proud to support all four currently available ETH2 clients: **Lighthouse**, **Nimbus**, **Prysm**, and **Teku**.

Each of these is a **full client**, meaning you will contribute to the decetralization of the ETH2 network regardless of which client you choose.

By default, the Rocket Pool installer will select a random ETH2 client to help contribute to the diversity of the network - this is important from a security perspective, because if one client is used by a majority of nodes and suffers from a severe bug or attack, it might cause all of those nodes to fail.

However, this is simply a suggestion - you can choose to select a specific client during Rocket Pool installation if you wish.
The options below help to describe each client so you can make an informed decision.


### Lighthouse

[Lighthouse](https://lighthouse.sigmaprime.io/) is an open-source Ethereum 2.0 maintained by [Sigma Prime](https://sigmaprime.io/).
It implements the [Ethereum 2.0 specification](https://notes.ethereum.org/SCIg8AH5SA-O4C1G1LYZHQ?view) as defined by the Ethereum Foundation Research team.

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

| Client | CPU Usage | Minimum RAM Usage | Sync Time |
| - | - | - | - |
| Lighthouse | Moderate | 2 GB | Moderate |
| Nimbus | Low (Single-threaded) | 0.75 GB | Moderate |
| Prysm | Moderate | 2 GB | Fast |
| Teku | Moderate | 4 GB | Slow (normal sync)<br/>Instant ([checkpoint sync](https://www.youtube.com/watch?v=Oz3flfj50Ig)) |