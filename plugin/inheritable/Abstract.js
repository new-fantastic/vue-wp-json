import { ContentTypes } from '../../types'
import { ModulePrefix } from '../index'

export default (contentType, notFoundUrl = 'page-not-found') => ({
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
  },

  async created() {
    const config = this.$wp.config
    const prefix = contentType === ContentTypes.Post 
        ? `${ModulePrefix}_post`
        : `${ModulePrefix}_page`

    await this.$store.dispatch(`${prefix}/load`, {
      slug: this.$route.params.slug,
      type: contentType
    });
  }
})