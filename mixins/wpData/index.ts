import { ContentTypes, FetchHookTypes, LoaderRequestElement } from '../../types'
import { ModulePrefix } from '../../index'
import { ContentTypeToString, StringToContentType } from '../../util/Filters'
import Meta from '../../plugin/inheritable/Meta'

import fhtCreated from './fetchHookTypes/Created'
import fhtAsyncData from './fetchHookTypes/AsyncData'
import fhtVoidAsyncData from './fetchHookTypes/VoidAsyncData'

const orNull = (value) => {
  return value ? value : null
}

const LoaderRequestToFetches = 
(slug: Array<LoaderRequestElement | string>, store)
: Array<Promise<any>> => {
  
  const requests = []
  
  for (let requestElement of slug) {
    if (typeof requestElement === 'string') {
      
      requests.push(
        store.dispatch(`${ModulePrefix}_page/load`, {
          slug: requestElement,
          type: ContentTypes.Page
        })
      )

    } else {

      let {
        slug,
        contentType
      } = ConsumeObject(requestElement)

      const type = ContentTypeToString(contentType)
      
      requests.push(
        store.dispatch(`${ModulePrefix}_${type}/load`, {
          slug,
          type: StringToContentType(type)
        })
      )

    }
  }

  return requests
}

const ConsumeObject = (obj: LoaderRequestElement) => {
  let slug = obj.slug
  let dataName = slug
  let metaSource = null
  if('dataName' in obj) {
    dataName = obj.dataName
  }
  if(('meta' in obj && obj.meta === true)) {
    metaSource = dataName
  }

  let contentType = 'post' in obj && obj.post === true 
    ? ContentTypes.Post
    : ContentTypes.Page

  return {
    slug,
    dataName,
    meta: metaSource,
    contentType
  }
}

export default (
  loaderRequest: string | LoaderRequestElement | Array<LoaderRequestElement | string>,
  createdOrAsync: FetchHookTypes = FetchHookTypes.Created) => {

    switch (createdOrAsync) {
      case FetchHookTypes.Created: 
        return fhtCreated(loaderRequest)
      case FetchHookTypes.AsyncData: 
        return fhtAsyncData(loaderRequest)
      case FetchHookTypes.VoidAsyncData: 
        return fhtVoidAsyncData(loaderRequest)
      break;
      default:
        throw new Error("FetchHookType" + createdOrAsync + " does not exist")
    }

}

