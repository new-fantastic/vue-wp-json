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

    data () {
      return {
        wpData: null
      }
    },

    props: {
      wpDataFallback: Object
    },
  
    watch: {
  
      wpData: {
        immediate: true,
        handler (n) {
          if(n === false && this.wpDataFallback === null) {
            this.$router.push(notFoundUrl)
          }
        }
      },

      wpDataFallback: {
        immediate: true,
        handler (n) {
          if(n === false && this.wpData === null) {
            this.$router.push(notFoundUrl)
          }
          if(n && JSON.stringify(n) !== JSON.stringify(this.wpData)) {
            this.wpData = n
          }
        }
      }
    },

    created () {
      if(!this.wpData) {
        this.wpData = this.wpDataFallback
      }
    },
    
    mixins: [
      Meta(type)
    ]

  }

  return mixin
}