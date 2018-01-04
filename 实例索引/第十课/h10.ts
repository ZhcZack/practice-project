namespace h10 {
    const get = (sel: string): HTMLElement | null => document.querySelector(sel)
    const getAll = (sel: string): NodeListOf<HTMLElement> => document.querySelectorAll(sel)
    const log = console.log.bind(console)

    window.addEventListener('load', main)
    function main() {
        var s = new Slide('#container')
        window.addEventListener('click', () => {
            s.slideNextMove()
        })
    }

    class Slide {
        private item: HTMLElement | null
        private slides: NodeListOf<HTMLElement>
        private numberOfMovingSlides: number
        private movingSlides: number[]
        private movingModeEnabled: boolean

        constructor(private id: string) {
            this.setup()
        }

        private setup() {
            this.item = get(this.id)
            this.slides = getAll(this.id + '>div')
            this.numberOfMovingSlides = 5 // hard code, const
            this.movingSlides = []
            this.movingModeEnabled = false

            this.firstGalance()
        }

        // set first five slides' css style
        private firstGalance() {
            this.clearSlideStyle()
        }

        private clearSlideStyle() {
            // init all slides' css style
            const ss = this.slides
            for (let i = 0; i < ss.length; i++) {
                ss[i].className = 'item'
                switch (i) {
                    case 0:
                        ss[0].classList.add('left-far')
                        break
                    case 1:
                        ss[1].classList.add('middle-left')
                        break
                    case 2:
                        ss[2].classList.add('middle')
                        break
                    case 3:
                        ss[3].classList.add('middle-right')
                        break
                    case 4:
                        ss[4].classList.add('right-far')
                        break
                    default:
                        ss[i].classList.add('others')
                }
            }
        }

        // update `slides` property to latest value, because of DOM action
        private updateSlides() {
            this.slides = getAll(this.id + '>div')
        }

        // clear every slides' moving timer so that moving is unique(?)
        private clearMovingSlides() {
            this.movingSlides.forEach(s => {
                clearInterval(s)
            })
            this.movingSlides = []
        }

        slideNextMove() {
            this.clearMovingSlides()
            if (!this.item || this.slides.length < 1) { return }
            const _first = this.slides[0]
            this.item.appendChild(_first)
            this.updateSlides()
            this.clearSlideStyle()
        }

        slidePrevMove() {
            this.clearMovingSlides()
            if (!this.item || this.slides.length < 1) { return }
            const _first = this.slides[0]
            const _last = this.slides[this.slides.length - 1]
            this.item.insertBefore(_last, _first)
            this.updateSlides()
            this.clearSlideStyle()
        }
    }
}