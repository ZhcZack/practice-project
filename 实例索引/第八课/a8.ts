namespace a8 {
    window.addEventListener('load', function () {
        main()
    })

    const get = (sel: string): HTMLElement => document.querySelector(sel) as HTMLElement
    const log = console.log.bind(console)

    const timer = {
        moveTimer: 0,
    }

    function screenLock() {
        const phone = get('#iphone')
        const lock = get('#lock')
        if (!phone || !lock) { return }
        const img = document.createElement('img')
        img.src = 'http://fgm.cc/iphone/2.jpg'
        img.onload = () => {
            phone.style.background = 'url(' + img.src + ') no-repeat'
            lock.style.display = 'none'
        }
    }

    function move(obj: HTMLElement, distance: number, callback?: () => void) {
        clearTimeout(timer.moveTimer)
        timer.moveTimer = setInterval(function () {
            let speed = (distance - obj.offsetLeft) / 10
            if (speed > 0) {
                speed = Math.ceil(speed)
            } else {
                speed = Math.floor(speed)
            }
            if (0 === speed) {
                clearInterval(timer.moveTimer)
                if (callback) {
                    callback()
                }
            } else {
                obj.style.left = obj.offsetLeft + speed + 'px'
            }
        }, 1000 / 60)
    }

    function slideEvents(slide: HTMLElement) {
        let dx = 0
        let isSliding = false
        const maxL = slide.parentElement!.offsetWidth - slide.offsetWidth

        slide.addEventListener('mousedown', e => {
            isSliding = true
            dx = e.clientX - slide.offsetLeft
            e.stopPropagation()
        })
        slide.addEventListener('mousemove', e => {
            if (!isSliding) {
                return
            }
            let l = e.clientX - dx
            if (l < 0) {
                l = 0
            } else if (l > maxL) {
                l = maxL
            }
            slide.style.left = l + 'px'
            if (l === maxL) {
                screenLock()
            }
            e.stopPropagation()
        })
        slide.addEventListener('mouseup', e => {
            isSliding = false
            if (slide.offsetLeft < maxL / 2) {
                move(slide, 0)
            } else {
                move(slide, maxL, screenLock)
            }
            e.stopPropagation()
        })
    }

    function main() {
        const slide = get('#lock span')
        if (!slide) { return }
        // const phone = get('#iphone')

        slideEvents(slide)
    }
}