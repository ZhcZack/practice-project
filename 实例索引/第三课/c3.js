"use strict";
var c3;
(function (c3) {
    function __main() {
        var inputs = document.querySelectorAll('input');
        var _loop_1 = function (i) {
            inputs[i].addEventListener('keyup', function (e) {
                inputs[i].value = inputs[i].value.replace(/[^0-9]/, '');
            });
        };
        for (var i = 0; i < inputs.length; i++) {
            _loop_1(i);
        }
        var result = document.querySelector('.result');
        var button = document.querySelector('button');
        if (button === null || result === null) {
            return;
        }
        button.addEventListener('click', function (e) {
            var v1 = parseInt(inputs[0].value, 10);
            var v2 = parseInt(inputs[1].value, 10);
            result.textContent = String(v1 + v2);
        });
    }
    __main();
})(c3 || (c3 = {}));
//# sourceMappingURL=c3.js.map