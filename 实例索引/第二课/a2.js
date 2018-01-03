"use strict";
var a2;
(function (a2) {
    var attr = document.querySelector('#attr');
    var val = document.querySelector('#val');
    var show = document.querySelector('#show');
    var b = document.querySelector('button');
    var reset = document.querySelector('[type=reset]');
    if (b !== null && attr !== null && val !== null && show !== null) {
        b.addEventListener('click', function (e) {
            var v1 = attr.value;
            var v2 = val.value;
            show.style[v1] = v2;
        });
    }
    reset.addEventListener('click', function (e) {
        show.style.cssText = '';
    });
})(a2 || (a2 = {}));
//# sourceMappingURL=a2.js.map