namespace c8 {
    window.addEventListener('load', function () {
        __main()
    })

    const get = (sel: string): HTMLElement | null => document.querySelector(sel)
    const getAll = (sel: string): NodeListOf<HTMLElement> => document.querySelectorAll(sel)
    const log = console.log.bind(console)

    class Draggable {
        // identifier: string
        private element: HTMLElement | null
        constructor(private identifier: string) {
            this.identifier = identifier

            this.setup()
        }

        private setup() {
            this.element = get(this.identifier)
            if (!this.element) { return }
            this.element.setAttribute('draggable', 'true')
            this.dragEvents()
        }

        private dragEvents() {
            if (!this.element) { return }
            this.element.addEventListener('dragstart', e => {
                e.dataTransfer.dropEffect = 'move'
            })
            this.element.addEventListener('dragend', e => {
                log(e.dataTransfer.dropEffect)
            })
        }
    }

    class Droppable {
        private element: HTMLElement | null
        constructor(private identifier: string) {
            this.identifier = identifier
            this.setup()
        }
        private setup() {
            this.element = get(this.identifier)
            if (!this.element) { return }
            this.dropEvents()
        }
        private dropEvents() {
            if (!this.element) { return }
            this.element.addEventListener('dragover', e => {
                e.stopPropagation()
                e.dataTransfer.dropEffect = 'move'
            })
            this.element.addEventListener('drop', e => {
                e.stopPropagation()
            })
        }
    }

    function main() {
        const drag = new Draggable('.drag')
    }

    function __main() {
        const drag = get('.drag')
        if (!drag) { return }
        dragAndDrop(drag)
        titleButtonActions()
        resizeActions()
    }

    function resizeActions() {
        let isResizing = false
        const drag = get('.drag')
        const top = get('.resize-top')
        if (!drag || !top) { return }
        let startX = 0
        let startY = 0
        const minWidth = 400
        const maxWidth = window.innerWidth
        const minHeight = drag.offsetHeight
        const maxHeight = window.innerHeight

        // TODO: 这里是我想多了
        top.addEventListener('mousedown', e => {
            isResizing = true
            startY = e.clientY
            // top.setCapture()
            e.stopPropagation()
        })
        top.addEventListener('mouseup', e => {
            isResizing = false
            // this.releaseCapture()
            e.stopPropagation()
        })
        top.addEventListener('mouseout', e => {
            isResizing = false
            e.stopPropagation()
        })
        top.addEventListener('mousemove', e => {
            if (!isResizing) {
                return
            }
            const diff = e.clientY - startY
            startY = e.clientY
            if (diff > 0) {
                if (drag.offsetHeight <= minHeight) {
                    drag.style.height = minHeight + 'px'
                } else {
                    drag.style.height = drag.offsetHeight - diff + 'px'
                    drag.style.top = drag.offsetTop + diff + 'px'
                }
            } else {
                if (drag.offsetHeight >= maxHeight) {
                    drag.style.height = maxHeight + 'px'
                } else {
                    drag.style.height = drag.offsetHeight - diff + 'px'
                    drag.style.top = drag.offsetTop + diff + 'px'
                }
            }
        })
    }

    function titleButtonActions() {
        const drag = get('.drag')
        const buttons = getAll('.title-buttons span')
        if (!drag || buttons.length < 1) { return }
        const minsize = buttons[0]
        const maxsize = buttons[1]
        const close = buttons[2]
        let t: HTMLElement
        let dragInMaxSize = false

        minsize.addEventListener('click', e => {
            t = document.createElement('div')
            t.classList.add('min')
            document.body.appendChild(t)
            drag.style.display = 'none'

            t.addEventListener('click', e => {
                t.parentElement!.removeChild(t)
                drag.style.display = 'block'
                e.stopPropagation()
            })
            e.stopPropagation()
        })

        maxsize.addEventListener('click', e => {
            if (dragInMaxSize) {
                drag.style.width = '400px'
                drag.style.height = 'auto'
                drag.style.top = '100px'
                drag.style.left = '100px'
                dragInMaxSize = false
            } else {
                drag.style.width = window.innerWidth + 'px'
                drag.style.height = window.innerHeight + 'px'
                drag.style.left = '0'
                drag.style.top = '0'
                dragInMaxSize = true
            }
            e.stopPropagation()
        })

        close.addEventListener('click', e => {
            t = document.createElement('div')
            t.classList.add('min')
            document.body.appendChild(t)
            drag.style.display = 'none'

            t.addEventListener('click', e => {
                t.parentElement!.removeChild(t)
                drag.style.display = 'block'
                e.stopPropagation()
            })
            e.stopPropagation()

        })
    }

    function dragAndDrop(item: HTMLElement) {
        let isDrag = false
        let dx = 0
        let dy = 0
        item.addEventListener('mousedown', function (e) {
            isDrag = true
            dx = e.clientX - this.offsetLeft
            dy = e.clientY - this.offsetTop
            // this.setCapture()
        })
        item.addEventListener('mouseup', function (e) {
            isDrag = false
            // this.releaseCapture()
            e.stopPropagation()
        })
        item.addEventListener('mousemove', function (e) {
            if (!isDrag) {
                return
            }
            this.style.left = e.clientX - dx + 'px'
            this.style.top = e.clientY - dy + 'px'
            dragWithLimits()
        })
    }

    function dragWithLimits() {
        const drag = get('.drag')
        if (!drag) { return }
        if (drag.offsetLeft <= 0) {
            drag.style.left = '0'
        } else if (drag.offsetLeft + drag.offsetWidth >= window.innerWidth) {
            drag.style.left = window.innerWidth - drag.offsetWidth + 'px'
        }

        if (drag.offsetTop <= 0) {
            drag.style.top = '0'
        } else if (drag.offsetTop + drag.offsetHeight >= window.innerHeight) {
            drag.style.top = window.innerHeight - drag.offsetHeight + 'px'
        }
    }
}