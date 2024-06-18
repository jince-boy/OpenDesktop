<script setup lang="ts">
import {computed} from "vue";
import {useSystem} from "packages/core/System";
import {Shortcut} from "packages/core/lib/Shortcut";

const props = defineProps({
  application: {
    type: Shortcut,
    required: true
  }
})
const system = useSystem();
const applicationStateManager = system.applicationStateManager;
const systemAttr = system.systemManager;
// app-item的动态样式
const appItemStyle = computed(() => {
  return {
    width: `${systemAttr.attr.desktopIconSize * 0.3}rem`,
    height: `${systemAttr.attr.desktopIconSize * 0.25}rem`
  }
})
// 桌面图标的动态样式
const desktopIconStyle = computed(() => {
  return {
    width: `${systemAttr.attr.desktopIconSize / 10}rem`,
    height: `${systemAttr.attr.desktopIconSize / 10}rem`
  }
})
// 文字大小的动态样式
const fontSizeStyle = computed(() => {
  return {
    fontSize: `${systemAttr.attr.desktopFontSize / 10}rem`
  }
})
</script>

<template>
  <div class="app-item"
       :style="appItemStyle" @dblclick="applicationStateManager.openApplication(props.application.key)">
    <img :src="props.application.icon" :alt="props.application.name"
         :style="desktopIconStyle">
    <span :style="fontSizeStyle">{{ props.application.name }}</span>
  </div>
</template>

<style scoped lang="less">
.app-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0.4rem;
  border-radius: 0.4rem;
  color: #fff;

  span {
    text-align: center;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
  }
}

.app-item:hover {
  background-color: rgba(255, 255, 255, 0.12);
  cursor: pointer;
  transition: background-color 0.15s;
}
</style>