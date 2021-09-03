# Pruning Geth

If you use `geth` as your ETH1 client, you will notice that a newly synced node takes up far less space than a `geth` instance that synced a while ago and has been online since.

The reason for this is that the initial sync defaults to "fast sync" which downloads blocks and verifies their proof of work data, but does not reprocess all transactions. You can read more about this in the [Geth FAQ]( https://geth.ethereum.org/docs/faq ).

Since after the initial sync your node has been keeping track of all transactions in detail, it is taking up a lot more space than a fresh fast-sync would.

::: warning
This is advanced material, only prune if you understand what is going on.
:::

## Pruning clears disk space

You can clear up a lot of disk space by pruning your `geth` data, which puts your local data in the same state as a fast sync would.

Note: as of writing this is a beta feature. See the [offline pruning section here]( https://blog.ethereum.org/2021/03/03/geth-v1-10-0/ ).

The process of pruning is:

1. Stop your `geth`
2. Run the pruning command
3. Start your `geth`

Since Rocketpool runs all clients in docker containers, we thus need to:

1. Stop the Rocketpool ETH1 container
2. Start up a new container with `geth` that uses *the same data directory as the Rocketpool managed container* which runs the pruning command
3. Start the Rocketpool ETH1

There are some important things to note:

- Your `geth` will be **offline** during the prune, the longer your node has been running, the longer the prune takes
- You need at least `40GB` of free disk space for the prune to succeed, of you are below that you run the risk of corrupting your data
- The enterprising among you may want to run an Infura fallback during this process

## How to prune geth

These are step by step pruning instructions. If you are an advanced user, you may consider the script below these instructions instead.

### Step 1: ensure sufficient disk space

There are a few preconditions for the pruning process. The fist is that we need at least `50 GB` of free disk space on the drive that holds your `eth1` chain data. To check this, run the following to check your mounted drives:

```shell
df -h
```

The output will look something like this:

```
Filesystem      Size  Used Avail Use% Mounted on
udev            3.8G     0  3.8G   0% /dev
tmpfs           782M  4.6M  777M   1% /run
/dev/mmcblk0p2  118G   13G  100G  12% /
/dev/sda1       1.8T  128G  1.7T   7% /mnt/ssd
```

We are looking for the mount path of the SSD that holds the chain data, in the above example this is `/mnt/ssd`. Write down that path, we will need it later. Note that we are *not* looking for the device identifier, so not a path that starts with `/dev`.

We can check the free disk space of the drive by looking at the `Avail` column. Make sure this is over `50GB`.

### Step 2: get geth version

We will be using a non-rocketpool docker container that runs geth in order to do the pruning. To make sure the external geth is fully compatible with your chain data, we'll need to make sure we use the exact same geth version.

To check your Rocketpool geth version, run:

```shell
docker exec -i rocketpool_eth1 geth version | grep -Po "(?<=^Version: )[0-9\.]+"
```

This will output a version number, like `1.10.8`. 

### Step 3: stop Rocketpool eth1

While the pruning is done, we need to make sure there is no interference from a running Rocketpool container. To do this we don't need to stop Rocketpool altogether, we can simply stop the eth1 container by running:

```shell
docker stop rocketpool_eth1
```

### Step 4: start the pruning

Based on the geth version you retreived in step 2, we will download a new docker container that will do the pruning. In the below command, substitute the word `GETH_VERSION` with the version number and the `ETH_MOUNT_POINT` with the mount path from step 1 (twice!):

```shell
docker run --rm \
    -v rocketpool_eth1clientdata:👉ETH1_MOUNT_POINT \
    -ti ethereum/client-go:v👉GETH_VERSION \
    snapshot prune-state --datadir 👉ETH1_MOUNT_POINT/geth
```

This could for example look like:

```shell
# 🛑 This is an example, do NOT copy paste
docker run --rm \
    -v rocketpool_eth1clientdata:/mnt/ssd \
    -ti ethereum/client-go:v1.10.8 \
    snapshot prune-state --datadir /mnt/ssd/geth
```

The pruning process will now start, this can take 5 to 10 hours depending on how long your geth has been running.

::: warning NOTE
If you are running on testnet, make sure to change `prune-state` to `prune-state --goerli`.
:::

Do not close your terminal or stop the pruning command while it is running.

### Step 5: restart the Rocketpool eth1 container

Once the pruning command is done, you can restart the Rocketpool container by running:

```shell
docker start rocketpool_eth1
```

You are now done pruning.

## Example pruning script

To make the process of pruning easy to do, you can use the following script. Copy the contents into a file on your server, for example `~/prune-geth.sh`, and run the script.

Do not break the connection to your server during this process. Expect the process to take multiple hours. Anecdotally, it should take 5-10 hours.

::: warning NOTE
If you are running on testnet, make sure to change `prune-state` to `prune-state --goerli`.
:::

```shell
#!/bin/sh

#########################
# customisation settings
#########################
PATH_CONSTRAINING_DISK_SPACE='/' # Depends on your device
ETH1_CONTAINER='rocketpool_eth1' # See docker ps
GETH_VERSION=$( docker exec -i rocketpool_eth1 geth version | grep -Po "(?<=^Version: )[0-9\.]+" ) # See docker exec -i rocketpool_eth1 geth version
ETH1_DATA_VOLUME="rocketpool_eth1clientdata" # See docker volumes ls
ETH1_MOUNT_POINT="/ethclient"

# Hardware constraints
minimumDiskSpaceinGB=50
freeDiskSpaceInGB=$( df -BG $PATH_CONSTRAINING_DISK_SPACE | grep -Po "(\d+)(?=G \ *\s+\d+%)" )



###################
# Sanity checks
###################
echo "Path constraining disk space: $PATH_CONSTRAINING_DISK_SPACE"
echo "Is this correct? [y/n]"
read DISKPATHCORRECT

# Check if disk constraint is correct
if [ "$DISKPATHCORRECT" = "n" ]; then
    echo "You may change the disk path at the top of this script by editing PATH_CONSTRAINING_DISK_SPACE"
    exit 0
else
    echo "✅ Disk location confirmed"
fi

# Check if volume exists
if docker volume ls | grep -q "$ETH1_DATA_VOLUME"; then
    echo "✅ Volume $ETH1_DATA_VOLUME exists"
else
    echo "🛑 Volume $ETH1_DATA_VOLUME does not exist"
    exit 1
fi

# Check for free disk space
if [ $freeDiskSpaceInGB -lt $minimumDiskSpaceinGB ]; then
    echo "🛑 Free disk space is $freeDiskSpaceInGB, which is under the minimum $minimumDiskSpaceinGB GB"
    exit 1
else
    echo "✅ Free disk space is $freeDiskSpaceInGB GB"
fi

#####################
# Pruning actions
#####################

echo "Stopping rocketpool ETH1 container"
docker stop rocketpool_eth1

echo "Starting GETH offline prune"
docker run --rm \
    -v $ETH1_DATA_VOLUME:$ETH1_MOUNT_POINT \
    -ti ethereum/client-go:v$GETH_VERSION \
    snapshot prune-state --datadir $ETH1_MOUNT_POINT/geth

echo "Prune complete, restarting rocketpool ETH1 container"
docker start rocketpool_eth1
```

For the advanced terminal users, you may run the script in the background using a command like `nohup sh prune.sh & disown`. Note that this will skip the disk path check. You may then track progress with `tail -f nohup.out` or a similar command.