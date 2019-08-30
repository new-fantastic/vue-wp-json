import axios from "axios";
import Vue from "vue";

import * as types from "./mutation-types";
import { ActionTree } from "vuex";

import { UrlCreator } from "../../util/UrlCreator";

let typeBaseUrl = "/wp-json";

export const actions: ActionTree<Object, any> = {
  async load({ commit }) {
    const config = Vue.prototype.$wp.config;

    if (Vue.prototype.$wp.requestPrefix) {
      let prefix = Vue.prototype.$wp.requestPrefix;
      if (prefix.endsWith("/")) {
        prefix = prefix.substring(0, -1);
      }
      if (prefix.startsWith("/")) {
        prefix = prefix.substr(1);
      }
      typeBaseUrl = `/${prefix}${typeBaseUrl}`;
    }

    const base = new UrlCreator(config.url, [typeBaseUrl]);

    if (Vue.prototype.$wp.api && Vue.prototype.$wp.api.meta) {
      for (let filter of Vue.prototype.$wp.api.meta) {
        filter(base);
      }
    }

    try {
      const { data } = await axios.get(base.url);
      commit(types.SET_META_CONTENT, {
        data: {
          name: data.name,
          description: data.description,
          url: data.url,
          home: data.home,
          gmt_offset: data.gmt_offset,
          timezone_string: data.timezone_string
        }
      });
    } catch (err) {
      console.error(err);
    }
  }
};
