import { MutationTree } from 'vuex'
import * as types from './mutation-types'

export const mutations: MutationTree<any> = {
  [types.SET_CONFIG] (state, payload) {
    state.config = payload
  }
}