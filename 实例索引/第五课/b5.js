"use strict";
var b5;
(function (b5) {
    var get = function (sel) { return document.querySelector(sel); };
    var getAll = function (sel) { return document.querySelectorAll(sel); };
    var log = console.log.bind(console);
    function main() {
        var select = get('#search .name');
        if (select) {
            selectActions(select);
        }
    }
    function selectActions(s) {
        var list = get('#list');
        if (!list) {
            return;
        }
        s.addEventListener('click', function (e) {
            if (s.classList.contains('list')) {
                toggleSelect(s);
                hideList(list);
            }
            else {
                var rect = s.getBoundingClientRect();
                var w = rect.width;
                var y = rect.height;
                toggleSelect(s);
                showList(list, w, y);
            }
        });
    }
    function toggleSelect(select) {
        select.classList.toggle('list');
    }
    function hideList(l) {
        l.style.display = 'none';
    }
    function showList(l, w, y) {
        l.style.display = 'block';
        l.style.width = w + 'px';
        l.style.left = '0';
        l.style.top = y + 'px';
        if (l.dataset.bind !== 'true') {
            listActions(l);
        }
    }
    function listActions(l) {
        var lis = getAll('#list li');
        var select = get('#search .name');
        if (!select || lis.length < 1) {
            return;
        }
        var _loop_1 = function (i) {
            lis[i].addEventListener('click', function (e) {
                var text = lis[i].textContent;
                if (text) {
                    select.textContent = text;
                    toggleSelect(select);
                    hideList(l);
                }
            });
        };
        for (var i = 0; i < lis.length; i++) {
            _loop_1(i);
        }
        l.dataset.bind = 'true';
    }
    main();
})(b5 || (b5 = {}));
//# sourceMappingURL=b5.js.map