module.exports = {
  themeConfig: {
    logo: '/assets/logo.png',
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api' },
      { text: 'Contribution Guide', link: '/contribution-guide' },
      { text: 'Changelog', link: 'https://github.com/new-fantastic/vue-wp-json' },
      { text: 'GitHub', link: 'https://github.com/new-fantastic/vue-wp-json' },
      { text: 'Support us', link: 'https://github.com/new-fantastic/vue-wp-json' }
    ],
    sidebar: [
      {
        title: 'Guide',
        children: [
          ['/guide/introduction/', 'Introduction'],
          ['/guide/getting-started/', 'Getting Started'],
        ]
      },
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
      },
      {
        title: 'Contribution guide',
        children: [
          ['/contribution-guide/reporting-issues', 'Reporting Issues'],
          ['/contribution-guide/pull requests', 'Pull requests']
        ]
      },
      {
        title: 'Misc',
        children: [
          ['/', 'UrlCreator']
        ]
      }
    ]
  }
}