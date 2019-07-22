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

const buildComputed = function (loaderRequest: string | LoaderRequestElement | Array<LoaderRequestElement | string>) {

  let computed = {}

  if (typeof loaderRequest === 'string') {

    computed[loaderRequest] = 
      () => this.$store.state[`${ModulePrefix}_page`].page[loaderRequest]
        ? this.$store.state[`${ModulePrefix}_page`].page[loaderRequest]
        : null

    return computed;

  } else if (isLoaderRequestElement(loaderRequest)) {

    const contentType: string = 'post' in loaderRequest && loaderRequest.post
      ? 'post'
      : 'page'

    const dataName: string = 'dataName' in loaderRequest 
      ? loaderRequest.dataName
      : loaderRequest.slug

    computed[dataName] = 
      () => this.$store.state[`${ModulePrefix}_${contentType}`][contentType][loaderRequest.slug]
        ? this.$store.state[`${ModulePrefix}_${contentType}`][contentType][loaderRequest.slug]
        : null

    return computed;

  } else {
    for (let request of loaderRequest) {

      computed = {
        ...computed,
        ...buildComputed.call(this, request)
      }

    }

  }

  return computed

}

export default function (loaderRequest: string | LoaderRequestElement | Array<LoaderRequestElement | string>) {
  const created = buildCreated.call(this, loaderRequest)
  const computed = buildComputed.call(this, loaderRequest)

  return {
    created,
    computed
  }

}