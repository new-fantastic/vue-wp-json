import { ContentTypes, FetchHookTypes } from '../../types';
import meta from '../../mixins/meta';
export default (function (contentType, createdOrAsync, notFoundUrl) {
    if (createdOrAsync === void 0) { createdOrAsync = FetchHookTypes.Created; }
    if (notFoundUrl === void 0) { notFoundUrl = 'page-not-found'; }
    var type = contentType === ContentTypes.Page
        ? 'website'
        : 'article';
    var mixin = {
        components: {
            Sections: function () { return import("../../components/TheRoot.js"); }
        },
        data: function () {
            return {
                wpData: null
            };
        },
        props: {
            wpDataFallback: Object
        },
        watch: {
            wpData: {
                immediate: true,
                handler: function (n) {
                    if (n === false && this.wpDataFallback === null) {
                        this.$router.push(notFoundUrl);
                    }
                }
            },
            wpDataFallback: {
                immediate: true,
                handler: function (n) {
                    if (n === false && this.wpData === null) {
                        this.$router.push(notFoundUrl);
                    }
                    if (n && JSON.stringify(n) !== JSON.stringify(this.wpData)) {
                        this.wpData = n;
                    }
                }
            }
        },
        created: function () {
            if (!this.wpData) {
                this.wpData = this.wpDataFallback;
            }
        },
        mixins: [
            meta(type)
        ],
        head: function () {
            return this.head;
        },
        computed: {
            head: function () {
                var type = 'website';
                return meta('website');
            }
        }
    };
    return mixin;
});
//# sourceMappingURL=Abstract.js.map