/**
 * 键盘事件绑定
 */
class GameEventListener {
    private events = {} as GameEvent
    private listeners = {} as GameListener

    /**
     * 注册新的事件
     * @param type 事件类型
     * @param name 事件名称
     * @param listener 处理函数
     */
    add(type: string, name: string, listener: () => void) {
        if (!this.hasType(type)) {
            this.events[type] = {}
            this.listeners[type] = {}
        }
        if (!this.hasEvent(type, name)) {
            this.events[type][name] = true
            this.listeners[type][name] = listener
        } else {
            this.replace(type, name, listener)
            return
        }
        // @ts-ignore
        window.addEventListener(type, (e: KeyboardEvent) => {
            if (['keydown', 'keyup', 'keypress'].includes(type)) {
                if (name === e.key) {
                    if (this.events[type][name]) {
                        this.listeners[type][name]()
                    }
                }
            }
        })

    }

    /**
     * 移除事件
     * @param type 事件类型
     * @param name 事件名称
     */
    remove(type: string, name: string) {
        if (!this.hasType(type) || !this.hasEvent(type, name)) {
            return
        }
        this.events[type][name] = false
    }

    /**
     * 用新事件替换旧事件
     * @param type 事件类型
     * @param name 事件名称
     * @param listener 新的处理函数
     */
    private replace(type: string, name: string, listener: () => void) {
        if (!this.hasType(type) || !this.hasEvent(type, name)) {
            return
        }
        this.events[type][name] = true
        this.listeners[type][name] = listener
    }

    /**
     * 检查是否注册对应type类型事件
     * @param type 事件类型
     */
    private hasType(type: string): boolean {
        const types = Object.keys(this.events)
        return types.includes(type)
    }

    /**
     * 检查是否注册过对应名称事件
     * @param type 事件类型
     * @param name 事件名称
     */
    private hasEvent(type: string, name: string): boolean {
        if (!this.hasType(type)) {
            return false
        }
        const events = Object.keys(this.events[type])
        return events.includes(name)
    }
}

const gameEventListener = new GameEventListener()