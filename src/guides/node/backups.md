# Backing Up Your Node

::: tip NOTE
This is currently written for **Docker Mode** installations.
Some locations may vary for Hybrid or Native users.
:::

In general, if you created your node wallet and minipools via the Smartnode, the only thing you truly need on hand to recover your node from a complete failure is the **mnemonic for your node wallet**
Everything else can be recovered from that quite easily.

If you have minipools that have externally-generated validator keys (e.g. you migrated from **Allnodes** to your own self-hosted node), you will need the private keystore files for your validators as well since they cannot be recovered from the node wallet.

That being said, once the Merge takes place, you will no longer be able to use a light Execution client (e.g. Pocket or Infura) as a fallback if you ever need to resync the Execution layer chain.
Furthermore, you will be required to have an active and healthy Execution client to attest correctly.
Having a fast, reliable way to recover from an Execution client failure (such as a corrupt database, SSD malfunction, or compromised / stolen hardware) will be critical, as it can take hours or even days to sync from scratch.

In this guide, we'll show you how to back up some of these things to help improve your node's resilience and minimize unnecessary downtime.

::: warning NOTE
This guide assumes you have installed the Smartnode to the default directory (`~/.rocketpool`).
If you specified a different installation directory, substitute it accordingly in the instructions below.
:::

## Items That Can Be Backed Up

### Smartnode Configuration

The Smartnode's configuration is stored in `~/.rocketpool/user-settings.yml`.
You can save this and replace it to restore all of your Smartnode settings (i.e., the things you specified in `rocketpool service config`).


### Execution Client / ETH1 Client Chain Data

The Execution client's chain data is likely the most important thing to back up.
As mentioned, it can take several days to re-sync your EC chain data.
After The Merge, this means hours to days of downtime and lost profits!

The chain data is stored within the `rocketpool_eth1clientdata` Docker volume, which by default is located at `/var/lib/docker/volumes/rocketpool_eth1clientdata`.
Note this folder is typically not accessible by unprivileged user accounts; you will need to elevate to the `root` user to see it.

::: tip NOTE
If you changed Docker's storage location during the initial Smartnode installation (such as Raspberry Pi users or people that run Docker on a second SSD), you will find the volume in `/<your external mount point>/docker/volumes/rocketpool_eth1clientdata`

If you don't recall which installation path you use, you can check `/etc/docker/daemon.json` for its location.
If the file doesn't exist, you use the default location.
:::

For detailed instructions on how to efficiently back up your Execution chain data, please see the [Backing up your Execution Chain Data](#backing-up-your-execution-chain-data) section below.


### Monitoring & Metrics Data

This data is stored within the `rocketpool_grafana-storage` Docker volume, which by default is located at `/var/lib/docker/volumes/rocketpool_grafana-storage` (or `/<your external mount point>/docker/volumes/rocketpool_prometheus-data` if you customized your Docker storage location).


## Items That Should **Not** Be Backed Up

### Private Keys and Passwords

Your node wallet's private key and the password file used to encrypt it are stored in `~/.rocketpool/data/wallet` and `~/.rocketpool/data/password` respectively.
These files don't generally need to be backed up, as they can be recovered from your mnemonic using `rocketpool wallet recover`.

If, for some reason, you *do* decide to back up these files, you will need to be **extremely careful** about how you store them.
Anyone who gains access to these files will gain access to your node wallet, its validators, and any funds you have stored on it for things like gas.

We **strongly recommend** you do not back up these files and just use your wallet mnemonic to recover them if necessary.


### Consensus Client / ETH2 Client Chain Data  

Unlike the Execution layer data, the Consensus layer data is not nearly as important to your node thanks to [Checkpoint Sync](./config-docker.md#beacon-chain-checkpoint-syncing).
Consensus clients can easily use this technique to immediately resync to the head of the Beacon chain and resume validation duties.


## Backing up your Execution Chain Data

The Smartnode comes with the ability to back up your Execution chain data via the `rocketpool service export-eth1-data` command.
Under the hood, this utilizes `rsync`, a powerful backup/copy tool within Linux.

`rsync` compares the files in the source directory (your Docker volume) and the target directory (your backup location).
If a source file doesn't exist in the target directory, it will be copied entirely.
However, if it *does* exist, `rsync` will only copy the *changes* between the two files.

This means the first backup will take a good amount of time as it must copy all of the data initially.
Subsequent backups will only copy the changes between your previous backup and now, making the process much faster.

As part of a backup strategy, you may want to plan to run `export-eth1-data` on a regular basis.
To ensure the integrity of the chain data, running this command will **safely shut down the Execution client before backing up its data**.
If you elect to schedule it every week, your Execution client will only be down for a few minutes while it updates the backup.
This is certainly better than the days it would take to resync the data from scratch.


To trigger a backup, start by **mounting the storage medium you want to export the data to**.
For example, this could be an external hard drive.

::: tip HINT
If you don't know how to mount external devices on Linux, it's easy!
Plug the device into your node, and follow [a guide like this](https://www.addictivetips.com/ubuntu-linux-tips/mount-external-hard-drives-in-linux/) to learn how to mount it.
:::

Once you have it mounted, note its mount path.
For this example, let's assume that we want to store the chain data in a folder called `/mnt/external-drive` which the external device is mounted to.
Replace this with your actual mount path wherever you see it below.

Now, run the following command:

```
rocketpool service export-eth1-data /mnt/external-drive
```

This will check that your target folder is reachable and has enough free space to store the chain data.
The output will look like this:

```
This will export your execution client's chain data to an external directory, such as a portable hard drive.
If your execution client is running, it will be shut down.
Once the export is complete, your execution client will restart automatically.

You have a fallback execution client configured (http://<some address>:8545).
Rocket Pool (and your consensus client) will use that while the main client is offline.

Chain data size:       87 GiB
Target dir free space: 287 GiB
Your target directory has enough space to store the chain data.

NOTE: Once started, this process *will not stop* until the export is complete - even if you exit the command with Ctrl+C.
Please do not exit until it finishes so you can watch its progress.

Are you sure you want to export your execution layer chain data? [y/n]
```

As you can see, the chain data is 87 GB (for the Prater testnet; the Ethereum mainnet will be an order of magnitude larger) and the external folder has 287 GiB free so exporting can continue.

When you're ready, enter `y` here and press `Enter`.
This will stop your Execution client and begin copying its chain data to your target folder.
You will see the progress of each individual file go past the screen as it runs.

::: warning NOTE
It's important that you *do not* exit the terminal while this is running.
If you do, the copy will continue to run in the background but you won't be able to follow its progress!
:::

Once it's finished, it will automatically restart your Execution client container.

**Note that your existing chain data is not deleted from your node after the export is complete!**


### Restoring Your Execution Chain Data 

If you ever need to restore your backed up chain data, simply run the following command.

```
rocketpool service import-eth1-data /mnt/external-drive
```

::: danger WARNING
This will automatically delete any existing Execution client data in your `rocketpool_eth1clientdata` volume!
:::

Once it's done, your Execution client will be ready to go.
