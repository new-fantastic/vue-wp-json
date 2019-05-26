<template>
  <section
    class="section container"
    v-if="success === true && anyFilledColumn"
  >
    <div
      class="container__inner"
      :class="sectionName"
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
