import * as tslib_1 from "tslib";
import TheRoot from './components/TheRoot.js';
import { routes } from './router/routes';
import registerPlugin from './plugin/registerPlugin';
// Initializers
import * as vuex from './plugin/initializers/store';
export var ModulePrefix = 'wp';
export default {
    install: function (Vue, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var store, manualVuexMode, _i, _a, plugin, router;
            return tslib_1.__generator(this, function (_b) {
                try {
                    // Config
                    // Is it proper
                    if (!('config' in options)) {
                        throw new Error('No config provided!');
                    }
                    if (!('url' in options.config)) {
                        throw new Error('No API\'s URL provided!');
                    }
                    if (!('lang' in options.config)) {
                        throw new Error('No lang provided!');
                    }
                    // Register it in app
                    Vue.prototype.$wp = {};
                    Vue.prototype.$wp.config = options.config;
                    // Do we have store?
                    if (!('store' in options)) {
                        throw new Error('No VueX store provided in config!');
                    }
                    store = void 0;
                    manualVuexMode = options.store === 'manual';
                    if (!manualVuexMode) {
                        store = options.store;
                    }
                    // Global access to TheRoot component
                    Vue.component('Sections', TheRoot);
                    // Register VueX modules
                    if (!manualVuexMode)
                        vuex.registerModules(store);
                    if ('plugins' in options) {
                        // Register plugins
                        if (Array.isArray(options.plugins)) {
                            for (_i = 0, _a = options.plugins; _i < _a.length; _i++) {
                                plugin = _a[_i];
                                registerPlugin(Vue, plugin, store);
                            }
                        }
                        else {
                            registerPlugin(Vue, options.plugins, store);
                        }
                    }
                    if (!manualVuexMode) {
                        vuex.loadBase(store.dispatch, options.config.menus);
                        vuex.setLang(store.commit, options.config.lang);
                        vuex.setConfig(store.commit, options.config);
                    }
                    // Do we have router?
                    if (!('router' in options)) {
                        throw new Error('No router instance provided in config!');
                    }
                    router = options.router;
                    // const customPage = Vue.prototype.$wp.layouts && Vue.prototype.$wp.layouts.page 
                    //     ? Vue.prototype.$wp.layouts.page 
                    //     : undefined
                    //   const customPost = Vue.prototype.$wp.layouts && Vue.prototype.$wp.layouts.post 
                    //     ? Vue.prototype.$wp.layouts.post
                    //     : undefined
                    if (router !== 'manual')
                        router.addRoutes(routes());
                    // Set lang in html
                    // if(document) {
                    //   const html = document.querySelector('html')
                    //   if(html) {
                    //     html.setAttribute('lang', options.config.lang)
                    //   }
                    //   const el = document.createElement('link');
                    //   el.setAttribute('rel', 'alternate')
                    //   const url = window.location.origin.substr(-1) === '/'
                    //     ? window.location.origin
                    //     : window.location.origin + '/'
                    //   el.setAttribute('href', `${url}${options.config.lang}`)
                    //   el.setAttribute('hreflang', `${options.config.lang}`)
                    //   document.head.appendChild(el)
                    // }
                }
                catch (e) {
                    console.error(e, e.message);
                }
                return [2 /*return*/];
            });
        });
    }
};
//# sourceMappingURL=index.js.map