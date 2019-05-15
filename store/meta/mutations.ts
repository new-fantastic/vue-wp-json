import { MutationTree } from 'vuex'
import * as types from './mutation-types'

export const mutations: MutationTree<any> = {
  [types.SET_META_CONTENT] (state, { data }) {
    state.meta = Array.isArray(data) ? data[0] : data
  }
}