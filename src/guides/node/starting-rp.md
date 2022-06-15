# Starting Rocket Pool and Setting Up a Node Wallet

At this point, you should have the complete Rocket Pool infrastructure running, including the Smartnode stack, an Execution (ETH1) and an Consensus (ETH2) client.
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

This command will create all of the necessary Docker images if they don't already exist, make sure the Rocket Pool docker network and storage volumes have been initialized, and update any containers if they no longer match the configuration settings from `rocketpool service config`'s UI.

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
Now that you have the Smartnode installed, starting the stack is easy.
Simply enter the following command:

```
rocketpool service start
```

This command will create all of the necessary Docker images if they don't already exist, make sure the Rocket Pool docker network and storage volumes have been initialized, and update any containers if they no longer match the configuration settings from `rocketpool service config`'s UI.

The first time you do it, the output should look like this:

```
$ rocketpool service start

Creating network "rocketpool_net" with the default driver
Creating rocketpool_api  ...
Creating rocketpool_api  ... done
Creating rocketpool_watchtower ...
Creating rocketpool_node       ...
Creating rocketpool_validator  ...
Creating rocketpool_validator  ... done
Creating rocketpool_node       ... done
Creating rocketpool_watchtower ... done
```

If it does, then the Smartnode stack has been successfully initialized and is now running.

Note that your external Execution (ETH1) and/or Consensus (ETH2) clients will not be listed here, as Rocket Pool does not manage them and thus cannot start them.
You will have to ensure that you've started them separately, using whatever mechanism you originally created them with.

If you ever need to stop the services (for example, during an upgrade or because you need to do maintenance), you can use `rocketpool service stop` to shut everything down.
The output should look like this:

```
$ rocketpool service stop

Are you sure you want to pause the Rocket Pool service? Any staking minipools will be penalized! [y/n]
y

Stopping rocketpool_node       ...
Stopping rocketpool_validator  ...
Stopping rocketpool_watchtower ...
Stopping rocketpool_api        ...
Stopping rocketpool_validator  ... done
Stopping rocketpool_node       ... done
Stopping rocketpool_watchtower ... done
Stopping rocketpool_api        ... done
```

Again, you will be responsible for manually ensuring that your Execution (ETH1) and Consensus (ETH2) clients are stopped appropriately as well, if you want them to be stopped.

::: tip NOTE
Once you call this, Rocket Pool will not automatically start after a system reboot.
You will have to call `rocketpool service start` to start all of the Docker containers and enable auto-start on reboot again.

:::
::: tab Native Mode
In native mode, you already set up and started the Smartnode services as part of the [Configuring a Native Rocket Pool Node without Docker](./native.md) section.

Assuming you set them up as `systemd` services, you can start them with `sudo systemctl start ...`.
For example, if you are using Geth for Execution (ETH1) and Teku for Consensus (ETH2):

```
sudo systemctl start geth teku-bn teku-vc rp-node rp-watchtower
```

Stopping them is the same process, but using `sudo systemctl stop ...`.

Note that stopping the services **does not disable autostart**; the processes will automatically start upon a reboot.
:::
::::


## Confirming the Correct Version and Network

Once the containers or services are up, a good first step is to confirm that you have the correct versions of the clients and are on the network that you expect.
You can do this with the following command:

```
rocketpool service version
```

The output will look like this:

```
Your Smartnode is currently using the Ethereum Mainnet.

Rocket Pool client version: 1.0.0-pre
Rocket Pool service version: 1.0.0-pre
Selected Eth 1.0 client: Geth (ethereum/client-go:v1.10.8)
Selected Eth 2.0 client: Nimbus (statusim/nimbus-eth2:multiarch-v1.4.2)

```

The first line will tell you if your Smartnode is configured for the Ethereum mainnet or for the Prater testnet.

::: warning NOTE
**For Docker / Hybrid users:**
If you are not on the network you expect to be on, go back to the Installing Rocket Pool section and review the installation instructions - you may have missed the portion that has different instructions depending on which network you want to use.

