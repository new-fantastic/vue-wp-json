<template functional>
  <video
    v-bind="data.attrs"
    v-on="listeners"
    :width="props.item.media_details.width"
    :height="props.item.media_details.height"
    controls
  >
    <source :src="props.item.link" :type="props.item.media_details.mime_type" />Your browser does not support Video markup
  </video>
</template>

<script>
export default {
  name: "BaseVideo",
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
</script>