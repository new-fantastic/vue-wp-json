import { MutationTree } from "vuex";
import * as types from "./mutation-types";

export const mutations: MutationTree<any> = {

  [types.SET_CONFIG](state, payload) {
    for (const [key, value] of Object.entries(payload)) {
      state[key] = payload[key]
    }
  },

  [types.SET_URL](state, payload) {
    state.url = payload;
  },

  [types.SET_REQUEST_PREFIX](state, newPrefix) {
    state.requestPrefix = newPrefix;
  }

};
