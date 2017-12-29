namespace d4 {
    const get = (sel: string): HTMLElement | null => document.querySelector(sel)
    const getAll = (sel: string): NodeListOf<HTMLElement> => document.querySelectorAll(sel)
    const log = console.log.bind(console)

    function main() {
        bind()
    }

    function bind() {
        const buttons = getAll('button')
        addHandler(buttons[1], 'click', function () {
            buttons[0].textContent = '我可以点击了'
            addHandler(buttons[0], 'click', clickHandler)
        })
        addHandler(buttons[2], 'click', function () {
            buttons[0].textContent = '毫无用处的按钮'
            removeHandler(buttons[0], 'click', clickHandler)
        })
    }

    function addHandler(obj: HTMLElement, event: string, handler: (e: Event) => void) {
        obj.addEventListener(event, handler)
    }
    function removeHandler(obj: HTMLElement, event: string, handler: (e: Event) => void) {
        obj.removeEventListener(event, handler)
    }

    function clickHandler(e: Event) {
        alert('我可以点击了！')
    }

    main()

}