import {defineConfig, type DefaultTheme} from 'vitepress'

export const zh = defineConfig({
    lang: 'zh',
    description: '由 Vue 和 TypeScript 打造的浏览器桌面端UI',
    themeConfig: {
        nav: nav(),
        sidebar: {
            '/zh/guide/': {base: '/zh/guide/', items: sidebarGuide()},
            '/zh/reference/': {base: '/zh/guide', items: sidebarReference()}
        },
        docFooter: {
            prev: '上一页',
            next: '下一页'
        },
        editLink: {
            pattern: 'https://github.com/jince-boy/OpenDesktop/edit/main/docs/src/:path',
            text: '在 GitHub 上编辑此页面'
        },
        footer: {
            message: '基于 MIT 许可发布',
            copyright: `Copyright © 2024-${new Date().getFullYear()} OpenDesktop <a href="https://beian.miit.gov.cn/">冀ICP备2022001116号-4</a>`
        },
        outline: {
            label: '页面导航'
        },
        lastUpdated: {
            text: "最后更新于",
            formatOptions: {
                dateStyle: 'short',
                timeStyle: 'medium'
            }
        },
        langMenuLabel: '多语言',
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式'
    }
})

function nav(): DefaultTheme.NavItem[] {
    return [
        {text: '首页', link: '/zh/'},
        {text: '指南', link: '/zh/guide/what-is-open-desktop', activeMatch: '/guide/'},
        {text: '参考', link: '/zh/reference/', activeMatch: '/reference/'},
        {text: '更新日志', link: 'https://github.com/jince-boy/OpenDesktop/blob/main/CHANGELOG.md'}
    ]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '简介',
            items: [
                {text: '什么是OpenDesktop', link: 'what-is-open-desktop'},
                {text: '快速开始', link: 'getting-started'}
            ]
        },
        {
            text: '使用',
            items: [
                {text: '初始化系统', link: 'init-system'},
                {text: '快捷方式', link: 'shortcut'},
                {text: '开始菜单', link: 'start-menu'},
                {text: '任务栏', link: 'taskbar'},
                {text: '应用及窗口', link: 'application'},
                {text: '系统默认应用', link: 'default-application'}
            ]
        }
    ]
}

function sidebarReference(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: "参考"
        }
    ]
}