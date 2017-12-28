namespace c1 {
    const btn = document.querySelector('button')
    const divs = document.querySelectorAll('div')

    if (btn !== null) {
        btn.addEventListener('click', function (e) {
            for (var i = 0; i < divs.length; i++) {
                divs[i].className = 'red'
            }
        })
    }
}