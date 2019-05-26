export var prepareColumnToRow = function (base) {
    if (!base.content || !('rendered' in base.content)) {
        return false;
    }
    base.cmpName = 'Default';
    base.columnAmount = 1;
    return base;
};
//# sourceMappingURL=Layout.js.map