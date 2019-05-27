import { ContentTypes, FetchHookTypes } from '../types'
import { ModulePrefix } from '../index'

export default (
  slug: string,
  createdOrAsync: FetchHookTypes = FetchHookTypes.Created) => {

  if(!slug || slug.length < 1) {
    throw new Error('Slug no provided')
  }

  const mixin: any = {}

  if (createdOrAsync === FetchHookTypes.Created) {
    // Appears in Vue version
    mixin.computed = {
      wpData () {
        return this.$store.state[`${ModulePrefix}_page`].page[slug]
          ? this.$store.state[`${ModulePrefix}_page`].page[slug]
          : null
      }
    }

    mixin.created = async function () {
  
        await this.$store.dispatch(`${ModulePrefix}_page/load`, {
          slug,
          type: ContentTypes.Page
        })

    }
  }

  if (createdOrAsync === FetchHookTypes.AsyncData) {
    // Appears in Nuxt version

    mixin.asyncData = async function ({store}) {
   
      await store.dispatch(`${ModulePrefix}_page/load`, {
        slug,
        type: ContentTypes.Page
      })

      const wpData = store.state[`${ModulePrefix}_page`].page[slug]
        ? store.state[`${ModulePrefix}_page`].page[slug]
        : null

      return {
        wpData
      }

    }

  }

  return mixin
}