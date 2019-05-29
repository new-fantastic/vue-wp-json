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
  router // Injecting VueX Store and Router is obligatory
})
```

That is all. Now you can use VueWpJson module!

<br>

## Nuxt.js

<br>

Lorem ipsum

<br>

## Vue Storefront

<br>

Lorem ipsum

<br>

