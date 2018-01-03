"use strict";
var e5;
(function (e5) {
    var get = function (sel) { return document.querySelector(sel); };
    var getAll = function (sel) { return document.querySelectorAll(sel); };
    var log = console.log.bind(console);
    function main() {
        var list = getAll('#imglist li img');
        if (list.length < 1) {
            return;
        }
        listActions(list);
    }
    function listActions(list) {
        var b = get('#big');
        if (!b) {
            return;
        }
        var _loop_1 = function (i) {
            list[i].addEventListener('mouseover', function (e) {
                var href = list[i].src.replace(/\.jpg/, '_big.jpg');
                var x = e.clientX;
                var y = e.clientY;
                showBigImage(b, x, y, href);
            });
            list[i].addEventListener('mousemove', function (e) {
                var x = e.clientX;
                var y = e.clientY;
                showBigImage(b, x, y);
            });
            list[i].addEventListener('mouseout', function (e) {
                hideBigImage(b);
            });
        };
        for (var i = 0; i < list.length; i++) {
            _loop_1(i);
        }
    }
    function setBigImageHref(image, href) {
        var img = image.querySelector('img');
        if (img) {
            img.setAttribute('src', href);
        }
    }
    function showBigImage(image, x, y, href) {
        if (href) {
            setBigImageHref(image, href);
        }
        image.style.display = 'block';
        var w = image.offsetWidth;
        if (w + x <= window.innerWidth) {
            image.style.left = x + 20 + 'px';
        }
        else {
            image.style.left = x - w - 10 + 'px';
        }
        image.style.top = y + 20 + 'px';
    }
    function hideBigImage(image) {
        image.style.display = 'none';
    }
    main();
})(e5 || (e5 = {}));
//# sourceMappingURL=e5.js.map