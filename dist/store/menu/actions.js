import * as tslib_1 from "tslib";
import axios from 'axios';
import Vue from 'vue';
import * as types from './mutation-types';
import { UrlCreator } from '../../util/UrlCreator';
var typeBaseUrl = '/wp-json/menus/v1/menus';
export var actions = {
    load: function (_a, _b) {
        var commit = _a.commit;
        var menuSlugs = _b.menuSlugs;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var config, base, _i, _c, filter, fixUrls, requests, _d, menuSlugs_1, slug, response, response, err_1;
            return tslib_1.__generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (menuSlugs === false || !menuSlugs) {
                            return [2 /*return*/];
                        }
                        config = Vue.prototype.$wp.config;
                        base = new UrlCreator(config.url, [typeBaseUrl]);
                        if (Vue.prototype.$wp.api
                            && Vue.prototype.$wp.api.menu) {
                            for (_i = 0, _c = Vue.prototype.$wp.api.menu; _i < _c.length; _i++) {
                                filter = _c[_i];
                                filter(base);
                            }
                        }
                        fixUrls = function (items) {
                            var fixedItems = [];
                            var _loop_1 = function (item) {
                                var prefix = item.object == 'page'
                                    ? 'page'
                                    : 'post';
                                fixedItems.push(tslib_1.__assign({}, item, { url: item.url.replace(config.url, function (k) {
                                        return config.url.substr(-1) === '/'
                                            ? "/" + prefix + "/"
                                            : prefix + "/";
                                    }) }));
                            };
                            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                                var item = items_1[_i];
                                _loop_1(item);
                            }
                            return fixedItems;
                        };
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 6, , 7]);
                        if (!Array.isArray(menuSlugs)) return [3 /*break*/, 3];
                        requests = [];
                        for (_d = 0, menuSlugs_1 = menuSlugs; _d < menuSlugs_1.length; _d++) {
                            slug = menuSlugs_1[_d];
                            base.addAtTheEnd(slug);
                            requests.push(axios.get(base.url));
                            base.removeFromTheEnd();
                        }
                        return [4 /*yield*/, Promise.all(requests)];
                    case 2:
                        response = _e.sent();
                        response.forEach(function (c) {
                            commit(types.SET_MENU_CONTENT, {
                                data: tslib_1.__assign({}, c.data, { items: fixUrls(c.data.items) }),
                                slotName: c.data.slug
                            });
                        });
                        return [3 /*break*/, 5];
                    case 3:
                        base.addAtTheEnd(menuSlugs);
                        return [4 /*yield*/, axios.get(base.url)];
                    case 4:
                        response = _e.sent();
                        commit(types.SET_MENU_CONTENT, {
                            data: response.data,
                            slotName: menuSlugs
                        });
                        _e.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_1 = _e.sent();
                        console.error(err_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    }
};
//# sourceMappingURL=actions.js.map