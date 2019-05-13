<template>
  <div
    class="column flex"
    :class="{
      'height--xs' : data.section_content['column_' + (index+1)].column_options.height.mobile === 'xs', 
      'height--sm' : data.section_content['column_' + (index+1)].column_options.height.mobile === 'sm', 
      'height--md' : data.section_content['column_' + (index+1)].column_options.height.mobile === 'md', 
      'height--lg' : data.section_content['column_' + (index+1)].column_options.height.mobile === 'lg', 
      'height--xl' : data.section_content['column_' + (index+1)].column_options.height.mobile === 'xl', 
      'height--auto' : data.section_content['column_' + (index+1)].column_options.height.desktop === 'auto', 
      'height--50vh' : data.section_content['column_' + (index+1)].column_options.height.desktop === '50', 
      'height--100vh' : data.section_content['column_' + (index+1)].column_options.height.desktop === '100'
    }"
      >
        <component
          :is="column.cmpName"
          v-if="column !== false"
          :data="column"
          :class="{
            'width--100' : columnAmount === 1,
            'desktop--hidden' : data.section_content['column_' + (index+1)].column_options.visibility.desktop === 'hidden',
            'mobile--hidden' : data.section_content['column_' + (index+1)].column_options.visibility.mobile === 'hidden'
          }"
        />
        <div 
          v-else
          class='empty-column'
        />
      </div>
</template>

<script>
  import blocks from '../blocks'

  export default {
    props: {
      column: {
        type: Object,
        required: true
      },
      data: {
        type: Object,
        required: true
      },
      index: {
        type: Number,
        required: true
      },
      columnAmount: {
        type: Number,
        required: true
      }
    },

    components: blocks
  }
</script>