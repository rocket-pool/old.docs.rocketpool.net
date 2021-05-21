# :cd: Preparing the Operating System

Alright! You have a Pi all wired up, you have Ubuntu installed on your SD card, and you're ready to go.
There are a few steps to take before installing to make sure that everything will run smoothly, so that's what we'll cover here.

**Note**: If you haven't been through the [Preliminary Setup](Preliminary-Setup.md) yet, you need to do that first.

## Mounting the SSD

So as you may have surmised, the core OS is running off of the microSD card.
That's not nearly large enough or fast enough to hold all of the ETH1 and ETH2 blockchain data, which is where the SSD comes in.
To use it, we have to set it up with a file system and mount it to the Pi.

### Connecting the SSD to the USB 3.0 Ports

Start by plugging your SSD into one of the Pi's USB 3.0 ports. These are the **blue** ports, not the black ones:

![](images/USB.png)

The black ones are slow USB 2.0 ports; they're only good for stuff like mice and keyboards.
If you have your keyboard plugged into the blue ports, take it out and plug it into the black ones now.


### Formatting the SSD and Creating a New Partition

**WARNING: This process is going to erase everything on your SSD.
If you already have a partition with stuff on it, SKIP THIS STEP because you're about to delete it all!
If you've never used this SSD before and it's totally empty, then follow this step.**

Run this command to find the location of your disk in the device table:

```
$ sudo lshw -C disk
  *-disk
       description: SCSI Disk
       product: Portable SSD T5
       vendor: Samsung
       physical id: 0.0.0
       bus info: scsi@0:0.0.0
       logical name: /dev/sda
       ...
```

The important thing you need is the `logical name: /dev/sda` portion, or rather, the **`/dev/sda`** part of it.
We're going to call this the **device location** of your SSD.
For this guide, I'll just use `/dev/sda` as the device location - yours will probably be the same, but substitute it with whatever that command shows for the rest of the instructions.

Now that we know the device location, let's format it and make a new partition on it so we can actually use it.
Again, **these commands will delete whatever's already on the disk!**

Create a new partition table:
```
$ sudo parted -s /dev/sda mklabel gpt unit GB mkpart primary ext4 0 100%
```

Format the new partition with the `ext4` file system:
```
$ sudo mkfs -t ext4 /dev/sda1
```

Add a label to it (you don't have to do this, but it's fun):
```
$ sudo e2label /dev/sda1 "Rocket Drive"
```

Confirm that this worked by running the command below, which should show output like what you see here:
```
$ sudo blkid
...
/dev/sda1: LABEL="Rocket Drive" UUID="1ade40fd-1ea4-4c6e-99ea-ebb804d86266" TYPE="ext4" PARTLABEL="primary" PARTUUID="288bf76b-792c-4e6a-a049-cb6a4d23abc0"
```

If you see all of that, then you're good. Grab the `UUID="..."` output and put it somewhere temporarily, because you're going to need it in a minute.


### Optimizing the New Partition
Next, let's tune the new filesystem a little to optimize it for validator activity.

By default, ext4 will reserve 5% of its space for system processes.
Since we don't need that on the SSD because it just stores the ETH1 and ETH2 chain data, we can disable it:
```
$ sudo tune2fs -m 0 /dev/sda1
```


### Mounting and Enabling Automount

