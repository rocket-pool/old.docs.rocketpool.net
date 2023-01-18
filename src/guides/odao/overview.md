# The Rocket Pool Oracle DAO

::: warning NOTE
This documentation only applies to members of Rocket Pool's Oracle DAO.
If you have not been explicitly invited to the Oracle DAO and just intend to run a regular Rocket Pool node, this section of the guide does not apply to you.
You can safely ignore it, but are welcome to read it if you are interested.
:::

The **Oracle DAO** is the group of special Rocket Pool nodes that are responsible for the administrative duties required by the protocol that cannot be achieved by Smart Contracts due to technical limitations.
They are essentially the same as normal Rocket Pool nodes; they use the same tools, can be configured with the same methods, and can even run regular minipools, but they come with supplemental tasks that they perform.
This includes things such as:
- Shuttling information from the Beacon Chain to the Execution Layer, including validator status and balances
- Ensuring minipools are creating using validator public keys that aren't already in use, and [have the proper withdrawal credentials](https://github.com/rocket-pool/rocketpool-research/blob/master/Reports/withdrawal-creds-exploit.md) so the protocol can safely fund them
- Constructing the rewards Merkle tree at the end of each rewards period and uploading it to IPFS for other node operators to access
- Monitoring proposals for compliance with Rocket Pool's [fee recipient requirements](../node/mev.md)
- Proposing and voting on modifications to the core protocol, including changing parameters and approving contract upgrades
- Proposing and voting on the Oracle DAO roster, including inviting and removing other Oracle DAO members

As a reward for fulfilling these duties, the Oracle DAO is collectively given 15% of the total RPL inflation produced at each rewards period, divided evenly among its members. 

Unlike normal Rocket Pool nodes, which can be created and run permissionlessly by anyone, membership in the Oracle DAO is **invite only** by existing members.
If you have recently been invited to join the Oracle DAO, this section of the guide will help you understand your role, get your node set up, and ensure that it stays healthy.


## Requirements

To run an Oracle DAO node, you will require the following:

- Access to an **Execution Client's RPC endpoint**. This can be a locally-run client, as is the case with most Rocket Pool nodes, or it can link to external clients that you or your organization maintain independently.
- Access to an **Archive-Mode Execution Client**, which can either act as your primary client or a supplementary (fallback) client. It will only be used in rare circumstances where duties require your node to recall an Execution Layer state that has been pruned from your Execution Client. Nevertheless, it is **critical** that you have access to an Archive Node during these periods to ensure your duties are able to be fulfilled successfully.
  - You can use a service such as [Infura](https://infura.io/pricing) or [Alchemy](https://www.alchemy.com/pricing) for this if you cannot host your own Archive Node.
- Access to an **Archive-Mode Beacon Node's REST API endpoint** (via HTTP). This can be a locally-run client, as is the case with most Rocket Pool nodes, or it can link to external clients that you or your organization maintain independently.
- The standard Smartnode CLI.
- The Smartnode daemon configured and running in `watchtower` mode (this is included with the standard Smartnode bundle for all users, but only actively performs duties for Oracle DAO nodes).
  - This can be run in a Docker container (standard setup) or as a simple `systemd` service ("Native" mode).
- Enough ETH to pay for the gas costs of your duties (discussed later).
- A [web3.storage](https://web3.storage/) account, used for submitting the generated rewards tree artifacts to their IPFS pinning service.

::: warning NOTE
If you plan to use **Infura** for your Archive Mode fallback, you must have at least the **Team** plan.
The free tier and the Developer tier are not sufficient.

If you plan to use **Alchemy**, you must have at least the **Growth** plan.
The free tier is not sufficient.
::: 


## Activities

Oracle DAO duties are split into two parts.

1. **Automated duties**: these are duties related to routine Rocket Pool operation, such as shuttling information from the Consensus Layer to the Execution Layer, calculating various aspects of the protocol off-chain, and submitting them as updates to the Smart Contracts. Each of these is performed automatically by the `watchtower` daemon process and do not require manual intervention so long as your Execution and Consensus Clients, and your `watchtower` daemon, are all operating normally.
   
2. **Manual duties**: these are duties that require your own decision making and out-of-band communication with the rest of the Oracle DAO to perform. They include things such as voting on contract upgrades, changing parameters, and inviting or kicking members to/from the Oracle DAO. These can all be done via the standard Smartnode CLI.


Read the next section to learn how to set up your Oracle DAO node.