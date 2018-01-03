namespace b10 {
    // 需要考虑一下如何解决事件函数的this问题

    const get = (sel: string): HTMLElement | null => document.querySelector(sel)
    const getAll = (sel: string): NodeListOf<HTMLElement> => document.querySelectorAll(sel)
    const log = console.log.bind(console)

    const getIndex = function (obj: HTMLElement) {
        const parent = obj.parentElement
        if (parent) {
            for (let i = 0; i < parent.children.length; i++) {
                if (parent.children[i] === obj) {
                    return i
                }
            }
        }
        return -1 // obj not found
    }

    window.addEventListener('load', main)

    function main() {
        const t = new TAB('.item')
    }

    class TAB {
        private index: number
        private item: HTMLElement | null
        private tab: HTMLElement | null
        private tabList: NodeListOf<HTMLElement>
        private lists: NodeListOf<HTMLElement>
        private navs: NodeListOf<HTMLElement>

        constructor(private id: string) {
            this.setup()
            this.index = 0
        }

        private setup() {
            this.item = get(this.id)
            this.tab = get(this.id + ' .tab ul')
            this.tabList = getAll(this.id + ' .tab ul li')
            this.lists = getAll(this.id + '>.items')
            this.navs = getAll(this.id + ' .tab .switchBtn a')

            this.setupEvents()
        }

        private setupEvents() {
            if (!this.tab || this.tabList.length < 1) { return }
            this.tab.addEventListener('mouseover', e => {
                const target = e.target as HTMLElement
                for (let i = 0; i < this.tabList.length; i++) {
                    this.tabList[i].classList.remove('current')
                }
                target.classList.add('current')
                e.stopPropagation()
            })

            this.navEvents()

        }

        private navEvents() {
            if (this.navs.length < 1) { return }
            const prev = this.navs[0]
            const next = this.navs[1]
            const self = this

            prev.addEventListener('click', prevClick)
            next.addEventListener('click', nextClick)

            function nextClick(this: HTMLElement, e: MouseEvent) {
                if (this.classList.contains('nextNot')) {
                    return
                }
                for (let i = 0; i < self.index; i++) {
                    self.tabList[i].style.display = 'none'
                }
                self.index++
                self.tabList[self.index].style.display = 'block'
                self.switchTab()
                e.stopPropagation()
            }

            function prevClick(this: HTMLElement, e: MouseEvent) {
                if (this.classList.contains('prevNot')) {
                    return
                }
                self.tabList[self.index].style.display = 'block'
                self.index--
                self.tabList[self.index].style.display = 'block'
                self.switchTab()
                e.stopPropagation()
            }
        }

        private switchTab() {
            for (let i = 0; i < this.lists.length; i++) {
                this.lists[i].style.display = 'none'
                this.tabList[i].className = ''
            }
            this.lists[this.index].style.display = 'block'
            this.tabList[this.index].className = 'current'

            this.navs[0].className = this.index === 0 ? 'prevNot' : 'prev'
            this.navs[1].className = this.index === this.tabList.length - 1 ?
                'nextNot' : 'next'
        }
    }
}