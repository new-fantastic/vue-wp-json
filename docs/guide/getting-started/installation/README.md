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
import store from './store'
import router from './router'
import Wordpress from '@vue-wordpress/core'
 
Vue.use(Wordpress, {
  url: 'https://your-wordpress-url.com/',
  lang: 'en',
  menus: [
    "main-menu",
    "footer-menu"
  ],
  store,
  router
})
```

### config.url 
Rest API URL

### config.lang
language of the website (two letter label)

### config.menus
There are a few possibilities with menu.
However, you must remember to install [WP-REST-API V2 Menus](https://wordpress.org/plugins/wp-rest-api-v2-menus/) because by default, menus are not accessible on API.

- If you want to fetch each wordpress' menu.   
You do not even need to put **menus** key inside config object. It is default setting.

- If you want fetch only certain menus. You should provide slugs as value. It can be string for one menu, and array of strings for few arrays.
```js
menus: 'my-slug'
// OR
menus: [
  'my-slug',
  'other-menu',
  'diffrent'
]
```

- If you want to disable fetching menus (one request less). You should set **menus** to false
```js
menus: false
```

### Store and router
Store is an instance of Vuex Store and router is an instance 

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
      url: 'https://wp.mysite.com/',
      lang: 'en',
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
  url: 'https://wp.mysite.com/',
  lang: 'en',
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

