<template>
  <div
    v-if="wpData !== null && wpData !== false"
    class="post"
    :key="wpData.id"
  >
    <div
      class="post__heading margin__y--sm"
    >
      <div
        class="post__breadcrumbs"
      >
        <!-- <breadcrumbs
          :routes="breadcrumbs.routes"
          :active-route="wpData.title.rendered"
        /> -->
      </div>
      <h1
        class="post__title"
        v-html="wpData.title.rendered"
      />
    </div>
    <div
      class="post__content"
    >
      <div class="author">Autor: </div>
      <div class="date">Data: {{ wpData.date_gmt.replace('T', ' ') }}</div>
      <div class="tags">Tagi: 
        <span v-for="(tag, index) in wpData.tags.slice(0, -1)" :key="index">
          {{ tag }},&nbsp;
        </span>
        <span v-if="wpData.tags.length > 0">
          {{ wpData.tags[wpData.tags.length - 1] }}
        </span>
      </div>
      <Sections
        v-if="wpData && wpData.acf && wpData.acf.sections !== null"
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
  mixins: [meta('article')],
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
 
      return this.$store.state.wp_rest_content.posts[this.$route.params.slug]
    }
  },
  watch: {
    async $route(to) {
      await this.$store.dispatch("wp_rest_content/loadContent", {
        slug: to.params.slug,
        lang: getLangByRoute(to),
        type: ContentTypes.Post
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
      type: ContentTypes.Post
    });

    await store.dispatch("category/list", {
      includeFields: config.entities.optimize
        ? config.entities.category.includeFields
        : null
    });
  }
};
</script>
