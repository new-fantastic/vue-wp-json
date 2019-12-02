import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import Vue from 'vue'

export const mutations: MutationTree<any> = {
  [types.SET_MENU_CONTENT] (state, { data, slotName }) {
    Vue.set(state.menu, slotName, Object.freeze(Array.isArray(data) ? data[0] : data))
  }
}