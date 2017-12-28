const inputs = document.querySelectorAll('input')
const in1 = inputs[0]
const in2 = inputs[1]
const btn = document.querySelector('button')

if (btn !== null) {
    btn.addEventListener('click', e => {
        const v1 = in1.value
        const v2 = in2.value
        alert(v1)
        alert(v2)
    })
}
