import {Shortcut as ShortcutType} from "packages/core/types/Shortcut"
import {reactive, UnwrapNestedRefs} from "vue";

/**
 * 快捷方式管理器
 */
export class Shortcut {
    private readonly _name: string;
    private readonly _icon: string;
    private readonly _key: string;

    constructor(option: ShortcutType) {
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

export class ShortcutManager {
    private readonly _shortcuts: UnwrapNestedRefs<Set<Shortcut>>;

    constructor() {
        this._shortcuts = reactive(new Set<Shortcut>());
    }

    addShortcut(option: ShortcutType) {
        let shortcut = new Shortcut(option);
        this._shortcuts.add(shortcut);
    }

    get shortcuts(): UnwrapNestedRefs<Set<Shortcut>> {
        return this._shortcuts;
    }
}