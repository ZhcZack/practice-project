namespace a2 {
    const attr = document.querySelector('#attr') as HTMLInputElement
    const val = document.querySelector('#val') as HTMLInputElement
    const show = document.querySelector('#show') as HTMLDivElement
    const b = document.querySelector('button')
    const reset = document.querySelector('[type=reset]') as HTMLInputElement

    if (b !== null && attr !== null && val !== null && show !== null) {
        b.addEventListener('click', function (e) {
            var v1 = attr.value as any
            var v2 = val.value
            show.style[v1] = v2
        })
    }
    reset.addEventListener('click', function (e) {
        show.style.cssText = ''
    })

}