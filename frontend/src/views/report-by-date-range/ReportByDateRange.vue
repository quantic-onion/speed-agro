<script setup lang="ts">
import { ref } from 'vue';
// components
import ReportItem from '@/components/report-item/ReportItem.vue';
import DateSelector from '@/components/date-selector/DateSelector.vue';
// helpers
import { dateHelpers } from '@/helpers/date.helpers';

const selectedDateStart = ref(dateHelpers.getDate({ months: -3 }));
const selectedDateEnd = ref(dateHelpers.getDate());

function download() {
  console.log('DESCARGO', selectedDateStart.value, selectedDateEnd.value);
}
</script>

<template>
  <ReportItem title="Por rango" @download="download()">
    <div class="report-by-date-range__filters">
      <div class="report-by-date-range__filters--item">
        <span>Inicio:</span>
        <DateSelector v-model="selectedDateStart" />
      </div>
      <div class="report-by-date-range__filters--item">
        <span>Fin:</span>
        <DateSelector v-model="selectedDateEnd" />
      </div>
    </div>
  </ReportItem>
</template>

<style lang="stylus" scoped>
.report-by-date-range__filters
  width 100%
  display flex
  flex-direction column
  gap 0.5rem
  .report-by-date-range__filters--item
    display flex
    justify-content space-between
</style>