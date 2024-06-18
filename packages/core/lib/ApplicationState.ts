import {useSystem} from "packages/core/System"

/**
 * Application的状态管理，打开，关闭，焦点等APP Taskbar Window状态管理器
 */
export class ApplicationStateManager {
    /**
     * 打开app
     * @param key
     */
    openApplication = (key: string) => {
        const system = useSystem();
        const applicationLibrary = system.applicationLibrary;
        const browserWindowManager = system.browserWindowManager;
        const taskbarManager = system.taskbarManager;
        const application = applicationLibrary.findApplicationByKey(key);
        if (application !== undefined) {
            if (application.isOpen) {
                const taskbar = taskbarManager.findTaskbarByKey(key);
                const browserWindow = browserWindowManager.findBrowserWindowByKey(key);
                if (taskbar !== undefined && browserWindow !== undefined) {
                    taskbar.focus = true;
                    browserWindow.windowState.minimize = false;
                }
            } else {
                // 设置app已经打开
                application.isOpen = true;
                // 添加到窗口管理器中
                browserWindowManager.addBrowserWindow(application.window);
                // 查找任务栏中是否存在此App
                let taskbar = taskbarManager.findTaskbarByKey(application.key)
                if (taskbar === undefined) {
                    // 添加到任务栏中
                    taskbar = taskbarManager.addTaskbarApp({
                        name: application.name,
                        key: application.key,
                        icon: application.icon,
                        sort: 0
                    });
                }
                taskbar.focus = true;
                console.log('open application success')
            }
            // 重新计算焦点
            this.focusApplication(key)
        } else {
            console.log('open application error , application not found')
        }
    }
    /**
     * 关闭app
     */
    closeApplication = (key: string) => {
        const system = useSystem();
        const applicationLibrary = system.applicationLibrary;
        const application = applicationLibrary.findApplicationByKey(key);
        if (application !== undefined) {
            if (application.isOpen) {
                // 关闭app
                application.isOpen = false;
                // 从窗口管理器中删除
                const browserWindowManager = system.browserWindowManager;
                browserWindowManager.removeBrowserWindow(application.window)
                // 从任务栏中删除
                const taskbarManager = system.taskbarManager;
                const taskbar = taskbarManager.findTaskbarByKey(key)
                // taskbar存在并且不存在固定任务栏中
                if (taskbar !== undefined) {
                    if (!taskbarManager.fixedTaskbarItems.includes(taskbar.key)) {
                        taskbarManager.removeTaskbarByKey(taskbar.key)
                    } else {
                        taskbar.focus = false;
                    }
                }
            } else {
                console.log('application not open')
            }
        }
    }

    /**
     * 最大化
     * @param key
     */
    maximizeApplication(key: string) {
        const system = useSystem();
        const browserWindowManager = system.browserWindowManager;
        const browserWindow = browserWindowManager.findBrowserWindowByKey(key);
        if (browserWindow !== undefined) {
            browserWindow.windowState.maximize = !browserWindow.windowState.maximize
        }
    }

    /**
     * 最小化
     * @param key
     */
    minimizeApplication(key: string) {
        const system = useSystem();
        const browserWindowManager = system.browserWindowManager;
        const taskbarManager = system.taskbarManager;
        const browserWindow = browserWindowManager.findBrowserWindowByKey(key);
        if (browserWindow !== undefined) {
            browserWindow.windowState.minimize = true;
        }
        const taskbar = taskbarManager.findTaskbarByKey(key);
        if (taskbar !== undefined) {
            taskbar.focus = false;
        }
        // 把焦点给到下一个打开的窗口,并且判断下一个窗口是没有最小化的时候
        const browserWindowSort = [...browserWindowManager.browserWindowSet].sort((a, b) => (b.zIndex - a.zIndex))
        if (browserWindowSort.length >= 2) {
            const nextBrowserWindow = browserWindowManager.findBrowserWindowByKey(browserWindowSort[1].attr.key)
            if (nextBrowserWindow !== undefined && !nextBrowserWindow.windowState.minimize) {
                this.focusApplication(browserWindowSort[1].attr.key)
            }
        }
    }

    /**
     * 计算程序焦点
     * @param key
     */
    focusApplication(key?: string) {
        const system = useSystem();
        // 计算每一个窗口的zIndex
        const browserWindowManager = system.browserWindowManager;
        const browserWindowSet = browserWindowManager.browserWindowSet;
        for (const browserWindow of browserWindowSet) {
            browserWindow.zIndex = browserWindow.zIndex - 1;
        }
        // 计算每一个任务栏项的焦点
        const taskbarManager = system.taskbarManager;
        const taskbarSet = taskbarManager.taskbarItemSet;
        for (const taskbar of taskbarSet) {
            taskbar.focus = false;
        }
        if (key !== undefined) {
            // 重新赋值zIndex和focus的值
            const browserWindow = browserWindowManager.findBrowserWindowByKey(key);
            if (browserWindow !== undefined) {
                browserWindow.zIndex = 999;
            }
            const taskbar = taskbarManager.findTaskbarByKey(key);
            if (taskbar !== undefined) {
                taskbar.focus = true;
            }
        }
    }

    private readonly _beforeShowDesktop: string[] = []

    /**
     * 显示桌面
     */
    showDesktop() {
        const system = useSystem();
        const browserWindowManager = system.browserWindowManager;
        if (this._beforeShowDesktop.length > 0) {
            for (let browserWindow of this._beforeShowDesktop.reverse()) {
                this.openApplication(browserWindow)
            }
            this._beforeShowDesktop.length = 0;
        } else {
            const browserWindowSour = [...browserWindowManager.browserWindowSet].sort((a, b) => (b.zIndex - a.zIndex));
            for (let browserWindowSourElement of browserWindowSour) {
                this.minimizeApplication(browserWindowSourElement.attr.key)
                this._beforeShowDesktop.push(browserWindowSourElement.attr.key)
            }
        }
    }
}