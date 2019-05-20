import { ContentTypes } from '../../types'
import { ModulePrefix } from '../../index'

export default (contentType, created = true, asyncData = false, notFoundUrl = 'page-not-found') => {
  console.log('as', asyncData)
  const mixin: any = {
    components: {
      Sections: () => import("../../components/TheRoot.js")
    },
  
    computed: {
      wpData () {
        return contentType === ContentTypes.Post 
          ? this.$store.state[`${ModulePrefix}_post`].post[this.$route.params.slug]
          : this.$store.state[`${ModulePrefix}_page`].page[this.$route.params.slug]
      }
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
    }
  }

  return mixin
}