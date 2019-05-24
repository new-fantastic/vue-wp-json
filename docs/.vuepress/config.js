module.exports = {
  themeConfig: {
    logo: 'https://cdn.newfantastic.com/images/vue-wp-json-logo.png',
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
          children: [
            ['/guide/introduction/why-you-would-use-this-module', 'Why would you use this module?'],
            ['/guide/introduction/features', 'Features'],
            ['/guide/introduction/schema', 'Schema'],
            ['/guide/introduction/to-do', 'To Do'],
          ]
        },
        {
          title: 'Getting Started',
          children: [
            ['/guide/getting-started/installation', 'Installation'],
            ['/guide/getting-started/usage', 'Usage'],
          ]
        },
        {
          title: 'Misc',
          children: [
            ['/', 'UrlCreator']
          ]
        }
      ],
      '/api/' : [
        {
          title: 'API',
          children: [
            ['/api/store/', 'Vuex Store'],
            ['/api/wp/', '$wp']
          ]
        },
        {
          title: 'Extensions',
          children: [
            ['/', 'VueWpJson Lifecycle'],
            ['/', 'Validators'],
            ['/', 'TheRoot Interpreter'],
            ['/', 'Section Interpreter'],
            ['/', 'API Endpoints filter'],
            ['/', 'Custom Page template'],
            ['/', 'Custom Post template'],
            ['/', 'Custom Section template'],
            ['/', 'Custom Column template'],
            ['/', 'Custom Blocks']
          ]
        }
      ],
      '/contribution-guide/' : [
        {
          title: 'Contribution guide',
          children: [
            ['/contribution-guide/reporting-issues/', 'Reporting Issues'],
            ['/contribution-guide/pull-requests/', 'Pull requests']
          ]
        }
      ]
    }
  }
}