import {BrowserWindow as BrowserWindowType} from "packages/core/types/BrowserWindow"
import defaultApp from "packages/assets/app/default-app.png"

export const defaultBrowserWindow: Omit<BrowserWindowType, 'content' | 'key'> = {
    title: '新窗口',
    icon: defaultApp,
    width: 650,
    height: 400,
    minWidth: 200,
    minHeight: 150,
    x: 0,
    y: 0,
    center: true,
    resizable: true,
    minimized: true,
    maximized: true,
    fullscreen: true,
    alwaysOnTop: false,
    backgroundColor: '#e7eaec'
}