namespace c6 {
    const get = (sel: string): HTMLElement | null => document.querySelector(sel)
    const getAll = (sel: string): NodeListOf<HTMLElement> => document.querySelectorAll(sel)
    const log = console.log.bind(console)

    function main() {
        customRightMenu()
    }

    function customRightMenu() {
        const m = get('#rightMenu')
        const lis = getAll('#rightMenu li')
        if (!m || lis.length < 1) {
            return
        }
        let rightArrow = false
        let showTimer = 0
        let hideTimer = 0
        window.addEventListener('contextmenu', e => {
            const x = e.clientX
            const y = e.clientY

            m.style.display = 'block'
            m.style.left = x + 'px'
            m.style.top = y + 'px'

            // right arrow
            if (!rightArrow) {
                for (let i = 0; i < lis.length; i++) {
                    const element = lis[i]
                    if (element.querySelector('ul')) {
                        element.classList.add('right-arrow')
                    }
                }
                rightArrow = true
            }

            // li actions
            for (let i = 0; i < lis.length; i++) {
                const element = lis[i]
                element.addEventListener('mouseover', e => {
                    element.classList.add('current')
                    const ul = element.firstElementChild as HTMLElement
                    if (ul) {
                        clearTimeout(hideTimer)
                        showTimer = setTimeout(() => {
                            for (let i = 0; i < element.parentElement!.children.length; i++) {
                                const ch = element.parentElement!.children[i]
                                if (ch.querySelector('ul')) {
                                    ch.querySelector('ul')!.style.display = 'none'
                                }
                            }
                            ul.style.display = 'block'
                            ul.style.left = element.offsetWidth + 'px'
                            ul.style.top = '0'
                            let maxWidth = 0
                            for (let i = 0; i < ul.children.length; i++) {
                                const l = ul.children[i]
                                const lw = l.clientWidth + parseInt(window.getComputedStyle(l).paddingLeft!, 10)
                                if (lw > maxWidth) {
                                    maxWidth = lw
                                }
                            }
                            ul.style.width = maxWidth + 'px'
                        }, 500)
                    }
                })
                element.addEventListener('mouseout', e => {
                    element.classList.remove('current')
                    clearTimeout(showTimer)
                    hideTimer = setTimeout(() => {
                        for (var i = 0; i < element.parentElement!.children.length; i++) {
                            var ch = element.parentElement!.children[i]
                            if (ch.querySelector('ul')) {
                                ch.querySelector('ul')!.style.display = 'none'
                            }
                        }
                    }, 500)
                    // e.stopPropagation()
                })
                element.addEventListener('click', e => {
                    m.style.display = 'none'
                })
            }
            e.preventDefault()
        })
    }

    main()
}