# :cd: Preparing a PC, Mini-PC, or NUC

Before installing Rocket Pool, there are a few checks you should do to make sure your system is compatible and will work correctly.


## System Requirements

Below is a brief description of the software and hardware requirements that a Rocket Pool node requires.
This guide assumes that you already have your machine physically built, and the operating system installed.


### Supported Operating Systems

Rocket Pool's Smartnode client currently supports **Linux** and **macOS** systems.

At this time, **Windows** can be used to remotely manage a remote Linux or Mac machine, but the Smartnode itself cannot currently run on a Windows system. However, Rocket Pool *can* be run on a Linux [virtual machine](https://en.wikipedia.org/wiki/System_virtual_machine) hosted by a Windows machine.
This setup is not recommended over simply installing Linux as the host operating system, but it does work if necessary.
Note that it will require extra resource overhead, and comes with its own set of security risks, so we do not advise using this setup when staking real Ether on the main network.

Rocket Pool is natively compatible with **AMD64 (x64)** and **arm64 (aarch64)** CPU architectures.
For other architectures, you will need to compile the smartnode clients from source.

Note that the user must have **root / Administrator** access (or **sudo** privileges) to install the Smartnode.


#### Linux Support

There are many variants of the Linux OS (called distributions, or **distros** for short). While you can run Rocket Pool from any modern distro, Rocket Pool's installer can automatically install the entire stack on [Ubuntu](https://ubuntu.com/about), [Debian](https://www.debian.org/intro/why_debian), [CentOS](https://www.centos.org/about/), and [Fedora](https://docs.fedoraproject.org/en-US/project/).

For installation on other distros, the Smartnode installer will not be able to automatically install some system dependencies (such as `docker-compose`).
Some manual steps will be required during installation.

For `arm64` systems, the Smartnode installer only natively supports Debian and Debian-based distros such as Ubuntu.
For other distros, manual steps will be required during installation.


#### [TODO] macOS Support

[A description of support on Mac goes here.
TLDR, OSX is good, but the installer doesn't know how to deal with arm64 so manual intervention is required.]


### Hardware Requirements

The hardware requirements for a node depend largely on which eth1 and eth2 clients you decide to run.
As shown in [the hardware guide](./hardware), there is a wide range of possible configurations that work well.
However, for the sake of completeness, we have assembled the following hardware profiles:


#### Light Client (Relies on External ETH1 Service)
- CPU: Dual-core 1.6+ GHz
- RAM: 8 GB DDR4 2133 MHz
- SSD: 128 GB, 9k Read IOPS, 3k Write IOPS**
- Network: 10+ Mbps, ??? monthly data cap [TODO]
- ETH1: Infura, Pocket
- ETH2: Nimbus, Prysm


#### Low-Power Full Node
- CPU: Quad-core 1.6+ GHz
- RAM: 8 GB DDR4 2400 MHz
- SSD: 1 TB*, 15k Read IOPS, 5k Write IOPS**
- Network: 10+ Mbps, 1.5+ TB monthly data cap
- ETH1: Geth (in low-cache mode), Infura, Pocket
- ETH2: Nimbus, Prysm


#### Typical Full Node
- CPU: Quad-core, 2.6+ GHz
- RAM: 16 GB DDR4 3200 MHz
- SSD: 1 TB*, 15k Read IOPS, 5k Write IOPS**
- Network: 25+ Mbps, 1.5+ TB monthly data cap
- ETH1: Any
- ETH2: Any


*\* Note that for mainnet, at the time of this article, 1 TB is sufficient but **2 TB is recommended**.
The eth1 blockchain [grows quickly](https://ycharts.com/indicators/ethereum_chain_full_sync_data_size), so 2 TB will offer better future-proofing.
The larger your storage, the longer you can go between needing to reclaim space by pruning.*

*\*\* If you are unsure if your disk meets these performance requirements, `fio` is a good way to test them.
See [here](https://arstech.net/how-to-measure-disk-performance-iops-with-fio-in-linux/) for Linux instructions, and [here](https://www.nivas.hr/blog/2017/09/19/measuring-disk-io-performance-macos/) for MacOS instructions.* 


### Pre-installation System Checks

Before installing Rocket Pool, please review the following checklist:

- Your system is fully built, powers on, and can boot into the operating system.
- You have a Linux or macOS operating system installed.
- Your user account has root / Administrator privileges.
- You have an SSD that meets the performance requirements.
- Your SSD is mounted on your file system.
- You have at least 800 GB of space free for the initial ETH1 and ETH2 syncing process.
- If your ISP caps your data, it is more than 1.5 TB per month.

If you have checked and confirmed all of these items, then you are ready to install Rocket Pool and begin running a node!
Move on to the [Choosing an ETH1 Client](/guides/node/eth1-clients) section.
