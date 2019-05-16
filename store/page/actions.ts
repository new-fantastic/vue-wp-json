import axios from 'axios'
import Vue from 'vue'

import * as types from './mutation-types'
import { ActionTree } from 'vuex';

import { UrlCreator } from '../../util/UrlCreator'

const typeBaseUrl = '/wp-json/wp/v2/pages?slug='

export const actions: ActionTree<Object, any> = {

  async load ({commit}, {slug}) {
    const config = Vue.prototype.$wp.config

    // const part = lang == 'pl' ? '' : '/' + lang
    const base = new UrlCreator(config.url, [typeBaseUrl, slug])

    if(Vue.prototype.$wp.api 
      && Vue.prototype.$wp.api.page) {
      for(let filter of Vue.prototype.$wp.api.page) {
        filter(base)
      }
    }

    try {
      const response = await axios.get(base.url)

      if(response.data.status == 404 || response.data.length < 1) {
        throw new Error('Endpoint ain\'t ready')
      }
    
      commit(types.SET_PAGE_CONTENT, {
        data: response.data,
        slotName: slug
      })
  
    } catch (err) {
      commit(types.SET_PAGE_CONTENT, {
        data: false,
        slotName: slug
      })
    }
  }

}
