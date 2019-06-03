import Vue from 'vue'
import axios from 'axios'
import { ActionTree } from 'vuex';

import * as types from './mutation-types'

import { UrlCreator } from '../../util/UrlCreator'

const typeBaseUrl = '/wp-json/wp/v2/media/'

export const actions: ActionTree<Object, any> = {
  async load ({commit}) {

    const config = Vue.prototype.$wp.config

    const base = new UrlCreator(config.url, [typeBaseUrl])

    if(Vue.prototype.$wp.api 
      && Vue.prototype.$wp.api.media) {
      for(let filter of Vue.prototype.$wp.api.media) {
        filter(base)
      }
    }

    try {
      const response = await axios.get(base.url)

      if(response.data.status == 404) {
        throw new Error('Endpoint ain\'t ready')
      }
    
      commit(types.SET_MEDIA_CONTENT, {
        data: response.data
      })
  
    } catch (err) {
      console.error(err)
    }
  }

}
