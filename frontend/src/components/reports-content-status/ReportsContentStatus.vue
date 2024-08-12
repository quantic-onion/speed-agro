<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
// stores
import { useDataToReport } from '@/stores/data-to-report';
const { isLoading, selectedReportType, descargas, envasado, formulador } = storeToRefs(useDataToReport());

const isReadyToDownload = computed(() => {
  if (selectedReportType.value === 'descargas') return !!descargas.value.length;
  if (selectedReportType.value === 'envasado') return !!envasado.value.length;
  if (selectedReportType.value === 'formulador') return !!formulador.value.length;
  return false;
});

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
