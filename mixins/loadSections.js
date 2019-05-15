import { ContentTypes } from '../types'

export default (created = true, asyncData = false, customConfig) => {
  const mixin = {
    computed: {
      wpData () {
        const config = this.$wp.config
      
        return this.$store.state.wp_rest_content.pages[config.pages[this.$route.name]]
          ? this.$store.state.wp_rest_content.pages[config.pages[this.$route.name]]
          : null
      }
    }
  }

  if (created) {
    mixin.created = async function () {
      const config = customConfig ? customConfig : this.$wp.config
  
      if (config.pages[this.$route.name]) {
        await this.$store.dispatch('wp_rest_content/loadContent', {
          slug: config.pages[this.$route.name],
          lang: 'pl',
          type: ContentTypes.Page
        })
      }
    }
  }

  if (asyncData) {
    mixin.asyncData = async function ({ store, route }) {
      const config = customConfig ? customConfig : this.$wp.config
  
      if (config.pages[route.name]) {
        await store.dispatch('wp_rest_content/loadContent', {
          slug: config.pages[route.name],
          lang: 'pl',
          type: ContentTypes.Page
        })
      }
    }
  }

  return mixin
}
