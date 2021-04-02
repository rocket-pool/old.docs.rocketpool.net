# :timer_clock: Overclocking the Pi

By default, the 1.5 GHz processor that the Pi comes with is a pretty capable little device.
For the most part, you should be able to validate with it just fine.
However, I have noticed that on rare occasions, Nimbus gets stuck working on some things and it just doesn't have enough horsepower to keep up with your validator's attestation duties.
When that happens, you'll see something like this on beaconcha.in:

![](images/Incl-Dist.png)

That inclusion distance of 8 means that Nimbus took a really long time to send that attestation, and you're going to get penalized for being late.
Ideally, all of them should be 0. Though rare, these do occur when running at stock settings.

There is a way to mitigate these, however: overclocking.
Overclocking is by far the easiest way to get some extra performance out of your Pi's CPU and prevent those nasty high inclusion distances.
Frankly, the default CPU clock of 1.5 GHz is really underpowered.
You can speed it up quite a bit via overclocking, and depending on how far you take it, you can do it quite safely too.

Overclocking the Pi is very simple - it just involves changing some numbers in a text file.
There are two numbers that matter: the first is the **core clock**, which directly determines how fast the ARM CPU runs.
The second is **overvoltage**, which determines the voltage that gets fed into the ARM CPU.
Higher speeds generally require higher voltage, but the Pi's CPU can handle quite a bit of extra voltage without any appreciable damage.
It might wear out a little faster, but we're still talking on the order of years and the Pi 5 will be out by then, so no real harm done!

Rather, the real concern with overvoltage is that **higher voltages lead to higher temperatures**.
This guide will help you see how hot your Pi gets under a heavy load, so you don't push it too far.

---

## DISCLAIMER


**PLEASE READ THIS.** While overclocking at the levels we're going to do is pretty safe and reliable, you're really at the mercy of what's called the "silicon lottery".
Every CPU is slightly different in microscopic ways, and some of them can simply overclock better than others.
If you overclock too far / too hard, then your system may become **unstable**.
Unstable Pis suffer from all kinds of consequences, from constant restarts to completely freezing.
**In the worst case, you could corrupt your microSD card and have to reinstall everything from scratch!**

**By following the guidance here, you have to accept the fact that you're running that risk.**
If that's not worth it for you, then stop reading here.

---

## Benchmarking the Stock Configuration

Before overclocking, it's useful to profile what your Pi is capable of in its stock, off-the-shelf configuration.
There are three key things to look at:
1. **Performance** (how fast your Pi calculates things)
2. **Temperature** under load (how hot it gets)
3. **Stability** (how long it runs before crashing)

We're going to get stats on all three of them as we go.


### Performance

For measuring performance, you can use LINPACK.
We'll build it from source.
```
$ cd ~
$ wget http://www.netlib.org/benchmark/linpackc.new -O linpack.c 
...
$ cc -O3 -o linpack linpack.c -lm
...
$ sudo mv linpack /usr/local/bin
$ rm linpack.c
```

Now run it like this:
```
$ linpack
Enter array size (q to quit) [200]:
```

Just press `enter` to leave it at the default of 200, and let it run.
When it's done, the output will look like this:
```
Memory required:  315K.


LINPACK benchmark, Double precision.
Machine precision:  15 digits.
Array size 200 X 200.
Average rolled and unrolled performance:

    Reps Time(s) DGEFA   DGESL  OVERHEAD    KFLOPS
----------------------------------------------------
     512   0.70  85.64%   3.76%  10.60%  1120802.516
    1024   1.40  85.70%   3.74%  10.56%  1120134.749
    2048   2.81  85.71%   3.73%  10.56%  1120441.752
    4096   5.62  85.69%   3.74%  10.57%  1120114.452
    8192  11.23  85.67%   3.74%  10.59%  1120277.186
```

What you need to look at is the last row, in the `KFLOPS` column.
This number (1120277.186 in the above example) represents your computing performance.
It doesn't mean anything by itself, but it gives us a good baseline to compare the overclocked performance to.
Let's call this the **stock KFLOPS**.


### Temperature

Next, let's stress the Pi out and watch its temperature under heavy load.
First, install this package, which will provide a tool called `vcgencmd` that can print details about the Pi:
```
$ sudo apt install libraspberrypi-bin
```

Once this is installed, reboot the Pi (this is necessary for some new permission to get applied).
Next, install a program called **stressberry**.
This will be our benchmarking tool.
Install it like this:
```
$ sudo apt install stress
$ pip3 install stressberry
$ source ~/.profile
```

