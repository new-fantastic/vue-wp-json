import { MutationTree } from "vuex";
import * as types from "./mutation-types";
import Vue from "vue";

export const mutations: MutationTree<any> = {
  [types.SET_CONFIG](state, payload) {
    state.config = payload;
  },

  [types.SET_REQUEST_PREFIX](state, newPrefix) {
    state.config.requestPrefix = newPrefix;
    Vue.prototype.$wp.requestPrefix = newPrefix;
  }
};
