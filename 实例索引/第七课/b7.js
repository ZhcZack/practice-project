var b7;
(function (b7) {
    var get = function (sel) { return document.querySelector(sel); };
    var getAll = function (sel) { return document.querySelectorAll(sel); };
    var log = console.log.bind(console);
    function main() {
        slideImage();
    }
    function slideImage() {
        var container = get('.container');
        var images = get('.imgList');
        var navs = getAll('.nav li');
        if (!container || !images || !navs) {
            return;
        }
        var info = {
            leftToRight: true,
            timer: {
                moveTimer: 0,
                indexTimer: 0,
            },
            index: 0,
        };
        var _loop_1 = function (i) {
            navs[i].addEventListener('mouseover', function (e) {
                stopAutoplay(info);
                var j = Number(navs[i].textContent) - 1;
                info.index = j;
                indexActive(info);
                slideMove(images, info);
                e.stopPropagation();
            });
            navs[i].addEventListener('mouseout', function (e) {
                var j = Number(navs[i].textContent) - 1;
                info.index = j;
                startAutoplay(images, info);
                e.stopPropagation();
            });
        };
        for (var i = 0; i < navs.length; i++) {
            _loop_1(i);
        }
        container.addEventListener('mouseover', function (e) {
            stopAutoplay(info);
        });
        container.addEventListener('mouseout', function (e) {
            startAutoplay(images, info);
        });
        startAutoplay(images, info);
    }
    function indexActive(info) {
        var navs = getAll('.nav li');
        for (var i = 0; i < navs.length; i++) {
            navs[i].classList.remove('active');
        }
        navs[info.index].classList.add('active');
    }
    function slideMove(obj, info) {
        clearInterval(info.timer.moveTimer);
        info.timer.moveTimer = setInterval(function () {
            var lis = getAll('.imgList li');
            var target = -(lis[info.index].offsetHeight * info.index);
            var speed = (target - obj.offsetTop) / 10;
            if (speed > 0) {
                speed = Math.ceil(speed);
            }
            else {
                speed = Math.floor(speed);
            }
            if (speed === 0) {
                clearInterval(info.timer.moveTimer);
            }
            else {
                obj.style.top = obj.offsetTop + speed + 'px';
            }
        }, 1000 / 60);
    }
    function startAutoplay(obj, info) {
        indexActive(info);
        info.timer.indexTimer = setInterval(function () {
            if (info.leftToRight) {
                info.index++;
            }
            else {
                info.index--;
            }
            if (info.index === 4) {
                info.leftToRight = false;
            }
            else if (info.index === 0) {
                info.leftToRight = true;
            }
            indexActive(info);
            slideMove(obj, info);
        }, 2000);
    }
    function stopAutoplay(info) {
        clearInterval(info.timer.indexTimer);
    }
    main();
})(b7 || (b7 = {}));
//# sourceMappingURL=b7.js.map