import {defineComponent} from "vue";

export type BrowserWindowContent = ReturnType<typeof defineComponent>;

export interface BrowserWindowAttr {
    title: string;
    key: string;
    content: BrowserWindowContent;
    icon: string;
    width: number;
    height: number;
    minWidth: number;
    minHeight: number;
    x: number;
    y: number;
    center: boolean;
    resizable: boolean;
    minimized: boolean;
    maximized: boolean;
    fullscreen: boolean;
    alwaysOnTop: boolean;
    backgroundColor: string;
}

export interface BrowserWindowState {
    maximize: boolean;
    minimize: boolean;
}

export interface BrowserWindowMove {
    isMove: boolean;
    startX: number;
    startY: number;
}

export interface BrowserWindowResize {
    isResize: boolean;
    resizeType: string;
    startResizeX: number;
    startResizeY: number;
}

export type BrowserWindow = Partial<Omit<BrowserWindowAttr, 'content' | 'key'>> & {
    content: BrowserWindowContent;
    key: string;
}