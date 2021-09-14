# Securing your Node

The goal of this guide is to walk you through steps you can take to secure your node against malicious actors. It will separate actions into these categories:

1. Essential
2. Nice to have

You should absolutely take all essential steps.

*Wizards only: If you want to go above and beyond and know your way around the terminal, have a look as the popular open source [imthenachoman/How-To-Secure-A-Linux-Server]( https://github.com/imthenachoman/How-To-Secure-A-Linux-Server ) guide.*

## Assumptions in this guide

This guide assumes your node runs `Ubuntu 20.04 LTS`, the concepts will carry over to other systems but the example commands may not.

We also assume your client machine you use to connect to your node has a Linux-style command line. So any Linux or Mac machine is fine. If you are on Windows, consider using [Git Bash]( https://git-scm.com/downloads ), which is an alternative command-line interface that makes it possible to use common Linux commands like `ls`, `cd`, and `ssh` as if you are on a Linux-like system. If you don't choose to do this you will need a separate SSH client for example.

## Keep your client machine secure (essential)

If you run your Rocketpool node by physically logging into it (as in it has a keyboard and screen that you use to interact with it) then this section is not relevant for you.

Most Rocketpool node operators do not plug a physical keyboard into their node, but connect to it using the command-line through SSH. When you connect to a maching through SSH the machine you connect *to* is called the server, and the machine you are connecting *from* is the client.

If your client machine is compromised and you use it to log into your Rocketpool node, then most security measures will only protect you very little. If for example the laptop you use to connect to your staking machine has a keylogger, then any secret things you type are compromised.

Make sure that your client machine is as secure as it can be, some suggestions to do this include (but are definitely not limited to):

- Don't use your client machine for risky activities (think downloading files from dodgy websites)
- Keep your client machine updated with security patches
- Consider malware and antivirus protection measures
- Consider a dedicated machine as your 'crypto client'

There is no definitive guide to keeping your client machine secure, but being aware that it is a factor in your security is a good first step.

## Secure your SSH access (essential)

SSH (secure shell) is a common way to connect to a server using a command line interface like a Terminal (Linux/Mac) or command prompt (Windows). When you connect to a remote machine your terminal will change visibly. Instead of `you@yourcomputer$` you will see `serveruser@servername$`.

Regardless of whether your node is physically next to you or in a datacenter, it is likely that either 1) you access it through SSH or 2) SSH is enabled even if you do not use it.

SSH connections are based on secure cryptography, but as with any secure system, the real security comes from using it correctly. There are three main things to do for your SSH settings:

1. Disable password authentication and use SSH keys instead (essential)
2. Change the default port to something other than port `22/tcp` (nice to have)

### Use SSH keys (essential)

The default authentication mechanism of SSH is through passwords. When you try to log in your terminal will show something like:

```shell
you@yourcomputer$ ssh user@server.ip.address
user@servername's password:
```

You would then type your password in order to log in. The downside of password authentication is that it is susceptible to brute-force attacks.

Instead of authenticating using a password, you can instead use an SSH key. SSH keys work similarly to private keys in blockchain-world, they are far more secure than password-only authentication. If you have never heard of SSH keys, these are good pages to read before continuing:

