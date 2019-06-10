<template>
  <video 
    v-bind="$attrs"
    v-on="$listeners"
    :width="mediaDetails.width" 
    :height="mediaDetails.height" 
    controls
  >
    <source 
      :src="item.link" 
      :type="mediaDetails.mime_type"
    />
    Your browser does not support Video markup
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