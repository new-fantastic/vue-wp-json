import config from 'config'
import { ContentTypes } from '../types'
import { getLangAndCmpName } from '../util/Lang'

export default {
  computed: {
    wpData () {
      const { lang, langComponentName } = getLangAndCmpName(this.$route)
    
      return this.$store.state.wp_rest_content.pages[config.wordpressCms.pages[langComponentName]]
        ? this.$store.state.wp_rest_content.pages[config.wordpressCms.pages[langComponentName]]
        : null
    }
  },
  async asyncData ({ store, route }) {
    const { lang, langComponentName } = getLangAndCmpName(route)

    if (
      config.wordpressCms.pages[route.name] ||
      config.wordpressCms.pages[langComponentName]
    ) {
      await store.dispatch('wp_rest_content/loadContent', {
        slug: config.wordpressCms.pages[langComponentName],
        lang,
        type: ContentTypes.Page
      })
    }
  }
}
