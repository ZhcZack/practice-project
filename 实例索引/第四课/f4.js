"use strict";
var f4;
(function (f4) {
    var get = function (sel) { return document.querySelector(sel); };
    var getAll = function (sel) { return document.querySelectorAll(sel); };
    var log = console.log.bind(console);
    function main() {
        bind();
    }
    function bind() {
        var inputs = getAll('.login-area input');
        var _loop_1 = function (i) {
            inputs[i].addEventListener('focus', function (e) {
                inputs[i].classList.add('active');
            });
            inputs[i].addEventListener('blur', function (e) {
                inputs[i].classList.remove('active');
            });
        };
        for (var i = 0; i < inputs.length - 1; i++) {
            _loop_1(i);
        }
    }
    main();
})(f4 || (f4 = {}));
//# sourceMappingURL=f4.js.map