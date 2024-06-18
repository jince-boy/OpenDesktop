import {defineConfig, type DefaultTheme} from 'vitepress'

export const en = defineConfig({
    lang: 'en',
    description: 'Vue & TypeScript  Powered Desktop UI',
    themeConfig: {
        nav: nav(),
        sidebar: {
            '/guide/': {base: '/guide/', items: sidebarGuide()},
            '/reference/': {base: '/reference/', items: sidebarReference()}
        },
        docFooter: {
            prev: 'Pagina prior',
            next: 'Proxima pagina'
        },
        editLink: {
            pattern: 'https://github.com/jince-boy/OpenDesktop/edit/main/docs/src/:path',
            text: 'Edit this page on GitHub'
        },
        footer: {
            message: 'Released under the MIT License.',
            copyright: `Copyright © 2024-${new Date().getFullYear()} OpenDesktop`
        },
        outline: {
            label: 'On this page'
        },
    }
})

function nav(): DefaultTheme.NavItem[] {
    return [
        {text: 'Home', link: '/'},
        {text: 'Guide', link: '/guide/what-is-open-desktop', activeMatch: '/guide/'},
        {text: 'Reference', link: '/reference/', activeMatch: '/reference/'},
        {text: 'changelog', link: 'https://github.com/jince-boy/OpenDesktop/blob/main/CHANGELOG.md'}
    ]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'Guide',
            items: [
                {text: 'What is OpenDesktop', link: 'what-is-open-desktop'},
                {text: 'Getting Started', link: 'getting-started'}
            ]
        }
    ]
}

function sidebarReference(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: "Reference",
            items: [
                {text: "ps", link: 'index'}
            ]
        }
    ]
}