<template>
  <div
    v-if="wpData !== null && wpData !== false && wpData"
    class="post"
    :key="wpData.id"
  >
      <template v-if="wpData.acf && wpData.acf.sections">
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
      </template>
      <div
        class="post__content"
      >
        <!-- <div class="author">Author: </div> -->
        <div class="date">Date: {{ wpData.date_gmt.replace('T', ' ') }}</div>
        <!-- <div class="tags">Tags:  -->
          <!-- <span v-for="(tag, index) in wpData.tags.slice(0, -1)" :key="index">
            {{ tag }},&nbsp;
          </span>
          <span v-if="wpData.tags.length > 0">
            {{ wpData.tags[wpData.tags.length - 1] }}
          </span> -->
      </div>
      <Sections
        v-if="wpData"
        :data="wpData"
      />
  </div>
</template>

<script>
  import Post from '../plugin/inheritable/Post'

  export default {
    mixins: [Post]
  };
</script>
