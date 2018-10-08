/**
 * 球
 */
class Ball implements ImageElement {
    height: number
    image: HTMLImageElement
    width: number
    x: number
    y: number

    constructor(game: Game) {
        const img = game.imageByName('ball')

        this.x = 100
        this.y = 190
        this.image = img.image
        this.height = img.height
        this.width = img.width
    }

    move() {
        if (this.fired) {
            if (this.x < 0 || this.x + this.image.width > 400) {
                this.speedX *= -1
            }
            if (this.y < 0 || this.y + this.image.height > 300) {
                this.speedY *= -1
            }
            this.x += this.speedX
            this.y += this.speedY
        }
    }

    fire() {
        this.fired = true
    }

    reboundX() {
        this.speedX *= -1
    }

    reboundY() {
        this.speedY *= -1
    }

    /**
     * 是否被鼠标点中
     * @param x 鼠标x
     * @param y 鼠标y
     */
    hasPoint(x: number, y: number) {
        const xIn = x >= this.x && x <= this.x + this.width
        const yIn = y >= this.y && y <= this.y + this.height
        return xIn && yIn
    }

    private speedX = 5
    private speedY = 5
    private fired = false

}