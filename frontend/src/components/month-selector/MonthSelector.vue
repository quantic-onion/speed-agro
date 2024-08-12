<script setup lang="ts">
import { computed } from 'vue';
// components
import SelectorWithArrows from '@/components/selector-with-arrows/SelectorWithArrows.vue';

const selectedMonthNum = defineModel<number>({ required: true });

const allMonths = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const selectedMonthIndex = computed(() => selectedMonthNum.value - 1);
const selectedMonthName = computed(() => allMonths[selectedMonthIndex.value]);

function updateMonth(change: 1 | -1) {
  if (selectedMonthNum.value === 1 && change === -1) {
    selectedMonthNum.value = 12;
    return;
  }
  if (selectedMonthNum.value === 12 && change === 1) {
    selectedMonthNum.value = 1;
    return;
  }
  selectedMonthNum.value = selectedMonthNum.value + change;
}
</script>

<template>
  <SelectorWithArrows @change="updateMonth($event)">
    {{ selectedMonthName }}
  </SelectorWithArrows>
</template>
