  import NumberToWord from '../util/NumberToWord'
  import Section from './Content/Section.vue'
  import Vue from 'vue'

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
        validator(value) {
          if(Vue.prototype.$wp.validators && Vue.prototype.$wp.validators.root) {
            for(let customValidator of Vue.prototype.$wp.validators.root) {
              if(!customValidator(value)) {
                return false
              }
            }
          }

          return true
        }
      }
    },
    render(h, context) {
      if(context.props.data) {

        const wpSections = []
        const chosenSection = Vue.prototype.$wp.layouts && Vue.prototype.$wp.layouts.section
          ? 'AlternativeSection'
          : Section

        if(Vue.prototype.$wp.interpret 
          && Vue.prototype.$wp.interpret.root && Vue.prototype.$wp.interpret.root.length >= 1) {
            const customOptionsAmount = Vue.prototype.$wp.interpret.root.length
            let counter = 0

            for(let shaper of Vue.prototype.$wp.interpret.root) {
              try {
                const val = shaper(context.props.data, chosenSection, h)
                wpSections.push(...val)
                break; // If any shaper fullfilled conditions, we do not need anymore
              } catch(e) {
                counter++
              }
            }

            if(counter === customOptionsAmount) {
              return h(chosenSection, {
                props: {
                  data: context.props.data
                }
              })
            } else {
              return wpSections.length > 1 ? wpSections : wpSections[0]
            }
        } else {
          return h(chosenSection, {
            props: {
              data: context.props.data
            }
          })
        }
      }
    }
  }
