# :bar_chart: Monitoring your Node's Performance

Now that your node is up and running and you have one or more minipools attached, you'll need to keep an eye on everything to make sure it's running smoothly.


## Tracking your Machine's Status

With respect to your machine's status, there are a few useful metrics you'll probably want to keep an eye on:

- CPU Usage
- Free RAM remaining
- Swap space usage (if you enabled it)
- Remaining free disk space
- Network I/O (if your ISP imposes a data cap)

::: tip NOTE
The sections below show you some ways to monitor things, but they require you to be logged into the terminal of your machine.
There is a better, much more convenient and much nicer-looking method that uses a [Grafana web dashboard](grafana.md) but it is still under development.
Stay tuned for the completion of that section!
:::

### CPU, RAM, and Swap

The first three can be easily viewed with the `htop` program.
This will give you a nice live view into your system resources, as shown by this screenshot from a Raspberry Pi:

```
$ htop
```

![](./local/images/pi/Htop.png)

On the top display with the bars, the numbered bars each refer to a CPU core's current usage.

`Mem` shows you how much RAM you're currently using (in this screenshot, 1.75 GB) and how much you have total (3.70 GB).

`Swp` shows you how much swap space you're using (85.8 MB) and how much you have total (12.0 GB).

On the bottom table, each row represents a process.
Your ETH1 and ETH2 clients will likely be on top (in this case, Geth and Nimbus) which you can see in the rightmost column labeled `Command`.

The `RES` column shows you how much RAM each process is taking - in this screenshot, Geth is taking 748 MB and Nimbus is taking 383 MB.

The `CPU%` column shows you how much CPU power each process is consuming.
100% represents a single core, so if it's over 100%, that means it's using a lot from multiple cores (like Geth is here, with 213%).


### Remaining Free Disk Space

Keeping an eye on how much disk space you have free is easy to do with the following command:

```
df -h
```

This will provide output similar to the following example:

```
Filesystem        Size  Used Avail Use% Mounted on
...
/dev/mmcblk0p2     30G   12G   16G  43% /
...
/dev/sda1         1.8T  852G  981G  47% /mnt/rpdata
...
```

For conventional setups where you have one drive that stores both your Operating System and your ETH1 / ETH2 chain data, you just need to look at the entry that has `/` in the `Mounted on` column.
This represents your main disk.
If that ever looks like it's running out of space (say, 80% used or so), then you need to start thinking about doing some cleanup.
For example, if you're running Geth, you may want to look at [how to prune it](./geth-pruning.md) to clear up some space.

For setups that store the ETH1 / ETH2 chain data on a separate drive (such as the Raspberry Pi, which the above example comes from), you'll want to look at the row that has your chain data folder in the `Mounted on` column as well.
In this example we mounted an external SSD to `/mnt/rpdata`, so we'll have to keep an eye on it to make sure it doesn't grow too large either.


### Network I/O and Data Usage

If you want to track how much network I/O your system uses over time, you can install a nice utility called `vnstat`.
Here's an example of installing it on a Ubuntu / Debian system:

```
$ sudo apt install vnstat
```

To run it, do this (assuming `eth0` is the name of the network interface you use for your Internet connection):

```
$ vnstat -i eth0
```

This won't work right away because it needs time to collect data about your system, but as the days and weeks pass, it will end up looking like this:

```
$ vnstat -i eth0
Database updated: 2021-06-28 22:00:00

   eth0 since 2021-01-29

          rx:  3.33 TiB      tx:  4.25 TiB      total:  7.58 TiB

   monthly
                     rx      |     tx      |    total    |   avg. rate
     ------------------------+-------------+-------------+---------------
       2021-05    550.19 GiB |  855.34 GiB |    1.37 TiB |    4.51 Mbit/s
       2021-06    498.13 GiB |  784.43 GiB |    1.25 TiB |    4.57 Mbit/s
     ------------------------+-------------+-------------+---------------
     estimated    535.31 GiB |  842.97 GiB |    1.35 TiB |

   daily
                     rx      |     tx      |    total    |   avg. rate
     ------------------------+-------------+-------------+---------------
     yesterday     18.35 GiB |   32.00 GiB |   50.36 GiB |    5.01 Mbit/s
         today     18.26 GiB |   30.52 GiB |   48.78 GiB |    5.29 Mbit/s
     ------------------------+-------------+-------------+---------------
     estimated     19.92 GiB |   33.30 GiB |   53.22 GiB |
```

This will let you keep tabs on your total network usage, which might be helpful if your ISP imposes a data cap.


## Watching your Validators' Performance

The next thing you'll want to track is the attestation and block proposal performance of your validators.
Block explorers like [Beaconcha.in](https://beaconcha.in) to watch your validator's attestation performance and income.

::: tip NOTE
The above link is for the **mainnet** version of Beaconcha.in.
If you're running on the Prater Testnet, use [this link instead](https://prater.beaconcha.in)!
:::

Navigate to that site, and enter the public key for your validator in the search box on the top of the screen.

::: tip
If you forgot your validator's public key, you can easily retrieve it with the command `rocketpool minipool status`.
:::

If everything is set up right, you should see something like this:
![](./local/images/pi/Beaconchain.png)

This is a record of all of the Beacon Chain activity for your validator.
You can use it to check your validator's balance on the Beacon Chain to watch it grow over time and calculate your APY.

You can also use it to quickly gauge if your validator is alive and running correctly.
If it is, all of the attestations should say `Attested` for their **Status**, and ideally all of the **Opt. Incl. Dist.** should be 0 (though an occasional 1 or 2 is fine).

If there are lots of blocks that say `Missed` on them, then your validator is not working properly.
You should check the logs of the `eth1`, `eth2`, and `validator` services with `rocketpool service logs ...` if you're using Docker or Hybrid mode (or the corresponding log scripts if you're using Native mode) to look for problems.

**You should pin this tab or create a bookmark with it so you can quickly jump to it and check the status of your validator.**

::: tip
Beaconcha.in has an iOS / Android app that you can download to provide this same information in a convenient phone-friendly form.
You can also create an account and register with email notifications; these will inform you via email when your validator goes offline and you need to take action.
:::

