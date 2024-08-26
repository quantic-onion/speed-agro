<script setup lang="ts">
defineProps<{
  title: string;
}>();

const emit = defineEmits<{
  download: [];
}>();
</script>

<template>
  <div class="report-item">
    <h4>{{ title }}</h4>
    <div class="report-item__filters">
      <slot />
    </div>
    <button @click="emit('download')">
      Descargar
    </button>
  </div>
</template>

<style lang="stylus" scoped>
.report-item
  padding 2rem
  padding-top 1rem
  display flex
  flex-direction column
  gap 0.5rem
  background-color #222
  border-radius 1rem
  width 18rem
  justify-content space-between
  h4
    font-size 2rem
    font-weight bold
  .report-item__filters
    display flex
    justify-content space-between
    padding-bottom 1rem
  button
    background-color $color-primary
    padding 0.5rem 1rem
    border none
    font-size 1.1rem
    border-radius 0.25rem
    cursor pointer
</style>
