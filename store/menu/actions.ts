import axios from "axios";
import Vue from "vue";

import * as types from "./mutation-types";
import { ActionTree } from "vuex";

import { UrlCreator } from "../../util/UrlCreator";

const typeBaseUrl = "/wp-json/menus/v1/menus";

export const actions: ActionTree<Object, any> = {
  async load({ commit }, { menuSlugs }) {
    if (menuSlugs === false) {
      return;
    }

    const config = Vue.prototype.$wp.config;

    // const part = lang == 'pl' ? '' : '/' + lang
    const base = new UrlCreator(config.url, [typeBaseUrl]);

    if (Vue.prototype.$wp.api && Vue.prototype.$wp.api.menu) {
      for (let filter of Vue.prototype.$wp.api.menu) {
        filter(base);
      }
    }

    const fixUrls = itemsBefore => {
      const fixedItems = [];

      // If itemsBefore is Object, we have to convert it to array
      const items = Array.isArray(itemsBefore)
        ? itemsBefore
        : Object.values(itemsBefore);

      for (let item of items) {
        const prefix = item.object == "page" ? "page" : "post";

        fixedItems.push({
          ...item,
          url: item.url.replace(config.url, k => {
            return config.url.substr(-1) === "/" ? `/${prefix}/` : `${prefix}/`;
          })
        });
      }

      return fixedItems;
    };

    try {
      if (Array.isArray(menuSlugs)) {
        // Few menus in paralel
        const requests = [];
        for (let slug of menuSlugs) {
          base.addAtTheEnd(slug);
          requests.push(axios.get(base.url));
          base.removeFromTheEnd();
        }
        let response = await Promise.all(requests);
        response.forEach(c => {
          commit(types.SET_MENU_CONTENT, {
            data: {
              ...c.data,
              items: fixUrls(c.data.items)
            },
            slotName: c.data.slug
          });
        });
      } else if (typeof menuSlugs === "string") {
        base.addAtTheEnd(menuSlugs);
        let response = await axios.get(base.url);
        commit(types.SET_MENU_CONTENT, {
          data: {
            ...response.data,
            items: fixUrls(response.data.items)
          },
          slotName: menuSlugs
        });
      } else {
        // if (menuSlugs === true) {
        let firstResponse = await axios.get(base.url);
        const slugs = firstResponse.data.map(v => v.slug);

        const requests = [];
        for (let slug of slugs) {
          base.addAtTheEnd(slug);
          requests.push(axios.get(base.url));
          base.removeFromTheEnd();
        }
        let response = await Promise.all(requests);
        response.forEach(c => {
          commit(types.SET_MENU_CONTENT, {
            data: {
              ...c.data,
              items: fixUrls(c.data.items)
            },
            slotName: c.data.slug
          });
        });
        // }
      }
    } catch (err) {
      console.error(err);
    }
  }
};
