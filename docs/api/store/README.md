---
sidebarDepth: 2
---

# Structure of Vuex Store
VueWpJson plugin creates few VueX store modules to store a fetched data.

## wpr_config
Simple module which stores config provided by user while registering plugin/Nuxt module. There we inject whole **config object** under "config" key   
Example value:
```js
config: {
  lang: 'en',
  url: 'https://wp.mybackend.com/',
  menus: ["info", "contact"]
}
```

Creating this module was essential to make it compatibile with Nuxt.

## wpr_lang
There we store website's language under "lang" key. In future, this module will be deleted because we store same data in wpr_config

## wpr_layouts
If we provide Vuex Store as third argument to registerPlugin - there will be stored under keys post/page:
- In case of Nuxt - "AlternativePost" or "AlternativePage" string
- In case of Vue - Custom Page/Post view component

Creating this module was essential to make it compatibile with Nuxt.

## wpr_media
There we have whole response from /media Wordpress' endpoint. It will be used in next versions to provide new functionalities.

Fetched after plugin's registration.

## wpr_menu
There we have our menus if we provided any in Config and on our Wordpress we have installed [this plugin](https://wordpress.org/plugins/wp-rest-api-v2-menus/)

We also provide menu component which is placed in **components/Base/BaseMenu.vue**.
It can generate an infinite __ul > li > router-link or a__ structure based on **slug** sent as props. Component will search for slug in VueX store and do the job.

Fetched after plugin's registration.

## wpr_meta
Here we store default website's meta data. If page does not have any it will be used as fallback.

Fetched after plugin's registration.

## wpr_page
There we store our pages' content. Under __page key__ we have pairs like:
```
"page-slug": <response_from_wp>
```

Fetched after request page's page on frontend

## wpr_post
There we store our posts' content. Under __post key__ we have pairs like:
```
"post-slug": <response_from_wp>
```

Fetched after request post's page on frontend
