# Quickstart / Cheatsheet

This is a non-exhaustive quickstart. It is probably only useful if you are intimately familiar with the commandline and/or have run a Rocketpool node before.

These scripts assume you are using a `zsh` shell on `Ubuntu 20.04 LTS`. If you are not, use `crtl+f` for instances of `.zshrc` to check where you need to edit them.

::: danger 🚨 IMPORTANT
This is not a beginner guide, if this is your first time using Rocketpool [start here]( https://docs.rocketpool.net/guides/ ).
:::



## Step 1: prep the server

Make sure your server is accessible and ready to go with a non-root user. For inspiration see [this script suite on Github]( https://github.com/actuallymentor/vps-setup-ssh-zsh-pretty ).

If you're behind a NAT forward ports `9001/(udp,tcp)` and `30303:30305/(tcp,udp)` them to your box as well. This is done in your router settings, [find your router model here]( https://portforward.com/router.htm ) if this is new to you. If you have multiple modem/router devices you may have to forward them all, see [this article]( https://portforward.com/help/doublerouterportforwarding.htm ).

## Step 2: install Rocketpool

See the [ docs page ]( https://docs.rocketpool.net/guides/node/docker.html#downloading-the-rocket-pool-cli ) for details.

```shell
####################
# User vars
####################
echo "Are you using raspberry pi? [y/N]"
read RASPBERRY_PI
RASPBERRY_PI=${RASPBERRY_PI:-n}

if [ "$RASPBERRY_PI" = "y" ]; then
	echo "What is the mount path of your ssd? (probably /mnt/something)"
	read EXTERNAL_SSD_MOUNT
	EXTERNAL_SSD_MOUNT=${EXTERNAL_SSD_MOUNT:-/mnt/ssd}
fi

###################
# Rocketpool setup
###################

# https://docs.rocketpool.net/guides/node/docker.html#downloading-the-rocket-pool-cli
mkdir -p ~/bin

# Get the relevant executable
if [ "$RASPBERRY_PI" = "y" ]; then
	wget https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-cli-linux-arm64 -O ~/bin/rocketpool
else
	wget https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-cli-linux-amd64 -O ~/bin/rocketpool
fi

chmod +x ~/bin/rocketpool

echo "export PATH=~/bin/:$PATH" >> ~/.zshrc
source ~/.zshrc
PATH=~/bin/:$PATH

# If needed for PI, change docker data location
if [ "$RASPBERRY_PI" = "y" ]; then
	sudo mkdir -p $EXTERNAL_SSD_MOUNT"/docker" || echo "Folder creation failed"
	echo "{ \"data-root\": \"$EXTERNAL_SSD_MOUNT/docker\" }" | sudo tee -a /etc/docker/daemon.json > /dev/null
fi

# Initialize rocketpool service
rocketpool service install
source ~/.zshrc

# Choose clients
rocketpool service config

#################
# Initial start
#################

echo -e "\n-----------------"
echo "Log out and back in"
echo -e "-----------------\n\n"

echo "Then run 'rocketpool service start'and 'rocketpool wallet init'"
```

## Step 3: start services

As the above script states, you need to log out and in before starting the service and initting the wallet with `rocketpool wallet init`. If you do not you'll get a bunch of errors. If you are logged in to the non-root user via the root user, you can simply run `exit` and `su <non-root user name>`.

After logging out and in, run `rocketpool service start` to start the containers. You can then use the cli [as documented]( https://docs.rocketpool.net/guides/node/cli-intro.html )

## Step 4: wait for sync to complete

Docker will sync the ETH1 and ETH2 chains now. The ETH1 will be quick (<12 hours), the ETH2 will be slow (Lighthouse/Teku/Prysm about a day, Nimbus multiple days). You can check progress with `rockerpool node sync`. This will error for a bit until there is sufficient data.

The ETH2 sync is CPU dependent, when using a Pi: make sure it is [ overclocked ](https://docs.rocketpool.net/guides/node/local/prepare-pi.html#overclocking-the-pi) as much as your cooling allows.

## Step 5: Start validators

This has multiple steps:

1. [Set a withdrawal address]( https://docs.rocketpool.net/guides/node/create-validator.html#setting-your-withdrawal-address )
1. `rocketpool node register` to announce your node
1. `rocketpool node stake-rpl` to stake your RPL collateral
1. `rocketpool node deposit` to create a minipool
1. `rocketpool minipool status` to check their status

## Step 6: maintenance

Keep your node secure and running smoothly:

1. Monitor uptime and performance, for example with [Beaconcha.in](https://beaconcha.in/) and [Uptimerobot](https://uptimerobot.com/)
2. Check that the RPL rewards are sent to your withdrawal address every 28 days
3. [Prune when needed]( https://docs.rocketpool.net/guides/node/geth-pruning.html#pruning-clears-disk-space )
4. [Update the Rocketpool stack]( https://docs.rocketpool.net/guides/node/updates.html#updating-the-smartnode-stack ) periodically