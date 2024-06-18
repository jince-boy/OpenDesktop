// 定义事件回调函数的类型
interface EventCallback {
    (data?: any): void;
}

// 定义事件映射的类型,键为事件名称,值为事件回调函数数组
interface EventMap {
    [eventName: string]: EventCallback[];
}

// 事件管理器类
class Event {
    // 存储所有事件及其对应的回调函数
    private static events: EventMap = {};

    // 订阅事件
    // @param eventName 事件名称
    // @param callback 事件回调函数
    static subscribe(eventName: string, callback: EventCallback) {
        // 如果该事件名称还没有对应的回调函数数组,则创建一个新的数组
        if (!Event.events[eventName]) {
            Event.events[eventName] = [];
        }
        // 将回调函数添加到对应事件名称的数组中
        Event.events[eventName].push(callback);
    }

    // 取消订阅事件
    // @param eventName 事件名称
    // @param callback 事件回调函数
    static unsubscribe(eventName: string, callback: EventCallback) {
        // 如果该事件名称有对应的回调函数数组
        if (Event.events[eventName]) {
            // 找到回调函数在数组中的索引
            const index = Event.events[eventName].indexOf(callback);
            // 如果找到了,则从数组中移除该回调函数
            if (index !== -1) {
                Event.events[eventName].splice(index, 1);
            }
        }
    }

    // 发布事件
    // @param eventName 事件名称
    // @param data 事件数据(可选)
    static publish(eventName: string, data?: any) {
        // 如果该事件名称有对应的回调函数数组
        if (Event.events[eventName]) {
            // 遍历所有回调函数,并逐个执行
            Event.events[eventName].forEach((callback) => callback(data));
        }
    }
}

export {Event};
