import { MutationTree } from 'vuex'
import * as types from './mutation-types'

export const mutations: MutationTree<any> = {
  [types.SET_POST_CONTENT] (state, { data, slotName }) {
    state.post = { 
      ...state.post,
      [slotName]: Array.isArray(data) ? data[0] : data
    }
  }
}