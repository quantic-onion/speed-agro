<script setup lang="ts">
import { storeToRefs } from 'pinia';
// types
import type { ReportType } from '@/types/general.type';
// stores
import { useDataToReport } from '@/stores/data-to-report';

const { selectedReportType } = storeToRefs(useDataToReport());

const allReportTypes = [
  'descargas',
  'envasado',
  'formulador',
] as const;

function updateReportType(reportType: ReportType) {
  useDataToReport().setReportType(reportType);
}
</script>

<template>
  <div class="report-type-switch">
    <span
      v-for="reportType in allReportTypes"
      :key="reportType"
      class="report-type-switch__item"
      :class="{ 'is-selected': reportType == selectedReportType }"
      @click="updateReportType(reportType)"
    >
      {{ reportType }}
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
