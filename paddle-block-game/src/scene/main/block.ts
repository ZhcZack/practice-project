/**
 * 砖块
 */
class Block implements ImageElement {
    height: number
    width: number
    x: number
    y: number
    image: HTMLImageElement
    alive = true
    editMode = false

    constructor(game: Game, position: BlockPosition) {
        let obj = game.imageByName('block')
        this.x = position[0]
        this.y = position[1]
        this.image = obj.image
        this.width = obj.width
        this.height = obj.height

        this.lifes = position[2] || 1
        if (this.lifes === 2) {
            this.image = game.imageByName('block-2').image
        }
    }

    private lifes = 0


    kill() {
        this.lifes -= 1
        this.alive = this.lifes > 0
    };

    private static aInb(d1: number, d2: number, d3: number): boolean {
        return d1 >= d2 && d1 <= d3
    }

    /**
     * 判断挡板和球是否相撞，以及从x或y方向相撞
     * @param {Ball} ball
     * @return {{result: boolean, fromX: boolean, fromY: boolean}} result：是否相撞，fromX：是否从X方向相撞，fromY：是否从Y方向相撞
     */
    collide(ball: Ball): { result: boolean; fromX: boolean; fromY: boolean; } {
        // dx, dy为相撞时相交矩形的x，y方向长度
        let dx = 0
        let dy = 0
        let fromX
        let fromY
        let result = false

        if (Block.aInb(this.x, ball.x, ball.x + ball.width)) {
            dx = Math.min(ball.x + ball.width - this.x, this.width)
            if (Block.aInb(this.y, ball.y, ball.y + ball.height)) {
                dy = Math.min(ball.y + ball.height - this.y, this.height)
                result = true
            } else if (Block.aInb(ball.y, this.y, this.y + this.height)) {
                dy = Math.min(this.y + this.height - ball.y, ball.height)
                result = true
            } else {
                result = false
            }
        } else if (Block.aInb(ball.x, this.x, this.x + this.width)) {
            dx = Math.min(this.x + this.width - ball.x, ball.width)
            if (Block.aInb(this.y, ball.y, ball.y + ball.height)) {
                dy = Math.min(ball.y + ball.height - this.y, this.height)
                result = true
            } else if (Block.aInb(ball.y, this.y, this.y + this.height)) {
                dy = Math.min(this.y + this.height - ball.y, ball.height)
                result = true
            } else {
                result = false
            }
        } else {
            result = false
        }
        fromX = dx > dy
        fromY = !fromX

        return {
            result: result && this.alive,
            fromX,
            fromY
        }
    };

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
}
