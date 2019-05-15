import { MutationTree } from 'vuex'
import * as types from './mutation-types'

export const mutations: MutationTree<any> = {
  [types.SET_PAGE_CONTENT] (state, { data, slotName }) {
    state.page = { 
      ...state.page,
      [slotName]: Array.isArray(data) ? data[0] : data
    }
  }
}