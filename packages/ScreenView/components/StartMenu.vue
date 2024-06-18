<script setup lang="ts">
import {ref} from "vue";
import {Icon} from "@vicons/utils";
import {PowerOff} from "@vicons/fa"
import {ChevronRight12Regular} from "@vicons/fluent"
import {useSystem} from "packages/core/System";
import {EventEnum} from "packages/core/constants/EventEnum";
import {Event} from "packages/core/utils/Event"

const system = useSystem();
const startMenu = system.startMenuManager.startMenu;
const applicationStateManager = system.applicationStateManager;
const showMenu = ref(false);

Event.subscribe(EventEnum.homeClick, (open: boolean | undefined) => {
  if (open === undefined) {
    showMenu.value = !showMenu.value
  } else {
    showMenu.value = open;
  }
})
const openApplication = (key: string) => {
  applicationStateManager.openApplication(key);
  showMenu.value = false;
}
</script>

<template>
  <Transition name="start-menu">
    <div id="start-menu" v-if="showMenu">
      <div id="start-menu-header">
        <span>已固定</span>
        <div class="all-application">
          <span>所有应用</span>
          <Icon size="16">
            <ChevronRight12Regular/>
          </Icon>
        </div>
      </div>
      <div id="start-menu-content">
        <div class="start-menu-item" v-for="item in startMenu"
             @click="openApplication(item.key)">
          <img :src="item.icon" :alt="item.name">
          <span>{{ item.name }}</span>
        </div>
      </div>
      <div id="start-menu-footer">
        <div></div>
        <div id="power-off">
          <Icon size="16">
            <PowerOff/>
          </Icon>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="less">
#start-menu {
  position: absolute;
  backdrop-filter: saturate(3) blur(24px) brightness(1) contrast(1) grayscale(0) hue-rotate(0deg) invert(0) opacity(1) sepia(0);
  background-color: rgba(32, 32, 32, .75);
  width: 64rem;
  bottom: 5.6rem;
  left: 50%;
  margin-left: -32rem;
  border-radius: 0.6rem;
  overflow: hidden;
  transition: bottom 0.3s;
  z-index: 9998;
  color: #fff;
}

#start-menu-header {
  display: flex;
  margin-top: 1.2rem;
  justify-content: space-between;
  align-items: center;
  padding: 0 2.4rem;
  font-size: 1.4rem;
}


.all-application {
  display: flex;
  align-items: center;
  padding: 0.6rem;
  border-radius: 0.4rem;
  transition: all 0.3s;


  &:hover {
    background-color: rgba(255, 255, 255, .12);
  }
}

#start-menu-content {
  display: flex;
  flex-wrap: wrap;
  padding: 1.6rem 1.2rem;
  height: auto;
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }

  .start-menu-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 9.6rem;
    height: 8rem;
    border-radius: 0.4rem;
    transition: all 0.3s;
    margin: 1.2rem;

    img {
      width: 2.8rem;
      height: 2.8rem;
    }

    span {
      text-align: center;
      margin-top: 0.8rem;
    }

    &:hover {
      background-color: rgba(255, 255, 255, .12);
    }
  }

}

#start-menu-footer {
  border-top: 1px solid #9e9e9e;
  height: 7.4rem;
  display: flex;
  padding: 1.2rem 4.8rem;
  align-items: center;
  justify-content: space-between;

  #power-off {
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 0.4rem;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background-color: rgba(255, 255, 255, .12);
    }
  }
}

.start-menu-enter-active,
.start-menu-leave-active {
  bottom: 56px !important;
}

.start-menu-enter-from,
.start-menu-leave-to {
  bottom: -700px !important;
}

</style>