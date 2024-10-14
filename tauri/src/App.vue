<script setup lang="ts">
import { RouterView } from 'vue-router';
// components
import ReportsContentStatus from '@/components/reports-content-status/ReportsContentStatus.vue';
</script>

<template>
  <div class="app-content">
    <header class="main-logo-container">
      <img
        alt="Speed Agro logo"
        class="logo"
        src="@/assets/speed-agro-logo.png"
        height="100"
      />
      <h1>Reportes</h1>
    </header>
    
    <RouterView />
    <ReportsContentStatus />
  </div>
</template>

<style lang="stylus">
html
  font-size 22px
.app-content
  display flex
  flex-direction column
  gap 2rem
  padding 2rem
  width 100vw
  height 100vh
  color: rgba(235, 235, 235, 0.64);
  background: #181818;
  .main-logo-container
    h1
      color $color-primary
      font-size 2rem
      font-size 2.5rem
      line-height 2rem
      padding-left 1rem
</style>
