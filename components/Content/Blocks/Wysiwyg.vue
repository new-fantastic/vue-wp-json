<template>
  <div
    v-if="data"
    id="wysiwyg"
    class="wysiwyg__wrapper"
    :class="{
      'align__self--top' : data.wysiwyg_options.inner_layout.position_y === 'top',
      'align__self--center' : data.wysiwyg_options.inner_layout.position_y === 'center',
      'align__self--bottom' : data.wysiwyg_options.inner_layout.position_y === 'bottom',
      'justify__self--left' : data.wysiwyg_options.inner_layout.position_x === 'left',
      'justify__self--center' : data.wysiwyg_options.inner_layout.position_x === 'center',
      'justify__self--right' : data.wysiwyg_options.inner_layout.position_x === 'right',
      'padding--sm' : data.wysiwyg_options.inner_layout.padding === 'sm',
      'padding--md' : data.wysiwyg_options.inner_layout.padding === 'md',
      'padding--lg' : data.wysiwyg_options.inner_layout.padding === 'lg',
      'width--auto' : data.wysiwyg_options.inner_layout.width == 'auto',
      'width--50' : data.wysiwyg_options.inner_layout.width == '50',
      'width--100' : data.wysiwyg_options.inner_layout.width == '100'
    }"
  >
    <div
      class="wysiwyg__content"
      v-html="data.wysiwyg_content"
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
