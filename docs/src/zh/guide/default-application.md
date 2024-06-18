---
outline: deep
---

# 系统默认应用

本框架默认提供了一些应用让使用者快速使用。

## 应用列表 {#setting}

### 设置

``` ts
{
    name: '设置',
    key: 'setting',
    icon: setting,
    version: '1.0.0',
    window: {
        title: '设置',
        width: 1100,
        minWidth: 1000,
        minHeight: 560,
        height: 600,
        icon: setting,
        key: 'setting',
        content: Setting,
        backgroundColor: 'rgb(239, 244, 249)'
    }
}
```