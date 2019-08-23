import axios from "axios";
import Vue from "vue";

import * as types from "./mutation-types";
import { ActionTree } from "vuex";

export const actions: ActionTree<Object, any> = {
  async load({ commit }, { slug, type = "pages", embed = false }) {
    const config = Vue.prototype.$wp.config;
    const typeBaseUrl = `/wp-json/wp/v2/${type}`;

    const embedString = embed ? '_embed' : ''

    const base = slug === ""
      ? `${config.url}${typeBaseUrl}${embedString ? ('?'+embedString) : embedString}`
      : `${config.url}${typeBaseUrl}?slug=${slug}${embedString ? ('&'+embedString) : embedString}`;

    if (Vue.prototype.$wp.api && Vue.prototype.$wp.api.post) {
      for (let filter of Vue.prototype.$wp.api.post) {
        filter(base);
      }
    }

    try {
      // if(!(slug in state.post && state.post[slug] && state.post[slug] !== false)) {
      const response = await axios.get(base);

      if (response.data.status == 404 || response.data.length < 1) {
        throw new Error("Endpoint ain't ready");
      }

      commit(types.SET_POST_CONTENT, {
        data: response.data,
        slotName: slug,
        type
      });
      // }
    } catch (err) {
      commit(types.SET_POST_CONTENT, {
        data: false,
        slotName: slug,
        type
      });
    }
  }
};
