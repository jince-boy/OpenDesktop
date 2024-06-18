import {TaskbarApp as TaskbarAppType, TaskbarButton as TaskbarButtonType} from "packages/core/types/Taskbar"
import {defaultTaskbar} from "packages/core/constants/DefaultTaskbar"
import {reactive, UnwrapNestedRefs} from "vue";

abstract class BaseTaskbarObject {
    protected readonly _name: string;
    protected readonly _key: string;
    protected readonly _icon: string;
    protected readonly _sort: number;
    protected _focus: boolean;

    protected constructor(option: TaskbarAppType | TaskbarButtonType) {
        this._name = option.name;
        this._key = option.key;
        this._icon = option.icon;
        this._sort = option.sort;
        this._focus = false;
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

    get sort(): number {
        return this._sort;
    }

    get focus(): boolean {
        return this._focus;
    }

    set focus(value: boolean) {
        this._focus = value;
    }
}

/**
 * 任务栏application对象
 */
export class TaskbarApp extends BaseTaskbarObject {
    constructor(option: TaskbarAppType) {
        super(option)
    }
}

/**
 * 任务栏按钮对象
 */

export class TaskbarButton extends BaseTaskbarObject {
    constructor(option: TaskbarButtonType) {
        super(option)
    }
}

/**
 * 任务栏管理器
 */
export class TaskbarManager {
    private readonly _taskbarItemSet: UnwrapNestedRefs<Set<TaskbarApp | TaskbarButton>>;
    private _position: 'left' | 'center';
    private readonly _fixedTaskbarItems: UnwrapNestedRefs<string[]>;

    constructor() {
        this._taskbarItemSet = reactive(new Set<TaskbarApp | TaskbarButton>());
        // 将默认任务栏数组添加到任务栏管理器中
        defaultTaskbar.forEach((item: TaskbarButtonType) => {
            this.taskbarItemSet.add(new TaskbarButton(item));
        })
        // 设置任务栏位置为左边
        this._position = 'center';
        // 初始化固定任务栏
        this._fixedTaskbarItems = [];
    }

    /**
     * 添加任务任务栏对象
     * @param item
     */
    add(item: TaskbarButton | TaskbarApp) {
        this._taskbarItemSet.add(item)
        return item;
    }

    /**
     * 添加任务栏按钮
     * @param option
     */
    addTaskbarButton(option: TaskbarButtonType) {
        const taskbar = new TaskbarButton(option)
        this._taskbarItemSet.add(taskbar)
        return taskbar;
    }

    /**
     * 添加任务栏Application
     * @param option
     */
    addTaskbarApp(option: TaskbarAppType) {
        const taskbar = new TaskbarApp(option)
        this._taskbarItemSet.add(taskbar)
        return taskbar;
    }

    /**
     * 添加任务栏固定按钮
     * @param option
     */
    addFixedTaskbarButton(option: TaskbarButtonType) {
        const taskbar = new TaskbarButton(option)
        this._taskbarItemSet.add(taskbar)
        this._fixedTaskbarItems.push(taskbar.key)
        return taskbar;
    }

    /**
     * 添加任务栏固定app
     * @param option
     */
    addFixedTaskbarApp(option: TaskbarAppType) {
        const taskbar = new TaskbarApp(option)
        this._taskbarItemSet.add(taskbar)
        this._fixedTaskbarItems.push(taskbar.key)
        return taskbar;
    }

    /**
     * 通过key获取任务栏对象
     * @param key
     */
    findTaskbarByKey(key: string) {
        for (const taskbar of this._taskbarItemSet) {
            if (taskbar.key === key) {
                return taskbar as TaskbarButton | TaskbarApp;
            }
        }
        return undefined;
    }

    /**
     * 通过key删除任务栏对象
     * @param key
     */
    removeTaskbarByKey(key: string) {
        for (const taskbar of this._taskbarItemSet) {
            if (taskbar.key === key) {
                this._taskbarItemSet.delete(taskbar)
            }
        }
    }

    get taskbarItemSet(): UnwrapNestedRefs<Set<TaskbarApp | TaskbarButton>> {
        return this._taskbarItemSet;
    }

    set position(value: "left" | "center") {
        this._position = value;
    }

    get position(): "left" | "center" {
        return this._position;
    }

    get fixedTaskbarItems(): UnwrapNestedRefs<string[]> {
        return this._fixedTaskbarItems;
    }
}