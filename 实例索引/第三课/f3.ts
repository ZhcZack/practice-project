namespace f3 {
    function main() {
        const log = console.log.bind(console)
        const ops = document.querySelectorAll('.operation')
        const opts = document.querySelectorAll('.operator')
        const input = document.querySelector('.input') as HTMLInputElement

        let nums: number[] = []
        let result: number = 0
        let operator: (a: number, b: number) => number
        let isInput = true
        let isCalcDone = false

        if (input === null) {
            return
        }

        for (let i = 0; i < ops.length; i++) {
            ops[i].addEventListener('click', e => {
                const value = input.value
                const v = ops[i].textContent
                if (isInput) {
                    if (v === '.') {
                        var index = value.indexOf('.')
                        if (index !== -1) {
                            return
                        }
                    }
                    input.value = value + v
                } else {
                    isInput = true
                    if (v) {
                        input.value = v
                    }
                }
            })
        }

        for (let i = 0; i < opts.length; i++) {
            opts[i].addEventListener('click', e => {
                const value = input.value
                const v = opts[i].textContent

                isInput = false
                nums.push(Number(value))
                switch (v) {
                    case 'C':
                        nums.pop()
                        clear()
                        break
                    case '=':
                        isCalcDone = true
                        calc()
                        break
                    case '+':
                        calc()
                        operator = function (a, b) {
                            return a + b
                        }
                        break
                    case '-':
                        calc()
                        operator = function (a, b) {
                            return a - b
                        }
                        break
                    case '×':
                        calc()
                        operator = function (a, b) {
                            return a * b
                        }
                        break
                    case '÷':
                        calc()
                        operator = function (a, b) {
                            return a / b
                        }
                        break
                    case '%':
                        calc()
                        operator = function (a, b) {
                            return a % b
                        }
                        break
                    default:
                        break
                }
            })
        }

        function clear() {
            input.value = ''
            operator = (a, b) => 0
            nums = []
        }

        function calc() {
            if (nums.length < 2) {
                return
            }
            result = operator(nums[0], nums[1])
            nums.splice(0, 2)
            nums.unshift(result)

            input.value = '' + result

            if (isCalcDone) {
                operator = (a, b) => 0
                nums = []
                isCalcDone = false
            }
        }

    }
    main()
}