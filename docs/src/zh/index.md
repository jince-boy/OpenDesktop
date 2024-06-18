---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

title: "OpenDesktop"
titleTemplate: "由 Vue 和 TypeScript 打造的浏览器桌面端框架"

hero:
  name: "OpenDesktop"
  text: "由 Vue 和 TypeScript 打造的浏览器桌面端框架"
  tagline: "只需几个简单的步骤即可将其变成浏览器桌面"
  actions:
    - theme: brand
      text: 什么是OpenDesktop?
      link: /zh/guide/what-is-open-desktop
    - theme: alt
      text: 快速开始
      link: /zh/guide/getting-started
    - theme: alt
      text: GitHub
      link: https://github.com/jince-boy/OpenDesktop
  image:
    src: /images/logo.png
    alt: logo
features:
  - icon: 😎
    title: 使用简单
    details: 提供开箱即用的组件，只需简单配置即可轻松创建浏览器桌面
  - icon: 🎉
    title: 功能丰富
    details: 除了核心功能以外，还可扩展任何你需要的自定义功能及组件
  - icon: ⛈️
    title: 快速高效
    details: 功能可无限扩展，提供统一的API接口和灵活强大的插件系统
---
<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>