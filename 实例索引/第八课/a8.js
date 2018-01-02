var a8;
(function (a8) {
    window.addEventListener('load', function () {
        main();
    });
    var get = function (sel) { return document.querySelector(sel); };
    var log = console.log.bind(console);
    var timer = {
        moveTimer: 0,
    };
    function screenLock() {
        var phone = get('#iphone');
        var lock = get('#lock');
        if (!phone || !lock) {
            return;
        }
        var img = document.createElement('img');
        img.src = 'http://fgm.cc/iphone/2.jpg';
        img.onload = function () {
            phone.style.background = 'url(' + img.src + ') no-repeat';
            lock.style.display = 'none';
        };
    }
    function move(obj, distance, callback) {
        clearTimeout(timer.moveTimer);
        timer.moveTimer = setInterval(function () {
            var speed = (distance - obj.offsetLeft) / 10;
            if (speed > 0) {
                speed = Math.ceil(speed);
            }
            else {
                speed = Math.floor(speed);
            }
            if (0 === speed) {
                clearInterval(timer.moveTimer);
                if (callback) {
                    callback();
                }
            }
            else {
                obj.style.left = obj.offsetLeft + speed + 'px';
            }
        }, 1000 / 60);
    }
    function slideEvents(slide) {
        var dx = 0;
        var isSliding = false;
        var maxL = slide.parentElement.offsetWidth - slide.offsetWidth;
        slide.addEventListener('mousedown', function (e) {
            isSliding = true;
            dx = e.clientX - slide.offsetLeft;
            e.stopPropagation();
        });
        slide.addEventListener('mousemove', function (e) {
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
            slide.style.left = l + 'px';
            if (l === maxL) {
                screenLock();
            }
            e.stopPropagation();
        });
        slide.addEventListener('mouseup', function (e) {
            isSliding = false;
            if (slide.offsetLeft < maxL / 2) {
                move(slide, 0);
            }
            else {
                move(slide, maxL, screenLock);
            }
            e.stopPropagation();
        });
    }
    function main() {
        var slide = get('#lock span');
        if (!slide) {
            return;
        }
        // const phone = get('#iphone')
        slideEvents(slide);
    }
})(a8 || (a8 = {}));
//# sourceMappingURL=a8.js.map