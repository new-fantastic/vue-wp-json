import { SET_LAYOUT } from '../store/layouts/mutation-types'
import { ModulePrefix } from '../index'

export default async (Vue, p, store?, forceEnvironment?) => {

  // Change name to registerExtension
  // How to wait for Core register and then register extensions?

  // In Vue version plugin will be a plugin's object
  // In Nuxt version plugin will be part of plugin's directory
  // For vue-wp-json-acf, plugin = 'acf'

  let x = p
  let environment = 'vue'
  if (typeof p === 'string') {
    let name = p.replace('vue-wp-json-', '')
    try {
      x = await import(`../../vue-wp-json-${name}/index.js`)
    } catch(e) {
      throw new Error(`Extension "${name}" does not exist`)
    } 
    
    environment = 'nuxt'
  }

  if(forceEnvironment) {
    environment = forceEnvironment
  }

  let plugin
  if(Object.keys(x).includes('default')) {
    plugin = x.default
  } else {
    plugin = x
  } 

  if('blocks' in plugin) {
    for(const [key, value] of Object.entries(plugin.blocks)) {
      Vue.component(key, value)
    }
  }

  if(!('$wp' in Vue.prototype)) {
    Vue.prototype.$wp = {}
  }

  if('layouts' in plugin) {

    Vue.prototype.$wp.layouts = {}

    if('Section' in plugin.layouts) {
      Vue.prototype.$wp.layouts.section = true
      Vue.component('AlternativeSection', plugin.layouts.Section)
    }

    if('Column' in plugin.layouts) {
      Vue.prototype.$wp.layouts.column = true
      Vue.component('AlternativeColumn', plugin.layouts.Column)
    }

    if('Page' in plugin.layouts) {
      if(environment === 'nuxt')
        Vue.prototype.$wp.layouts.page = 'AlternativePage'
      else
        Vue.prototype.$wp.layouts.page = plugin.layouts.Page

      Vue.component('AlternativePage', plugin.layouts.Page)
      let value
      if(environment === 'nuxt')
        value = 'AlternativePage'
      else
        value = plugin.layouts.Page

      if(store && store.commit) {
        store.commit(`${ModulePrefix}_layouts/${SET_LAYOUT}`, {
          key: 'page',
          value
        })
      } 
      
    }

    if('Post' in plugin.layouts) {

      if(environment === 'nuxt')
        Vue.prototype.$wp.layouts.post = 'AlternativePost'
      else
        Vue.prototype.$wp.layouts.post = plugin.layouts.Post

      Vue.component('AlternativePost', plugin.layouts.Post)
      let value
      if(environment === 'nuxt')
        value = 'AlternativePost'
      else
        value = plugin.layouts.Post

      if(store && store.commit) {
        store.commit(`${ModulePrefix}_layouts/${SET_LAYOUT}`, {
          key: 'post',
          value
        })
      }

    }
  }

  if('middleware' in plugin) {

    if('api' in plugin.middleware) {
      Vue.prototype.$wp.api = {}
      for(const [key, value] of Object.entries(plugin.middleware.api)) {
          if(!Vue.prototype.$wp.api[key]) {
            Vue.prototype.$wp.api[key] = []
          }
          Vue.prototype.$wp.api[key].push(value)
      }
    }

    if('root' in plugin.middleware) {

      if('validator' in plugin.middleware.root) {
  
        if(!Vue.prototype.$wp.validators) {
          Vue.prototype.$wp.validators = {}
        }
        if(!('root' in Vue.prototype.$wp.validators)) {
          Vue.prototype.$wp.validators.root = []
        }
    
        Vue.prototype.$wp.validators.root.push(plugin.middleware.root.validator)
      }
      
      if('interpret' in plugin.middleware.root) {
        if(!Vue.prototype.$wp.interpret) {
          Vue.prototype.$wp.interpret = {}
        }
        if(!('root' in Vue.prototype.$wp.interpret)) {
          Vue.prototype.$wp.interpret.root = []
        }
  
        Vue.prototype.$wp.interpret.root.push(plugin.middleware.root.interpret)
      }
    }

    if('section' in plugin.middleware) {

      if('interpret' in plugin.middleware.section) {
        if(!Vue.prototype.$wp.interpret) {
          Vue.prototype.$wp.interpret = {}
        }
        if(!('section' in Vue.prototype.$wp.interpret)) {
          Vue.prototype.$wp.interpret.section = []
        }
  
        Vue.prototype.$wp.interpret.section.push(plugin.middleware.section.interpret)
      }

    }

  }

}