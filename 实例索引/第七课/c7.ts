namespace c7 {
    const get = (sel: string): HTMLElement | null => document.querySelector(sel)
    const getAll = (sel: string): NodeListOf<HTMLElement> => document.querySelectorAll(sel)
    const log = console.log.bind(console)

    interface PathInfo {
        isInDrawMode: boolean
        path: [number, number][]
        timer: number
    }

    interface DrawActions {
        drawPathMouseDown: (e: MouseEvent) => void
        drawPathMouseMove: (e: MouseEvent) => void
        drawPathMouseUp: (e: MouseEvent) => void
    }

    interface ClickInfo {
        timerX: number
        timerY: number
        duration: number
    }

    const pathInfo: PathInfo = {
        isInDrawMode: false,
        path: [],
        timer: 0,
    }

    const clickInfo: ClickInfo = {
        timerX: 0,
        timerY: 0,
        duration: 2, // second
    }

    function main() {
        buttonActions()
    }

    function buttonActions() {
        const buttons = getAll('button')
        const p = get('p')
        if (buttons.length < 1 || !p) { return }
        const drawActions = drawMoveAction()

        buttons[0].addEventListener('click', e => {
            refreshUI('first')
            clickToMoveEnabled()
            drawMovingPathDisalbed(drawActions)
            e.stopPropagation()
        })
        buttons[1].addEventListener('click', e => {
            refreshUI('second')
            clickToMoveDisabled()
            drawMovingPathEnabled(drawActions)
            e.stopPropagation()
        })
    }

    function itemImageChange() {
        const item = get('.item') as HTMLImageElement
        const imgs = ['http://www.fgm.cc/learn/lesson7/img/1.gif',
            'http://www.fgm.cc/learn/lesson7/img/2.gif']
        const current = item.src
        let index = imgs.indexOf(current)
        index++
        if (index > imgs.length - 1) {
            index = 0
        }
        item.src = imgs[index]
    }

    function drawPathMouseDown(e: MouseEvent) {
        pathInfo.isInDrawMode = true
        const x = e.clientX
        const y = e.clientY
        pathInfo.path.push([x, y])
    }

    function drawPathMouseMove(e: MouseEvent) {
        if (!pathInfo.isInDrawMode) {
            return
        }
        const x = e.clientX
        const y = e.clientY
        pathInfo.path.push([x, y])
    }

    function drawPathMouseUp(e: MouseEvent) {
        pathInfo.isInDrawMode = false
        const item = get('.item')!
        drawPathMove(item)
    }

    function drawPathMove(moveItem: HTMLElement) {
        itemImageChange()
        pathInfo.timer = setInterval(() => {
            if (pathInfo.path.length < 1) {
                clearInterval(pathInfo.timer)
                itemImageChange()
                return
            }
            let p = pathInfo.path.shift()
            if (p) {
                moveItem.style.left = p[0] + 'px'
                moveItem.style.top = p[1] + 'px'
            }
            if (pathInfo.path.length < 1) {
                clearInterval(pathInfo.timer)
                itemImageChange()
            }
        }, 1000 / 60)
    }

    function drawMoveAction() {
        const item = get('.item')!

        return {
            drawPathMouseDown: drawPathMouseDown,
            drawPathMouseUp: drawPathMouseUp,
            drawPathMouseMove: drawPathMouseMove
        }
    }

    function drawMovingPathEnabled(actions: DrawActions) {
        // var actions = drawMoveAction()
        window.addEventListener('mousedown', actions.drawPathMouseDown);
        window.addEventListener('mouseup', actions.drawPathMouseUp)
        window.addEventListener('mousemove', actions.drawPathMouseMove)
    }

    function drawMovingPathDisalbed(actions: DrawActions) {
        // var actions = drawMoveAction()
        window.removeEventListener('mousedown', actions.drawPathMouseDown);
        window.removeEventListener('mouseup', actions.drawPathMouseUp)
        window.removeEventListener('mousemove', actions.drawPathMouseMove)
    }

    function clickMoveInXWithStableSpeed(moveItem: HTMLElement, distance: number, speed: number, timer: number) {
        itemImageChange()
        const end = moveItem.offsetLeft + distance
        clearInterval(timer)
        timer = setInterval(() => {
            if (distance >= 0) {
                moveItem.style.left = moveItem.offsetLeft + speed + 'px'
                distance -= speed
            } else {
                moveItem.style.left = moveItem.offsetLeft - speed + 'px'
                distance += speed
            }
            if (Math.abs(distance - speed) <= speed) {
                clearInterval(timer)
                moveItem.style.left = end + 'px'
                itemImageChange()
            }
        }, 1000 / 60)
    }

    function clickMoveInYWithStableSpeed(moveItem: HTMLElement, distance: number, speed: number, timer: number) {
        const end = moveItem.offsetTop + distance
        clearInterval(timer)
        timer = setInterval(function () {
            if (distance >= 0) {
                moveItem.style.top = moveItem.offsetTop + speed + 'px'
                distance -= speed
            } else {
                moveItem.style.top = moveItem.offsetTop - speed + 'px'
                distance += speed
            }
            if (Math.abs(distance - speed) <= speed) {
                clearInterval(timer)
                moveItem.style.top = end + 'px'
            }
        }, 1000 / 60)
    }

    function clickMoveInXWithChangedSpeed(moveItem: HTMLElement, target: number, timer: number) {
        itemImageChange()
        clearInterval(timer)
        timer = setInterval(function () {
            let speed = (target - moveItem.offsetLeft) / 10
            if (speed > 0) {
                speed = Math.ceil(speed)
            } else {
                speed = Math.floor(speed)
            }
            if (speed === 0) {
                clearInterval(timer)
                itemImageChange()
            } else {
                moveItem.style.left = moveItem.offsetLeft + speed + 'px'
            }
        }, 1000 / 60)
    }

    function clickMoveInYWithChangedSpeed(moveItem: HTMLElement, target: number, timer: number) {
        clearInterval(timer)
        timer = setInterval(function () {
            let speed = (target - moveItem.offsetTop) / 10
            if (speed > 0) {
                speed = Math.ceil(speed)
            } else {
                speed = Math.floor(speed)
            }
            if (speed === 0) {
                clearInterval(timer)
            } else {
                moveItem.style.top = moveItem.offsetTop + speed + 'px'
            }
        }, 1000 / 60)
    }

    function clickMoveAction(e: MouseEvent) {
        const item = get('.item')!

        const x = e.clientX
        const y = e.clientY

        const startX = item.offsetLeft
        const startY = item.offsetTop

        const dx = x - startX
        const dy = y - startY

        const speedX = 5
        const speedY = 5
        // clickMoveInXWithStableSpeed(item, dx, Math.abs(dx / duration / 30), timerX)
        // clickMoveInYWithStableSpeed(item, dy, Math.abs(dy / duration / 30), timerY)

        clickMoveInXWithChangedSpeed(item, x, clickInfo.timerX)
        clickMoveInYWithChangedSpeed(item, y, clickInfo.timerY)
    }

    function clickToMoveEnabled() {
        window.addEventListener('click', clickMoveAction)
    }
    function clickToMoveDisabled() {
        window.removeEventListener('click', clickMoveAction)
    }

    function refreshUI(order: string) {
        const buttons = getAll('button')
        const p = get('p')
        if (buttons.length < 1 || !p) { return }
        const t1 = '根据鼠标点击位置移动'
        const t2 = '根据鼠标轨迹移动'
        const p1 = '鼠标点击页面， 人物将移动至鼠标位置！'
        const p2 = '按住鼠标左键，在页面划动，人物将按照鼠标轨迹移动。'
        switch (order) {
            case 'first':
                buttons[0].textContent = t1 + '（已激活）'
                buttons[1].textContent = t2
                p.textContent = p1
                break
            case 'second':
                buttons[0].textContent = t1
                buttons[1].textContent = t2 + '（已激活）'
                p.textContent = p2
                break
            default:
                break
        }
    }

    main()
}