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
import meta from '../mixins/meta'
import Abstract from './Abstract'

export default {
  mixins: [ 
    Abstract(ContentTypes.Post),
    meta('website') 
  ]
};
</script>
