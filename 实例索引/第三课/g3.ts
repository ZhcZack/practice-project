namespace g3 {
    function main() {
        const inputs = document.querySelectorAll('input')
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener('keyup', e => {
                inputs[i].value = inputs[i].value.replace(/[^0-9]/, '')
            })
        }

        const result = document.querySelector('.result')
        const button = document.querySelector('button')

        if (result === null || button === null) {
            return
        }
        button.addEventListener('click', function (e) {
            const v1 = parseInt(inputs[0].value, 10)
            const v2 = parseInt(inputs[1].value, 10)
            result.textContent = v1 >= v2 ? '' + v1 : '' + v2
        })

    }

    main()

}