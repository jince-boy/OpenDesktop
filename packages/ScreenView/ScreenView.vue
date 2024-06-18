<script setup lang="ts">
import {useSystem} from "packages/core/System";
import {Event} from "packages/core/utils/Event"
import Desktop from "packages/ScreenView/components/Desktop.vue";
import Taskbar from "packages/ScreenView/components/Taskbar.vue";

const system = useSystem();
const applicationStateManager = system.applicationStateManager;

// todo: 这个点击事件有问题，不精确
// 全局点击事件
const globalClick = (event: MouseEvent) => {
  const targetElement = event.target as Element;
  if (!targetElement.closest('.window-item') && !targetElement.closest('.taskbar-item')) {
    // 如果点击的不是窗口，全部窗口失去焦点
    applicationStateManager.focusApplication()
  }
  if (!targetElement.closest('#start-menu') && !targetElement.closest('.taskbar-item')) {
    Event.publish(`click.home`, false)
  }
}
</script>

<template>
  <div id="screen-view" :style="{backgroundImage:`url(${system.systemManager.attr.background})`}"
       @click.capture="globalClick($event)">
    <Desktop></Desktop>
    <Taskbar></Taskbar>
  </div>
</template>

<style scoped lang="less">
#screen-view {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  overflow: hidden;
}
</style>