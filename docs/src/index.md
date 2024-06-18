---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

title: "OpenDesktop"
titleTemplate: "Vue & TypeScript  Powered Desktop Framework"

hero:
  name: "OpenDesktop"
  text: "Vue & TypeScript  Powered Desktop Framework"
  tagline: "Just a few simple steps to turn it into a browsers desktop"
  actions:
    - theme: brand
      text: What is OpenDesktop
      link: /guide/what-is-open-desktop
    - theme: alt
      text: QuickStart
      link: /guide/getting-started
    - theme: alt
      text: GitHub
      link: https://github.com/jince-boy/OpenDesktop
  image:
    src: /images/logo.png
    alt: logo
features:
  - icon: 😎
    title: Use Simple
    details: Provides out-of-the-box components that can easily create a browser desktop with simple configuration
  - icon: 🎉
    title: Rich Function
    details: In addition to the core functionality, you can extend it with any custom features and components you want
  - icon: ⛈️
    title: Fast Efficient
    details: The functions can be infinitely expanded, providing a unified API interface and a flexible and powerful plug-in system
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