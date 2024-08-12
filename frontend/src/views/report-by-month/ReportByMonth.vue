<script setup lang="ts">
import { ref } from 'vue';
// components
import ReportItem from '@/components/report-item/ReportItem.vue';
import MonthSelector from '@/components/month-selector/MonthSelector.vue';
import YearSelector from '@/components/year-selector/YearSelector.vue';
// helpers
import { dateHelpers } from '@/helpers/date.helpers';

const selectedMonth = ref(dateHelpers.getMonth());
const selectedYear = ref(dateHelpers.getYear());

function download() {
  console.log('DESCARGO', selectedMonth.value, selectedYear.value);
}
</script>

<template>
  <ReportItem title="Por mes" @download="download()">
    <MonthSelector v-model="selectedMonth" />
    <YearSelector v-model="selectedYear" />
  </ReportItem>
</template>

