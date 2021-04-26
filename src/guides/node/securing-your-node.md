# :european_castle: Securing your node

This guide assumes you are on `Ubuntu 20.04 LTS`, the concepts will carry over to other systems but the example commands may not.

The goal of this guide is to walk you through steps you can take to secure your node against malicious actors. It will separate actions into these categories:

1. Essential
2. Nice to have

You should absolutely take all essential steps.

## Keep your client machine secure (essential)

Your client machine is the device from which you connect to your Rocketpool node. If you run your Rocketpool node by physically logging into it (as in it has a keyboard and screen that you use to interact with it) then this section is not relevant for you.

If your client machine is compromised and you use it to log into your Rocketpool node, then most security measures will only protect you very little. Make sure that your client machine is as secure as it can be, some suggestions to do this include (but are definitely not limited to):

- Don't use your client machine for risky activities (think downloading files from dodgy websites)
- Keep your client machine updated with security patches
- Consider malware and antivirus protection measures
- Consider a dedicated machine as your 'crypto client'

There is no definitive guide to keeping your client machine secure, but being aware that it is a factor in your security is a good first step.

## Secure your SSH access (essential)

Regardless of whether your node is physically next to you or in a datacenter, it is likely that either 1) you access it through SSH or 2) SSH is enabled even if you do not use it.

SSH connections are based on secure cryptography, but as with any secure system, the real security comes from using it correctly. There are three main things to do for your SSH settings:

1. Disable password authentication and use SSH keys instead
2. Change the default port to something other than port `22/tcp`

### Use SSH keys (essential)

The downside of password authentication is that it is susceptible to brute-force attacks. SSH keys work similarly to private keys in blockchain-world, they are far more secure. If you have never heard of SSH keys, these are good pages to read before continuing:

1. [Github "About SSH" page]( https://docs.github.com/en/github/authenticating-to-github/about-ssh )
2. [Github "Generating a new SSH key and adding it to the ssh-agent"]( https://docs.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent )

As a quick cheatsheet:

1. List your existing keys using `ls ~/.ssh` on your local system
2. Create a new key with `ssh-keygen -t ed25519 -C "your_email@example.com"`
3. Load an existing SSH key for usage with these two commands:
    - `eval "$(ssh-agent -s)"`
    - `ssh-add ~/.ssh/path_to_key` (not  the .pub file)
    - (optional): add a shortcut for your key in `~/.bashrc` using this syntax: `alias loadkey='ssh-add ~/.ssh/my_key'`

Once you have your SSH key offline, you can add it to your Rocketpool node either by:

1. Running `ssh-copy-id ~/.ssh/your_key.pub username@ip.of.rocketpool.node`
2. On your Rocketpool node opening `~/.ssh/authorized_keys` and adding the contents of `~/.ssh/your_key.pub`, note that this has to be the `.pub` file

You should now be able to log into your Rocketpool node using `ssh user@ip.of.rocketpool.node` without being prompted for the password of your user.

### Disable passwords (essential)

To disable password authentication and use SSH keys instead, change the following lines in `/etc/ssh/sshd_config`, for example using `sudo nano /etc/ssh/sshd_config`:

1. Uncomment `#AuthorizedKeysFile` if it is commented
2. Change `ChallengeResponseAuthentication yes` to `ChallengeResponseAuthentication no`
3. Change `PasswordAuthentication yes` to `PasswordAuthentication no`
4. Change `PermitRootLogin yes` to `PermitRootLogin without-password`

You may also run:

```shell
# enable ssh keys
sed -i 's/#\{0,1\}AuthorizedKeysFile/AuthorizedKeysFile/g' /etc/ssh/sshd_config
sed -i 's/ChallengeResponseAuthentication yes/ChallengeResponseAuthentication no/g' /etc/ssh/sshd_config

# Disable passworded login
sed -i 's/#\{0,1\}PasswordAuthentication yes/PasswordAuthentication no/g' /etc/ssh/sshd_config

# Disable root login with password
sed -i 's/#\{0,1\}PermitRootLogin yes/PermitRootLogin without-password/g' /etc/ssh/sshd_config

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

To do this:

1. Run `sudo apt update && sudo apt install unattended-upgrades update-notifier-common -y`, this will install the auto-update package, this should be in Ubuntu by default so we're just running it in case it was removed for some reason
2. Open `/etc/apt/apt.conf.d/20auto-upgrades`, for example with `sudo nano /etc/apt/apt.conf.d/20auto-upgrades` and add your settings, see the block below for a good starting point
3. Run `service unattended-upgrades restart`

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

You may also run the following snippet:

```shell
# Automatic updates
AUTO_REBOOT_AT_UPGRADE=true

apt install unattended-upgrades update-notifier-common -y
echo -e "
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
sudo ufw allow 30303:30305/tcp comment 'Go Ethereum'
sudo ufw allow 30303:30305/udp comment 'Go Ethereum'

# Rocketpool standerdizes the incoming ETH2 port to 9001
sudo ufw allow 9001/tcp comment 'Rocketpool default port'
sudo ufw allow 9001/udp comment 'Rocketpool default port'

sudo ufw enable

```

### Disable outgoing connections by default (nice to have)

If you want to be extra-restrictive, you can disable outgoing connections by default. This can however be problematic if you install a piece of software that uses a port you don't know of. Do this only if you know what you are doing.

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

To protect your server from DDoS attacks and brute-force connection attempts, you can install `fail2ban` using the following snippet:

```shell
SSH_PORT=22

################################
# Autoban failed attempts & DDOS
# https://github.com/imthenachoman/How-To-Secure-A-Linux-Server#application-intrusion-detection-and-prevention-with-fail2ban
################################
sudo apt install -y fail2ban
echo -e "
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