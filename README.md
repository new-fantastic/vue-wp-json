# vsf-wp-json

<br>

Wordpress REST API plugin for Vue.js providing an out-of-box routing and data handling.

<br>

## Installation

<br>

### A. Regular Vue.js App

<br>

#### 1. Go to your app's main directory and run

<br>

```bash
npm install vue-wp-json
```

or

```bash
yarn add vue-wp-json
```

<br>

#### 2. Go to your main.js/main.ts file import the module catalog and register it as plugin.

<br>

```javascript
import Vue from 'vue'
import vueWpJson from 'vue-wp-json'

Vue.use(vueWpJson, {
  config: {
    url: 'your-wordpress-url.com/',
    pages: {
      home: "home-page"
      // Here put pairs like - routeName: "slugInApi"
      // Then plugin will download page structure from /wp-json/wp/v2/pages?slug=home-page when current route is called 'home'
    },
    menus: [
      "first-menu-slug",
      "second-menu-slug"
      // There provide your menus' slug, if you have only one menu, provide it as string. If you do not have any menu, set to false or just delete this key
    ],
    store,
    router // Injecting VueX Store and Router is obligatory
  }
})
```

<br>

If you would like to set proper meta tags automatically for Pages/Posts, all you need is install `vue-meta-info` and register it as a  plugin, for example in your main.js/ts
```
import Vue from 'vue'
import MetaInfo from 'vue-meta-info'

Vue.use(MetaInfo)
```

<br>

## Usage

<br>

### Creating Pages

<br>

All you need to do to create new page's route in your app is creating it on in Wordpress Admin at _Pages_. It will automatiaclly be available under /page/<:page_slug> address.

### Creating Posts

<br>

The process is the same as above. You just need to create and publish new post in Wordpress Admin at _Posts_. It will automatiaclly be  available under /post/<:post_slug> address.

<br>

### Creating Menus

<br>

To be able to use WordPress Menus in your app, you will have to install additional plugin in your WordPress - **<a href="https://pl.wordpress.org/plugins/wp-rest-api-v2-menus/">WP-REST-API V2 Menus plugin</a>**. It extends native Wordpress REST API by adding a new endpoint with menus at `/wp-json/menus/v1/menus/`. After you have added the plugin `vue-wp-json` will automatically detect and store your menus at:

<br>

```
store.state.wp_rest_content.menus[YOUR_MENU_SLUG]
this.$store.state.wp_rest_content.menus[YOUR_MENU_SLUG]
```

<br>

## Advanced Usage

### Page building with ACF

<br>

By using our preset for ACF Wordpress' plugin you can build much more advanced pages. Preset is placed in vendor directory.

We provided 1-4 column rows where you can put customizable banner WYSiWYG component. The main thing is flexibility. You can build hundreds of diffrent solutions only with these 2 components.
