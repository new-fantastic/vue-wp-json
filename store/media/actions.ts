import { router } from '@vue-storefront/core/app'
import axios from 'axios'
import { WPRMediaState } from '../../types'
import { ActionTree } from 'vuex';
import config from 'config'

import * as types from './mutation-types'
import { ContentTypes } from '../../types'
import { type } from 'os';

const typeBaseUrl = '/wp-json/wp/v2/media/'

export const actions = {
  async loadMedia ({commit}, {lang}) {

    const part = lang == 'pl' ? '' : '/' + lang
    const baseUrl = config.wordpressCms.url + part + typeBaseUrl + '/'

    try {
      const response = await axios.get(baseUrl)

      if(response.data.status == 404 || response.data.length < 1) {
        throw new Error('Endpoint ain\'t ready')
      }
    
      commit(types.SET_MEDIA_CONTENT, {
        data: response.data
      })
  
    } catch (err) {
        // router.push('/page-not-found')
    }
  },

}
