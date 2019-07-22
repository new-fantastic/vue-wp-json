import { ContentTypes, isLoaderRequestElement, FetchHookTypes, LoaderRequestElement } from '../types'

function pickMetaSource(loaderRequest: string | LoaderRequestElement | Array<LoaderRequestElement | string>) {

  if (typeof loaderRequest === 'string') {

    return loaderRequest

  } else if (isLoaderRequestElement(loaderRequest)) {

    return 'dataName' in loaderRequest
      ? loaderRequest.dataName
      : loaderRequest.slug

  } else if (Array.isArray(loaderRequest)) {

    let current = null

    const reversedLoader = [...loaderRequest].reverse()
    for (let request of reversedLoader) {

      let tmp = pickMetaSource(request)
      if (current === null) {
        current = tmp
      }
      
      if (isLoaderRequestElement(request) && 'meta' in request && request.meta === true) {
        return tmp
      }

    }

    return current

  } else {
    throw new Error('FetchHookTypeCreated: loaderRequest cannot be ' + typeof loaderRequest)
  }

}

export default pickMetaSource