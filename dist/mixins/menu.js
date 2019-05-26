import camelCase from 'lodash/camelCase';
export default (function (slug) {
    var _a;
    var menuSlug = camelCase("menu-" + slug);
    var menuSlugItems = menuSlug + "Items";
    return {
        computed: (_a = {},
            _a[menuSlug] = function () {
                return this.$store.state.wp_rest_content.menus[slug];
            },
            _a[menuSlugItems] = function () {
                return this[menuSlug].items;
            },
            _a)
    };
});
//# sourceMappingURL=menu.js.map