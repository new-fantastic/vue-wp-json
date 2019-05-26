import * as tslib_1 from "tslib";
import axios from 'axios';
import Vue from 'vue';
import * as types from './mutation-types';
import { UrlCreator } from '../../util/UrlCreator';
var typeBaseUrl = '/wp-json/wp/v2/pages?slug=';
export var actions = {
    load: function (_a, _b) {
        var commit = _a.commit;
        var slug = _b.slug;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var config, base, _i, _c, filter, response, err_1;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        config = Vue.prototype.$wp.config;
                        base = new UrlCreator(config.url, [typeBaseUrl, slug]);
                        if (Vue.prototype.$wp.api
                            && Vue.prototype.$wp.api.page) {
                            for (_i = 0, _c = Vue.prototype.$wp.api.page; _i < _c.length; _i++) {
                                filter = _c[_i];
                                filter(base);
                            }
                        }
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios.get(base.url)];
                    case 2:
                        response = _d.sent();
                        if (response.data.status == 404 || response.data.length < 1) {
                            throw new Error('Endpoint ain\'t ready');
                        }
                        commit(types.SET_PAGE_CONTENT, {
                            data: response.data,
                            slotName: slug
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _d.sent();
                        commit(types.SET_PAGE_CONTENT, {
                            data: false,
                            slotName: slug
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
};
//# sourceMappingURL=actions.js.map