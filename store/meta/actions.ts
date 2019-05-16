import axios from 'axios'
import Vue from 'vue'

import * as types from './mutation-types'
import { ActionTree } from 'vuex';

import { UrlCreator } from '../../util/UrlCreator'

const typeBaseUrl = '/wp-json'

export const actions: ActionTree<Object, any> = {
  
  async load ({commit}) {
    const config = Vue.prototype.$wp.config

    const base = new UrlCreator(config.url, [typeBaseUrl])

    if(Vue.prototype.$wp.api 
      && Vue.prototype.$wp.api.meta) {
      for(let filter of Vue.prototype.$wp.api.meta) {
        filter(base)
      }
    }

    try {
      const { data } = await axios.get(base.url)
      commit(types.SET_META_CONTENT, {
        data: {
          name: data.name,
          description: data.description,
          url: data.url,
          home: data.home,
          gmt_offset: data.gmt_offset,
          timezone_string: data.timezone_string
        }
      })
    } catch (err) {
      console.error(err)
    }
  }

}
