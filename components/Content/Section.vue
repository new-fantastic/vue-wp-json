<template>
  <section
    class="section container"
    :class="{
      'margin__y--sm' : data.section_options.margins.margins_y === 'sm',
      'margin__y--md' : data.section_options.margins.margins_y === 'md',
      'margin__y--lg' : data.section_options.margins.margins_y === 'lg'
    }"
    v-if="success === true && anyFilledColumn"
  >
    <div
      class="container__inner"
      :class="[
        sectionName,
        { 
          'container__inner--boxed' : data.section_options.margins.margins_x === true,
          'height--100vh' : data.section_options.height === '100vh',
          'height--50vh' : data.section_options.height === '50vh',
          'height--xs' : data.section_options.height === 'xs',
          'height--sm' : data.section_options.height === 'sm',
          'height--md' : data.section_options.height === 'md',
          'height--lg' : data.section_options.height === 'lg',
          'height--xl' : data.section_options.height === 'xl'
        }
      ]"
    >
      <Column
        v-for="(column, index) in columns"
        :key="index"
        :column="column"
        :data="data"
        :index="index"
        :columnAmount="columnAmount"
      />
    </div>
  </section>
  <NotFound v-else-if="success === false"/>
</template>

<script>
  import Section from '../../plugin/inheritable/Section'

  export default {
    mixins: [Section]
  }

</script>

<style lang="scss">

  @import '../../styles/main.css';

</style>
