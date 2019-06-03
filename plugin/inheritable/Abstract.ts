import { ContentTypes } from '../../types'
import Meta from './Meta'

export default (
  contentType, 
  notFoundUrl = 'page-not-found') => {

  const type = contentType === ContentTypes.Page
    ? 'website'
    : 'article'

  const mixin: any = {
    components: {
      Sections: () => import("../../components/TheRoot.js")
    },

    props: {
      wpData: Object
    },
  
    watch: {
  
      wpData: {
        immediate: true,
        handler (n) {
          if(n === false) {
            this.$router.push(notFoundUrl)
          }
        }
      }

    },
    
    mixins: [
      Meta(type, 'wpData')
    ]

  }

  return mixin
}