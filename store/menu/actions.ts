import axios from 'axios'
import Vue from 'vue'

import * as types from './mutation-types'
import { ActionTree } from 'vuex';

const typeBaseUrl = '/wp-json/menus/v1/menus'

export const actions: ActionTree<Object, any> = {
  
  async load({commit}, {menuSlugs}) {

    if(menuSlugs === false || !menuSlugs) {
      return
    }

    const config = Vue.prototype.$wp.config

    // const part = lang == 'pl' ? '' : '/' + lang
    const baseUrl = config.url + typeBaseUrl

    const fixUrls = items => {
      const fixedItems = []

      for(let item of items) {
        const prefix = item.object == 'page'
          ? 'page'
          : 'post'
        
        fixedItems.push({
          ...item,
          url: item.url.replace(config.url, k => {
            return config.url.substr(-1) === '/'
              ? `/${prefix}/`
              : `${prefix}/`
          })
        })
      }

      return fixedItems
    }

    try {
      if(Array.isArray(menuSlugs)) {
        // Few menus in paralel
        const requests = []
        for(let slug of menuSlugs) {
          requests.push(
            axios.get(baseUrl + '/' + slug)
          )
        }
        let response = await Promise.all(requests)
        response.forEach(c => {
          commit(types.SET_MENU_CONTENT, {
            data: {
              ...c.data,
              items: fixUrls(c.data.items)
            },
            slotName: c.data.slug
          })
        })

      } else {
        let response = await axios.get(baseUrl + '/' + menuSlugs)
        commit(types.SET_MENU_CONTENT, {
          data: response.data,
          slotName: menuSlugs
        })
      } 
  
    } catch (err) {
      console.error(err)
    }
  }

}
