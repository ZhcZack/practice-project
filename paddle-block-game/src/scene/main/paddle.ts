/**
 * 挡板
 */
class Paddle implements ImageElement {
    height: number
    image: HTMLImageElement
    width: number
    x: number
    y: number

    constructor(game: Game) {
        let obj = game.imageByName('paddle')
        this.x = 100
        this.y = 250
        this.height = obj.height
        this.width = obj.width
        this.image = obj.image
    }

    move(x: number) {
        if (x < 0) {
            x = 0
        }
        if (x > 400 - this.width) {
            x = 400 - this.width
        }
        this.x = x
    }

    moveLeft() {
        this.move(this.x - this.speed)
    }

    moveRight() {
        this.move(this.x + this.speed)
    }

    private static aInb(d1: number, d2: number, d3: number): boolean {
        return d1 >= d2 && d1 <= d3
    }

    /**
     * 判断挡板与球是否相撞
     * @param ball Ball
     */
    collide(ball: Ball): boolean {
        if (Paddle.aInb(this.x, ball.x, ball.x + ball.width) ||
            Paddle.aInb(ball.x, this.x, this.x + this.width)) {
            if (Paddle.aInb(this.y, ball.y, ball.y + ball.height) ||
                Paddle.aInb(ball.y, this.y, this.y + this.height)) {
                return true
            }
        }
        return false
    }

    private speed = 15
}
