<template>
  <img 
    v-bind="$attrs"
    v-on="$listeners"
    :src="item.link"
  />
</template>

<script>
  export default {
    name: 'BaseImage',
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