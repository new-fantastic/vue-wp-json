<template functional>
  <img v-bind="data.attrs" v-on="listeners" :src="props.item.link" />
</template>

<script>
export default {
  name: "BaseImage",
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
</script>