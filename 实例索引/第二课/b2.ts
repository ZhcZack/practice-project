namespace b2 {
    const btn = document.querySelector('h2')
    const list = document.querySelector('.list')
    if (btn && list) {
        btn.addEventListener('click', function (e) {
            list.classList.toggle('display')
        })
    }

}