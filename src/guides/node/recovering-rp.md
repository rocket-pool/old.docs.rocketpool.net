# Importing an Existing Wallet for your Node

If you already have a wallet you'd like to use for your node, or if you're recovering a wallet you already created with the Smartnode earlier, this guide will help you through the import / recovery process.

Please select the appropriate option from the sections below.


## Recovering a Smartnode Wallet

If you generated your node wallet using the Smartnode and are simply recovering it on a new machine, the process is quite simple.
Make sure you've already installed the Smartnode software, and then simply run the following command once it's installed:

```
rocketpool wallet recover
```

::: warning NOTE
If, for some reason, you want to recover the wallet but *not* any of the validator keys attached to your node's minipools, you can specify the `-k` flag to skip the rebuild process:

```
rocketpool wallet recover -k
```

If you do not specify this flag, the Smartnode will attempt to recover the validator keys for your minipools; however, note that this will not work until your Execution client has finished syncing.
Please watch its log file to see when it's done; once it is, you can run this step.
:::

This will first ask you for a password you want to use to encrypt your wallet.
After that, it will ask for your **24 word mnemonic recovery phrase**.
Enter it carefully - it will not be shown on-screen for safety, and it is very easy to make a mistake while typing it so take your time.

When you're done, you should see output similar to this:

```
$ rocketpool wallet recover

Please enter a password to secure your wallet with:

Please confirm your password:

Please enter your recovery mnemonic phrase:

Recovering node wallet...
The node wallet was successfully recovered.
Node account: <your wallet address>
No validator keys were found.
```

If you don't see any errors, then your wallet and validators will be recovered.

Once you're done, be sure to restart the Validator client with the following command for Docker and Hybrid mode users:

```
docker restart rocketpool_validator
```

**Native mode** users will simply have to restart their Validator container process.

This will ensure that the VC picks up all of the newly restored validator keys.


## Importing an Existing Address as a Node Wallet

If you have an address you'd like to use for a node, but *didn't* create it with the Smartnode (e.g., you created it with MetaMask or a hardware wallet), then this is the section to follow.

::: danger WARNING
By doing this, your address will become a **hot wallet**.
The private key will be stored on your node machine.

If you're importing an address that is a cold wallet, such as a hardware wallet, be advised that **the protection provided by the hardware wallet will no longer exist!**

If you use this wallet for *any other cryptocurrency activity at all*, **you must migrate all of its funds to a separate address (e.g. a different hardware wallet) before importing it into your node! Only leave enough ETH on this address for your node's gas costs (typically 0.5 ETH is sufficient).**

Please ensure that you have secured your machine as much as possible by following the steps in the [Securing your Node](./securing-your-node.md) guide before importing your address as a node wallet.
:::

This capability is only available with Smartnode **v1.4.3 or higher**.
If you have a lower version, you'll need to upgrade first.

This is a multi-step process, so follow the below sections carefully.


### Step 1: Add Externally-Generated Validator Keys

**If you don't have any existing minipools attached to the address you're importing, you can skip this step.**

If your address has already been registered as a Rocket Pool node wallet (such as via a service like **Allnodes**) and already has active minipools, and you'd like to import them into the Smartnode stack along with your address, you will need to provide the private keystore files for each of their corresponding validators.
These files will be encrypted with a password of your own choosing, so you will need that password for each file as well.

You need to get these files from the service that is currently running your node in order to import it.
Some service providers may be able to retrieve these files upon request.
If you use Allnodes, you can get these files during your initial setup process but **will not be able to retrieve them in the future unless you saved them during minipool creation.**

Select your installation mode and follow the steps below. 

:::: tabs
::: tab Docker and Hybrid Mode 
First, ensure you've started the Smartnode with `rocketpool service start`.
This will create a special folder that can be used to hold the encrypted keystore files for your validators.

By default, the folder is located in `~/.rocketpool/data/custom-keys`.
If you've customized your installation or data directories, substitute appropriately to find the `custom-keys` folder.

Check with a file explorer or the `ls` command to make sure this folder exists.
If not, no worries - just make the folder with the following command:
```
mkdir ~/.rocketpool/data/custom-keys
```
:::

::: tab Native Mode
Create a folder called `custom-keys` inside of your Smartnode's `data` folder (for example, `/srv/rocketpool/data/custom-keys`).
:::
::::

Next, place each of the validator keystore files into this folder.
The names of the files don't matter, but they must be JSON files that conform to the [EIP-2335](https://eips.ethereum.org/EIPS/eip-2335#scrypt-test-vector) format.

The Smartnode will look in this directory for any keystore files you have placed here in the next steps.

::: warning NOTE
The import process will *only* look for validator keys that are attached to minipools registered to the address you're importing.
You **cannot** use this process to import other validator keys, such as for solo staking validators, into the Validator client managed by the  Smartnode stack.

