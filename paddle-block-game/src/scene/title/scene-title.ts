/**
 * 游戏标题场景
 */
class SceneTitle extends GameScene {
    constructor(game: Game) {
        super(game)
    }

    registerEvents() {
        this.registerEvent('keydown', 'k', () => {
            this.switchMainScene()
        })

        this.registerEvent('keydown', 'e', () => {
            this.switchEditScene()
        })
    }

    private switchMainScene() {
        this.game.scene = new SceneMain(this.game)
    }

    private switchEditScene() {
        this.game.scene = new SceneEdit(this.game)
    }

    draw() {
        this.game.fillText('按K开始游戏', 10, 290)
        this.game.fillText('按E编辑关卡', 10, 250)
    }
}