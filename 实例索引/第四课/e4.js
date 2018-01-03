"use strict";
var e4;
(function (e4) {
    var get = function (sel) { return document.querySelector(sel); };
    var getAll = function (sel) { return document.querySelectorAll(sel); };
    var log = console.log.bind(console);
    function main() {
        slideImage();
    }
    function slideImage() {
        var display = get('.display');
        var images = getAll('.imgList img');
        var navs = getAll('.nav li');
        var timer = 0;
        var index = {
            i: 0
        };
        if (!display || images.length === 0 || navs.length === 0) {
            return;
        }
        showActive(index, display, images, navs);
        timer = setTimer(index, display, images, navs);
        bind(index, display, images, navs, timer);
    }
    function bind(index, display, images, navs, timer) {
        var _loop_1 = function (j) {
            navs[j].addEventListener('mouseover', function (e) {
                var i = Number(navs[j].textContent) - 1;
                index.i = i;
                showActive(index, display, images, navs);
                clearInterval(timer);
            });
        };
        for (var j = 0; j < navs.length; j++) {
            _loop_1(j);
        }
        display.addEventListener('mouseover', function (e) {
            clearInterval(timer);
        });
        display.addEventListener('mouseout', function (e) {
            timer = setTimer(index, display, images, navs);
        });
    }
    function showActive(index, display, images, navs) {
        display.setAttribute('src', images[index.i].src);
        for (var i = 0; i < navs.length; i++) {
            navs[i].classList.remove('active');
        }
        navs[index.i].classList.add('active');
    }
    function setTimer(index, display, images, navs) {
        var timer = setInterval(function () {
            index.i++;
            if (index.i > 4) {
                index.i = 0;
            }
            showActive(index, display, images, navs);
            animation(display);
        }, 2000);
        return timer;
    }
    function animation(display) {
        var o = 0;
        display.style.opacity = '' + o;
        var t = setInterval(function () {
            o += 2;
            if (o > 100) {
                o = 100;
            }
            display.style.opacity = '' + o / 100;
            if (o === 100) {
                clearInterval(t);
            }
        }, 1000 / 50);
    }
    main();
})(e4 || (e4 = {}));
//# sourceMappingURL=e4.js.map