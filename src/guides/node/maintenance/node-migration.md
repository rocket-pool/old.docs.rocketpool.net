# Moving from One Node to Another

Sometimes, your node machine is no longer able to do its job and you need to move to another one.
This could happen if you're upgrading your node for example, or if you're moving from a cloud-based node to one locally hosted on dedicated hardware, or even if your node itself suffers a catastrophic hardware failure and you need to run your validators on a backup machine.
Regardless of the case, this guide will help you understand how to safely migrate your wallet and validator keys from one node to another without getting slashed.


## Slashing and The Slashing Database

The primary reason that we encourage you to exercise so much caution when moving your wallet from one machine to another, or recovering your wallet on another machine, is because of the risk of **slashing**.
Slashing occurs when one or more of your validator keys does something that violates the rules of the Beacon Chain and appears as though you're attempting to attack the network.
In response, the chain will forcibly exit your validator and enact a severe penalty - the size of the penalty depends on how many validators are also slashed within a two-week period of your own, but currently the minimum is **1 ETH** and there is no maximum.

Though there are several conditions that can be interpreted as "attacking the network", realistically the only one that happens accidentally is the **double attestation** (or **double proposal**).
This occurs when your validator submits two attestations (or two block proposals) for the same slot that have different votes (e.g., it votes on two different candidate blocks for a particular slot instead of picking one).

To combat this, your Validator Client hosts what's called a **Slashing Database**.
The Slashing Database is simply a record of your validator's votes (i.e., the slot of each vote and the hash of the block that vote was for), so it knows not to vote on something that it's already voted on.


### Avoiding Being Slashed

Every Validator Client maintains a Slashing Database to ensure your node never double attests or double proposes.
The problem, then, comes from situations where you begin validating **without** a slashing database and thus have no record of what your validators have previously voted on.
This can happen in several situations:

1. You just changed Consensus Clients, and the new client doesn't carry the Slashing Database over from the old one (which the Smartnode does not do during a client change).
2. You have your wallet loaded on one machine and are actively attesting with it, and then load your wallet onto a second machine *while the first machine is still actively attesting*.
3. You stop validating on one machine and load your wallet into a second machine, but you haven't waited long enough for the current epoch to be finalized so your second machine attests for slots that your validators have already attested to.

The standard way to avoid being slashed is to **wait for at least 15 minutes after your last successful attestation** before starting your Validator Client and attesting again, and **ensure that your validator keys are only present on one single machine**.

More specifically, the plan is to wait until your validator has intentionally missed an attestation, **and that miss has been finalized**.
Once finality is attained, your validator cannot vote for the finalized epoch any longer and it is safe to start attesting with it once more.

The 15-minute wait comes from a rule of thumb that when operating normally (e.g. with normal consensus), the Beacon Chain takes about 7 minutes to finalize an epoch.
Waiting for 15 minutes ensures that you've missed at least one epoch, and waited long enough for that epoch to be finalized, with a small buffer just for safety.


## Node Migration Checklist

With the above context in mind, here is a helpful checklist you can follow when migrating your node to ensure you won't be slashed.
This is designed for maximum safety, so while you may think some of the steps are unnecessary, we **strongly** encourage you to follow them all to completion.

1. **Prepare the new node** by following these guides, starting from the "Preparing a Node" section and ending once you have the Smartnode installed and are syncing an Execution and Consensus client.
   - :warning: **DO NOT** initialize a new wallet or recover your old wallet on the node. Allow it to sync the clients *without a wallet present*.

2. **WAIT** until your clients are fully synced on the new node.
   
3. Confirm that you have recorded your mnemonic correctly by running `rocketpool wallet test-recovery` on your new machine. This will *simulate* key recovery to confirm your node wallet and all of your minipools' validator keys can be recovered correctly, but will not *actually* recover them and save them to disk so there is no risk of slashing.
   1. If the Smartnode fails to recover your node wallet using the mnemonic you provided, then your mnemonic may be invalid. **STOP** going through this process; removing the keys from your old node means they could be **lost forever**.
   2. In this situation we recommend exiting your validators and withdrawing your capital as soon as possible, so you can start over with a new node that you have the working mnemonic for. 
   
4. **Stop validating** on your old node (for example, using `rocketpool service stop` to shut down the validator client).
   
