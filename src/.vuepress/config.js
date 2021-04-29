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
    repo: 'rocket-pool/rocketpool.github.io',
    editLinks: true,
    docsDir: '',
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
        text: 'White Paper',
        link: '/whitepaper/',
      },
      {
        text: 'Documentation',
        link: '/documentation/'
      },
      {
        text: 'Guides',
        link: '/guides/'
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
          ]
        }
      ],
      '/whitepaper/': [
        {
          title: 'White Paper',
          sidebarDepth: 1,
          collapsable: false,
          children: [
            '',
          ]
        }
      ],
      '/documentation/': [
        {
          title: 'Stakers',
          sidebarDepth: 1,
          collapsable: false,
          children: [
              '',
              'glossary'
          ]
        },
        {
          title: 'Node operators',
          sidebarDepth: 1,
          collapsable: false,
          children: [
              'smart-node/smart-node',
              //'smart-node-advanced',
          ]
        },
        {
          title: 'Developers',
          sidebarDepth: 1,
          collapsable: false,
          children: [
              'smart-contracts/smart-contracts',
              'js-library',
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
              'platform',
              'node/hardware',
              'node/geth-pruning'
          ]
        }
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
    ]
  ]
}
