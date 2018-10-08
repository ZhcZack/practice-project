/**
 * "保存"按钮
 */
class EditSaveButton implements ImageElement {
    height: number
    image: HTMLImageElement
    width: number
    x: number
    y: number

    constructor(game: Game) {
        const img = game.imageByName('edit-save')
        this.image = img.image
        this.width = img.width
        this.height = img.height
        this.x = game.sceneWidth - this.width
        this.y = 60
    }

    /**
     * 是否被鼠标点中
     * @param x 鼠标x
     * @param y 鼠标y
     */
    beClicked(x: number, y: number) {
        return (x >= this.x && x <= this.x + this.width) && (y >= this.y && y <= this.y + this.height)
    }
}