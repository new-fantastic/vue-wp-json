import * as tslib_1 from "tslib";
import Vue from 'vue';
import axios from 'axios';
import * as types from './mutation-types';
import { UrlCreator } from '../../util/UrlCreator';
var typeBaseUrl = '/wp-json/wp/v2/media/';
export var actions = {
    load: function (_a) {
        var commit = _a.commit;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var config, base, _i, _b, filter, response, err_1;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        config = Vue.prototype.$wp.config;
                        base = new UrlCreator(config.url, [typeBaseUrl]);
                        if (Vue.prototype.$wp.api
                            && Vue.prototype.$wp.api.media) {
                            for (_i = 0, _b = Vue.prototype.$wp.api.media; _i < _b.length; _i++) {
                                filter = _b[_i];
                                filter(base);
                            }
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios.get(base.url)];
                    case 2:
                        response = _c.sent();
                        if (response.data.status == 404) {
                            throw new Error('Endpoint ain\'t ready');
                        }
                        commit(types.SET_MEDIA_CONTENT, {
                            data: response.data
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