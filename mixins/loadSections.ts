import { ContentTypes, FetchHookTypes, LoaderRequestElement } from '../types'
import { ModulePrefix } from '../index'
import { ContentTypeToString } from '../util/Filters'
import Meta from '../plugin/inheritable/Meta'

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

export default (
  slug: string | LoaderRequestElement | Array<LoaderRequestElement | string>,
  createdOrAsync: FetchHookTypes = FetchHookTypes.Created) => {

  let metaSource: string 

  if(!slug || slug.length < 1) {
    throw new Error('Slug no provided')
  }

  let mixin: any = {}

  let computed: any = {}

  if (createdOrAsync === FetchHookTypes.Created) {
    // Appears in Vue version
    computed = { }

    if (typeof slug === 'string') {
      metaSource = slug

      computed = {
        ...computed,
        [slug]() {
          const type = ContentTypeToString(ContentTypes.Page)
  
          return this.$store.state[`${ModulePrefix}_${type}`][type][slug]
            ? this.$store.state[`${ModulePrefix}_${type}`][type][slug]
            : null
        }
      }

      computed
    } else if (Array.isArray(slug)) {
      // slug - array of request elements in this example
      for (let requestElement of slug) {
        if (typeof requestElement === 'string') {
          if(!metaSource) {
            metaSource = requestElement
          }
          
          computed = {
            ...computed,
            [requestElement]() {
              const type = ContentTypeToString(ContentTypes.Page)

              return this.$store.state[`${ModulePrefix}_${type}`][type][requestElement]
                ? this.$store.state[`${ModulePrefix}_${type}`][type][requestElement]
                : null
            }
          }
        } else {
          let slug = requestElement.slug
          let dataName = slug
          if('dataName' in requestElement) {
            dataName = requestElement.dataName
          }
          if(('meta' in requestElement && requestElement.meta === true) || !metaSource) {
            metaSource = dataName
          }

          let contentType = 'post' in requestElement && requestElement.post === true 
            ? ContentTypes.Post
            : ContentTypes.Page

          computed = {
            ...computed, 
            [dataName]() { 
              const type = ContentTypeToString(contentType)

              return this.$store.state[`${ModulePrefix}_${type}`][type][slug]
                ? this.$store.state[`${ModulePrefix}_${type}`][type][slug]
                : null
            }
          }
        }
      }

    } else {
      let requestElement = slug

      let slugName = requestElement.slug
      let dataName = slugName
      if('dataName' in requestElement) {
        dataName = requestElement.dataName
      }
      if(('meta' in requestElement && requestElement.meta === true) || !metaSource) {
        metaSource = dataName
      }

      let contentType = 'post' in requestElement && requestElement.post === true 
        ? ContentTypes.Post
        : ContentTypes.Page

      computed = {
        ...computed, 
        [dataName]() { 
          const type = ContentTypeToString(contentType)

          return this.$store.state[`${ModulePrefix}_${type}`][type][slugName]
            ? this.$store.state[`${ModulePrefix}_${type}`][type][slugName]
            : null
        }
      }
    }

    // mixin = { computed }

    mixin = {
      computed, 
      async created() {

        const requests = []

        if (typeof slug === 'string') {

          requests.push(
            this.$store.dispatch(`${ModulePrefix}_page/load`, {
              slug,
              type: ContentTypes.Page
            })
          )

        } else if (Array.isArray(slug)) {
          // slug - array of request elements in this example
          requests.push(...LoaderRequestToFetches(slug, this.$store))
        } else {
          // slug -- object
          let requestElement = slug
          let slugName = requestElement.slug

          let type = 'post' in requestElement && requestElement.post === true 
            ? 'post'
            : 'page'
          
          requests.push(
            this.$store.dispatch(`${ModulePrefix}_${type}/load`, {
              slug: slugName,
              type: type === 'post' 
                ? ContentTypes.Post
                : ContentTypes.Page
            })
          )
        }

        await Promise.all(requests)
      }
    }
  }

  else if (createdOrAsync === FetchHookTypes.AsyncData) {
    // Appears in Nuxt version

    mixin.asyncData = async function ({store}) {

      const requests = []

      if (typeof slug === 'string') {

        requests.push(
          store.dispatch(`${ModulePrefix}_page/load`, {
            slug,
            type: ContentTypes.Page
          })
        )

      } else if (Array.isArray(slug)) {
        // slug - array of request elements in this example
        requests.push(...LoaderRequestToFetches(slug, store))
      } else {
        // slug -- object
        let requestElement = slug
        let slugName = requestElement.slug

        let type = 'post' in requestElement && requestElement.post === true 
          ? 'post'
          : 'page'
        
        requests.push(
          store.dispatch(`${ModulePrefix}_${type}/load`, {
            slug: slugName,
            type: type === 'post' 
              ? ContentTypes.Post
              : ContentTypes.Page
          })
        )
      }

      await Promise.all(requests)

      const asyncData = {}

      if (typeof slug === 'string') {
        metaSource = slug

        asyncData[slug] = store.state[`${ModulePrefix}_page`].page[slug]
          ? store.state[`${ModulePrefix}_page`].page[slug]
          : null

      } else if (Array.isArray(slug)) {
        for (let requestElement of slug) {
          if (typeof requestElement === 'string') {
            asyncData[requestElement] = store.state[`${ModulePrefix}_page`].page[requestElement]
              ? store.state[`${ModulePrefix}_page`].page[requestElement]
              : null

            if(!metaSource) {
              metaSource = requestElement
            }
          }
          else {
            let slug = requestElement.slug
            let dataName = slug
            if('dataName' in requestElement) {
              dataName = requestElement.dataName
            }
            let type = 'post' in requestElement && requestElement.post === true 
              ? 'post'
              : 'page'

            if(('meta' in requestElement && requestElement.meta === true) || !metaSource) {
              metaSource = dataName
            }
  
            asyncData[dataName] = store.state[`${ModulePrefix}_${type}`][type][slug]
              ? store.state[`${ModulePrefix}_${type}`][type][slug]
              : null
          }
        }
      } else {
        let requestElement = slug
        let slugName = requestElement.slug
        let dataName = slugName
        if('dataName' in requestElement) {
          dataName = requestElement.dataName
        }
        if(('meta' in requestElement && requestElement.meta === true) || !metaSource) {
          metaSource = dataName
        }

        let type = 'post' in requestElement && requestElement.post === true 
          ? 'post'
          : 'page'
  
        asyncData[dataName] = store.state[`${ModulePrefix}_${type}`][type][slugName]
          ? store.state[`${ModulePrefix}_${type}`][type][slugName]
          : null
      }

      return asyncData

    }

  }

  // META
  mixin.mixins = [
    Meta('website', metaSource) // Page
  ]

  return mixin
}
