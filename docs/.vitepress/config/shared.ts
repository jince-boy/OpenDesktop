import {defineConfig} from 'vitepress'

export const shared = defineConfig({
    title: 'OpenDesktop',
    srcDir: './src',
    lastUpdated: true,
    cleanUrls: true,
    metaChunk: true,
    themeConfig: {
        logo: "/images/logo.png",
        socialLinks: [
            {icon: 'npm', link: "https://www.npmjs.com/package/open-desktop"},
            {icon: 'github', link: "https://github.com/jince-boy/OpenDesktop"}
        ],
        search: {
            provider: 'local'
        }
    }

})