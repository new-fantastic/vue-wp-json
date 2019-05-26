import * as tslib_1 from "tslib";
var _a;
import * as types from './mutation-types';
export var mutations = (_a = {},
    _a[types.SET_POST_CONTENT] = function (state, _a) {
        var _b;
        var data = _a.data, slotName = _a.slotName;
        state.post = tslib_1.__assign({}, state.post, (_b = {}, _b[slotName] = Array.isArray(data) ? data[0] : data, _b));
    },
    _a);
//# sourceMappingURL=mutations.js.map