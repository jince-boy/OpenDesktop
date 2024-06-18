<script setup lang="ts">
import {computed, defineComponent, markRaw, ref} from "vue";
import {Image16Regular} from "@vicons/fluent"
import {LaptopWindowsOutlined} from "@vicons/material"
import {Icon} from "@vicons/utils";
import SystemInfo from "packages/app/setting/components/SystemInfo.vue";
import Background from "packages/app/setting/components/Background.vue";

interface Tab {
  title: string;
  component: ReturnType<typeof defineComponent>;
  icon: ReturnType<typeof defineComponent>;
}

const tabs = ref<Tab[]>([
  {title: '系统', component: markRaw(SystemInfo), icon: markRaw(LaptopWindowsOutlined)},
  {title: '桌面', component: markRaw(Background), icon: markRaw(Image16Regular)}
])
const currentTab = ref(tabs.value[0])
const selectedTabIndex = ref(0)
const selectTab = (item: Tab, index: number) => {
  currentTab.value = item;
  selectedTabIndex.value = index;
}
const tabContentComponent = computed(() => currentTab.value.component)

</script>

<template>
  <div id="setting">
    <div id="setting-tab">
      <div v-for="(item,index) in tabs" @click="selectTab(item,index)"
           :class="{ selected: index === selectedTabIndex }">
        <Icon size="16">
          <component :is="item.icon"/>
        </Icon>
        <span>{{ item.title }}</span>
      </div>
    </div>
    <div id="setting-content">
      <component :is="tabContentComponent"/>
    </div>
  </div>
</template>

<style scoped lang="less">
#setting {
  display: flex;
  background-color: rgb(239, 244, 249);
  height: 100%;
}

#setting-tab {
  width: 30rem;


  > div {
    width: 26.8rem;
    height: 3.6rem;
    display: flex;
    align-items: center;
    margin: 0.2rem 1.6rem;
    border-radius: 0.4rem;

    &:hover {
      background-color: rgb(227, 232, 236)
    }

    .xicon {
      margin: 0 1rem;
    }
  }

  .selected {
    background-color: rgb(227, 232, 236)
  }

  .selected::before {
    content: '';
    display: block;
    width: 0.2rem;
    height: 1.8rem;
    background-color: #0067c0;
  }
}

#setting-content {
  width: calc(100% - 30rem);
  overflow: auto;
  padding-bottom: 10rem;
}
</style>