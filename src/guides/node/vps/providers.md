# Selecting a Hosting Provider

If you've arrived at this section, then you would like to run a Rocket Pool node but can't set one up locally at your home; you require a **virtual private server (VPS)** hosted on the cloud.
There are several different services available that can provide such a machine, and they come in two different flavors: VPS providers and public cloud providers.

Choosing the correct one can be difficult, and understanding the differences between them is key.
In this guide, we'll shine some light onto the distinction and list a few of the services that other Rocket Pool users have leveraged in the past to help you navigate through your options.


## Traditional VPS Hosting

In a nutshell, a virtual private server is a single instance of a virtual machine that resides on a larger physical machine.
They tend to be a relatively cheap option, and they are less-frequently employed than the ubiquitous cloud platforms so they tend to contribute more towards the Ethereum network's decentralization.

However, they rarely have high-availability support; if the physical server goes down, it's likely that your VPS hosted on it will go down as well.
Also, they have a fixed resource footprint; it's usually not possible to increase or decrease resources like CPU and RAM on demand. 

Some well-known VPS providers that Rocket Pool node operators have used include [OVH](https://www.ovh.com/world/), [Leaseweb](https://www.leaseweb.us/cloud/virtual-server), [Contabo](https://contabo.com/en/vps/), and [Netcup](https://www.netcup.eu/vserver/vps.php).


## Cloud Hosting

Cloud hosting refers to virtual machines that are split across on a distributed network of multiple servers, rather than being hosted on a single physical machine.
If one of the hosting machines fails, the others can seamlessly take over for it so availability and reliability tend to be extremely high on these platforms.
They also tend to offer flexible resource options; it's relatively simple to add more CPU, RAM, or disk space on demand.

Due to these extra benefits, cloud-based servers tend to be more expensive than VPS solutions.
They're also very popular platforms, so using them generally reduces the overall decentralization of the Ethereum network.

The 3 primary cloud providers are [Amazon Web Services (AWS)](https://aws.amazon.com/), [Microsoft Azure](https://azure.microsoft.com/en-us/), and [Google Cloud Platform (GCP)](https://cloud.google.com/).


## Key Considerations

### Price

Cloud hosting solutions are usually a safer choice if cost is not a priority.
The section below has a more detailed breakdown of cost estimates but here is a general comparison between a VPS option and a cloud option:

- AWS t2.large + 1TB EBS storage: $200/mo
- OVH Dedicated Server: $120/mo
- Contabo VPS: $40/mo


### Performance

The recommended system requirement for a hosted node are the same as the local options:
- 4 CPU Cores
- 16GB of RAM (8 if using Nimbus)
- 1-2 TB SSD Storage

When choosing a hosting provider, keep in mind that there is a tendency for the cheaper VPS options oversubscribe their servers which can result in reduced performance overall.

Here are a few simple tests you can run to assess your server's performance:

#### Disk I/O

**Simple Write Speed Test:**
```
dd if=/dev/zero of=test bs=64k count=16k conv=fdatasync;rm test
```
This commands writes out a 1GB file of 0s to test write speed.
Results can vary greatly between providers or even between systems hosted by the same provider.

Comparing Contabo and Netcup VPS's during the beta returned the following results:
- Netcup: 700 MB/s
- Contabo: 169 MB/s

**fio (flexible I/O tester)**
For more in-depth testing you can use a tool like fio.
It is officially available in the Ubuntu repo so it should be generally be considered safe to install.
As always, being cautious about installing any unnecessary packages is wise.

Install fio:
```
sudo apt install fio
```

Run Test:
```
fio --randrepeat=1 --ioengine=libaio --direct=1 --gtod_reduce=1 --name=test --filename=test --bs=4k --iodepth=64 --size=4G --readwrite=randrw --rwmixread=75
```
The test will take a few minutes and will create a 4GB test file testing both reads and writes.
Results will show performance for random read and write iops.

Using the same two VPS's the results mirror the previous test:
- Netcup:
  - read:  IOPS=21.9k
  - write: IOPS=7307
- Contabo:
  - read:  IOPS=3095
  - write: IOPS=1034

While both systems will likely run Rocket Pool without issue, you should look for performance of **at least 5000 read / 1700 IOPS**.


#### CPU Performance
There are a number of benchmark tools available to install via your servers package manager.
One of the most common is `sysbench`.

Most hosted server options should have far more CPU resources than necessary so unless you are noticing performance issues, its unnecessary to install and run any benchmark packages.


## Provider Comparison (Placeholders)
| Provider | Model| CPU | RAM (GB) | SSD Storage (GB) | Price (Month) USD | Type |
| -------- | ----------------------------------------------------------------------- | -- | -- | ---- | ------- | --------- |
| Contabo  | [VPS XL SSD](https://contabo.com/en/vps/vps-xl-ssd/)                    | 10 | 60 | 1600 | $35     | VPS       |
| Netcup   | [VPS 6000 G9](https://www.netcup.eu/bestellen/produkt.php?produkt=2604) | 12 | 48 | 1200 | $35     | VPS       |
| Hetzner  | [CPX41](https://www.hetzner.com/cloud)                                  | 8  | 16 | 1210*| $64     | VPS       |
| OVH      | [Rise-1](https://www.ovhcloud.com/en/bare-metal/rise/rise-1/)           | 4  | 32 | 2000*| $120    | Dedicated |
| AWS      | [t2.large](https://aws.amazon.com/ec2/instance-types/t2/)               | 2  | 8  | 1000* | $200    | Cloud     |

_* Additional storage needs to be configured when ordering_
