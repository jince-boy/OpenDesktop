# 应用及窗口

框架目前版本默认的是一个应用一个窗口，我们可以通过在初始化系统实例的时候添加一个自定义应用。

<div class="tip custom-block" style="padding-top: 8px">
     后续版本会更新动态添加应用。
</div>

1. 你需要了解Application以及BrowserWindow的对象结构：

    ``` ts
    interface Application {
        name: string;
        key: string;
        icon?: string;
        version: string;
        openMultiple?: boolean;
        window: BrowserWindow;
    }
    ```
    ``` ts
    interface BrowserWindowAttr {
        title: string;
        key: string;
        content: BrowserWindowContent;
        icon: string;
        width: number;
        height: number;
        minWidth: number;
        minHeight: number;
        x: number;
        y: number;
        center: boolean;
        resizable: boolean;
        minimized: boolean;
        maximized: boolean;
        fullscreen: boolean;
        alwaysOnTop: boolean;
        backgroundColor: string;
    }
    ```
2. 接下来我们可以创建一个自己的组件

    ``` vue
    <script setup lang="ts">
    
    </script>
    
    <template>
    Java
    </template>
    
    <style scoped lang="less">
    
    </style>
    ```

3. 并在初始化的时候添加到初始化应用参数中

   ``` ts
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
       }
     ]
   })
   ```