namespace d10 {
    const get = (sel: string): HTMLElement | null => document.querySelector(sel)
    const getAll = (sel: string): NodeListOf<HTMLElement> => document.querySelectorAll(sel)
    const log = console.log.bind(console)

    interface ImageInfo {
        top: number
        bottom: number
        load: boolean
    }

    // first try to use MVC in code

    // this is the M?

    /**
     * rely `images` property stored in object to represent images' loading status
     *
     * images:
     *  top: distance between image's top border to window's top edge
     *  bottom: distance between image's bottom border to window's top edge
     *  load: boolean value represent if image should be loaded
     */
    class LazyLoadImage {
        private numberOfImages: number
        private images: ImageInfo[]
        constructor(private id: string) {
            this.setup()
        }

        private setup() {
            const imgs = getAll(this.id + ' img')
            if (imgs.length < 1) { return }
            this.numberOfImages = imgs.length
            this.images = []
            const scrollTop = document.documentElement.scrollTop
            for (let i = 0; i < this.numberOfImages; i++) {
                const rect = imgs[i].getBoundingClientRect()
                this.images.push({
                    top: rect.top + scrollTop,
                    bottom: rect.bottom + scrollTop,
                    load: false,
                })
            }
        }

        private load() {
            const scrollTop = document.documentElement.scrollTop
            const height = window.innerHeight

            for (let i = 0; i < this.images.length; i++) {
                const img = this.images[i]
                if (img.top > scrollTop && img.bottom < scrollTop + height) {
                    img.load = true
                }
            }
        }

        // computed property
        // return value is an `Array`, represents each img's status--should load or should not load
        tobeLoad(): boolean[] {
            this.load()
            const result = []
            let imagesAllLoaded = true
            for (var i = 0; i < this.images.length; i++) {
                imagesAllLoaded = this.images[i].load
                result.push(this.images[i].load)
            }
            return result
        }
    }

    window.addEventListener('load', main)

    const loader = new LazyLoadImage('.imglist')

    function main() {
        startUp()
        window.addEventListener('scroll', refreshImageStatus)
    }

    // some method like `viewDidLoad` is iOS
    function startUp() {
        const imgs = getAll('.imglist img') as NodeListOf<HTMLImageElement>
        if (imgs.length < 1) { return }
        const baseHref = 'http://www.fgm.cc/learn/lesson10/img/lazy/'
        const lazyHref = baseHref + 'loading.gif'
        const result = loader.tobeLoad()

        for (let i = 0; i < imgs.length; i++) {
            imgs[i].src = lazyHref
        }
        refreshImageStatus()
    }

    function refreshImageStatus() {
        const baseHref = 'http://www.fgm.cc/learn/lesson10/img/lazy/'
        const imgs = getAll('.imglist img') as NodeListOf<HTMLImageElement>
        if (imgs.length < 1) { return }
        const result = loader.tobeLoad()

        for (let i = 0; i < result.length; i++) {
            if (!imgs[i].classList.contains('loaded') && result[i]) {
                // img should load
                imgs[i].src = baseHref + (i + 1) + '.jpg'
                imgs[i].classList.add('loaded')
            }
        }
    }
}