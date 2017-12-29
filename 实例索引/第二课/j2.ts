namespace j2 {
    function main() {
        const imgs = document.querySelectorAll('.imglist img') as NodeListOf<HTMLImageElement>
        const main = document.querySelector('.main img') as HTMLImageElement

        for (let i = 0; i < imgs.length; i++) {
            imgs[i].addEventListener('mouseover', e => {
                const link = imgs[i].src
                main.src = link.replace(/small/, 'big')
            })
        }
    }
    main()
}