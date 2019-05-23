---
sidebarDepth: 2
---

# Structure of $wp
VueWpJson plugin injects few core things to __Vue.prototype__. It can be useful to know and understand shape of this data.

### $wp.config
There we inject whole **config object**   
Example value:
```js
config: {
  lang: 'en',
  url: 'https://wp.mybackend.com/',
  pages: {
    home: "home-page"
  },
  menus: ["info", "contact"]
}
```

### $wp.layouts
**Layouts object** is created when any extension provides custom page, post, section or column.

#### $wp.layouts.section and $wp.layouts.column
If there is registered a custom Section or a custom Column these values will be equal true. In addition, there will be registered __Global Vue Component__ called - AlternativeSection or AlternativeColumn

#### $wp.layouts.page and $wp.layouts.post
If there is registered a custom Page view or a custom Post view these values will be equal:
- In case of Nuxt, component's string name (AlternativePage/AlternativePost)
- In case of Vue, component's object

Additionaly, when we use Nuxt, our __view's name__ will be saved in Vuex Module - __wpr_layouts__ under key page/post. With that, Nuxt can properly recognize custom view and use it on **Server Side**

