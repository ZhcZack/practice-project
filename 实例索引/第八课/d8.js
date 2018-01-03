"use strict";
var d8;
(function (d8) {
    var get = function (sel) { return document.querySelector(sel); };
    var getAll = function (sel) { return document.querySelectorAll(sel); };
    var log = console.log.bind(console);
    var TIMER = {
        barMoveTimer: 0,
        listMoveTimer: 0,
        autoplayer: 0,
    };
    window.addEventListener('load', function (e) {
        main();
    });
    function barMove(target, obj) {
        clearTimeout(TIMER.barMoveTimer);
        TIMER.barMoveTimer = setInterval(function () {
            var left = obj.style.left ? parseInt(obj.style.left, 10) : 0;
            var speed = (target - left) / 10;
            if (speed > 0) {
                speed = Math.ceil(speed);
            }
            else {
                speed = Math.floor(speed);
            }
            if (speed === 0) {
                clearInterval(TIMER.barMoveTimer);
                toggleBarStatus();
            }
            obj.style.left = left + speed + 'px';
        }, 1000 / 60);
    }
    function listMove(target, obj) {
        clearTimeout(TIMER.listMoveTimer);
        TIMER.listMoveTimer = setInterval(function () {
            var left = obj.style.left ? parseInt(obj.style.left, 10) : 0;
            var speed = (-target - left) / 10;
            if (speed >= 0) {
                speed = Math.ceil(speed);
            }
            else {
                speed = Math.floor(speed);
            }
            if (speed === 0) {
                clearInterval(TIMER.listMoveTimer);
                toggleBarStatus();
            }
            obj.style.left = left + speed + 'px';
        }, 1000 / 60);
    }
    function moveTogether(barTarget, bar, listTarget, list) {
        if (bar) {
            barMove(barTarget, bar);
        }
        if (list) {
            listMove(listTarget, list);
        }
    }
    function main() {
        initSize();
        barActions();
        keyboardActions();
        mouseWheelActions();
    }
    function toggleBarStatus() {
        var bm = get('.bar .bar-middle');
        var bms = get('.bar .bar-middle .bar-middle-slider');
        var bl = get('.bar .bar-left');
        var br = get('.bar .bar-right');
        if (!bm || !bms || !bl || !br) {
            return;
        }
        var diff = bms.offsetLeft - bm.offsetLeft;
        var barScrollLength = bm.offsetWidth - bms.offsetWidth;
        if (diff <= 0) {
            bl.classList.add('end');
            br.classList.remove('end');
        }
        else if (diff >= barScrollLength) {
            br.classList.add('end');
            bl.classList.remove('end');
        }
        else {
            bl.classList.remove('end');
            br.classList.remove('end');
        }
    }
    function mouseWheelActions() {
        var container = get('.imglist-container');
        var list = get('.imglist');
        var bm = get('.bar .bar-middle');
        var bms = get('.bar .bar-middle .bar-middle-slider');
        if (!container || !list || !bm || !bms) {
            return;
        }
        var barScrollLength = bm.offsetWidth - bms.offsetWidth;
        var listScrollLength = getImgListLength() - container.offsetWidth;
        var mul = parseInt(listScrollLength / barScrollLength + '', 10);
        var speed = 20;
        container.addEventListener('wheel', function (e) {
            var y = e.deltaY;
            log(y);
            if (y < 0) {
                var diff = bms.offsetLeft - bm.offsetLeft;
                var target = diff - speed;
                if (target <= 0) {
                    target = 0;
                }
                // log('diff: ' + diff + ', speed: ' + speed + ', target: ' + target)
                moveTogether(target, bms, target * mul, list);
            }
            else {
                var diff = bms.offsetLeft - bm.offsetLeft;
                var target = diff + speed;
                // log('diff: ' + diff + ', speed: ' + speed + ', target: ' + target)
                if (target >= barScrollLength) {
                    moveTogether(barScrollLength, bms, listScrollLength, list);
                }
                else {
                    moveTogether(target, bms, target * mul, list);
                }
            }
        });
    }
    function keyboardActions() {
        var container = get('.imglist-container');
        var list = get('.imglist');
        var bm = get('.bar .bar-middle');
        var bms = get('.bar .bar-middle .bar-middle-slider');
        if (!container || !list || !bm || !bms) {
            return;
        }
        var barScrollLength = bm.offsetWidth - bms.offsetWidth;
        var listScrollLength = getImgListLength() - container.offsetWidth;
        var mul = parseInt(listScrollLength / barScrollLength + '', 10);
        var speed = 20;
        window.addEventListener('keydown', function (e) {
            var key = e.key;
            var diff = 0;
            var target = 0;
            switch (key) {
                case 'ArrowLeft':
                    diff = bms.offsetLeft - bm.offsetLeft;
                    target = diff - speed;
                    if (target <= 0) {
                        target = 0;
                    }
                    // log('diff: ' + diff + ', speed: ' + speed + ', target: ' + target)
                    moveTogether(target, bms, target * mul, list);
                    break;
                case 'ArrowRight':
                    diff = bms.offsetLeft - bm.offsetLeft;
                    target = diff + speed;
                    // log('diff: ' + diff + ', speed: ' + speed + ', target: ' + target)
                    if (target >= barScrollLength) {
                        moveTogether(barScrollLength, bms, listScrollLength, list);
                    }
                    else {
                        moveTogether(target, bms, target * mul, list);
                    }
                    break;
                default:
                    break;
            }
        });
    }
    function barActions() {
        var container = get('.imglist-container');
        var list = get('.imglist');
        var bar = get('.bar');
        var bm = get('.bar .bar-middle');
        var bms = get('.bar .bar-middle .bar-middle-slider');
        var bl = get('.bar .bar-left');
        var br = get('.bar .bar-right');
        if (!container || !list || !bar || !bm || !bms || !bl || !br) {
            return;
        }
        var isSliding = false;
        var dx = 0;
        var maxL = bm.offsetWidth - bms.offsetWidth;
        var barScrollLength = bm.offsetWidth - bms.offsetWidth;
        var listScrollLength = getImgListLength() - container.offsetWidth;
        var mul = parseInt(listScrollLength / barScrollLength + '', 10);
        bl.addEventListener('mouseover', function (e) {
            TIMER.autoplayer = setInterval(function () {
                var diff = bms.offsetLeft - bm.offsetLeft;
                var speed = 2;
                var target = diff - speed;
                if (target <= 0) {
                    target = 0;
                }
                bms.style.left = target + 'px';
                list.style.left = -mul * target + 'px';
                if (target <= 0) {
                    clearInterval(TIMER.autoplayer);
                }
                toggleBarStatus();
            }, 1000 / 60);
        });
        bl.addEventListener('mouseout', function (e) {
            clearInterval(TIMER.autoplayer);
        });
        br.addEventListener('mouseover', function (e) {
            bl.classList.remove('end');
            TIMER.autoplayer = setInterval(function () {
                var diff = bms.offsetLeft - bm.offsetLeft;
                var speed = 2;
                var target = diff + speed;
                // log('diff: ' + diff + ', speed: ' + speed + ', target: ' + target)
                if (target >= barScrollLength) {
                    bms.style.left = barScrollLength + 'px';
                    list.style.left = -listScrollLength + 'px';
                    clearInterval(TIMER.autoplayer);
                    br.classList.add('end');
                }
                else {
                    bms.style.left = target + 'px';
                    list.style.left = -mul * target + 'px';
                }
                toggleBarStatus();
            }, 1000 / 60);
        });
        br.addEventListener('mouseout', function (e) {
            clearInterval(TIMER.autoplayer);
        });
        bms.addEventListener('mousedown', function (e) {
            isSliding = true;
            dx = e.clientX - bms.offsetLeft;
            // this.setCapture()
            e.stopPropagation();
        });
        bms.addEventListener('mouseup', function (e) {
            isSliding = false;
            var l = e.clientX - dx;
            if (l < 0) {
                l = 0;
            }
            else if (l > maxL) {
                l = maxL;
            }
            if (l >= maxL) {
                moveTogether(0, null, listScrollLength, list);
            }
            else {
                moveTogether(0, null, l * mul, list);
            }
            // this.releaseCapture()
            e.stopPropagation();
        });
        bms.addEventListener('mousemove', function (e) {
            if (!isSliding) {
                return;
            }
            var l = e.clientX - dx;
            if (l < 0) {
                l = 0;
            }
            else if (l > maxL) {
                l = maxL;
            }
            bms.style.left = l + 'px';
            toggleBarStatus();
            e.stopPropagation();
        });
        bms.addEventListener('click', function (e) {
            e.stopPropagation();
        });
        bm.addEventListener('click', function (e) {
            var x = e.clientX;
            var diff = x - bm.offsetLeft;
            if (diff >= maxL) {
                moveTogether(maxL, bms, listScrollLength, list);
            }
            else if (diff <= bms.offsetWidth / 2) {
                moveTogether(0, bms, 0, list);
            }
            else {
                moveTogether(diff, bms, diff * mul, list);
            }
            e.stopPropagation();
        });
    }
    function initSize() {
        var imglist = get('.imglist');
        if (!imglist) {
            return;
        }
        var length = getImgListLength();
        imglist.style.width = length + 'px';
    }
    function getImgListLength() {
        var imglist = get('.imglist');
        var lis = getAll('.imglist li');
        if (!imglist || lis.length < 1) {
            return 0;
        }
        var padding = 10;
        var length = 0;
        for (var i = 0; i < lis.length; i++) {
            length += (lis[i].offsetWidth + padding);
        }
        return length;
    }
})(d8 || (d8 = {}));
//# sourceMappingURL=d8.js.map