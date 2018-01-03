"use strict";
var c10;
(function (c10) {
    var get = function (sel) { return document.querySelector(sel); };
    var getAll = function (sel) { return document.querySelectorAll(sel); };
    var log = console.log.bind(console);
    window.addEventListener('load', main);
    function main() {
        var s = new YXS('.list');
        var next = get('.next');
        var prev = get('.prev');
        if (!next || !prev) {
            return;
        }
        next.addEventListener('click', function (e) {
            s.slideNextMove();
        });
        prev.addEventListener('click', function (e) {
            s.slidePrevMove();
        });
    }
    var YXS = /** @class */ (function () {
        function YXS(id) {
            this.id = id;
            this.setup();
        }
        YXS.prototype.setup = function () {
            this.item = get(this.id);
            this.slides = getAll(this.id + '>li');
            this.numberOfMovingSlides = 7; // hard code, const
            this.movingSlides = [];
            this.movingModeEnabled = false;
            this.movingDuration = 1000; // millseconds
            this.styles = {
                middle: {
                    width: 224,
                    height: 288,
                    top: 0,
                    left: 262,
                    'z-index': 4,
                },
                middleLeft: {
                    width: 170,
                    height: 218,
                    top: 37,
                    left: 110,
                    'z-index': 3,
                },
                leftFar: {
                    width: 130,
                    height: 170,
                    top: 61,
                    left: 0,
                    'z-index': 2,
                },
                leftBehind: {
                    width: 124,
                    height: 154,
                    top: 71,
                    left: 134,
                    'z-index': 1,
                },
                middleRight: {
                    width: 170,
                    height: 218,
                    top: 37,
                    left: 468,
                    'z-index': 3,
                },
                rightFar: {
                    width: 130,
                    height: 170,
                    top: 61,
                    left: 620,
                    'z-index': 2,
                },
                rightBehind: {
                    width: 124,
                    height: 154,
                    top: 71,
                    left: 496,
                    'z-index': 1,
                },
                others: {
                    width: 0,
                    height: 0,
                    top: 37,
                    left: 377,
                    'z-index': 1,
                }
            };
            this.firstGalance();
        };
        // set first five slides' css style
        // 初始化slides的样式
        YXS.prototype.firstGalance = function () {
            if (this.slides.length < 1) {
                return;
            }
            this.clearSlideStyle();
            var ss = this.slides;
            var leftBehind = ss[0];
            var leftFar = ss[1];
            var middleLeft = ss[2];
            var middle = ss[3];
            var middleRight = ss[4];
            var rightFar = ss[5];
            var rightBehind = ss[6];
            this.setStyle(leftBehind, this.styles.leftBehind);
            this.setStyle(leftFar, this.styles.leftFar);
            this.setStyle(middleLeft, this.styles.middleLeft);
            this.setStyle(middle, this.styles.middle);
            this.setStyle(middleRight, this.styles.middleRight);
            this.setStyle(rightFar, this.styles.rightFar);
            this.setStyle(rightBehind, this.styles.rightBehind);
        };
        YXS.prototype.clearSlideStyle = function () {
            // init all slides' css style
            for (var i = 0; i < this.slides.length; i++) {
                if (i < this.numberOfMovingSlides - 1) {
                    this.slides[i].style.display = 'block';
                }
                else {
                    this.slides[i].style.display = 'none';
                    this.setStyle(this.slides[i], {
                        width: this.styles.others.width,
                        height: this.styles.others.height,
                        left: this.styles.others.left,
                        top: this.styles.others.top,
                        'z-index': 1,
                    });
                }
            }
        };
        YXS.prototype.setStyle = function (obj, options) {
            // little hack for 'z-index' property
            for (var p in options) {
                if (options.hasOwnProperty(p)) {
                    if (p === 'z-index' || p === 'zIndex') {
                        obj.style[p] = options[p] + '';
                    }
                    else {
                        obj.style[p] = options[p] + 'px';
                    }
                }
            }
        };
        // update `slides` property to latest value, because of DOM action
        YXS.prototype.updateSlides = function () {
            this.slides = getAll(this.id + '>li');
        };
        // clear every slides' moving timer so that moving is unique(?)
        // 在下一次动画开始前清空每个动画元素的timer，避免动画冲突
        YXS.prototype.clearMovingSlides = function () {
            this.movingSlides.forEach(function (s) {
                clearInterval(s.timer);
            });
            this.movingSlides = [];
        };
        YXS.prototype.slideNextMove = function () {
            if (!this.item || this.slides.length < 1) {
                return;
            }
            this.clearMovingSlides();
            this.movingModeEnabled = true;
            var _first = this.slides[0];
            this.item.appendChild(_first);
            this.updateSlides();
            this.clearSlideStyle();
            var ss = this.slides;
            var leftFar = new AnimationItem(ss[0], this.styles.leftBehind);
            var middleLeft = new AnimationItem(ss[1], this.styles.leftFar);
            var middle = new AnimationItem(ss[2], this.styles.middleLeft);
            var middleRight = new AnimationItem(ss[3], this.styles.middle);
            var rightFar = new AnimationItem(ss[4], this.styles.middleRight);
            var rightBehind = new AnimationItem(ss[5], this.styles.rightFar);
            var newer = new AnimationItem(ss[6], this.styles.rightBehind);
            this.movingSlides.push(leftFar);
            this.movingSlides.push(middleLeft);
            this.movingSlides.push(middle);
            this.movingSlides.push(middleRight);
            this.movingSlides.push(rightFar);
            this.movingSlides.push(rightBehind);
            this.movingSlides.push(newer);
        };
        YXS.prototype.slidePrevMove = function () {
            if (!this.item || this.slides.length < 1) {
                return;
            }
            this.clearMovingSlides();
            this.movingModeEnabled = true;
            var _first = this.slides[0];
            var _last = this.slides[this.slides.length - 1];
            this.item.insertBefore(_last, _first);
            this.updateSlides();
            this.clearSlideStyle();
            var ss = this.slides;
            var newer = new AnimationItem(ss[0], this.styles.leftBehind);
            var leftBehind = new AnimationItem(ss[1], this.styles.leftFar);
            var leftFar = new AnimationItem(ss[2], this.styles.middleLeft);
            var middleLeft = new AnimationItem(ss[3], this.styles.middle);
            var middle = new AnimationItem(ss[4], this.styles.middleRight);
            var middleRight = new AnimationItem(ss[5], this.styles.rightFar);
            var rightFar = new AnimationItem(ss[6], this.styles.rightBehind);
            this.movingSlides.push(newer);
            this.movingSlides.push(leftBehind);
            this.movingSlides.push(leftFar);
            this.movingSlides.push(middleLeft);
            this.movingSlides.push(middle);
            this.movingSlides.push(middleRight);
            this.movingSlides.push(rightFar);
        };
        return YXS;
    }());
    var AnimationItem = /** @class */ (function () {
        function AnimationItem(item, options, callback) {
            this.item = item;
            this.options = options;
            this.callback = callback;
            this.setup();
        }
        AnimationItem.prototype.setup = function () {
            this.timer = 0;
            this.start();
        };
        AnimationItem.prototype.start = function () {
            var _this = this;
            clearInterval(this.timer);
            this.timer = setInterval(function () {
                _this.move();
            }, 1000 / 60);
        };
        AnimationItem.prototype.css = function (attr, value) {
            if (arguments.length === 1) {
                var style = window.getComputedStyle(this.item);
                return parseFloat(style[attr]);
            }
            else if (arguments.length === 2) {
                if (attr === 'opacity') {
                    this.item.style.opacity = value / 100 + '';
                }
                else if (attr === 'z-index' || attr === 'zIndex') {
                    this.item.style[attr] = value + '';
                }
                else {
                    this.item.style[attr] = value + 'px';
                }
            }
            return;
        };
        AnimationItem.prototype.move = function () {
            var complete = false;
            for (var p in this.options) {
                if (p === 'z-index' || p === 'zIndex') {
                    this.item.style.zIndex = this.options[p] + '';
                    continue;
                }
                complete = false;
                var value = 0;
                if (p === 'opacity') {
                    var num = this.css(p);
                    value = parseInt(Number(num.toFixed(2)) * 100 + '');
                }
                else {
                    value = this.css(p);
                }
                var speed = (this.options[p] - value) / 5;
                if (speed > 0) {
                    speed = Math.ceil(speed);
                }
                else {
                    speed = Math.floor(speed);
                }
                this.css(p, value + speed);
                if (this.options[p] === value) {
                    complete = true;
                }
                // log('hi')
            }
            if (complete) {
                clearInterval(this.timer);
                // log('over')
                if (this.callback) {
                    this.callback();
                }
            }
        };
        return AnimationItem;
    }());
})(c10 || (c10 = {}));
//# sourceMappingURL=c10.js.map