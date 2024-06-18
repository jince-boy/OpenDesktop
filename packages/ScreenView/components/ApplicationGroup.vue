<script setup lang="ts">
import ApplicationItem from "packages/ScreenView/components/ApplicationItem.vue";
import {useSystem} from "packages/core/System";
import {Shortcut} from "packages/core/lib/Shortcut";

const system = useSystem();
const shortcuts = system.shortcutManager.shortcuts as Set<Shortcut>;
</script>

<template>
  <div id="app-list">
    <ApplicationItem v-for="item in shortcuts" :key="item.key" :application="item"></ApplicationItem>
  </div>
</template>

<style scoped lang="less">
#app-list {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>