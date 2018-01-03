"use strict";
var c7;
(function (c7) {
    var get = function (sel) { return document.querySelector(sel); };
    var getAll = function (sel) { return document.querySelectorAll(sel); };
    var log = console.log.bind(console);
    var pathInfo = {
        isInDrawMode: false,
        path: [],
        timer: 0,
    };
    var clickInfo = {
        timerX: 0,
        timerY: 0,
        duration: 2,
    };
    function main() {
        buttonActions();
    }
    function buttonActions() {
        var buttons = getAll('button');
        var p = get('p');
        if (buttons.length < 1 || !p) {
            return;
        }
        var drawActions = drawMoveAction();
        buttons[0].addEventListener('click', function (e) {
            refreshUI('first');
            clickToMoveEnabled();
            drawMovingPathDisalbed(drawActions);
            e.stopPropagation();
        });
        buttons[1].addEventListener('click', function (e) {
            refreshUI('second');
            clickToMoveDisabled();
            drawMovingPathEnabled(drawActions);
            e.stopPropagation();
        });
    }
    function itemImageChange() {
        var item = get('.item');
        var imgs = ['http://www.fgm.cc/learn/lesson7/img/1.gif',
            'http://www.fgm.cc/learn/lesson7/img/2.gif'];
        var current = item.src;
        var index = imgs.indexOf(current);
        index++;
        if (index > imgs.length - 1) {
            index = 0;
        }
        item.src = imgs[index];
    }
    function drawPathMouseDown(e) {
        pathInfo.isInDrawMode = true;
        var x = e.clientX;
        var y = e.clientY;
        pathInfo.path.push([x, y]);
    }
    function drawPathMouseMove(e) {
        if (!pathInfo.isInDrawMode) {
            return;
        }
        var x = e.clientX;
        var y = e.clientY;
        pathInfo.path.push([x, y]);
    }
    function drawPathMouseUp(e) {
        pathInfo.isInDrawMode = false;
        var item = get('.item');
        drawPathMove(item);
    }
    function drawPathMove(moveItem) {
        itemImageChange();
        pathInfo.timer = setInterval(function () {
            if (pathInfo.path.length < 1) {
                clearInterval(pathInfo.timer);
                itemImageChange();
                return;
            }
            var p = pathInfo.path.shift();
            if (p) {
                moveItem.style.left = p[0] + 'px';
                moveItem.style.top = p[1] + 'px';
            }
            if (pathInfo.path.length < 1) {
                clearInterval(pathInfo.timer);
                itemImageChange();
            }
        }, 1000 / 60);
    }
    function drawMoveAction() {
        var item = get('.item');
        return {
            drawPathMouseDown: drawPathMouseDown,
            drawPathMouseUp: drawPathMouseUp,
            drawPathMouseMove: drawPathMouseMove
        };
    }
    function drawMovingPathEnabled(actions) {
        // var actions = drawMoveAction()
        window.addEventListener('mousedown', actions.drawPathMouseDown);
        window.addEventListener('mouseup', actions.drawPathMouseUp);
        window.addEventListener('mousemove', actions.drawPathMouseMove);
    }
    function drawMovingPathDisalbed(actions) {
        // var actions = drawMoveAction()
        window.removeEventListener('mousedown', actions.drawPathMouseDown);
        window.removeEventListener('mouseup', actions.drawPathMouseUp);
        window.removeEventListener('mousemove', actions.drawPathMouseMove);
    }
    function clickMoveInXWithStableSpeed(moveItem, distance, speed, timer) {
        itemImageChange();
        var end = moveItem.offsetLeft + distance;
        clearInterval(timer);
        timer = setInterval(function () {
            if (distance >= 0) {
                moveItem.style.left = moveItem.offsetLeft + speed + 'px';
                distance -= speed;
            }
            else {
                moveItem.style.left = moveItem.offsetLeft - speed + 'px';
                distance += speed;
            }
            if (Math.abs(distance - speed) <= speed) {
                clearInterval(timer);
                moveItem.style.left = end + 'px';
                itemImageChange();
            }
        }, 1000 / 60);
    }
    function clickMoveInYWithStableSpeed(moveItem, distance, speed, timer) {
        var end = moveItem.offsetTop + distance;
        clearInterval(timer);
        timer = setInterval(function () {
            if (distance >= 0) {
                moveItem.style.top = moveItem.offsetTop + speed + 'px';
                distance -= speed;
            }
            else {
                moveItem.style.top = moveItem.offsetTop - speed + 'px';
                distance += speed;
            }
            if (Math.abs(distance - speed) <= speed) {
                clearInterval(timer);
                moveItem.style.top = end + 'px';
            }
        }, 1000 / 60);
    }
    function clickMoveInXWithChangedSpeed(moveItem, target, timer) {
        itemImageChange();
        clearInterval(timer);
        timer = setInterval(function () {
            var speed = (target - moveItem.offsetLeft) / 10;
            if (speed > 0) {
                speed = Math.ceil(speed);
            }
            else {
                speed = Math.floor(speed);
            }
            if (speed === 0) {
                clearInterval(timer);
                itemImageChange();
            }
            else {
                moveItem.style.left = moveItem.offsetLeft + speed + 'px';
            }
        }, 1000 / 60);
    }
    function clickMoveInYWithChangedSpeed(moveItem, target, timer) {
        clearInterval(timer);
        timer = setInterval(function () {
            var speed = (target - moveItem.offsetTop) / 10;
            if (speed > 0) {
                speed = Math.ceil(speed);
            }
            else {
                speed = Math.floor(speed);
            }
            if (speed === 0) {
                clearInterval(timer);
            }
            else {
                moveItem.style.top = moveItem.offsetTop + speed + 'px';
            }
        }, 1000 / 60);
    }
    function clickMoveAction(e) {
        var item = get('.item');
        var x = e.clientX;
        var y = e.clientY;
        var startX = item.offsetLeft;
        var startY = item.offsetTop;
        var dx = x - startX;
        var dy = y - startY;
        var speedX = 5;
        var speedY = 5;
        // clickMoveInXWithStableSpeed(item, dx, Math.abs(dx / duration / 30), timerX)
        // clickMoveInYWithStableSpeed(item, dy, Math.abs(dy / duration / 30), timerY)
        clickMoveInXWithChangedSpeed(item, x, clickInfo.timerX);
        clickMoveInYWithChangedSpeed(item, y, clickInfo.timerY);
    }
    function clickToMoveEnabled() {
        window.addEventListener('click', clickMoveAction);
    }
    function clickToMoveDisabled() {
        window.removeEventListener('click', clickMoveAction);
    }
    function refreshUI(order) {
        var buttons = getAll('button');
        var p = get('p');
        if (buttons.length < 1 || !p) {
            return;
        }
        var t1 = '根据鼠标点击位置移动';
        var t2 = '根据鼠标轨迹移动';
        var p1 = '鼠标点击页面， 人物将移动至鼠标位置！';
        var p2 = '按住鼠标左键，在页面划动，人物将按照鼠标轨迹移动。';
        switch (order) {
            case 'first':
                buttons[0].textContent = t1 + '（已激活）';
                buttons[1].textContent = t2;
                p.textContent = p1;
                break;
            case 'second':
                buttons[0].textContent = t1;
                buttons[1].textContent = t2 + '（已激活）';
                p.textContent = p2;
                break;
            default:
                break;
        }
    }
    main();
})(c7 || (c7 = {}));
//# sourceMappingURL=c7.js.map