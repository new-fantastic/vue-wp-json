import { Module } from "vuex";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { state } from "./state";
import { getters } from "./getters";

export const post: Module<Object, any> = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
