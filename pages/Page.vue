<template>
  <div
    v-if="wpData !== null && wpData !== false"
    class="page"
    :key="wpData.id"
  >
    <div
      class="page__heading margin__y--sm"
    >
      <div
        class="page__breadcrumbs"
      >
        <!-- <breadcrumbs
          :routes="breadcrumbs.routes"
          :active-route="wpData.title.rendered"
        /> -->
      </div>
      <h1
        class="page__title"
        :class="{
          'text-align__left' : wpData.acf.page_options.page_title.alignment === 'left',
          'text-align__center' : wpData.acf.page_options.page_title.alignment === 'center',
          'text-align__right' : wpData.acf.page_options.page_title.alignment === 'right'
        }"
        v-if="wpData.acf.page_options.page_title.visibility === true"
        v-html="wpData.title.rendered"
      />
    </div>
    <div
      class="page__content"
    >
      <BaseMedia :id="416"/>
      <Sections
        v-if="wpData"
        :data="wpData"
      />
      <p
        v-else
      >
        {{ $t('Not found') }}
      </p>
    </div>
  </div>
</template>

<script>
import rootStore from "@vue-storefront/store";
import config from 'config'
import Breadcrumbs from 'theme/components/core/Breadcrumbs.vue'
import { ContentTypes } from '../types'
import { getLangByRoute, getLangAndCmpName } from '../util/Lang'
import BaseMedia from '../components/Base/BaseMedia.vue'
import meta from '../mixins/meta'

export default {
  mixins: [meta('website')],
  components: {
    Sections: () => import("../components/TheRoot.js"),
    Breadcrumbs,
    BaseMedia
  },

  data () {
    return {
      breadcrumbs: {
        routes: [
          { name: 'Home', route_link: '/' }
        ]
      }
    }
  },

  computed: {
    categories() {
      return this.getCategories;
    },
    wpData () {
      const { lang, langComponentName } = getLangAndCmpName(this.$route)
 
      return this.$store.state.wp_rest_content.pages[this.$route.params.slug]
    }
  },
  watch: {
    async $route(to) {
      await this.$store.dispatch("wp_rest_content/loadContent", {
        slug: to.params.slug,
        lang: getLangByRoute(to),
        type: ContentTypes.Page
      });
    },
    wpData: {
      immediate: true,
      handler (n) {
        if(n === false) {
          this.$router.push('/page-not-found')
        }
      }
    }
  },
  async asyncData({ store, route }) {
    const config = store.state.config;
    const lang = getLangByRoute(route)

    await store.dispatch("wp_rest_content/loadContent", {
      slug: route.params.slug,
      lang,
      type: ContentTypes.Page
    });

    await store.dispatch("category/list", {
      includeFields: config.entities.optimize
        ? config.entities.category.includeFields
        : null
    });
  }
};
</script>
