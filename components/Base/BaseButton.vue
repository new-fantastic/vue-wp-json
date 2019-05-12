<template>
  <button 
    class="btn position--center font__size--ms font__weight--bold padding__y--xs padding__x--ms hover__opacity--md transition__ease-out--slow"
    v-bind="$attrs"
    :class="{
      'btn--sm': size === 'sm',
      'btn--lg': size === 'lg',
      'btn--full': size === 'full',
      'btn--bordered': type === 'bordered',
      'background__color--dark color--light' : color === 'dark',
      'background__color--light color--dark' : color === 'light'
    }"
    style="font-family: inherit;"
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
      class="btn__inner"
      @click="emit"
    >
      <slot />
    </div>
  </button>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'dark'
    },
    size: {
      type: String,
      default: 'sm'
    },
    link: {
      type: String,
      default: ''
    },
    externalLink: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    },
    event: {
      type: String,
      default: ''
    }
  },
  methods: {
    emit () {
      this.$bus.$emit(this.event)
    }
  }
}
</script>

<style>

  @import '../../styles/main.css';

</style>
