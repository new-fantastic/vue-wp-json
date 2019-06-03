import { ContentTypes, FetchHookTypes, LoaderRequestElement } from '../types'
import { ModulePrefix } from '../index'
import { ContentTypeToString } from '../util/Filters'
import Meta from '../plugin/inheritable/Meta'

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
      let slug = requestElement.slug
      let dataName = slug
      if('dataName' in requestElement) {
        dataName = requestElement.dataName
      }
      let type = 'post' in requestElement && requestElement.post === true 
        ? 'post'
        : 'page'
      
      requests.push(
        store.dispatch(`${ModulePrefix}_${type}/load`, {
          slug,
          type: type === 'post' 
            ? ContentTypes.Post
            : ContentTypes.Page
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
                this.$store.state[`${ModulePrefix}_${type}`][type][requestElement]
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

  } else if (createdOrAsync === FetchHookTypes.AsyncData) {
    // Appears in Nuxt version
    const requests = []

    if (typeof loaderRequest === 'string') {

      metaSource = loaderRequest

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
              this.$store.state[`${ModulePrefix}_${typeAsString}`][typeAsString][loaderRequest]
            )
          }
        }
      }
    } else if (Array.isArray(loaderRequest)) {
        // slug - array of request elements in this example
        mixin = {
          ...mixin,
          async asyncData ({ store }) {
            const typeAsString = ContentTypeToString(ContentTypes.Page)
  
            requests.push(...LoaderRequestToFetches(loaderRequest, store))
            await Promise.all(requests)

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
        mixin = {
          ...mixin,
          async asyncData ({ store }) {

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

            await store.dispatch(`${ModulePrefix}_${type}/load`, {
              slug,
              type: ContentTypes.Page
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
