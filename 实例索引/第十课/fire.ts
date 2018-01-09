class Game {
    private scene: GameScene

    constructor(private fps: number) {
        this.scene = new GameScene()
        this.scene.game = this
        this.start()
    }

    private update() {
        this.scene.update()
    }

    private draw() {
        this.scene.draw()
    }

    private clear() {
        this.scene.clear()
    }

    private start() {
        this.update()
        this.clear()
        this.draw()
        setTimeout(() => {
            this.start()
        }, 1000 / this.fps)
        // window.requestAnimationFrame(() => {
        //     this.start()
        // })
    }
}

class GameScene {
    game: Game

    private canvas: HTMLCanvasElement
    private context: CanvasRenderingContext2D
    private scene: GameScene
    private elements: GameElement[]

    constructor() {
        this.canvas = document.querySelector('canvas') as HTMLCanvasElement
        this.context = this.canvas.getContext('2d')!
        this.elements = []

        this.setup()
    }

    private setup() {
        const ball = new Ball(0, 0, 10, 10)
        this.addElement(ball)
    }

    private addElement(element: GameElement) {
        element.sceneInfo = {
            sceneWidth: this.canvas.width,
            sceneHeight: this.canvas.height,
            context: this.context,
        }
        this.elements.push(element)
    }

    update() {
        this.elements.forEach(element => element.update())
    }

    draw() {
        this.elements.forEach(element => element.draw())
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

}

interface GameElement {
    x: number
    y: number
    width: number
    height: number
    sceneInfo?: SceneInfo
    draw(): void
    update(): void
}

interface SceneInfo {
    sceneWidth: number
    sceneHeight: number
    context: CanvasRenderingContext2D
}

class Ball implements GameElement {
    x: number
    y: number
    width: number
    height: number
    sceneInfo: SceneInfo
    private speed: number

    constructor(x: number = 0, y: number = 0, width: number = 0, height: number = 0, sceneInfo?: SceneInfo) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.speed = 1
    }

    draw() {
        if (!this.sceneInfo) {
            return
        }
        this.sceneInfo.context.fillRect(this.x, this.y, this.width, this.height)
    }

    update() {
        this.x += this.speed
        if (this.x + this.width >= this.sceneInfo.sceneWidth) {
            this.speed *= -1
        } else if (this.x <= 0) {
            this.speed *= -1
        }
    }
}

window.addEventListener('load', main)

function main(event: Event) {
    const game = new Game(60)
}