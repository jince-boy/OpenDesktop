<script setup lang="ts">
import {computed} from "vue";
import {useSystem} from "packages/core/System";
import {BrowserWindow} from "packages/core/lib/BrowserWindow";
import close from "packages/assets/icon/close.png"
import maximize from "packages/assets/icon/maximize.png"
import minimize from "packages/assets/icon/minimize.png"

const props = defineProps({
  window: {
    type: BrowserWindow,
    required: true
  }
})
const system = useSystem();
const applicationStateManager = system.applicationStateManager;
const useBrowserWindowStyle = computed(() => {
  return {
    width: `${props.window.attr.width}px`,
    height: `${props.window.attr.height}px`,
    minWidth: `${props.window.attr.minWidth}px`,
    minHeight: `${props.window.attr.minHeight}px`,
    top: `${props.window.attr.y}px`,
    left: `${props.window.attr.x}px`,
    zIndex: `${props.window.zIndex}`
  }
})
</script>

<template>
  <div class="window-item" :style="useBrowserWindowStyle"
       :class="{
          'rounded':!props.window.windowState.maximize,
          'w-full':props.window.windowState.maximize,
          'h-full':props.window.windowState.maximize,
          'top-0':props.window.windowState.maximize,
          'left-0':props.window.windowState.maximize,
          'transition-all':!props.window.moveState.isMove&&!props.window.resizeState.isResize,
          'window-item-shadow':props.window?.zIndex===9999
        }" v-show="!props.window.windowState.minimize"
       @mousedown.stop="applicationStateManager.focusApplication(props.window.attr.key)">
    <div class="window-item-menubar" @mousedown.passive="props.window?.startMove($event)"
         :style="{'background-color':props.window?.attr.backgroundColor}">
      <div class="window-item-menubar-title">
        <img :src="props.window.attr.icon" :alt="props.window.attr.title">
        <span>{{ props.window.attr.title }}</span>
      </div>
      <div class="window-item-menubar-button">
        <div class="minimize" @click="applicationStateManager.minimizeApplication(props.window.attr.key)">
          <img :src="minimize" alt="最小化">
        </div>
        <div class="maximize" @click="applicationStateManager.maximizeApplication(props.window.attr.key)">
          <img :src="maximize" alt="最大化">
        </div>
        <div class="close" @click="applicationStateManager.closeApplication(props.window.attr.key)">
          <img :src="close" alt="关闭">
        </div>
      </div>
    </div>
    <div class="window-item-content">
      <component :is="props.window.attr.content"></component>
    </div>
    <!--    四边-->
    <div class="window-top-border"
         :class="{'cursor-ns-resize':!props.window?.windowState.maximize}"
         @mousedown="props.window.startResize($event,'t')"></div>
    <div class="window-bottom-border"
         :class="{'cursor-s-resize':!props.window?.windowState.maximize}"
         @mousedown="props.window.startResize($event,'b')"></div>
    <div class="window-left-border"
         :class="{'cursor-ew-resize':!props.window?.windowState.maximize}"
         @mousedown="props.window.startResize($event,'l')"></div>
    <div class="window-right-border"
         :class="{'cursor-ew-resize':!props.window?.windowState.maximize}"
         @mousedown="props.window.startResize($event,'r')"></div>
    <!--    四角-->
    <div class="window-left-top-angle"
         :class="{'cursor-nwse-resize':!props.window?.windowState.maximize}"
         @mousedown="props.window.startResize($event,'lt')"></div>
    <div class="window-left-bottom-angle"
         :class="{'cursor-nesw-resize':!props.window?.windowState.maximize}"
         @mousedown="props.window.startResize($event,'lb')"></div>
    <div class="window-right-top-angle"
         :class="{'cursor-nesw-resize':!props.window?.windowState.maximize}"
         @mousedown="props.window.startResize($event,'rt')"></div>
    <div class="window-right-bottom-angle"
         :class="{'cursor-nwse-resize':!props.window?.windowState.maximize}"
         @mousedown="props.window.startResize($event,'rb')"></div>
  </div>
</template>

<style scoped lang="less">
.window-item {
  position: absolute;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);

  .window-item-menubar {
    height: 2.8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .window-item-menubar-title {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      color: #000;

      img {
        width: 1.4rem;
        height: 1.4rem;
        margin: 0 1.2rem;
      }
    }

    .window-item-menubar-button {
      display: flex;
      justify-content: center;
      align-items: center;

      > div {
        padding: 0 1.6rem;
        height: 2.8rem;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
          background-color: rgba(136, 136, 136, .2);
        }
      }

      .close {
        &:hover {
          background-color: rgb(239 68 68);

          img {
            filter: invert(100%);
          }
        }
      }

      img {
        width: 1.2rem;
        height: 1.2rem;
      }
    }
  }

  .window-item-content {
    width: 100%;
    height: calc(100% - 2.8rem);
  }

  .window-top-border {
    position: absolute;
    height: 0.4rem;
    top: -0.2rem;
    left: 0;
    width: 100%;
  }

  .window-bottom-border {
    position: absolute;
    height: 0.4rem;
    bottom: -0.2rem;
    left: 0;
    width: 100%;
  }

  .window-left-border {
    position: absolute;
    height: 100%;
    left: -0.2rem;
    top: 0;
    width: 0.4rem;
  }

  .window-right-border {
    position: absolute;
    height: 100%;
    right: -0.2rem;
    top: 0;
    width: 0.4rem;
  }

  .window-left-top-angle {
    position: absolute;
    top: 0;
    left: 0;
    width: 0.4rem;
    height: 0.4rem;
  }

  .window-left-bottom-angle {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0.4rem;
    height: 0.4rem;
  }

  .window-right-top-angle {
    position: absolute;
    top: 0;
    right: 0;
    width: 0.4rem;
    height: 0.4rem;
  }

  .window-right-bottom-angle {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 0.4rem;
    height: 0.4rem;
  }

  .cursor-ns-resize {
    cursor: ns-resize;
  }

  .cursor-s-resize {
    cursor: s-resize;
  }

  .cursor-ew-resize {
    cursor: ew-resize;
  }

  .cursor-nwse-resize {
    cursor: nwse-resize;
  }

  .cursor-nesw-resize {
    cursor: nesw-resize;
  }
}

.window-item-shadow {
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.4)
}

.w-full {
  width: 100% !important;
}

.h-full {
  height: 100% !important;
}

.rounded {
  border-radius: 1rem !important;
}

.top-0 {
  top: 0 !important;
}

.left-0 {
  left: 0 !important;
}

.transition-all {
  transition: all 0.3s !important;
}

</style>