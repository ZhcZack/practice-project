namespace h3 {
    function main() {
        let times = 0
        const p = document.querySelector('p')

        if (p === null) {
            return
        }

        window.addEventListener('load', function (e) {
            p.textContent = '' + times
        })

        setInterval(function () {
            times++
            p.textContent = '' + times
        }, 1000)
    }

    main()

}