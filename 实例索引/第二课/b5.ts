namespace b5 {
    function main() {
        const input = document.querySelector('input')
        const button = document.querySelector('button')
        const result = document.querySelector('#result') as HTMLElement

        if (input === null || button === null || result === null) {
            return
        }
        input.addEventListener('keyup', e => {
            const key = e.key
            const v = input.value.split('')
            if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ','].indexOf(key) === -1) {
                v.pop()
                input.value = v.join('')
            }
        })

        button.addEventListener('click', function (e) {
            const value = input.value
            const nums = value.split(',')
            let sum = 0
            nums.forEach(function (num) {
                sum += Number(num)
            })
            result.textContent = String(sum)
        })

    }
    main()
}