---
sidebarDepth: 2
---

# Structure of Vuex Store

VueWpJson plugin creates few VueX store modules to store a fetched data.

## wp_config

There we inject whole **config object** under "config" key  
Example value:

```js
config: {
  lang: 'en',
  url: 'https://wp.mybackend.com/',
  menus: ["info", "contact"]
}
```

Config object implement this interface:
```ts
export interface EditablePluginConfig {
  url: string,
  lang: string,
  requestPrefix?: string,
  titleTemplate?: string,
  debugger?: Boolean
}
```

Creating this module was essential to make it compatibile with Nuxt.

## wp_menu

There we have our menus if we did not disable them and on our Wordpress we have installed [this plugin](https://wordpress.org/plugins/wp-rest-api-v2-menus/)

## wp_meta

Here we store default website's meta data. If page does not have any it will be used as fallback.

## wp_post

There we store our fetched posts' content. Under **post key** we have pairs like:

```js
"types": {
  "posts": {
    "my-post": {/*...*/},
  },
  "pages": {
    "my-page": {/*...*/},
  },
  "custom-post-type": {
    "my-custom-post": {/*...*/},
  }
}
```

Saved data is freezed by Object.freeze for optimization purpose.