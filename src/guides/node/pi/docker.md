# :whale: Running Rocket Pool with Docker

You've made it! You have a Pi, it's all set up, and you're ready to finally install Rocket Pool.
This guide is going to show you how to do it the "easy" way, using Docker.
This is the way Rocket Pool was originally meant to run, and it's the most supported configuration.

**NOTE: With all of that said, the only client that has an official Docker image for ARM is Lighthouse.
I had to build the rest of them myself, and had to modify the Rocket Pool installer to point to my images.
If you don't trust me, my installer script, or those Docker images, then you should stop here and learn how to build all of that for yourself from source so you can guarantee that they're safe.**

## Installing Rocket Pool

Okay, so as I said in the [Preparing Ubuntu for Rocket Pool](Preparing-the-OS.md) section, Docker is definitely the easiest way to use Rocket Pool.
Let me show you what I mean.

Start by pulling [my installer script from GitHub](https://github.com/jclapis/smartnode-install/releases/tag/v0.0.9-j1).
This is based on the regular Rocket Pool installer script, but I modified it a little so it pulls my Raspberry Pi-specific configuration.
Feel free to browse through it before actually running it.

Go to your home directory:
```
$ cd ~
```

Download the Rocket Pool application:
```
$ mkdir -p ~/bin
$ wget https://github.com/jclapis/smartnode-install/releases/latest/download/rocketpool-cli-linux-arm64 -O ~/bin/rocketpool
```

Download the installer script:
```
$ wget https://github.com/jclapis/smartnode-install/releases/latest/download/install.sh
```

Make it executable, so you can run it:
```
$ chmod +x install.sh
```

Finally, run it:
```
$ ./install.sh
```

This is going to install a bunch of necessary things for you, like Docker and Docker Compose.
After that, it will download my configuration bundle for Rocket Pool and put it into `~/.rocketpool/`.
Lastly, it will download the Rocket Pool command line interface (CLI), which is the interactive program you use to run Rocket Pool.

The last few steps should look like this:
```
Step 4 of 7: Adding user to docker group...
Step 5 of 7: Creating Rocket Pool user data directory...
Step 6 of 7: Downloading Rocket Pool package files...
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   651  100   651    0     0   3271      0 --:--:-- --:--:-- --:--:--  3271
100 7845k  100 7845k    0     0  5689k      0  0:00:01  0:00:01 --:--:-- 10.2M
Step 7 of 7: Copying package files to Rocket Pool user data directory...
```

It will take a while, but if all of those steps complete without throwing any errors, then Rocket Pool will be installed.

Now you can remove the installer script:
```
$ rm install.sh
```

The last thing to do, and **this is important**, is you need to *log out* if you're using a desktop UI, or *exit* if you're using SSH.
You need to do this in order to be able to use Docker properly, because it set some permissions on your user account that won't apply until you log out and log back in / start a new session.

Once you log back in / reconnect, you're all set.


## Configuring Rocket Pool

Now that it's installed, it's time to configure Rocket Pool.
Normally this means picking your ETH1 client, your ETH2 client, and setting a few extra things like the graffiti you get to display when you propose new blocks.
This is still the case for the Pi, but we have to do a few extra things to make it all come together.


### Choosing the ETH1 and ETH2 Client

Start by running the normal Rocket Pool configuration process:
```
$ rocketpool service config
```

The first thing it will do is ask you which ETH 1.0 client you want. Press `1` for `Geth`, and hit `enter`.
It will ask you some other questions about EthStats, but you can leave them blank - just press `enter`.

Next, it will ask you if you want to use a random ETH 2.0 client. Press `n` for NO.
Your screen should look like this:
```
Geth Eth 1.0 client selected.

Please enter the Ethstats Label (leave blank for none)
(optional - for reporting Eth 1.0 node status to ethstats.net)


Please enter the Ethstats Login (leave blank for none)
(optional - for reporting Eth 1.0 node status to ethstats.net)


Would you like to run a random Eth 2.0 client (recommended)? [y/n]
n
```

Next you'll be presented with your choice of the ETH 2.0 clients.
After having done lots of testing on my Raspberry Pi, I can confidently say that **Nimbus** has given me the best results.
It's designed specifically for low-power systems like this; it uses the least amount of RAM by far (about 700 to 800 MB).
It also comes with **doppelganger protection**, which checks to see if your validators are already in use elsewhere and ignores them if so, so you don't get slashed! Nice!

You should do your own research here to decide which ETH 2.0 client you like the most, but I am going to assume that you picked Nimbus for the rest of this guide. If not, just tailor it to your client accordingly.

After you pick your client, you'll be asked for some custom graffiti.
This is a short message that will be added to any blocks you propose, for the whole world to see.
Pick something fun or something personal to you.
I set mine to `Made on a RPi 4!`, as you can see below:
```
Nimbus Eth 2.0 client selected.

Please enter the Custom Graffiti (leave blank for none)
(optional - for adding custom text to signed Eth 2.0 blocks - 16 chars max)
Made on a RPi 4!
```

Feel free to use that so everyone knows you're validating on a Pi, or pick whatever else you want.
You can also just leave it blank if you don't want to say anything in your blocks.

Once you're done with that, you'll see this message:
```
Done! Run 'rocketpool service start' to apply new configuration settings.
```

**DON'T DO THAT.** We need to do some extra configuration first before running Rocket Pool.


### Configuring Geth

By default, it will use a lot of RAM and connect to a lot of peers.
We don't want either of those things - we want low RAM because, well, we're on a Pi.
We don't want a lot of peers because we're not going to do a whole lot with ETH1, and don't need to waste the extra connections.
I've made some adjustments to it already (included in the installer script), but now is a good time to do some extra tweaking if you want to.

#### Cache Size

Geth defaults to taking something like 4 GB of RAM for its cache.
That's too much for us.
Luckily, there is a simple command line flag you can add that will lower it and use less RAM.

**For 4 GB Pis, I suggest you use 256.**
This will make sure Geth only uses 256 MB of RAM for its cache.

**For 8 GB Pis, you can safely use 512** or possibly even **768** if you're feeling adventurous.
I wouldn't go any higher than that.

I set it to **256** in the script by default, so if you're running an 8 GB Pi, you may want to go higher.
Using 256 won't really hurt anything, it will just make syncing take longer.

#### Number of Peers

The number of peers determines how many other ETH1 nodes you connect to.
This matters because more peers means you have faster access to the most up-to-date state of the blockchain.
However, it also means more CPU and network I/O is spent updating ETH1.

By default, Geth uses **50** peers as its maximum.
This is pretty unnecessary for us, since we just need ETH1 when we get a chance at proposing blocks.

Because of that, I recommend lowering this to **24** while syncing the ETH1 chain, and then down to **12** once you've finished syncing.

The default in my script is **24**.

#### Setting the New Numbers


Run `nano` on the ETH1 launch script to edit it, like you edited `/etc/fstab` in the previous section:
```
$ nano ~/.rocketpool/chains/eth1/start-node.sh
```

This is the script that controls what command line arguments Geth will get launched with.

To make your changes, modify the `CMD=...` string on line 8. 
It starts like this:

```
CMD="/usr/local/bin/geth --goerli --cache 256 --maxpeers 24
```

Change the number after `--cache` if you want to change the cache size, and change the number after `--maxpeers` if you want to change the maximum peer count.

Once that's done, save it with `Ctrl+O` and exit with `Ctrl+X`.


### Configuring the Default Docker Location

By default, Docker is going to store all of its image data on your operating system drive.
This means the microSD card.
Clearly, that's not what we want - we want it all to live on the SSD that you just spent all that time setting up!

To do this, create a new file called `/etc/docker/daemon.json` as the root user:

```
$ sudo nano /etc/docker/daemon.json
```

This will be empty at first, which is fine. Add this as the contents:
```
{
    "data-root": "/mnt/rpdata/docker"
}
```

where `/mnt/rpdata` refers to the mount point of the SSD you set up in the previous section, and `docker` refers to the folder where Docker will store all of its data. I just called it `docker`, but you can call it whatever you want.

Save and exit with `Ctrl+O` and `Ctrl+X`. 

Now, restart the docker daemon so it picks up on the changes:
```
$ sudo systemctl restart docker
```

After that, you should be all set!


## Starting Rocket Pool

And with that, Rocket Pool is finally installed and ready to start. 
Go ahead and kick it off:

```
$ rocketpool service start
```

It will download the ARM Docker images I made for Geth, Nimbus, and the Rocket Pool smartnode.
Once they're downloaded, it will kick them all off.
You should see this at the end:
```
Starting rocketpool_eth1 ... done
Starting rocketpool_api  ... done
Starting rocketpool_eth2 ... done
Starting rocketpool_watchtower ... done
Starting rocketpool_node       ... done
Starting rocketpool_validator  ... done
```

That means all of the images are running.

To check on Geth and make sure it's working, do this:
```
$ rocketpool service logs eth1
```

You should start seeing lots of lines that look like this:
```
eth1_1        | INFO [02-21|05:25:55.310] Imported new block receipts              count=2048 elapsed=9.204s      number=1003853 hash="7c0afc
014aa7" age=1y7mo6d  size=2.75MiB
eth1_1        | INFO [02-21|05:25:57.596] Imported new state entries               count=0    elapsed=2.579s      processed=4208370 pending=8305  trieretry=39  coderetry=0  duplicate=0 unexpected=40787
```

That means geth is currently syncing.
When you see a line that has `Imported new block receipts` at the start, the `age` at the end of the line (`age=1y7mo6d` in the above example) shows you how far away the block you're currently on is.
Once the age gets to 0, you're all synced.

You can do the same for Nimbus with this command:
```
$ rocketpool service logs eth2
```

Nimbus will print lines like this:
```
eth2_1        | INF 2021-02-21 06:35:43.302+00:00 Slot start                                 topics="beacnde" tid=1 file=nimbus_beacon_node.nim:940 lastSlot=682377 scheduledSlot=682378 delay=302ms641us581ns peers=47 head=f752f69a:745 headEpoch=23 finalized=2717f624:672 finalizedEpoch=21 sync="PPUPPPDDDD:10:2.0208:1.5333:05d03h29m (736)"
eth2_1        | INF 2021-02-21 06:35:43.568+00:00 Slot end
```

Here's how to read this:
- The `lastSlot=682377` tells you what the latest block in the network really is
- The number in parentheses at the end (`(736)`) tells you which block you're currently on
- The `peers=47` tells you how many peers you're currently connected to
- The time towards the end (`05d03h29m`) tells you how long Nimbus thinks it will be until you're fully synced

This will be a little slow at first as you accumulate peers and as Geth syncs in parallel.
Once Geth is synced and stops chewing up all the SSD's I/O, this will speed up.


By default, Nimbus will try to connect to a maximum of 160 peers.
If you want to speed that up, you can **open up a port in your router's port forwarding setup**.
Tell it to forward **port 9001** on both TCP and UDP to your Pi's IP address - this way, other ETH2 clients can discover it from the outside.
Each router has a different way of doing this, so you'll need to check out your router's manual on how it does port forwarding.

You can also do this for Geth if you want to speed up your ETH1 sync - just forward **port 30303** for both TCP and UDP as well.


## Using and Monitoring Rocket Pool

At this point, you have a working instance of Rocket Pool running on your Pi!
Congratulations! You worked hard to get this far, so take a few minutes to celebrate.
Once you're back, let's talk about how to actually use Rocket Pool and monitor how things are going.


### Setting up a Validator

With respect to using it, Rocket Pool developer Jake Pospischil has written up [a wonderful guide on exactly this](https://medium.com/rocket-pool/rocket-pool-v2-5-beta-node-operators-guide-77859891766b) already *(yes, the URL says it's for Beta 2.5, but that's just an issue with Medium's cache - this is the guide for Beta 3.0, I promise)*.
It also covers installing Rocket Pool, but that's for boring old normal computers... you already did that whole process!
Anyway, to learn how to use Rocket Pool for validating on ETH2, take a look at the guide linked above and skip about halfway down the page, to the section labeled **Registering Your Node**.
That will walk you through the ins-and-outs of how to create a validator with Rocket Pool.


### Monitoring your Pi's Performance

In terms of monitoring things, you already saw how to look at the logs for Geth and Nimbus by using:
- `$ rocketpool service logs eth1`
- `$ rocketpool service logs eth2`

These commands are what you'll use to keep an eye on their respective performances.

You've also seen `htop`, which gives you a nice live view into your system resources:
```
$ htop
```
![](images/Htop.png)

On the top display with the bars, `Mem` shows you how much RAM you're currently using (and how much you have left).
`Swp` shows you how much swap space you're using, and how much is left.

On the bottom table, each row represents a process.
Geth and Nimbus will probably be on top, which you can see in the rightmost column labeled `Command`.
The `RES` column shows you how much RAM each process is taking - in this screenshot, Geth is taking 748 MB and Nimbus is taking 383 MB.
The `CPU%` column shows you how much CPU power each process is consuming.
100% represents a single core, so if it's over 100%, that means it's using a lot from multiple cores (like Geth is here, with 213%).

If you want to track how much network I/O your system uses over time, you can install a nice utility called `vnstat`:
```
$ sudo apt install vnstat
```

To run it, do this:
```
$ vnstat -i eth0
```

This won't work right away because it needs time to collect data about your system, but as the days and weeks pass, it will end up looking like this:

```
$ vnstat -i eth0
Database updated: 2021-02-21 01:55:00

   eth0 since 2021-01-29

          rx:  513.65 GiB      tx:  191.36 GiB      total:  705.01 GiB

   monthly
                     rx      |     tx      |    total    |   avg. rate
     ------------------------+-------------+-------------+---------------
       2021-01     14.71 GiB |    4.95 GiB |   19.66 GiB |   63.06 kbit/s
       2021-02    498.94 GiB |  186.40 GiB |  685.34 GiB |    3.39 Mbit/s
     ------------------------+-------------+-------------+---------------
     estimated    695.74 GiB |  259.92 GiB |  955.66 GiB |

   daily
                     rx      |     tx      |    total    |   avg. rate
     ------------------------+-------------+-------------+---------------
     yesterday     10.51 GiB |   15.04 GiB |   25.55 GiB |    2.54 Mbit/s
         today    928.06 MiB |    1.22 GiB |    2.13 GiB |    2.65 Mbit/s
     ------------------------+-------------+-------------+---------------
     estimated     11.35 GiB |   15.27 GiB |   26.62 GiB |
```

This will let you keep tabs on your total network usage, which might be helpful if your ISP imposes a data cap.

Finally, and most importantly, use a block explorer like [Beaconcha.in](https://pyrmont.beaconcha.in) to watch your validator's attestation performance and income.
If everything is set up right, you should see something like this:
![](images/Beaconchain.png)

All of the attestations should say `Attested` for their **Status**, and ideally all of the **Opt. Incl. Dist.** should be 0 (though an occasional 1 or 2 is fine).

And that's all there is to it! Congratulations again, and enjoy validating with your Raspberry Pi!



## Updating Rocket Pool to New Releases

Periodically, you'll see new releases of Rocket Pool come out.
I'll do my best to keep my ARM releases up to date for the Pi.
When you want to upgrade, first check this page to see if I've released a new version:

https://github.com/jclapis/smartnode-install/releases

If you see one that looks recent and references the new version of Rocket Pool, grabbing it just involves repeating the same steps you did when you first installed it.

Stop the Rocket Pool services:
```
$ rocketpool service stop
```

Download the new Rocket Pool application:
```
$ cd ~
$ wget https://github.com/jclapis/smartnode-install/releases/latest/download/rocketpool-cli-linux-arm64 -O ~/bin/rocketpool
```

Download the new installer script:
```
$ wget https://github.com/jclapis/smartnode-install/releases/latest/download/install.sh
```

Make it executable, so you can run it:
```
$ chmod +x install.sh
```

Run it:
```
$ ./install.sh
```

Remove it:
```
$ rm install.sh
```

Finally, start the Rocket Pool services again:
```
$ rocketpool service start
```

All done! Check the version of everything to make sure that the upgrade was successful:
```
$ rocketpool service version

Rocket Pool client version: 1.0.0-beta.1
Rocket Pool service version: 1.0.0-beta.1
Selected Eth 1.0 client: Geth (jclapis/go-ethereum:v1.10.1)
Selected Eth 2.0 client: Nimbus (jclapis/nimbus:v1.0.11)
```

Both the client and service should match the new release version. 