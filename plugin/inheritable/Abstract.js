import { ContentTypes } from '../../types'

export default (contentType, notFoundUrl = 'page-not-found') => ({
  components: {
    Sections: () => import("../../components/TheRoot.js")
  },

  computed: {
    wpData () {
      return contentType === ContentTypes.Post 
        ? this.$store.state.wp_rest_content.posts[this.$route.params.slug]
        : this.$store.state.wp_rest_content.pages[this.$route.params.slug]
    }
  },

  watch: {
    async $route(to) {
      await this.$store.dispatch("wp_rest_content/loadContent", {
        slug: to.params.slug,
        lang: 'pl',
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

    await this.$store.dispatch("wp_rest_content/loadContent", {
      slug: this.$route.params.slug,
      lang: 'pl',
      type: contentType
    });
  }
})