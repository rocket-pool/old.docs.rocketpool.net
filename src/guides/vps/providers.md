# :cloud: Selecting a Server Provider

There are many dedicated server, virtual private server ***(VPS)*** and public cloud providers available but choosing the correct one can be difficult. ***The biggest challenge is finding an option with adequate SSD storage.***

It's important to understand the differences between standard hosting providers and cloud services like AWS.


## Traditional Hosting

Companies of all sizes offer hosting solutions that are suitable for Rocket Pool. Some well known examples include OVH, Leaseweb, Contabo, and Netcup
but there are many more.

Advantages:

- Less expensive
- More decentralized


Disadvantages:

- Potentially less reliable
- Potentially less secure
- Slower setup/provisioning


## Cloud Hosting

The 3 primary cloud providers are ***Amazon Web Services (AWS)***, ***Microsoft Azure***, and ***Google Cloud Platform (GCP)***. It's outside the scope of this document to compare the differences between these and other cloud options so this is only a general overview.

Advantages:

- Very reliable
- Better security
- Increased ability to customize system resources


Disadvantages:

- Significantly more expensive
- More centralized


## Key Considerations

### Price

Public cloud offerings are almost always the better choice if cost is not a concern. We will have a more detailed breakdown of cost estimates below but for a rough comparison:
- AWS t2.large + 1TB EBS storage ~ $200 a month
- OVH Dedicated Server ~ $120 a month

Cheaper VPS options from providers like Contabo can be found for under $40 a month!


### Performance


### Security


## Provider Comparison (beta placeholders)
| Provider | Model| CPU | RAM (GB) | SSD Storage (GB) | Price (Month) USD | Type |
| -------- | ----------------------------------------------------------------------- | -- | -- | ---- | ------- | --------- |
| Contabo  | [VPS XL SSD](https://contabo.com/en/vps/vps-xl-ssd/)                    | 10 | 60 | 1600 | $35     | VPS       |
| Netcup   | [VPS 6000 G9](https://www.netcup.eu/bestellen/produkt.php?produkt=2604) | 12 | 48 | 1200 | $35     | VPS       |
| Hetzner  | [CPX41](https://www.hetzner.com/cloud)                                  | 8  | 16 | 1210*| $64     | VPS       |
| OVH      | [Rise-1](https://www.ovhcloud.com/en/bare-metal/rise/rise-1/)           | 4  | 32 | 2000*| $120    | Dedicated |
| AWS      | [t2.large](https://aws.amazon.com/ec2/instance-types/t2/)               | 2  | 8  | 1000 | $200    | Cloud     |
