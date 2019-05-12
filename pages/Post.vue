<template>
  <div
    v-if="wpData !== null && wpData !== false && wpData"
    class="post"
    :key="wpData.id"
  >
    <div
      class="post__heading margin__y--sm"
    >
      <div
        class="post__breadcrumbs"
      >
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
import { ContentTypes } from '../types'
import { getLangByRoute, getLangAndCmpName } from '../util/Lang'
import BaseMedia from '../components/Base/BaseMedia.vue'
import meta from '../mixins/meta'

export default {
  mixins: [meta('article')],
  components: {
    BaseMedia,
    Sections: () => import("../components/TheRoot.js")
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
      return this.$store.state.wp_rest_content.posts[this.$route.params.slug]
    }
  },
  watch: {
    async $route(to) {
      await this.$store.dispatch("wp_rest_content/loadContent", {
        slug: to.params.slug,
        lang: 'pl',
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
  async created() {
    const config = this.$wp.config

    await this.$store.dispatch("wp_rest_content/loadContent", {
      slug: this.$route.params.slug,
      lang: 'pl',
      type: ContentTypes.Post
    });
  }
};
</script>
