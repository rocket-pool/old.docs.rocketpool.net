# Selecting a Rocket Pool Mode

Rocket Pool's Smartnode stack is quite flexible; there are several different ways to run it.
It can stand up an entire full node from scratch, it can integrate with existing Execution or Consensus client deployments, and it can even run natively as a set of system services.
In this section, we will cover the typical ways of configuring and using the Smartnode stack.


## The Default Docker-Based Configuration

The default mode, and the most common way to run a Smartnode, is to have it create an entire full node instance on your local machine that Rocket Pool manages.

To accomplish this, the Smartnode uses [Docker containers](https://www.docker.com/resources/what-container).
In essence, a Docker container is a small sandbox that comes pre-configured with a program, all of its dependencies, and all of the configuration needed to run correctly.
When it's no longer needed, it can simply be thrown away.
It's a nice little self-contained bundle that lets things work without making a mess of your actual filesystem or other programs.

This mode is what the Smartnode Installer will deploy for you.
It uses the following Docker containers:

- `rocketpool_api` - This holds the actual functionality that the Smartnode provides when you interact with it via Rocket Pool's command-line interface (CLI).
- `rocketpool_node` - This is a background process that will periodically check for and claim RPL rewards after a reward checkpoint (if you have auto-claim enabled, more on this later), and is responsible for actually staking new validators when you create a minipool.
- `rocketpool_watchtower` - This is used by Oracle Nodes to perform oracle-related duties. For regular node operators, this will simply stay idle.
- `rocketpool_eth1` - This will be your Execution client.
- `rocketpool_eth2` - This will be your Consensus beacon node client.
- `rocketpool_validator` -  This will be your Validator client, which is responsible for your validator duties (such as attesting to blocks or proposing new blocks).

In most situations, this is a good option to choose when creating a new node from scratch.
It's the fastest, most hands-off procedure.
It will also handle updates to the Execution and Consensus clients with every new Smartnode release, so you don't have to worry about them (though you can manually upgrade them at any time if you desire).

::: warning NOTE
Currently, some of the Docker containers need to run as the `root` user to function correctly.
While Docker containers are generally quite good at preventing a user from escaping into your main Operating System, you may not be comfortable with this requirement for security reasons.
In this case, we suggest you use the Native configuration mode listed below.
:::

If you would like to use this mode, proceed to the [Configuring a Standard Rocket Pool Node with Docker](./docker.md) section.


## The Hybrid Configuration with External Clients

The hybrid configuration is well-suited for users that are interested in running a Rocket Pool node, but already have their own Execution and/or Consensus clients running for other purposes (for example, because they're already solo-staking).

In this mode, Rocket Pool will deploy Docker containers for its own processes and for a Validator client it manages, but will ignore the Execution client and Beacon Node containers for whichever external clients you already run and maintain.
**As Rocket Pool will be creating and maintaining new validator keys for each of your node's minipools, it is important that it runs its own Validator client.**

When using this configuration, the Smartnode will use the following Docker containers (which were described above):

- `rocketpool_api`
- `rocketpool_node`
- `rocketpool_watchtower`
- `rocketpool_validator`

The `rocketpool_eth1` and `rocketpool_eth2` containers will either be included or excluded, depending on which clients you already have running externally.

If you would like to use this mode, proceed to the [Configuring a Standard Rocket Pool Node with Docker](./docker.md) section.
When prompted to choose a management mode for your Execution and/or Consensus clients, choose the **Externally Managed** option which is described in detail within that section.


## The Native Configuration without Docker

This configuration bypasses Docker entirely.
Instead of running the Smartnode stack via Docker, each process will be installed as a local system service (e.g. via `systemd`).
This includes the `node`, `watchtower`, `eth1`, `eth2`, and `validator` processes.

This configuration offers the most flexibility because it allows you to fine-tune Rocket Pool's parameters (such as its security posture, where the Execution and Consensus clients live, where the chain data lives, where your keys live, and so on).
It is also the most difficult to set up and maintain.

In this mode, the Smartnode Installer is no longer relevant.
You are responsible for manually instantiating, maintaining, and upgrading the Smartnode infrastructure, the ETH clients, and the validator clients.

::: danger WARNING
While we provide some example documentation on how to do this, we suggest that this mode should only be used by **experienced system administrators**.
:::

If you would like to use this mode, proceed to the [Configuring a Native Rocket Pool Node without Docker](./native.md) section.
