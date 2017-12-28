const btns = document.querySelectorAll('button')
const div = document.querySelector("#div") as HTMLDivElement

if (div !== null) {
    btns[0].addEventListener('click', function (e) {
        div.style.width = '200px'
    })
    btns[1].addEventListener('click', function (e) {
        div.style.height = '200px'
    })
    btns[2].addEventListener('click', function (e) {
        div.style.backgroundColor = 'red'
    })
    btns[3].addEventListener('click', function (e) {
        div.style.display = 'none'
    })
    btns[4].addEventListener('click', function (e) {
        div.style.cssText = ''
    })
}