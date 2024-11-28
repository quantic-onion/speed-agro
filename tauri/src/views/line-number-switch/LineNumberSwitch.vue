<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
// stores
import { useDataToReport } from '@/stores/data-to-report';
// types
import { LineNumber } from '@/types/general.type';

const { selectedReportType, selectedLineNumber } = storeToRefs(useDataToReport());
const allLineNumber = computed(() => {
  if (selectedReportType.value === 'envasado') return [1, 2, 3];
  if (selectedReportType.value === 'formulador') return [1, 2, 3, 4];
  return [];
});

function updateLineNumber(lineNumber: LineNumber) {
  useDataToReport().setLineNumber(lineNumber);
}
</script>

<template>
  <div v-if="allLineNumber.length" class="report-type-switch">
    <span
      v-for="lineNumber in allLineNumber"
      :key="lineNumber"
      class="report-type-switch__item"
      :class="{ 'is-selected': lineNumber == selectedLineNumber }"
      @click="updateLineNumber(lineNumber as LineNumber)"
    >
      Linea {{ lineNumber }}
    </span>
  </div>
</template>

<style lang="stylus" scoped>
.report-type-switch
  display flex
  justify-content flex-end
  .report-type-switch__item
    padding 0.25rem 0.5rem
    cursor pointer
    transition 0.3s
    &.is-selected
      color $color-primary
      font-weight bold
    &:hover
      color $color-secondary
</style>
