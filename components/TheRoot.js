  import NumberToWord from '../util/NumberToWord'
  import Section from './Content/Section.vue'

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
          if(!('acf' in value)) {
            return false
          }
          if(!('sections' in value.acf)) {
            return false
          }

          if(value.acf.sections.length < 1) {
            return false
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
