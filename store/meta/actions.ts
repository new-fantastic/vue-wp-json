import axios from 'axios'
import Vue from 'vue'

import * as types from './mutation-types'
import { ActionTree } from 'vuex';

const typeBaseUrl = '/wp-json'

export const actions: ActionTree<Object, any> = {
  
  async load ({commit}) {
    const config = Vue.prototype.$wp.config

    const baseUrl = config.url + typeBaseUrl

    try {
      const { data } = await axios.get(baseUrl)
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
