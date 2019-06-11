# Installation

<br>

## Vue.js

<br>

Go to your app's main directory and run:
```
npm install @vue-wordpress/core
```
or
```
yarn add @vue-wordpress/core
```

Go to your app's main.js/main.ts file, import the module catalog and register it:

```javascript
import Vue from 'vue'
import Wordpress from '@vue-wordpress/core'
 
Vue.use(Wordpress, {
  config: {
    url: 'https://your-wordpress-url.com/',
    lang: 'en', // Your site's default language – It will be added to the html lang attribute.
    menus: [
      "main-menu",
      "footer-menu"
      // Here you can provide your menus' slugs
      // If you have only one menu, simply addi it  as a string.
      // If you do not have any menus, set this value to false or just delete this key
    ]
  },
  store,
  router
})
```

That is all. Now you can use VueWpJson module!

<br>

## Nuxt.js

<br>

Go to your app's main directory and run:
```
npm install @vue-wordpress/nuxt
```
or
```
yarn add @vue-wordpress/nuxt
```

Create Vuex Store in your application if it does not exist. You can do it by creating **index.js** file in **store directory** and put there content like:
```js
export const state = () => ({

})

export const mutations = {

}

export const actions = {}
```

Open **nuxt.config.js** and add **@vue-wordpress/nuxt** in modules. You also have to provide config. There are 2 possible approach.   
First one:
```js
modules: [
  [
    '@vue-wordpress/nuxt',
    {
      config: {
        url: 'https://wp.mysite.com/',
        lang: 'en'
      },
      store: true,
      router: true
    }
  ]
]
```

Second one:
```js
modules: [
  '@vue-wordpress/nuxt'
],
wpJson: {
  config: {
    url: 'https://wp.mysite.com/',
    lang: 'en'
  },
  store: true,
  router: true
}
```

As we cannot access Router and Store from nuxt.config.js we have to set it as **true**. Our module will do the job an inject them other way.

Inside **build** in **transpile** we have to tell Nuxt to transpile **Vue Wp Json core module**.
```js
build: {
  transpile: ['@vue-wordpress/core']
}
```

If you use any extension you probably need to add it to transpile array, e.g:
```js
build: {
  transpile: ['@vue-wordpress/core', '@vue-wordpress/acf']
}
```

That is all. Now you can use NuxtWpJson module!
<br>

## Vue Storefront

<br>

Go to your theme's main directory and run:
```
npm install @vue-wordpress/core
```
or
```
yarn add @vue-wordpress/core
```

Then open modules directory and type:
```
git clone git@github.com:new-fantastic/vsf-wp-json.git;
```

After that, add module to modules/index.js:
```ts
import { WpJson } from './vsf-wp-rest-api'

//...

export const registerModules: VueStorefrontModule[] = [
  // ...
    WpJson,
  // ...
]
```

Open config file, then at the end of main object add:
```json
"wordpressCms": {
  "url": "https://wp.myapi.com/",
  "lang": "en",
  "menus": ["for-buyers", "footer"]
}
```

If you want to register plugin, you can do it by adding in **wordpressCms** - plugins, e.g.:
```json
"wordpressCms": {
  "url": "https://wp.myapi.com/",
  "lang": "en",
  "menus": ["for-buyers", "footer"],
  "plugins": "acf"
}
```

Plugin should be inside node_modules/@vue-wordpress. It also must have "vue-wp-json-" prefix.

<br>

