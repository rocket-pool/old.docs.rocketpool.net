# Migrating from the Test Network to Mainnet

If you've already used Rocket Pool on our Prater test network, are comfortable with its ins and out, and are ready to either stake ETH or run a node for real on the main Ethereum chain, then this guide is for you!
Here you will find instructions on how to migrate an existing Smartnode stack from the Prater test network to one connected to the Ethereum mainnet, ready for staking your own real ETH and RPL.


## Pool Staking on Mainnet

Pool staking is largely the same process on mainnet as it was on the testnet.
The URL will be different and the address of the rETH token may be different, but there are no significant changes to the workflow.
Follow the [Staking Guide](../staking/staking.md), which has been updated with instructions for mainnet.


### Differences Between the Testnet and Mainnet

- The testnet Smartnode has a faucet for test ETH. The mainnet Smartnode **does not have a faucet**. You will need to supply your own ETH in order to stake.
- Mainnet supports many Ethereum wallets via WalletConnect, so you can use other wallets that you could not use on the testnet. **You are no longer restricted to using Metamask in order to stake**.


## Smartnode Operation on Mainnet

::: warning NOTE
**Nothing** from the test network can be migrated to mainnet. 
The chain data is different for both ETH1 and ETH2, so you must remove the old chain data and resync the mainnet chains from scratch.
Your validators on the testnet do not carry over to mainnet.
Also, for security, compatibility, and safety purposes, **you must make a new wallet on mainnet!**
**Do not use your testnet node wallet on mainnet!**

**The following steps will delete all of your testnet data.**
If you want to preserve your test network setup, you should back up your hard drive or move it to a second machine.
:::

Moving a node from the testnet to mainnet is a simple process:

::::: tabs
:::: tab Docker and Hybrid Modes
1. **While you still have the testnet configured**, exit your validators on Prater:
    ```
    rocketpool minipool exit
    ```

    Select `1: All available minipools` from the list of choices and wait for it to complete.
    This will help clean up the network by removing your validators instead of leaving them to constantly fail attestations and weaken Prater's health (since they're no longer online).

1. Shut down the testnet:
    ```
    rocketpool service stop
    ```

1. Delete your testnet chain data and Docker containers:
   ```
   rocketpool service terminate
   ```

1. Delete your Rocket Pool configuration folder:
   ```
   sudo rm -rf ~/.rocketpool
   ```

1. (Optional) Delete your Rocket Pool CLI:
   ```
   rm ~/bin/rocketpool
   ```
   You will overwrite this with the latest version of the CLI anyway, but if you want to be thorough, you can remove the old one first.

At this point your testnet installation has been purged, and you can safely migrate to a new mainnet installation.
::::

:::: tab Native Mode
1. **While you still have the testnet configured**, exit your validators on Prater:
    ```
    rocketpool minipool exit
    ```

    Select `1: All available minipools` from the list of choices and wait for it to complete.
    This will help clean up the network by removing your validators instead of leaving them to constantly fail attestations and weaken Prater's health (since they're no longer online).

1. Stop all of the Rocket Pool and Ethereum services (using, for example, `geth` and `lighthouse`; replace with the services you created during installation):
   ```
   sudo systemctl stop rp-node rp-watchtower geth lh-bn lh-vc
   ```

1. Delete all of the testnet chain data (for example, using `geth` and `lighthouse` on x64; replace with your own configuration):
   ```
   sudo rm -rf /srv/geth/geth_data
   sudo rm -rf /srv/lighthouse/lighthouse_data
   ```

1. Delete the Rocket Pool configuration folder:
   ```
   sudo rm -rf /srv/rocketpool
   ```

1. (Optional) Remove the Rocket Pool CLI and Daemon binaries:
   ```
   sudo rm /usr/local/bin/rocketpool /usr/local/bin/rocketpoold
   ```
   You will overwrite these with the latest versions anyway, but if you want to be thorough, you can remove the old ones first.

::: warning NOTE
For the sake of simplicity, these instructions *do not include* some steps such as removing the `eth1` and `eth2` users, or removing the services that you stopped earlier.
You can reuse them and ignore the steps involved in setting them up in the installation guide.

You will need to redo some of the installation steps including:
- Create the `/srv/rocketpool` folder and its skeleton framework, and set the permissions properly
- Get the latest release versions of the ETH1, ETH2, and Validator client binaries
- Set the **`ExecStart` string** in the services (**use the mainnet configuration defined in the installation guide!)**
- Get the latest CLI and Daemon binaries
- Get the latest configuration files from the installer archive, put them into `/srv/rocketpool`, and adjust them to match your node's setup
:::

At this point you're ready to migrate following [the installation guide](./native.md).
::::
:::::


### Differences Between the Testnet and Mainnet

- The testnet Smartnode has a faucet for ETH and RPL. The mainnet Smartnode **does not have a faucet**. You will need to supply your own ETH and your own RPL.
- If you are using Geth, your node's workload will be **considerabily higher**. Geth takes approximately 20x the storage space of Goerli (400 GB as of 2021-09-05), and requires more CPU power and RAM to process. If you're using the Rocket Pool Grafana dashboard, be prepared to see much higher usage.
- Your Beacon Chain peers (and thus, your attestation effectiveness) will be **higher** than the testnet. Peers on mainnet are much more diverse and tend to be higher quality than on the testnet.
- The RPL rewards checkpoint occurs every **28 days** instead of every 3 days, to help offset high gas costs.
- The RPL price used by the Rocket Pool network (and thus, your collateral level) along with the total effective staked RPL across the network are reported **once every 24 hours** instead of once every hour. 
