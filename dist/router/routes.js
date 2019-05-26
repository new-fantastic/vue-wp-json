var lazyLoader = function () { return import('../pages/Loader.vue'); };
var loaderPath = '../pages/Loader.vue';
export var pagePrefix = 'page';
export var postPrefix = 'post';
export var routes = function (path) {
    if (path === void 0) { path = false; }
    if (!path) {
        return [
            { name: pagePrefix, path: "/" + pagePrefix + "/:slug", component: lazyLoader },
            { name: postPrefix, path: "/" + postPrefix + "/:slug", component: lazyLoader }
        ];
    }
    else {
        return [
            { name: pagePrefix, path: "/" + pagePrefix + "/:slug", component: loaderPath },
            { name: postPrefix, path: "/" + postPrefix + "/:slug", component: loaderPath }
        ];
    }
};
//# sourceMappingURL=routes.js.map