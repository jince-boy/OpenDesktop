import {reactive, UnwrapNestedRefs} from "vue";
import {
    BrowserWindowMove,
    BrowserWindowResize,
    BrowserWindowState,
    BrowserWindow as BrowserWindowType
} from "packages/core/types/BrowserWindow";
import {defaultBrowserWindow} from "packages/core/constants/DefaultBrowserWindow"

/**
 * 窗口对象
 */
export class BrowserWindow {
    private _attr: BrowserWindowType;
    private readonly _windowState: BrowserWindowState;
    private readonly _moveState: BrowserWindowMove;
    private readonly _resizeState: BrowserWindowResize;
    private _zIndex: number;

    constructor(option: BrowserWindowType) {
        this._attr = reactive({
            ...defaultBrowserWindow,
            ...option
        });
        // 初始化窗口状态
        this._windowState = reactive({
            maximize: false,
            minimize: false,
        })
        // 初始化窗口移动状态
        this._moveState = reactive({
            isMove: false,
            startX: 0,
            startY: 0
        })
        // 初始化窗口大小状态
        this._resizeState = reactive({
            resizeType: '',
            isResize: false,
            startResizeX: 0,
            startResizeY: 0,
        })
        // 初始化窗口焦点
        this._zIndex = 0;
    }

    /**
     * 窗口居中
     */
    center() {
        const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        this._attr.x = Math.max(0, (screenWidth - this._attr.width!) / 2);
        this._attr.y = Math.max(0, (screenHeight - this._attr.height!) / 2);
    }

    /**
     * 窗口移动
     * @param event
     */
    startMove = (event: MouseEvent) => {
        if (!this._windowState.maximize) {
            this._moveState.isMove = true;
            this._moveState.startX = event.clientX - this._attr.x!;
            this._moveState.startY = event.clientY - this._attr.y!;
            window.addEventListener('mousemove', this.moveWindow)
            window.addEventListener('mouseup', this.endMove, {passive: true, once: true})
        }
    }

    private moveWindow = (event: MouseEvent) => {
        if (this._moveState.isMove) {
            let newX = event.clientX - this._moveState.startX;
            let newY = event.clientY - this._moveState.startY;
            // 确保窗口不会被拖动到顶部以外的位置
            if (newY < 0) {
                newY = 0;
            }
            requestAnimationFrame(() => {
                this._attr.x = newX;
                this._attr.y = newY;
            })
        }
    }

    private endMove = () => {
        this._moveState.isMove = false;
        window.removeEventListener('mousemove', this.moveWindow)
        window.removeEventListener('mouseup', this.endMove)
    }

    /**
     * 窗口调整大小
     */
    startResize = (event: MouseEvent, type: string) => {
        if (!this._windowState.maximize) {
            this._resizeState.isResize = true;
            this._resizeState.resizeType = type;
            this._resizeState.startResizeX = event.clientX;
            this._resizeState.startResizeY = event.clientY;
            window.addEventListener('mousemove', this.moveResize)
            window.addEventListener('mouseup', this.endResize, {passive: true, once: true})
        }
    }
    private moveResize = (event: MouseEvent) => {
        if (this._resizeState.isResize) {
            const {clientX, clientY} = event;
            const {minHeight, minWidth, width, height} = this._attr;
            const deltaY = clientY - this._resizeState.startResizeY;
            const deltaX = clientX - this._resizeState.startResizeX;
            let newHeight, newWidth;
            const resizeTop = () => {
                newHeight = height! - deltaY;
                if (newHeight >= minHeight!) {
                    this._attr.height = newHeight;
                    this._attr.y! += deltaY;
                    this._resizeState.startResizeY = clientY;
                }
            }
            const resizeLeft = () => {
                newWidth = width! - deltaX;
                if (newWidth >= minWidth!) {
                    this._attr.width = newWidth;
                    this._attr.x! += deltaX;
                    this._resizeState.startResizeX = clientX;
                }
            }
            const resizeBottom = () => {
                newHeight = height! + deltaY;
                if (newHeight >= minHeight!) {
                    this._attr.height = newHeight;
                    this._resizeState.startResizeY = clientY;
                }
            }
            const resizeRight = () => {
                newWidth = width! + deltaX;
                if (newWidth >= minWidth!) {
                    this._attr.width = newWidth;
                    this._resizeState.startResizeX = clientX;
                }
            }
            switch (this._resizeState.resizeType) {
                case 't':
                    resizeTop()
                    break;
                case 'b':
                    resizeBottom()
                    break;
                case 'l':
                    resizeLeft()
                    break;
                case 'r':
                    resizeRight()
                    break;
                case 'lt':
                    resizeLeft()
                    resizeTop()
                    break;
                case 'lb':
                    resizeLeft()
                    resizeBottom()
                    break;
                case 'rt':
                    resizeRight()
                    resizeTop()
                    break;
                case 'rb':
                    resizeRight()
                    resizeBottom()
                    break;
                default:
                    break;
            }
        }
    }
    private endResize = () => {
        this._resizeState.isResize = false;
        window.removeEventListener('mousemove', this.moveResize)
        window.removeEventListener('mouseup', this.endResize)
    }


    get windowState(): BrowserWindowState {
        return this._windowState;
    }

    get moveState(): BrowserWindowMove {
        return this._moveState;
    }

    get resizeState(): BrowserWindowResize {
        return this._resizeState;
    }

    set attr(value: BrowserWindowType) {
        this._attr = value;
    }

    get attr(): BrowserWindowType {
        return this._attr;
    }

    get zIndex(): number {
        return this._zIndex;
    }

    set zIndex(value: number) {
        this._zIndex = value;
    }
}

/**
 * 窗口管理器
 */
export class BrowserWindowManager {
    private readonly _browserWindowSet: UnwrapNestedRefs<Set<BrowserWindow>>;

    constructor() {
        this._browserWindowSet = reactive(new Set<BrowserWindow>());
    }

    get browserWindowSet(): UnwrapNestedRefs<Set<BrowserWindow>> {
        return this._browserWindowSet;
    }

    /**
     * 添加窗口
     * @param option
     */

    addBrowserWindow(option: BrowserWindowType) {
        let browserWindow = new BrowserWindow(option);
        // 窗口居中
        browserWindow.attr.center && browserWindow.center();
        this._browserWindowSet.add(browserWindow);
    }

    /**
     * 删除窗口
     */
    removeBrowserWindow(option: BrowserWindowType): void {
        for (const window of this._browserWindowSet) {
            if (window.attr.key === option.key) {
                this._browserWindowSet.delete(window);
            }
        }
    }

    /**
     * 通过key查找BrowserWindow对象
     * @param key
     */
    findBrowserWindowByKey(key: string): BrowserWindow | undefined {
        for (const window of this._browserWindowSet) {
            if (window.attr.key === key) {
                return window as BrowserWindow;
            }
        }
        return undefined;
    }

}