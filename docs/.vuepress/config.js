module.exports = {
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/' },
      { text: 'Config Reference', link: '/' },
      { text: 'Changelog', link: 'https://github.com/new-fantastic/vue-wp-json' },
      { text: 'GitHub', link: 'https://github.com/new-fantastic/vue-wp-json' },
      { text: 'Support us', link: 'https://github.com/new-fantastic/vue-wp-json' }
    ],
    sidebar: [
      {
        title: 'Intruduction',
        collapsable: false,
        children: [
          ['/', 'What is it?'],
          ['/', 'How it works'],
          ['/', 'Features'],
          ['/', 'Schema'],
          ['/', 'Todo']
        ]
      },
      {
        title: 'Contribution guide',
        children: [
          ['/', 'Reporting Issues'],
          ['/', 'Pull requests']
        ]
      },
      {
        title: 'Getting started',
        children: [
          ['/', 'Installation'],
          ['/', 'Configuration'],
          ['/', 'Features'],
          ['/', 'Todo']
        ]
      },
      {
        title: 'Structures',
        children: [
          ['/', 'Vuex Store'],
          ['/structure/wp/', '$wp']
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
    ]
  }
}