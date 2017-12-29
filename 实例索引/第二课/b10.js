var b10;
(function (b10) {
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
})(b10 || (b10 = {}));
//# sourceMappingURL=b10.js.map