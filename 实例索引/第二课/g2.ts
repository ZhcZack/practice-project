namespace g2 {
    const button = document.querySelector('button')
    const dialog: HTMLElement | null = document.querySelector('#dialog')
    let close: HTMLElement | null = null
    if (dialog !== null) {
        close = dialog.querySelector('.close')
    }

    function toggleDialog() {
        if (dialog === null) {
            return
        }
        if (dialog.classList.contains('display')) {
            dialog.classList.remove('display')
        } else {
            dialog.classList.add('display')
        }
    }

    if (button !== null) {
        button.addEventListener('click', function (e) {
            var rect = button.getBoundingClientRect()
            var x = rect.left
            var y = rect.bottom + 10

            toggleDialog()

            if (dialog !== null) {
                dialog.style.top = y + 'px'
                dialog.style.left = x + 'px'
            }
        })
    }

    if (close !== null) {
        close.addEventListener('click', function (e) {
            toggleDialog()
        })
    }

}