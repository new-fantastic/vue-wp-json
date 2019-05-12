<template>
  <div
    v-if="wpData !== null && wpData !== false && wpData"
    class="page"
    :key="wpData.id"
  >
    <div
      class="page__heading margin__y--sm"
    >
      <div
        class="page__breadcrumbs"
      >
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
import { ContentTypes } from '../types'
import meta from '../mixins/meta'
import Abstract from './Abstract'

export default {
  mixins: [ 
    Abstract(ContentTypes.Page),
    meta('website') 
  ]
};
</script>
