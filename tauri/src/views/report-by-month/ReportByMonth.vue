<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { startOfMonth, endOfMonth, parseISO, format } from 'date-fns';
// components
import ReportItem from '@/components/report-item/ReportItem.vue';
import MonthSelector from '@/components/month-selector/MonthSelector.vue';
import YearSelector from '@/components/year-selector/YearSelector.vue';
// helpers
import { apiHelpers } from '@/helpers/api.helpers';
import { dateHelpers } from '@/helpers/date.helpers';
// stores
import { useDataToReport } from '@/stores/data-to-report';

const { selectedReportType } = storeToRefs(useDataToReport());

const selectedMonth = ref(dateHelpers.getMonth());
const selectedYear = ref(dateHelpers.getYear());

function getFirstAndLastDateOfMonth() {
  // Create a date string for the first day of the given month and year
  const dateStr = `${selectedYear.value}-${String(selectedMonth.value).padStart(2, '0')}-01`;

  // Parse the date string
  const parsedDate = parseISO(dateStr);

  // Get the first and last day of the month
  const firstDayOfMonth = startOfMonth(parsedDate);
  const lastDayOfMonth = endOfMonth(parsedDate);

  // Format the dates to YYYY-MM-DD
  const formattedFirstDay = format(firstDayOfMonth, 'yyyy-MM-dd');
  const formattedLastDay = format(lastDayOfMonth, 'yyyy-MM-dd');

  return {
    firstDayOfMonth: formattedFirstDay,
    lastDayOfMonth: formattedLastDay,
  };
}

function download() {
  const { firstDayOfMonth, lastDayOfMonth } = getFirstAndLastDateOfMonth();
  const params = {
    minDate: firstDayOfMonth,
    maxDate: lastDayOfMonth,
  }
  const fileName = `Reporte [${selectedReportType.value}] del mes ${selectedYear.value}-${selectedMonth.value}`;
  const endpoint = selectedReportType.value;
  apiHelpers.getAndDownload(endpoint, params, fileName);
}
</script>

<template>
  <ReportItem title="Por mes" @download="download()">
    <MonthSelector v-model="selectedMonth" />
    <YearSelector v-model="selectedYear" />
  </ReportItem>
</template>

