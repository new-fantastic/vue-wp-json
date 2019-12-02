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
      { text: 'GitHub', link: 'https://github.com/vue-wordpress/core' },
      { text: 'Support us', link: 'https://github.com/vue-wordpress/core' }
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
        }
      ],
      '/api/' : [
        {
          title: 'Core',
          collapsable: false,
          children: [
            ['/api/store/', 'Vuex Store'],
            ['/api/wpData/', 'wpData'],
            ['/api/wordpress/', 'wordpress']
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