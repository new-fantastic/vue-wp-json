import { ContentTypes, FetchHookTypes } from '../../types'
import { ModulePrefix } from '../../index'
import meta from '../../mixins/meta'

export default (
  contentType, 
  createdOrAsync: FetchHookTypes = FetchHookTypes.Created, 
  notFoundUrl = 'page-not-found') => {

  const type = contentType === ContentTypes.Page
    ? 'website'
    : 'article'

  const mixin: any = {
    components: {
      Sections: () => import("../../components/TheRoot.js")
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

      wpDawpDataFallback: {
        immediate: true,
        handler (n) {
          if(n === false && this.wpData === null) {
            this.$router.push(notFoundUrl)
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
      meta(type)
    ],

    head () {
      return this.head
    },

    computed: {
      head () {
        const type = 'website'
        return meta('website')
      }
    }
  }

  return mixin
}