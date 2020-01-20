import { VuexModulePost, WordpressOption } from './../../types/index';
import { ModulePrefix } from './../../index';
import axios from "axios";

import * as types from "./mutation-types";
import { ActionTree } from "vuex";

const currentlyFetching = {}

const beforeMark = (baseUrl: string, content: string) => {
  return `${baseUrl.includes('?') ? '&' : '?'}${content}`
}

export const actions: ActionTree<VuexModulePost, any> = {
  async load({ commit, rootState, state }, {
    slug,
    type = 'pages',
    embed = false,
    per_page = null,
    fields = [],
    beforeSave = null,
    beforeRequest = null,
    beforeSaveFailed = null,
    forceRefetch = false
  }: WordpressOption) {
    const config = rootState[`${ModulePrefix}_config`];

    let typeBaseUrl = `/wp-json/wp/v2/${type}`;
    let requestsAmount = 1

    if (
      config.requestPrefix &&
      config.requestPrefix.length > 0
    ) {
      let prefix = config.requestPrefix;
      if (prefix.endsWith("/")) {
        prefix = prefix.substring(0, -1);
      }
      if (prefix.startsWith("/")) {
        prefix = prefix.substr(1);
      }
      typeBaseUrl = `/${prefix}${typeBaseUrl}`;
    }

    const embedString = embed ? "_embed" : "";

    const halfBase = config.url.endsWith("/")
      ? config.url.substr(0, config.url.length - 1) + typeBaseUrl
      : config.url + typeBaseUrl;

    let base =
      slug === ""
        ? `${halfBase}${embedString ? "?" + embedString : embedString}`
        : `${halfBase}?slug=${slug}${
            embedString ? "&" + embedString : embedString
          }`;

    if (!!fields && !!fields.length) {
      for (let field of (Array.isArray(fields) ? fields : [fields])) {
        base += beforeMark(base, `_fields[]=${field}`)
      }
    }
    if (!!fields.length && !fields.includes('slug')) {
      base += beforeMark(base, '_fields[]=slug')
    }

    // Pagination
    if (!!per_page) {
      if (per_page > 100) {
        requestsAmount = Math.max(1, Math.ceil(per_page / 100))
        per_page = 100
      }
      if (config.debugger) {
        if (per_page > 100) {
          console.log(`[VueWordpress][Debugger] Per_page's maximum value is 100. It is limit from teh WP Api. So I'll do a ${requestsAmount} requests`)
        } else if (per_page < 1) {
          console.log(`[VueWordpress][Debugger] Per_page's minimum value is 1. I've changed it for you to prevent error`)
        }
      }
      base += beforeMark(base, `per_page=${per_page}`)
    }

    try {

      if ((!state.types[type] || !state.types[type][(<string>slug)]) || forceRefetch) {
        
        if (currentlyFetching && !currentlyFetching[type]) {
          currentlyFetching[type] = {}
        }

        if (currentlyFetching && currentlyFetching[type] && currentlyFetching[type][slug]) {
          if (config.debugger) {
            const requestUrl = beforeRequest ? await beforeRequest(base) : base
            console.log(`[VueWordpress][Debugger] Omits ${requestUrl} because it is being fetched currently`)
          }
          return;
        }
        
        const requestUrl = beforeRequest ? await beforeRequest(base) : base
        const requests = []
 
        for (let i = 1; i <= requestsAmount; i++) {
          requests.push(axios.get(requestUrl + beforeMark(requestUrl, `page=${i}`)))
        }
        if (!currentlyFetching[type][slug]) {
          currentlyFetching[type][slug] = true
        }

        const responses = await Promise.all(requests)

        delete currentlyFetching[type][slug]

        let fullResponse = []

        for (let [index, response] of Object.entries(responses)) {
          if (config.debugger) {
            console.log(`[VueWordpress][Debugger] I've just fetched ${requestUrl + beforeMark(requestUrl, `page=${+index+1}`)}`)
          }
          if ((<any>response).data.status == 404) {
            throw new Error(`[VueWordpress] Error 404 in ${base} endpoint`);
          }
  
          if ((<any>response).data.length < 1) {
            throw new Error(`[VueWordpress] Empty data in ${base} endpoint`);
          }

          fullResponse.push((<any>response).data)
          if (config.debugger && response.data.some(page => !page.slug)) {
            console.log(`[VueWordpress][Debugger] Some fetched page does not have slug inside. It will cause problem with saving`)
          }
          
        }
        
        fullResponse = [].concat.apply([], fullResponse)
        const data = beforeSave ? await beforeSave(fullResponse) : fullResponse

        commit(types.SET_POST_CONTENT, {
          data,
          slotName: slug,
          type
        });

        return data

      } else if (config.debugger) {
        console.log(`[VueWordpress][Debugger] Did not fetch ${base} because it is yet in the store`)
      }

    } catch (err) {

      delete currentlyFetching[type][slug]

      if (config.debugger) {
        console.log(`[VueWordpress][Debugger] Could not fetch because of error`, err)
      }

      const data = beforeSaveFailed ? await beforeSaveFailed() : false

      commit(types.SET_POST_CONTENT, {
        data,
        slotName: slug,
        type
      });

      return data
    }
  }
};
