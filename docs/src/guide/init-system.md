# Initializing the System

## Importing Components and Creating an Instance

1. Before using OpenDesktop, you need to import the ScreenView component and create a System instance to initialize the system for it to run properly.

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

2. Initializing the system can optionally provide system properties and [application](./application) to initialize the system.

   > But at the same time, we need to understand a very strong concept of this framework: `key`. Whether it is an application, a shortcut, or a start menu, a correct and unique `key` must be provided for tracking.

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