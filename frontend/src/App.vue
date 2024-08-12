<script setup lang="ts">
import ReportView from '@/views/ReportView.vue'
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
    
    <ReportView />
  </div>
</template>

<style lang="stylus" scoped>
$color-primary = #1A7043

.app-content
  display flex
  flex-direction column
  gap 2rem
  padding 2rem
  .main-logo-container
    h1
      color $color-primary
      font-size 2rem
      font-size 2.5rem
      line-height 2rem
      padding-left 1rem
</style>
