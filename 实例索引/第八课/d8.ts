namespace d8 {
    const get = (sel: string): HTMLElement | null => document.querySelector(sel)
    const getAll = (sel: string): NodeListOf<HTMLElement> => document.querySelectorAll(sel)
    const log = console.log.bind(console)

    interface Timer {
        barMoveTimer: number
        listMoveTimer: number
        autoplayer: number
    }

    const TIMER: Timer = {
        barMoveTimer: 0,
        listMoveTimer: 0,
        autoplayer: 0, // 滚动条两端使用
    }

    window.addEventListener('load', e => {
        main()
    })

    function barMove(target: number, obj: HTMLElement) {
        clearTimeout(TIMER.barMoveTimer)
        TIMER.barMoveTimer = setInterval(function () {
            let left = obj.style.left ? parseInt(obj.style.left, 10) : 0
            let speed = (target - left) / 10
            if (speed > 0) {
                speed = Math.ceil(speed)
            } else {
                speed = Math.floor(speed)
            }
            if (speed === 0) {
                clearInterval(TIMER.barMoveTimer)
                toggleBarStatus()
            }
            obj.style.left = left + speed + 'px'
        }, 1000 / 60)
    }

    function listMove(target: number, obj: HTMLElement) {
        clearTimeout(TIMER.listMoveTimer)
        TIMER.listMoveTimer = setInterval(function () {
            let left = obj.style.left ? parseInt(obj.style.left, 10) : 0
            let speed = (-target - left) / 10
            if (speed >= 0) {
                speed = Math.ceil(speed)
            } else {
                speed = Math.floor(speed)
            }
            if (speed === 0) {
                clearInterval(TIMER.listMoveTimer)
                toggleBarStatus()
            }
            obj.style.left = left + speed + 'px'
        }, 1000 / 60)
    }

    function moveTogether(barTarget: number, bar: HTMLElement | null, listTarget: number, list: HTMLElement) {
        if (bar) {
            barMove(barTarget, bar)
        }
        if (list) {
            listMove(listTarget, list)
        }
    }

    function main() {
        initSize()
        barActions()
        keyboardActions()
        mouseWheelActions()
    }

    function toggleBarStatus() {
        const bm = get('.bar .bar-middle')
        const bms = get('.bar .bar-middle .bar-middle-slider')
        const bl = get('.bar .bar-left')
        const br = get('.bar .bar-right')

        if (!bm || !bms || !bl || !br) {
            return
        }
        const diff = bms.offsetLeft - bm.offsetLeft
        const barScrollLength = bm.offsetWidth - bms.offsetWidth

        if (diff <= 0) {
            bl.classList.add('end')
            br.classList.remove('end')
        } else if (diff >= barScrollLength) {
            br.classList.add('end')
            bl.classList.remove('end')
        } else {
            bl.classList.remove('end')
            br.classList.remove('end')
        }
    }

    function mouseWheelActions() {
        const container = get('.imglist-container')
        const list = get('.imglist')
        const bm = get('.bar .bar-middle')
        const bms = get('.bar .bar-middle .bar-middle-slider')

        if (!container || !list || !bm || !bms) {
            return
        }

        const barScrollLength = bm.offsetWidth - bms.offsetWidth
        const listScrollLength = getImgListLength() - container.offsetWidth
        const mul = parseInt(listScrollLength / barScrollLength + '', 10)
        const speed = 20

        container.addEventListener('wheel', function (e) {
            var y = e.deltaY
            log(y)
            if (y < 0) {
                var diff = bms.offsetLeft - bm.offsetLeft
                var target = diff - speed
                if (target <= 0) {
                    target = 0
                }
                // log('diff: ' + diff + ', speed: ' + speed + ', target: ' + target)
                moveTogether(target, bms, target * mul, list)
            } else {
                var diff = bms.offsetLeft - bm.offsetLeft
                var target = diff + speed
                // log('diff: ' + diff + ', speed: ' + speed + ', target: ' + target)
                if (target >= barScrollLength) {
                    moveTogether(barScrollLength, bms, listScrollLength, list)
                } else {
                    moveTogether(target, bms, target * mul, list)
                }
            }

        })
    }

    function keyboardActions() {
        const container = get('.imglist-container')
        const list = get('.imglist')
        const bm = get('.bar .bar-middle')
        const bms = get('.bar .bar-middle .bar-middle-slider')

        if (!container || !list || !bm || !bms) {
            return
        }

        const barScrollLength = bm.offsetWidth - bms.offsetWidth
        const listScrollLength = getImgListLength() - container.offsetWidth
        const mul = parseInt(listScrollLength / barScrollLength + '', 10)

        const speed = 20

        window.addEventListener('keydown', e => {
            const key = e.key
            let diff = 0
            let target = 0
            switch (key) {
                case 'ArrowLeft':
                    diff = bms.offsetLeft - bm.offsetLeft
                    target = diff - speed
                    if (target <= 0) {
                        target = 0
                    }
                    // log('diff: ' + diff + ', speed: ' + speed + ', target: ' + target)
                    moveTogether(target, bms, target * mul, list)
                    break
                case 'ArrowRight':
                    diff = bms.offsetLeft - bm.offsetLeft
                    target = diff + speed
                    // log('diff: ' + diff + ', speed: ' + speed + ', target: ' + target)
                    if (target >= barScrollLength) {
                        moveTogether(barScrollLength, bms, listScrollLength, list)
                    } else {
                        moveTogether(target, bms, target * mul, list)
                    }
                    break
                default:
                    break
            }
        })
    }

    function barActions() {
        const container = get('.imglist-container')
        const list = get('.imglist')
        const bar = get('.bar')
        const bm = get('.bar .bar-middle')
        const bms = get('.bar .bar-middle .bar-middle-slider')
        const bl = get('.bar .bar-left')
        const br = get('.bar .bar-right')

        if (!container || !list || !bar || !bm || !bms || !bl || !br) {
            return
        }

        let isSliding = false
        let dx = 0
        const maxL = bm.offsetWidth - bms.offsetWidth

        const barScrollLength = bm.offsetWidth - bms.offsetWidth
        const listScrollLength = getImgListLength() - container.offsetWidth
        const mul = parseInt(listScrollLength / barScrollLength + '', 10)

        bl.addEventListener('mouseover', e => {
            TIMER.autoplayer = setInterval(() => {
                let diff = bms.offsetLeft - bm.offsetLeft
                let speed = 2
                let target = diff - speed
                if (target <= 0) {
                    target = 0
                }
                bms.style.left = target + 'px'
                list.style.left = -mul * target + 'px'
                if (target <= 0) {
                    clearInterval(TIMER.autoplayer)
                }
                toggleBarStatus()
            }, 1000 / 60)
        })
        bl.addEventListener('mouseout', e => {
            clearInterval(TIMER.autoplayer)
        })
        br.addEventListener('mouseover', e => {
            bl.classList.remove('end')
            TIMER.autoplayer = setInterval(() => {
                let diff = bms.offsetLeft - bm.offsetLeft
                let speed = 2
                let target = diff + speed
                // log('diff: ' + diff + ', speed: ' + speed + ', target: ' + target)
                if (target >= barScrollLength) {
                    bms.style.left = barScrollLength + 'px'
                    list.style.left = -listScrollLength + 'px'
                    clearInterval(TIMER.autoplayer)
                    br.classList.add('end')
                } else {
                    bms.style.left = target + 'px'
                    list.style.left = -mul * target + 'px'
                }
                toggleBarStatus()
            }, 1000 / 60)
        })
        br.addEventListener('mouseout', e => {
            clearInterval(TIMER.autoplayer)
        })

        bms.addEventListener('mousedown', e => {
            isSliding = true
            dx = e.clientX - bms.offsetLeft
            // this.setCapture()
            e.stopPropagation()
        })
        bms.addEventListener('mouseup', e => {
            isSliding = false

            let l = e.clientX - dx
            if (l < 0) {
                l = 0
            } else if (l > maxL) {
                l = maxL
            }
            if (l >= maxL) {
                moveTogether(0, null, listScrollLength, list)
            } else {
                moveTogether(0, null, l * mul, list)
            }

            // this.releaseCapture()
            e.stopPropagation()
        })
        bms.addEventListener('mousemove', e => {
            if (!isSliding) {
                return
            }
            let l = e.clientX - dx
            if (l < 0) {
                l = 0
            } else if (l > maxL) {
                l = maxL
            }
            bms.style.left = l + 'px'
            toggleBarStatus()
            e.stopPropagation()
        })
        bms.addEventListener('click', e => {
            e.stopPropagation()
        })
        bm.addEventListener('click', e => {
            let x = e.clientX
            let diff = x - bm.offsetLeft
            if (diff >= maxL) {
                moveTogether(maxL, bms, listScrollLength, list)
            } else if (diff <= bms.offsetWidth / 2) {
                moveTogether(0, bms, 0, list)
            } else {
                moveTogether(diff, bms, diff * mul, list)
            }
            e.stopPropagation()
        })
    }

    function initSize() {
        const imglist = get('.imglist')
        if (!imglist) {
            return
        }
        const length = getImgListLength()
        imglist.style.width = length + 'px'
    }

    function getImgListLength(): number {
        const imglist = get('.imglist')
        const lis = getAll('.imglist li')
        if (!imglist || lis.length < 1) {
            return 0
        }
        const padding = 10
        let length = 0
        for (var i = 0; i < lis.length; i++) {
            length += (lis[i].offsetWidth + padding)
        }
        return length
    }

}