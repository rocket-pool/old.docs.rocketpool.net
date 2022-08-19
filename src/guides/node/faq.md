# FAQ (WIP)

## I have an issue, how do I get help?

You can start by checking the [Rocket Pool Support](https://rocketpool.support) page. If that doesn't help, you can ask your question on the Rocket Pool #support channel on Discord.

## How can I get test ETH? I can't post messages on the faucet channel. 

The faucet is reserved for testing minipools and has been abused in the past so only a few users can make requests. Post your node wallet address into Discord's support channel explaining that you want to setup a minipool and someone will call the faucet for you.

## How do I recover my node if my machine breaks?

Short answer: your mnemonic is all that you need to fully recover your node. Always make sure to keep it safe.

To recover your node on a new machine start by making sure your previous machine is not going to be online again with the keys available, as two nodes running with the same keys will get you slashed. 
Follow the [steps](./install-modes.md) to install the smartnode on a new machine. Then, recover your node wallet and validator keys by running the command `rocketpool wallet recover` and insert your 24-word mnemonic.

## Why my clients are not syncing? I have a low amount of peers.
Clients need to have a healthy amount of peers to be able to properly sync. You can start by running the test [here](https://www.yougetsignal.com/tools/open-ports/) checking if ports 30303 and 9001 are opened. If they're closed, you'll need to setup port forwarding on your router. Also make sure your node has a static local IP address so the port forwarding sticks.

## My consensus client is taking too long to sync. What should I do?

Consensus clients can take a long time to sync if you didn't start the sync process using [Checkpoint Sync](./config-docker.md#beacon-chain-checkpoint-syncing-with-infura). Even if you're running it for a long time, it's usually faster to configure the checkpoint sync URL, clear the current sync data with `rocketpool service resync-eth2` and start over. Your client should be synced in less than a minute.

## How do I know how much my rETH is worth? Does it rebase?

The rETH token will not rebase. The amount of tokens on your wallet will remain constant but it accrues value over time. You can check [here](https://rocketscan.io/reth) for more information on the exchange rate.

## I've already rebooted. Why Grafana says I still need to reboot?

The reboot information takes some time to update. Running `sudo apt update` will force an update.


