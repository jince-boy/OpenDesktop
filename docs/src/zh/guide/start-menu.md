# 开始菜单

System实例对象提供了开始菜单的方法，我们只需要将应用的`key`添加到一个数组中并传递给System实例即可。

``` ts
startMenu(options: string[])
```

而系统默认提供了一些[系统应用](./default-application.md)。

## 案例

``` vue
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
    ...
  ]
})

system.taskbar(['setting'])
</script>

<template>
  <screen-view></screen-view>
</template>

<style scoped>

</style>

```