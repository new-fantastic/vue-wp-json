import { ContentTypes } from '../../types'
import { ModulePrefix } from '../../index'

export default (contentType, created = true, asyncData = false, notFoundUrl = 'page-not-found') => {
  const mixin: any = {
    components: {
      Sections: () => import("../../components/TheRoot.js")
    },
  
    watch: {
      async $route(to) {
        const prefix = contentType === ContentTypes.Post 
          ? `${ModulePrefix}_post`
          : `${ModulePrefix}_page`
  
        await this.$store.dispatch(`${prefix}/load`, {
          slug: to.params.slug,
          type: contentType
        });
      },
  
      wpData: {
        immediate: true,
        handler (n) {
          if(n === false) {
            this.$router.push(notFoundUrl)
          }
        }
      }
    }
  }

  if(created) {
    mixin.created = async function () {

      const prefix = contentType === ContentTypes.Post 
          ? `${ModulePrefix}_post`
          : `${ModulePrefix}_page`
  
      await this.$store.dispatch(`${prefix}/load`, {
        slug: this.$route.params.slug,
        type: contentType
      });
    }
  }

  if(asyncData) {
    mixin.asyncData = async function ({store, route}) {

      const prefix = contentType === ContentTypes.Post 
          ? `${ModulePrefix}_post`
          : `${ModulePrefix}_page`
  
      await store.dispatch(`${prefix}/load`, {
        slug: route.params.slug,
        type: contentType
      });

      const countWpData = () => {
        return store.state
          [prefix]
          [contentType === ContentTypes.Post ? 'post' : 'page']
          [route.params.slug]
          ? store.state
            [prefix]
            [contentType === ContentTypes.Post ? 'post' : 'page']
            [route.params.slug]
          : null
      }

      const wpData = countWpData()

      return {
        wpData
      }
    }
  }

  return mixin
}