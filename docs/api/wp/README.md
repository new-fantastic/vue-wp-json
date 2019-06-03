---
sidebarDepth: 2
---

# Structure of $wp
VueWpJson plugin injects few core things to __Vue.prototype__. It can be useful to know and understand shape of this data.

## $wp.config
There we inject whole **config object**   
Example value:
```js
config: {
  lang: 'en',
  url: 'https://wp.mybackend.com/',
  menus: ["info", "contact"]
}
```

## $wp.layouts
**Layouts object** is created when any extension provides custom page, post, section or column.   
Above __*__ is shortcut for **$wp.layouts**

### *.section and *.column
If there is registered a custom Section or a custom Column these values will be equal true. In addition, there will be registered __Global Vue Component__ called - AlternativeSection or AlternativeColumn

### *.page and *.post
If there is registered a custom Page view or a custom Post view these values will be equal:
- In case of Nuxt, component's string name (AlternativePage/AlternativePost)
- In case of Vue, component's object

Additionaly, when we use Nuxt, our __view's name__ will be saved in Vuex Module - __wpr_layouts__ under key page/post. With that, Nuxt can properly recognize custom view and use it on **Server Side**

## $wp.api
If there is registered any API Middleware - it will be attached here. **$wp.api** is an object that currently can contains 5 keys:
- media
- menu
- meta
- page
- post

Each of these will be an array of "filters". The filter is a function which gets Endpoint's URL (it is instance of UrlCreator), makes operation on it and returns a modified value.

## $wp.validators
If there is registered any custom validator - it will be attached to proper subobject of $wp.validators. Only one possible subobject is:
- root

Inside of **root**, we have functions that check if fetched response is proper (has certain keys).

## $wp.interpret
Inside we can have 2 keys:
- root
- section

Both will contain an array of functions which will interpret provided data, check if it fulfills conditions, if yes it will transform data and send it further.