**For Native users:**
If you accepted the default settings when you first ran `rp service config`, then it's possible that the network reported here is incorrect.
However, your `systemctl` service definitions *should* have the correct network baked directly into the command line arguments so you can ignore this discrepancy unless it bothers you.
:::

The second set of lines will tell you which clients you're using, and which versions of them are defined in Rocket Pool's `config.yml` file.

## Checking the Service Status and Logs

Now that the Smartnode services have been started, it's a good idea to check that they're running correctly without errors.

::::: tabs
:::: tab Docker (Default) Mode
The first thing to check is whether the Docker containers are running well, or if they are constantly restarting due to an error.
Run the following command:

```
docker ps
```

The results should look like this:

```
CONTAINER ID   IMAGE                               COMMAND                  CREATED       STATUS         PORTS                                                                                                         NAMES
a3c22f54eff0   rocketpool/smartnode:v1.0.0-rc3     "/go/bin/rocketpool …"   2 hours ago   Up 2 minutes                                                                                                                 rocketpool_node
0d5818868ef6   statusim/nimbus-eth2:amd64-v1.3.0   "sh /setup/start-val…"   2 hours ago   Up 2 minutes                                                                                                                 rocketpool_validator
88bea525fa89   rocketpool/smartnode:v1.0.0-rc3     "/go/bin/rocketpool …"   2 hours ago   Up 2 minutes                                                                                                                 rocketpool_watchtower
4dfc7a2e939b   statusim/nimbus-eth2:amd64-v1.3.0   "sh /setup/start-bea…"   2 hours ago   Up 2 minutes   0.0.0.0:9001->9001/tcp, 0.0.0.0:9001->9001/udp, :::9001->9001/tcp, :::9001->9001/udp                          rocketpool_eth2
62314e5a0ecf   rocketpool/smartnode:v1.0.0-rc3     "/bin/sleep infinity"    2 hours ago   Up 2 minutes                                                                                                                 rocketpool_api
ac629c08c896   ethereum/client-go:v1.10.3          "sh /setup/start-nod…"   2 hours ago   Up 2 minutes   8545-8546/tcp, 0.0.0.0:30303->30303/tcp, 0.0.0.0:30303->30303/udp, :::30303->30303/tcp, :::30303->30303/udp   rocketpool_eth1
```

The key thing to check is the `STATUS` column.
If none of the entries state `Restarting...`, then the containers should be running properly (see the below note for an exception about the `rocketpool_validator` container).

::: warning NOTE
If you are using Prysm or Teku as your Consensus (ETH2) client, you will likely notice the `rocketpool_validator` container is constantly restarting.
This is okay!
The validator container will fail until a new validator has been created using the `rocketpool node deposit` command, which we will cover in the [Creating a Minipool (ETH2 Validator)](./create-validator.md) section.
Once this is done, the container will function correctly - until then, just ignore it.
:::

Still, it might be useful to check the logs of the various services.

To check on the logs, use the `rocketpool service logs <container>` command, where `<container>` is one of `eth1`, `eth2`, `validator`, `api`, `node`, or `watchtower`.

For example, to check the logs for your ETH1 client:

