namespace b8 {
    window.addEventListener('load', e => {
        main()
    })

    const get = (sel: string): HTMLElement | null => document.querySelector(sel)
    const getAll = (sel: string): NodeListOf<HTMLElement> => document.querySelectorAll(sel)
    const log = console.log.bind(console)

    function main() {
        const items = getAll('.item')
        if (items.length < 1) { return }
        dragAndDrop(items[0])
        dragAndDrop(items[1])
        setup(items)
    }

    function setup(items: NodeListOf<HTMLElement>) {
        items[0].style.left = '50px'
        items[1].style.left = '200px'
    }

    function dragAndDrop(item: HTMLElement) {
        let isDrag = false
        let dx = 0
        let dy = 0
        let clone: HTMLElement | null = null
        item.addEventListener('mousedown', e => {
            log('hello')
            isDrag = true
            dx = e.clientX - item.offsetLeft
            dy = e.clientY - item.offsetTop
            clone = item.cloneNode() as HTMLElement
            clone.classList.add('item-clone')
            item.insertAdjacentElement('afterend', clone)
            e.stopPropagation()
        })
        item.addEventListener('mouseup', e => {
            log('hi')
            isDrag = false
            if (!clone) { return }
            const index = item.style.zIndex ? parseInt(item.style.zIndex) : 0
            log(`index: ${index}`)
            item.style.left = clone.offsetLeft + 'px'
            item.style.top = clone.offsetTop + 'px'
            item.style.zIndex = index + 1 + ''
            clone.parentNode!.removeChild(clone)
            e.stopPropagation()
        })
        window.addEventListener('mousemove', e => {
            if (!clone || !isDrag) {
                return
            }
            clone.style.left = e.clientX - dx + 'px'
            clone.style.top = e.clientY - dy + 'px'
        })

    }
}