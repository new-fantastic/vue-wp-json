import { MutationTree } from 'vuex'
import * as types from './mutation-types'

export const mutations: MutationTree<any> = {
  [types.SET_PAGE_CONTENT] (state, { data, slotName }) {
    state.pages = { 
      ...state.pages,
      [slotName]: Array.isArray(data) ? data[0] : data
    }
  },
  [types.SET_POST_CONTENT] (state, { data, slotName }) {
    state.posts = { 
      ...state.posts,
      [slotName]: Array.isArray(data) ? data[0] : data
    }
  },
  [types.SET_MENU_CONTENT] (state, { data, slotName }) {
    state.menus = { 
      ...state.menus,
      [slotName]: Array.isArray(data) ? data[0] : data
    }
  },
  [types.SET_LANG] (state, payload) {
    state.lang = payload
  },
  [types.SET_META_CONTENT] (state, { slotName, data }) {
    state.meta = { 
      ...state.meta,
      [slotName ? slotName : 'base']: Array.isArray(data) ? data[0] : data
    }
  }
}