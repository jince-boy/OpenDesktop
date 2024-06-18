<script setup lang="ts">
import background1 from "packages/assets/background/background1.jpg"
import background2 from "packages/assets/background/background2.jpg"
import background3 from "packages/assets/background/background3.jpg"
import background4 from "packages/assets/background/background4.jpg"
import background5 from "packages/assets/background/background5.jpg"
import background6 from "packages/assets/background/background6.jpg"
import background7 from "packages/assets/background/background7.jpg"
import background8 from "packages/assets/background/background8.jpg"
import background9 from "packages/assets/background/background9.jpg"
import background10 from "packages/assets/background/background10.jpg"
import thumbnail1 from "packages/assets/background/thumbnail/background1.jpg"
import thumbnail2 from "packages/assets/background/thumbnail/background2.jpg"
import thumbnail3 from "packages/assets/background/thumbnail/background3.jpg"
import thumbnail4 from "packages/assets/background/thumbnail/background4.jpg"
import thumbnail5 from "packages/assets/background/thumbnail/background5.jpg"
import thumbnail6 from "packages/assets/background/thumbnail/background6.jpg"
import thumbnail7 from "packages/assets/background/thumbnail/background7.jpg"
import thumbnail8 from "packages/assets/background/thumbnail/background8.jpg"
import thumbnail9 from "packages/assets/background/thumbnail/background9.jpg"
import thumbnail10 from "packages/assets/background/thumbnail/background10.jpg"
import defaultApp from "packages/assets/app/default-app.png"
import {useSystem} from "packages/core/System";
import {computed} from "vue";
import DropdownMenu from "packages/app/setting/components/DropdownMenu.vue";

const system = useSystem()
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
const updateBackground = (background: string) => {
  systemAttr.attr.background = background;
}

const iconSizeOptions = [
  {value: '32', label: '小图标'},
  {value: '42', label: '中等图标'},
  {value: '52', label: '大图标'},
];
const handleOptionSelected = (value: any) => {
  systemAttr.attr.desktopIconSize = value
};

</script>

<template>
  <div id="background">
    <h2>桌面背景图</h2>
    <div id="example">
      <img :src="systemAttr.attr.background" alt="example">
    </div>
    <ul>
      <li><img :src="thumbnail1" alt="背景图片" @click="updateBackground(background1)"></li>
      <li><img :src="thumbnail2" alt="背景图片" @click="updateBackground(background2)"></li>
      <li><img :src="thumbnail3" alt="背景图片" @click="updateBackground(background3)"></li>
      <li><img :src="thumbnail4" alt="背景图片" @click="updateBackground(background4)"></li>
      <li><img :src="thumbnail5" alt="背景图片" @click="updateBackground(background5)"></li>
      <li><img :src="thumbnail6" alt="背景图片" @click="updateBackground(background6)"></li>
      <li><img :src="thumbnail7" alt="背景图片" @click="updateBackground(background7)"></li>
      <li><img :src="thumbnail8" alt="背景图片" @click="updateBackground(background8)"></li>
      <li><img :src="thumbnail9" alt="背景图片" @click="updateBackground(background9)"></li>
      <li><img :src="thumbnail10" alt="背景图片" @click="updateBackground(background10)"></li>
    </ul>
    <h2>桌面图标</h2>
    <div id="desktopIcon">
      <div class="app-item" :style="appItemStyle">
        <img :src="defaultApp" alt="示例" :style="desktopIconStyle">
        <span :style="fontSizeStyle">图片示例</span>
      </div>
      <div class="setting-desktop-icon">
        <DropdownMenu
            :style="{'width':'100%'}"
            :options="iconSizeOptions"
            :defaultValue="systemAttr.attr.desktopIconSize"
            @option-selected="handleOptionSelected"
        />
      </div>
    </div>
  </div>

</template>

<style scoped lang="less">
#background {
  margin: 0 1.6rem;

  h2 {
    font-size: 1.8rem;
    margin: 1.2rem 0;
  }

  ul {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    li {
      border-radius: 0.4rem;
      overflow: hidden;
      width: 10rem;
      margin: 1.2rem 1.2rem 0 0;
    }

    img {
      width: 100%;
      vertical-align: middle;
    }
  }

  #background-upload {
    width: 100%;
    height: 63px;
  }
}

#example {
  width: 26.7rem;
  height: 15rem;
  border: 0.5rem solid #000;
  border-radius: 0.4rem;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
}

#desktopIcon {
  display: flex;
  align-items: center;

  .app-item {
    border: 1px solid #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 0.4rem;
    color: #000;
    margin-right: 1.2rem;

    span {
      text-shadow: 1px 1px 3px rgba(255, 255, 255, 0.8);
    }
  }

  .setting-desktop-icon {
    width: 50%;
  }
}

.w-full {
  width: 100%;
}
</style>