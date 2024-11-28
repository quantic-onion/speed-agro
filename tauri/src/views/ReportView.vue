<script setup lang="ts">
import { storeToRefs } from 'pinia';
// stores
import { useDataToReport } from '@/stores/data-to-report';
// components
// import ConnectionSettings from './connection-settings/ConnectionSettings.vue';
import ReportTypeSwitch from './report-type-switch/ReportTypeSwitch.vue';
import ReportByDay from './report-by-day/ReportByDay.vue';
import ReportByMonth from './report-by-month/ReportByMonth.vue';
import ReportByDateRange from './report-by-date-range/ReportByDateRange.vue';
import LineNumberSwitch from './line-number-switch/LineNumberSwitch.vue';

const { selectedReportType } = storeToRefs(useDataToReport());
</script>

<template>
  <div class="report-view">
    <!-- <ConnectionSettings /> -->
    <ReportTypeSwitch />
    <LineNumberSwitch />
    <!-- <ReportTypeSwitch /> -->
    <div class="report-items">
      <ReportByDay />
      <ReportByMonth v-if="selectedReportType === 'envasado'" />
      <ReportByDateRange v-if="selectedReportType === 'envasado'" />
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.report-view
  padding-top 3rem
.report-items
  display flex
  justify-content space-around
  padding-top 1rem
</style>
