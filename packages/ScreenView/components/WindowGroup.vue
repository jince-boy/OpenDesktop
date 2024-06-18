<script setup lang="ts">
import WindowItem from "packages/ScreenView/components/WindowItem.vue";
import {useSystem} from "packages/core/System";
import {BrowserWindow} from "packages/core/lib/BrowserWindow";

const system = useSystem();
const browserWindowManager = system.browserWindowManager;
const browserWindowList = browserWindowManager.browserWindowSet as Set<BrowserWindow>;
</script>

<template>
  <WindowItem v-for="item in browserWindowList" :key="item.attr.key" :window="item"></WindowItem>
</template>

<style scoped lang="less">

</style>