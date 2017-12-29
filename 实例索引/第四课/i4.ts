namespace i4 {
    const get = (sel: string): HTMLElement | null => document.querySelector(sel)
    const getAll = (sel: string): NodeListOf<HTMLElement> => document.querySelectorAll(sel)
    const log = console.log.bind(console)

    function main() {
        slideImage()
    }

    function slideImage() {
        const display = get('.display')
        const images = getAll('.imgList img') as NodeListOf<HTMLImageElement>
        const navs = getAll('.nav li') as NodeListOf<HTMLLIElement>
        let timer = 0
        var index = {
            i: 0
        }

        if (!display || images.length === 0 || navs.length === 0) {
            return
        }

        showActive(index, display, images, navs)
        timer = setTimer(index, display, images, navs)
        bind(index, display, images, navs, timer)
    }

    function bind(index: { i: number }, display: HTMLElement, images: NodeListOf<HTMLImageElement>, navs: NodeListOf<HTMLLIElement>, timer: number) {
        for (let j = 0; j < navs.length; j++) {
            navs[j].addEventListener('mouseover', e => {
                let i = Number(navs[j].textContent) - 1
                index.i = i
                showActive(index, display, images, navs)
                clearInterval(timer)
            })
        }

        display.addEventListener('mouseover', function (e) {
            clearInterval(timer)
        })
        display.addEventListener('mouseout', function (e) {
            timer = setTimer(index, display, images, navs)
        })

    }

    function showActive(index: { i: number }, display: HTMLElement, images: NodeListOf<HTMLImageElement>, navs: NodeListOf<HTMLLIElement>) {
        display.setAttribute('src', images[index.i].src)
        for (let i = 0; i < navs.length; i++) {
            navs[i].classList.remove('active')
        }
        navs[index.i].classList.add('active')
    }

    function setTimer(index: { i: number }, display: HTMLElement, images: NodeListOf<HTMLImageElement>, navs: NodeListOf<HTMLLIElement>) {
        let rightDirection = true
        let timer = setInterval(function () {
            if (rightDirection) {
                index.i++
            } else {
                index.i--
            }
            showActive(index, display, images, navs)
            animation(display)
            if (index.i === 4) {
                rightDirection = false
            }
            if (index.i === 0) {
                rightDirection = true
            }
        }, 2000)
        return timer
    }

    function animation(display: HTMLElement) {
        let o = 0
        display.style.opacity = '' + o
        let t = setInterval(function () {
            o += 2
            if (o > 100) {
                o = 100
            }
            display.style.opacity = '' + o / 100
            if (o === 100) {
                clearInterval(t)
            }
        }, 1000 / 50)
    }

    main()

}