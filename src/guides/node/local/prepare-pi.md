# :cd: Preparing a Raspberry Pi



This setup will run **a full ETH1 node** and **a full ETH2 node** on the Pi, making your system contribute to the health of the Etherum network while simultaneously acting as a Rocket Pool node operator.

Whether you're a veteran systems administrator or someone that's new to Linux, don't worry. This guide will walk you through every step of the process, including what hardware you need to buy, and explain what's going on.


## Summary

For people that want a quick view of what configuration to use, here's the summary - note that the rest of the guide tells you *how* to do these things, this is just a quick summary of *what* to do:

- Get a Pi (8 GB is preferable) and relevant accessories (listed in the [Preliminary Setup](pi/preliminary-setup.md) section).
- Get a USB 3.0+ SSD like the [Samsung T5](https://www.amazon.com/Samsung-T5-Portable-SSD-MU-PA1T0B/dp/B073H552FJ). 1 TB is generally considered to be a good balance between cost and frequency of maintenance.
- Install Ubuntu 20.04 Server for arm64 using Ubuntu's provided pre-installed server image.
- Format the SSD as `ext4` and set up a mount point for it.
- Set up some swap space on the SSD, set `vm.swappiness=6` and set `vm.vfs_cache_pressure=10`.
- Install Rocket Pool, either with Docker or natively on your OS.
- For Docker users (**the normal, easy choice for inexperienced people**):
  - Install Rocket Pool using Rocket Pool's installer script.
  - Modify Docker so it stores everything on the SSD.
  - Choose `geth` as your ETH1 client.
  - Choose your ETH2 client (we recommend `nimbus` for the Pi).
- For Native users (**the better performing, but harder to maintain choice for experienced users**):
  - Install Geth as a systemd service.
    - Set up a system account for it (no login, no shell).
    - Run it with `--cache 256` for a 4 GB Pi, or `--cache 512` for an 8 GB Pi, and `--maxpeers 12`.
    - Use `taskset 0x0c` on it to restrict it to CPU cores 2 and 3.
    - Use `ionice -c 3` on it to give it a lower priority on SSD usage.
  - Install your eth2 client as a systemd service (we recommend Nimbus for the Pi).
    - Set up a system account for it (no login, no shell).
    - Run it with `--max-peers=80` (or the equivalent argument for other clients).
    - Use `taskset 0x01` on it to give it CPU core 0 (for Nimbus only).
    - Use `ionice -c 2 -n 0` on it to give it maximum priority on the SSD.
  - Install Rocket Pool.
    - Put the CLI and daemon into `/usr/local/bin`.
    - Add services for the node and the watchtower, using the eth2 service account.
    - Modify the Rocket Pool configuration to match your setup.
  - Optionally, install Prometheus and Grafana for metrics viewing.