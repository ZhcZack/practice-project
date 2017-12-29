namespace f4 {
    const get = (sel: string): HTMLElement | null => document.querySelector(sel)
    const getAll = (sel: string): NodeListOf<HTMLElement> => document.querySelectorAll(sel)
    const log = console.log.bind(console)

    function main() {
        bind()
    }

    function bind() {
        const inputs = getAll('.login-area input')
        for (let i = 0; i < inputs.length - 1; i++) {
            inputs[i].addEventListener('focus', e => {
                inputs[i].classList.add('active')
            })
            inputs[i].addEventListener('blur', e => {
                inputs[i].classList.remove('active')
            })
        }
    }

    main()

}