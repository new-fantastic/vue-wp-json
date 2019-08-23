<template>
  <component v-if="component" :is="component" :item="item" v-bind="$attrs" v-on="$listeners" />
</template>

<script>
export default {
  props: {
    item: {
      type: Number,
      required: true
    }
  },

  components: {
    BaseImage: () => import("./BaseImage.vue"),
    BaseVideo: () => import("./BaseVideo.vue")
  },

  computed: {
    component() {
      const splitted = this.item.mime_type.split("/");
      if (splitted.length >= 1) {
        // Making first char bigger
        const biggerStartName =
          splitted[0].substr(0, 1).toUpperCase() + splitted[0].substr(1);
        return `Base${biggerStartName}`;
      }
      return null;
    }
  }
};
</script>