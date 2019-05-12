# vsf-wp-rest-api

Wordpress REST API module for Vue Storefront providing an out-of-box routing and data handling.

## Installation

### 1. Download the module

#### a. Via `git`

Go to your `vue-storefront`'s `modules` catalog and clone the repository with the module.

```bash
cd ../vue-storefront/src/modules;
git clone https://github.com/new-fantastic/vsf-wp-rest-api.git;
```

#### b. Via `npm` / `yarn`

Go to your theme's catalog and install the module from `npm`.

```bash
cd ../vue-storefront/src/themes/your-theme;
yarn add vsf-wp-rest-api;
```

### 2. Import and register the module inside `vue-storefront/src/modules/index.ts`


```js
import { WpRestApi } from './vsf-wp-rest-api' // if installed via Git
// or
import { WpRestApi } from 'vsf-wp-rest-api'  // if installed via NPM
...
export const registerModules: VueStorefrontModule[] = [
...
WpRestApi
...
]
```

## How to use?
### Installation
In your main.js/ts file import plugin and register it as plugin.
```
import Vue from 'vue'
import vueWpJson from 'vue-wp-json'

Vue.use(vueWpJson, {
  config: {
    url: 'There write your wordpress url, e.g. http://abc.com/',
    pages: {
      home: "home-page"
      // Here put pairs like - routeName: "slugInApi"
      // Then plugin will download page structure from /wp-json/wp/v2/pages?slug=home-page when current route is called 'home'
    },
    menus: ["first-menu-slug", "second-menu-slug"],
    // There provide your menus' slug, if you have only one menu, provide it as string. If you do not have any menu, set to false or just delete this key
    store,
    router // Injecting VueX Store and Router is obligatory
  }
})
```

If you would like to set proper meta tags automaticly for page/post pages. All you need is install vue-meta-info and register it as plugin. E.g. in your main.js/ts
```
import Vue from 'vue'
import MetaInfo from 'vue-meta-info'

Vue.use(MetaInfo)
```

### Creating new pages
All you need to create new page's route on your SPA is create it on your Wordpress. Then it will be available under /page/<:page_slug> address.

### Creating new posts
The process is same as above. You just need to write and public new post in Wordpress Admin Panel. Then it will be available under /post/<:post_slug> address.

### Own menus
WP-REST-API V2 Menus plugin allows you to share menus on the Rest API. With that you can easily design navigations for your website. Just add it to config and then you can use it easily. They will be stored in:
```
store.state.wp_rest_content.menus[YOUR_MENU_SLUG]
this.$store.state.wp_rest_content.menus[YOUR_MENU_SLUG]
```

### Page building with ACF
By using our preset for ACF Wordpress' plugin you can build much more advanced pages. Preset is placed in vendor directory.

We provided 1-4 column rows where you can put customizable banner WYSiWYG component. The main thing is flexibility. You can build hundreds of diffrent solutions only with these 2 components.
