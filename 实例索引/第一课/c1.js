"use strict";
var c1;
(function (c1) {
    var btn = document.querySelector('button');
    var divs = document.querySelectorAll('div');
    if (btn !== null) {
        btn.addEventListener('click', function (e) {
            for (var i = 0; i < divs.length; i++) {
                divs[i].className = 'red';
            }
        });
    }
})(c1 || (c1 = {}));
//# sourceMappingURL=c1.js.map