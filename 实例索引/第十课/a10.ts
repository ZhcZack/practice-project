namespace a10 {
    const get = (sel: string): HTMLElement | null => document.querySelector(sel)
    const getAll = (sel: string): NodeListOf<HTMLElement> => document.querySelectorAll(sel)
    const log = console.log.bind(console)

    window.addEventListener('load', main)

    function main() {
        const lis = getAll('#nav li')
        const sub = get('#sub')

        if (lis.length < 1 || !sub) {
            return
        }

        for (let i = 0; i < lis.length; i++) {
            const elemnt = lis[i]
            elemnt.addEventListener('mouseover', showSub)
            elemnt.addEventListener('mouseout', hideSub)
        }
        sub.addEventListener('mouseover', showSub)
        sub.addEventListener('mouseout', hideSub)
    }

    function showSub(e: MouseEvent) {
        const sub = get('#sub')
        if (!sub) { return }
        if (!sub.classList.contains('display')) {
            sub.classList.add('display')
        }
        e.stopPropagation()
    }

    function hideSub(e: MouseEvent) {
        const sub = get('#sub')
        if (!sub) { return }
        sub.classList.remove('display')
        e.stopPropagation()
    }
}