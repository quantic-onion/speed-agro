<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
// components
import DateSelector from '@/components/date-selector/DateSelector.vue';
import ReportItem from '@/components/report-item/ReportItem.vue';
// helpers
import { apiHelpers } from '@/helpers/api.helpers';
import { dateHelpers } from '@/helpers/date.helpers';
// stores
import { useDataToReport } from '@/stores/data-to-report';

const { selectedReportType } = storeToRefs(useDataToReport());

const selectedDate = ref(dateHelpers.getDate());

async function download() {
  const params = {
    minDate: selectedDate.value,
    maxDate: selectedDate.value,
  }
  const fileName = `Reporte [${selectedReportType.value}] del día ${selectedDate.value}`;
  const endpoint = 'descargas';
  apiHelpers.getAndDownload(endpoint, params, fileName);
}
</script>

<template>
  <ReportItem title="Por día" @download="download()">
    <DateSelector v-model="selectedDate" />
  </ReportItem>
</template>

