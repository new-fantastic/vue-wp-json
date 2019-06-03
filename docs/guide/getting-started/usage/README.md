# Usage

<br>

## Pages & Posts

<br>

### Creating
All you need to do for create a new page is Add it on Wordpress' backend. It is okay to use default editor. However, feel free to use **Gutenberg**. We support this pagebuilder. After that your Page/Post page will be available under: 
- /page/<slug_of_page> - for Page
- /post/<slug_of_post> - for Post

### Page without prefix
If you do not like to use page/post prefix you can register your own Views in router. 
```js
{
  path: '/mcp',
  name: 'my-custom-page',
  component: MyCustomPage,
}
```

Then create **MyCustomPage** View. You should import mixin in your View and data will be available under **wpData**.

```vue
<template>
  <section class="wrapper">
      <Sections
        v-if="wpData"
        :data="wpData"
      />
  </section>
</template>

<script>
  import loadSections from 'vue-wp-json/mixins/loadSections'
  import { FetchHookTypes } from 'vue-wp-json/types'

  export default {
    name: 'MyCustomPage',
    mixins: [loadSections('wp-page-slug', FetchHookTypes.Created)]
  }
</script>
```

As **wp-page-slug** type slug of your page in Wordpress site!
We have access to the **Sections** component from our mixin. It renders fetched Page. 

loadSections takes one argument of FetchHookTypes type. Currently, there are 2 possible values:
- FetchHookTypes.Created - when data has to be fetched inside __created__ lifecycle hook
- FetchHookTypes.AsyncData - when data has to be fetched inside __asyncData__ (Nuxt)

If we do not provide any value to the function, it will by default use __FetchHookTypes.Created__. So for Vue App's without SSR, we can use just:
```js
loadSections('wp-page-slug')
```

**loadSections** is so powerful mixin. It can accept array of slugs, and objects in first argument. Learn more about it [here](/api/loadSections/).

<br>

## Plain data

<br>

It is possible that you would want to use plain fetched data - without our abstraction layers. All you need to do that is append **loadSections** mixin.

After that, fetched data will be available under **this** like data/computed value.

Example: 
```js
{
  mixins: [loadSections({
    slug: 'sample-post-page',
    post: true,
    dataName: 'example'
  })],
  mounted () {
    // There we have access to 'sample-post-page' response!
    console.log(this.example)
  }
}
```

Learn more about loadSections [here](/api/loadSections/).

<br>

## Media

<br>

Module is fetching information about each Media on your WP. With that we have direct access to details. Alternative text, possible sizes with URI, meta, image meta, caption etc. Everything is available under:
```js
this.$store.state.wp_media.media
store.state.wp_media.media
```

Inside media object we have information about each file. Keys are media ID, values are data.

We can use it with **BaseMedia** component which is placed in:
```
@vue-wp-json/core/components/base/BaseMedia.vue
```
It will decide what type of media it is and render proper component (Image or Video). All we have to provide as props is **media's id**

<br>

## Menus

<br>

If we want to fetch menus, at first we need to install [this Wordpress' plugin](https://pl.wordpress.org/plugins/wp-rest-api-v2-menus/). After that, in config file, add array of menu's slugs, e.g:
```js
config: {
    // ...
    menus: ["info-menu", "contact-menu"]
  },
  store,
  router
}
```

Each menu will be fetched from API and available at:
```js
this.$store.state.wp_menu.menu
store.state.wp_menu.menu
```

There will be object where key is a menu's slug and value is a data. 

We provide BaseMenu component with which you can render the simplest possible menu (ul > li > a || router-link). It does not matter how deep submenus it contains. Component support __infinite nesting__. It is placed under:
```
@vue-wp-json/core/components/base/BaseMenu.vue
```

Just provide as __slug props__ menu's slug, e.g:
```vue
<BaseMenu slug="info-menu"/>
```

<br>

