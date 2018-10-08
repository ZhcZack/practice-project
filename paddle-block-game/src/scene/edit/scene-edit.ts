/**
 * 关卡编辑器
 */
class SceneEdit extends GameScene {
    constructor(game: Game) {
        super(game)

        this.addButton = new EditAddButton(this.game)
        this.saveButton = new EditSaveButton(this.game)
        this.blocks = []

        this.initBlocks()
        this.blocksDraggable()
    }

    /**
     * 读取level.ts中的关卡数据显示砖块
     */
    private initBlocks() {
        const positions = levels[0]
        for (let position of positions) {
            const block = new Block(this.game, position)
            this.blocks.push(block)
        }
    }

    /**
     * 可以拖动砖块改变砖块的位置
     */
    private blocksDraggable() {
        let dragBlock: Block | null = null
        let dragStart = false
        let dx = 0
        let dy = 0

        this.game.registerMouseEvent('mousedown', e => {
            e.stopPropagation()
            let x = e.offsetX
            let y = e.offsetY

            for (let block of this.blocks) {
                if (block.hasPoint(x, y)) {
                    dragBlock = block
                    dragBlock.editMode = true
                    dragStart = true
                    dx = x - dragBlock.x
                    dy = y - dragBlock.y
                    break
                }
            }
        })

        this.game.registerMouseEvent('mousemove', e => {
            if (!dragStart || !dragBlock) {
                return
            }
            let x = e.offsetX
            let y = e.offsetY
            // log(x, y)
            dragBlock.x = x - dx
            dragBlock.y = y - dy

        })

        this.game.registerMouseEvent('mouseup', e => {
            e.stopPropagation()
            if (dragBlock) {
                dragBlock.editMode = false
            }
            dragBlock = null
            dragStart = false
            dx = dy = 0
        })
    }

    /**
     * 结束编辑模式，返回开始界面
     */
    private endEdit() {
        this.game.scene = new SceneTitle(this.game)
    }

    registerEvents() {
        this.registerEvent('keydown', 'e', () => {
            this.endEdit()
        })

        this.game.registerMouseEvent('mousedown', e => {
            e.stopPropagation()
            if (this.addButton.beClicked(e.offsetX, e.offsetY)) {
                this.addNewBlock()
                return
            }
            if (this.saveButton.beClicked(e.offsetX, e.offsetY)) {
                this.saveBlocks()
                return
            }
        })
    }

    draw() {
        this.game.fillText('拖动砖块调整位置，点击保存更新关卡', 10, this.game.sceneHeight - 40)
        this.game.fillText('按E结束编辑模式，返回标题界面', 10, this.game.sceneHeight - 10)
        this.game.drawImage(this.addButton)
        this.game.drawImage(this.saveButton)
        for (const block of this.blocks) {
            this.game.drawImage(block)
        }
    }

    private addNewBlock() {
        const newBlock = new Block(this.game, [200, 200])
        this.blocks.push(newBlock)
    }

    private saveBlocks() {
        let position = []
        for (const block of this.blocks) {
            let pos = [block.x, block.y]
            position.push(pos)
        }
        levels[0] = position
        this.endEdit()
    }

    private readonly addButton: EditAddButton
    private readonly saveButton: EditSaveButton
    private blocks: Block[]
}