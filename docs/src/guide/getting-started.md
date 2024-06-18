# Getting Started {#getting-started}

## Try It Online {#try-it-online}

You can try OpenDesktop directly in your browser on [StackBlitz](https://stackblitz.com/edit/open-desktop-demo).

## Installation

### Prerequisites

- [Node.js](https://nodejs.org) 18及以上版本。

::: code-group

```sh [npm]
$ npm install open-desktop
```

```sh [pnpm]
$ pnpm install open-desktop
```

```sh [yarn]
$ yarn add open-desktop
```

:::

### usage

> main.ts

```ts
import {createApp} from 'vue';
import App from './App.vue';
import openDesktop from 'open-desktop';
import 'open-desktop/lib/style.css';

const app = createApp(App);
app.use(openDesktop);
app.mount('#app');
```

> App.vue

```vue

<script setup lang="ts">
  import {initSystem} from 'open-desktop';

  const system = initSystem({});
</script>

<template>
  <screen-view></screen-view>
</template>

<style scoped></style>
```