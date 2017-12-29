namespace a5 {
    function main() {
        const d = document.querySelector('#div') as HTMLElement
        d.addEventListener('click', twinkle)
    }

    function twinkle(e: MouseEvent) {
        const d = document.querySelector('#div') as HTMLElement
        let times = 0
        let timer = setInterval(function () {
            if (times % 2 === 0) {
                d.style.display = 'none'
            } else {
                d.style.display = 'block'
            }
            times++
            if (times >= 6) {
                clearInterval(timer)
            }
        }, 600 / 6)
    }

    main()

}