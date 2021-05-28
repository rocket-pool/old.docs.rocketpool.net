# :arrow_up_down: [WIP] Configuring a Hybrid Rocket Pool Node with External Clients

In this section, we will walk through the process of installing the Rocket Pool Smartnode stack using a hybrid configuration.
[Docker](https://www.docker.com/resources/what-container) will be used to run the Rocket Pool stack itself, which you will then configure to talk to your already existing external ETH1 and/or ETH2 clients.

---
:warning: **WARNING: This guide is intended for users that are familiar with terminal usage and how to configure and maintain ETH1 or ETH2 clients.
If you are not familiar with these activites, we do not recommend that you use the hybrid mode.**

---

Please start by following the [Configuring a Standard Rocket Pool Node with Docker](./docker) guide to install and configure the Smartnode stack.
However, make these following changes:

- If you have your own external ETH1 client, just **select Geth during the ETH1 portion of the interview** and leave all of the options blank (use the defaults).
  Even if you're not using Geth specifically, this will let Rocket Pool use your external node appropriately.
- If you have your own external ETH2 client, **select the appropriate one during the ETH2 portion of the interview** and leave all of the options blank (use the defaults).

Once that's done, follow the supplementary configuration below.


## Setting up an External ETH1 Client

If you have your own ETH1 client, you will first need to make sure it's listening for incoming HTTP and Websocket traffic on the address `0.0.0.0` - this is necessary for the Rocket Pool Docker containers to be able to contact it.


### Setting the Command Line Arguments

Below is an example of how to configure this for Geth, by modifying its command line arguments:

```
geth <other args> --http --http.addr 0.0.0.0 --http.api eth,net,personal,web3 --ws --ws.addr 0.0.0.0 --ws.api eth,net,personal,web3
```

Once you have ensured that configuration, restart your ETH1 client so the new settings take effect.

---
:bulb: NOTE: Websockets are only necessary if you are using **Nimbus** for your ETH2 client,
If you plan to use a different client, you can ignore the Websocket portions in your command line arguments.

---

This should not impact your security posture as long as the ports used for RPC access (for example, `--http.port` and `--ws.port` in Geth) are only accessible by your local system.
If they are properly firewalled or hidden behind a router, an attacker will not be able to access your node from the outside.
Consult the [Securing your Node](./securing-your-node) section for more information on how to check this.


### Updating `docker-compose.yml`

Next, open `~/.rocketpool/docker-compose.yml` in a text editor.
It will look like this (truncated for brevity):

```
version: "3.4"
services:
  eth1:
    image: ${ETH1_IMAGE}
    ...
  eth2:
    image: ${ETH2_IMAGE}
    ...
    depends_on:
      - eth1
  validator:
    image: ${VALIDATOR_IMAGE}
    ...
    depends_on:
      - eth2
  api:
    image: ${SMARTNODE_IMAGE}
    ...
    depends_on:
      - eth1
    ...
  node:
    image: ${SMARTNODE_IMAGE}
    ...
    depends_on:
      - eth1
      - eth2
  watchtower:
    image: ${SMARTNODE_IMAGE}
    ...
    depends_on:
      - eth1
      - eth2
```

Remove the entire `eth1` section under the `services` section.
Next, go through each other service and remove `eth` from its list of dependencies (the `depends_on` section).
If `eth1` is the only entry under `depends_on`, remove the entire `depends_on` section.
Afterwards, the truncated example above would look like this:

```
version: "3.4"
services:
  eth2:
    image: ${ETH2_IMAGE}
    ...
  validator:
    image: ${VALIDATOR_IMAGE}
    ...
    depends_on:
      - eth2
  api:
    image: ${SMARTNODE_IMAGE}
    ...
    entrypoint: /bin/sleep
    command: "infinity"
  node:
    image: ${SMARTNODE_IMAGE}
    ...
    depends_on:
      - eth2
  watchtower:
    image: ${SMARTNODE_IMAGE}
    ...
    depends_on:
      - eth2
```

### Updating `config.yml`

The final step is to update `~/.rocketpool/config.yml`.
Open it in a text editor.
The contents will look like this (truncated for brevity):

```
rocketpool:
  ...
smartnode:
  ...
chains:
  eth1:
    provider: http://eth1:8545
    wsProvider: ws://eth1:8546
    ...
```

Change the addresses in `chains/eth1/provider` and `chains/eth1/wsProvider` to `http://<ip_address>:<http_port>` and `ws://<ip_address>:<ws_port>` respectively, where:

- `<ip_address>` is the IP address of the machine running the ETH1 node
- `<http_port>` is the HTTP port for RPC traffic that you specified in your ETH1 client's arguments
- `<ws_port>` is the Websocket port for RPC traffic that you specified in your ETH1 client's arguments (if using Nimbus for ETH2)


## Setting up an External ETH2 Client

[TODO]