Please see the documentation for running in [Reverse Hybrid Mode](./advanced-config.md#allowing-external-validator-clients-to-connect-to-the-smartnode) if you are interested in doing this.
:::


### Step 2 (Optional): Test Importing the Address

If you would like to test the recovery process to ensure you have the correct mnemonic and passwords **without actually regenerating your node wallet's private key or importing your validator keys**, you can do so with the following command:

```
rocketpool wallet test-recovery -a 0x1234abcd...
```

Where `0x1234abcd...` is the address you want to import, starting with the `0x` prefix.
**You will need your mnemonic phrase to import the private key for your address.**

::: tip TIP
If, for some reason, you want to recover the wallet but *not* any of the validator keys for your minipools, you can specify the `-k` flag to skip the validator key recovery process.
For example:

```
rocketpool wallet test-recovery -a 0x1234abcd... -k
```
:::

The Smartnode will automatically search through the most popular derivation paths (e.g. the ones used by Ledger Live, MyEtherWallet, Trezor, and the Smartnode stack) and address indicies to find the settings that correspond to the address you provided.

::: tip TIP
If you have a custom derivation path, use the `-d` flag to specify it.
For example:
```
rocketpool wallet test-recovery -d "m/44'/60'/0'/%d"
```

Use `%d` for the portion of the path that can be iterated to use different indicies.

If you have a custom address index, use the `-i` flag to specify it.
For example, if your address was the 6th one on the standard derivation path, you could use:
```
rocketpool wallet test-recovery -i 5
```

You can use both the `-d` and `-i` flags at the same time if you require.
:::

First, you'll be prompted for your address's mnemonic phrase:

```
Please enter the number of words in your mnemonic phrase (24 by default):
24

Enter Word Number 1 of your mnemonic:
```

Enter it carefully, and the Smartnode will begin searching through all of the standard options to find it (unless you explicitly specified them using the `-d` and/or `-i` flags).


Next, if you have private keystore files to import from Step 1, you will be prompted for the passwords to each of those keystore files:

```
It looks like you have some custom keystores for your minipool's validators.
You will be prompted for the passwords each one was encrypted with, so they can be loaded into the Validator Client that Rocket Pool manages for you.

Please enter the password that the keystore for <validator pubkey> was encrypted with:
```

They will be organized by the **pubkey** list, **not the filenames**.
Ensure you know which file corresponds to which validator pubkey so you enter the correct passwords.

Once you've done this, the test recovery process will proceed and report back on whether it succeeded or failed:

```
Searching for the derivation path and index for wallet 0x1234abcd...
NOTE: this may take several minutes depending on how large your wallet's index is.
The node wallet was successfully recovered.
Derivation path: m/44'/60'/0'/0/%d
Wallet index:    0
Node account:    0x1234abcd...
Validator keys:
<validator pubkey>
```

The above indicates a successful test recovery.


### Step 3: Import the Address

::: danger WARNING
If your address is a Rocket Pool node that is *not* managed by your own self-hosted Smartnode (e.g. hosted by an external service like **Allnodes**), **IT IS CRITICAL** that you coordinate with the service running your node **before you begin this import process** and inform them that you would like to migrate to your own self-hosted system.

You **MUST CONFIRM** that they have shut down validation for your node and **will NEVER resume it**, and manually confirm that your validators are no longer attesting using a Blockchain explorer such as [https://beaconcha.in](https://beaconcha.in).
You must confirm that each validator has missed **AT LEAST 2 ATTESTATIONS** to ensure you can safely migrate.
Otherwise, you will both attest at the same time and **YOUR MINIPOOLS WILL BE SLASHED!**

The Smartnode will require you to confirm that you have done this before allowing you to proceed with the import process.
:::

If the test recovery succeeded, or if you skipped it, you will next import the wallet and regenerate all of its associated key files.
The process is exactly the same as the above, but use the `recover` command instead of the `test-recovery` command:

```
rocketpool wallet recover -a 0x1234abcd...
```

When you run this command, you will first be prompted for a password to encrypt your imported node wallet with.

```
Please enter a password to secure your wallet with:

Please confirm your password:
```

After that, the mnemonic and custom validator keystore password prompts will proceed as they did before. 

Once you've entered all of this information, the Smartnode will recover your address and (if not disabled) the custom validator keys for your minipools:

```
Searching for the derivation path and index for wallet 0x1234abcd...
NOTE: this may take several minutes depending on how large your wallet's index is.
The node wallet was successfully recovered.
Derivation path: m/44'/60'/0'/0/%d
Wallet index:    0
Node account:    0x1234abcd...
Validator keys:
<validator pubkey>
```

Your address's private key will now be stored in the `data/wallet` file (e.g. `~/.rocketpool/data/wallet`), and the password for it will be stored in the `data/password` file (e.g. `~/.rocketpool/data/password`).

The private keys for each of your validators will be stored in the `data/validators` folders for each of the Consensus clients that the Smartnode supports.

::: danger NOTE
By importing an address in this fashion, the validator keys were **not** derived from your node wallet, and thus they **cannot** be recovered later by simply running `rocketpool wallet recover` as with a normal node wallet.

If you ever need to recover or import this wallet again, you will need to follow this same process which means **you will need to have these validator private keystores and their passwords backed up somewhere safe.**

If you ever lose them, **you will no longer be able to recover these validator keys!**
:::


### Step 4: Cleanup

At this point, you can now delete all of the private keystore files in the `data/custom-keys` directory.
The Smartnode will have imported them already and assigned randomized passwords to them, so those keystore files are no longer necessary.

Finally, ensure that there is **not** a file named `custom-key-passwords` in your `data` directory (e.g. `~/.rocketpool/data/custom-key-passwords`).
The Smartnode will build this temporary file only during the recover process, and will remove it automatically regardless of whether or not the recovery process succeeded; if for any reason it failed to remove it, it will alert you in the console output.
However, it never hurts to be too careful.


## Next Steps

Once you've imported or recovered your node wallet, follow the next steps in the [Intro to the Command Line Interface](./cli-intro.md) guide.