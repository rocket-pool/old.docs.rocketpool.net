
# Getting Started

<br>

## OS & Hardware Requirements

The smart node client is supported on Linux, MacOS and Windows. **Note that a smart node cannot be run locally on Windows at this stage; the Windows client can only be used to manage a remote server**.

The smart node service is supported on AMD64 architecture and all Unix platforms, with automatic OS dependency installation for Ubuntu, Debian, CentOS and Fedora. **OS dependencies (docker engine and docker-compose) must be installed manually on all other Unix platforms.**

Support for additional architectures (e.g. ARM) and operating systems will be added incrementally, after successful testing of the existing version.

The Smart Node service requires at least 16GB of memory and 200GB of (SSD) hard disk space in order to run. Note that a node operator must have **root** access to their node in order to install and run the smart node service.

<br>

## Installation

Firstly, install the smart node client locally. For Linux & MacOS, run either the cURL or wget command depending on which utilities are installed on your system. You can check with curl --version and wget --version respectively.

#### Linux (64 bit)

##### With cURL:

``` shell 
curl -L https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-cli-linux-amd64 --create-dirs -o ~/bin/rocketpool && chmod +x ~/bin/rocketpool
```

##### With wget:

``` shell 
mkdir -p ~/bin && wget https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-cli-linux-amd64 -O ~/bin/rocketpool && chmod +x ~/bin/rocketpool
```


