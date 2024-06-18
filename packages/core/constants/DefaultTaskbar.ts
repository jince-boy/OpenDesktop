import {TaskbarApp as TaskbarAppType,TaskbarButton as TaskbarButtonType} from "packages/core/types/Taskbar"
import home from "packages/assets/icon/home.png";
import widget from "packages/assets/icon/widget.png";

export const defaultTaskbar: TaskbarAppType[] | TaskbarButtonType[] = [
    {
        name: "开始",
        key: "home",
        icon: home,
        sort: 0
    },
    {
        name: '组件',
        key: 'widget',
        icon: widget,
        sort: 0
    }
]