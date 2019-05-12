import { module } from './store'
import { mediaModule } from './store/media'
import { afterRegistration } from './hooks/afterRegistration'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { routes } from './router/routes'

export const KEY = 'wp_rest_content'
export const MEDIA_KEY = 'wpr_media'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [
    { key: KEY, module },
    { key: MEDIA_KEY, module: mediaModule }
  ]},
  afterRegistration,
  router: { routes }
}

export const VsfWpRestContent = new VueStorefrontModule(moduleConfig)
