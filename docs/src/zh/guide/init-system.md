# 初始化系统

## 引入组件并创建实例

1. 在使用OpenDesktop之前，你需要引入ScreenView组件并创建System实例来初始化系统，才能正常的运行。

    ``` vue
    
    <script setup lang="ts">
      import {initSystem} from 'open-desktop';
    
      const system = initSystem({});
    </script>
    
    <template>
      <screen-view></screen-view>
    </template>
    
    <style scoped></style>
    
    ```

2. 初始化系统可选择提供系统属性以及[应用](./application)来初始化系统。

   > 但同时，我们需要了解一个本框架非常强的概念：`key`，无论是应用，还是快捷方式，开始菜单，都是必须提供一个正确且唯一的`key`
   来做跟踪的。

    ``` ts
    export interface System {
        attr?: SystemAttr,
        apps?: Application[]
    }
    ```

   ::: code-group

    ``` ts [SystemAttr]
    interface SystemAttr {
        background: string;
        desktopIconSize: number;
        desktopFontSize: number;
        menuIconSize: number;
        menuFontSize: number;
        [key: string]: any;
    }
    ```

    ``` ts [Application]
    interface Application {
        name: string;
        key: string;
        icon?: string;
        version: string;
        openMultiple?: boolean;
        window: BrowserWindow;
    }
    ```

   :::

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
</script>

<template>
   <screen-view></screen-view>
</template>

<style scoped>

</style>

```