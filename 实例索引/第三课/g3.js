"use strict";
var g3;
(function (g3) {
    function main() {
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
        if (result === null || button === null) {
            return;
        }
        button.addEventListener('click', function (e) {
            var v1 = parseInt(inputs[0].value, 10);
            var v2 = parseInt(inputs[1].value, 10);
            result.textContent = v1 >= v2 ? '' + v1 : '' + v2;
        });
    }
    main();
})(g3 || (g3 = {}));
//# sourceMappingURL=g3.js.map