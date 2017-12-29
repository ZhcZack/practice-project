namespace e3 {
    function main() {
        let times = 0
        const button = document.querySelector('button')
        if (button === null) {
            return
        }
        window.addEventListener('load', function (e) {
            button.textContent = '' + times
        })

        button.addEventListener('click', function (e) {
            times++
            this.textContent = '' + times
            alert(times)
        })
    }

    main()

}