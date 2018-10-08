function __main() {
    const images = {
        ball: 'img/ball.png',
        block: 'img/block.png',
        'block-2': 'img/block-2.png',
        paddle: 'img/paddle.png',
        'edit-add': 'img/edit-add.png',
        'edit-save': 'img/edit-save.png'
    }

    const game = new Game(images)
    game.scene = new SceneTitle(game)
}

__main()
