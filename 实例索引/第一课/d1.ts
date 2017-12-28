namespace d1 {
    const colors = document.querySelectorAll('#skins span')
    const body = document.body
    const ul = document.querySelector('nav ul')

    const red = colors[0]
    red.addEventListener('click', function (e) {
        body.className = 'redType'
        if (ul) { ul.className = 'redType' }
    })

    const green = colors[1]
    green.addEventListener('click', function (e) {
        body.className = 'greenType'
        if (ul) { ul.className = 'greenType' }
    })

    const black = colors[2]
    black.addEventListener('click', function (e) {
        body.className = 'blackType'
        if (ul) { ul.className = 'blackType' }
    })

}