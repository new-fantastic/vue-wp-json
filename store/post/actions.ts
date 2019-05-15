import axios from 'axios'
import Vue from 'vue'

import * as types from './mutation-types'
import { ActionTree } from 'vuex';

const typeBaseUrl = '/wp-json/wp/v2/posts?slug='

export const actions: ActionTree<Object, any> = {
  
  async load ({commit}, {slug}) {

    const config = Vue.prototype.$wp.config

    // const part = lang == 'pl' ? '' : '/' + lang
    const baseUrl = config.url + typeBaseUrl

    try {
      const response = await axios.get(baseUrl + slug)

      if(response.data.status == 404 || response.data.length < 1) {
        throw new Error('Endpoint ain\'t ready')
      }
    
      commit(types.SET_POST_CONTENT, {
        data: response.data,
        slotName: slug
      })
  
    } catch (err) {
      commit(types.SET_POST_CONTENT, {
        data: false,
        slotName: slug
      })
    }
  }

}
