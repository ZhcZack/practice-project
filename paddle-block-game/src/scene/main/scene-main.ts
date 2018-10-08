/**
 * 游戏主场景
 */
class SceneMain extends GameScene {
    constructor(game: Game) {
        super(game)

        this.paddle = new Paddle(game)
        this.ball = new Ball(game)
        this.blocks = []

        this.initElements()
        this.initEvents()
        this.enableDebugMode()
    }

    /**
     * 注册游戏事件（非按键/鼠标事件）
     */
    private initEvents() {
        this.game.registerAction('a', () => {
            this.paddle.moveLeft()
        })
        this.game.registerAction('d', () => {
            this.paddle.moveRight()
        })
        this.game.registerAction('f', () => {
            this.ball.fire()
        })
    }

    /**
     * 初始化场景内元素
     */
    private initElements() {
        loadLevel(this.game, 1, this.blocks)
    }

    /**
     * 场景切换的时候，将场景内容初始化。
     */
    private reset() {
        this.initElements()
    }

    /**
     * 开启debug模式
     */
    private enableDebugMode() {
        this.registerEvent('keydown', 'p', () => {
            this.game.paused = !this.game.paused
            // log(this);
        })
        const levels = '1234567'.split('')
        levels.forEach(level => {
            this.registerEvent('keydown', String(level), () => {
                loadLevel(this.game, Number(level), this.blocks)
            })
        })

        get('#fps-range').addEventListener('input', e => {
            e.stopPropagation()
            const input = e.target as HTMLInputElement
            fps = Number(input.value)
        })

        // 暂停的时候拖拽改变球的位置
        let enableDrag = false
        let dx = 0
        let dy = 0
        this.game.registerMouseEvent('mousedown', e => {
            e.stopPropagation()
            let x = e.offsetX
            let y = e.offsetY
            // log(x, y)

            if (this.ball.hasPoint(x, y)) {
                enableDrag = true
                dx = x - this.ball.x
                dy = y - this.ball.y
            }
        })

        this.game.registerMouseEvent('mousemove', e => {
            e.stopPropagation()
            if (enableDrag) {
                let x = e.offsetX
                let y = e.offsetY
                // log(x, y)
                this.ball.x = x - dx
                this.ball.y = y - dy
            }
        })

        this.game.registerMouseEvent('mouseup', e => {
            e.stopPropagation()
            enableDrag = false
            dx = dy = 0
        })

    }

    draw() {
        this.game.fillRect('#876', 0, 0, this.game.sceneWidth, this.game.sceneHeight)

        this.game.drawImage(this.paddle)
        this.game.drawImage(this.ball)

        for (let block of this.blocks) {
            if (block.alive) {
                this.game.drawImage(block)
            }
        }

        this.game.fillStyle = '#000'
        this.game.fillText('分数：' + this.score, 10, 290)
        this.game.fillText('fps: ' + fps, this.game.sceneWidth - 50, this.game.sceneHeight - 20)
    }

    update() {
        if (this.game.paused) {
            return
        }
        // 判断游戏结束
        if (this.ball.y > this.paddle.y) {
            // 跳转到SceneEnd
            this.game.scene = new SceneEnd(this.game)
        }
        this.ball.move()
        // 相撞，球和挡板
        if (this.paddle.collide(this.ball)) {
            this.ball.reboundY()
        }
        // 相撞，球和砖块们
        for (let block of this.blocks) {
            let status = block.collide(this.ball)
            if (status.result) {
                block.kill()
                if (status.fromX) {
                    this.ball.reboundY()
                } else if (status.fromY) {
                    this.ball.reboundX()
                }
                this.score += 100
            }
        }
    }

    private score = 0
    private ball: Ball
    private paddle: Paddle
    private blocks: Block[]
}