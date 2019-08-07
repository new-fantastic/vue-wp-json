import { MutationTree } from "vuex";
import * as types from "./mutation-types";
import Vue from "vue";

export const mutations: MutationTree<any> = {
  [types.SET_POST_CONTENT](state, { data, slotName, type }) {
    if (!state.types.hasOwnProperty(type)) {
      Vue.set(state.types, type, {});
    }
    Vue.set(state.types[type], slotName, Array.isArray(data) ? data[0] : data);
  }
};
