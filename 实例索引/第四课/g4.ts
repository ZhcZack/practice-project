namespace g4 {
    const get = (sel: string): HTMLElement | null => document.querySelector(sel)
    const getAll = (sel: string): NodeListOf<HTMLElement> => document.querySelectorAll(sel)
    const log = console.log.bind(console)

    function main() {
        const codes = getAll('.code')
        const fbs = getAll('.first button')
        const sbs = getAll('.second button')
        const tbs = getAll('.third button')

        if (codes.length < 1 || fbs.length < 1 || sbs.length < 1 || tbs.length < 1) {
            return
        }
        bind(codes, [fbs, sbs, tbs])
    }

    function bind(areas: NodeListOf<HTMLElement>, buttons: NodeListOf<HTMLElement>[]) {
        for (let i = 0; i < areas.length; i++) {
            if (!areas[i].textContent) {
                return
            }
        }
        const arr1 = areas[0].textContent!.split(/\s*,\s*/)
        const arr2 = areas[1].textContent!.split(/\s*,\s*/)
        const arr3 = areas[2].textContent!.split(/\s*,\s*/)

        bindAreaOne(areas[0], arr1, buttons[0])
        bindAreaTwo(areas[1], arr2, buttons[1])
        bindAreaThree(areas[2], arr3, buttons[2])
    }

    function bindAreaOne(area: HTMLElement, arr: string[], buttons: NodeListOf<HTMLElement>) {
        buttons[0].addEventListener('click', e => {
            const index = arr.indexOf('January(1)')
            if (index > -1) {
                arr.splice(index, 1)
                buttons[0].textContent = '添加January(1)'
            } else {
                arr.unshift('January(1)')
                buttons[0].textContent = '删除January(1)'
            }
            updateContentWithArray(area, arr)
        })
        buttons[1].addEventListener('click', e => {
            const index = arr.indexOf('December(12)')
            if (index > -1) {
                arr.splice(index, 1)
                buttons[1].textContent = '添加December(12)'
            } else {
                arr.push('December(12)')
                buttons[1].textContent = '删除December(12)'
            }
            updateContentWithArray(area, arr)
        })
    }

    function bindAreaTwo(area: HTMLElement, arr: string[], buttons: NodeListOf<HTMLElement>) {
        buttons[0].addEventListener('click', e => {
            arr = arr.concat(arr)
            updateContentWithArray(area, arr)
        })
        buttons[1].addEventListener('click', e => {
            const t: string[] = []
            arr.forEach(function (elem) {
                if (t.indexOf(elem) < 0) {
                    t.push(elem)
                }
            })
            arr = t
            updateContentWithArray(area, arr)
        })
    }

    function bindAreaThree(area: HTMLElement, arr: string[], buttons: NodeListOf<HTMLElement>) {
        area.dataset.content = arr.join(', ')
        buttons[0].addEventListener('click', e => {
            arr = area.dataset.content!.split(/\s*,\s*/)
            updateContentWithArray(area, arr)
        })
        buttons[1].addEventListener('click', e => {
            arr.splice(0, 3)
            updateContentWithArray(area, arr)
        })
        buttons[2].addEventListener('click', e => {
            arr.splice(1, 2)
            updateContentWithArray(area, arr)
        })
        buttons[3].addEventListener('click', e => {
            arr.splice(1, 0, 'orange', 'purple')
            updateContentWithArray(area, arr)
        })
        buttons[4].addEventListener('click', e => {
            arr.splice(1, 2, '#009900', '#0000ff')
            updateContentWithArray(area, arr)
        })
    }

    function updateContentWithArray(area: HTMLElement, arr: string[]) {
        area.textContent = arr.join(', ')
    }

    main()

}