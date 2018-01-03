namespace a9 {
    window.addEventListener('load', () => {
        main()
    })

    const get = (sel: string): HTMLElement | null => document.querySelector(sel)
    const getAll = (sel: string): NodeListOf<HTMLElement> => document.querySelectorAll(sel)
    const log = console.log.bind(console)

    function main() {
        const menu = get('.menu')
        const imgs = getAll('.menu img')
        const ws: number[] = []

        if (!menu || !imgs) {
            return
        }

        for (let i = 0; i < imgs.length; i++) {
            ws.push(imgs[i].offsetWidth * 2)
        }

        menu.addEventListener('mousemove', e => {
            for (let i = 0; i < imgs.length; i++) {
                const a = e.clientX - imgs[i].offsetLeft - imgs[i].offsetWidth / 2
                const b = e.clientY - imgs[i].offsetTop - menu.offsetTop - imgs[i].offsetHeight / 2
                let scale = 1 - Math.sqrt(a * a + b * b) / 300
                if (scale < 0.5) {
                    scale = 0.5
                }
                imgs[i].style.width = ws[i] * scale + 'px'
            }
        })
    }

}