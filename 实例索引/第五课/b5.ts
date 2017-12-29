namespace b5 {
    const get = (sel: string): HTMLElement | null => document.querySelector(sel)
    const getAll = (sel: string): NodeListOf<HTMLElement> => document.querySelectorAll(sel)
    const log = console.log.bind(console)

    function main() {
        const select = get('#search .name')
        if (select) {
            selectActions(select)
        }
    }

    function selectActions(s: HTMLElement) {
        const list = get('#list')
        if (!list) {
            return
        }
        s.addEventListener('click', e => {
            if (s.classList.contains('list')) {
                toggleSelect(s)
                hideList(list)
            } else {
                const rect = s.getBoundingClientRect()
                const w = rect.width
                const y = rect.height
                toggleSelect(s)
                showList(list, w, y)
            }
        })
    }

    function toggleSelect(select: HTMLElement) {
        select.classList.toggle('list')
    }

    function hideList(l: HTMLElement) {
        l.style.display = 'none'
    }

    function showList(l: HTMLElement, w: number, y: number) {
        l.style.display = 'block'
        l.style.width = w + 'px'
        l.style.left = '0'
        l.style.top = y + 'px'

        if (l.dataset.bind !== 'true') {
            listActions(l)
        }

    }

    function listActions(l: HTMLElement) {
        const lis = getAll('#list li')
        const select = get('#search .name')
        if (!select || lis.length < 1) {
            return
        }
        for (let i = 0; i < lis.length; i++) {
            lis[i].addEventListener('click', e => {
                const text = lis[i].textContent
                if (text) {
                    select.textContent = text
                    toggleSelect(select)
                    hideList(l)
                }
            })
        }
        l.dataset.bind = 'true'
    }

    main()

}