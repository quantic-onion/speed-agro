<script setup lang="ts">
import { ref } from 'vue';
import { invoke } from '@tauri-apps/api/tauri';
// components
import DateSelector from '@/components/date-selector/DateSelector.vue';
import ReportItem from '@/components/report-item/ReportItem.vue';
// helpers
import { dateHelpers } from '@/helpers/date.helpers';

const selectedDate = ref(dateHelpers.getDate());

async function download() {
  try {
    // let response = await invoke('greet', { name: 'licha' });
    // console.log('Respuesta de Tauri1:', response);
    // response = await invoke('add_numbers', { a: 3, b: 9 });
    // console.log('Respuesta de Tauri2:', response);
    const response = await invoke('fetch_data');
    console.log('Respuesta de Tauri2:', response);
    console.log('DESCARGO', selectedDate.value);
  } catch (error) {
    alert(error);
    console.error('Error al llamar a la función de Tauri:', error);
  }
}
</script>

<template>
  <ReportItem title="Por día" @download="download()">
    <DateSelector v-model="selectedDate" />
  </ReportItem>
</template>

