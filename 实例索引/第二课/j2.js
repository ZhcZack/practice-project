"use strict";
var j2;
(function (j2) {
    function main() {
        var imgs = document.querySelectorAll('.imglist img');
        var main = document.querySelector('.main img');
        var _loop_1 = function (i) {
            imgs[i].addEventListener('mouseover', function (e) {
                var link = imgs[i].src;
                main.src = link.replace(/small/, 'big');
            });
        };
        for (var i = 0; i < imgs.length; i++) {
            _loop_1(i);
        }
    }
    main();
})(j2 || (j2 = {}));
//# sourceMappingURL=j2.js.map