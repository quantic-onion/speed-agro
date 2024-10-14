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
function resetDefault() {
  useDataToReport().resetToDefaultInstanceSettings();
  instanceSettingsMutable.value = { ...instanceSettings.value };
}
</script>

<template>
  <div class="connection-settings">
    <div class="buttons-container">
      <button @click="isOpened = !isOpened">
        {{ isOpened ? 'Ocultar' : 'Settings' }}
      </button>
      <button v-if="isOpened" class="dark" @click="resetDefault()">
        Recuperar valores default
      </button>
    </div>
    <ul v-if="isOpened" class="settings-container">
      <!-- host -->
      <li>
        <label>host</label>
        <input v-model="instanceSettingsMutable.host" @input="saveChanges()" />
      </li>
      <!-- port -->
      <li>
        <label>port</label>
        <input type="number" v-model="instanceSettingsMutable.port" @input="saveChanges()" />
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
  </div>
</template>

<style lang="stylus" scoped>
.connection-settings
  width 13rem
  .buttons-container
    display flex
    justify-content space-between
    button
      background-color $color-primary
      border none
      padding 0.25rem 0.5rem
      border-radius 0.5rem
      cursor pointer
      &.dark
        background-color $color-dark
        color $color-text
  ul.settings-container
    display flex
    flex-direction column
    justify-content space-between
    align-items space-between
    width 100%
    padding 0.25rem
    padding-top 0.5rem
    li
      width 100%
      display flex
      justify-content space-between
</style>