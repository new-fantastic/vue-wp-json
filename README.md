# vue-wp-json

<br>

💫 Wordpress REST API plugin for Vue.js with out-of-box routing and data handling 💫

<br>

- [Installation](#installation)

  - [Vue.js](#a-vuejs)
  - [Nuxt.js (Coming soon)](#b-nuxtjs)
  - [Vue Storefront](#c-vue-storefront)

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

### A. Vue.js

<br>

#### 1. Go to your app's main directory and run:

<br>

```bash
npm install vue-wp-json
```

or

```bash
yarn add vue-wp-json
```

<br>

#### 2. Go to your app's `main.js` / `main.ts` file, import the module catalog and register it:

<br>

```javascript
import Vue from 'vue'
import vueWpJson from 'vue-wp-json'

Vue.use(vueWpJson, {
  config: {
    url: 'your-wordpress-url.com/',
    lang: 'en', // Your site's default language. It'll be added to html lang attribute.
    pages: {
      home: "home-page"
      // Here put pairs like - routeName: "slugInApi"
      // Then plugin will download page structure from /wp-json/wp/v2/pages?slug=home-page when current route is called 'home'
    },
    menus: [
      "first-menu-slug",
      "second-menu-slug"
      // There provide your menus' slug, if you have only one menu, provide it as a string. If you do not have any menu, set to false or just delete this key
    ]
  },
  store,
  router // Injecting VueX Store and Router is obligatory
})
```

<br>

If you would like to set proper meta tags automatically for Pages/Posts, all you need to do is to install `vue-meta-info` and register it as a plugin, for example in your main.js/ts

<br>

```
import Vue from 'vue'
import MetaInfo from 'vue-meta-info'

Vue.use(MetaInfo)
```

<br>

### B. Nuxt.js (Coming soon)

<br>

For Nuxt.js we have developed a dedicated  module that is available here: <a href="https://github.com/new-fantastic/nuxt-wp-json">`nuxt-wp-json`</a>

<br>

### C. Vue Storefront

<br>

For Vue Storefront we have developed a dedicated module that is available here: <a href="https://github.com/new-fantastic/vsf-wp-json">`vsf-wp-json`</a>

<br>

## Usage

<br>

### Pages

<br>

All you need to do to create new Page's route in your app is to create it in Wordpress Admin in **_Pages_** tab. It will automatiaclly be available under `/page/<:page_slug>` route.

<br>

### Posts

<br>

The process is the same as above. You just need to create and publish new post in Wordpress Admin at **_Posts_** tab. It will automatiaclly be  available under `/post/<:post_slug>` route.

<br>

### Media

<br>

To be written.

<br>

### Menus

<br>

To be able to use WordPress Menus in your app, you **have to install additional plugin in your WordPress** - **<a href="https://pl.wordpress.org/plugins/wp-rest-api-v2-menus/">WP-REST-API V2 Menus plugin</a>**. It extends native Wordpress REST API by adding a new endpoint with menus at `/wp-json/menus/v1/menus/`. After you have added the plugin `vue-wp-json` will automatically detect and store your menus at:

<br>

```
store.state.wp_rest_content.menus[YOUR_MENU_SLUG]
this.$store.state.wp_rest_content.menus[YOUR_MENU_SLUG]
```

<br>

## Advanced Usage

<br>

More information about additional features available with PRO version of module will be available here: https://vuejs.shop/modules/vue-wp-json-pro

<br>

## Additional modules (Coming soon)

<br>

### Free Extensions

<br>

- [Yoast SEO Extension (Coming soon)](#yoast-extension)

- [qTranslate Extension (Coming soon)](#qtranslate-extension)

<br>

<a name="yoast-extension"></a>

#### Yoast SEO Extension (Coming soon)

<br>

https://github.com/new-fantastic/vue-wp-json-yoast

<br>

<a name="qtranslate-extension"></a>

#### qTranslate Extension (Coming soon)

<br>

https://github.com/new-fantastic/vue-wp-json-qtranslate-x

<br>

### PRO Extensions

<br>

- [Advanced Custom Fields Extension](#acf-extension)

- [DIVI Page Builder Extension (planned for Fall 2019)](#divi-extension)

<br>

<a name="acf-extension"></a>

#### Advanced Custom Fields Extension (Coming soon)

<br>

https://vuejs.shop/modules/vue-wp-json-acf

<br>

<a name="divi-extension"></a>

#### DIVI Page Builder Extension (planned for Fall 2019)

<br>

https://vuejs.shop/modules/vue-wp-json-divi
