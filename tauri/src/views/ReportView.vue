<script setup lang="ts">
import ConnectionSettings from './connection-settings/ConnectionSettings.vue';
import ReportTypeSwitch from './report-type-switch/ReportTypeSwitch.vue';
import ReportByDay from './report-by-day/ReportByDay.vue';
import ReportByMonth from './report-by-month/ReportByMonth.vue';
import ReportByDateRange from './report-by-date-range/ReportByDateRange.vue';
</script>

<template>
  <div class="report-view">
    <ConnectionSettings />
    <ReportTypeSwitch />
    <div class="report-items">
      <ReportByDay />
      <ReportByMonth />
      <ReportByDateRange />
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
