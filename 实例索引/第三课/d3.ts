namespace d3 {
    function main() {
        getTime()
        setInterval(function () {
            getTime()
        }, 1000)
    }

    function getTime() {
        const date = new Date()
        const hour = date.getHours()
        const min = date.getMinutes()
        const sec = date.getSeconds()

        format(hour, min, sec)
    }

    function format(h: number, m: number, s: number) {
        const ss = document.querySelectorAll('span')
        const hl = ss[0]
        const ml = ss[1]
        const sl = ss[2]

        hl.textContent = '' + h
        ml.textContent = '' + m
        sl.textContent = s < 10 ? '0' + s : '' + s
    }

    main()

}