namespace c4 {
    const get = (sel: string): HTMLElement | null => {
        return document.querySelector(sel)
    }
    const getAll = (sel: string): NodeListOf<HTMLElement> => {
        return document.querySelectorAll(sel)
    }
    const log = console.log.bind(console)

    const main = () => {
        const subnav = getAll('.subnav')
        const nav = get('.nav')
        const lis = getAll('.nav > ul > li')
        let timer = 0
        let s: HTMLElement | null

        if (subnav.length === 0 || !nav || lis.length === 0) {
            return
        }

        for (let i = 0; i < lis.length; i++) {
            lis[i].addEventListener('mouseover', e => {
                for (let j = 0; j < subnav.length; j++) {
                    subnav[j].style.display = 'none'
                }
                s = lis[i].querySelector('.subnav')
                if (s) {
                    s.style.display = 'block'
                    // log('nav width: ' + nav.offsetWidth + 'offsetLeft: ' + this.offsetLeft + 'offsetWidth: ' + s.offsetWidth)
                    if (nav.offsetWidth <= lis[i].offsetLeft + s.offsetWidth) {
                        s.style.right = '0'
                    } else {
                        s.style.left = lis[i].offsetLeft + 'px'
                    }
                    clearTimeout(timer)
                }

            })
            lis[i].addEventListener('mouseout', e => {
                s = lis[i].querySelector('.subnav')
                // log('out, s: ' + s)
                timer = setTimeout(function () {
                    if (s) {
                        s.style.display = 'none'
                    }
                }, 300)
            })
        }
    }

    main()
}