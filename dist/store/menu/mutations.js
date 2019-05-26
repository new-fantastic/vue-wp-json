import * as tslib_1 from "tslib";
var _a;
import * as types from './mutation-types';
export var mutations = (_a = {},
    _a[types.SET_MENU_CONTENT] = function (state, _a) {
        var _b;
        var data = _a.data, slotName = _a.slotName;
        state.menu = tslib_1.__assign({}, state.menu, (_b = {}, _b[slotName] = Array.isArray(data) ? data[0] : data, _b));
    },
    _a);
//# sourceMappingURL=mutations.js.map