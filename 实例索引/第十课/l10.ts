namespace l10 {
    const get = (sel: string): HTMLElement | null => document.querySelector(sel)
    const getAll = (sel: string): NodeListOf<HTMLElement> => document.querySelectorAll(sel)
    const log = console.log.bind(console)

    window.addEventListener('load', main)

    function main() {
        const rows = get('.rows') as HTMLInputElement
        const cols = get('.cols') as HTMLInputElement
        const btn = get('.btn')

        if (!rows || !cols || !btn) { return }

        btn.addEventListener('click', e => {
            let table = get('table')
            if (table) {
                table.parentElement!.removeChild(table)
            }
            const rn = parseInt(rows.value, 10)
            const cn = parseInt(cols.value, 10)
            let tm = new TableMaker(rn, cn, tableCellClick)
            table = tm.make()

            document.body.appendChild(table)

            e.stopPropagation()
        })
    }

    function tableCellClick(number: number, color: string) {
        const msg = get('#msg')
        const ns = get('#msg .number')
        const css = get('#msg .color-square')
        const cs = get('#msg .color')

        if (!msg || !ns || !css || !cs) { return }

        msg.style.display = 'block'
        ns.textContent = number + ''
        css.style.backgroundColor = color
        cs.textContent = color
    }

    class TableMaker {
        private cellWidth: number
        private cellHeight: number
        private minNumber: number
        private maxNumber: number
        private numberColor: string
        private bindTableClick: (this: HTMLElement, event: MouseEvent) => void

        constructor(private rows: number, private cols: number, private clickCallback?: (number: number, color: string) => void) {
            this.setup()
        }
        setup() {
            this.cellWidth = 25
            this.cellHeight = 30
            this.minNumber = 1
            this.maxNumber = 15
            this.numberColor = 'white'
        }

        get randomColor(): string {
            return 'rgb(' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ')'
        }

        get randomNumber(): number {
            return Math.floor(Math.random() * 15 + 1)
        }
        tableClickEvent(e: MouseEvent) {
            const target = e.target as HTMLElement
            if (target.nodeName !== 'TD') {
                return
            }
            // console.log(target)
            // this.clickEventResult.value = Number(target.textContent)
            // this.clickEventResult.color = window.getComputedStyle(target)['background-color']

            const value = Number(target.textContent)
            const color = window.getComputedStyle(target).backgroundColor
            console.log(this)
            if (this.clickCallback && color) {
                console.log('hi')
                this.clickCallback(value, color)
            }
        }
        make() {
            const table = document.createElement('table')
            // const head = document.createElement('thead')
            const body = document.createElement('tbody')

            for (let i = 0; i < this.rows; i++) {
                let row = document.createElement('tr')
                for (let j = 0; j < this.cols; j++) {
                    let cell = document.createElement('td')
                    cell.textContent = this.randomNumber + ''
                    // cell.style.color = this.numberColor
                    cell.style.backgroundColor = this.randomColor
                    row.appendChild(cell)
                }
                body.appendChild(row)
            }

            // table.appendChild(head)
            table.appendChild(body)
            this.bindTableClick = this.tableClickEvent.bind(this)

            table.addEventListener('click', this.bindTableClick)

            return table
        }
    }
}