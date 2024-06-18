import ScreenView from "packages/ScreenView"
import "packages/style.css"
import {App} from "vue";
import {System, initSystem, useSystem} from "packages/core/System"
import {Application as ApplicationType} from "packages/core/types/Application"
import {Application, ApplicationLibrary} from "packages/core/lib/Application"
import {ApplicationStateManager} from "packages/core/lib/ApplicationState"
import {BrowserWindow, BrowserWindowManager} from "packages/core/lib/BrowserWindow"
import {Shortcut, ShortcutManager} from "packages/core/lib/Shortcut"
import {StartMenu, StartMenuManager} from "packages/core/lib/StartMenu"
import {SystemManager} from "packages/core/lib/System"
import {TaskbarApp, TaskbarButton, TaskbarManager} from "packages/core/lib/Taskbar"
import {Event} from "packages/core/utils/Event"

import {
    BrowserWindowAttr,
    BrowserWindowContent,
    BrowserWindow as BrowserWindowType,
    BrowserWindowMove,
    BrowserWindowResize,
    BrowserWindowState
} from "packages/core/types/BrowserWindow"
import {Shortcut as ShortcutType} from "packages/core/types/Shortcut"
import {StartMenu as StartMenuType} from "packages/core/types/StartMenu"
import {SystemAttr, System as SystemType} from "packages/core/types/System"
import {TaskbarApp as TaskbarAppType, TaskbarButton as TaskbarButtonType} from "packages/core/types/Taskbar"

export default {
    install: (app: App) => {
        app.component("ScreenView", ScreenView);
    }
}
export {
    System,
    initSystem,
    useSystem,
    Application,
    ApplicationLibrary,
    ApplicationStateManager,
    BrowserWindow,
    BrowserWindowManager,
    Shortcut,
    ShortcutManager,
    StartMenu,
    StartMenuManager,
    SystemManager,
    TaskbarApp,
    TaskbarButton,
    TaskbarManager,
    Event
}
export type {
    ApplicationType,
    BrowserWindowAttr,
    BrowserWindowContent,
    BrowserWindowType,
    BrowserWindowMove,
    BrowserWindowResize,
    BrowserWindowState,
    ShortcutType,
    StartMenuType,
    SystemAttr,
    SystemType,
    TaskbarAppType,
    TaskbarButtonType
}

declare module "vue" {
    export interface GlobalComponents {
        ScreenView: typeof ScreenView,
        System: typeof System,
        initSystem: typeof initSystem,
        useSystem: typeof useSystem,
        Application: typeof Application,
        ApplicationLibrary: typeof ApplicationLibrary,
        ApplicationStateManager: typeof ApplicationStateManager,
        BrowserWindow: typeof BrowserWindow,
        BrowserWindowManager: typeof BrowserWindowManager,
        Shortcut: typeof Shortcut,
        ShortcutManager: typeof ShortcutManager,
        StartMenu: typeof StartMenu,
        StartMenuManager: typeof StartMenuManager,
        SystemManager: typeof SystemManager,
        TaskbarApp: typeof TaskbarApp,
        TaskbarButton: typeof TaskbarButton,
        TaskbarManager: typeof TaskbarManager,
        Event: typeof Event
    }
}