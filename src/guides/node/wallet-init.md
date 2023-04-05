# Creating a New Wallet

If the Smartnode services are up and running, the next step is to set up an ETH1 wallet for your node.
This is simply an ETH1 address that will hold your node's funds - it will use this to send ETH to your minipool when you begin staking, pay for gas during various transactions, and other various operations.

You have the option of either creating a brand new wallet from scratch, or importing / recovering an existing wallet or address.
Please choose which option you'd like from the tabs below.

::::: tabs
:::: tab Creating a New Wallet

The most common way to run a node is to create a new ETH1 address that is dedicated to the node.
The Smartnode CLI provides a way to do this easily:

```
rocketpool wallet init
```

You will first be prompted for a password to protect your wallet's private key.
Next, you will be presented the **unique 24-word mnemonic** for your new wallet.
This is the **recovery phrase** for your wallet.
If you ever lose your machine, you can use this phrase to regenerate your wallet and resurrect all of the Consensus (ETH2) validators attached to it.

::: warning NOTE
It is **essential** that you write this mnemonic down because this is the only time it will be shown to you, but keep it somewhere safe.
Anyone with this phrase can gain control of your wallet.
:::


Once you confirm your mnemonic phrase, you will be presented with the unique ETH1 address for your node wallet.
::::
:::: tab Recovering / Importing an Existing Wallet

If you already have a node wallet that you created in a previous installation of the Smartnode, or if you want to import an address that you created elsewhere (such as with **Allnodes**), please follow the instructions in the [Importing an Existing Wallet for your Node](./recovering-rp.md) guide.

Return here when you're finished.
::::
:::::


::: warning NOTE
As of the current build, Rocket Pool needs to have access to your wallet's private key in order to perform its automatic duties.
**This means that the private key will exist in a file on your machine.**
If an attacker manages to gain access to your machine, they could gain access to your node wallet and steal all of the tokens that it contains!
Please ensure that you have followed the security guide in the [Securing your Node](./securing-your-node.md) section before you continue, and are comfortable with your security posture.
:::

:::: tabs
::: tab Docker and Hybrid Modes
Your wallet's private key will be stored in a file located at `~/.rocketpool/data/wallet`.

The password used to encrypt your wallet's key will be stored in `~/.rocketpool/data/password`.
This is the file that must be protected at all times.
:::

::: tab Native Mode
The wallet and password files will be stored in the `data` directory under the Rocket Pool directory that you set up earlier (e.g. `/srv/rocketpool`).

Your wallet's private key will be stored in a file located at `/srv/rocketpool/data/wallet`.

The password used to encrypt your wallet's key will be stored in `/srv/rocketpool/data/password`.
This is the file that must be protected at all times.
:::
::::