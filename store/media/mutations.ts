import { MutationTree } from 'vuex'
import * as types from './mutation-types'

export const mutations: MutationTree<any> = {
  [types.SET_MEDIA_CONTENT] (state, { data }) {
    // Filter array to item.id => item.data
    const obj = {}
    data.forEach(item => {
      obj[item.id] = item
    })
    state.media = obj
  }
}