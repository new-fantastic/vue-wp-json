import axios from 'axios'
import Vue from 'vue'

import * as types from './mutation-types'
import { ActionTree } from 'vuex';

import { UrlCreator } from '../../util/UrlCreator'

const typeBaseUrl = '/wp-json/wp/v2/posts?slug='

export const actions: ActionTree<Object, any> = {
  
  async load ({state, commit}, {slug}) {

    const config = Vue.prototype.$wp.config

    const base = new UrlCreator(config.url, [typeBaseUrl, slug])

    if(Vue.prototype.$wp.api 
      && Vue.prototype.$wp.api.post) {
      for(let filter of Vue.prototype.$wp.api.post) {
        filter(base)
      }
    }

    try {
      if(!(slug in state.post && state.post[slug] && state.post[slug] !== false)) {
        const response = await axios.get(base.url)

        if(response.data.status == 404 || response.data.length < 1) {
          throw new Error('Endpoint ain\'t ready')
        }
      
        commit(types.SET_POST_CONTENT, {
          data: response.data,
          slotName: slug
        })
      }
  
    } catch (err) {
      commit(types.SET_POST_CONTENT, {
        data: false,
        slotName: slug
      })
    }
  }

}
