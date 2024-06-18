<script setup lang="ts">
import {initSystem} from "packages"
import python from "@/assets/python.png"
import java from "@/assets/java.png"
import PythonApp from "@/app/PythonApp.vue";
import JavaApp from "@/app/JavaApp.vue";
import SpiderSolitaire from "@/assets/spider-solitaire.jpg"
import SpiderSolitaireApp from "@/app/SpiderSolitaireApp.vue";
// 初始化系统
const system = initSystem({
  apps: [
    {
      name: "java",
      key: "java",
      icon: java,
      version: "0.0.1",
      window: {
        key: "java",
        content: JavaApp
      }
    },
    {
      name: "python",
      key: "python",
      icon: python,
      version: "0.0.1",
      window: {
        key: "python",
        content: PythonApp
      }
    },
    {
      name: "SpiderSolitaire",
      key: "SpiderSolitaire",
      icon: SpiderSolitaire,
      version: "0.0.1",
      window: {
        key: "SpiderSolitaire",
        content: SpiderSolitaireApp
      }
    }
  ]
})
system.shortcut(['computer', 'setting', 'java', 'python', 'SpiderSolitaire'])
system.taskbar(['setting'])
system.startMenu(['setting', 'java', 'python', 'SpiderSolitaire'])
</script>

<template>
  <screen-view></screen-view>
</template>

<style scoped>

</style>
