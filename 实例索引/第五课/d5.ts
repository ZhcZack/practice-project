namespace d5 {
    function main() {
        document.addEventListener('contextmenu', displayCustomMenu)
        events()
    }

    function displayCustomMenu(e: MouseEvent) {
        const menu = document.querySelector('#menu') as HTMLElement
        if (!menu) {
            return
        }
        const x = e.clientX
        const y = e.clientY

        menu.style.display = 'block'
        menu.style.left = x + 'px'
        menu.style.top = y + 'px'

        e.preventDefault()
    }

    function hideCustomMenu(menu: HTMLElement) {
        menu.style.display = 'none'
    }

    function events() {
        const lis = document.querySelectorAll('#menu li') as NodeListOf<HTMLLIElement>
        for (let i = 0; i < lis.length; i++) {
            lis[i].addEventListener('click', e => {
                const parent = lis[i].parentNode as HTMLElement | null
                if (parent) {
                    hideCustomMenu(parent)
                }
            })
        }
    }

    main()

}