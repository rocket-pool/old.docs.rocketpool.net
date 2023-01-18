const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Rocket Pool',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#e57147' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * ref：https://v1.vuepress.vuejs.org/config/#theme
   */
  theme: 'default-prefers-color-scheme',

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: 'rocket-pool/docs.rocketpool.net',
    editLinks: true,
    docsDir: 'src',
    docsBranch: 'main',
    editLinkText: '',
    lastUpdated: false,
    logo: '/images/logo-small.png',
    smoothScroll: true,
    nav: [
      {
        text: 'Overview',
        link: '/overview/',
      },
      {
        text: 'Guides',
        link: '/guides/'
      },
      {
        text: 'For Developers',
        link: '/developers/'
      },
      {
        text: 'Website',
        link: 'https://www.rocketpool.net'
      },
      {
        text: 'Discord',
        link: 'https://discord.com/invite/rocketpool'
      }
    ],
    sidebar: {
      '/overview/': [
        {
          title: 'Overview',
          collapsable: false,
          children: [
            '',
            'explainer-series',
            'faq',
            'contracts-integrations',
            'glossary',
          ]
        }
      ],
      '/guides/': [
        {
          title: 'Guides',
          sidebarDepth: 2,
          collapsable: false,
          children: [
            '',
            {
              title: 'Staking with Rocket Pool',
              sidebarDepth: 1,
              collapsable: true,
              children: [
                'staking/overview',
                'staking/via-rp',
                'staking/via-l1',
                'staking/via-l2'
              ]
            },
            {
              title: 'Running a Rocket Pool Node',
              sidebarDepth: 2,
              collapsable: true,
              children: [
                'node/responsibilities',
                'node/platform',
                {
                  title: 'Preparing a Local Node',
                  sidebarDepth: 2,
                  collapsable: true,
                  children: [
                    'node/local/hardware',
                    'node/local/prepare-pc',
                    'node/local/prepare-mac',
                    'node/local/prepare-pi',
                    'node/ssh'
                  ]
                },
                {
                  title: 'Preparing a Cloud (VPS) Node',
                  sidebarDepth: 2,
                  collapsable: true,
                  children: [
                    'node/vps/providers',
                    'node/vps/os'
                  ]
                },
                {
                  title: 'Installing Rocket Pool',
                  sidebarDepth: 2,
                  collapsable: true,
                  children: [
                    'node/eth-clients',
                    'node/install-modes',
                    'node/docker',
                    'node/native',
                  ]
                },
                {
                  title: 'Configuring Rocket Pool',
                  sidebarDepth: 2,
                  collapsable: true,
                  children: [
                    'node/config-docker',
                    'node/config-native',
                    'node/advanced-config',
                  ]
                },
                'node/securing-your-node',
                'node/starting-rp',
                'node/recovering-rp',
                'node/cli-intro',
                'node/prepare-node',
                'node/fallback',
                'node/fee-distrib-sp',
                'node/mev',
                'node/create-validator',
                {
                  title: 'Monitoring and Maintenance',
                  sidebarDepth: 2,
                  collapsable: true,
                  children: [
                    'node/performance',
                    'node/grafana',
                    'node/updates',
                    'node/backups',
                    'node/pruning',
                    'node/change-clients'
                  ]
                },
                'node/rewards',
                'node/troubleshooting',
                'node/faq'
              ]
            },
            {
              title: 'Redstone and The Merge',
              sidebarDepth: 2,
              collapsable: true,
              children: [
                'redstone/whats-new',
                'redstone/docker-migration',
                'redstone/hybrid-migration',
                'redstone/native-migration',
              ]
            },
            {
              title: 'Testing Rocket Pool with the Prater Test Network',
              sidebarDepth: 2,
              collapsable: true,
              children: [
                'testnet/overview',
                'testnet/mainnet',
              ]
            },
            {
              title: 'Running an Oracle DAO Node',
              sidebarDepth: 2,
              collapsable: true,
              children: [
                'odao/overview',
                'odao/setup',
                'odao/testing',
                'odao/monitoring',
                'odao/proposals'
              ]
            },
            {
              title: 'Legacy Guides',
              sidebarDepth: 2,
              collapsable: true,
              children: [
                'legacy/v1.3-update',
                'legacy/upgrading'
              ]
            }
          ]
        }
      ],
      '/developers/': [
        {
          title: 'For Developers',
          sidebarDepth: 2,
          collapsable: false,
          children: [
            '',
            {
              title: 'Integration Usage and Examples',
              sidebarDepth: 2,
              collapsable: true,
              children: [
                'usage/contracts/contracts',
                'usage/go/go',
                'usage/js/js',
              ]
            },
            {
              title: 'API Reference',
              sidebarDepth: 2,
              collapsable: true,
              children: [
                'api/contracts',
                {
                  title: 'Go Bindings',
                  sidebarDepth: 2,
                  collapsable: true,
                  children: [
                    'api/go/auction',
                    'api/go/contracts',
                    {
                      title: 'dao',
                      children: [
                        'api/go/dao',
                        'api/go/dao-protocol',
                        'api/go/dao-trustednode',

                      ]
                    },
                    'api/go/deposit',
                    'api/go/minipool',
                    'api/go/network',
                    'api/go/node',
                    'api/go/rewards',
                    'api/go/rocketpool',
                    {
                      title: 'settings',
                      sidebarDepth: 2,
                      collapsable: true,
                      children: [
                        'api/go/settings-protocol',
                        'api/go/settings-trustednode',
                      ]
                    },
                    'api/go/storage',
                    'api/go/tokens',
                    'api/go/types',
                    {
                      title: 'utils',
                      children: [
                        'api/go/utils',
                        'api/go/utils-eth',
                        'api/go/utils-strings',
                      ]
                    }
                  ]
                },
                {
                  title: 'JS Reference',
                  sidebarDepth: 2,
                  collapsable: true,
                  children: [
                    {
                      title: 'Auction',
                      children: [
                        'api/js/Auction',
                      ]
                    },
                    {
                      title: 'Contracts',
                      children: [
                        'api/js/Contracts',
                      ]
                    },
                    {
                      title: 'DAO',
                      children: [
                        'api/js/DAONodeTrusted',
                        'api/js/DAONodeTrustedActions',
                        'api/js/DAONodeTrustedProposals',
                        'api/js/DAONodeTrustedSettings',
                        'api/js/DAOProposal',
                      ]
                    },
                    {
                      title: 'Deposit',
                      children: [
                        'api/js/Deposit',
                      ]
                    },
                    {
                      title: 'Minipool',
                      children: [
                        'api/js/Minipool',
                        'api/js/MinipoolContract',
                      ]
                    },
                    {
                      title: 'Network',
                      children: [
                        'api/js/Network',
                      ]
                    },
                    {
                      title: 'Node',
                      children: [
                        'api/js/Node',
                      ]
                    },
                    {
                      title: 'Rewards',
                      children: [
                        'api/js/Rewards',
                        'api/js/Pool',
                      ]
                    },
                    {
                      title: 'Settings',
                      children: [
                        'api/js/AuctionSettings',
                        'api/js/DepositSettings',
                        'api/js/MinipoolSettings',
                        'api/js/NetworkSettings',
                        'api/js/NodeSettings',
                      ]
                    },
                    {
                      title: 'Tokens',
                      children: [
                        'api/js/ERC20',
                        'api/js/LegacyRPL',
                        'api/js/RETH',
                        'api/js/RPL',
                      ]
                    },
                    {
                      title: 'Vault',
                      children: [
                        'api/js/Vault',
                      ]
                    },
                    {
                      title: 'Rocketpool',
                      children: [
                        'api/js/RocketPool',
                      ]
                    },
                  ]
                },
                {
                    title: 'Subgraph',
                    sidebarDepth: 3,
                    collapsable: true,
                    children: [
                        'api/subgraph/SubgraphData',
                        'api/subgraph/Entities',
                        'api/subgraph/Queries',
                        'api/subgraph/AdditionalResources',
                    ]
                },
              ]
            },
          ]
        },
      ],
    }
  },

  // Import markdown plugins
  markdown: {
    extendMarkdown: md => {
      // Import include plugin, ref: https://www.npmjs.com/package/markdown-it-include
      md.use(require('markdown-it-include'), {
        root: `${__dirname}/../`,
      }),
        md.use(require('markdown-it-html5-embed'), {
          html5embed: {
            useImageSyntax: true,
            useLinkSyntax: false
          }
        })
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    ['vuepress-plugin-zooming', {
      options: {
        bgColor: 'black',
        zIndex: 10000,
      }
    }
    ],
    ['vuepress-plugin-code-copy', {
      color: '#ffbca5',
      staticIcon: true,
      backgroundColor: '#ffbca5'
    }
    ],
    'vuepress-plugin-element-tabs'
  ]
}
