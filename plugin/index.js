import TheRoot from '../components/TheRoot.js'
import { media }from '../store/media'
import { lang }from '../store/lang'
import { post }from '../store/post'
import { page }from '../store/page'
import { menu }from '../store/menu'
import { meta }from '../store/meta'
import { routes } from '../router/routes'
import registerPlugin from './registerPlugin'

export const ModulePrefix = 'wpr'

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

      await Promise.all([
        store.dispatch(`${ModulePrefix}_menu/load`, {
          menuSlugs: options.config.menus
        }),
        store.dispatch(`${ModulePrefix}_meta/load`),
        store.dispatch(`${ModulePrefix}_media/load`)
      ])

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

      // Do we have router?
      if (!('router' in options)) {
        throw new Error('No router instance provided in config!')
      }

      const router = options.router
      const customPage = Vue.prototype.$wp.layouts.page 
        ? Vue.prototype.$wp.layouts.page 
        : undefined

      const customPost = Vue.prototype.$wp.layouts.post 
        ? Vue.prototype.$wp.layouts.post
        : undefined

      router.addRoutes(routes(customPage, customPost))
    } catch(e) {
      console.error(e, e.message)
    }
  }
}