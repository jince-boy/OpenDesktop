<script setup lang="ts">
import ApplicationGroup from "packages/ScreenView/components/ApplicationGroup.vue";
import WindowGroup from "packages/ScreenView/components/WindowGroup.vue";
</script>

<template>
  <div id="desktop">
    <ApplicationGroup></ApplicationGroup>
    <WindowGroup></WindowGroup>
  </div>
</template>

<style scoped lang="less">
#desktop {
  position: relative;
  height: calc(100vh - 4.8rem);
}
</style>