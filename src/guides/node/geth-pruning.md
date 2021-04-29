# :evergreen_tree: Pruning Geth

If you use `geth` as your ETH1 client, you will notice that a newly synced node takes up far less space than a `geth` instance that synced a while ago and has been online since.

The reason for this is that the initial sync defaults to "fast sync" which downloads blocks and verifies their proof of work data, but does not reprocess all transactions. You can read more about this in the [Geth FAQ]( https://geth.ethereum.org/docs/faq ).

Since after the initial sync your node has been keeping track of all transactions in detail, it is taking up a lot more space than a fresh fast-sync would.

⚠️ Warning: this is advanced material, only prune if you understand what is going on.

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

## Example pruning script

To make the process of pruning easy to do, you can use the following script. Copy the contents into a file on your server, for example `~/prune-geth.sh`, and run the script.

Do not break the connection to your server during this process. Expect the process to take multiple hours. Anecdotally, it should take 5-10 hours.

```shell
#!/bin/zsh

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
if (( $freeDiskSpaceInGB < $minimumDiskSpaceinGB )); then
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
    snapshot prune-state --goerli --datadir $ETH1_MOUNT_POINT/geth

echo "Prune complete, restarting rocketpool ETH1 container"
docker start rocketpool_eth1
```
