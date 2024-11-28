<script setup lang="ts">
// components
import SelectorWithArrows from '@/components/selector-with-arrows/SelectorWithArrows.vue';
// helpers
import { dateHelpers } from '@/helpers/date.helpers';

const selectedDate = defineModel<string>({ required: true });

function updateDate(change: 1 | -1) {
  // @ts-ignore
  if (change === 1) change = 2; // this is a bug. I suppose related to time zones
  selectedDate.value = dateHelpers.getDate({ date: selectedDate.value, days: change });
}
</script>

<template>
  <SelectorWithArrows @change="updateDate($event)">
    <input v-model="selectedDate" type="date" />
  </SelectorWithArrows>
</template>

<style lang="stylus" scoped>
input
  background-color $color-dark
  border none
  color $color-text
  cursor pointer
  &::-webkit-calendar-picker-indicator
    filter: invert(34%) sepia(88%) saturate(500%) hue-rotate(345deg) brightness(97%) contrast(98%);
</style>
