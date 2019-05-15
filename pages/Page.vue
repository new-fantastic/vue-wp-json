<template>
  <div
    v-if="wpData !== null && wpData !== false && wpData"
    class="page"
    :key="wpData.id"
  >
    <template v-if="wpData.acf && wpData.acf.sections">
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
    </template>
    <div v-else v-html="wpData.content.rendered"/>
  </div>
</template>

<script>
  import Page from '../plugin/inheritable/Page'

  export default {
    mixins: [Page]
  };
</script>
