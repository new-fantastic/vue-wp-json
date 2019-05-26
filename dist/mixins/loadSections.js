import * as tslib_1 from "tslib";
import Vue from 'vue';
import { ContentTypes, FetchHookTypes } from '../types';
import { ModulePrefix } from '../index';
export default (function (createdOrAsync, customConfig) {
    if (createdOrAsync === void 0) { createdOrAsync = FetchHookTypes.Created; }
    var mixin = {};
    if (createdOrAsync === FetchHookTypes.Created) {
        // Appears in Vue version
        mixin.computed = {
            wpData: function () {
                var config = this.$wp.config;
                return this.$store.state[ModulePrefix + "_page"].page[config.pages[this.$route.name]]
                    ? this.$store.state[ModulePrefix + "_page"].page[config.pages[this.$route.name]]
                    : null;
            }
        };
        mixin.created = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var config;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            config = customConfig ? customConfig : this.$wp.config;
                            if (!config.pages[this.$route.name]) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.$store.dispatch(ModulePrefix + "_page/load", {
                                    slug: config.pages[this.$route.name],
                                    type: ContentTypes.Page
                                })];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
    }
    if (createdOrAsync === FetchHookTypes.AsyncData) {
        // Appears in Nuxt version
        mixin.asyncData = function (_a) {
            var store = _a.store, route = _a.route;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var config, countWpData, wpData;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            config = customConfig ? customConfig : store.state[ModulePrefix + "_config"].config;
                            if (!config.pages[route.name]) return [3 /*break*/, 2];
                            return [4 /*yield*/, store.dispatch(ModulePrefix + "_page/load", {
                                    slug: config.pages[route.name],
                                    type: ContentTypes.Page
                                })];
                        case 1:
                            _b.sent();
                            _b.label = 2;
                        case 2:
                            countWpData = function () {
                                return store.state[ModulePrefix + "_page"].page[config.pages[route.name]]
                                    ? store.state[ModulePrefix + "_page"].page[config.pages[route.name]]
                                    : null;
                            };
                            wpData = countWpData();
                            return [2 /*return*/, {
                                    wpData: wpData
                                }];
                    }
                });
            });
        };
    }
    return Vue.extend(mixin);
});
//# sourceMappingURL=loadSections.js.map