<script>
  import Vue from 'vue'
  import { pagePrefix, postPrefix } from '../router/routes' 
  import Page from './Page'
  import Post from './Post'
  import { ContentTypes, FetchHookTypes } from '../types'
  import { ModulePrefix } from '../index'
  import Loader from '../mixins/loader'

  const BaseViews = {
    Page, Post
  }

  export default {
    name: 'Loader',
    render (h) {
      const store = this.$store
      const route = this.$route

      const pageType = route.name === pagePrefix 
        ? 'page'
        : 'post'

      const fallbackProps = {
        props: {
          wpDataFallback: this.wpData
        }
      }

      const lookForCustomLayout = (type) => {
        const lowerType = type.toLowerCase()

        if(Vue.prototype.$wp.layouts && Vue.prototype.$wp.layouts[lowerType]) {
          return h(Vue.prototype.$wp.layouts[lowerType], fallbackProps)
        } else if(store.state.layouts.lowerType) {
          return h(store.state.layouts.lowerType, fallbackProps)
        } else {
          return h(BaseViews[type], fallbackProps)
        }
      }

      if (pageType === 'page') {
        return lookForCustomLayout('Page')
      } else {
        return lookForCustomLayout('Post')
      }
    },

    mixins: [Loader(FetchHookTypes.AsyncData)]
  }
</script>