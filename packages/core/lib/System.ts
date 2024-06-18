import {reactive} from 'vue'
import {SystemAttr as SystemAttrType} from "packages/core/types/System"
import {defaultSystemAttr} from "packages/core/constants/DefaultSystemAttr"

export class SystemManager {
    private readonly _attr: SystemAttrType;

    constructor(attr?: SystemAttrType) {
        const storedAttr = localStorage.getItem('SystemAttr');
        const initialAttr = storedAttr ? JSON.parse(storedAttr) : defaultSystemAttr;
        this._attr = reactive(this.createProxy(Object.assign({}, initialAttr, attr)));
    }

    get attr(): SystemAttrType {
        return this._attr;
    }

    private createProxy(target: SystemAttrType): SystemAttrType {
        const handler = {
            set: (obj: SystemAttrType, prop: string, value: any) => {
                obj[prop] = value;
                localStorage.setItem('SystemAttr', JSON.stringify(obj));
                return true;
            }
        };
        return new Proxy(target, handler);
    }
}