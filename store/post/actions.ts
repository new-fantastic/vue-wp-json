import axios from "axios";
import Vue from "vue";

import * as types from "./mutation-types";
import { ActionTree } from "vuex";

import { UrlCreator } from "../../util/UrlCreator";

export const actions: ActionTree<Object, any> = {
  async load({ commit, rootState }, { slug, type = "pages", embed = false }) {
    const config = Vue.prototype.$wp.config;
    let typeBaseUrl = `/wp-json/wp/v2/${type}`;
    if (
      Vue.prototype.$wp.requestPrefix &&
      Vue.prototype.$wp.requestPrefix.length > 0
    ) {
      let prefix = Vue.prototype.$wp.requestPrefix;
      if (prefix.endsWith("/")) {
        prefix = prefix.substring(0, -1);
      }
      if (prefix.startsWith("/")) {
        prefix = prefix.substr(1);
      }
      typeBaseUrl = `${prefix}${typeBaseUrl}`;
    }

    const embedString = embed ? "_embed" : "";

    const halfBase = config.url.endsWith("/")
      ? config.url.substr(0, config.url.length - 1) + typeBaseUrl
      : config.url + typeBaseUrl;

    const base =
      slug === ""
        ? `${halfBase}${embedString ? "?" + embedString : embedString}`
        : `${halfBase}?slug=${slug}${
            embedString ? "&" + embedString : embedString
          }`;

    if (Vue.prototype.$wp.api && Vue.prototype.$wp.api.post) {
      for (let filter of Vue.prototype.$wp.api.post) {
        filter(base);
      }
    }

    try {
      // if(!(slug in state.post && state.post[slug] && state.post[slug] !== false)) {
      const finalUrl = config.url.endsWith("/")
        ? config.url.substr(0, config.url.length - 1) + base
        : config.url + base;

      const response = await axios.get(config.url + base);

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
