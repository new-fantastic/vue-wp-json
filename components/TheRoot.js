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
          if(Vue.prototype.$wp.validators) {
            for(let customValidator of Vue.prototype.$wp.validators) {
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
      if(context.props.data && context.props.data.acf && context.props.data.acf.sections) {

        const wpSections = []
        context.props.data.acf.sections.forEach((el, index) => {

          wpSections.push(
            h(Section, {
              props: {
                data: el
              }
            })
          )

        })

        return wpSections.length > 1 ? wpSections : wpSections[0]
        
      }
    }
  }
