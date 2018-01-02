namespace c6 {
    const get = (sel: string): HTMLElement | null => document.querySelector(sel)
    const getAll = (sel: string): NodeListOf<HTMLElement> => document.querySelectorAll(sel)
    const log = console.log.bind(console)

    function main() {
        customRightMenu()
    }

    function customRightMenu() {
        const menu = get('#rightMenu')
        if (!menu) {
            return
        }
        window.addEventListener('contextmenu', e => {
            // log(e)
            menu.style.display = 'block'
            menu.style.left = e.clientX + 'px'
            menu.style.top = e.clientY + 'px'
            e.preventDefault()
        })
        window.addEventListener('click', e => {
            const menu = get('#rightMenu')
            if (menu) {
                menu.style.display = 'none'
            }
        })
        menuEvents()
        ckeckRightArrow()
    }

    function menuEvents() {
        const menu = get('#rightMenu')
        if (!menu) { return }
        menu.addEventListener('click', e => {
            e.stopPropagation()
        })
    }

    function ckeckRightArrow() {
        const uls = document.querySelectorAll('#rightMenu > ul ul') as NodeListOf<HTMLUListElement>
        if (uls.length < 1) { return }
        for (let i = 0; i < uls.length; i++) {
            const element = uls[i]
            element.parentElement!.classList.add('right-arrow')
        }
        rightArrowEvents()
    }

    function rightArrowEvents() {
        const arrows = document.querySelectorAll('.right-arrow') as NodeListOf<HTMLLIElement>
        for (let i = 0; i < arrows.length; i++) {
            const element = arrows[i]
            element.addEventListener('mouseover', e => {
                // 在鼠标移入下一级菜单时让父级菜单保持显示
                element.parentElement!.style.display = 'block'

                const children = element.parentElement!.children
                const num = children.length
                for (let j = 0; j < num; j++) {
                    if (children[j].querySelector('ul')) {
                        children[j].querySelector('ul')!.style.display = 'none'
                    }
                }
                const child = element.querySelector('ul')!
                const style = element.getBoundingClientRect()
                child.style.display = 'block'
                child.style.left = style.width + 'px'
                child.style.top = '0'

                e.stopPropagation()
            })
            element.addEventListener('mouseout', e => {
                element.querySelector('ul')!.style.display = 'none'
                e.stopPropagation()
            })
        }
    }

    main()
}