1. [Github "About SSH" page]( https://docs.github.com/en/github/authenticating-to-github/about-ssh )
2. [Github "Generating a new SSH key and adding it to the ssh-agent"]( https://docs.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent )

#### Creating an SSH key

To get set up with SSH keys, we need to create an ssh key, and tell your local machine to use it.

To create a new key, on your client machine (so not logged into your node) type:

```shell
ssh-keygen -t ed25519 -C "your_email@example.com"
```

You will see the following:

```
Generating public/private ed25519 key pair.
Enter file in which to save the key (/Users/you/.ssh/id_ed1337):
```

You can press enter to continue, or type a custom path for your key. Note that this path should be absolute, so an anterlative would be: `/Users/you/.ssh/rocketpool_key`. Note that the `/Users/you/` will be different depending on your system and username.

When you press enter you will see:

```
Enter passphrase (empty for no passphrase):
```

This is the password **of the SSH key itself**. Whenever you load the key you will need it to decrypt the secure key. There is no way to recover this password if you lose it. It is recommended to set one, because otherwise anyone with the SSH key file will be able to use it.

You will then see:

```
Your public key has been saved in /Users/you/.ssh/id_ed1337.pub.
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

The most important line is the first, which tells us that the public key was saved at `Your public key has been saved in /Users/you/.ssh/id_ed1337.pub` (or whatever path you changed it to), make sure you remember that path or write it down since we need it later.

#### Adding an SSH key to your local machine

The SSH key is now a file on your hard-drive, a bit like a crypto wallet private key. In order to use it, we need to tell our terminal to load the key. The first step is to load the `ssh-agent`, which is a background program that manages SSH keys:

```shell
eval "$(ssh-agent -s)"
```

You can then load the SSH key:

```shell
ssh-add /Users/you/.ssh/id_ed1337
```

**NOTE:** the `ssh-agent` needs the private key, not the public key. So instead of using `id_ed1337.pub` we are adding `id_ed1337` (note the absence of the `.pub`).

You need to take the above steps every time you reboot your terminal or computer. To automate this process you may open your `.bashrc` file and add some helpers. To do this:

```shell
nano ~/.bashrc
```

This will open a command-line text editor. If this is your first time, don't be intimidated. The most important thing to note is that *your mouse will not work* in this screen.

At the top of the file add:

```shell

eval "$(ssh-agent -s)"
alias rpsshkey="/Users/you/.ssh/id_ed1337"
```

Then press `control+x`, then type "Y" and press enter.

Now type the following to reload your terminal settings:

```shell
source ~/.bashrc
```

This has created a new shortcut in your terminal, whenever you type `rpsshkey` it will ask for your SSH key password and load the key.

#### Adding the SSH key to your node

Once you have your SSH key offline, you can add it to your Rocketpool node either by:

1. Running `ssh-copy-id -i /Users/you/.ssh/id_ed1337 username@ip.of.rocketpool.node`
2. On your Rocketpool node opening `~/.ssh/authorized_keys` and adding the contents of `/Users/you/.ssh/id_ed1337.pub`, note that this has to be the `.pub` file

You should now be able to log into your Rocketpool node using `ssh user@ip.of.rocketpool.node` without being prompted for the password of your user.

### Disable passwords (essential)

To disable password authentication and use SSH keys instead, we need to change the SSH settings on your node. To do this we need to change the few lines in `/etc/ssh/sshd_config`.

Start by logging into your machine:

```shell
ssh user@your.node.ip.address
```

Then open the SSH settingsfile using:

```shell
sudo nano /etc/ssh/sshd_config
```

It will ask for your password, this is the password of the user on the Rocketpool node. Navigate the text file using the arrow keys on your keyboard.

1. Uncomment `#AuthorizedKeysFile` if it is commented (by removing the `#`)
2. Change `ChallengeResponseAuthentication yes` to `ChallengeResponseAuthentication no`
3. Change `PasswordAuthentication yes` to `PasswordAuthentication no`
4. Change `PermitRootLogin yes` to `PermitRootLogin prohibit-password`

When you are done, load the new setting with:

```shell
service sshd reload
```

If you know your way around a terminal, you can copy-paste the below to automate this process:

```shell
# enable ssh keys
sed -i 's/#\{0,1\}AuthorizedKeysFile/AuthorizedKeysFile/g' /etc/ssh/sshd_config
sed -i 's/ChallengeResponseAuthentication yes/ChallengeResponseAuthentication no/g' /etc/ssh/sshd_config

# Disable passworded login
sed -i 's/#\{0,1\}PasswordAuthentication yes/PasswordAuthentication no/g' /etc/ssh/sshd_config

# Disable root login with password
sed -i 's/#\{0,1\}PermitRootLogin yes/PermitRootLogin prohibit-password/g' /etc/ssh/sshd_config

# Reload SSH daemon
service sshd reload
```

### Change your SSH port (nice to have)

There are bots that scour the internet for machines with port `22/tcp` (the default SHH port) open so they can try to brute force it. Using SSH keys protects against most of these scenarios, but changing your SSH port can add an extra level of "invisibility" from threat actors.

To change your SSH port:

1. Check what ports on your system are in use with `sudo lsof -i -P -n | grep LISTEN`
2. Then in `/etc/ssh/sshd_config` change `Port 22` to `Port 1337` where `1337` is the port you want to use. This port may not be listed by `lsof` in the above command
3. Restart your SSH using `systemctl restart ssh`

You may also use the snippet:

```shell
SSH_PORT=1337
# Enable the port in the settings
sed -i "s/#\{0,1\}Port 22/Port $SSH_PORT/g" /etc/ssh/sshd_config
systemctl restart ssh
```

_You can then no longer connect to your node_ using the old `ssh username@ip.of.rocketpool.node` command, you will now need to use `ssh -p THE_PORT_YOU_CHOSE username@ip.of.rocketpool.node`.

## Enable automatic security updates (essential)

Ubuntu finds and patches security problems on an ongoing basis, it is important that you keep your system up to date. The easiest way to do this is to enable automatic updates.

To do this, install the auto-update package. On most systems this is already installed, so it should tell you "already installed":

```shell
sudo apt update
sudo apt install -y unattended-upgrades update-notifier-common
```

You can change the auto-update settings by editing the `/etc/apt/apt.conf.d/20auto-upgrades` using:

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

# This is the most important choice: do you want to auto-reboot. This should be fine since Rocketpool auto-starts on reboot, but if you are using a custom setup you may not want this
Unattended-Upgrade::Automatic-Reboot "true";
Unattended-Upgrade::Automatic-Reboot-Time "02:00";
```

When you are done adding your changes, use `control+x` to save and exit. After, make sure to load the new settings:

```shell
service unattended-upgrades restart
```

You may also run the following snippet:

```shell
# Automatic updates
AUTO_REBOOT_AT_UPGRADE=true

sudo apt install unattended-upgrades update-notifier-common -y
sudo echo -e "
APT::Periodic::Update-Package-Lists \"1\";
APT::Periodic::Unattended-Upgrade \"1\";
APT::Periodic::AutocleanInterval \"7\";
Unattended-Upgrade::Remove-Unused-Dependencies \"true\";
Unattended-Upgrade::Remove-New-Unused-Dependencies \"true\";
Unattended-Upgrade::Automatic-Reboot \"$AUTO_REBOOT_AT_UPGRADE\";
Unattended-Upgrade::Automatic-Reboot-Time \"02:00\";
" > /etc/apt/apt.conf.d/20auto-upgrades
service unattended-upgrades restart
```

## Enable a Firewall (essential)

A firewall filters network traffic to prevent undesirable connections. By default, there should be no problematic ports open on your machine, but it is for example possible that a vulnerability allows an attacker to send requests on a port that shouldn't be responding to anything.

Ubuntu comes with `ufw` installed by default, the **u**ncomplicated **f**ire **w**all is a convenient package to manage your firewall.

The snippet below adds the ports needed for operating a Rocketpool node. Pay special attention to the `SSH_PORT` variable, if you changed your default ssh port you will need to change this

```shell
SSH_PORT=22

# Disallow by default
sudo ufw default deny incoming comment 'deny all incoming traffic'

# Allow specific things
sudo ufw allow "$SSH_PORT/tcp" comment 'Allow ssh on custom port'

# Allow Rocketpool ports

# Go Ethereum: https://geth.ethereum.org/docs/interface/private-network#setting-up-networking
sudo ufw allow 30303/tcp comment 'Go Ethereum port, standarsized by Rockepool'
sudo ufw allow 30303/udp comment 'Go Ethereum port, standarsized by Rockepool'

# Rocketpool standerdizes the incoming ETH2 port to 9001
sudo ufw allow 9001/tcp comment 'Rocketpool default ETH2 port'
sudo ufw allow 9001/udp comment 'Rocketpool default ETH2 port'

sudo ufw enable

```

### Disable outgoing connections by default (nice to have)

If you want to be extra-restrictive, you can disable outgoing connections by default. This can however be problematic if you install a piece of software that uses a port you don't know of. Do this only if you know what you are doing.

::: warning NOTE
This section is for people who feel comfortable with the command-line and firewalls. It is not unlikely that these settings are too restrictive for many non-rocketpool applications.
:::

The following snippet will lock both in and outbound traffic to only the minimum requirements:

```shell
SSH_PORT=22

# Disallow by default
sudo ufw default deny outgoing comment 'deny all outgoing traffic'
sudo ufw default deny incoming comment 'deny all incoming traffic'

# This is default behavious, we're just adding it for verbosity
if [ "$SSH_PORT" != "22" ]; then
    sudo ufw deny 22/tcp comment 'Deny default SSH port'
fi

# Allow specific things
sudo ufw allow "$SSH_PORT/tcp" comment 'Allow ssh on custom port'
sudo ufw allow out 53 comment 'allow DNS calls out'
sudo ufw allow out 123 comment 'allow NTP out' # For timekeeping, see below
sudo ufw allow out http comment 'allow HTTP traffic out' # apt is likely to use these
sudo ufw allow out https comment 'allow HTTPS traffic out' # apt is likely to use these

sudo ufw enable
```

## Enable brute-force and DDoS protection (nice to have)

To protect your server from DDoS attacks and brute-force connection attempts, you can install `fail2ban`. This program will monitor incomming connections and block IP addressed that try to log in with faulty credentials repeatedly.

You can use the following snippet:

```shell
SSH_PORT=22

################################
# Autoban failed attempts & DDOS
# https://github.com/imthenachoman/How-To-Secure-A-Linux-Server#application-intrusion-detection-and-prevention-with-fail2ban
################################
sudo apt install -y fail2ban
sudo echo -e "
[sshd]
enabled = true
banaction = ufw
port = $SSH_PORT
filter = sshd
logpath = %(sshd_log)s
maxretry = 5
" > /etc/fail2ban/jail.d/ssh.local
```

Pay special attention to the `SSH_PORT` and `maxretry` settings.