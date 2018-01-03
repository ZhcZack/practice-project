"use strict";
var c4;
(function (c4) {
    var get = function (sel) {
        return document.querySelector(sel);
    };
    var getAll = function (sel) {
        return document.querySelectorAll(sel);
    };
    var log = console.log.bind(console);
    var main = function () {
        var subnav = getAll('.subnav');
        var nav = get('.nav');
        var lis = getAll('.nav > ul > li');
        var timer = 0;
        var s;
        if (subnav.length === 0 || !nav || lis.length === 0) {
            return;
        }
        var _loop_1 = function (i) {
            lis[i].addEventListener('mouseover', function (e) {
                for (var j = 0; j < subnav.length; j++) {
                    subnav[j].style.display = 'none';
                }
                s = lis[i].querySelector('.subnav');
                if (s) {
                    s.style.display = 'block';
                    // log('nav width: ' + nav.offsetWidth + 'offsetLeft: ' + this.offsetLeft + 'offsetWidth: ' + s.offsetWidth)
                    if (nav.offsetWidth <= lis[i].offsetLeft + s.offsetWidth) {
                        s.style.right = '0';
                    }
                    else {
                        s.style.left = lis[i].offsetLeft + 'px';
                    }
                    clearTimeout(timer);
                }
            });
            lis[i].addEventListener('mouseout', function (e) {
                s = lis[i].querySelector('.subnav');
                // log('out, s: ' + s)
                timer = setTimeout(function () {
                    if (s) {
                        s.style.display = 'none';
                    }
                }, 300);
            });
        };
        for (var i = 0; i < lis.length; i++) {
            _loop_1(i);
        }
    };
    main();
})(c4 || (c4 = {}));
//# sourceMappingURL=c4.js.map