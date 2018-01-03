"use strict";
var a9;
(function (a9) {
    window.addEventListener('load', function () {
        main();
    });
    var get = function (sel) { return document.querySelector(sel); };
    var getAll = function (sel) { return document.querySelectorAll(sel); };
    var log = console.log.bind(console);
    function main() {
        var menu = get('.menu');
        var imgs = getAll('.menu img');
        var ws = [];
        if (!menu || !imgs) {
            return;
        }
        for (var i = 0; i < imgs.length; i++) {
            ws.push(imgs[i].offsetWidth * 2);
        }
        menu.addEventListener('mousemove', function (e) {
            for (var i = 0; i < imgs.length; i++) {
                var a = e.clientX - imgs[i].offsetLeft - imgs[i].offsetWidth / 2;
                var b = e.clientY - imgs[i].offsetTop - menu.offsetTop - imgs[i].offsetHeight / 2;
                var scale = 1 - Math.sqrt(a * a + b * b) / 300;
                if (scale < 0.5) {
                    scale = 0.5;
                }
                imgs[i].style.width = ws[i] * scale + 'px';
            }
        });
    }
})(a9 || (a9 = {}));
//# sourceMappingURL=a9.js.map