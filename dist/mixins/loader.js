var _this = this;
import * as tslib_1 from "tslib";
import { ContentTypes } from '../types';
import { ModulePrefix } from '../index';
import { pagePrefix } from '../router/routes';
var fetchData = function (store, route) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var short, prefix;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                short = route.name === pagePrefix
                    ? 'page'
                    : 'post';
                prefix = ModulePrefix + "_" + short;
                return [4 /*yield*/, store.dispatch(prefix + "/load", {
                        slug: route.params.slug,
                        type: short === 'page'
                            ? ContentTypes.Page
                            : ContentTypes.Post
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, (function () {
                        var result = store.state[prefix][short][route.params.slug];
                        return result || result === false
                            ? result
                            : null;
                    })()];
        }
    });
}); };
var downloadedData = false;
export default {
    watch: {
        $route: function (to) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var short;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            short = to.name === pagePrefix
                                ? ModulePrefix + "_page"
                                : ModulePrefix + "_post";
                            return [4 /*yield*/, this.$store.dispatch(short + "/load", {
                                    slug: to.params.slug,
                                    type: short === ModulePrefix + "_page"
                                        ? ContentTypes.Page
                                        : ContentTypes.Post
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
    },
    created: function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var nuxtClientCondition, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        nuxtClientCondition = process
                            && 'server' in process
                            && process.server;
                        if (!(!nuxtClientCondition && !downloadedData && this && (this.wpData === null || this.wpData === undefined))) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, fetchData(this.$store, this.$route)];
                    case 1:
                        _a.wpData = _b.sent();
                        if (!this.wpData) {
                            this.$router.push('/');
                        }
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    },
    asyncData: function (_a) {
        var store = _a.store, route = _a.route, redirect = _a.redirect;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var wpData;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, fetchData(store, route)];
                    case 1:
                        wpData = _b.sent();
                        if (!wpData) {
                            redirect('/');
                        }
                        else {
                            downloadedData = true;
                        }
                        return [2 /*return*/, {
                                wpData: wpData
                            }];
                }
            });
        });
    }
};
//# sourceMappingURL=loader.js.map