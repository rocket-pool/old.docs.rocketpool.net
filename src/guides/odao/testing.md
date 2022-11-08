# Testing your Oracle DAO Node

Once your node is set up and you've joined the Oracle DAO, you should test it to ensure it's able to perform its duties properly.
The best way to do this is to have it build the Redstone rewards Merkle tree using Rocket Pool's `treegen` utility.


### treegen

`treegen` is a tool that can reproduce the entire rewards Merkle tree and accompanying artifacts for a previous rewards interval via your archive Execution and Consensus clients.
It can also "dry run" the current interval by pretending that it ended at the latest finalized epoch (at the time of running it) and producing a partial tree from the start of the interval up to that point.

::: tip TIP
For more information on the rewards tree itself and accompanying files, please visit the formal specification: [https://github.com/rocket-pool/rocketpool-research/blob/master/Merkle%20Rewards%20System/merkle-tree-spec.md](https://github.com/rocket-pool/rocketpool-research/blob/master/Merkle%20Rewards%20System/merkle-tree-spec.md).
:::

`treegen` can be used as a standalone binary (currently only built for Linux systems, x64 and arm64) or as a Docker container.

If you would like to download the standalone binary, you can find it in the releases here: [https://github.com/rocket-pool/treegen](https://github.com/rocket-pool/treegen).
Usage instructions are included in the README there, but we'll cover some examples below as well.

The Docker container tag for it is `rocketpool/treegen:latest`.


## Building a Dry-Run Tree

For a first test, run `treegen` to generate a dry-run tree that calculates the tree from the start of the rewards interval to the latest (finalized) slot.
We'll use [the script](https://github.com/rocket-pool/treegen/blob/main/treegen.sh) included in the repository that leverages the Docker container to run it on the node machine itself for simplicity:

```
./treegen.sh -e http://localhost:8545 -b http://localhost:5052
```

::: warning NOTE
Note that this particular configuration requires you to expose the Execution Client and Beacon Node APIs through the Docker configuration - ensure you have both options enabled in the `rocketpool service config` TUI.
:::

This will test your clients' abilities to respond to queries in a timely fashion (e.g., if you are using a third-party service, this will be helpful to assess whether or not its query rate-limit is insufficient), but **will not test their Archive Mode capabilities**. 
It will produce output like the following:

```
2022/11/06 12:11:37 Beacon node is configured for Mainnet.
2022/11/06 12:11:37 Generating a dry-run tree for the current interval (3)
2022/11/06 12:11:37 Snapshot Beacon block = 5077503, EL block = 15912334, running from 2022-10-27 01:35:39 -0400 EDT to 2022-11-06 12:11:37.672755513 -0500 EST m=+0.049901525

2022/11/06 12:11:38  Creating tree for 1684 nodes
2022/11/06 12:11:38  Pending RPL rewards: 27807066876373932561121 (27807.067)
2022/11/06 12:11:38  Total collateral RPL rewards: 19464946813461752792784 (19464.947)
2022/11/06 12:11:47  Calculated rewards:           19464946813461752792026 (error = 758 wei)
2022/11/06 12:11:47  Total Oracle DAO RPL rewards: 4171060031456089884168 (4171.060)
2022/11/06 12:11:47  Calculated rewards:           4171060031456089884168 (error = 0 wei)
2022/11/06 12:11:47  Expected Protocol DAO rewards: 4171060031456089884168 (4171.060)
2022/11/06 12:11:47  Actual Protocol DAO rewards:   4171060031456089884927 to account for truncation
2022/11/06 12:11:47  Smoothing Pool Balance: 62781809204406327225 (62.782)
2022/11/06 12:11:55  1229 / 1684 nodes were eligible for Smoothing Pool rewards
2022/11/06 12:12:03  Checking participation of 4364 minipools for epochs 156315 to 158671
2022/11/06 12:12:03  NOTE: this will take a long time, progress is reported every 100 epochs
2022/11/06 12:13:48  On Epoch 156415 of 158671 (4.24%)... (1m44.577189073s so far)

...

2022/11/06 12:49:55  On Epoch 158615 of 158671 (97.62%)... (37m51.785456663s so far)
2022/11/06 12:50:51  Finished participation check (total time = 38m47.979633935s)
2022/11/06 12:50:51  Pool staker ETH:    26638263090669169632 (26.638)
2022/11/06 12:50:51  Node Op ETH:        36143546113737157593 (36.144)
2022/11/06 12:50:51  Calculated NO ETH:  36143546113737155125 (error = 2468 wei)
2022/11/06 12:50:51  Adjusting pool staker ETH to 26638263090669172100 to account for truncation
2022/11/06 12:50:52 Saved minipool performance file to rp-minipool-performance-mainnet-3.json
2022/11/06 12:50:52 Generation complete! Saving tree...
2022/11/06 12:50:52 Saved rewards snapshot file to rp-rewards-mainnet-3.json
2022/11/06 12:50:52 Successfully generated rewards snapshot for interval 3.
```

If this runs without error, it will generate the rewards tree artifacts and save them as JSON files in your working directory.
You are free to explore them and ensure their contents are sane, but as they are dry-run files, they aren't canonically stored anywhere for comparison.


## Building a Canonical Tree from a Past Interval

This next test is to replicate one of the complete trees from a past interval.
This will require archival access on both the Execution Layer and the Consensus Layer, so it will serve as a good test of both capabilities.

As of this writing, **Interval 2** is an ideal choice as it is far in the past () and involved the Smoothing Pool (which accounts for the largest computational load when calculating the rewards for the period).

Run `treegen` using the following command:

```
./treegen.sh -e http://<your archive EC url> -b http://localhost:5052 -i 2
```

Note that the **Execution Client URL** is different here: it *must be* an Archive EC as the snapshot block for Interval 2 was far in the past.

::: warning NOTE
Depending on your client configuration, building this tree can take *hours*.
The Smartnode will give you status indicators about its progress along the way, as you can see in the example below.
:::

The output will look like this (truncated for previty):

```
2022/11/07 23:44:34 Beacon node is configured for Mainnet.
2022/11/07 23:44:36 Found rewards submission event: Beacon block 5002079, execution block 15837359
2022/11/07 23:46:25  Creating tree for 1659 nodes
2022/11/07 23:46:26  Pending RPL rewards: 70597400644162994104151 (70597.401)
2022/11/07 23:46:26  Approx. total collateral RPL rewards: 49418180450914095872905 (49418.180)
2022/11/07 23:46:26  Calculating true total collateral rewards (progress is reported every 100 nodes)
2022/11/07 23:47:06  On Node 100 of 1659 (6.03%)... (40.134456319s so far)
...
2022/11/07 23:57:41  On Node 1600 of 1659 (96.44%)... (11m14.880994468s so far)
2022/11/07 23:58:03  Calculating individual collateral rewards (progress is reported every 100 nodes)
2022/11/07 23:58:14  On Node 100 of 1659 (6.03%)... (11.421791885s so far)
...
2022/11/08 00:01:20  On Node 1600 of 1659 (96.44%)... (3m16.598462676s so far)
2022/11/08 00:01:26  Calculated rewards:           49418180450914095872087 (error = 818 wei)
2022/11/08 00:01:26  Total Oracle DAO RPL rewards: 10589610096624449115622 (10589.610)
2022/11/08 00:01:30  Calculated rewards:           10589610096624449115610 (error = 12 wei)
2022/11/08 00:01:30  Expected Protocol DAO rewards: 10589610096624449115622 (10589.610)
2022/11/08 00:01:30  Actual Protocol DAO rewards:   10589610096624449116454 to account for truncation
2022/11/08 00:01:30  Smoothing Pool Balance: 209598268075128756591 (209.598)
2022/11/08 00:04:20  On Node 104 of 1659 (6.27%)... (2m49.443336528s so far)
...
2022/11/08 00:27:33  On Node 1664 of 1659 (99.70%)... (27m28.373343345s so far)
2022/11/07 16:40:36  1197 / 1659 nodes were eligible for Smoothing Pool rewards
2022/11/07 16:45:45  Checking participation of 4308 minipools for epochs 150015 to 156314
2022/11/07 16:45:45  NOTE: this will take a long time, progress is reported every 100 epochs
2022/11/07 16:47:24  On Epoch 150115 of 156314 (1.59%)... (1m38.552513232s so far)
...
2022/11/07 18:24:31  On Epoch 156215 of 156314 (98.43%)... (1h38m46.325518238s so far)
2022/11/07 18:26:10  Finished participation check (total time = 1h40m24.47206731s)
2022/11/07 18:26:10  Pool staker ETH:    88931841842952006598 (88.932)
2022/11/07 18:26:10  Node Op ETH:        120666426232176749993 (120.666)
2022/11/07 18:26:10  Calculated NO ETH:  120666426232176747457 (error = 2536 wei)
2022/11/07 18:26:10  Adjusting pool staker ETH to 88931841842952009134 to account for truncation
2022/11/07 18:26:10 Finished in 2h36m3.709234237s
2022/11/07 18:26:10 Your Merkle tree's root of 0x278fd75797e2a9eddc128c0199b448877e30d1196c12306bdc95fb731647c18f matches the canonical root! You will be able to use this file for claiming rewards.
2022/11/07 18:26:10 Saving JSON files...
2022/11/07 18:26:10 Saved minipool performance file to rp-minipool-performance-mainnet-2.json
2022/11/07 18:26:10 Saved rewards snapshot file to rp-rewards-mainnet-2.json
2022/11/07 18:26:10 Successfully generated rewards snapshot for interval 2.
```

The key thing to look for here is this message at the end:

```
Your Merkle tree's root of 0x278fd75797e2a9eddc128c0199b448877e30d1196c12306bdc95fb731647c18f matches the canonical root! You will be able to use this file for claiming rewards.
```

If you receive this, then your watchtower can build the tree correctly.

::: danger NOTE
While this proves you can build the tree, you *must* ensure your Web3.Storage API token has been entered into the Smartnode's configuration so it can upload the resulting tree to IPFS.
::: 