5. **Delete your keys** from your old node (for example, using `rocketpool wallet purge`).
   1. **VERIFY** the keys have been removed by looking if your node's `data` folder (default is `~/.rocketpool/data/validators/`) - each Consensus Client will have its own folder under that data folder with its own copy of the keys.
   2. Please see the [Verifying Key Removal](#verifying-key-removal) section below for instructions on how to do this.
   3. Ensure **all of them** have been deleted.

6. **Power off** your old node and disconnect it from the Internet, by removing the Ethernet cable or Wi-Fi module.

7. **Wipe the SSD** from your old node, using one of the following methods:
   1. Use a bootable USB drive with a Linux installation (such as the popular [GParted](https://gparted.org/download.php)) and use it to erase the drive.
   2. **Physically remove it** from your old node, attach it to another machine using a USB converter, and use a tool such as [GParted](https://installati.one/debian/11/gparted/) to erase the drive.
   3. **Physically remove it** from your old node and hit it with a hammer to break it and ensure it will never be used again.

8. **WAIT** for at least 15 minutes before proceeding. Use a block explorer like [https://beaconcha.in](https://beaconcha.in) to look at your validator's attestation record. Wait until at least one attestation has been recorded as missing *and the corresponding epoch has been finalized*.
   1. NOTE: if you have multiple minipools, you must ensure *all of them* have missed at least one attestation that has been finalized.

9.  **Recover your node wallet** on the new machine by following the instructions in [Importing / Recovering an Existing Wallet](../recovering-rp.md).

10. **Restart your Validator Client** to ensure that your validator keys are loaded (e.g., with `docker restart rocketpool_validator`).

Your validator keys will now be loaded on your new node, and you can begin attesting safely with it.


## Verifying Key Removal

Validator keys are stored on your disk in the form of `json` files.
They are kept inside your node's `data` folder.
By default, you can find them here:

```
~/.rocketpool/data/validators/
```

::: warning NOTE
If you changed your `data` directory using the `service config` TUI (e.g., you are using an Aegis key and set that as your `data` folder, the above path should be changed to `<your data folder>/validators`.)
:::

Each client will have its own copy of the keys, since each client expects them in a different format or configuration.

To **find** the keys on disk, run the following command:

```
sudo find ~/.rocketpool/data/validators -type f -name "*.json"
```

For example, on a machine with two minipools, the output would look like this:

```
/home/joe/.rocketpool/data/validators/teku/keys/0x831862d79685079037dbba67acfa1faf13a5863b94c1c39126e9a52155d32b7733ba65a56ba172e0fcb2b7d77e8a125b.json
/home/joe/.rocketpool/data/validators/teku/keys/0x900189d6bf7b0635ce1d81046c0d882d52ccf05e3f4fb29e7b9db4c9fb72c6587256fd41a785f103e15a253f3d24a610.json
/home/joe/.rocketpool/data/validators/lighthouse/validators/0x831862d79685079037dbba67acfa1faf13a5863b94c1c39126e9a52155d32b7733ba65a56ba172e0fcb2b7d77e8a125b/voting-keystore.json
/home/joe/.rocketpool/data/validators/lighthouse/validators/0x900189d6bf7b0635ce1d81046c0d882d52ccf05e3f4fb29e7b9db4c9fb72c6587256fd41a785f103e15a253f3d24a610/voting-keystore.json
/home/joe/.rocketpool/data/validators/nimbus/validators/0x831862d79685079037dbba67acfa1faf13a5863b94c1c39126e9a52155d32b7733ba65a56ba172e0fcb2b7d77e8a125b/keystore.json
/home/joe/.rocketpool/data/validators/nimbus/validators/0x900189d6bf7b0635ce1d81046c0d882d52ccf05e3f4fb29e7b9db4c9fb72c6587256fd41a785f103e15a253f3d24a610/keystore.json
/home/joe/.rocketpool/data/validators/prysm-non-hd/direct/accounts/all-accounts.keystore.json
/home/joe/.rocketpool/data/validators/prysm-non-hd/direct/keymanageropts.json
/home/joe/.rocketpool/data/validators/lodestar/validators/0x831862d79685079037dbba67acfa1faf13a5863b94c1c39126e9a52155d32b7733ba65a56ba172e0fcb2b7d77e8a125b/voting-keystore.json
/home/joe/.rocketpool/data/validators/lodestar/validators/0x900189d6bf7b0635ce1d81046c0d882d52ccf05e3f4fb29e7b9db4c9fb72c6587256fd41a785f103e15a253f3d24a610/voting-keystore.json
```

This shows an example where the keys have **not** been deleted yet and are still on the filesystem.

If your keys **have** been deleted, you should not see *any* of the hex strings (the large strings starting with `0x`) in any of the folders for any of the clients within the output of that command.
