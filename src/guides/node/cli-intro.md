# :mag: [WIP] Intro to the CLI and Starting Rocket Pool

At this point, you should have the complete Rocket Pool infrastructure running, including the Smartnode stack, an ETH1 client, and an ETH2 client.
You should also have hardened your operating system from outside attackers.
If you've completed both of these steps, you're ready to create a Rocket Pool node and begin staking.
If not, please review the previous sections and return here once you've completed those steps.


## Starting and Stopping the Rocket Pool Services

:::: tabs
::: tab Docker (Default) Mode
Now that you have the Smartnode installed, starting the stack is easy.
Simply enter the following command:

```
rocketpool service start
```

This command will create all of the necessary Docker images if they don't already exist, make sure the Rocket Pool docker network and storage volumes have been initialized, and update any containers if they no longer match the image versions described in `~/.rocketpool/config.yml`.

The first time you do it, the output should look like this:

```
$ rocketpool service start

Creating network "rocketpool_net" with the default driver
Creating volume "rocketpool_eth1clientdata" with default driver
Creating volume "rocketpool_eth2clientdata" with default driver
Creating rocketpool_eth1 ... 
Creating rocketpool_eth1 ... done
Creating rocketpool_eth2 ... 
Creating rocketpool_api  ... 
Creating rocketpool_api  ... done
Creating rocketpool_eth2 ... done
Creating rocketpool_watchtower ... 
Creating rocketpool_node       ... 
Creating rocketpool_validator  ... 
Creating rocketpool_validator  ... done
Creating rocketpool_node       ... done
Creating rocketpool_watchtower ... done
```

If it does, then the Smartnode stack has been successfully initialized and is now running.

If you ever need to stop the services (for example, during an upgrade or because you need to do maintenance), you can use `rocketpool service stop` to shut everything down.
The output should look like this:

```
$ rocketpool service stop

Are you sure you want to pause the Rocket Pool service? Any staking minipools will be penalized! [y/n]
y

Stopping rocketpool_node       ... 
Stopping rocketpool_validator  ... 
Stopping rocketpool_watchtower ... 
Stopping rocketpool_eth2       ... 
Stopping rocketpool_api        ... 
Stopping rocketpool_eth1       ... 
Stopping rocketpool_validator  ... done
Stopping rocketpool_node       ... done
Stopping rocketpool_watchtower ... done
Stopping rocketpool_api        ... done
Stopping rocketpool_eth2       ... done
Stopping rocketpool_eth1       ... done
```

::: tip NOTE
Once you call this, Rocket Pool will not automatically start after a system reboot.
You will have to call `rocketpool service start` to start all of the Docker containers and enable auto-start on reboot again.

:::
::: tab Hybrid Mode

:::
::: tab Native Mode

::: 
::::

## Setting up a Wallet

The first thing you'll need to do in order to create your node is to set up an ETH1 wallet.
This is simply an ETH1 address that will hold your wallet's funds - it will use this to send ETH to your minipool when you begin staking, pay for gas during various transactions, and other various operations.

::: warning
As of the current build, Rocket Pool needs to have access to your wallet's private key in order to perform its automatic duties.
**This means that the private key will exist in a file on your machine.**
If an attacker manages to gain access to your machine, they could gain access to your node wallet and steal all of the tokens that it contains!
Please ensure that you have followed the security guide in the [Securing your Node](./securing-your-node) section before you continue, and are comfortable with your security posture.
:::

### Creating a New Wallet

The most common way to run a node is to create a new ETH1 address that is dedicated to the node.
The Smartnode CLI provides a way to do this easily:




# TODO

How to use the CLI to create a minipool.
Cover the whole process:
- Creating a node wallet 
- Register the node
- Stake RPL
- `node deposit`