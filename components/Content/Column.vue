<template>
  <div
    class="column flex"
      >
        <component
          :is="column.cmpName"
          v-if="column !== false"
          :data="column"
          :class="{
            'width--100' : columnAmount === 1
          }"
        />
        <div 
          v-else
          class='empty-column'
        />
      </div>
</template>

<script>
  import Column from '../../plugin/inheritable/Column'

  export default {
    mixins: [Column]
  }
</script>