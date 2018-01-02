namespace a8 {
    const get = (sel: string): HTMLElement | null => document.querySelector(sel)
    const getAll = (sel: string): NodeListOf<HTMLElement> => document.querySelectorAll(sel)
    const log = console.log.bind(console)

    interface Timer {
        indexTimer: number
        moveTimer: number
    }

    interface Info {
        leftToRight: boolean
        timer: Timer
        index: number
    }

    function main() {
        slideImage()
    }

    function slideImage() {
        const container = get('.container')
        const images = get('.imgList')
        const navs = getAll('.nav li')

        if (!container || !images || !navs) {
            return
        }

        const info: Info = {
            leftToRight: true,
            timer: {
                moveTimer: 0,
                indexTimer: 0,
            },
            index: 0,
        }
        for (let i = 0; i < navs.length; i++) {
            navs[i].addEventListener('mouseover', e => {
                stopAutoplay(info)
                const j = Number(navs[i].textContent) - 1
                info.index = j
                indexActive(info)
                slideMove(images, info)
                e.stopPropagation()
            })
            navs[i].addEventListener('mouseout', e => {
                const j = Number(navs[i].textContent) - 1
                info.index = j
                startAutoplay(images, info)
                e.stopPropagation()
            })
        }

        container.addEventListener('mouseover', e => {
            stopAutoplay(info)
        })
        container.addEventListener('mouseout', e => {
            startAutoplay(images, info)
        })

        startAutoplay(images, info)
    }

    function indexActive(info: Info) {
        const navs = getAll('.nav li')
        for (let i = 0; i < navs.length; i++) {
            navs[i].classList.remove('active')
        }
        navs[info.index].classList.add('active')
    }

    function slideMove(obj: HTMLElement, info: Info) {
        clearInterval(info.timer.moveTimer)
        info.timer.moveTimer = setInterval(() => {
            const lis = getAll('.imgList li')
            let target = -(lis[info.index].offsetHeight * info.index)
            let speed = (target - obj.offsetTop) / 10
            if (speed > 0) {
                speed = Math.ceil(speed)
            } else {
                speed = Math.floor(speed)
            }
            if (speed === 0) {
                clearInterval(info.timer.moveTimer)
            } else {
                obj.style.top = obj.offsetTop + speed + 'px'
            }
        }, 1000 / 60)
    }

    function startAutoplay(obj: HTMLElement, info: Info) {
        indexActive(info)
        info.timer.indexTimer = setInterval(function () {
            if (info.leftToRight) {
                info.index++
            } else {
                info.index--
            }
            if (info.index === 4) {
                info.leftToRight = false
            } else if (info.index === 0) {
                info.leftToRight = true
            }
            indexActive(info)
            slideMove(obj, info)
        }, 2000)
    }

    function stopAutoplay(info: Info) {
        clearInterval(info.timer.indexTimer)
    }

    main()

}