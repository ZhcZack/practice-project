namespace e5 {
    const get = (sel: string): HTMLElement | null => document.querySelector(sel)
    const getAll = (sel: string): NodeListOf<HTMLElement> => document.querySelectorAll(sel)
    const log = console.log.bind(console)

    function main() {
        const list = getAll('#imglist li img') as NodeListOf<HTMLImageElement>
        if (list.length < 1) {
            return
        }
        listActions(list)
    }

    function listActions(list: NodeListOf<HTMLImageElement>) {
        const b = get('#big')
        if (!b) {
            return
        }
        for (let i = 0; i < list.length; i++) {
            list[i].addEventListener('mouseover', e => {
                const href = list[i].src.replace(/\.jpg/, '_big.jpg')
                const x = e.clientX
                const y = e.clientY
                showBigImage(b, x, y, href)
            })
            list[i].addEventListener('mousemove', e => {
                const x = e.clientX
                const y = e.clientY
                showBigImage(b, x, y)

            })
            list[i].addEventListener('mouseout', e => {
                hideBigImage(b)
            })

        }
    }

    function setBigImageHref(image: HTMLElement, href: string) {
        const img = image.querySelector('img')
        if (img) {
            img.setAttribute('src', href)
        }
    }

    function showBigImage(image: HTMLElement, x: number, y: number, href?: string) {
        if (href) {
            setBigImageHref(image, href)
        }
        image.style.display = 'block'
        var w = image.offsetWidth
        if (w + x <= window.innerWidth) {
            image.style.left = x + 20 + 'px'
        } else {
            image.style.left = x - w - 10 + 'px'
        }
        image.style.top = y + 20 + 'px'
    }

    function hideBigImage(image: HTMLElement) {
        image.style.display = 'none'
    }

    main()

}