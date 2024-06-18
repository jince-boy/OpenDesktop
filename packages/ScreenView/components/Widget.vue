<script setup lang="ts">
import {ref} from "vue";
import {EventEnum} from "packages/core/constants/EventEnum";
import {Event} from "packages/core/utils/Event"

const widgetShow = ref(false);
Event.subscribe(EventEnum.widgetClick, (open: boolean | undefined) => {
  if (open === undefined) {
    widgetShow.value = !widgetShow.value
  } else {
    widgetShow.value = open;
  }
})
</script>

<template>
  <Transition name="widget">
    <div id="widget" v-if="widgetShow">
      小组件
    </div>
  </Transition>
</template>

<style scoped lang="less">
.widget-enter-active,
.widget-leave-active {
  transition: transform 0.5s;
}

.widget-enter-from,
.widget-leave-to {
  transform: translateX(-100%);
}

#widget {
  position: absolute;
  top: 1.2rem;
  left: 1.2rem;
  width: auto;
  min-width: 76rem;
  height: calc(100vh - 7.2rem);
  background-color: rgba(31, 31, 31, .25);
  backdrop-filter: saturate(3) blur(24px) brightness(1) contrast(1) grayscale(0) hue-rotate(0deg) invert(0) opacity(1) sepia(0);
  border-radius: 0.4rem;
  padding: 1.2rem;
  transition: transform 0.3s;
  color: #fff;
}
</style>