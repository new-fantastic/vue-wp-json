var _a;
import * as types from './mutation-types';
export var mutations = (_a = {},
    _a[types.SET_MEDIA_CONTENT] = function (state, _a) {
        var data = _a.data;
        // Filter array to item.id => item.data
        var obj = {};
        data.forEach(function (item) {
            obj[item.id] = item;
        });
        state.media = obj;
    },
    _a);
//# sourceMappingURL=mutations.js.map