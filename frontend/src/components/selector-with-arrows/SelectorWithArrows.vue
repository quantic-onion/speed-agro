<script setup lang="ts">
const emit = defineEmits<{
  change: [-1 | 1];
}>();
</script>

<template>
  <div class="selector-with-arrows">
    <!-- arrow left -->
    <div class="selector-with-arrows__arrow" @click="emit('change', -1)">
      <FontAwesomeIcon icon="chevron-left" />
    </div>
    <!-- content -->
    <div class="content">
      <slot />
    </div>
    <!-- arrow right -->
    <div class="selector-with-arrows__arrow" @click="emit('change', +1)">
      <FontAwesomeIcon icon="chevron-right" />
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.selector-with-arrows
  display flex
  align-items center
  .content
    padding 0.25rem
    display inline-flex
    align-items center
  .selector-with-arrows__arrow
    cursor pointer
    transition 0.3s
    width 1.5rem
    height @width
    display flex
    justify-content center
    align-items center
    border-radius 0.25rem
    font-size 0.75rem
    &:hover
      background-color $color-darker
</style>
