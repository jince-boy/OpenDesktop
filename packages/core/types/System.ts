import {Application} from "packages/core/types/Application";

export interface SystemAttr {
    background: string;
    desktopIconSize: number;
    desktopFontSize: number;
    menuIconSize: number;
    menuFontSize: number;
    [key: string]: any;
}

export interface System {
    attr?: SystemAttr,
    apps?: Application[]
}
