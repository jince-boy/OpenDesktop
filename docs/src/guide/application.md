# Application and Window

The current version of the framework defaults to one application per window. We can add a custom application when initializing the system instance.

<div class="tip custom-block" style="padding-top: 8px">
      Dynamic addition of applications will be updated in future versions.
</div>

1. You need to understand the object structure of `Application` and `BrowserWindow`

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
2. Next, we can create our own component.

    ``` vue
    <script setup lang="ts">
    
    </script>
    
    <template>
    Java
    </template>
    
    <style scoped lang="less">
    
    </style>
    ```

3. And add it to the initialization application parameters during initialization.

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
   
   In this example, we create a new Vue component called `JavaApp` and add it as a custom application to the `initSystem` function. The `Application` interface defines the properties of an application, including its name, key, icon, version, and the associated `BrowserWindow`. The `BrowserWindow` interface defines the properties of the window, such as its title, key, content (which is the Vue component), icon, dimensions, position, and various window states.

   By adding the `JavaApp` component as the `content` property of the `BrowserWindow`, it will be rendered within the custom application window when the system is initialized.