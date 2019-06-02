import TheRoot from './components/TheRoot.js'

import { routes } from './router/routes'
import registerPlugin from './plugin/registerPlugin'

// Initializers
import * as vuex from './plugin/initializers/store'

import MetaInfo from 'vue-meta-info'

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
      Vue.use(MetaInfo)
      Vue.prototype.$wp = {}
      Vue.prototype.$wp.config = options.config;

      // Do we have store?
      if (!('store' in options)) {
        throw new Error('No VueX store provided in config!')
      }

      let store
      const manualVuexMode = options.store === 'manual'
      if(!manualVuexMode) {
        store = options.store
      }

      // Global access to TheRoot component
      Vue.component('Sections', TheRoot)

      // Register VueX modules
      if(!manualVuexMode)
        vuex.registerModules(store)

      if('plugins' in options) {
        // Register plugins
        if(Array.isArray(options.plugins)) {
          for(let plugin of options.plugins) {
            registerPlugin(Vue, plugin, store)
          }
        } else {
          registerPlugin(Vue, options.plugins, store)
        }
      }

      if(!manualVuexMode) {
        vuex.loadBase(store.dispatch, options.config.menus)
        vuex.setLang(store.commit, options.config.lang)
        vuex.setConfig(store.commit, options.config)
      }

      // Do we have router?
      if (!('router' in options)) {
        throw new Error('No router instance provided in config!')
      }

      const router = options.router

      if(router !== 'manual')
        router.addRoutes(routes())

      // Set lang in html
      const nuxtServer = process
      && process.server;

      if (!nuxtServer && document) {
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