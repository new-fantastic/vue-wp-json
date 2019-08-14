import { MutationTree } from "vuex";
import * as types from "./mutation-types";
import Vue from "vue";

export const mutations: MutationTree<any> = {
  [types.SET_POST_CONTENT](state, { data, slotName, type }) {
    if (!state.types.hasOwnProperty(type)) {
      Vue.set(state.types, type, {});
    }

    if (Array.isArray(data)) {
      if (data.length > 1) {
        for (let post of data) {
          Vue.set(state.types[type], post.slug, post)
        }
      } else {
        Vue.set(state.types[type], slotName, data[0]);
      }
    } else {
      Vue.set(state.types[type], slotName, data);
    }
  }
};
