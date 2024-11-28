<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
// stores
import { useDataToReport } from '@/stores/data-to-report';
const { isLoading } = storeToRefs(useDataToReport());

const isReadyToDownload = ref(false);

const computedIcon = computed(() => {
  if (isLoading.value) return 'spinner';
  return isReadyToDownload.value ? 'check' : 'times';
});
const computedText = computed(() => {
  if (isLoading.value) return 'Cargando...';
  return isReadyToDownload.value ? 'Listo para descargar' : 'No se encontraron resultados';
});
const currentStatus = computed(() => {
  if (isLoading.value) return 'loading';
  return isReadyToDownload.value ? 'success' : 'danger';
});

function testDatabaseConnection() {
  // TODO
  isReadyToDownload.value = true;
}

testDatabaseConnection();
</script>

<template>
  <div class="reports-content-status" :class="`current-status--${currentStatus}`">
    <FontAwesomeIcon :icon="computedIcon" :spin="isLoading" />
    <span>
      {{ computedText }}
    </span>
  </div>
</template>

<style lang="stylus" scoped>
.reports-content-status
  position absolute
  right 2rem
  bottom 2rem
  display inline-flex
  align-items center
  padding 0.5rem 1rem
  border-radius 0.5rem
  gap 1rem
  color $color-text
  background-color $color-dark
  &.current-status--success
    color $color-success
    background-color $color-success-background
  &.current-status--danger
    color $color-danger
    background-color $color-danger-background
</style>
