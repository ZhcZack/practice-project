namespace c3 {
    function __main() {
        const inputs = document.querySelectorAll('input')
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener('keyup', e => {
                inputs[i].value = inputs[i].value.replace(/[^0-9]/, '')
            })
        }

        const result = document.querySelector('.result')
        const button = document.querySelector('button')
        if (button === null || result === null) {
            return
        }
        button.addEventListener('click', function (e) {
            var v1 = parseInt(inputs[0].value, 10)
            var v2 = parseInt(inputs[1].value, 10)
            result.textContent = String(v1 + v2)
        })
    }

    __main()

}