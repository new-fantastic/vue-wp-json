import * as tslib_1 from "tslib";
import axios from 'axios';
import Vue from 'vue';
import * as types from './mutation-types';
import { UrlCreator } from '../../util/UrlCreator';
var typeBaseUrl = '/wp-json';
export var actions = {
    load: function (_a) {
        var commit = _a.commit;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var config, base, _i, _b, filter, data, err_1;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        config = Vue.prototype.$wp.config;
                        base = new UrlCreator(config.url, [typeBaseUrl]);
                        if (Vue.prototype.$wp.api
                            && Vue.prototype.$wp.api.meta) {
                            for (_i = 0, _b = Vue.prototype.$wp.api.meta; _i < _b.length; _i++) {
                                filter = _b[_i];
                                filter(base);
                            }
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios.get(base.url)];
                    case 2:
                        data = (_c.sent()).data;
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
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _c.sent();
                        console.error(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
};
//# sourceMappingURL=actions.js.map