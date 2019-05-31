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
  slug: string | Array<LoaderRequestElement | string>,
  createdOrAsync: FetchHookTypes = FetchHookTypes.Created) => {

  if(!slug || slug.length < 1) {
    throw new Error('Slug no provided')
  }

  let mixin: any = {}

  let computed: any = {}

  if (createdOrAsync === FetchHookTypes.Created) {
    // Appears in Vue version
    computed = { }

    if (typeof slug === 'string') {
      computed[slug] = () => {
        const type = ContentTypeToString(ContentTypes.Page)

        return this.$store.state[`${ModulePrefix}_${type}`][type][slug]
          ? this.$store.state[`${ModulePrefix}_${type}`][type][slug]
          : null
      }
    } else {
      // slug - array of request elements in this example
      for (let requestElement of slug) {
        if (typeof requestElement === 'string') {
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

      mixin = { computed }

    }

    mixin = {
      ...mixin, 
      async created() {

        const requests = []

        if (typeof slug === 'string') {

          requests.push(
            this.$store.dispatch(`${ModulePrefix}_page/load`, {
              slug,
              type: ContentTypes.Page
            })
          )

        } else {
          // slug - array of request elements in this example
          requests.push(...LoaderRequestToFetches(slug, this.$store))
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

      } else {
        // slug - array of request elements in this example
        requests.push(...LoaderRequestToFetches(slug, store))
      }

      await Promise.all(requests)

      const asyncData = {}

      for (let requestElement of slug) {
        if (typeof requestElement === 'string') {
          asyncData[requestElement] = store.state[`${ModulePrefix}_page`].page[requestElement]
            ? store.state[`${ModulePrefix}_page`].page[requestElement]
            : null
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

          asyncData[dataName] = store.state[`${ModulePrefix}_${type}`][type][slug]
            ? store.state[`${ModulePrefix}_${type}`][type][slug]
            : null
        }
      }

      return asyncData

    }

  }

  // META
  mixin.mixins = [
    Meta('website') // Page
  ]

  return mixin
}
