# Configuring a Hybrid Rocket Pool Node with External Clients

In this section, we will walk through the process of installing the Rocket Pool Smartnode stack using a hybrid configuration.
[Docker](https://www.docker.com/resources/what-container) will be used to run the Rocket Pool stack itself, which you will then configure to talk to your already existing external ETH1 and/or ETH2 clients.

::: warning 
This guide is intended for users that are familiar with terminal usage and how to configure and maintain ETH1 or ETH2 clients.
**If you are not familiar with these activites, we do not recommend that you use the hybrid mode.**
:::

Please start by following the [Configuring a Standard Rocket Pool Node with Docker](./docker.md) guide to install and configure the Smartnode stack.
However, make these following changes:

- If you have your own external ETH1 client, just **select Geth during the ETH1 portion of the interview** and leave all of the options blank (use the defaults).
  Even if you're not using Geth specifically, this will let Rocket Pool use your external node appropriately.
- If you have your own external ETH2 client, **select the appropriate one during the ETH2 portion of the interview** and leave all of the options blank (use the defaults).

Once that's done, follow the supplementary configuration below.


## Setting up an External ETH1 Client

If you have your own ETH1 client, you will first need to make sure it's listening for incoming RPC traffic on the address `0.0.0.0` - this is necessary for the Rocket Pool Docker containers to be able to contact it.


### Setting the Command Line Arguments

Below is an example of how to configure this for Geth, by modifying its command line arguments:

```
geth ... --http --http.addr 0.0.0.0 --http.port 8545 --http.api eth,net,personal,web3 --ws --ws.addr 0.0.0.0 --ws.port 8546 --ws.api eth,net,personal,web3
```

Once you have ensured that configuration, restart your ETH1 client so the new settings take effect.

::: tip NOTE
Websockets are only necessary if you are using **Nimbus** for your ETH2 client,
If you plan to use a different client, you can ignore the Websocket portions in your command line arguments.
:::

This should not impact your security posture as long as the ports used for RPC access (for example, `--http.port` and `--ws.port` in Geth) are only accessible by your local system.
If they are properly firewalled or hidden behind a router, an attacker will not be able to access your node from the outside.
Consult the [Securing your Node](./securing-your-node.md) section for more information on how to check this.


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
    entrypoint: /bin/sleep
    command: "infinity"
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
Next, go through each other service and remove `eth1` from its list of dependencies (the `depends_on` section).
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
    - *Note that if this is your local machine, you must use the network IP of the machine (e.g. `192.168.1.10`) instead of e.g. `localhost`; otherwise, Docker won't resolve it correctly.*
- `<http_port>` is the HTTP port for RPC traffic that you specified in your ETH1 client's arguments
- `<ws_port>` is the Websocket port for RPC traffic that you specified in your ETH1 client's arguments (if using Nimbus for ETH2)


## Setting up an External ETH2 Client

If you have your own ETH2 client, you will first need to make sure it's listening for incoming RPC traffic on the address `0.0.0.0` - this is necessary for the Rocket Pool Docker containers to be able to contact it.

::: tip NOTE
In this configuration, Rocket Pool will **still run its own validator client** because it will be responsible for managing the validator keys of any minipools you create.
This validator client will then attach to your external ETH2 node to perform its duties.

**This means that Nimbus cannot be used in this configuration, as it does not (currently) officially support a separate validator client process.
You will have to use a different ETH2 validator client.**
:::


### Setting the Command Line Arguments

Below are examples how how to configure this for each ETH2 client by modifying its command line arguments:

::::: tabs
:::: tab Lighthouse
```
lighthouse beacon ... --http --http-address 0.0.0.0 --http-port 5052
```
::::

:::: tab Prysm
```
beacon-node ... --rpc-host 0.0.0.0 --rpc-port 5053 --grpc-gateway-host 0.0.0.0 --grpc-gateway-port 5052
```

::: warning NOTE
Prysm temporarily must use both the standard REST API (`--grpc-gateway-host`) and the legacy RPC API (`--rpc-host`).
If you have an existing external Validator Client for Prysm, you will need to modify its `--beacon-rpc-provider` flag to use port 5053 instead of 5052:

```
--beacon-rpc-provider <your address>:5053
```

This will be removed in a later version when the Prysm Validator Client can connect to the Beacon Node using the REST API.
:::
::::

:::: tab Teku
```
teku ... --rest-api-enabled --rest-api-interface 0.0.0.0 --rest-api-port 5052 --rest-api-host-allowlist=*
```
::::
:::::

Once you have ensured that configuration, restart your ETH2 client so the new settings take effect.

This should not impact your security posture as long as the port used for RPC access (for example, `--rpc-port`) is only accessible by your local system.
If it is properly firewalled or hidden behind a router, an attacker will not be able to access your node from the outside.
Consult the [Securing your Node](./securing-your-node.md) section for more information on how to check this.



### Updating `docker-compose.yml`

Next, open `~/.rocketpool/docker-compose.yml` in a text editor.
It should look like this (truncated for brevity):

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
    entrypoint: /bin/sleep
    command: "infinity"
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

::: warning NOTE
If you followed the earlier section on setting up an external ETH1 client, then you already edited this file and it will look slightly different from above but the following instructions still apply.
:::

Remove the entire `eth2` section under the `services` section.
Next, go through each other service and remove `eth2` from its list of dependencies (the `depends_on` section).
If `eth2` is the only entry under `depends_on`, remove the entire `depends_on` section.
Afterwards, the truncated example above would look like this:

```
version: "3.4"
services:
  eth1:
    image: ${ETH1_IMAGE}
    ...
  validator:
    image: ${VALIDATOR_IMAGE}
    ...
  api:
    image: ${SMARTNODE_IMAGE}
    ...
    depends_on:
      - eth1
    entrypoint: /bin/sleep
    command: "infinity"
  node:
    image: ${SMARTNODE_IMAGE}
    ...
    depends_on:
      - eth1
  watchtower:
    image: ${SMARTNODE_IMAGE}
    ...
    depends_on:
      - eth1
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
    ...
  eth2:
    provider: http://eth2:5052
    ...
```

Change the address in `chains/eth2/provider` to `http://<ip_address>:<http_port>` where:

- `<ip_address>` is the IP address of the machine running the ETH2 node
    - *Note that if this is your local machine, you must use the network IP of the machine (e.g. `192.168.1.10`) instead of e.g. `localhost`; otherwise, Docker won't resolve it correctly.*
- `<http_port>` is the port for RPC traffic that you specified in your ETH2 client's arguments

::: tip NOTE
In previous Rocket Pool betas, this setting didn't have an `http://` prefix.
Starting with Smartnode v1.0.0-rc6, that prefix is now included.
:::


## Configuring UFW

If you currently have `ufw` enabled, then it's likely that you don't have rules in place to allow Rocket Pool's Docker containers to access your external clients.
If you have not created the Rocket Pool's docker containers, please do so first before continuing.

Start by getting the subnet that Docker is currently using:
```shell
docker inspect rocketpool_net | grep -Po '(?<="Subnet": ")[0-9./]+'
```

This will print a CIDR string (for example, `172.18.0.0/16`).

To allow Rocket Pool to access your external ETH1 client (using the above string as an example):

```shell
sudo ufw allow from 172.18.0.0/16 to any port 8545 comment "Allow Rocket Pool access to Geth"
```

To allow Rocket Pool to access your external ETH2 client (using the above string as an example):
```shell
sudo ufw allow from 172.18.0.0/16 to any port 5052 comment "Allow Rocket Pool access to Lighthouse beacon"
```


## Wrapping Up

At this point, your configuration is complete.
Congratulations!
You're ready to secure your operating system to protect your node.
Move on to the [Securing your Node](./securing-your-node.md) section next.
