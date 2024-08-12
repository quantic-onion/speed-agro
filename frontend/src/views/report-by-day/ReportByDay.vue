<script setup lang="ts">
import { ref } from 'vue';
// components
import DateSelector from '@/components/date-selector/DateSelector.vue';
import ReportItem from '@/components/report-item/ReportItem.vue';
// helpers
import { dateHelpers } from '@/helpers/date.helpers';

const selectedDate = ref(dateHelpers.getDate());

function download() {
  console.log('DESCARGO', selectedDate.value);
}
</script>

<template>
  <ReportItem title="Por día" @download="download()">
    <DateSelector v-model="selectedDate" />
  </ReportItem>
</template>

