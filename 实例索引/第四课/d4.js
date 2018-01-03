"use strict";
var d4;
(function (d4) {
    var get = function (sel) { return document.querySelector(sel); };
    var getAll = function (sel) { return document.querySelectorAll(sel); };
    var log = console.log.bind(console);
    function main() {
        bind();
    }
    function bind() {
        var buttons = getAll('button');
        addHandler(buttons[1], 'click', function () {
            buttons[0].textContent = '我可以点击了';
            addHandler(buttons[0], 'click', clickHandler);
        });
        addHandler(buttons[2], 'click', function () {
            buttons[0].textContent = '毫无用处的按钮';
            removeHandler(buttons[0], 'click', clickHandler);
        });
    }
    function addHandler(obj, event, handler) {
        obj.addEventListener(event, handler);
    }
    function removeHandler(obj, event, handler) {
        obj.removeEventListener(event, handler);
    }
    function clickHandler(e) {
        alert('我可以点击了！');
    }
    main();
})(d4 || (d4 = {}));
//# sourceMappingURL=d4.js.map