# 快速开始 {#getting-started}

## 在线尝试 {#try-it-online}

可以直接在 [StackBlitz](https://stackblitz.com/edit/open-desktop-demo) 上进行在线尝试。

## 安装 {#install}

### 准备 {#Prerequisites}

- [Node.js](https://nodejs.org) 18及以上版本。

::: code-group

``` sh [npm]
$ npm install open-desktop
```

``` sh [pnpm]
$ pnpm install open-desktop
```

``` sh [yarn]
$ yarn add open-desktop
```

:::

### 用法 {#usage}

1. 导入OpenDesktop依赖与OpenDesktop样式文件。

   <div class="tip custom-block" style="padding-top: 8px">
         main.ts
   </div>

    ``` ts
    import {createApp} from 'vue';
    import App from './App.vue';
    import openDesktop from 'open-desktop';
    import 'open-desktop/lib/style.css';
    
    const app = createApp(App);
    app.use(openDesktop);
    app.mount('#app');
    ```

2. 引入ScreenView组件并创建System实例以初始化系统。

    <div class="tip custom-block" style="padding-top: 8px">
         App.vue
    </div>

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