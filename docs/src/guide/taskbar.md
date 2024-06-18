# Task bar

The System instance object provides the taskbar method. We only need to add the application's `key` to an array and pass it to the System instance.

``` ts
taskbar(options: string[])
```

The system provides some [system applications](./default-application.md) by default.

## Example

``` vue
<script setup lang="ts">
import {initSystem} from "packages"
import python from "@/assets/python.png"
import java from "@/assets/java.png"
import PythonApp from "@/app/PythonApp.vue";
import JavaApp from "@/app/JavaApp.vue";
import SpiderSolitaire from "@/assets/spider-solitaire.jpg"
import SpiderSolitaireApp from "@/app/SpiderSolitaireApp.vue";
// Initialize the system
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

system.startMenu(['setting', 'java', 'python', 'SpiderSolitaire'])
</script>

<template>
  <screen-view></screen-view>
</template>

<style scoped>

</style>

```