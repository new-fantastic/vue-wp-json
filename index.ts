import TheRoot from './components/TheRoot.js'
import { media }from './store/media'
import { lang }from './store/lang'
import { post }from './store/post'
import { page }from './store/page'
import { menu }from './store/menu'
import { meta }from './store/meta'
import { routes } from './router/routes'
import registerPlugin from './plugin/registerPlugin'
import * as types from './store/lang/mutation-types'

export const ModulePrefix = 'wp'

export default {
  async install (Vue, options) {
    try {
      // Config
      // Is it proper
      if (!('config' in options)) {
        throw new Error('No config provided!')
      }
      if (!('url' in options.config)) {
        throw new Error('No API\'s URL provided!')
      }
      if (!('lang' in options.config)) {
        throw new Error('No lang provided!')
      }
      // Register it in app
      Vue.prototype.$wp = {}
      Vue.prototype.$wp.config = options.config;

      // Do we have store?
      if (!('store' in options)) {
        throw new Error('No VueX store provided in config!')
      }
      const store = options.store

      // Global access to TheRoot component
      Vue.component('Sections', TheRoot)

      // Register VueX modules
      store.registerModule(`${ModulePrefix}_lang`, lang)
      store.registerModule(`${ModulePrefix}_media`, media)
      store.registerModule(`${ModulePrefix}_menu`, menu)
      store.registerModule(`${ModulePrefix}_meta`, meta)
      store.registerModule(`${ModulePrefix}_page`, page)
      store.registerModule(`${ModulePrefix}_post`, post)

      if('plugins' in options) {
        // Register plugins
        if(Array.isArray(options.plugins)) {
          for(let plugin of options.plugins) {
            registerPlugin(Vue, plugin)
          }
        } else {
          registerPlugin(Vue, options.plugins)
        }
      }

      await Promise.all([
        store.dispatch(`${ModulePrefix}_menu/load`, {
          menuSlugs: options.config.menus
        }),
        store.dispatch(`${ModulePrefix}_meta/load`),
        store.dispatch(`${ModulePrefix}_media/load`)
      ])

      store.commit(`${ModulePrefix}_lang/${types.SET_LANG}`, options.config.lang)

      // Do we have router?
      if (!('router' in options)) {
        throw new Error('No router instance provided in config!')
      }

      const router = options.router

      const customPage = Vue.prototype.$wp.layouts && Vue.prototype.$wp.layouts.page 
        ? Vue.prototype.$wp.layouts.page 
        : undefined

      const customPost = Vue.prototype.$wp.layouts && Vue.prototype.$wp.layouts.post 
        ? Vue.prototype.$wp.layouts.post
        : undefined

      router.addRoutes(routes(customPage, customPost))

      // Set lang in html
      if(document) {
        const html = document.querySelector('html')

        if(html) {
          html.setAttribute('lang', options.config.lang)
        }

        const el = document.createElement('link');
        el.setAttribute('rel', 'alternate')

        const url = window.location.origin.substr(-1) === '/'
          ? window.location.origin
          : window.location.origin + '/'
        el.setAttribute('href', `${url}${options.config.lang}`)
        el.setAttribute('hreflang', `${options.config.lang}`)

        document.head.appendChild(el)
      }
      
    } catch(e) {
      console.error(e, e.message)
    }
  }
}