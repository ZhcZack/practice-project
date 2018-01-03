"use strict";
var b6;
(function (b6) {
    var get = function (sel) { return document.querySelector(sel); };
    var getAll = function (sel) { return document.querySelectorAll(sel); };
    var log = console.log.bind(console);
    function dragInformation() {
        var title = get('#drag .title');
        var drag = get('#drag');
        var content = get('#drag .content');
        var playback = get('#drag .title span');
        var points = [];
        if (!title || !drag || !content || !playback) {
            return null;
        }
        return {
            title: title,
            drag: drag,
            content: content,
            playback: playback,
            dragEnabled: false,
            isInPlaybackMode: false,
            diffX: 0,
            diffY: 0,
            points: points
        };
    }
    function updateStatus(content, dragInfo, dragElement) {
        content.innerHTML = 'Drag: <span>' + dragInfo + '</span><br><br>offsetTop: <span>' +
            dragElement.offsetTop + '</span><br><br>offsetLeft: <span>' +
            dragElement.offsetLeft + '</span>';
    }
    function updatePoints(points, newPoint) {
        points.push(newPoint);
    }
    function moveWithLimits(x, y, dx, dy, dragElement) {
        var d = dragElement;
        if (x - dx <= 0) {
            d.style.left = '0';
        }
        else if (d.offsetWidth + d.offsetLeft >= window.innerWidth) {
            d.style.left = window.innerWidth - d.offsetWidth + 'px';
        }
        if (y - dy <= 0) {
            d.style.top = '0';
        }
        else if (d.offsetHeight + d.offsetTop >= window.innerHeight) {
            d.style.top = window.innerHeight - d.offsetHeight + 'px';
        }
    }
    function dragEvents(info) {
        var title = info.title;
        var content = info.content;
        var points = info.points;
        var d = info.drag;
        title.addEventListener('mousedown', function (e) {
            if (info.isInPlaybackMode) {
                return;
            }
            info.dragEnabled = true;
            var x = e.clientX;
            var y = e.clientY;
            info.diffX = x - d.offsetLeft;
            info.diffY = y - d.offsetTop;
            // title.setCapture()
            updatePoints(points, [x, y]);
            e.stopPropagation();
        });
        title.addEventListener('mouseup', function (e) {
            if (info.isInPlaybackMode) {
                return;
            }
            var x = e.clientX;
            var y = e.clientY;
            info.dragEnabled = false;
            // this.releaseCapture()
            e.stopPropagation();
            updateStatus(content, info.dragEnabled, d);
        });
        window.addEventListener('mousemove', function (e) {
            if (!info.dragEnabled) {
                return;
            }
            var x = e.clientX;
            var y = e.clientY;
            d.style.left = x - info.diffX + 'px';
            d.style.top = y - info.diffY + 'px';
            moveWithLimits(x, y, info.diffX, info.diffY, d);
            updateStatus(content, info.dragEnabled, d);
            updatePoints(info.points, [x, y]);
        });
    }
    function playbackEvents(info) {
        var playback = info.playback;
        var points = info.points;
        var d = info.drag;
        var content = info.content;
        playback.addEventListener('mousedown', function (e) {
            var timer = setInterval(function () {
                info.isInPlaybackMode = true;
                var p = points.pop();
                var x = 0;
                var y = 0;
                if (p) {
                    x = p[0];
                    y = p[1];
                }
                d.style.left = x - info.diffX + 'px';
                d.style.top = y - info.diffY + 'px';
                moveWithLimits(x, y, info.diffX, info.diffY, d);
                updateStatus(content, info.dragEnabled, d);
                if (points.length === 0) {
                    clearInterval(timer);
                    info.isInPlaybackMode = false;
                }
            }, 1000 / 60);
            e.stopPropagation();
        });
        playback.addEventListener('mouseup', function (e) {
            e.stopPropagation();
        });
    }
    function main() {
        var info = dragInformation();
        if (info) {
            updateStatus(info.content, info.dragEnabled, info.drag);
            dragEvents(info);
            playbackEvents(info);
        }
    }
    main();
})(b6 || (b6 = {}));
//# sourceMappingURL=b6.js.map