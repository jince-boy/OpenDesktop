# 应用及窗口

框架目前版本默认的是一个应用一个窗口，我们可以通过在初始化系统实例的时候添加一个自定义应用。

<div class="tip custom-block" style="padding-top: 8px">
     后续版本会更新动态添加应用。
</div>

1. 你需要了解`Application`以及`BrowserWindow`的对象结构：

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
   
   在这个例子中，我们创建了一个名为`JavaApp`的新Vue组件，并将其作为自定义应用添加到`initSystem`函数中。 `Application` 接口定义应用程序的属性，包括其名称、键、图标、版本以及关联的 `BrowserWindow`。`BrowserWindow` 接口定义窗口的属性，例如其标题、键、内容（即 Vue 组件）、图标、尺寸、位置以及各种窗口状态。

   通过将 `JavaApp` 组件添加为 `BrowserWindow` 的 `content` 属性，它将在系统初始化时在自定义应用程序窗口内呈现。