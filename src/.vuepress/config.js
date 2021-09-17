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
                    'staking/staking'
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
                          'node/hybrid',
                          'node/native',
                      ]
                    },
                    'node/securing-your-node',
                    'node/starting-rp',
                    'node/cli-intro',
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
                          'node/geth-pruning'
                      ]
                    },
                    'node/rewards',
                    'node/troubleshooting',
                    'node/faq'
                ]
              },
              {
                title: 'Testing Rocket Pool with the Prater Test Network',
                sidebarDepth: 2,
                collapsable: true,
                children: [
                  'testnet/overview',
                  'testnet/upgrading',
                ]
              },
              'node/mainnet',
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
                      'api/go/dao',
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
                      'api/go/utils',
                    ]
                  },
                  'api/js'
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
      md.use( require( 'markdown-it-include' ), {
        root: `${ __dirname }/../`,
      } )
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    ['vuepress-plugin-code-copy', {
        color: '#ffbca5',
        staticIcon: true,
        backgroundColor: '#ffbca5'
        }
    ],
    'vuepress-plugin-element-tabs'
  ]
}
