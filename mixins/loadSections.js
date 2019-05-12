import { ContentTypes } from '../types'

export default {
  computed: {
    wpData () {
      const config = this.$wp.config
    
      return this.$store.state.wp_rest_content.pages[config.pages[this.$route.name]]
        ? this.$store.state.wp_rest_content.pages[config.pages[this.$route.name]]
        : null
    }
  },
  async created () {
    const config = this.$wp.config

    if (config.pages[this.$route.name]) {
      await this.$store.dispatch('wp_rest_content/loadContent', {
        slug: config.pages[this.$route.name],
        lang: 'pl',
        type: ContentTypes.Page
      })
    }
  }
}
