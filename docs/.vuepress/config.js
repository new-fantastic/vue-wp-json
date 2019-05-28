module.exports = {
  title: 'Vue Wordpress',
  description: '💫 Wordpress module for Vue.js 💫',
  ga: 'UA-140780613-1',
  themeConfig: {
    // logo: 'https://cdn.newfantastic.com/images/vue-wp-json-logo.png',
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: 'Contribution Guide', link: '/contribution-guide/' },
      { text: 'GitHub', link: 'https://github.com/new-fantastic/vue-wp-json' },
      { text: 'Support us', link: 'https://github.com/new-fantastic/vue-wp-json' }
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'Introduction',
          collapsable: false,
          children: [
            ['/guide/introduction/why/', 'Why would you use this module?'],
            ['/guide/introduction/features/', 'Features'],
            ['/guide/introduction/schema/', 'Schema'],
            ['/guide/introduction/to-do/', 'To Do'],
          ]
        },
        {
          title: 'Getting Started',
          collapsable: false,
          children: [
            ['/guide/getting-started/installation/', 'Installation'],
            ['/guide/getting-started/usage/', 'Usage'],
            ['/guide/getting-started/pwa/', 'PWA'],
          ]
        },
        {
          title: 'Extending the Module',
          collapsable: false,
          children: [
            ['/guide/extending-the-module/essentials/', 'Essentials'],
            ['/guide/extending-the-module/validators/', 'Validators'],
            ['/guide/extending-the-module/interpreters/', 'Interpreters'],
            ['/guide/extending-the-module/modifying-endpoints/', 'Modifying endpoints'],
            ['/guide/extending-the-module/custom-layouts/', 'Custom layouts'],
            ['/guide/extending-the-module/custom-blocks/', 'Custom blocks'],
          ]
        },
        // {
        //   title: 'Frequent issues',
        //   children: [
        //     ['#', 'Problems with Installation'],
        //     ['#', 'Problems with Extensions'],
        //   ]
        // },
      ],
      '/api/' : [
        {
          title: 'Core',
          collapsable: false,
          children: [
            ['#', 'Lifecycle'],
            ['#1', 'Validators'],
            ['#2', 'Interpreters'],
            ['#11', 'Vuex Store'],
            ['#12', '$wp'],
          ]
        },
        {
          title: 'Wordpress REST API',
          collapsable: false,
          children: [
            ['#', 'API Endpoint Filter'],
            ['#5', 'UrlCreator'],
          ]
        },
        {
          title: 'Templates',
          collapsable: false,
          children: [
            ['#6', 'Custom Page Template'],
            ['#7', 'Custom Post Template'],
            ['#8', 'Custom Section Template'],
            ['#9', 'Custom Column Template'],
            ['#10', 'Custom Blocks'],
          ]
        }
      ],
      '/contribution-guide/' : [
        {
          title: 'Contribution guide',
          collapsable: false,
          children: [
            ['/contribution-guide/reporting-issues/', 'Reporting Issues'],
            ['/contribution-guide/pull-requests/', 'Pull requests']
          ]
        }
      ]
    }
  }
}