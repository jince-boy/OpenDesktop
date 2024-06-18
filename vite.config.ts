import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import {resolve} from "path"
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        VueDevTools()
    ],
    resolve: {
        alias: {
            "@": resolve(__dirname, "./examples"),
            "packages": resolve(__dirname, "./packages")
        }
    },
    server: {
        host: '0.0.0.0',
        port: 3000,
    },
    build: {
        rollupOptions: {
            input: resolve(__dirname, "./examples/main.ts")
        }
    }
})
