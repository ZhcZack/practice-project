namespace b6 {
    const get = (sel: string): HTMLElement | null => document.querySelector(sel)
    const getAll = (sel: string): NodeListOf<HTMLElement> => document.querySelectorAll(sel)
    const log = console.log.bind(console)

    interface DragInfo {
        title: HTMLElement
        drag: HTMLElement
        content: HTMLElement
        playback: HTMLElement
        dragEnabled: boolean
        isInPlaybackMode: boolean
        diffX: number
        diffY: number
        points: [number, number][]
    }

    function dragInformation(): DragInfo | null {
        const title = get('#drag .title')
        const drag = get('#drag')
        const content = get('#drag .content')
        const playback = get('#drag .title span')
        const points: [number, number][] = []

        if (!title || !drag || !content || !playback) {
            return null
        }

        return {
            title: title,
            drag: drag,
            content: content,
            playback: playback,
            dragEnabled: false,
            isInPlaybackMode: false,
            diffX: 0,
            diffY: 0,
            points: points
        }
    }

    function updateStatus(content: HTMLElement, dragInfo: boolean, dragElement: HTMLElement) {
        content.innerHTML = 'Drag: <span>' + dragInfo + '</span><br><br>offsetTop: <span>' +
            dragElement.offsetTop + '</span><br><br>offsetLeft: <span>' +
            dragElement.offsetLeft + '</span>'
    }

    function updatePoints(points: [number, number][], newPoint: [number, number]) {
        points.push(newPoint)
    }

    function moveWithLimits(x: number, y: number, dx: number, dy: number, dragElement: HTMLElement) {
        const d = dragElement
        if (x - dx <= 0) {
            d.style.left = '0'
        } else if (d.offsetWidth + d.offsetLeft >= window.innerWidth) {
            d.style.left = window.innerWidth - d.offsetWidth + 'px'
        }

        if (y - dy <= 0) {
            d.style.top = '0'
        } else if (d.offsetHeight + d.offsetTop >= window.innerHeight) {
            d.style.top = window.innerHeight - d.offsetHeight + 'px'
        }

    }

    function dragEvents(info: DragInfo) {
        const title = info.title
        const content = info.content
        const points = info.points
        const d = info.drag
        title.addEventListener('mousedown', e => {
            if (info.isInPlaybackMode) {
                return
            }
            info.dragEnabled = true
            const x = e.clientX
            const y = e.clientY
            info.diffX = x - d.offsetLeft
            info.diffY = y - d.offsetTop
            // title.setCapture()
            updatePoints(points, [x, y])
            e.stopPropagation()
        })
        title.addEventListener('mouseup', e => {
            if (info.isInPlaybackMode) {
                return
            }
            const x = e.clientX
            const y = e.clientY
            info.dragEnabled = false
            // this.releaseCapture()
            e.stopPropagation()
            updateStatus(content, info.dragEnabled, d)
        })
        window.addEventListener('mousemove', e => {
            if (!info.dragEnabled) {
                return
            }
            const x = e.clientX
            const y = e.clientY
            d.style.left = x - info.diffX + 'px'
            d.style.top = y - info.diffY + 'px'

            moveWithLimits(x, y, info.diffX, info.diffY, d)

            updateStatus(content, info.dragEnabled, d)
            updatePoints(info.points, [x, y])
        })
    }

    function playbackEvents(info: DragInfo) {
        const playback = info.playback
        const points = info.points
        const d = info.drag
        const content = info.content
        playback.addEventListener('mousedown', function (e) {
            let timer = setInterval(function () {
                info.isInPlaybackMode = true
                const p = points.pop()
                let x = 0
                let y = 0
                if (p) {
                    x = p[0]
                    y = p[1]
                }

                d.style.left = x - info.diffX + 'px'
                d.style.top = y - info.diffY + 'px'

                moveWithLimits(x, y, info.diffX, info.diffY, d)
                updateStatus(content, info.dragEnabled, d)
                if (points.length === 0) {
                    clearInterval(timer)
                    info.isInPlaybackMode = false
                }
            }, 1000 / 60)
            e.stopPropagation()
        })
        playback.addEventListener('mouseup', function (e) {
            e.stopPropagation()
        })

    }

    function main() {
        const info = dragInformation()
        if (info) {
            updateStatus(info.content, info.dragEnabled, info.drag)
            dragEvents(info)
            playbackEvents(info)
        }
    }

    main()

}