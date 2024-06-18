import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import openDesktop from "packages"
import "packages/style.css"

createApp(App).use(openDesktop).mount('#app')
