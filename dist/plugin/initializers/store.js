var _this = this;
import * as tslib_1 from "tslib";
import { ModulePrefix } from '../../index';
import { media } from '../../store/media';
import { lang } from '../../store/lang';
import { post } from '../../store/post';
import { page } from '../../store/page';
import { menu } from '../../store/menu';
import { meta } from '../../store/meta';
import { config } from '../../store/config';
import { layouts } from '../../store/layouts';
import { SET_LANG } from '../../store/lang/mutation-types';
import { SET_CONFIG } from '../../store/config/mutation-types';
export var registerModules = function (store) {
    store.registerModule(ModulePrefix + "_lang", lang);
    store.registerModule(ModulePrefix + "_media", media);
    store.registerModule(ModulePrefix + "_menu", menu);
    store.registerModule(ModulePrefix + "_meta", meta);
    store.registerModule(ModulePrefix + "_page", page);
    store.registerModule(ModulePrefix + "_post", post);
    store.registerModule(ModulePrefix + "_config", config);
    store.registerModule(ModulePrefix + "_layouts", layouts);
};
export var loadBase = function (dispatch, menuSlugs) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.all([
                    dispatch(ModulePrefix + "_menu/load", {
                        menuSlugs: menuSlugs
                    }),
                    dispatch(ModulePrefix + "_meta/load"),
                    dispatch(ModulePrefix + "_media/load")
                ])];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
export var setLang = function (commit, lang) {
    commit(ModulePrefix + "_lang/" + SET_LANG, lang);
};
export var setConfig = function (commit, config) {
    commit(ModulePrefix + "_config/" + SET_CONFIG, config);
};
//# sourceMappingURL=store.js.map