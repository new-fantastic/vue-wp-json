import { MutationTree } from 'vuex'
import * as types from './mutation-types'

export const mutations: MutationTree<any> = {
  [types.SET_LAYOUT] (state, payload) {
    state.layouts[payload.key] = payload.value
  }
}