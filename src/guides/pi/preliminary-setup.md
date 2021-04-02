# :wrench: Preliminary Setup

To run a Rocket Pool node on a Raspberry Pi, you'll need to first have a working Raspberry Pi. 
If you already have one up and running - great! You can skip down to the next page.
Just make sure you have **a fan attached** before you go.
If you're starting from scratch, then read on.


## What You'll Need

These are the recommended components that you'll need to buy in order to run Rocket Pool on a Pi:
- A **Raspberry Pi 4 Model B**, the **8 GB model**
  - Note: while you *can* use a 4 GB with this setup, I strongly recommend you go with an 8 GB for peace of mind... it's really not much more expensive.
- A **USB-C power supply** for the Pi. You want one that provides **at least 3 amps**.
- A **MicroSD card**. It doesn't have to be big, 16 GB is plenty and they're pretty cheap now... but it should be at least a **Class 10 (U1)**.
- A **MicroSD to USB** adapter for your PC. This is needed so you can install the Operating System onto the card before loading it into the Pi.
  If your PC already has an SD port, then you don't need to pick up a new one.
- Some **heatsinks**. You're going to be running the Pi under heavy load 24/7, and it's going to get hot.
  Heatsinks will help so it doesn't throttle itself. You ideally want a set of 3: one for the CPU, one for the RAM, and one for the USB controller.
  [Here is a good example of a nice set](https://www.canakit.com/raspberry-pi-4-heat-sinks.html).
- A **case**. There are two ways to go here: with a fan, and fanless.
  - With a fan:
    - A 40mm **fan**. Same as the above, the goal is to keep things cool while running your Rocket Pool node.
    - A **case with a fan mount** to tie it all together.
      You could also get a case with integrated fans [like this one](https://www.amazon.com/Raspberry-Armor-Metal-Aluminium-Heatsink/dp/B07VWM4J4L) so you don't have to buy the fans separately.
  - Without a fan:
    - A **fanless case** that acts as one giant heatsink, like [this one](https://www.amazon.com/Akasa-RA08-M1B-Raspberry-case-Aluminium/dp/B081VYVNTX).
      This is a nice option since it's silent, but your Pi **will** get quite hot - especially during the initial blockchain sync process.
      Credit to Discord user Ken for pointing me in this direction!
  - As a general rule, I recommend going **with a fan** because we're going to be overclocking the Pi significantly.


You can get a lot of this stuff bundled together for convenience - for example, [Canakit offers a kit](https://www.amazon.com/CanaKit-Raspberry-8GB-Starter-Kit/dp/B08956GVXN) with many components included.
However, you might be able to get it all cheaper if you get the parts separately (and if you have the equipment, you can [3D print your own Pi case](https://www.thingiverse.com/thing:3793664).)

Other components you'll need:
- A **USB 3.0+ Solid State Drive**. The general recommendation is for a **1 TB drive**, but if it's in your budget, a **2 TB drive** is more future-proof.
  - The [Samsung T5](https://www.amazon.com/Samsung-T5-Portable-SSD-MU-PA1T0B/dp/B073H552FJ) is a good example one that will work well.
  - Using a SATA SSD with a SATA-to-USB adapter is kind of hit-or-miss because of [problems like this](https://www.raspberrypi.org/forums/viewtopic.php?f=28&t=245931).
    If you go this route, I've included a performance test you can use to check if it will work or not in the next section.
- An **ethernet cable** for internet access. It should be at least **Cat 5e** rated.
  - Running a node over Wi-Fi is **not recommended**, but if you have no other option, you can do it instead of using an ethernet cable.
- A **UPS** to act as a power source if you ever lose electricity.
  The Pi really doesn't draw much power, so even a small UPS will last for a while, but generally the bigger, the better. Go with as big of a UPS as you can afford.
  Also, I recommend you **attach your modem, router, and other network equipment** to it as well - not much point keeping your Pi alive if your router dies.

Depending on your location, sales, your choice of SSD and UPS, and how many of these things you already have, you're probably going to end up spending **around $200 to $500 USD** for a complete setup.


## Making the Fan Run More Quietly

When you get the fan, by default you're probably going to be instructed to connect it to the 5v GPIO pin, as shown in the picture below.
The fan will have a connector with two holes; the black one should go to GND (pin 6), and the red one should go to +5v (pin 4).
![](images/Pinout.png)

However, in my experience, this makes the fan run very loud and fast which isn't really necessary.
If you want to make it more quiet while still running cool, try connecting it to the 3.3v pin (Pin 1, the blue one) instead of the 5v pin.
This means that on your fan, the black point will go to GND (pin 6) still, but now the red point will go to +3.3v (pin 1).

If your fan has a connector where the two holes are side by side and you can't split them apart, you can put [some jumpers like this](https://www.amazon.com/GenBasic-Female-Solderless-Breadboard-Prototyping/dp/B077N7J6C4) in between it and the GPIO pins on the Pi.



## Installing the Operating System

There are a few varieties of Linux OS that support the Raspberry Pi. For this guide, we're going to stick to **Ubuntu 20.04**.
Ubuntu is a tried-and-true OS that's used around the world, and 20.04 is (at the time of this writing) the latest of the Long Term Support (LTS) versions, which means it will keep getting security patches for a very long time.
If you'd rather stick with a different flavor of Linux like Raspbian, feel free to follow the existing installation guides for that - just keep in mind that this guide is built for Ubuntu, so not all of the instructions may match your OS.

The fine folks at Canonical have written up [a wonderful guide on how to install the Ubuntu Server image onto a Pi](https://ubuntu.com/tutorials/how-to-install-ubuntu-on-your-raspberry-pi#1-overview). 

Follow steps 1 through 4 of the guide above for the Server setup.
For the Operating System image, you want to select **Ubuntu Server 20.04.2 LTS (RPi 3/4/400) 64-bit server OS with long-term support for arm64 architectures**.

If you decide that you want a desktop UI (so you can use a mouse and have windows to drag around), you'll need to follow step 5 as well.
I suggest you don't do this and just stick with the server image, because the desktop UI will add some additional overhead and processing work onto your Pi with relatively little benefit.
However, if you're determined to run a desktop, then I recommend going with the Xubuntu option.
It's pretty lightweight on resources and very user friendly.


Once that's complete, you're ready to start preparing Ubuntu to run a Rocket Pool node.
You can use the local terminal on it, or you can SSH in from your desktop / laptop.
The process will be the same either way, so do whatever's most convenient for you.

Check out the next section on [Preparing the OS](Preparing-the-OS.md) for the next part of the setup process.