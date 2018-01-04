namespace k10 {
    const get = (sel: string): HTMLElement | null => document.querySelector(sel)
    const getAll = (sel: string): NodeListOf<HTMLElement> => document.querySelectorAll(sel)
    const log = console.log.bind(console)

    window.addEventListener('load', main)

    interface Data {
        [propName: string]: number
    }

    function main() {
        const data = [
            { width: 20, height: 20 },
            { width: 80, height: 80 },
            { left: 10 }, { left: 408 },
            { opacity: 100 },
            { opacity: 0 },
            { opacity: 100 },
            { width: 80, height: 80, left: 408 },
            { top: 10 },
            { width: 20, height: 20, left: 468 },
            { top: 70 },
            { left: 10 },
            { top: 10 },
            { left: 468 },
            { width: 20, height: 20, left: 468 },
            { width: 80, height: 80, left: 408 }
        ]
        let order = true
        let index = 0
        const span = get('span')
        const input = get('input') as HTMLInputElement

        if (!span || !input) { return }

        const obj = new Animation(span, data[index])

        input.addEventListener('click', () => {
            input.disabled = true
            obj.callback = begin
            function begin(obj: Animation) {
                if (order) {
                    index++
                } else {
                    index--
                }
                if (index === data.length || index < 0) {
                    clearInterval(obj.timer)
                    order = !order
                    input.value = order ? "\u5f00\u59cb" : "\u539f\u8def\u8fd4\u56de"
                    input.disabled = false
                    return
                }
                // 垃圾代码
                log(data[index])
                obj.options = data[index]
                obj.timer = setInterval(() => {
                    obj.move()
                }, 1000 / 60)
            }
            begin(obj)
        })
    }

    class Animation {
        timer: number

        constructor(private element: HTMLElement, public options: Data, public callback?: (animation: Animation) => void) {
            this.init()
        }

        private init() {
            clearInterval(this.timer)
            this.timer = setInterval(() => {
                this.move()
            }, 1000 / 60)
        }

        private css(attr: string, value?: number): number {
            if (arguments.length === 1) {
                var style = window.getComputedStyle(this.element)
                return parseFloat(style[attr as any])
            } else if (arguments.length === 2) {
                if (attr === 'opacity') {
                    this.element.style.opacity = value! / 100 + ''
                } else {
                    this.element.style[attr as any] = value + 'px'
                }
            }
            return 0
        }

        move() {
            if (!this.callback) {
                clearInterval(this.timer)
                return
            }
            let complete = false
            for (let p in this.options) {
                complete = false
                let value = 0
                if (p === 'opacity') {
                    value = parseInt(Number(this.css(p).toFixed(2)) * 100 + '')
                } else {
                    value = this.css(p)
                }
                let speed = (this.options[p] - value) / 5
                if (speed > 0) {
                    speed = Math.ceil(speed)
                } else {
                    speed = Math.floor(speed)
                }
                this.css(p, value + speed)
                if (this.options[p] === value) {
                    complete = true
                }
                // log('hi')
            }
            if (complete) {
                clearInterval(this.timer)
                if (this.callback) {
                    this.callback(this)
                }
            }
        }
    }
}