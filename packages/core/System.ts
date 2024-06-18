import {SystemManager} from "packages/core/lib/System";
import {ApplicationLibrary} from "packages/core/lib/Application";
import {ShortcutManager} from "packages/core/lib/Shortcut";
import {TaskbarManager} from "packages/core/lib/Taskbar";
import {StartMenuManager} from "packages/core/lib/StartMenu";
import {BrowserWindowManager} from "packages/core/lib/BrowserWindow";
import {ApplicationStateManager} from "packages/core/lib/ApplicationState";
import {System as SystemType} from "packages/core/types/System"
import {Shortcut as ShortcutType} from "packages/core/types/Shortcut";
import {StartMenu as StartMenuType} from "packages/core/types/StartMenu";

/**
 * 单例模式，全局只有一个System对象
 */
export class System {
    public static _instance: System;
    private readonly _systemManager: SystemManager;
    private readonly _applicationLibrary: ApplicationLibrary;
    private readonly _shortcutManager: ShortcutManager;
    private readonly _taskbarManager: TaskbarManager;
    private readonly _startMenuManager: StartMenuManager;
    private readonly _browserWindowManager: BrowserWindowManager;
    private readonly _applicationStateManager: ApplicationStateManager;

    constructor(option: SystemType) {
        // 初始化系统属性
        this._systemManager = new SystemManager(option.attr)
        // 初始化app资源库
        this._applicationLibrary = new ApplicationLibrary(option.apps);
        // 初始化桌面快捷方式
        this._shortcutManager = new ShortcutManager();
        // 初始化任务栏管理器
        this._taskbarManager = new TaskbarManager();
        // 初始化开始菜单
        this._startMenuManager = new StartMenuManager();
        // 初始化窗口管理器
        this._browserWindowManager = new BrowserWindowManager();
        // 初始化App状态管理器
        this._applicationStateManager = new ApplicationStateManager();
        // 保存实例
        System._instance = this;
    }

    get systemManager(): SystemManager {
        return this._systemManager;
    }

    get applicationLibrary(): ApplicationLibrary {
        return this._applicationLibrary;
    }

    get shortcutManager(): ShortcutManager {
        return this._shortcutManager;
    }

    get taskbarManager(): TaskbarManager {
        return this._taskbarManager;
    }

    get startMenuManager(): StartMenuManager {
        return this._startMenuManager;
    }

    get browserWindowManager(): BrowserWindowManager {
        return this._browserWindowManager;
    }

    get applicationStateManager(): ApplicationStateManager {
        return this._applicationStateManager;
    }

    public static _create(options: SystemType) {
        if (!System._instance) {
            System._instance = new System(options);
        }
        return System._instance;
    }

    // 初始化桌面快捷方式
    public shortcut(options: string[]) {
        for (const key of options) {
            const application = [...this._applicationLibrary.applicationSet].find(app => app.key === key);
            this._shortcutManager.addShortcut(application as ShortcutType);
        }
        return this;
    }

    // 初始化任务栏
    public taskbar(options: string[]) {
        for (const key of options) {
            const application = [...this._applicationLibrary.applicationSet].find(app => app.key === key);
            this._taskbarManager.addFixedTaskbarApp({
                name: application!.name,
                key: application!.key,
                icon: application!.icon,
                sort: 0
            });
        }
        return this;
    }

    // 初始化开始菜单
    public startMenu(options: string[]) {
        for (const key of options) {
            const application = [...this._applicationLibrary.applicationSet].find(app => app.key === key);
            this._startMenuManager.addStartMenuItem(application as StartMenuType)
        }
    }
}

export function useSystem() {
    return System._instance;
}

export function initSystem(options: SystemType) {
    return System._create(options);
}