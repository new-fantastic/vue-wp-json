# PWA

<br>

## Introduction

<br>

As Vue and Nuxt provide proper PWA module. All we need to do for use it with VueWpJson module is install it and write proper config. 

Below we will show you how to do that

## VueJS
When you are creating new VueJS project - you can select Progressive Web App support. If you did not do that earlier, you can now type:
```
vue add @vue/pwa
```

Then create **vue.config.js** file or **pwa section** inside package.json. Below we show proper config:
```js
module.exports = {
  pwa: {
    workboxOptions: {
      runtimeCaching: [
        {
          urlPattern: new RegExp('^https://wp\.myapi\.com/'),
          handler: 'networkFirst',
          options: {
            networkTimeoutSeconds: 5,
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }
  }
}
```

Now, each GET request (which we send to WP Rest API) will be cached if it starts with **https://wp.myapi.com/** in URL.

We have to precede each dot with \ as dot is special char in Regex. Moreover, we begins with ^ which means - our URL should start with provided string. 

Handler with value **networkFirst** means that our page will try to fetch data from Ethernet, if it fails it will look for that in Cache storage.

We can read more about possible arguments [here](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#full_generatesw_config)

After provide that simple config, the App will cache API requests.   
**You can test it only in built App!**

### registerServiceWorker
Vue PWA module also provides file called **registerServiceWorker**. There we can hook some events. By default there are console logs in each one.

## Nuxt
In Nuxt App, configuration is similar. However, here you have to install Nuxt PWA module. You can do it by typing:
```
yarn add @nuxtjs/pwa
```
or
```
npm i @nuxtjs/pwa
```

Then in **nuxt.config.js** add:
```
modules: [
  '@nuxtjs/pwa'
]
```

Ensure **static** dir exists and optionally create **static/icon.png**. It is recommended to be square png >= **512x512px**

Add to **.gitignore**
```
sw.*
```

Now we have to somehow provide config for workbox. For that, in **nuxt.config.js** add it in **workbox**
```js
workbox: {
  runtimeCaching: [
    {
      urlPattern: new RegExp('^https://wp\.myapi\.com/'),
      handler: 'networkFirst',
      options: {
        networkTimeoutSeconds: 5,
        cacheableResponse: {
          statuses: [0, 200]
        }
      }
    }
  ]
}
```

As you can see, config's content is the same as in Vue module. That is all what you need. Remember that, caching will **work in built project**.
