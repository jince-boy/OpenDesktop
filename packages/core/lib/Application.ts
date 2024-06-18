import {markRaw, reactive, UnwrapNestedRefs} from "vue";
import {BrowserWindow} from "packages/core/types/BrowserWindow";
import {Application as ApplicationType} from "packages/core/types/Application"
import DefaultApp from "packages/assets/app/default-app.png"
import {defaultApplication} from "packages/core/constants/DefaultApplication";

/**
 * Application 类
 */
export class Application {
    private readonly _name: string;
    private readonly _key: string;
    private readonly _icon: string;
    private readonly _version: string;
    private readonly _openMultiple: boolean;
    private readonly _window: BrowserWindow;
    private _isOpen: boolean;

    constructor(option: ApplicationType) {
        this._name = option.name;
        this._key = option.key;
        this._icon = option.icon === undefined ? DefaultApp : option.icon;
        this._version = option.version;
        this._openMultiple = option.openMultiple === undefined ? false : option.openMultiple
        this._window = {
            ...option.window,
            content: markRaw(option.window.content)
        };
        // 初始化的时候app是未打开的
        this._isOpen = false;
    }

    get name(): string {
        return this._name;
    }

    get key(): string {
        return this._key;
    }

    get icon(): string {
        return this._icon;
    }

    get version(): string {
        return this._version;
    }

    get openMultiple(): boolean {
        return this._openMultiple;
    }

    get window(): BrowserWindow {
        return this._window;
    }

    get isOpen(): boolean {
        return this._isOpen;
    }

    set isOpen(value: boolean) {
        this._isOpen = value;
    }
}

/**
 * Application 资源库
 */
export class ApplicationLibrary {
    private readonly _applicationSet: UnwrapNestedRefs<Set<Application>>;

    constructor(options?: ApplicationType[]) {
        this._applicationSet = reactive(new Set<Application>);
        // 与系统默认app合并成新的数组，然后添加到set集合中
        options = [
            ...defaultApplication,
            ...options || [],
        ]
        options.map((item: ApplicationType) => {
            let app = new Application(item);
            this.applicationSet.add(app);
        })
    }

    get applicationSet(): UnwrapNestedRefs<Set<Application>> {
        return this._applicationSet;
    }

    /**
     * 通过key获取application
     * @param key
     */
    findApplicationByKey(key: string): Application | undefined {
        for (const app of this._applicationSet) {
            if (app.key === key) {
                return app as Application;
            }
        }
        return undefined;
    }

    /**
     * 查看app是否打开
     * @param key
     */
    applicationIsOpen(key: string): boolean | undefined {
        for (const app of this._applicationSet) {
            if (app.key === key) {
                return (app as Application).isOpen;
            }
        }
        return undefined;
    }
}