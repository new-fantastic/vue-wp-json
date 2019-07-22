import { ContentTypes, isLoaderRequestElement, FetchHookTypes, LoaderRequestElement } from '../../../types'
import { ModulePrefix } from '../../../'

const buildAsyncData = function (
  loaderRequest: string | LoaderRequestElement | Array<LoaderRequestElement | string>,
  fht: FetchHookTypes) {
  return async ({ store, route }) => {

    if (typeof loaderRequest === 'string') {

      await store.dispatch(`${ModulePrefix}_page/load`, {
        slug: loaderRequest,
        type: ContentTypes.Page
      })

      if(fht === FetchHookTypes.AsyncData) {
        return {
          [loaderRequest]: store.state[`${ModulePrefix}_page`].page[loaderRequest]
            ? store.state[`${ModulePrefix}_page`].page
            [loaderRequest]
            : null
          }
      }

    } else if (isLoaderRequestElement(loaderRequest)) {

      const isPost = 'post' in loaderRequest && loaderRequest.post 
      const contentType = isPost ? 'post' : 'page'
      await store.dispatch(`${ModulePrefix}_${contentType}/load`, {
        slug: loaderRequest.slug,
        type: isPost ? ContentTypes.Post : ContentTypes.Page
      })

    } else if (Array.isArray(loaderRequest)) {

      const requests = []
      for (let request of loaderRequest) {

        if(typeof request !== 'string' && !isLoaderRequestElement(request)) {
          throw new Error('FetchHookTypeVoidAsyncData: Bad loaderRequest')
        }
        requests.push(buildAsyncData.call(this, request).call(this))
      }
      await Promise.all(requests)

    } else {

      throw new Error('FetchHookTypeVoidAsyncData: loaderRequest cannot be ' + typeof loaderRequest)
    
    }

  }

}

export default buildAsyncData