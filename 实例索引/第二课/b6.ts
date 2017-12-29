namespace b6 {
    const divs = document.querySelectorAll('div')
    for (let i = 0; i < divs.length; i++) {
        divs[i].addEventListener('click', e => {
            alert(divs[i].innerHTML)
        })
    }
}