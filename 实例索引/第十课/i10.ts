namespace i10 {
    const get = (sel: string): HTMLElement | null => document.querySelector(sel)
    const getAll = (sel: string): NodeListOf<HTMLElement> => document.querySelectorAll(sel)
    const log = console.log.bind(console)

    window.addEventListener('load', main)

    function main() {
        const slide = new SlideImage('.container')
    }

    class SlideImage {
        private container: HTMLElement | null
        private images: HTMLElement | null
        private navs: NodeListOf<HTMLElement>
        private indexTimer: number
        private moveTimer: number
        private index: number
        private leftToRight: boolean

        constructor(private identifier: string) {
            this.setup()
        }

        // manually start slide move
        private start() {
            this.setup()
        }

        // initial values
        private setup() {
            this.container = get(this.identifier)
            this.images = get(this.identifier + ' .imgList')
            this.navs = getAll(this.identifier + ' .nav li')
            this.indexTimer = 0
            this.moveTimer = 0
            this.index = 0
            this.leftToRight = true

            this.initEvents()

            this.startAutoplay()
        }

        private initEvents() {
            if (!this.container || this.navs.length < 1) { return }
            const self = this
            this.container.addEventListener('mouseover', containerMouseoverEvent)
            this.container.addEventListener('mouseout', containerMouseoutEvent)

            for (let i = 0; i < this.navs.length; i++) {
                this.navs[i].addEventListener('mouseover', navMouseoverEvent)
                this.navs[i].addEventListener('mouseout', navMouseoutEvent)
            }

            function containerMouseoverEvent(this: HTMLElement, e: MouseEvent) {
                self.stopAutoplay()
                e.stopPropagation()
            }

            function containerMouseoutEvent(this: HTMLElement, e: MouseEvent) {
                self.startAutoplay()
            }

            function navMouseoverEvent(this: HTMLElement, e: MouseEvent) {
                self.stopAutoplay()
                const i = Number(this.textContent) - 1
                self.index = i
                self.indexActive()
                self.slideMove()
                e.stopPropagation()
            }

            function navMouseoutEvent(this: HTMLElement, e: MouseEvent) {
                const i = Number(this.textContent) - 1
                self.index = i
                self.startAutoplay()
                e.stopPropagation()
            }
        }

        // check which one is current slide page and set its index 'active'
        private indexActive() {
            for (let i = 0; i < this.navs.length; i++) {
                this.navs[i].classList.remove('active')
            }
            this.navs[this.index].classList.add('active')
        }

        // image list moving method
        private slideMove() {
            const obj = this.images
            if (!obj) { return }
            clearInterval(this.moveTimer)
            this.moveTimer = setInterval(() => {
                const lis = getAll(this.identifier + ' .imgList li')
                var target = -(lis[this.index].offsetHeight * this.index)
                var speed = (target - obj.offsetTop) / 10
                if (speed > 0) {
                    speed = Math.ceil(speed)
                } else {
                    speed = Math.floor(speed)
                }
                if (speed === 0) {
                    clearInterval(this.moveTimer)
                } else {
                    obj.style.top = obj.offsetTop + speed + 'px'
                }
            }, 1000 / 60)
        }

        private startAutoplay() {
            this.indexActive()
            this.indexTimer = setInterval(() => {
                if (this.leftToRight) {
                    this.index++
                } else {
                    this.index--
                }
                if (this.index === 4) {
                    this.leftToRight = false
                } else if (this.index === 0) {
                    this.leftToRight = true
                }
                this.indexActive()
                this.slideMove()
            }, 2000)
        }

        private stopAutoplay() {
            clearInterval(this.indexTimer)
        }
    }
}