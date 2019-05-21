<script>
  import Vue from 'vue'
  import { pagePrefix, postPrefix } from '../router/routes' 
  import Page from './Page'
  import Post from './Post'
  import { ContentTypes } from '../types'
  import { ModulePrefix } from '../index'

  export default {
    name: 'Loader',
    render (h) {
      // console.log(ctx)
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

      if (pageType === 'page') {
        if(Vue.prototype.$wp.layouts && Vue.prototype.$wp.layouts.page) {
          return h(Vue.prototype.$wp.layouts.page, fallbackProps)
        } else if(store.layouts.page) {
          return h(store.layouts.page, fallbackProps)
        } else {
          return h(Page, fallbackProps)
        }
      } else {
        if(Vue.prototype.$wp.layouts && Vue.prototype.$wp.layouts.post) {
          return h(Vue.prototype.$wp.layouts.post, fallbackProps)
        } else if(store.layouts.post) {
          return h(store.layouts.post, fallbackProps)
        } else {
          return h(Post, fallbackProps)
        }
      }
    },

    async asyncData ({store, route}) {
      const short = route.name === pagePrefix 
        ? 'page'
        : 'post'

      const prefix = `${ModulePrefix}_${short}`
  
      await store.dispatch(`${prefix}/load`, {
        slug: route.params.slug,
        type: short === 'page' ? ContentTypes.Post : ContentTypes.Page
      });

      const countWpData = () => {
        return store.state
          [prefix]
          [short]
          [route.params.slug]
          ? store.state
            [prefix]
            [short]
            [route.params.slug]
          : null
      }

      const wpData = countWpData()

      return {
        wpData
      }
    }
  }
</script>