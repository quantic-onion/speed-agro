<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
// stores
import { useDataToReport } from '@/stores/data-to-report';

const isOpened = ref(false);
const { instanceSettings } = storeToRefs(useDataToReport());

const instanceSettingsMutable = ref({ ...instanceSettings.value });

function saveChanges() {
  useDataToReport().updateInstanceSettings(instanceSettingsMutable.value)
}
</script>

<template>
  <button @click="isOpened = !isOpened">
    {{ isOpened ? 'Ocultar' : 'Settings' }}
  </button>
  <ul v-if="isOpened" class="settings-container">
    <!-- host -->
    <li>
      <label>host</label>
      <input v-model="instanceSettingsMutable.host" @input="saveChanges()" />
    </li>
    <!-- port -->
    <li>
      <label>port</label>
      <input v-model="instanceSettingsMutable.port" @input="saveChanges()" />
    </li>
    <!-- instance -->
    <li>
      <label>instance</label>
      <input v-model="instanceSettingsMutable.instance" @input="saveChanges()" />
    </li>
    <!-- user -->
    <li>
      <label>user</label>
      <input v-model="instanceSettingsMutable.user" @input="saveChanges()" />
    </li>
    <!-- pass -->
    <li>
      <label>pass</label>
      <input v-model="instanceSettingsMutable.pass" @input="saveChanges()" />
    </li>
  </ul>
</template>

<style lang="stylus" scoped>
button
  background-color $color-primary
  border none
  padding 0.25rem 0.5rem
  border-radius 0.5rem
  cursor pointer
.settings-container
  display flex
  flex-direction column
  justify-content space-between
  align-items space-between
ul
  li
    display flex
    label
      display block
      width 3rem
</style>