import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import {resolve} from "path";

export default defineConfig({
    plugins: [
        vue(),
        dts({
            exclude: ['./docs', './examples'],
            outDir: 'lib/packages', // 确保类型定义文件在 lib/packages 目录下
            entryRoot: 'packages'
        })
    ],
    resolve: {
        alias: {
            "packages": resolve(__dirname, "./packages")
        }
    },
    build: {
        target: ['es2020'],
        outDir: "./lib",
        lib: {
            formats: ["es", "umd", "cjs"],
            name: "open-desktop",
            entry: resolve(__dirname, "./packages/index.ts"),
            fileName: 'open-desktop'
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                exports: "named",
                globals: {
                    vue: 'Vue'
                }
            },
            input: resolve(__dirname, "./packages/index.ts"),
        }
    }
})