const old = (
  loaderRequest: string | LoaderRequestElement | Array<LoaderRequestElement | string>,
  createdOrAsync: FetchHookTypes = FetchHookTypes.Created) => {

  let metaSource: string 

  if(!loaderRequest || (Array.isArray(loaderRequest) && loaderRequest.length < 1)) {
    throw new Error('Slug no provided')
  }

  let mixin: any = {}

  let computed: any = {}

  if (createdOrAsync === FetchHookTypes.Created) {
    // Appears in Vue version
    const requests = []
    const type = ContentTypeToString(ContentTypes.Page)

    if (typeof loaderRequest === 'string') {
      metaSource = loaderRequest

      computed = {
        ...computed,
        [loaderRequest]() {
          return orNull(
            this.$store.state[`${ModulePrefix}_${type}`][type][loaderRequest]
          )
        }
      }

      mixin = {
        ...mixin,
        async created () {
          await this.$store.dispatch(`${ModulePrefix}_page/load`, {
            slug: loaderRequest,
            type: ContentTypes.Page
          })
        }
      }

    } else if (Array.isArray(loaderRequest)) {
      // loaderRequest - array of request elements in this example
      for (let requestElement of loaderRequest) {
        if (typeof requestElement === 'string') {
          if(!metaSource) {
            metaSource = requestElement
          }
          
          computed = {
            ...computed,
            [requestElement]() {
              return orNull(
                this.$store.state[`${ModulePrefix}_page`].page[requestElement]
              )
            }
          }

          requests.push(
            {
              slug: requestElement,
              type: ContentTypes.Page
            }
          )

        } else {
          let {
            slug,
            dataName,
            meta,
            contentType
          } = ConsumeObject(requestElement)

          const type = ContentTypeToString(contentType)
          
          if(meta !== null) {
            metaSource = meta
          }

          computed = {
            ...computed, 
            [dataName]() { 
              
              return orNull(
                this.$store.state[`${ModulePrefix}_${type}`][type][slug]
              )
            }
          }

          requests.push(
            {
              slug,
              type: contentType
            }
          )
        }
        
      }

      mixin = {
        ...mixin,
        async created () {
          await Promise.all(requests.map(request => {
            const type = ContentTypeToString(request.type)
            return this.$store.dispatch(`${ModulePrefix}_${type}/load`, request)
          }))
        }
      }

    } else {

      let {
        slug,
        dataName,
        meta,
        contentType
      } = ConsumeObject(loaderRequest)

      const type = ContentTypeToString(contentType)
      
      if(meta !== null) {
        metaSource = meta
      }

      computed = {
        ...computed, 
        [dataName]() { 
          return orNull(
            this.$store.state[`${ModulePrefix}_${type}`][type][slug]
          )
        }
      }

      mixin = {
        ...mixin,
        async created () {
          await this.$store.dispatch(`${ModulePrefix}_${type}/load`, {
            slug,
            type: ContentTypes.Page
          })
        }
      }
    }

    mixin = {
      ...mixin,
      computed
    }

  } else if (createdOrAsync === FetchHookTypes.AsyncData || createdOrAsync === FetchHookTypes.VoidAsyncData) {
    // Appears in Nuxt version
    // const requests = []

    if (typeof loaderRequest === 'string') {

      metaSource = loaderRequest

      if(createdOrAsync === FetchHookTypes.VoidAsyncData) {
        computed = {
          ...computed,
          [loaderRequest]() { return orNull(
            this.$store.state[`${ModulePrefix}_page`].page[loaderRequest]
          )
          }
        }
      }

      mixin = {
        ...mixin,
        computed
      }

      mixin = {
        ...mixin,
        async asyncData ({ store }) {
          const typeAsString = ContentTypeToString(ContentTypes.Page)

          await store.dispatch(`${ModulePrefix}_page/load`, {
            slug: loaderRequest,
            type: ContentTypes.Page
          })

          return {
            [loaderRequest]: orNull(
              store.state[`${ModulePrefix}_${typeAsString}`][typeAsString][loaderRequest]
            )
          }
        }
      }
    } else if (Array.isArray(loaderRequest)) {
        // slug - array of request elements in this example
        if(createdOrAsync === FetchHookTypes.VoidAsyncData) {
          for (let requestElement of loaderRequest) {
            if (typeof requestElement === 'string') {
              if(!metaSource) {
                metaSource = requestElement
              }
              
              computed = {
                ...computed,
                [requestElement](){ return orNull(
                    this.$store.state[`${ModulePrefix}_page`].page[requestElement]
                )
                }
              }
    
            } else {

              let {
                slug,
                dataName,
                meta,
                contentType
              } = ConsumeObject(requestElement)
    
              const type = ContentTypeToString(contentType)
              
              if(meta !== null) {
                metaSource = meta
              }
    
              computed = {
                ...computed, 
                [dataName]() { return orNull(
                    this.$store.state[`${ModulePrefix}_${type}`][type][slug]
                )
                }
              }
            }
            
          }
          
        }
  
        mixin = {
          ...mixin,
          computed
        }

        mixin = {
          ...mixin,
          async asyncData ({ store }) {
  
            await Promise.all(LoaderRequestToFetches(loaderRequest, store))

            let data = {}
            for (let requestElement of loaderRequest) {
              if (typeof requestElement === 'string') {
                if(!metaSource) {
                  metaSource = requestElement
                }
                
                data = {
                  ...data,
                  [requestElement]: orNull(
                      store.state[`${ModulePrefix}_page`].page[requestElement]
                  )
                }
      
              } else {
                let {
                  slug,
                  dataName,
                  meta,
                  contentType
                } = ConsumeObject(requestElement)
      
                const type = ContentTypeToString(contentType)
                
                if(meta !== null) {
                  metaSource = meta
                }
      
                data = {
                  ...data, 
                  [dataName]: orNull(
                      store.state[`${ModulePrefix}_${type}`][type][slug]
                  )
                }
              }
              
            }

            return data
          }
        }
        
      } else {
        // slug -- object
        let {
          slug,
          dataName,
          meta,
          contentType
        } = ConsumeObject(loaderRequest)
  
        const type = ContentTypeToString(contentType)
        metaSource = meta ? meta : dataName

        if(createdOrAsync === FetchHookTypes.VoidAsyncData) {
          computed = {
            ...computed,
            [dataName]() { return orNull(
              this.$store.state[`${ModulePrefix}_${type}`][type][slug]
            )
            }
          }
        }
  
        mixin = {
          ...mixin,
          computed
        }

        mixin = {
          ...mixin,
          async asyncData ({ store }) {

            await store.dispatch(`${ModulePrefix}_${type}/load`, {
              slug,
              type: contentType
            })

            return {
              [dataName]: orNull(
                  store.state[`${ModulePrefix}_${type}`][type][slug]
              )
            }

          }
        }
      }
    }

  // META
  mixin.mixins = [
    Meta('website', metaSource) // Page
  ]

  return mixin
}