Next, run it like this:
```
$ stressberry-run -n "Stock" -d 300 -i 60 -c 4 stock.out
```

This will run a new stress test named "Stock" for 300 seconds (5 minutes) with 60 seconds of cooldown before and after the test, on all 4 cores of the Pi.
You can play with these timings if you want it to run longer or have more of a cooldown, but this works as a quick-and-dirty stress test for me.
The results will get saved to a file named `stock.out`.

During the main phase of the test, the output will look like this:

```
Current temperature: 41.3°C - Frequency: 1500MHz
Current temperature: 41.3°C - Frequency: 1500MHz
Current temperature: 41.8°C - Frequency: 1500MHz
Current temperature: 40.9°C - Frequency: 1500MHz
Current temperature: 41.8°C - Frequency: 1500MHz
```

This basically tells you how hot the Pi will get.
At 85­°C, the Pi will actually start to throttle itself and bring the clock speed down so it doesn't overheat.
Luckily, because you added a heatsink and a fan, you shouldn't get anywhere close to this!
That being said, I generally try to keep my temperatures below 65°C for the sake of the system's overall health.

If you want to monitor the system temperature during normal validating operations, you can do this with `vcgencmd`:
```
$ vcgencmd measure_temp
temp=34.0'C
```


### Stability

Testing the stability of an overclock involves answering these three questions:
- Does the Pi turn on and get to a login promp / start the SSH server?
- Does it randomly freeze or restart during normal operations?
- Does it randomly freeze or restart during heavy load?

For an overclock to be truly stable, the answers must be **yes, no, and no**.
There are a few ways to test this, but the easiest at this point is to just run `stressberry` for a really long time.
How long is entirely up to you - the longer it goes, the more sure you can be that the system is stable.
Some people just run the 5 minute test above and call that good if it survives; others run it for a half hour; others run it for 8 hours or even more.
How long to run it is a personal decision you'll have to make based on your own risk tolerance.

To change the runtime, just modify the `-d` parameter with the number of seconds you want the test to run.
For example, if you decided a half-hour is the way to go, you could do `-d 1800`.


## Your First Overclock - 1800 MHz (Light)

The first overclock we're going to do is relatively "light" and reliable, but still provides a nice boost in compute power.
We're going to go from the stock 1500 MHz up to 1800 MHz - a 20% speedup!

Open this file:
```
$ sudo nano /boot/firmware/usercfg.txt
```

Add these two lines to the end:
```
arm_freq=1800
over_voltage=3
```

Then save the file and reboot.

These settings will increase the CPU clock by 20%, and it will also raise the CPU voltage from 0.88v to 0.93v (each `over_voltage` setting increases it by 0.025v).
This setting should be attainable by any Pi 4B, so your system should restart and provide a login prompt or SSH access in just a few moments.
If it doesn't, and your Pi stops responding or enters a boot loop, you'll have to reset it - read the next section for that.


### Resetting After an Unstable Overclock

If your Pi stops responding, or keeps restarting over and over, then you need to lower the overclock.
To do that, follow these steps:
1. Turn the Pi off.
2. Pull the microSD card out.
3. Plug the card into another Linux computer with a microSD adapter.
    *NOTE: This **has to be** another Linux computer. It won't work if you plug it into a Windows machine, because Windows can't read the `ext4` filesystem the SD card uses!**
4. Mount the card on the other computer.
5. Open `<SD mount point>/boot/firmware/usercfg.txt`.
6. Lower the `arm_freq` value, or increase the `over_voltage` value. *NOTE: **do not go any higher than over_voltage=6.** Higher values aren't supported by the Pi's warranty, and they run the risk of degrading the CPU faster than you might be comfortable with.*
7. Unmount the SD card and remove it.
8. Plug the card back into the Pi and turn it on.

If the Pi works, then great! Continue below.
If not, repeat the whole process with even more conservative settings.
In the worst case you can just remove the `arm_freq` and `over_voltage` lines entirely to return it to stock settings.


### Testing 1800 MHz

Once you're logged in, run `linpack` again to test the new performance.
Here's an example from my Pi:
```
$ linpack
Enter array size (q to quit) [200]:
...
    Reps Time(s) DGEFA   DGESL  OVERHEAD    KFLOPS
----------------------------------------------------
     512   0.59  85.72%   3.75%  10.53%  1338253.832
    1024   1.18  85.72%   3.75%  10.53%  1337667.003
    2048   2.35  85.72%   3.75%  10.53%  1337682.272
    4096   4.70  85.73%   3.75%  10.53%  1337902.437
    8192   9.40  85.71%   3.76%  10.53%  1337302.722
   16384  18.80  85.72%   3.75%  10.52%  1337238.504
```

