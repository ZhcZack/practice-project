function get(sel: string): HTMLElement {
    return document.querySelector(sel) as HTMLElement
}

function getAll(sel: string): NodeListOf<HTMLElement> {
    return document.querySelectorAll(sel) as NodeListOf<HTMLElement>
}

function log(...args: any[]) {
    const textarea = get('#text-log') as HTMLTextAreaElement
    textarea.value += '\n' + args.join(' ')
}

let fps = 30

/**
 * 加载游戏关卡数据
 * @param game Game
 * @param n 第几关（从1开始）
 * @param blocks 场景内的砖块
 */
function loadLevel(game: Game, n: number, blocks: Block[]) {
    if (n > levels.length) {
        return
    }
    n = n - 1
    const level = levels[n]
    blocks.length = 0
    for (let i = 0; i < level.length; i++) {
        const position = level[i]
        const block = new Block(game, position)
        blocks.push(block)
    }
}

get('#clear-log').addEventListener('click', e => {
    const textarea = get('#text-log') as HTMLTextAreaElement
    textarea.value = ''
})

