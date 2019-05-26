var _this = this;
import * as tslib_1 from "tslib";
import { SET_LAYOUT } from '../store/layouts/mutation-types';
import { ModulePrefix } from '../index';
export default (function (Vue, p, store) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var x, enviroment, plugin, _i, _a, _b, key, value, value, value, _c, _d, _e, key, value;
    return tslib_1.__generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                x = p;
                enviroment = 'vue';
                if (!(typeof p === 'string')) return [3 /*break*/, 2];
                return [4 /*yield*/, import("../../vue-wp-json-" + p + "/index.js")];
            case 1:
                x = _f.sent();
                enviroment = 'nuxt';
                _f.label = 2;
            case 2:
                if (Object.keys(x).includes('default')) {
                    plugin = x.default;
                }
                else {
                    plugin = x;
                }
                if ('blocks' in plugin) {
                    for (_i = 0, _a = Object.entries(plugin.blocks); _i < _a.length; _i++) {
                        _b = _a[_i], key = _b[0], value = _b[1];
                        Vue.component(key, value);
                    }
                }
                if ('layouts' in plugin) {
                    Vue.prototype.$wp.layouts = {};
                    if ('Section' in plugin.layouts) {
                        Vue.prototype.$wp.layouts.section = true;
                        Vue.component('AlternativeSection', plugin.layouts.Section);
                    }
                    if ('Column' in plugin.layouts) {
                        Vue.prototype.$wp.layouts.column = true;
                        Vue.component('AlternativeColumn', plugin.layouts.Column);
                    }
                    if ('Page' in plugin.layouts) {
                        if (enviroment === 'nuxt')
                            Vue.prototype.$wp.layouts.page = 'AlternativePage';
                        else
                            Vue.prototype.$wp.layouts.page = plugin.layouts.Page;
                        Vue.component('AlternativePage', plugin.layouts.Page);
                        value = void 0;
                        if (enviroment === 'nuxt')
                            value = 'AlternativePage';
                        else
                            value = plugin.layouts.Page;
                        if (store && store.commit) {
                            store.commit(ModulePrefix + "_layouts/" + SET_LAYOUT, {
                                key: 'page',
                                value: value
                            });
                        }
                        else if (plugin.store) {
                            plugin.store.commit(ModulePrefix + "_layouts/" + SET_LAYOUT, {
                                key: 'page',
                                value: value
                            });
                        }
                    }
                    if ('Post' in plugin.layouts) {
                        if (enviroment === 'nuxt')
                            Vue.prototype.$wp.layouts.post = 'AlternativePost';
                        else
                            Vue.prototype.$wp.layouts.post = plugin.layouts.Post;
                        Vue.component('AlternativePost', plugin.layouts.Post);
                        value = void 0;
                        if (enviroment === 'nuxt')
                            value = 'AlternativePost';
                        else
                            value = plugin.layouts.Post;
                        if (store && store.commit) {
                            store.commit(ModulePrefix + "_layouts/" + SET_LAYOUT, {
                                key: 'post',
                                value: value
                            });
                        }
                        else if (plugin.store) {
                            plugin.store.commit(ModulePrefix + "_layouts/" + SET_LAYOUT, {
                                key: 'post',
                                value: value
                            });
                        }
                    }
                }
                if ('middleware' in plugin) {
                    if ('api' in plugin.middleware) {
                        Vue.prototype.$wp.api = {};
                        for (_c = 0, _d = Object.entries(plugin.middleware.api); _c < _d.length; _c++) {
                            _e = _d[_c], key = _e[0], value = _e[1];
                            if (!Vue.prototype.$wp.api[key]) {
                                Vue.prototype.$wp.api[key] = [];
                            }
                            Vue.prototype.$wp.api[key].push(value);
                        }
                    }
                    if ('root' in plugin.middleware) {
                        if ('validator' in plugin.middleware.root) {
                            if (!Vue.prototype.$wp.validators) {
                                Vue.prototype.$wp.validators = {};
                            }
                            if (!('root' in Vue.prototype.$wp.validators)) {
                                Vue.prototype.$wp.validators.root = [];
                            }
                            Vue.prototype.$wp.validators.root.push(plugin.middleware.root.validator);
                        }
                        if ('interpret' in plugin.middleware.root) {
                            if (!Vue.prototype.$wp.interpret) {
                                Vue.prototype.$wp.interpret = {};
                            }
                            if (!('root' in Vue.prototype.$wp.interpret)) {
                                Vue.prototype.$wp.interpret.root = [];
                            }
                            Vue.prototype.$wp.interpret.root.push(plugin.middleware.root.interpret);
                        }
                    }
                    if ('section' in plugin.middleware) {
                        if ('interpret' in plugin.middleware.section) {
                            if (!Vue.prototype.$wp.interpret) {
                                Vue.prototype.$wp.interpret = {};
                            }
                            if (!('section' in Vue.prototype.$wp.interpret)) {
                                Vue.prototype.$wp.interpret.section = [];
                            }
                            Vue.prototype.$wp.interpret.section.push(plugin.middleware.section.interpret);
                        }
                    }
                }
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=registerPlugin.js.map