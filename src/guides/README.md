# :ledger: Guides Overview

# TODO
This section contains guides for Rocketpool users.


# How to Stake with Rocket Pool

- [Testnet] Getting goerli ETH from a faucet
- Getting onto the staking website
- Staking ETH for rETH
- How to track growth over time
- Tax disclaimer (depends on country of origin)


# Running a Rocket Pool Node

- Overview
  - Node operator responsibilities
  - Tax disclaimer (depends on country of origin)
- Picking a Setup: Local Node vs. VPS
  - Local node requirements (hardware, ISP, data caps, reliable power)
  - VPS requirements (data rates, storage rates, security, etc.)
- Local Node Setup:
  - Build, prepare hardware, install OS via ISO (follow vendor directions)
  - Prepare the OS: set up 2nd drive, test performance (fio), set up swap if needed?
- VPS Setup:
  - Pick a VPS provider
  - Create an image
  - Prepare the OS: test performance (fio), set up swap if needed?
- Raspberry Pi Setup (copy of Local Node with some extra sauce)
- Install & Configure Rocket Pool
  - Choosing an ETH1 client
  - Choosing an ETH2 client
  - Standard (Full Docker install):
    - Install normally, change geth cache if necessary, change peers if necessary
    - How to Update
  - Docker with external ETH1 and/or ETH2 clients:
    - Install
    - Modify config settings to point to external clients
    - How to Update
  - Native:
    - Set up system accounts, set up services, install binaries, etc.
    - How to Update
- Using the CLI
  - Common command walkthrough
- How to Create a Validator
  - How does the commission work?
  - 16 vs. 32 ETH?
  - What's the queue?
- Securing your Node
  - Setting a trusted withdrawal address
  - Setting up OS permissions
  - Firewall & locking down ports
  - SSH hardening (key exchange, passwordless)
- Monitoring & Maintaining your Node
  - Watching system performance
  - Watching validator performance
  - Setting up Grafana
  - Dealing with system updates & down time
  - Setting up a backup strategy
  - Checking on RPL claims & gas reserves in your node wallet
- Troubleshooting
  - Sync issues
  - Peer issues
  - Can't do X because I don't have enough gas
  - Can't deposit because I haven't staked enough RPL
  - My minipool was dissolved
  - My TX is stuck because I set gas too low, help!
  - Others that come up?

# How Do I...? (FAQ)
  - Recover my node if my machine broke?
  - See how much RPL I've earned?
  - See what the current gas price is?
  - Disable automatic RPL claims?
  - Other stuff the community asks for