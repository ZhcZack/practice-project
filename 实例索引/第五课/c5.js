"use strict";
var c5;
(function (c5) {
    var get = function (sel) { return document.querySelector(sel); };
    var getAll = function (sel) { return document.querySelectorAll(sel); };
    var log = console.log.bind(console);
    function main() {
        var d = get('#div');
        if (!d) {
            return;
        }
        dActions(d);
    }
    function dActions(d) {
        var info = {
            'up': false,
            'down': false,
            'left': false,
            'right': false,
        };
        window.addEventListener('keydown', function (e) {
            var key = e.key;
            switch (key) {
                case (e.ctrlKey && 'ArrowUp'):
                    zoomDiv(d, 'in');
                    break;
                case (e.ctrlKey && 'ArrowDown'):
                    zoomDiv(d, 'out');
                    break;
                case 'ArrowUp':
                    info.up = true;
                    break;
                case 'ArrowLeft':
                    info.left = true;
                    break;
                case 'ArrowRight':
                    info.right = true;
                    break;
                case 'ArrowDown':
                    info.down = true;
                    break;
                case (e.ctrlKey && '1'):
                    changeDivColor(d, 'green');
                    break;
                case (e.ctrlKey && '2'):
                    changeDivColor(d, 'yellow');
                    break;
                case (e.ctrlKey && '3'):
                    changeDivColor(d, 'blue');
                    break;
                default:
                    break;
            }
            e.stopPropagation();
        });
        window.addEventListener('keyup', function (e) {
            var key = e.key;
            switch (key) {
                case 'ArrowUp':
                    info.up = false;
                    break;
                case 'ArrowLeft':
                    info.left = false;
                    break;
                case 'ArrowRight':
                    info.right = false;
                    break;
                case 'ArrowDown':
                    info.down = false;
                    break;
            }
        });
        moveDiv(d, info);
    }
    function zoomDiv(d, method) {
        var w = d.offsetWidth;
        var h = d.offsetHeight;
        switch (method) {
            case 'in':
                d.style.width = w * 1.5 + 'px';
                d.style.height = h * 1.5 + 'px';
                break;
            case 'out':
                d.style.width = w / 1.5 + 'px';
                d.style.height = h / 1.5 + 'px';
            default:
                break;
        }
    }
    function changeDivColor(obj, color) {
        obj.style.backgroundColor = color;
    }
    function moveDiv(obj, info) {
        var speed = 8;
        var rect = obj.getBoundingClientRect();
        var left = rect.left;
        var top = rect.top;
        setInterval(function () {
            if (info.left) {
                obj.style.left = (left -= speed) + 'px';
            }
            if (info.right) {
                obj.style.left = (left += speed) + 'px';
            }
            if (info.up) {
                obj.style.top = (top -= speed) + 'px';
            }
            if (info.down) {
                obj.style.top = (top += speed) + 'px';
            }
            moveWithLimit(obj);
        }, 1000 / 60);
    }
    function moveWithLimit(obj) {
        if (obj.offsetLeft < 0) {
            obj.style.left = 0 + 'px';
        }
        else if (obj.offsetLeft + obj.offsetWidth >= window.innerWidth) {
            obj.style.left = window.innerWidth - obj.offsetWidth + 'px';
        }
        if (obj.offsetTop < 0) {
            obj.style.top = 0 + 'px';
        }
        else if (obj.offsetTop + obj.offsetHeight >= window.innerHeight) {
            obj.style.top = window.innerHeight - obj.offsetHeight + 'px';
        }
    }
    main();
})(c5 || (c5 = {}));
//# sourceMappingURL=c5.js.map