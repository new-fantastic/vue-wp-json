// Initializers
import * as vuex from "./plugin/initializers/store";

import MetaInfo from "vue-meta-info";
import { PluginConfig } from 'types'
import { VueConstructor } from 'vue';

export const ModulePrefix = "wp";

export default {
  async install(Vue: VueConstructor, options: PluginConfig) {
    try {
      // Config
      // Is it proper
      // if (!('config' in options)) {
      //   throw new Error('No config provided!')
      // }
      if (!("url" in options)) {
        throw new Error("No API's URL provided!");
      }
      if (!("lang" in options)) {
        throw new Error("No lang provided!");
      }
      // Register it in app
      Vue.use(MetaInfo);
      Vue.prototype.$wp = {};
      Vue.prototype.$wp.config = options;

      if ("requestPrefix" in options) {
        Vue.prototype.$wp.requestPrefix = options.requestPrefix;
      }

      // Do we have store?
      if (!("store" in options)) {
        throw new Error("No VueX store provided in config!");
      }

      let store;
      const manualVuexMode = options.store === true;
      if (!manualVuexMode) {
        store = options.store;
        vuex.registerModules(store);

        vuex.setConfig(store.commit, {
          url: options.url,
          lang: options.lang,
          ...(options.requestPrefix ? { requestPrefix: options.requestPrefix } : {}),
          ...(options.menus ? { menus: options.menus } : {}),
          ...(options.titleTemplate ? { titleTemplate: options.titleTemplate } : {}),
          ...(options.debugger ? { debugger: options.debugger } : {})
        });

        await vuex.loadBase(
          store.dispatch,
          options.hasOwnProperty("menus") ? options.menus : true
        );
      }

      // Set lang in html
      const nuxtServer = process && (<any>process).server;

      if (!nuxtServer && document !== undefined) {
        const html = document.querySelector("html");

        if (html) {
          html.setAttribute("lang", options.lang);
        }

        const el = document.createElement("link");
        el.setAttribute("rel", "alternate");

        const url =
          window.location.origin.substr(-1) === "/"
            ? window.location.origin
            : window.location.origin + "/";
        el.setAttribute("href", `${url}${options.lang}`);
        el.setAttribute("hreflang", `${options.lang}`);

        document.head.appendChild(el);
      }

      // Global title template
      if ("titleTemplate" in options) {
        Vue.prototype.$wp.titleTemplate = options.titleTemplate;
      }
    } catch (e) {
      console.error(e, e.message);
    }
  }
};
