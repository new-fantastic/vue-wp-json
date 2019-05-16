<template>
  <div
    v-if="data"
  >
    <div
      class="content"
      v-html="data.content.rendered"
    />
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  }
}
</script>

<style>

  @import '../../../styles/main.css';

  p {
    margin-bottom: 1rem;
  }

</style>