In order to use the drive, you have to mount it to the file system.
Create a new mount point anywhere you like (I'll use `/mnt/rpdata` here as an example, feel free to use that):
```
$ sudo mkdir /mnt/rpdata
```

Now, mount the new SSD partition to that folder:
```
$ sudo mount /dev/sda1 /mnt/rpdata
```

After this, the folder `/mnt/rpdata` will point to the SSD, so anything you write to that folder will live on the SSD.
This is where we're going to store the chain data for ETH1 and ETH2.

Now, let's add it to the mounting table so it automatically mounts on startup.
Remember the `UUID` from the `blkid` command you used earlier? This is where it will come in handy.
```
$ sudo nano /etc/fstab
```

This will open up an interactive file editor, which will look like this to start:
```
LABEL=writable  /        ext4   defaults        0 0
LABEL=system-boot       /boot/firmware  vfat    defaults        0       1
```

Use the arrow keys to go down to the bottom line, and add this line to the end:
```
LABEL=writable  /        ext4   defaults        0 0
LABEL=system-boot       /boot/firmware  vfat    defaults        0       1
UUID=1ade40fd-1ea4-4c6e-99ea-ebb804d86266       /mnt/rpdata     ext4    defaults        0       0
```

Replace the value in `UUID=...` with the one from your disk, then press `Ctrl+O` and `Enter` to save, then `Ctrl+X` and `Enter` to exit.
Now the SSD will be automatically mounted when you reboot. Nice!


### Testing the SSD's Performance

Before going any further, you should test your SSD's read/write speed and how many I/O requests it can handle per second (IOPS).
If your SSD is too slow, then it won't work well for a Rocket Pool node and you're going to end up losing money over time.

To test it, we're going to use a program called `fio`. Install it like this:
```
$ sudo apt install fio
```

Next, move to your SSD's mount point:
```
$ cd /mnt/rpdata
```

Now, run this command to test the SSD performance:
```
$ sudo fio --randrepeat=1 --ioengine=libaio --direct=1 --gtod_reduce=1 --name=test --filename=test --bs=4k --iodepth=64 --size=4G --readwrite=randrw --rwmixread=75
```

The output should look like this:
```
test: (g=0): rw=randrw, bs=(R) 4096B-4096B, (W) 4096B-4096B, (T) 4096B-4096B, ioengine=libaio, iodepth=64
fio-3.16
Starting 1 process
test: Laying out IO file (1 file / 4096MiB)
Jobs: 1 (f=1): [m(1)][100.0%][r=63.9MiB/s,w=20.8MiB/s][r=16.4k,w=5329 IOPS][eta 00m:00s]
test: (groupid=0, jobs=1): err= 0: pid=205075: Mon Feb 15 04:06:35 2021
  read: IOPS=15.7k, BW=61.5MiB/s (64.5MB/s)(3070MiB/49937msec)
   bw (  KiB/s): min=53288, max=66784, per=99.94%, avg=62912.34, stdev=2254.36, samples=99
   iops        : min=13322, max=16696, avg=15728.08, stdev=563.59, samples=99
  write: IOPS=5259, BW=20.5MiB/s (21.5MB/s)(1026MiB/49937msec); 0 zone resets
...
```

What you care about are the lines starting with `read:` and `write:` under the `test:` line.
- Your **read** should have IOPS of at least **15k** and bandwidth (BW) of at least **60 MiB/s**.
- Your **write** should have IOPS of at least **5000** and bandwidth of at least **20 MiB/s**.

Those are the specs from the Samsung T5 that I use, and I know it works just fine.
I have a slower SSD with read IOPS of 5k and write IOPS of 1k, and it has a lot of problems keeping up with the ETH2 chain.
If you use an SSD slower than the specs above, just be prepared that you might see a lot of missed attestations.
If yours meets or exceeds them, then you're all set and can move on.

*Note:
If your SSD doesn't meet the above specs but it should, you might be able to fix it with a firmware update.
For example, this has been experienced by the Rocket Pool community with the Samsung T7.
Two of them fresh out of the box only showed 3.5K read IOPS and 1.2K write IOPS.
After applying all available firmware updates, the performance was back up to the numbers shown in the above example.
Check with your manufacturer's support website for the latest firmware and make sure your drive is up to date - you may have to update the firmware multiple times until there are no more updates left.*

Last but not least, remove the test file you just made:
```
$ sudo rm /mnt/rpdata/test
```

## Setting up Swap Space

The Pi has 8 GB (or 4 GB if you went that route) of RAM. For our configuration, that will be plenty.
Then again, it never hurts to add a little more.
What we're going to do now is add what's called "swap space".
Essentially, it means we're going to use the SSD as "backup RAM" in case something goes horribly, horribly wrong and the Pi runs out of regular RAM.
The SSD isn't nearly as fast as the regular RAM, so if it hits the swap space it will slow things down, but it won't completely crash and break everything.
Think of this as extra insurance that you'll (most likely) never need.


### Creating a Swap File

The first step is to make a new file that will act as your swap space.
Decide how much you want to use - a reasonable start would be 8 GB, so you have 8 GB of normal RAM and 8 GB of "backup RAM" for a total of 16 GB.
To be super safe, you can make it 24 GB so your system has 8 GB of normal RAM and 24 GB of "backup RAM" for a total of 32 GB, but this is probably overkill. 
Luckily, since your SSD has 1 or 2 TB of space, allocating 8 to 24 GB for a swapfile is negligible.

For the sake of this walkthrough, let's pick a nice middleground - say, 16 GB of swap space for a total RAM of 24 GB.
Just substitute whatever number you want in as we go.

Enter this, which will create a new file called `/mnt/rpdata/swapfile` and fill it with 16 GB of zeros.
To change the amount, just change the number in `count=16` to whatever you want. **Note that this is going to take a long time, but that's ok.**
```
$ sudo dd if=/dev/zero of=/mnt/rpdata/swapfile bs=1G count=16 status=progress
```

Next, set the permissions so only the root user can read or write to it (for security):
```
$ sudo chmod 600 /mnt/rpdata/swapfile
```

Now, mark it as a swap file:
```
$ sudo mkswap /mnt/rpdata/swapfile
```

Next, enable it:
```
$ sudo swapon /mnt/rpdata/swapfile
```

Finally, add it to the mount table so it automatically loads when your Pi reboots:
```
$ sudo nano /etc/fstab
```

Add a new line at the end that looks like this:
```
LABEL=writable  /        ext4   defaults        0 0
LABEL=system-boot       /boot/firmware  vfat    defaults        0       1
UUID=1ade40fd-1ea4-4c6e-99ea-ebb804d86266       /mnt/rpdata     ext4    defaults        0       0
/mnt/rpdata/swapfile                            none            swap    sw              0       0
```

Press `Ctrl+O` and `Enter` to save, then `Ctrl+X` and `Enter` to exit.

To verify that it's active, run these commands:
```
$ sudo apt install htop
$ htop
```

Your output should look like this at the top:
![](images/Swap.png)

If you see a non-zero number in the last row labeled `Swp`, then you're all set.

Press `q` or `F10` to quit out of `htop` and get back to the terminal.


### Configuring Swappiness and Cache Pressure

By default, Linux will eagerly use a lot of swap space to take some of the pressure off of the system's RAM.
We don't want that. We want it to use all of the RAM up to the very last second before relying on SWAP.
The next step is to change what's called the "swappiness" of the system, which is basically how eager it is to use the swap space.
There is a lot of debate about what value to set this to, but I've found a value of 6 works well enough.

We also want to turn down the "cache pressure", which dictates how quickly the Pi will delete a cache of its filesystem.
Since we're going to have a lot of spare RAM with our setup, we can make this "10" which will leave the cache in memory for a while, reducing disk I/O.

To set these, run these commands:
```
$ sudo sysctl vm.swappiness=6
$ sudo sysctl vm.vfs_cache_pressure=10
```

Now, put them into the `sysctl.conf` file so they are reapplied after a reboot:
```
$ sudo nano /etc/sysctl.conf
```

Add these two lines to the end:
```
vm.swappiness=6
vm.vfs_cache_pressure=10
```

Then save and exit like you've done before (`Ctrl+O`, `Ctrl+X`).

And with that, your Pi is up and running and ready to run Rocket Pool! Next up, you need to decide which configuration you want to use.


## Choosing a Rocket Pool Configuration

Rocket Pool has two ways to run: **with Docker**, and **without Docker**. Each has their advantages and disadvantages, so read about them below and choose which one seems best for you.


### Running with Docker

[Docker](https://www.docker.com/resources/what-container) is a neat system that lets people bundle up programs into a fancy box called a Container.
The program, all of its dependencies, its file system layout... all of it gets boxed up into a nice little package.
The Docker engine service can fire these little packages up and run the program inside of them when you're ready to go.

By default, Rocket Pool uses Docker for its setup.
It will download a Docker container for your ETH1 client of choice, one for your ETH2 client of choice, one with all of the special Rocket Pool sauce.
Since they all run in containers, it's extremely easy to install them, start them, stop them, upgrade them, and delete them without actually touching your Raspberry Pi's installed programs or system configuration at all.
Rocket Pool's handy installer script will handle all of the setup, configuration, networking, and permissions management for you with this configuration.
All you need to do is choose which clients you want to use, and press go!

It's also possible to use your own ETH1 and/or ETH2 clients outside of Docker if you already have them, and point Rocket Pool at those.

However, it does come with one downside.
Very few vendors for ETH1 and ETH2 clients produce official Docker containers that support the Raspberry Pi's ARM64 processor.
That means I have to build them from scratch and upload them manually each time there's a new version of a client.
Sometimes this might take a while.

Either way, **you have to trust the images that I produce. If you don't want to trust them and want to build them yourself, you'll need to learn how to build your own Docker images.**

That being said, **for most people, this is the configuration you should take.** It is by far the easiest to use.

If you want to use the Docker configuration, move to the [Setting up Rocket Pool with Docker](Docker.md) page.


### Running Native (without Docker)

As convenient as Docker is, Rocket Pool doesn't *need* to be run with it.
It's completely possible to set up your own ETH1 and ETH2 clients and the Rocket Pool stack as services running directly on your Pi.
No Docker, no containers, just you, the clients, and Rocket Pool.

The main advantages of doing this are:
- Complete control over the configuration. You pick the user accounts, the permissions, the file system layout, the versions of everything... it's all up to you.
- Easier to run custom / development versions of the ETH clients or Rocket Pool itself that you built from source.
- Allows you to optimize and fine-tune things for *maximum performance*.

The disadvantages are:
- A lot more effort to set up.
- Requires more technical knowledge to really understand what you're doing when you follow each of the instructions.
  I suppose you could just follow them without understanding what they do, but that seems like a bad idea.
- Not *officially* supported, so there's not nearly as much documentation to help you in case you break something. You'll have to head to the Rocket Pool Discord to ask for help. 

In my opinion, this configuration should only be used if you're a developer, if you want to run the absolute latest development prototypes for the clients or for Rocket Pool, you want to squeeze every possible iota of performance out of your Pi to have the best attestation rates, or you just *really* don't like Docker.

If you want to use the Native configuration, move to the [Setting up Rocket Pool Natively](Native.md) page.
