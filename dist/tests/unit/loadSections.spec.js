import loadSections from '../../mixins/loadSections';
import { ContentTypes } from '../../types';
describe('loadSections', function () {
    var that = {
        $wp: {
            config: {
                pages: {}
            }
        },
        $store: {
            state: {
                wp_rest_content: {
                    pages: {}
                }
            }
        },
        $route: {
            name: 'not-existing-key'
        }
    };
    it('it returns only computed if needed', function () {
        var test = loadSections(false)
            .computed.wpData.call(that);
        expect(test).toBe(null);
    });
    it('it returns null in wpData if page does not exist in store', function () {
        var test = loadSections(false)
            .computed.wpData.call(that);
        expect(test).toBe(null);
    });
    it('it does not panic if store.pages is empty object', function () {
        var test = loadSections(false)
            .computed.wpData.call(that);
        expect(test).toBe(null);
    });
    it('it returns page\'s object in wpData if page exists in store', function () {
        var content = 'Content of page';
        that.$route.name = 'home';
        that.$wp.config.pages[that.$route.name] = 'other-name-in-store-and-api';
        that.$store.state.wp_rest_content.pages[that.$wp.config.pages[that.$route.name]] = content;
        var test = loadSections(false)
            .computed.wpData.call(that);
        expect(test).toBe(content);
    });
    it('it returns created function by default', function () {
        var test = loadSections();
        expect(test.created).toBeDefined();
    });
    it('it returns asyncData function if required', function () {
        var test = loadSections(false, true);
        expect(test.asyncData).toBeDefined();
    });
    it('created dispatches loadContent action', function () {
        that.$store.dispatch = function () { };
        var spy = jest.spyOn(that.$store, 'dispatch');
        var test = loadSections.call(that);
        test.created.call(that);
        expect(spy).toHaveBeenCalledWith('wp_rest_content/loadContent', {
            slug: that.$wp.config.pages[that.$route.name],
            lang: 'pl',
            type: ContentTypes.Page
        });
        spy.mockRestore();
    });
    it('asyncData dispatches loadContent action with customConfig provided', function () {
        var _a;
        var customConfig = {
            pages: (_a = {},
                _a[that.$route.name] = 'abc',
                _a)
        };
        var spy = jest.spyOn(that.$store, 'dispatch');
        var test = loadSections.call(that, false, true, customConfig);
        test.asyncData.call(that, {
            store: that.$store,
            route: that.$route
        });
        expect(spy).toHaveBeenCalledWith('wp_rest_content/loadContent', {
            slug: customConfig.pages[that.$route.name],
            lang: 'pl',
            type: ContentTypes.Page
        });
        spy.mockRestore();
    });
});
//# sourceMappingURL=loadSections.spec.js.map