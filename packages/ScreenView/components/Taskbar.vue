<script setup lang="ts">
import StartMenu from "packages/ScreenView/components/StartMenu.vue";
import Widget from "packages/ScreenView/components/Widget.vue";
import notifyLight from "packages/assets/icon/notify-light.png";
import {useSystem} from "packages/core/System";
import {TaskbarApp, TaskbarButton} from "packages/core/lib/Taskbar";
import {Event} from "packages/core/utils/Event";
import {onMounted, onUnmounted, ref} from "vue";

const system = useSystem();
const applicationLibrary = system.applicationLibrary;
const taskbarManager = system.taskbarManager;
const taskbarItems = taskbarManager.taskbarItemSet as Set<TaskbarButton | TaskbarApp>;
const applicationStateManager = system.applicationStateManager;

const taskbarItemClickCallback = (item: TaskbarApp | TaskbarButton) => {
  if (item instanceof TaskbarButton) {
    Event.publish(`click.${item.key}`)
  } else {
    const taskbar = taskbarManager.findTaskbarByKey(item.key)
    if (taskbar !== undefined) {
      if (taskbar.focus) {
        applicationStateManager.minimizeApplication(item.key)
      } else {
        applicationStateManager.openApplication(item.key)
      }
    }
  }
}

const timeString = ref('');
const dateString = ref('')
let intervalId: ReturnType<typeof setInterval> | null = null;
const updateTime = () => {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  let period = '上午';
  if (hours >= 12) {
    period = '下午';
    if (hours > 12) {
      hours -= 12;
    }
  }

  timeString.value = `${period} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  dateString.value = `${year}-${month}-${day}`;

};

onMounted(() => {
  updateTime();
  intervalId = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<template>
  <div id="taskbar">
    <div id="taskbar-left-box">
      <div class="taskbar-item" v-for="item in taskbarItems" :key="item.key"
           :class="{
      'taskbar-left':item.key==='widget' && taskbarManager.position==='center',
      'taskbar-item-focus':item.focus && item instanceof TaskbarApp,
      'taskbar-item-no-focus':!item.focus && item instanceof TaskbarApp&&applicationLibrary.applicationIsOpen(item.key)
         }"
           @click="taskbarItemClickCallback(item)">
        <img :src="item.icon" :alt="item.name" :title="item.name">
      </div>
    </div>
    <div id="taskbar-right-box">
      <div id="taskbar-tray"></div>
      <div id="taskbar-control-center"></div>
      <div id="taskbar-time-notify">
        <div>
          <span>{{ timeString }}</span>
          <br>
          <span>{{ dateString }}</span>
        </div>
        <div id="notify-button">
          <img :src="notifyLight" alt="notify">
        </div>
      </div>
      <div id="show-desktop" @click="applicationStateManager.showDesktop">
        <div></div>
      </div>
    </div>
  </div>
  <StartMenu></StartMenu>
  <Widget></Widget>
</template>

<style scoped lang="less">
#taskbar {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 4.8rem;
  backdrop-filter: saturate(3) blur(24px) brightness(1) contrast(1) grayscale(0) hue-rotate(0deg) invert(0) opacity(1) sepia(0);
  background-color: rgba(32, 32, 32, .75);
  padding: 0.4rem;
  z-index: 9999;

  .taskbar-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    margin: 0.4rem;
    border-radius: 0.4rem;
    transition: background-color 0.2s;

    &:hover {
      background-color: rgba(255, 255, 255, .12);
    }

    img {
      width: 2.4rem;
      height: 2.4rem;
    }
  }

  .taskbar-left {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
  }

  .taskbar-item-focus {
    background-color: rgba(255, 255, 255, .12);
  }

  .taskbar-item-focus::before {
    position: absolute;
    content: '';
    width: 1.6rem;
    height: 0.4rem;
    background-color: rgb(148 163 184);
    bottom: 0;
    left: 50%;
    border-radius: 0.4rem;
    margin-left: -0.8rem;
  }

  .taskbar-item-no-focus::before {
    position: absolute;
    content: '';
    width: 0.8rem;
    height: 0.4rem;
    background-color: rgb(148 163 184);
    bottom: 0;
    left: 50%;
    border-radius: 0.4rem;
    margin-left: -0.4rem;
  }
}

#taskbar-left-box {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 30rem;
}

#taskbar-right-box {
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #fff;
}

#taskbar-time-notify {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  text-align: right;
  transition: background-color 0.3s;
  padding-left: 1.2rem;
  border-radius: 0.4rem;
}

#taskbar-time-notify:hover {
  background-color: rgba(255, 255, 255, .12);
}

#notify-button img {
  width: 1.4rem;
  height: 1.4rem;
  margin: 12px;
}

#show-desktop {
  padding: 0 0.6rem;
  height: 50%;

  > div {
    height: 100%;
    border-left: 1px solid rgba(255, 255, 255, .12);
  }

  &:hover > div {
    border-left: 1px solid rgba(255, 255, 255);
  }
}
</style>