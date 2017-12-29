namespace b4 {
    const get = document.querySelector.bind(document)
    const getAll = document.querySelectorAll.bind(document)
    const log = console.log.bind(console)

    function main() {
        // test()
        bind()
    }

    function bind() {
        const d = get('.container') as HTMLElement
        const gb = get('.get') as HTMLElement
        const sb = get('.set') as HTMLElement
        const db = get('.default') as HTMLElement

        if (!d || !gb || !sb || !db) {
            return
        }

        gb.addEventListener('click', e => {
            alert('width: ' + css(d, 'width') + '\nheight: ' + css(d, 'height')
                + '\nbackground-color: ' + css(d, 'backgroundColor'))
        })
        sb.addEventListener('click', e => {
            css(d, {
                width: '330px',
                height: '100px',
                borderColor: 'rgb(0, 132, 255)',
                backgroundColor: 'rgb(239, 248, 255)'
            })
            css(gb, 'backgroundColor', 'rgb(0, 132, 255)')
            css(sb, 'backgroundColor', 'rgb(0, 132, 255)')
            css(db, 'backgroundColor', 'rgb(0, 132, 255)')
        })
        db.addEventListener('click', e => {
            d.style.cssText = ''
            gb.style.cssText = ''
            sb.style.cssText = ''
            db.style.cssText = ''
        })
    }

    function test() {
        const d = document.querySelector('.container') as HTMLElement
        if (!d) {
            return
        }
        alert(css(d, 'width'))
    }

    function css(obj: HTMLElement, attr: string | { [propName: string]: string }, value?: string) {
        switch (arguments.length) {
            case 2:
                if (typeof arguments[1] === 'object') {
                    let a: { [propName: string]: string } = attr as { [propName: string]: string }
                    for (let i in a) {
                        obj.style[<any>i] = a[i]
                    }
                } else {
                    return window.getComputedStyle(obj)[<any>attr]
                }
                break
            case 3:
                let b: any = attr
                obj.style[b] = value as string
                break
            default:
                alert('参数错误！')
                break
        }
        return
    }

    main()

}