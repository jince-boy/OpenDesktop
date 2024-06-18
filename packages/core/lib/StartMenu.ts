import {StartMenu as StartMenuType} from "packages/core/types/StartMenu"
import {reactive, UnwrapNestedRefs} from "vue";


export class StartMenu {
    private readonly _name: string;
    private readonly _icon: string;
    private readonly _key: string;

    constructor(option: StartMenuType) {
        this._name = option.name;
        this._icon = option.icon;
        this._key = option.key;
    }

    get name(): string {
        return this._name;
    }

    get icon(): string {
        return this._icon;
    }

    get key(): string {
        return this._key;
    }
}

export class StartMenuManager {
    private readonly _startMenu: UnwrapNestedRefs<Set<StartMenu>>;

    constructor() {
        this._startMenu = reactive(new Set<StartMenu>());
    }

    addStartMenuItem(option: StartMenuType) {
        let startMenuItem = new StartMenu(option);
        this._startMenu.add(startMenuItem);
    }


    get startMenu(): UnwrapNestedRefs<Set<StartMenu>> {
        return this._startMenu;
    }
}