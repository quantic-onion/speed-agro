<script setup lang="ts">
// components
import SelectorWithArrows from '@/components/selector-with-arrows/SelectorWithArrows.vue';

const selectedYear = defineModel<number>({ required: true });

function updateYear(change: 1 | -1) {
  selectedYear.value = selectedYear.value + change;
}
</script>

<template>
  <SelectorWithArrows @change="updateYear($event)">
    {{ selectedYear }}
  </SelectorWithArrows>
</template>