var inputs = document.querySelectorAll('input');
var in1 = inputs[0];
var in2 = inputs[1];
var btn = document.querySelector('button');
if (btn !== null) {
    btn.addEventListener('click', function (e) {
        var v1 = in1.value;
        var v2 = in2.value;
        alert(v1);
        alert(v2);
    });
}
//# sourceMappingURL=a1.js.map