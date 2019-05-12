import { AsyncDataLoader } from '@vue-storefront/core/lib/async-data-loader'
import config from 'config'
import { SET_LANG } from '../store/mutation-types'
import { getLangByRoute } from '../util/Lang'

export function afterRegistration ({ Vue, store, isServer }) {
  AsyncDataLoader.push({
    execute: async ({ route }) => {
      const lang = getLangByRoute(route)

      store.commit(`wp_rest_content/${SET_LANG}`, lang)
      
      // They'll be loaded in parallel
      await store.dispatch('wp_rest_content/loadMenu', {
        menuSlugs: config.wordpressCms.menus,
        lang
      })

      await store.dispatch('wp_rest_content/loadMeta', {
        lang
      })

      await store.dispatch('wpr_media/loadMedia', {
        lang
      })
    }
  })
}
