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
        var isDrag = false;
        var dx = 0;
        var dy = 0;
        var clone = null;
        item.addEventListener('mousedown', function (e) {
            log('hello');
            isDrag = true;
            dx = e.clientX - item.offsetLeft;
            dy = e.clientY - item.offsetTop;
            clone = item.cloneNode();
            clone.classList.add('item-clone');
            item.insertAdjacentElement('afterend', clone);
            e.stopPropagation();
        });
        item.addEventListener('mouseup', function (e) {
            log('hi');
            isDrag = false;
            if (!clone) {
                return;
            }
            var index = item.style.zIndex ? parseInt(item.style.zIndex) : 0;
            log("index: " + index);
            item.style.left = clone.offsetLeft + 'px';
            item.style.top = clone.offsetTop + 'px';
            item.style.zIndex = index + 1 + '';
            clone.parentNode.removeChild(clone);
            e.stopPropagation();
        });
        window.addEventListener('mousemove', function (e) {
            if (!clone || !isDrag) {
                return;
            }
            clone.style.left = e.clientX - dx + 'px';
            clone.style.top = e.clientY - dy + 'px';
        });
    }
})(b8 || (b8 = {}));
//# sourceMappingURL=b8.js.map