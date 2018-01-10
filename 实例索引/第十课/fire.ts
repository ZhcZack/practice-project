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

class GameScene implements FireBlossomDelegate {
    game: Game

    private canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
    private scene: GameScene
    private elements: GameElement[]

    get sceneWidth(): number {
        return this.canvas.width
    }

    get sceneHeight(): number {
        return this.canvas.height
    }

    constructor() {
        this.canvas = document.querySelector('canvas') as HTMLCanvasElement
        this.context = this.canvas.getContext('2d')!
        this.elements = []

        this.setup()
    }

    private setup() {
        const ball = new Ball(0, 0, 10, 10)
        this.addElement(ball)
        const fire = new Fire()
        fire.setPosition(100, 50)
        this.addElement(fire)

        // const blossom = new Blossom(50, 50, 6, 6)
        // this.addElement(blossom)
    }

    private addElement(element: GameElement) {
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
    fireShouldBlossom(fire: Fire) {
        // console.log('should remove')
        const x = fire.x
        const y = fire.y
        this.removeElement(fire)
        const blossom = new Blossom()
        blossom.setPosition(x, y)
        this.addElement(blossom)
    }

    fireBlossomed(blossom: Blossom) {
        this.removeElement(blossom)
    }

}

interface GameElement {
    x: number
    y: number
    width: number
    height: number
    delegate: GameScene | null
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
    delegate: GameScene | null
    private speed: number

    constructor(x: number = 0, y: number = 0, width: number = 0, height: number = 0, sceneInfo?: SceneInfo) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.speed = 1
    }

    draw() {
        if (!this.delegate) {
            return
        }
        this.delegate.context.fillRect(this.x, this.y, this.width, this.height)
    }

    update() {
        if (!this.delegate) {
            return
        }
        this.x += this.speed
        if (this.x + this.width >= this.delegate.sceneWidth) {
            this.speed *= -1
        } else if (this.x <= 0) {
            this.speed *= -1
        }
    }
}

class Fire implements GameElement {
    private targetY: number
    private speed: number
    private _delegate: GameScene | null

    constructor(public x: number = 0, public y: number = 0, public width: number = 6, public height: number = 6) {
        this.setup()
    }

    private setup() {
        this.speed = 2
    }

    get delegate(): GameScene | null {
        return this._delegate
    }

    set delegate(delegate: GameScene | null) {
        this._delegate = delegate
        if (this._delegate) {
            this.y = this._delegate.sceneHeight
        }
    }

    setPosition(x: number, y: number) {
        this.x = x
        this.targetY = y
    }

    draw() {
        if (this.delegate) {
            this.delegate.context.fillRect(this.x, this.y, this.width, this.height)
        }
    }

    update() {
        this.y -= this.speed
        if (this.y <= this.targetY) {
            if (this.delegate) {
                this.delegate.fireShouldBlossom(this)
            }
        }
    }

}

class Blossom implements GameElement {
    private _delegate: GameScene | null
    private timer: number
    private elements: BlossomElemenet[]
    private numberOfElements: number

    get delegate(): GameScene | null {
        return this._delegate
    }

    set delegate(delegate: GameScene | null) {
        this._delegate = delegate
        this.elements.forEach(elem => elem.delegate = this._delegate)
    }

    constructor(public x: number = 0, public y: number = 0, public width: number = 4, public height: number = 4) {
        this.setup()
    }

    private setup() {
        this.timer = 30
        this.elements = []
        this.numberOfElements = 6

        for (let i = 0; i < this.numberOfElements; i++) {
            let b = new BlossomElemenet(this.x, this.y, this.width, this.height)
            this.elements.push(b)
        }
    }

    setPosition(x: number, y: number) {
        this.x = x
        this.y = y
        this.elements.forEach(elem => {
            elem.x = x
            elem.y = y
        })
    }


    draw() {
        if (!this.delegate) {
            return
        }
        this.elements.forEach(elem => elem.draw())
    }
    update() {
        if (!this.delegate) {
            return
        }
        this.elements.forEach(elem => elem.update())
        this.timer--
        console.log(`timer is now ${this.timer}`)
        if (this.timer <= 0) {
            this.elements = []
            this.delegate.fireBlossomed(this)
        }
    }

}

class BlossomElemenet implements GameElement {
    private speedX: number
    private speedY: number
    private color: string
    delegate: GameScene | null

    private get randomSpeed(): number {
        return Math.floor(Math.random() * 2 + 1) * (Math.random() > 0.5 ? 1 : -1)
    }

    private get randomColor(): string {
        return 'rgb(' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ')'
    }

    constructor(public x: number, public y: number, public width: number, public height: number) {
        this.setup()
    }

    private setup() {
        this.speedX = this.randomSpeed
        this.speedY = this.randomSpeed
        this.color = this.randomColor
    }

    draw() {
        if (!this.delegate) {
            return
        }
        this.delegate.context.fillRect(this.x, this.y, this.width, this.height)
    }

    update() {
        this.x += this.speedX
        this.y += this.speedY
        if (!this.delegate) {
            return
        }
        this.delegate.context.fillStyle = this.color
    }
}

interface FireBlossomDelegate {
    fireShouldBlossom(fire: Fire): void
    fireBlossomed(blossom: Blossom): void
}

window.addEventListener('load', main)

function main(event: Event) {
    const game = new Game(60)
}