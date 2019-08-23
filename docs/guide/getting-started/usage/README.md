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
    <Sections v-if="wpData" :data="wpData" />
  </section>
</template>

<script>
import wpData from "@vue-wordpress/core/mixins/wpData";
import { FetchHookTypes } from "@vue-wordpress/core/types";

export default {
  name: "MyCustomPage",
  mixins: [wpData("wp-page-slug", FetchHookTypes.Created)]
};
</script>
```

As **wp-page-slug** type slug of your page in Wordpress site!
We have access to the **Sections** component from our mixin. It renders fetched Page.

wpData takes one argument of FetchHookTypes type. Currently, there are 2 possible values:

- FetchHookTypes.Created - when data has to be fetched inside **created** lifecycle hook
- FetchHookTypes.AsyncData - when data has to be fetched inside **asyncData** (Nuxt)

If we do not provide any value to the function, it will by default use **FetchHookTypes.Created**. So for Vue App's without SSR, we can use just:

```js
wpData("wp-page-slug");
```

**wpData** is so powerful mixin. It can accept array of slugs, and objects in first argument. Learn more about it [here](/api/wpData/).

<br>

### Disabling default routes

As we can create own powerful pages only with certain content, we could want to disable **autoadding routes** (page/, post/). All you need to do for that is change (in your config - main.js/nuxt.config.js):

```js
router;
// or
router: true;
```

To:

```js
router: false;
```

## Plain data

<br>

It is possible that you would want to use plain fetched data - without our abstraction layers. All you need to do that is append **wpData** mixin.

After that, fetched data will be available under **this** like data/computed value.

Example:

```js
{
  mixins: [wpData({
    slug: 'sample-post-page',
    type: 'posts',
    dataName: 'example'
  })],
  mounted () {
    // There we have access to 'sample-post-page' response!
    console.log(this.example)
  }
}
```

Learn more about wpData [here](/api/wpData/).

<br>

## Media

<br>

Module is fetching information about each Media on your WP. With that we have direct access to details. Alternative text, possible sizes with URI, meta, image meta, caption etc. Everything is available under:

```js
this.$store.state.wp_media.media;
store.state.wp_media.media;
```

Inside media object we have information about each file. Keys are media ID, values are data.

We can use it with **BaseMedia** component which is placed in:

```
@vue-wordpress/core/components/Base/BaseMedia.vue
```

It will decide what type of media it is and render proper component (Image or Video). All we have to provide as props is **media's id**

<br>

## Menus

<br>

Menus are fetched by default. We can limit it to fetching only certain menus or not fetching.
a) If we want to fetch each menu, do not do anything. They will be fetched
b) Only certain (inside config):

```js
menus: ["first-menu-slug", "other-menu"];
// or
menus: "my-menu";
```

c) Not fetching

```js
menus: false;
```

Each menu will be fetched from API and available at:

```js
this.$store.state.wp_menu.menu;
store.state.wp_menu.menu;
```

There will be object where key is a menu's slug and value is a data.

We provide BaseMenu component with which you can render the simplest possible menu (ul > li > a || router-link). It does not matter how deep submenus it contains. Component support **infinite nesting**. It is placed under:

```
@vue-wordpress/core/components/Base/BaseMenu.vue
```

Just provide as **slug props** menu's slug, e.g:

```vue
<BaseMenu slug="info-menu" />
```

<br>
