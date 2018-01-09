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

class GameScene implements FireBloomDelegate {
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
        const fire = new Fire(0, 0, 10, 10)
        fire.setPosition(10, 50)
        this.addElement(fire)
    }

    private addElement(element: GameElement) {
        element.sceneInfo = {
            sceneWidth: this.canvas.width,
            sceneHeight: this.canvas.height,
            context: this.context,
        }
        element.delegate = this
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

    private removeElement(element: GameElement): boolean {
        let index = -1
        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i] === element) {
                index = i
                break
            }
        }
        if (index > -1) {
            this.elements.splice(index, 1)
            return true
        }
        return false
    }

    // fire bloom delegate methods
    fireShouldBloom(fire: Fire) {
        console.log('should remove')
        const x = fire.x
        const y = fire.y
        this.removeElement(fire)
    }

}

interface GameElement {
    x: number
    y: number
    width: number
    height: number
    delegate?: GameScene
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
    delegate?: GameScene
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

class Fire implements GameElement {
    private targetY: number
    private speed: number
    private info: SceneInfo
    delegate?: GameScene

    constructor(public x: number = 0, public y: number = 0, public width: number = 0, public height: number = 0) {
        this.setup()
    }

    private setup() {
        this.speed = 2
        // if (this.sceneInfo) {
        //     this.y = this.sceneInfo.sceneHeight
        // }
    }

    get sceneInfo(): SceneInfo {
        return this.info
    }

    set sceneInfo(info: SceneInfo) {
        this.info = info
        this.y = this.sceneInfo.sceneHeight
    }

    setPosition(x: number, y: number) {
        this.x = x
        if (this.sceneInfo) {
            this.y = this.sceneInfo.sceneHeight
        }
        this.targetY = y
    }

    draw() {
        if (this.sceneInfo) {
            this.sceneInfo.context.fillRect(this.x, this.y, this.width, this.height)
        }
    }

    update() {
        this.y -= this.speed
        if (this.y <= this.targetY) {
            if (this.delegate) {
                this.delegate.fireShouldBloom(this)
            }
        }
    }

}

interface FireBloomDelegate {
    fireShouldBloom(fire: Fire): void
}

window.addEventListener('load', main)

function main(event: Event) {
    const game = new Game(60)
}