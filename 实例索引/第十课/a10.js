"use strict";
var a10;
(function (a10) {
    var get = function (sel) { return document.querySelector(sel); };
    var getAll = function (sel) { return document.querySelectorAll(sel); };
    var log = console.log.bind(console);
    window.addEventListener('load', main);
    function main() {
        var lis = getAll('#nav li');
        var sub = get('#sub');
        if (lis.length < 1 || !sub) {
            return;
        }
        for (var i = 0; i < lis.length; i++) {
            var elemnt = lis[i];
            elemnt.addEventListener('mouseover', showSub);
            elemnt.addEventListener('mouseout', hideSub);
        }
        sub.addEventListener('mouseover', showSub);
        sub.addEventListener('mouseout', hideSub);
    }
    function showSub(e) {
        var sub = get('#sub');
        if (!sub) {
            return;
        }
        if (!sub.classList.contains('display')) {
            sub.classList.add('display');
        }
        e.stopPropagation();
    }
    function hideSub(e) {
        var sub = get('#sub');
        if (!sub) {
            return;
        }
        sub.classList.remove('display');
        e.stopPropagation();
    }
})(a10 || (a10 = {}));
//# sourceMappingURL=a10.js.map