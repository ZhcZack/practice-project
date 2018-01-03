"use strict";
var a5;
(function (a5) {
    function main() {
        var d = document.querySelector('#div');
        d.addEventListener('click', twinkle);
    }
    function twinkle(e) {
        var d = document.querySelector('#div');
        var times = 0;
        var timer = setInterval(function () {
            if (times % 2 === 0) {
                d.style.display = 'none';
            }
            else {
                d.style.display = 'block';
            }
            times++;
            if (times >= 6) {
                clearInterval(timer);
            }
        }, 600 / 6);
    }
    main();
})(a5 || (a5 = {}));
//# sourceMappingURL=a5.js.map