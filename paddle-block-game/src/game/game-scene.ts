/**
 * 游戏场景类
 */
class GameScene {
    protected game: Game

    constructor(game: Game) {
        this.game = game
        this.eventsMap = {}
    }

    draw() {

    }

    update() {

    }

    /**
     * 为当前场景注册鼠标事件
     * @param type 事件类型
     * @param name 事件名称
     * @param action 处理函数
     */
    protected registerEvent(type: string, name: string, action: () => void) {
        if (!this.eventsMap[type]) {
            this.eventsMap[type] = {}
        }
        this.eventsMap[type][name] = action
        gameEventListener.add(type, name, action.bind(this))
    }

    /**
     * 注册场景内键盘事件
     * 子类的事件注册，要在这个方法里注册
     */
    registerEvents() {
        log('register')
    }

    /**
     * 移除场景内键盘事件
     */
    clearEvents() {
        log('clear')
        const types = Object.keys(this.eventsMap)
        for (let type of types) {
            const names = Object.keys(this.eventsMap[type])
            for (let name of names) {
                gameEventListener.remove(type, name)
            }
        }
        this.eventsMap = {}
    }

    /**
     * 当前场景里所有注册的键盘事件
     */
    private eventsMap: SceneEventMap
}