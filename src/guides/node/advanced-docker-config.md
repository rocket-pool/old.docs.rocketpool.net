# Advanced Docker Settings

The Rocketpool smartnode stack runs on Docker and pulls it's configuration from `~/.rocketpool/config.yml` by default. This file contains the settings that the smartnode when the stack is started using `rocketpool service start`.

There are a number of lines in this configuration file under the `smartnode:` section that you can edit to customize the behaviour of the smartnode stack.

This guide assumed you are accessing your node through the command line.

::: tip NOTE
This is advanced material. The `~/.rocketpool/config.yml` file is central to the operation of the smartnode stack and misconfiguring it can result in downtime.
:::

## Backing up your config file before editing

Since the config file is instrumental to the operation of the smartnode stack, it makes sense to back up the current state of the file before changing anything. You can do this using the following command:

```shell
cp ~/.rocketpool/config.yml  ~/.rocketpool/config.yml.bak
```

This will duplicate the old configuration file to `~/.rocketpool/config.yml.bak`, you can restore your old settings by running:

```shell
cp ~/.rocketpool/config.yml.bak  ~/.rocketpool/config.yml
```

## Editing gas settings

The following settings control the way the smartnode handles gas settings:

### rplClaimGasThreshold

When your node is eligible for RPL reward payout the smartnode stack will attempt to claim your rewards every 5 minutes. If the current network basefee is above the value of `rplClaimGasThreshold` the smartnode will not trigger a transaction and will try again in 5 minutes.

Note that this value is also used for calling `.stake()` after your minipool has received ETH from the deposit pool. For safety reasons the minipool will ignore this setting when calling `.stake()` if the network deadline for you to start staking is getting close.

### maxFee

This setting overrides the default behaviour of the smartnode, which is to check the current gas price with the Etherscan API. If this setting has any value other than 0 the smartnode will be forced to use this `maxFee` setting.

Note that if you set `maxFee` higher than `rplClaimGasThreshold` the smartnode will **never** be able to claim RPL automatically since the logic will check _"can I run this transaction under `rplClaimGasThreshold`?"_ and if `maxFee` is above that then the conclusion of that logic is _"I cannot guarantee that I will pay below `rplClaimGasThreshold` so I will not trigger a transaction"_.

### maxPriorityFee

This setting controls the priority fee the smartnode will give your transactions.