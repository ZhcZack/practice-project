"use strict";
var b2;
(function (b2) {
    var btn = document.querySelector('h2');
    var list = document.querySelector('.list');
    if (btn && list) {
        btn.addEventListener('click', function (e) {
            list.classList.toggle('display');
        });
    }
})(b2 || (b2 = {}));
//# sourceMappingURL=b2.js.map