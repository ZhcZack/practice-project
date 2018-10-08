class Game {
    /**
     * 游戏是否暂停
     */
    paused = false

    /**
     * 画布宽度
     */
    get sceneWidth(): number {
        return this.canvas.width
    }

    /**
     * 画布高度
     */
    get sceneHeight(): number {
        return this.canvas.height
    }

    /**
     * 设置游戏要显示的场景
     * @param newScene 新场景
     */
    set scene(newScene: GameScene) {
        if (this.gameScene) {
            this.gameScene.clearEvents()
        }
        // 切换场景前要先取消当前场景内注册鼠标/键盘事件，然后注册新场景内鼠标/键盘事件
        newScene.registerEvents()
        this.context.fillStyle = '#000'
        this.gameScene = newScene
    }

    set fillStyle(style: string) {
        this.context.fillStyle = style
    }

    constructor(images: LoadImages) {
        // this.fps = fps;
        this.images = images
        this.gameImages = {}

        //
        this.paused = false
        this.gameScene = null
        this.actions = {}
        this.keydowns = {}

        let canvas = get('#canvas') as HTMLCanvasElement
        let context = canvas.getContext('2d')!

        this.canvas = canvas
        this.context = context

        this.init()
    }

    /**
     * 注册场景鼠标事件(mousedown, mouseup, mousemove)
     * @param type
     * @param method
     */
    registerMouseEvent(type: string, method: (e: MouseEvent) => void) {
        if (!['mousedown', 'mouseup', 'mousemove'].includes(type)) {
            return
        }
        this.canvas.addEventListener(type, e => {
            const event = e as MouseEvent
            method(event)
        })
    }

    /**
     * 根据图片名称得到图片对象
     * @param name 图片名称
     * @returns 图片对象
     */
    imageByName(name: string): ImageElement {
        let img = this.gameImages[name]
        return {
            width: img.width,
            height: img.height,
            image: img,
            x: 0,
            y: 0
        }
    }

    /**
     * 在画布上绘制图片
     * @param imageElement 被绘制的图片对象
     */
    drawImage(imageElement: ImageElement) {
        if (!imageElement.editMode) {
            this.context.drawImage(imageElement.image, imageElement.x, imageElement.y)
        } else {
            this.context.setLineDash([5, 5])
            this.context.beginPath()
            this.context.moveTo(0, imageElement.y)
            this.context.lineTo(this.canvas.width, imageElement.y)
            this.context.stroke()
            this.context.beginPath()
            this.context.moveTo(imageElement.x, 0)
            this.context.lineTo(imageElement.x, this.canvas.height)
            this.context.stroke()
            this.context.drawImage(imageElement.image, imageElement.x, imageElement.y)
            // 画block坐标(x,y)
            this.context.fillText(`(${imageElement.x}, ${imageElement.y})`, imageElement.x + 10, imageElement.y - 10)
        }
    }

    /**
     * fillText
     * @param text text
     * @param x left corner x
     * @param y left corner y
     * @param maxWidth maximum width of the rendered text
     */
    fillText(text: string, x: number, y: number, maxWidth?: number) {
        this.context.fillText(text, x, y, maxWidth)
    }

    /**
     * fillRect
     * @param color fillStyle
     * @param x left corner x
     * @param y left corner y
     * @param width rect width
     * @param height rect height
     */
    fillRect(color: string, x: number, y: number, width: number, height: number) {
        this.context.fillStyle = color
        this.context.fillRect(x, y, width, height)
    }

    /**
     * 注册游戏内按键事件（非场景按键事件）
     * @param key 事件键值
     * @param callback 事件函数
     */
    registerAction(key: string, callback: () => void) {
        this.actions[key] = callback
    }


    private init() {
        this.initEvents()
        this.loadImages()
    }

    /**
     * 初始化事件
     */
    private initEvents() {
        window.addEventListener('keydown', e => {
            e.stopPropagation()
            this.keydowns[e.key] = true
        })
        window.addEventListener('keyup', e => {
            e.stopPropagation()
            this.keydowns[e.key] = false
        })
    }

    /**
     * 载入所有图片，载入之后开始运行游戏
     */
    private loadImages() {
        let promises = []
        const names = Object.keys(this.images)
        for (let name of names) {
            let path = this.images[name]
            let img = new Image()
            img.src = path
            let p = new Promise((resolve) => {
                img.addEventListener('load', e => {
                    e.stopPropagation()
                    resolve({
                        name,
                        image: img
                    })
                })
            })
            promises.push(p)
        }
        Promise.all(promises).then(result => {
            const value = result as { name: string, image: HTMLImageElement }[]
            for (let r of value) {
                this.gameImages[r.name] = r.image
            }
            this.__start()
        })
    }

    /**
     * 游戏更新视图内内容
     */
    private update() {
        if (this.gameScene) {
            this.gameScene.update()
        }
    }

    /**
     * 游戏绘制视图
     */
    private draw() {
        if (this.gameScene) {
            this.gameScene.draw()
        }
    }

    /**
     * 游戏持续运行，更新-清除-绘制
     */
    private runLoop() {
        let actions = Object.keys(this.actions)
        for (let key of actions) {
            if (this.keydowns[key]) {
                this.actions[key]()
            }
        }
        // update
        this.update()
        // clear
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        // draw
        this.draw()

        // continue loop
        setTimeout(() => {
            this.runLoop()
        }, 1000 / fps)

    }

    /**
     * 游戏开始
     * @private
     */
    private __start() {
        this.runLoop()
    }

    /**
     * 游戏画布
     */
    private canvas: HTMLCanvasElement
    /**
     * 绘图环境
     */
    private context: CanvasRenderingContext2D
    /**
     * 游戏开始需要载入的图片资源
     */
    private readonly images: LoadImages
    /**
     * 游戏载入的图片
     */
    private readonly gameImages: GameImages
    /**
     * 游戏当前显示的场景
     */
    private gameScene: GameScene | null
    /**
     * 游戏内注册的按键
     */
    private readonly keydowns: GameKeydowns
    /**
     * 游戏内注册的按键对应的处理函数
     */
    private readonly actions: GameActions
}