```
$ rocketpool service logs eth1

Attaching to rocketpool_eth1
eth1_1        | INFO [06-17|05:17:19.052] Imported new block receipts              count=25   elapsed=26.651ms    number=247,000   hash=6583ec..35eb1c age=2y3mo2w  size=15.72KiB
eth1_1        | INFO [06-17|05:17:19.098] Imported new block headers               count=192  elapsed=18.515ms    number=247,551   hash=b7d5e4..d49faf age=2y3mo2w
eth1_1        | INFO [06-17|05:17:19.334] Imported new block receipts              count=371  elapsed=46.450ms    number=247,371   hash=dd3240..1ed173 age=2y3mo2w  size=266.59KiB
eth1_1        | INFO [06-17|05:17:19.354] Imported new state entries               count=1271 elapsed=2.866ms     processed=374,695 pending=3134  trieretry=0   coderetry=0  duplicate=0 unexpected=0
eth1_1        | INFO [06-17|05:17:19.441] Imported new block headers               count=384  elapsed=35.331ms    number=247,935   hash=4c4dba..5bf8b6 age=2y3mo2w
eth1_1        | INFO [06-17|05:17:19.460] Imported new block receipts              count=180  elapsed=33.648ms    number=247,551   hash=b7d5e4..d49faf age=2y3mo2w  size=128.73KiB
eth1_1        | INFO [06-17|05:17:19.480] Imported new block headers               count=192  elapsed=19.122ms    number=248,127   hash=aa70b9..40d139 age=2y3mo1w
eth1_1        | INFO [06-17|05:17:19.486] Imported new block receipts              count=6    elapsed=26.042ms    number=247,557   hash=fd6656..ca2439 age=2y3mo2w  size=3.77KiB
```

You should do this for both `eth1` and `eth2` to make sure both clients are running without any errors.
::::

:::: tab Hybrid Mode
The first thing to check is whether the Docker containers are running well, or if they are constantly restarting due to an error.
Run the following command:

```
docker ps
```

The results should look like this:

```
CONTAINER ID   IMAGE                               COMMAND                  CREATED       STATUS         NAMES
a3c22f54eff0   rocketpool/smartnode:v1.0.0-rc3     "/go/bin/rocketpool …"   2 hours ago   Up 2 minutes   rocketpool_node
0d5818868ef6   sigp/lighthouse:v1.4.0              "sh /setup/start-val…"   2 hours ago   Up 2 minutes   rocketpool_validator
88bea525fa89   rocketpool/smartnode:v1.0.0-rc3     "/go/bin/rocketpool …"   2 hours ago   Up 2 minutes   rocketpool_watchtower
62314e5a0ecf   rocketpool/smartnode:v1.0.0-rc3     "/bin/sleep infinity"    2 hours ago   Up 2 minutes   rocketpool_api
```

The key thing to check is the `STATUS` column.
If none of the entries state `Restarting...`, then the containers should be running properly (see the below note for an exception about the `rocketpool_validator` container).

::: warning NOTE
If you are using Prysm or Teku as your Consensus (ETH2) client, you will likely notice the `rocketpool_validator` container is constantly restarting.
This is okay!
The validator container will fail until a new validator has been created using the `rocketpool node deposit` command, which we will cover in the [Creating a Minipool (ETH2 Validator)](./create-validator.md) section.
Once this is done, the container will function correctly - until then, just ignore it.
:::

Still, it might be useful to check the logs of the various services.

To check on the logs, use the `rocketpool service logs <container>` command, where `<container>` is one of `eth1`, `eth2`, `validator`, `api`, `node`, or `watchtower`.

You can ignore `eth1` and/or `eth2` based on which ones you are maintaining externally, but if you are letting Rocket Pool manage one of them, you should check the status of it now using this command.
::::

:::: tab Native Mode
The easiest way to check the status and logs in native mode is to use the logging scripts that you created when you first set up the Smartnode services.

For example, to check Geth's log, you would just run:

```
/srv/geth/log.sh
```

You should see that it is slowly chugging along without any errors.
Do this for your Execution (ETH1) and Consensus (ETH2) clients now to verify that they are working properly.
::::
:::::

::: tip TIP
When you're done looking at the logs, you can exit and return to the command prompt using `Ctrl + C`.
:::


## Setting up a Wallet

If the Smartnode services are up and running, the next step is to set up an ETH1 wallet for your node.
This is simply an ETH1 address that will hold your node's funds - it will use this to send ETH to your minipool when you begin staking, pay for gas during various transactions, and other various operations.


### Creating a New Wallet

The most common way to run a node is to create a new ETH1 address that is dedicated to the node.
The Smartnode CLI provides a way to do this easily:

```
rocketpool wallet init
```

