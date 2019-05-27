# Installation

<br>

## Vue.js

<br>

Go to your app's main directory and run:
```
npm install vue-wp-json
```
or
```
yarn add vue-wp-json
```

Go to your app's main.js/main.ts file, import the module catalog and register it:
```js
import Vue from 'vue'
import vueWpJson from 'vue-wp-json'
 
Vue.use(vueWpJson, {
  config: {
    url: 'your-wordpress-url.com/',
    lang: 'en', // Your site's default language.   
    // It'll be added to html lang attribute.
    menus: [
      "first-menu-slug",
      "second-menu-slug"
      // There provide your menus' slug, if you have only one menu,   
      // provide it as a string. If you do not have any menu,   
      // set to false or just delete this key
    ]
  },
  store,
  router // Injecting VueX Store and Router is obligatory
})
```

That is all. Now you can use VueWpJson module!

<br>

## Nuxt.js

<br>

Go to your app's main directory and run:
```
npm install nuxt-wp-json
```
or
```
yarn add nuxt-wp-json
```

Create Vuex Store in your application if it does not exist. You can do it by creating **index.js** file in **store directory** and put there content like:
```js
export const state = () => ({

})

export const mutations = {

}

export const actions = {}
```

Open **nuxt.config.js** and add **nuxt-wp-json** in modules. You also have to provide config. There are 2 possible approach.   
First one:
```js
modules: [
  [
    'nuxt-wp-json',
    {
      config: {
        url: 'https://wp.mysite.com/',
        lang: 'en'
      },
      store: 'manual',
      router: 'manual'
    }
  ]
]
```

Second one:
```js
modules: [
  'nuxt-wp-json'
],
wpJson: {
  config: {
    url: 'https://wp.mysite.com/',
    lang: 'en'
  },
  store: 'manual',
  router: 'manual'
}
```

As we cannot access Router and Store from nuxt.config.js we have to set it as 'manual'. Our module will do the job an inject them other way.

Inside **build** in **transpile** we have to tell Nuxt to transpile Vue Wp Json core module.
```js
build: {
  transpile: ['vue-wp-json']
}
```

If you use any extension you probably need to add it to transpile array, e.g:
```js
build: {
  transpile: ['vue-wp-json', 'vue-wp-json-acf']
}
```

That is all. Now you can use NuxtWpJson module!
<br>

## Vue Storefront

<br>

Lorem ipsum

<br>

