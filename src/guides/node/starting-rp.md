# Starting Rocket Pool

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
Creating rocketpool_mev-boost   ... 
Creating rocketpool_mev-boost   ... done
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
Stopping rocketpool_mev-boost  ...
Stopping rocketpool_eth2       ...
Stopping rocketpool_api        ...
Stopping rocketpool_eth1       ...
Stopping rocketpool_validator  ... done
Stopping rocketpool_node       ... done
Stopping rocketpool_watchtower ... done
Stopping rocketpool_api        ... done
Stopping rocketpool_mev-boost  ... done
Stopping rocketpool_eth2       ... done
Stopping rocketpool_eth1       ... done
```

::: warning NOTE
Once you call this, Rocket Pool will **not** automatically start after a system reboot.
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

The output will look like this **(note that you may have a newer version than what is displayed here, this is just an example)**:

```
Your Smartnode is currently using the Ethereum Mainnet.

Rocket Pool client version: 1.6.4
Rocket Pool service version: 1.6.4
Selected Eth 1.0 client: Geth (Locally managed)
        Image: ethereum/client-go:v1.10.25
Selected Eth 2.0 client: Lighthouse (Locally managed)
        Image: sigp/lighthouse:v3.1.0
```

The first line will tell you if your Smartnode is configured for the Ethereum mainnet or for the Prater testnet.

::: warning NOTE
**For Docker / Hybrid users:**
If you are not on the network you expect to be on, go back to the Installing Rocket Pool section and review the installation instructions - you may have missed the portion that has different instructions depending on which network you want to use.

**For Native users:**
If you accepted the default settings when you first ran `rp service config`, then it's possible that the network reported here is incorrect.
Simply switch it in the `rp service config` TUI, in the `Smartnode` section, to the proper network and restart your `node` and `watchtower` services.
:::

The second set of lines will tell you which clients you're using, and which versions of them are defined in Rocket Pool's configuration.


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
CONTAINER ID   IMAGE                         COMMAND                  CREATED       STATUS      PORTS                                                                                                         NAMES
4c1de08a352b   prom/prometheus:v2.37.0       "/bin/prometheus --w…"   9 days ago    Up 9 days   9090/tcp                                                                                                      rocketpool_prometheus
56940decdd1f   sigp/lighthouse:v2.5.1        "sh /setup/start-bn.…"   9 days ago    Up 9 days   0.0.0.0:9001->9001/tcp, 0.0.0.0:9001->9001/udp, :::9001->9001/tcp, :::9001->9001/udp                          rocketpool_eth2
bd061e632535   grafana/grafana:8.5.9         "/run.sh"                9 days ago    Up 9 days   3000/tcp, 0.0.0.0:3100->3100/tcp, :::3100->3100/tcp                                                           rocketpool_grafana
5c4db92762fb   ethereum/client-go:v1.10.21   "sh /setup/start-ec.…"   9 days ago    Up 9 days   8545-8546/tcp, 0.0.0.0:30303->30303/tcp, 0.0.0.0:30303->30303/udp, :::30303->30303/tcp, :::30303->30303/udp   rocketpool_eth1
e20c560861fc   rocketpool/smartnode:v1.5.0   "/bin/sleep infinity"    9 days ago    Up 9 days                                                                                                                 rocketpool_api
4cf8d364fb90   rocketpool/smartnode:v1.5.0   "/go/bin/rocketpool …"   9 days ago    Up 9 days                                                                                                                 rocketpool_watchtower
9eb944c29997   rocketpool/smartnode:v1.5.0   "/go/bin/rocketpool …"   9 days ago    Up 9 days                                                                                                                 rocketpool_node
2ca5d3dcb471   sigp/lighthouse:v2.5.1        "sh /setup/start-vc.…"   9 days ago    Up 9 days                                                                                                                 rocketpool_validator
dedc577fe361   prom/node-exporter:v1.3.1     "/bin/node_exporter …"   2 weeks ago   Up 9 days                                                                                                                 rocketpool_exporter
```

The key thing to check is the `STATUS` column.
If none of the entries state `Restarting...`, then the containers should be running properly (see the below note for an exception about the `rocketpool_validator` container).

::: warning NOTE
If you are using Prysm as your Consensus (ETH2) client, you will likely notice the `rocketpool_validator` container is constantly restarting.
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
If you are using **Lodestar** or **Prysm** as your Consensus (ETH2) client, you will likely notice the `rocketpool_validator` container is constantly restarting.
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


## Waiting for Your ETH Clients to Sync

Now that your clients have started up, you're going to want to wait until your Execution (ETH1) and Consensus (ETH2) clients have finished syncing with the network before proceeding.

One easy way to check on their status is with the following command:

```
rocketpool node sync
```

This command will show how far along your Execution (ETH1) & Consensus (ETH2) clients are in the syncing process, similar to this:

```
$ rocketpool node sync

Your Smartnode is currently using the Prater Test Network.

Your eth2 client is on the correct network.

Your primary execution client is fully synced.
You do not have a fallback execution client enabled.
Your consensus client is still syncing (99.69%).
```

You can call this occasionally to keep tabs on your clients' progress.

To get an actual ETA of the sync time, it's easiest to look at the logs for your clients with `rocketpool service logs eth1` and `rocketpool service logs eth2` respectively (or the equivalent log script commands if you're using the hybrid / native modes.)
Each client typically provides an ETA on its sync status in its log output.

::: tip NOTE
It can take **days** to fully sync both ETH1 and ETH2 depending on your client selection and your machine's hardware profile.
**This is expected**.
Sit back, relax, and wait for both of them to finish.
:::


## Next Steps

Once your clients have synced, you're ready to either [create a new wallet](./wallet-init.md) if this is your first node, or [recover an existing wallet](./recovering-rp.md) if you're restoring from a backup or migrating from another provider such as Allnodes to your own hardware. 

Select which one you'd like to learn more about and follow the steps in the corresponding guide.
