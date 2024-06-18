import {Application} from "packages/core/types/Application";
import computer from "packages/assets/app/computer.png";
import setting from "packages/assets/icon/settings.png";
import Computer from "packages/app/computer"
import Setting from "packages/app/setting"

export const defaultApplication: Application[] = [
    {
        name: '此电脑',
        key: 'computer',
        icon: computer,
        version: '1.0.0',
        window: {
            key: 'computer',
            content: Computer
        },
    },
    {
        name: '设置',
        key: 'setting',
        icon: setting,
        version: '1.0.0',
        window: {
            title: '设置',
            width: 1100,
            minWidth: 1000,
            minHeight: 560,
            height: 600,
            icon: setting,
            key: 'setting',
            content: Setting,
            backgroundColor: 'rgb(239, 244, 249)'
        }
    }
]