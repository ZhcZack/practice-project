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
        let dx = 0
        let dy = 0
        item.addEventListener('mousedown', mousedown)

        function mousedown(e: MouseEvent) {
            dx = e.clientX - item.offsetLeft
            dy = e.clientY - item.offsetTop

            let temp = document.createElement('div')
            temp.classList.add('item-clone', 'item')
            temp.style.left = window.getComputedStyle(item)["left"]
            temp.style.top = window.getComputedStyle(item)["top"]
            temp.style.zIndex = String(temp.style.zIndex! + 1)
            document.body.appendChild(temp)

            document.addEventListener('mousemove', mousemove)

            function mousemove(e: MouseEvent) {
                temp.style.left = e.clientX - dx + 'px'
                temp.style.top = e.clientY - dy + 'px'
                e.stopPropagation()
            }

            document.addEventListener('mouseup', mouseup)

            function mouseup(e: MouseEvent) {
                document.removeEventListener('mousemove', mousemove)
                document.removeEventListener('mouseup', mouseup)

                item.style.left = temp.style.left
                item.style.top = temp.style.top
                item.style.zIndex = temp.style.zIndex
                document.body.removeChild(temp)
            }
            e.stopPropagation()
        }
    }

}