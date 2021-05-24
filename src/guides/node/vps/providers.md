# :cloud: [WIP] Selecting a Hosting Provider

There are many dedicated server, virtual private server **(VPS)** and public cloud providers available but choosing the correct one can be difficult. **The biggest challenge is finding an option with adequate SSD storage.**

It's important to understand the differences between standard hosting providers and cloud services like AWS.


## Traditional Hosting

Companies of all sizes offer hosting solutions that are suitable for Rocket Pool. Some well known examples include OVH, Leaseweb, Contabo, and Netcup.

Advantages:

- Less expensive
- More decentralized


Disadvantages:

- Potentially less reliable
- Potentially less secure
- Slower setup/provisioning


## Cloud Hosting

The 3 primary cloud providers are **Amazon Web Services (AWS)**, **Microsoft Azure**, and **Google Cloud Platform (GCP)**. It's outside the scope of this document to compare the differences between these and other cloud options so this is only a general overview.

Advantages:

- Very reliable
- Better security
- Increased ability to customize system resources


Disadvantages:

- Significantly more expensive
- More centralized


## Key Considerations

### Price

Public cloud offerings are almost always the better choice if cost is not a concern. The section below has a more detailed breakdown of cost estimates but here is a rough comparison:
- AWS t2.large + 1TB EBS storage ~ $200 a month
- OVH Dedicated Server ~ $120 a month

Cheaper VPS options from providers like Contabo can be found for under $40 a month!


### Performance

The recommended system requirement for a hosted node are the same as the local options:
- 4 CPU Cores
- 16GB of RAM
- 1 TB SSD Storage

When choosing a hosting provider keep in mind that many of the cheaper VPS options oversubscribe their servers which can result in
reduced performance overall.

There are a number of server benchmarking scripts but due to value of a node I do not suggest using them
unless you are comfortable auditing the code.

Here are a few simple tests you can run without 3rd party scripts:

#### Disk I/O

**Simple Write Speed Test:**
```
dd if=/dev/zero of=test bs=64k count=16k conv=fdatasync;rm test
```
This commands writes out a 1GB file of 0s to test write speed. Results can vary greatly between providers
or even between systems hosted by the same provider.

Comparing Contabo and Netcup VPS's during the beta returned the following results:
- Netcup: 700 MB/s
- Contabo: 169 MB/s

**fio (flexible I/O tester)**
For more in-depth testing you can use a tool like fio. It is officially available in the Ubuntu repo so it should be generally be considered safe to install.
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

While both systems will run Rocket Pool without issue, you should look for performance of
5000 IOPS or more if possible.

#### CPU Performance
There are a number of benchmark tools available to install via your servers package manager.
One of the most common is `sysbench`.

Most hosted server options should have far more CPU resources than necessary so unless you are noticing performance issues its unnecessary to install and run any benchmark packages.

### Security

TODO: Cover in separate article? 

Always change your severs root password or fully disable the account after its sent by the hosting provider.

Disable VNC or other terminal access if possible. This can usually be done via the providers web portal.

## Provider Comparison (beta placeholders)
| Provider | Model| CPU | RAM (GB) | SSD Storage (GB) | Price (Month) USD | Type |
| -------- | ----------------------------------------------------------------------- | -- | -- | ---- | ------- | --------- |
| Contabo  | [VPS XL SSD](https://contabo.com/en/vps/vps-xl-ssd/)                    | 10 | 60 | 1600 | $35     | VPS       |
| Netcup   | [VPS 6000 G9](https://www.netcup.eu/bestellen/produkt.php?produkt=2604) | 12 | 48 | 1200 | $35     | VPS       |
| Hetzner  | [CPX41](https://www.hetzner.com/cloud)                                  | 8  | 16 | 1210*| $64     | VPS       |
| OVH      | [Rise-1](https://www.ovhcloud.com/en/bare-metal/rise/rise-1/)           | 4  | 32 | 2000*| $120    | Dedicated |
| AWS      | [t2.large](https://aws.amazon.com/ec2/instance-types/t2/)               | 2  | 8  | 1000* | $200    | Cloud     |

_* Additional storage needs to be configured when ordering_
