## Security considerations

This section is intended for more advanced users. If you misconfigure the things described in this section you could prevent your node from syncing or prevent access altogether.

### Server hardening

Especially if your device is directly connected to the internet (if it is in a datacenter for example) it makes sense to implement some best practices such as:

- Only allowing SSH access through key files as opposed to password
- Changing your SSH port to something non-standard
- Configuring automatic security updates
- Enabling a firewall

If you want to explore more advanced options, see [this popular open-source checklist]( https://github.com/imthenachoman/How-To-Secure-A-Linux-Server). Note that these advanced settings are beyond what most people need.

### General firewall ports

You might decide to set your firewall to "deny by default" and open up specific ports only. If you do so, consider the following ports carefully:

- SSH port: 22/tcp in/out, unless you actively changed it
- DNS port: 53 out, used by any process that queries domain names (for example update servers used by apt in Ubuntu)
- NTP port: 123 out, used by your time server which is essential for syncing accurately
- HTTP(s) ports: 80 out and 443 out, used by update processes and any others that contact webservers

### Rocketpool firewall ports

The different ETH clients use different ports for peer discovery, but the docker containers used by Rocket Pool standardise this port to `9001/udp` and `9001/tcp`.

If you are running any clients externally, these are their ports:

- [ Go Ethereum (GETH) ]( https://geth.ethereum.org/docs/interface/private-network#setting-up-networking ):  3030-30305/udp
- [ Prysm ]( https://docs.prylabs.network/docs/prysm-usage/p2p-host-ip/#incoming-p2p-connection-prerequisites ): 13000/tcp and 13000/udp
- [ Lighthouse ]( https://lighthouse-book.sigmaprime.io/advanced_networking.html ): 9000/tcp and 9000/udp

Rocketpool itself uses no special ports.
