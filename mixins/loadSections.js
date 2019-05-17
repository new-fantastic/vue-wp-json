import { ContentTypes } from '../types'
import { ModulePrefix } from '../index'

export default (created = true, asyncData = false, customConfig) => {
  const mixin = {
    computed: {
      wpData () {
        const config = this.$wp.config
      
        return this.$store.state[`${ModulePrefix}_page`].page[config.pages[this.$route.name]]
          ? this.$store.state[`${ModulePrefix}_page`].page[config.pages[this.$route.name]]
          : null
      }
    }
  }

  if (created) {
    mixin.created = async function () {
      const config = customConfig ? customConfig : this.$wp.config
  
      if (config.pages[this.$route.name]) {
        await this.$store.dispatch(`${ModulePrefix}_page/load`, {
          slug: config.pages[this.$route.name],
          type: ContentTypes.Page
        })
      }
    }
  }

  if (asyncData) {
    mixin.asyncData = async function ({ store, route }) {
      const config = customConfig ? customConfig : this.$wp.config
  
      if (config.pages[route.name]) {
        await store.dispatch(`${ModulePrefix}_page/load`, {
          slug: config.pages[route.name],
          type: ContentTypes.Page
        })
      }
    }
  }

  return mixin
}