Again, grab the `KFLOPS` column in the last row.
To compare it to the stock configuration, simply divide the two numbers:
`1337238.504 / 1120277.186 = 1.193668`

Alright! That's a 19.4% boost in performance, which is to be expected since we're running 20% faster.
Now let's check the temperatures with the new clock speed and voltage settings:

```
$ stressberry-run -n "1800_ov3" -d 300 -i 60 -c 4 1800_ov3.out
```

You should see output like this:
```
Current temperature: 47.2°C - Frequency: 1800MHz
Current temperature: 48.7°C - Frequency: 1800MHz
Current temperature: 47.7°C - Frequency: 1800MHz
Current temperature: 47.7°C - Frequency: 1800MHz
Current temperature: 47.7°C - Frequency: 1800MHz
```

Not bad, about 6° hotter than the stock settings but still well below the threshold where I'd personally stop.

You can run a longer stability test here if you're comfortable, or you can press on to take things even higher.


## Going to 2000 MHz (Medium)

The next milestone will be 2000 MHz. This represents a 33.3% boost in clock speed, which is pretty significant.
Most people consider this to be a great balance between performance and stability, so they stop the process here.

My recommendation for this level is to start with these settings:
```
arm_freq=2000
over_voltage=5
```

This will boost the core voltage to 1.005v.
Try this out with the `linpack` and `stressberry` tests.
If it survives them, then you're all set. If it freezes or randomly restarts, then you should increase the voltage:
```
arm_freq=2000
over_voltage=6
```

That puts the core voltage at 1.03v, which is as high as you can go before voiding the warranty.
That usually works for most Pis.
If it doesn't, instead of increasing the voltage further, **you should lower your clock speed and try again.**

For reference, here are the numbers from my 2000 run:

```
$ linpack
Enter array size (q to quit) [200]:
...
    Reps Time(s) DGEFA   DGESL  OVERHEAD    KFLOPS
----------------------------------------------------
     512   0.53  85.76%   3.73%  10.51%  1482043.543
    1024   1.06  85.74%   3.73%  10.53%  1481743.724
    2048   2.12  85.74%   3.72%  10.54%  1482835.055
    4096   4.24  85.73%   3.74%  10.53%  1482189.202
    8192   8.48  85.74%   3.73%  10.53%  1482560.117
   16384  16.96  85.74%   3.73%  10.53%  1482441.146
```

That's a 32.3% speedup which is in-line with what we'd expect. Not bad!

Here are my temperatures:
```
Current temperature: 54.0°C - Frequency: 2000MHz
Current temperature: 54.5°C - Frequency: 2000MHz
Current temperature: 54.0°C - Frequency: 2000MHz
Current temperature: 54.5°C - Frequency: 2000MHz
Current temperature: 55.5°C - Frequency: 2000MHz
```

An increase of 7 more degrees, but still under my threshold of 65°C.


## Going to 2100 MHz (Heavy)

The highest we're going to take the Pi in this guide is 2100 MHz.
This represents a solid **40% speedup** over the stock configuration.

**NOTE: Not all Pi's are capable of doing this while staying at `over_voltage=6`.
Try it, and if it breaks, go back to 2000 MHz.**

This is the configuration I use on my Pi:
```
arm_freq=2100
over_voltage=6
```

For reference, here are my results:

```
$ linpack
Enter array size (q to quit) [200]:
...
    Reps Time(s) DGEFA   DGESL  OVERHEAD    KFLOPS
----------------------------------------------------
     512   0.50  85.68%   3.76%  10.56%  1560952.508
    1024   1.01  85.68%   3.76%  10.56%  1554858.509
    2048   2.01  85.70%   3.74%  10.56%  1561524.482
    4096   4.03  85.72%   3.73%  10.55%  1560152.447
    8192   8.06  85.72%   3.73%  10.54%  1561078.999
   16384  16.11  85.73%   3.73%  10.54%  1561448.736
```

That's a 39.4% speedup!

Here are my temperatures:
```
Current temperature: 59.4°C - Frequency: 2100MHz
Current temperature: 58.9°C - Frequency: 2100MHz
Current temperature: 58.4°C - Frequency: 2100MHz
Current temperature: 59.4°C - Frequency: 2100MHz
Current temperature: 58.9°C - Frequency: 2100MHz
```

Just shy of 60°C, so there's plenty of room.
I'm happy with this performance and temperature range, so this is what I run.
