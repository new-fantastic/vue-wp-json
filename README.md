# Vue Wordpress Core Module

<br>

Vue.js module for WordPress, PWA ready, with full support for Vuex Store, Vue Router, Vue SSR and Nuxt.js [https://vuewordpress.io/](https://vuewordpress.io/)

<br>

- [Installation](#installation)

  - [Vue.js](#a-vuejs)
  - [Nuxt.js](#b-nuxtjs)
  - [Vue Storefront (Coming soon)](#c-vue-storefront)

- [Usage](#usage)

  - [Pages](#pages)
  - [Posts](#posts)
  - [Media](#media)
  - [Menus](#menus)

- [PRO Version (Coming soon)](https://vuejs.shop/modules/vue-wp-json-pro)

  - [Custom Post Types](https://vuejs.shop/modules/vue-wp-json-pro/docs/#custom-post-types)
  - [Post Statuses](https://vuejs.shop/modules/vue-wp-json-pro/docs/#post-statuses)
  - [Authentication](https://vuejs.shop/modules/vue-wp-json-pro/docs/#authentication)
  - [Users](https://vuejs.shop/modules/vue-wp-json-pro/docs/#users)
  - [Comments](https://vuejs.shop/modules/vue-wp-json-pro/docs/#comments)
  - [Categories](https://vuejs.shop/modules/vue-wp-json-pro/docs/#categories)
  - [Tags](https://vuejs.shop/modules/vue-wp-json-pro/docs/#tags)
  - [Taxonomies](https://vuejs.shop/modules/vue-wp-json-pro/docs/#taxonomies)

- [External Modules (Coming soon)](#additional-modules)

  - [Free Extensions](#free-extensions)

    - [Yoast SEO Extension (Coming soon)](#yoast-extension)
    - [qTranslate Extension (Coming soon)](https://vuejs.shop/modules/vue-wp-json-qtranslate)

  - [PRO Extensions](#pro-extensions)

    - [Advanced Custom Fields Extension (Coming soon)](https://vuejs.shop/modules/vue-wp-json-acf)
    - [DIVI Page Builder Extension (planned for Fall 2019)](https://vuejs.shop/modules/vue-wp-json-divi)

<br>

## Installation



<br>



### Vue.js



<br>



#### 1. Go to your app's main directory and run:

```bash
npm install @vue-wordpress/core
```

or

```bash

yarn add @vue-wordpress/core
```

#### 2. Go to your app's `main.js` / `main.ts` file, import the module catalog and register it:

```javascript

import  Vue  from  'vue'

import  Wordpress  from  '@vue-wordpress/core'

Vue.use(Wordpress, {
  config: {
    url:  'https://your-wordpress-url.com/',
    lang:  'en' // Your site's default language – It will be added to the html lang attribute.
  },
  store,
  router
  // Injecting VueX Store and Router is obligatory
})
```



<br>



#### And that is it – you are ready to go!



<br>



### Nuxt.js

<br>  

If you want to use this module with **Nuxt.js**, we have created a dedicated package available here: <a href="https://github.com/vue-wordpress/nuxt">`@vue-wordpress/nuxt`</a>



<br> 

### Vue Storefront



<br>  

If you want to use this module with **Vue Storefront**, we have created a dedicated package available here:
 <a href="https://github.com/vue-wordpress/vsf">`@vue-wordpress/vsf`</a>
