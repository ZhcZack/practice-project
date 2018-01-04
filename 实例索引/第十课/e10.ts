namespace e10 {
    const get = (sel: string): HTMLElement | null => document.querySelector(sel)
    const getAll = (sel: string): NodeListOf<HTMLElement> => document.querySelectorAll(sel)
    const log = console.log.bind(console)

    window.addEventListener('load', main)

    function main() {
        const item = new DragItem('#drag')
        const buttons = getAll('.buttons button')
        const areaLock = buttons[0]
        const xLock = buttons[1]
        const yLock = buttons[2]
        const locationLock = buttons[3]
        const status = get('.drag-status')

        if (buttons.length < 1 || !status) { return }

        item.onStart = () => {
            status.textContent = '开始拖拽'
        }
        item.onStop = () => {
            status.textContent = '结束拖拽'
        }
        item.onMove = () => {
            const p = item.position()
            if (p) {
                status.textContent = 'x: ' + p.x + ', y: ' + p.y
            }
        }

        areaLock.addEventListener('click', () => {
            item.areaLock = !item.areaLock
            areaLock.textContent = item.areaLock ? '取消锁定范围' : '锁定范围'
        })
        xLock.addEventListener('click', () => {
            item.xLock = !item.xLock
            xLock.textContent = item.xLock ? '取消水平锁定' : '水平锁定'
        })
        yLock.addEventListener('click', () => {
            item.yLock = !item.yLock
            yLock.textContent = item.yLock ? '取消垂直锁定' : '垂直锁定'
        })
        locationLock.addEventListener('click', () => {
            item.locationLock = !item.locationLock
            locationLock.textContent = item.locationLock ? '取消锁定位置' : '锁定位置'
        })

    }

    class DragItem {
        private item: HTMLElement | null
        private titleItem: HTMLElement | null
        // properties
        private dragEnabled: boolean
        private startX: number
        private startY: number
        areaLock: boolean
        xLock: boolean
        yLock: boolean
        locationLock: boolean
        // callback methods
        onStart: (() => void) | null
        onMove: (() => void) | null
        onStop: (() => void) | null

        constructor(private id: string) {
            this.setup()
        }

        private setup() {
            this.item = get(this.id)
            this.titleItem = get(this.id + ' .drag-title')

            // properties
            this.dragEnabled = false
            this.startX = 0
            this.startY = 0
            this.areaLock = false
            this.xLock = false
            this.yLock = false
            this.locationLock = false

            // callback methods
            this.onStart = null
            this.onMove = null
            this.onStop = null

            // mouse events
            this.mouseEvents()
        }

        private mouseEvents() {
            if (!this.titleItem) { return }
            const self = this
            this.titleItem.addEventListener('mousedown', mousedownEvent)
            this.titleItem.addEventListener('mouseup', mouseupEvent)
            this.titleItem.addEventListener('mousemove', mousemoveEvent)

            function mousedownEvent(this: HTMLElement, e: MouseEvent) {
                if (!self.item) { return }
                self.item.style.position = 'absolute'
                self.dragEnabled = true
                self.startX = e.clientX
                self.startY = e.clientY
                e.stopPropagation()

                if (self.onStart) {
                    self.onStart()
                }
            }

            function mouseupEvent(this: HTMLElement, e: MouseEvent) {
                self.dragEnabled = false
                e.stopPropagation()

                if (self.onStop) {
                    self.onStop()
                }
            }

            function mousemoveEvent(this: HTMLElement, e: MouseEvent) {
                if (!self.dragEnabled || !self.item) {
                    return
                }
                var dx = e.clientX - self.startX
                var dy = e.clientY - self.startY
                self.startX = e.clientX
                self.startY = e.clientY

                if (self.xLock) {
                    self.css(self.item, 'top', self.css(self.item, 'top') + dy)
                } else if (self.yLock) {
                    self.css(self.item, 'left', self.css(self.item, 'left') + dx)
                } else if (self.locationLock) {
                    // do nothing
                } else {
                    self.css(self.item, 'left', self.css(self.item, 'left') + dx)
                    self.css(self.item, 'top', self.css(self.item, 'top') + dy)
                }
                if (self.areaLock) {
                    self.moveWithLimits()
                }

                e.stopPropagation()

                if (self.onMove) {
                    self.onMove()
                }
            }

        }

        // css function
        private css(obj: HTMLElement, attr: string, value?: number): number {
            if (arguments.length === 2) {
                const style = window.getComputedStyle(obj)
                let value = 0
                if (attr === 'opacity') {
                    value = parseInt(Number(parseFloat(style.opacity!).toFixed(2)) * 100 + '', 10)
                } else {
                    value = parseInt(style[attr as any], 10)
                }
                return value
            } else if (arguments.length === 3) {
                if (attr === 'opacity') {
                    obj.style.opacity = value! / 100 + ''
                } else {
                    obj.style[attr as any] = value + 'px'
                }
            }
            return 0
        }

        // when 'areaLock' is true, item's moving should be with limits
        private moveWithLimits() {
            const maxWidth = window.innerWidth
            const maxHeight = window.innerHeight
            if (!this.item) { return }
            if (this.css(this.item, 'left') <= 0) {
                this.css(this.item, 'left', 0)
            } else if (this.css(this.item, 'left') + this.css(this.item, 'width') >= maxWidth) {
                this.css(this.item, 'left', maxWidth - this.css(this.item, 'width'))
            }
            if (this.css(this.item, 'top') <= 0) {
                this.css(this.item, 'top', 0)
            } else if (this.css(this.item, 'top') + this.css(this.item, 'height') >= maxHeight) {
                this.css(this.item, 'top', maxHeight - this.css(this.item, 'height'))
            }
        }

        // this is a computed property
        position() {
            if (!this.dragEnabled || !this.item) {
                return
            }
            const p = {
                x: this.css(this.item, 'left'),
                y: this.css(this.item, 'top'),
            }
            return p
        }
    }

}