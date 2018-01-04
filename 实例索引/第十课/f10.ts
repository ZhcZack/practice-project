namespace f10 {
    const get = (sel: string): HTMLElement | null => document.querySelector(sel)
    const getAll = (sel: string): NodeListOf<HTMLElement> => document.querySelectorAll(sel)
    const log = console.log.bind(console)

    window.addEventListener('load', main)

    function main() {
        var slide = new SmoothySlide('.list')
        const prev = get('.prev')
        const next = get('.next')
        if (!prev || !next) { return }
        prev.addEventListener('click', () => {
            if (!slide.isSliding) {
                slide.prevMove()
            }
        })
        next.addEventListener('click', () => {
            if (!slide.isSliding) {
                slide.nextMove()
            }
        })
    }

    class SmoothySlide {
        private list: HTMLElement | null
        private slides: NodeListOf<HTMLElement>
        private timer: number
        isSliding: boolean

        constructor(private id: string) {
            this.setup()
        }

        private setup() {
            this.list = get(this.id)
            this.slides = getAll(this.id + ' > li')

            // properties
            this.timer = 0
            this.isSliding = false
        }

        private updateSlidesProperty() {
            this.slides = getAll(this.id + ' > li')
        }

        // target: stop position
        // distance: start position
        private move(stopPosition: number, startPosition: number, callback?: () => void) {
            if (!this.list) { return }
            this.timer = setInterval(() => {
                let speed = (stopPosition - startPosition) / 10
                if (speed > 0) {
                    speed = Math.ceil(speed)
                } else {
                    speed = Math.floor(speed)
                }
                this.list!.style.top = this.list!.offsetTop + speed + 'px'
                startPosition += speed
                if (speed === 0) {
                    clearInterval(this.timer)
                    this.isSliding = false
                    if (callback) {
                        callback()
                    }
                }
            }, 1000 / 60)
        }

        // three steps
        // 1: move last item to first place
        // 2: set list's position to hide first item, css 'left' or 'top' property maybe negative
        // 3: make first item 'slide in', css 'left' or 'top' should be zero
        prevMove() {
            if (!this.list || this.slides.length < 1) { return }
            this.isSliding = true
            // portrait moving, should change css property 'top'
            const first = this.slides[0]
            const last = this.slides[this.slides.length - 1]
            const h = last.offsetHeight

            this.list.insertBefore(last, first)
            this.updateSlidesProperty()
            this.list.style.top = -1 * h + 'px'

            this.move(0, -1 * h)
        }

        // three steps
        // 1: slide to show next item, the next item maybe in the right or bottom, 
        // so css property 'left' or 'top' should be negative
        // 2: move first item to last place
        // 3: set list's position to 'origin', means css 'left' or 'top' property should be zero
        // tips: 2, 3 steps should be in 1 step's callback method
        nextMove() {
            if (!this.list || this.slides.length < 1) { return }
            this.isSliding = true
            // portrait moving, should change css property 'top'
            const first = this.slides[0]
            const last = this.slides[this.slides.length - 1]
            const h = first.offsetHeight

            const back = () => {
                this.list!.appendChild(first)
                this.updateSlidesProperty()
                this.list!.style.top = '0'
            }
            this.move(-1 * h, 0, back)
        }
    }
}