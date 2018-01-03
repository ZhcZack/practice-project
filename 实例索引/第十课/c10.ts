namespace c10 {
    const get = (sel: string): HTMLElement | null => document.querySelector(sel)
    const getAll = (sel: string): NodeListOf<HTMLElement> => document.querySelectorAll(sel)
    const log = console.log.bind(console)

    window.addEventListener('load', main)

    function main() {
        const s = new YXS('.list')
        const next = get('.next')
        const prev = get('.prev')

        if (!next || !prev) {
            return
        }

        next.addEventListener('click', e => {
            s.slideNextMove()
        })
        prev.addEventListener('click', e => {
            s.slidePrevMove()
        })
    }

    interface YXSStyle {
        middle: YXSElementStyle
        middleLeft: YXSElementStyle
        leftFar: YXSElementStyle
        leftBehind: YXSElementStyle
        middleRight: YXSElementStyle
        rightFar: YXSElementStyle
        rightBehind: YXSElementStyle
        others: YXSElementStyle
    }

    interface YXSElementStyle {
        width: number
        height: number
        top: number
        left: number
        'z-index': number
        [propNumber: number]: number
    }

    class YXS {
        private item: HTMLElement | null
        private slides: NodeListOf<HTMLElement>
        private numberOfMovingSlides: number
        private movingSlides: AnimationItem[]
        private movingModeEnabled: boolean
        private movingDuration: number
        private styles: YXSStyle

        constructor(private id: string) {
            this.setup()
        }

        private setup() {
            this.item = get(this.id)
            this.slides = getAll(this.id + '>li')
            this.numberOfMovingSlides = 7 // hard code, const
            this.movingSlides = []
            this.movingModeEnabled = false
            this.movingDuration = 1000 // millseconds
            this.styles = {
                middle: {
                    width: 224,
                    height: 288,
                    top: 0,
                    left: 262,
                    'z-index': 4,
                },
                middleLeft: {
                    width: 170,
                    height: 218,
                    top: 37,
                    left: 110,
                    'z-index': 3,
                },
                leftFar: {
                    width: 130,
                    height: 170,
                    top: 61,
                    left: 0,
                    'z-index': 2,
                },
                leftBehind: {
                    width: 124,
                    height: 154,
                    top: 71,
                    left: 134,
                    'z-index': 1,
                },
                middleRight: {
                    width: 170,
                    height: 218,
                    top: 37,
                    left: 468,
                    'z-index': 3,
                },
                rightFar: {
                    width: 130,
                    height: 170,
                    top: 61,
                    left: 620,
                    'z-index': 2,
                },
                rightBehind: {
                    width: 124,
                    height: 154,
                    top: 71,
                    left: 496,
                    'z-index': 1,
                },
                others: {
                    width: 0,
                    height: 0,
                    top: 37,
                    left: 377,
                    'z-index': 1,
                }
            }

            this.firstGalance()
        }

        // set first five slides' css style
        // 初始化slides的样式
        private firstGalance() {
            if (this.slides.length < 1) { return }
            this.clearSlideStyle()

            const ss = this.slides
            const leftBehind = ss[0]
            const leftFar = ss[1]
            const middleLeft = ss[2]
            const middle = ss[3]
            const middleRight = ss[4]
            const rightFar = ss[5]
            const rightBehind = ss[6]

            this.setStyle(leftBehind, this.styles.leftBehind)
            this.setStyle(leftFar, this.styles.leftFar)
            this.setStyle(middleLeft, this.styles.middleLeft)
            this.setStyle(middle, this.styles.middle)
            this.setStyle(middleRight, this.styles.middleRight)
            this.setStyle(rightFar, this.styles.rightFar)
            this.setStyle(rightBehind, this.styles.rightBehind)
        }

        private clearSlideStyle() {
            // init all slides' css style
            for (let i = 0; i < this.slides.length; i++) {
                if (i < this.numberOfMovingSlides - 1) {
                    this.slides[i].style.display = 'block'
                } else {
                    this.slides[i].style.display = 'none'
                    this.setStyle(this.slides[i], {
                        width: this.styles.others.width,
                        height: this.styles.others.height,
                        left: this.styles.others.left,
                        top: this.styles.others.top,
                        'z-index': 1,
                    })

                }
            }
        }

        private setStyle(obj: HTMLElement, options: YXSElementStyle) {
            // little hack for 'z-index' property
            for (let p in options) {
                if (options.hasOwnProperty(p)) {
                    if (p === 'z-index' || p === 'zIndex') {
                        obj.style[p] = options[p] + ''
                    } else {
                        obj.style[p] = options[p] + 'px'
                    }
                }
            }
        }

        // update `slides` property to latest value, because of DOM action
        private updateSlides() {
            this.slides = getAll(this.id + '>li')
        }

        // clear every slides' moving timer so that moving is unique(?)
        // 在下一次动画开始前清空每个动画元素的timer，避免动画冲突
        private clearMovingSlides() {
            this.movingSlides.forEach(function (s) {
                clearInterval(s.timer)
            })
            this.movingSlides = []
        }

        slideNextMove() {
            if (!this.item || this.slides.length < 1) { return }

            this.clearMovingSlides()
            this.movingModeEnabled = true
            const _first = this.slides[0]
            this.item.appendChild(_first)
            this.updateSlides()
            this.clearSlideStyle()

            const ss = this.slides
            const leftFar = new AnimationItem(ss[0], this.styles.leftBehind)
            const middleLeft = new AnimationItem(ss[1], this.styles.leftFar)
            const middle = new AnimationItem(ss[2], this.styles.middleLeft)
            const middleRight = new AnimationItem(ss[3], this.styles.middle)
            const rightFar = new AnimationItem(ss[4], this.styles.middleRight)
            const rightBehind = new AnimationItem(ss[5], this.styles.rightFar)
            const newer = new AnimationItem(ss[6], this.styles.rightBehind)

            this.movingSlides.push(leftFar)
            this.movingSlides.push(middleLeft)
            this.movingSlides.push(middle)
            this.movingSlides.push(middleRight)
            this.movingSlides.push(rightFar)
            this.movingSlides.push(rightBehind)
            this.movingSlides.push(newer)
        }

        slidePrevMove() {
            if (!this.item || this.slides.length < 1) { return }
            this.clearMovingSlides()
            this.movingModeEnabled = true
            const _first = this.slides[0]
            const _last = this.slides[this.slides.length - 1]
            this.item.insertBefore(_last, _first)
            this.updateSlides()
            this.clearSlideStyle()

            const ss = this.slides
            const newer = new AnimationItem(ss[0], this.styles.leftBehind)
            const leftBehind = new AnimationItem(ss[1], this.styles.leftFar)
            const leftFar = new AnimationItem(ss[2], this.styles.middleLeft)
            const middleLeft = new AnimationItem(ss[3], this.styles.middle)
            const middle = new AnimationItem(ss[4], this.styles.middleRight)
            const middleRight = new AnimationItem(ss[5], this.styles.rightFar)
            const rightFar = new AnimationItem(ss[6], this.styles.rightBehind)

            this.movingSlides.push(newer)
            this.movingSlides.push(leftBehind)
            this.movingSlides.push(leftFar)
            this.movingSlides.push(middleLeft)
            this.movingSlides.push(middle)
            this.movingSlides.push(middleRight)
            this.movingSlides.push(rightFar)

        }
    }

    class AnimationItem {
        timer: number

        constructor(private item: HTMLElement, private options: YXSElementStyle, private callback?: () => void) {
            this.setup()
        }

        private setup() {
            this.timer = 0
            this.start()
        }

        private start() {
            clearInterval(this.timer)
            this.timer = setInterval(() => {
                this.move()
            }, 1000 / 60)
        }

        private css(attr: string, value?: number): number | undefined {
            if (arguments.length === 1) {
                const style = window.getComputedStyle(this.item)
                return parseFloat(style[attr as any])
            } else if (arguments.length === 2) {
                if (attr === 'opacity') {
                    this.item.style.opacity = value! / 100 + ''
                } else if (attr === 'z-index' || attr === 'zIndex') {
                    this.item.style[attr as any] = value + ''
                } else {
                    this.item.style[attr as any] = value + 'px'
                }
            }
            return
        }

        private move() {
            let complete = false
            for (let p in this.options) {
                if (p === 'z-index' || p === 'zIndex') {
                    this.item.style.zIndex = this.options[p] + ''
                    continue
                }
                complete = false
                let value = 0
                if (p === 'opacity') {
                    const num = this.css(p) as number
                    value = parseInt(Number(num.toFixed(2)) * 100 + '')
                } else {
                    value = this.css(p) as number
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
                // log('over')
                if (this.callback) {
                    this.callback()
                }
            }
        }
    }
}