You will first be prompted for a password to protect your wallet's private key.
Next, you will be presented the **unique 24-word mnemonic** for your new wallet.
This is the **recovery phrase** for your wallet.
If you ever lose your machine, you can use this phrase to regenerate your wallet and resurrect all of the Consensus (ETH2) validators attached to it.

::: warning
It is **essential** that you write this mnemonic down because this is the only time it will be shown to you, but keep it somewhere safe.
Anyone with this phrase can gain control of your wallet.
:::


Once you confirm your mnemonic phrase, you will be presented with the unique ETH1 address for your node wallet.


### Restoring from an Existing Wallet

If you already have a wallet from a previous installation, you can recover it and regenerate all of the validators attached to it instead of making a new one.

::: warning NOTE
This will not work until your eth1 node has finished syncing.
Please watch its log file to see when it's done; once it is, you can run follow this step.
:::

To do this, use the following command:

```
rocketpool wallet recover
```

This will first ask you for a password you want to use to encrypt your wallet.
After that, it will ask for your **24 word mnemonic recovery phrase**.
Enter it carefully - it will not be shown on-screen for safety, and it is very easy to make a mistake while typing it so take your time.

When you're done, you should see output similar to this:

```
$ rocketpool wallet recover

Please enter a password to secure your wallet with:

Please confirm your password:

Please enter your recovery mnemonic phrase:

Recovering node wallet...
The node wallet was successfully recovered.
Node account: <your wallet address>
No validator keys were found.
```

You now have to rebuild your keystore:
```
$ rocketpool wallet rebuild
```

If you don't see any errors, then your wallet and validators will be recovered.


### Your Wallet and Password Files

::: warning
As of the current build, Rocket Pool needs to have access to your wallet's private key in order to perform its automatic duties.
**This means that the private key will exist in a file on your machine.**
If an attacker manages to gain access to your machine, they could gain access to your node wallet and steal all of the tokens that it contains!
Please ensure that you have followed the security guide in the [Securing your Node](./securing-your-node.md) section before you continue, and are comfortable with your security posture.
:::

:::: tabs
::: tab Docker and Hybrid Modes
Your wallet's private key will be stored in a file located at `~/.rocketpool/data/wallet`.

The password used to encrypt your wallet's key will be stored in `~/.rocketpool/data/password`.
This is the file that must be protected at all times.
:::

::: tab Native Mode
The wallet and password files will be stored in the `data` directory under the Rocket Pool directory that you set up earlier (e.g. `/srv/rocketpool`).

Your wallet's private key will be stored in a file located at `/srv/rocketpool/data/wallet`.

The password used to encrypt your wallet's key will be stored in `/srv/rocketpool/data/password`.
This is the file that must be protected at all times.
:::
::::


## Waiting for Your ETH Clients to Sync

Now that you have a wallet set up, you're going to want to wait until your Execution (ETH1) and Consensus (ETH2) clients have finished syncing with the network before proceeding.

One easy way to check on their status is with the following command:

```
rocketpool node sync
```

This command will show how far along your Execution (ETH1) & Consensus (ETH2) clients are in the syncing process, similar to this:

```
$ rocketpool node sync

Your eth1 client is fully synced.
Your eth2 client is still syncing (16.96%).
```

You can call this occasionally to keep tabs on your clients' progress.

::: tip NOTE
**Prysm** currently does not support the ability to get the sync progress externally, so Rocket Pool can't read it via this command.
:::

To get an actual ETA of the sync time, it's easiest to look at the logs for your clients with `rocketpool service logs eth1` and `rocketpool service logs eth2` respectively (or the equivalent log script commands if you're using the hybrid / native modes.)
Each client typically provides an ETA on its sync status in its log output.

::: tip NOTE
It can take **days** to fully sync both ETH1 and ETH2 depending on your client selection and your machine's hardware profile.
**This is expected**.
As long as the percentage is steadily rising, you are all set.
Sit back, relax, and wait for both of them to finish.
:::

Once your nodes are done syncing, move onto the next section for a brief tour of the CLI.
