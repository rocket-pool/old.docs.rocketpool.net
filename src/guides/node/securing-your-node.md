# Securing your Node

The goal of this guide is to walk you through steps you can take to secure your node against malicious actors.
It will describe both **essential** actions, which you **must** take, and **nice-to-have** actions, which are helpful but not required.

::: tip NOTE
This guide is meant to be an **introduction** to some of the things you can do to harden your node machine.
If you are comfortable with the command-line terminal and want to go even further in protecting your node, take a look at the popular [imthenachoman/How-To-Secure-A-Linux-Server](https://github.com/imthenachoman/How-To-Secure-A-Linux-Server) guide.
:::


## Assumptions in This Guide

This guide assumes your node runs `Ubuntu 20.04 LTS`, the concepts will carry over to other systems but the example commands may not.

As with all of the commands in this guide, we assume that you are connecting **remotely** to your node's command terminal using `ssh`.
If you need a refresher on how to use `ssh`, take a look at the [Intro to Secure Shell](./ssh.md) guide first.


## ESSENTIAL: Keep your Client Machine Secure

::: warning NOTE
If you use your Smartnode locally (by physically logging into it with a keyboard and monitor directly attached to it), then **this section is not relevant to you and you can skip it**.
:::

Most Smartnode operators interact with their node remotely by connecting to its terminal from another computer using `ssh`:

- The machine you connect *to* (in this case, your node machine) is called the **server**.
- The machine you connect *from* (such as your laptop, desktop, or even your phone) is the **client**.

One of the most important things you can do to secure your Smartnode is to **keep your client machine secure**.
If your client machine is compromised and you use it to log into your node, then most of the security settings you apply to the node can be bypassed.

For example: if you use a laptop as an SSH client, and it has a [keylogger](https://en.wikipedia.org/wiki/Keystroke_logging) installed, then any secret things you type on the node (such as your password or recovery mnemonic) when connected via SSH will be stolen.

There is no definitive guide to keeping your client machine secure, but being aware that it is a factor in your security is a good first step.
Make sure that your client machine is as secure as it can be.

Here are a few tips:

- Don't use your client machine for **risky activities** (such as visiting untrustworthy websites or installing unnecessary programs)
- Keep your client machine updated with the **latest security patches**
- If possible, use a **malware and antivirus protection** program for your Operating System

For maximum security, you may want to use a **dedicated machine** as your SSH client, though this may not be practical for you.


## ESSENTIAL: Secure your SSH Access

::: warning NOTE
If you use your Smartnode locally (by physically logging into it with a keyboard and monitor directly attached to it), then **this section is not relevant to you and you can skip it**.
:::

Whether you run your Smartnode at home or you use a VPS in a remote datacenter, it is likely that either you access it through SSH, or that SSH is enabled **even if you do not use it**.

SSH connections are based on secure cryptography, but as with any secure system, the real security comes from using it correctly.
There are two main things to do for your SSH settings:

1. Use an SSH key to log in remotely, instead of a username and password
2. Disable password-based authentication entirely, so SSH keys are the only remote login option

As you are probably familiar with now, the default way to log into your node via SSH is with a username and password.
The downside of this is that your password is typically something rather "short" and susceptible to [brute-force attacks](https://en.wikipedia.org/wiki/Brute-force_attack).

Luckily, there is an alternative way to log in via SSH: an **SSH key pair**.

SSH key pairs work similarly to blockchain wallets; they come with a public part (such as your wallet address) and a private part (the private key for your wallet address):

- You provide the **public part** to your node. This way, the node knows you're allowed to connect to it, and it knows that it's really you trying to connect.
- You keep the **private part** to yourself, on your client machine. This way, you (and only you) can connect to your node.
    - You can (and should!) protect the private part with a **password**, so someone who steals your key can't use it.
- From a computer's perspective, the private key is **exponentially harder** to crack than a password is. This mitigates the risk of a brute-force attack against your node.

::: tip TIP
If you'd like to learn more about SSH key pairs before creating your own, take a look at these links:
- [https://canvas.cse.taylor.edu/courses/27/pages/ssh-key-tutorial](https://canvas.cse.taylor.edu/courses/27/pages/ssh-key-tutorial)
- [https://www.ssh.com/academy/ssh/host-key](https://www.ssh.com/academy/ssh/host-key)
:::


### Creating an SSH Key Pair

Let's start by creating a new SSH key pair **on your client machine**.
There are many varieties of key out there, but we're going to use a key type called [ed25519](https://en.wikipedia.org/wiki/EdDSA#Ed25519) which provides excellent security.

Run the following command **on your client machine** (i.e. you should **not** run this while already SSH'd into your node machine - if you are, **exit out of SSH first**):

```shell
ssh-keygen -t ed25519 -C "your_email@example.com"
```

You will see the following:

```
Generating public/private ed25519 key pair.
Enter file in which to save the key (/home/username/.ssh/id_ed25519):
```

This asks you where you would like to save your private key file.
SSH is compatible with the provided default and will automatically use it for you if you select it.
However, you have the option of changing it to something else if you wish.

::: tip NOTE
The path `/home/username/.ssh/id_ed25519` is just an example, assuming your username is `username`.
You likely have a different username.
Whenever you see a path like the above in this guide, replace it with whatever path your system actually prints with your actual username.
::: 

If you are comfortable with the default setting, simply press `Enter`.

Otherwise, type your desired location for the key.
It must be an absolute path (e.g. `/home/username/.ssh/rocketpool_key`).
Press `Enter` when you're done.

After pressing `Enter`, you will see:

```
Enter passphrase (empty for no passphrase):
```

**This will become the password for the private key itself**.
Whenever you use the key to connect to your node, you will need to enter this password first.

::: danger WARNING
**You should not leave this blank**, because otherwise anyone with the SSH key file will be able to use it!
Pick a good password that you (and only you) will know.

Also, **don't forget your password** - there is no way to recover this password if you lose it. 
:::

Once you finish typing the password, press `Enter`.
It will ask you to retype it for confirmation.

After that, you will see something like the following output:

```
Your identification has been saved in /home/username/.ssh/id_ed25519
Your public key has been saved in /home/username/.ssh/id_ed25519.pub
The key fingerprint is:
SHA256:CASbPZETiQ83lLhpUO2aoT05TxMVLwqiWtdsRtoPt4s your_email@example.com
The key's randomart image is:
+--[ED25519 256]--+
| .o*==..         |
|. +=O...         |
|..+B++o .        |
|..=.+X o         |
|.+.=+.O S        |
|o.B.oo + .       |
|.  = .  o        |
|    .  . .       |
|      E .        |
+----[SHA256]-----+
```

The first line states the location of the **private key**, which is called `id_ed25519` by default (notice that it does not have a file extension).
Ubuntu will load this key for you automatically when you use `ssh` if this private key file is in the default location.

The second line states the location of the **public key**, which is called `id_ed25519.pub` by default.
We'll need the public key for the next step.


::: tip NOTE
Ubuntu *should* load this new key automatically.
However, some systems (such as macOS machines) will not load it automatically - you will have to tell it to do this with the following command **on your client machine**:

```shell
ssh-add /home/username/.ssh/id_ed25519
```

Note that this is the path of the **private key** that we generated in the previous step, **not the public key**.
Replace the path with whatvever your system printed in that previous step.

If you get an error saying that the `ssh-agent` is not running, start it by running the following command **on your client machine**:

```shell
eval $(ssh-agent)
```

If you don't want to type these two commands every time you open the terminal, you can create a shortcut for adding you key by adding an `alias` to your `~/.bashrc` file.

Open the file using the text editor:

```shell
nano ~/.bashrc
```

Add this line to the end (assuming you used the default path for the private key - update as necessary):

```
alias loadkey='ssh-add $HOME/.ssh/id_ed25519'
```

Save and exit with `Ctrl+O` and `Enter`, then `Ctrl+X`.
Next, close and open your terminal for the changes to take effect.

You can now type `loadkey` **on your client machine** to load the key.
:::


### Adding the Public Key to your Node

Once you have your SSH key pair, you can now add the **public key** to your node.
This will let you connect to it over `ssh` using the private key you just generated, instead of your username and password.

There are two ways to do this - if one doesn't work, try the other way:

:::: tabs
::: tab Using ssh-copy-id
Run the following command **on your client machine**:

```shell
ssh-copy-id -i /home/username/.ssh/id_ed25519.pub username@node.ip.address
```

For example, if my username on the node was `staker` and my node's IP address was `192.168.1.10`, I would run the following command:

```shell
ssh-copy-id -i /home/staker/.ssh/id_ed25519.pub staker@192.168.1.10
```

You will see some messages like the following:

```
/usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "/home/username/.ssh/id_ed25519.pub"
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
```

This tells you that it's trying to log in with your key first to make sure it isn't already there.
Once it fails logging in, it knows that it's OK to add the new public key to the node machine.

It will then prompt you for the **password of the user on your node machine**.
(*Note that this is **not the password of the SSH key**!*)

Enter your user's password, and you will see the following output:

```
Number of key(s) added: 1

Now try logging into the machine, with:   "ssh 'username@node.ip.address'"
and check to make sure that only the key(s) you wanted were added.
```

That means it worked!

:::
::: tab Manually Adding the Key
Start by getting the contents of the **public key** - run this command **on your client machine**:

```shell
cat /home/username/.ssh/id_ed25519.pub
```

The output will look something like this:

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGUgU3a6mNjy3N1TyWOwY+VA/nifAeABl2Ch2yIl1bGa your_email@example.com
```

This is your **public key**.
Copy this output and store it somewhere convenient - you're going to need it in a minute.

Next, use `ssh` to connect to your node like you normally would (using your node's username and password).

Once you're connected to your node, run the following command:

```shell
nano ~/.ssh/authorized_keys
```

This will open a text editor for the file used to store all of the public keys that your node's user account trusts.

In this file, paste the **public key** that you retrieved a few steps ago using the `cat` command (the whole line starting with `ssh-ed25519`).

When it's in, save the file with `Ctrl+O` and `Enter`, then press `Ctrl+X` to exit.

Now, exit `ssh` by running the `exit` command so you return back to your local client machine's terminal. 
::::

You should now be able to `ssh` into the node like you normally would, but now you won't have to type the password of the user account.

Instead, you will have to type **the password of your SSH private key**. 
Depending on your system settings, you may only have to do this once per restart, or you may have to do it every time you use the key to connect to your node.

### Disable Login-via-Password

Even though you have an SSH key pair set up, your node will still allow other machines to try to log in using the username and password method.
This defeats the entire purpose of using SSH keys in the first place, so the next step is to disable those.

::: danger NOTE
You are about to modify the SSH server's configuration.
All of your **existing** SSH sessions will be preserved.
However, if you make a mistake, then it's possible that you will not be able to create **new** SSH sessions anymore and effectively lock yourself out of the machine.

To prevent this, we strongly recommend that you create **2 SSH sessions** for the next steps - one for editing things and testing, and one as a backup so you can revert any breaking changes.
::: 

Start by logging into your machine using `ssh` as usual:

```shell
ssh user@your.node.ip.address
```

As a reminder, **you should do this twice on two separate terminals so you have a backup session just in case**.
You can ignore the backup session for now - we'll tell you when you need it.
Run the following commands **only in the first session**.

Open the configuration file for the SSH server:

```shell
sudo nano /etc/ssh/sshd_config
```

As with all commands that start with `sudo`, this will prompt you for your **user account's password**.
This is a large file, so you'll have to navigate through it using the arrow keys on your keyboard or `Page Up` / `Page Down`.

Make the following changes:

1. Uncomment `#AuthorizedKeysFile` if it is commented (by removing the `#` in front of it)
2. Change `ChallengeResponseAuthentication yes` to `ChallengeResponseAuthentication no`
3. Change `PasswordAuthentication yes` to `PasswordAuthentication no`
4. Change `PermitRootLogin yes` to `PermitRootLogin prohibit-password` unless it's already set to that and has a `#` in front of it

Once you're done, save with `Ctrl+O` and `Enter`, then exit with `Ctrl+X`.

Next, restart the SSH server so it picks up the new settings:

```shell
sudo systemctl restart sshd
```

After this, logging into SSH via a username and password should be disabled.

::: warning NOTE
At this point, you should exit the SSH session and try to SSH back in.
If you are able to do so successfully, then your SSH configuration is still valid!

If you are **not** able to get back in, then something has gone wrong with your configuration.
**Use the backup SSH session you created at the start of this section to modify the `/etc/ssh/sshd_config` file.

Try to find the mistake or undo your changes, then restart the SSH server using `sudo systemctl restart sshd`.

Once it's been restarted, try connecting with SSH again on your "other" terminal.
Keep doing this until you have it working again and are able to successfully connect.
:::


## ESSENTIAL: Enable Automatic Security Updates

Operating System vendors routinely publish updates and security fixes, so it is important that you keep your system up to date with the latest patches.
The easiest way to do this is to enable automatic updates.

Run the following commands **on your node machine**:

```shell
sudo apt update
sudo apt install -y unattended-upgrades update-notifier-common
```

You can change the auto-update settings by editing `/etc/apt/apt.conf.d/20auto-upgrades`:

```shell
sudo nano /etc/apt/apt.conf.d/20auto-upgrades
```

This is an example of reasonable auto-update settings:

```shell
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
APT::Periodic::AutocleanInterval "7";
Unattended-Upgrade::Remove-Unused-Dependencies "true";
Unattended-Upgrade::Remove-New-Unused-Dependencies "true";

# This is the most important choice: auto-reboot.
# This should be fine since Rocketpool auto-starts on reboot.
Unattended-Upgrade::Automatic-Reboot "true";
Unattended-Upgrade::Automatic-Reboot-Time "02:00";
```

When you are done adding your changes, save with `Ctrl+O` and `Enter`, then exit with `Ctrl+X`.

After, make sure to load the new settings:

```shell
sudo systemctl restart unattended-upgrades
```


## ESSENTIAL: Enable a Firewall

In general, your machine should only accept network traffic on ports that your ETH1 client, ETH2 client, and Smartnode stack use.
To enforce that and prevent any unexpected or undesireable traffic, we can install a **firewall** on the node.

Ubuntu comes with `ufw` installed by default (the **u**ncomplicated **f**ire **w**all), which is a convenient utility for managing your node's firewall settings.

The following commands will set `ufw` up with a good default configuration for your Smartnode.
**Run these on your node machine**.

Disable connections unless they're explicitly allowed by later rules:
```shell
sudo ufw default deny incoming comment 'Deny all incoming traffic'
```

Allow SSH:
```shell
sudo ufw allow "22/tcp" comment 'Allow SSH'
```

Allow Geth if you use it (see [the Geth documentation](https://geth.ethereum.org/docs/interface/private-network#setting-up-networking) for more info):
```shell
sudo ufw allow 30303/tcp comment 'Go Ethereum port, standardized by Rockepool'
sudo ufw allow 30303/udp comment 'Go Ethereum port, standardized by Rockepool'
```

Allow your Beacon Client:
```shell
sudo ufw allow 9001/tcp comment 'Rocketpool default ETH2 port'
sudo ufw allow 9001/udp comment 'Rocketpool default ETH2 port'
```

Finally, enable `ufw`:
```
sudo ufw enable
```


### (Optional) Disable Outgoing Connections by Default

If you want to be extra-restrictive, you can disable all unexpected outgoing connections by default.
This can, however, be problematic if you install some software that attempts to connect to the Internet but hasn't been whitelisted.

::: warning NOTE
This section is for people who feel comfortable with the command-line and firewalls.
It is likely that these settings are too restrictive for many non-Smartnode applications.
:::

The following commands will lock both in and outbound traffic to only the minimum requirements.
**Run these on the node machine**.

Disallow everything by default unless it's explicitly whitelisted:
```shell
sudo ufw default deny outgoing comment 'Deny all outgoing traffic'
sudo ufw default deny incoming comment 'Deny all incoming traffic'
```

Allow DNS calls so your node can resolve URL addresses to IP addresses:
```shell
sudo ufw allow out 53 comment 'Allow DNS calls out'
```

Allow NTP (see below for more info):
```shell
sudo ufw allow out 123 comment 'Allow NTP out'
```

Allow HTTP traffic for things like `apt`:
```shell
sudo ufw allow out http comment 'allow HTTP traffic out'
```

Allow HTTPS traffic for things like `apt`:
```shell
sudo ufw allow out https comment 'Allow HTTPS traffic out'
```

Reload the settings:
```shell
sudo ufw enable
```


## (Optional) Enable Brute-Force and DDoS Protection

To protect your server from DDoS attacks and brute-force connection attempts, you can install `fail2ban`.
This program will monitor incoming connections and block IP addressed that try to log in with faulty credentials repeatedly.

See [this guide](https://github.com/imthenachoman/How-To-Secure-A-Linux-Server#application-intrusion-detection-and-prevention-with-fail2ban) for more information on intrusion prevention.

Run the following commands **on your node machine**:

Install the service:
```shell
sudo apt install -y fail2ban
```

Next, open `/etc/fail2ban/jail.d/ssh.local`:

```shell
sudo nano /etc/fail2ban/jail.d/ssh.local
```

Add the following contents to it:

```
[sshd]
enabled = true
banaction = ufw
port = 22
filter = sshd
logpath = %(sshd_log)s
maxretry = 5
```

You can change the `maxretry` setting, which is the number of attempts it will allow before locking the offending address out.

Once you're done, save and exit with `Ctrl+O` and `Enter`, then `Ctrl+X`.

Finally, restart the service:
```
sudo systemctl restart fail2ban
```

And with that, you've just greatly improved the security posture of your node.
Congratulations!