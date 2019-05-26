import Section from './Content/Section.vue';
import Vue from 'vue';
export default {
    functional: true,
    props: {
        renderSingle: {
            type: String,
            default: ''
        },
        data: {
            type: Object,
            default: null,
            validator: function (value) {
                if (Vue.prototype.$wp.validators && Vue.prototype.$wp.validators.root) {
                    for (var _i = 0, _a = Vue.prototype.$wp.validators.root; _i < _a.length; _i++) {
                        var customValidator = _a[_i];
                        if (!customValidator(value)) {
                            return false;
                        }
                    }
                }
                return true;
            }
        }
    },
    render: function (h, context) {
        if (context.props.data) {
            var wpSections = [];
            var chosenSection = Vue.prototype.$wp.layouts && Vue.prototype.$wp.layouts.section
                ? 'AlternativeSection'
                : Section;
            if (Vue.prototype.$wp.interpret
                && Vue.prototype.$wp.interpret.root && Vue.prototype.$wp.interpret.root.length >= 1) {
                var customOptionsAmount = Vue.prototype.$wp.interpret.root.length;
                var counter = 0;
                for (var _i = 0, _a = Vue.prototype.$wp.interpret.root; _i < _a.length; _i++) {
                    var shaper = _a[_i];
                    try {
                        var val = shaper(context.props.data, chosenSection, h);
                        wpSections.push.apply(wpSections, val);
                        break; // If any shaper fullfilled conditions, we do not need anymore
                    }
                    catch (e) {
                        counter++;
                    }
                }
                if (!(counter === customOptionsAmount)) {
                    return wpSections.length > 1 ? wpSections : wpSections[0];
                }
            }
            return h(chosenSection, {
                props: {
                    data: context.props.data
                }
            });
        }
    }
};
//# sourceMappingURL=TheRoot.js.map