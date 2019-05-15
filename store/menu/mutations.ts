import { MutationTree } from 'vuex'
import * as types from './mutation-types'

export const mutations: MutationTree<any> = {
  [types.SET_MENU_CONTENT] (state, { data, slotName }) {
    state.menu = { 
      ...state.menu,
      [slotName]: Array.isArray(data) ? data[0] : data
    }
  }
}