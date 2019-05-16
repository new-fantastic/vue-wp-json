<template>
  <div
    v-if="wpData !== null && wpData !== false && wpData"
    class="page"
    :key="wpData.id"
  >
    <template v-if="wpData">
      <div
        class="page__heading margin__y--sm"
      >
        <div
          class="page__breadcrumbs"
        >
        </div>
        <h1
          class="page__title"
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
      </div>
    </template>
  </div>
</template>

<script>
  import Page from '../plugin/inheritable/Page'

  export default {
    mixins: [Page]
  };
</script>
