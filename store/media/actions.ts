import Vue from 'vue'
import axios from 'axios'
import { WPRMediaState } from '../../types'
import { ActionTree } from 'vuex';

import * as types from './mutation-types'

const typeBaseUrl = '/wp-json/wp/v2/media/'

export const actions: ActionTree<WPRMediaState, any> = {
  async loadMedia ({commit}, {lang}) {

    const config = Vue.prototype.$wp.config

    const part = lang == 'pl' ? '' : '/' + lang
    const baseUrl = config.url + part + typeBaseUrl + '/'

    try {
      const response = await axios.get(baseUrl)

      if(response.data.status == 404 || response.data.length < 1) {
        throw new Error('Endpoint ain\'t ready')
      }
    
      commit(types.SET_MEDIA_CONTENT, {
        data: response.data
      })
  
    } catch (err) {
       
    }
  }

}
