"use strict";
var b8;
(function (b8) {
    window.addEventListener('load', function (e) {
        main();
    });
    var get = function (sel) { return document.querySelector(sel); };
    var getAll = function (sel) { return document.querySelectorAll(sel); };
    var log = console.log.bind(console);
    function main() {
        var items = getAll('.item');
        if (items.length < 1) {
            return;
        }
        dragAndDrop(items[0]);
        dragAndDrop(items[1]);
        setup(items);
    }
    function setup(items) {
        items[0].style.left = '50px';
        items[1].style.left = '200px';
    }
    function dragAndDrop(item) {
        var dx = 0;
        var dy = 0;
        item.addEventListener('mousedown', mousedown);
        function mousedown(e) {
            dx = e.clientX - item.offsetLeft;
            dy = e.clientY - item.offsetTop;
            var temp = document.createElement('div');
            temp.classList.add('item-clone', 'item');
            temp.style.left = window.getComputedStyle(item)["left"];
            temp.style.top = window.getComputedStyle(item)["top"];
            temp.style.zIndex = String(temp.style.zIndex + 1);
            document.body.appendChild(temp);
            document.addEventListener('mousemove', mousemove);
            function mousemove(e) {
                temp.style.left = e.clientX - dx + 'px';
                temp.style.top = e.clientY - dy + 'px';
                e.stopPropagation();
            }
            document.addEventListener('mouseup', mouseup);
            function mouseup(e) {
                document.removeEventListener('mousemove', mousemove);
                document.removeEventListener('mouseup', mouseup);
                item.style.left = temp.style.left;
                item.style.top = temp.style.top;
                item.style.zIndex = temp.style.zIndex;
                document.body.removeChild(temp);
            }
            e.stopPropagation();
        }
    }
})(b8 || (b8 = {}));
//# sourceMappingURL=b8.js.map