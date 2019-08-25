<template>
  <button 
    v-bind="$attrs"
    v-on="$listeners"
  >
    <router-link
      v-if="link !== '' && externalLink === false"
      :to="link"
    >
      <slot />
    </router-link>
    <a
      v-else-if="link !== '' && externalLink === true"
      :href="link"
    >
      <slot />
    </a>
    <div
      v-else
      @click="emit"
    >
      <slot />
    </div>
  </button>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      default: ''
    },
    externalLink: {
      type: Boolean,
      default: false
    },
    event: {
      type: String,
      default: ''
    }
  },
  methods: {
    emit () {
      this.$emit(this.event)
    }
  }
}
</script>
