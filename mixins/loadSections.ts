import Vue from 'vue'
import { VueConstructor } from 'vue/types'
import { ContentTypes, FetchHookTypes } from '../types'
import { ModulePrefix } from '../index'

export default (
  createdOrAsync: FetchHookTypes = FetchHookTypes.Created, 
  customConfig?: any)
  : VueConstructor<Record<never, any> & Vue> => {

  const mixin: any = {}

  if (createdOrAsync === FetchHookTypes.Created) {
    // Appears in Vue version
    mixin.computed = {
      wpData () {
        const config = this.$wp.config
      
        return this.$store.state[`${ModulePrefix}_page`].page[config.pages[this.$route.name]]
          ? this.$store.state[`${ModulePrefix}_page`].page[config.pages[this.$route.name]]
          : null
      }
    }

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

  if (createdOrAsync === FetchHookTypes.AsyncData) {
    // Appears in Nuxt version

    mixin.asyncData = async function ({store, route}) {
      const config = customConfig ? customConfig : store.state[`${ModulePrefix}_config`].config
  
      if (config.pages[route.name]) {
        await store.dispatch(`${ModulePrefix}_page/load`, {
          slug: config.pages[route.name],
          type: ContentTypes.Page
        })
      }
      const countWpData = () => {
        return store.state[`${ModulePrefix}_page`].page[config.pages[route.name]]
          ? store.state[`${ModulePrefix}_page`].page[config.pages[route.name]]
          : null
      }

      const wpData = countWpData()

      return {
        wpData
      }
    }

  }

  return Vue.extend(mixin)
}