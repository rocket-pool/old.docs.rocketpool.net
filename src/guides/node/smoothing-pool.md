# The Smoothing Pool

The **Smoothing Pool** is a unique opt-in feature of the Rocket Pool network that is available to our node operators.
Essentially, it is a smart contract that can act as a **fee recipient** for your node (the address that all of the priority fees and MEV rewards )
This means that all priority fees and MEV

 will collectively pool the priority fees of every member opted into it.
During a rewards checkpoint, the total ETH balance of the pool is divided into a pool staker portion and a node operator portion.
All of the rewards in the node operator portion are **distributed fairly to every member of the pool**.

In essence, the Smoothing Pool is a way to effectively eliminate the randomness associated with block proposals on the Beacon Chain.
If you've ever had a streak of bad luck and gone months without a proposal, you may find the Smoothing Pool quite exciting.

::: tip NOTE
The Smoothing Pool rewards are built into the Merkle Tree used for RPL rewards, so you claim them at the same time you claim RPL using `rocketpool node claim-rewards`.
:::

To help clarify the details, the Smoothing Pool uses the following rules:

- Opting into the Smoothing Pool is done on a **node level**. If you opt in, all of your minipools are opted in.

- The node operator's total share is determined by the average commission of every minipool in every node opted into the Smoothing Pool.

- Anyone can opt in at any time. They must wait a full rewards interval (1 day on Ropsten, 28 days on Mainnet) before opting out to prevent gaming the system.
  - Once opted out, you must wait another full interval to opt back in.

- The Smoothing Pool calculates the "share" of each minipool (portion of the pool's ETH for the interval) owned by each node opted in.
  - The share is a function of your minipool's performance during the interval (calculated by looking at how many attestations you sent on the Beacon Chain, and how many you missed), and your minipool's commission rate.

- Your node's total share is the sum of your minipool shares.

- Your node's total share is scaled by the amount of time you were opted in.
  - If you were opted in for the full interval, you receive your full share.
  - If you were opted in for 30% of an interval, you receive 30% of your full share.

To opt into the Smoothing Pool, run the following command:

```
rocketpool node join-smoothing-pool
```

This will record you as opted-in in the Rocket Pool contracts and automatically change your Validator Client's `fee recipient` from your node's distributor contract to the Smoothing Pool contract.

To leave the pool, run this command:

```
rocketpool node leave-smoothing-pool
```