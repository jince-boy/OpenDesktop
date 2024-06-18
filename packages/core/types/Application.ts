import {BrowserWindow} from "packages/core/types/BrowserWindow";

export interface Application {
    name: string;
    key: string;
    icon?: string;
    version: string;
    openMultiple?: boolean;
    window: BrowserWindow;
}