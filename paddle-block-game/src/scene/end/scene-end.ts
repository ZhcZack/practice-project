/**
 * 游戏结束场景
 */
class SceneEnd extends GameScene {
    constructor(game: Game) {
        super(game)
    }

    registerEvents() {
        this.registerEvent('keydown', 'r', () => {
            this.backToTitle()
        })
    }

    /**
     * 返回游戏标题界面
     */
    private backToTitle() {
        this.game.scene = new SceneTitle(this.game)
    }

    draw() {
        this.game.fillText('按r返回开始界面', 10, 290)
    }
}