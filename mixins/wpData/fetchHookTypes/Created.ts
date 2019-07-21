import { ContentTypes, isLoaderRequestElement, FetchHookTypes, LoaderRequestElement } from '../../../types'
import { ModulePrefix } from '../../../'

const buildCreated = function (loaderRequest: string | LoaderRequestElement | Array<LoaderRequestElement | string>) {
  return async () => {

    if (typeof loaderRequest === 'string') {
      await this.$store.dispatch(`${ModulePrefix}_page/load`, {
        slug: loaderRequest,
        type: ContentTypes.Page
      })
    } else if (isLoaderRequestElement(loaderRequest)) {
      const isPost = 'post' in loaderRequest && loaderRequest.post 
      const contentType = isPost ? 'post' : 'page'
      await this.$store.dispatch(`${ModulePrefix}_${contentType}/load`, {
        slug: loaderRequest.slug,
        type: isPost ? ContentTypes.Post : ContentTypes.Page
      })
    } else {
      const requests = []
      for (let request of loaderRequest) {

        if(typeof request !== 'string' && !isLoaderRequestElement(request)) {
          throw new Error('FetchHookType Created: Bad loaderRequest')
        }
        requests.push(buildCreated.call(this, request).call(this))
      }
      await Promise.all(requests)
    }

  }

}

export default function (loaderRequest: string | LoaderRequestElement | Array<LoaderRequestElement | string>) {
  const created = buildCreated.call(this, loaderRequest)

  return {
    created
  }

}