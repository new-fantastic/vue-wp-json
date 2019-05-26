var _a;
import * as types from './mutation-types';
export var mutations = (_a = {},
    _a[types.SET_META_CONTENT] = function (state, _a) {
        var data = _a.data;
        state.meta = Array.isArray(data) ? data[0] : data;
    },
    _a);
//# sourceMappingURL=mutations.js.map