<template>
  <video 
    v-bind="$attrs"
    v-on="$on"
    :width="mediaDetails.width" 
    :height="mediaDetails.height" 
    controls
  >
    <source 
      :src="item.link" 
      :type="mediaDetails.mime_type"
    />
    Twoja przeglądarka nie obsługuje tagu video
  </video>
</template>

<script>
  export default {
    name: 'BaseVideo',
    props: {
      item: {
        type: Object,
        required: true
      },
      mediaDetails: {
        type: Object,
        required: true
      }
    }
  }
</script>