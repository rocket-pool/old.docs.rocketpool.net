# Backing Up your Node

::: tip NOTE
This is currently written for "Docker Mode" installations, if you are running native, or hybrid it some locations may vary
:::

Once the "Merge" takes place, there will no longer be an option to have a light fallback client.  This means that having a fast, reliable way to recover a corrupt Execution Client Database becomes critical, as they can take days to sync from scratch.

There are several things that you want to be able to recover from such as:

- Total loss of a node - hardware failure
- Total loss of a node - compromised or stolen
- Corruption or loss of Execution Client (eth1) or Consensus Client (eth2) Databases

Generally spekaing the only thing you need to truely backup is your mnemonic Everything else of importance can be recreated from them. Keep them very safe!

There are several other things you can backup to improve your resiliency, we will give examples of both simple and more complex approaches.

## Things that can be backed up

### Rocketpool Configuration
Rocketpool configuration files are stores in `~/.rocketpool`and are stored in the yml files

File Name - Description

`user-settings.yml` - Contains node specific configuration options

`prometheus.yml` - Contains Prometheus configurations

`grafana-prometheus-datasource.yml` - Contains Data source configuration for Grafana

### Private Keys and Passwords

Your private key and password file is stored in `~/.rocketpool/data`.  You can back these files up if you wish, you just need to be aware of where you store them.   For example storing them on an unencrypted external drive would be a bad idea, since it contains unencrypted versions of your private key and password file.   As mentioned above, this data can be recovered simply by using your mnemonic, which is a far more secure backup of this data.

### Execution Client / ETH1 Client Data

The eth1 client data is likely the most important thing to back up, besides your mnemonic! It can take several days to re-sync your EC/eth1 data.  Once fallback clients are deprecated this means days of downtime and lost ETH! The EC database could be lost due to hardware failure, or simply a database corruption event.

The data is stored within the docker volume, which by default is located at `/var/lib/docker/volumes/rocketpool_eth1clientdata ` 

If you changed your default storage location for docker during install the data is located in `/your external mount point/docker/volumes/rocketpool_eth1clientdata`

::: tip HINT
If you dont recall if you changed your mount point you can check `/etc/docker/daemon.json` for its location
:::


### Consensus Client / ETH2 Client Data  

Currently, Lighthouse, Nimbus, and Teku support checkpoint syncing.  Using checkpoint syncing you can very quickly recover your eth2 client data.  This decreases the need to back this data up.   If your Consensus Client / eth2 does not support checkpoint sync, then you may want to backup this data as well.

The data is stored within the docker volume, which by default is located at `/var/lib/docker/volumes/rocketpool_eth2clientdata ` 

If you changed your default storage location for docker during install the data is located in `your external mount point/docker/volumes/rocketpool_eth2clientdata`

### Monitoring & Metrics Data

The data is stored within the docker volume, which by default is located at `/var/lib/docker/volumes/rocketpool_grafana-storage ` 

If you changed your default storage location for docker during install the data is located in `/your external mount point/docker/volumes/rocketpool_prometheus-data`

If you do not remember if you defined a custom mount point you can check `/etc/docker/

## Backup of Execution Client / ETH1 Client Data

### Backing up your Execution Client Data
Backing up your Execution Client / ETH1 Data is easy!   The built in backup/export tool within Rocketpool utilizes `rsync`, a powerful backup/copy tool within Linux.  

The benefit of `rsync` is that the first time it will create a complete copy of the data.    This will take a good amount of time as it is a lot of data (how long depends on your system and drive performance).  However subsequent times you run the command it will only copy the changes making the process dramatically faster!

As part of a backup strategy you may want to plan on doing this on a regular basis.  Even after the fallback light clients are deprecated, the minutes of downtime to refresh the eth1 backup once every week or two is better than the days it would take to resync the data from scratch.

To do this, start by **mounting the storage medium you want to export the data to**.
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


### Restoring up your Execution Client Data 

If you have existing chain data for your new client and want to import it back into your node, simply run the same steps but use the following command instead:

To restore from a backup taken with the `rocketpool service export-eth1-data` method, simply run the following command.   This will automatically delete the existing eth1 client data.

```
rocketpool service import-eth1-data /mnt/external-drive
```


