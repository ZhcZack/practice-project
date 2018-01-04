"use strict";
var f10;
(function (f10) {
    var get = function (sel) { return document.querySelector(sel); };
    var getAll = function (sel) { return document.querySelectorAll(sel); };
    var log = console.log.bind(console);
    window.addEventListener('load', main);
    function main() {
        var slide = new SmoothySlide('.list');
        var prev = get('.prev');
        var next = get('.next');
        if (!prev || !next) {
            return;
        }
        prev.addEventListener('click', function () {
            if (!slide.isSliding) {
                slide.prevMove();
            }
        });
        next.addEventListener('click', function () {
            if (!slide.isSliding) {
                slide.nextMove();
            }
        });
    }
    var SmoothySlide = /** @class */ (function () {
        function SmoothySlide(id) {
            this.id = id;
            this.setup();
        }
        SmoothySlide.prototype.setup = function () {
            this.list = get(this.id);
            this.slides = getAll(this.id + ' > li');
            // properties
            this.timer = 0;
            this.isSliding = false;
        };
        SmoothySlide.prototype.updateSlidesProperty = function () {
            this.slides = getAll(this.id + ' > li');
        };
        // target: stop position
        // distance: start position
        SmoothySlide.prototype.move = function (stopPosition, startPosition, callback) {
            var _this = this;
            if (!this.list) {
                return;
            }
            this.timer = setInterval(function () {
                var speed = (stopPosition - startPosition) / 10;
                if (speed > 0) {
                    speed = Math.ceil(speed);
                }
                else {
                    speed = Math.floor(speed);
                }
                _this.list.style.top = _this.list.offsetTop + speed + 'px';
                startPosition += speed;
                if (speed === 0) {
                    clearInterval(_this.timer);
                    _this.isSliding = false;
                    if (callback) {
                        callback();
                    }
                }
            }, 1000 / 60);
        };
        // three steps
        // 1: move last item to first place
        // 2: set list's position to hide first item, css 'left' or 'top' property maybe negative
        // 3: make first item 'slide in', css 'left' or 'top' should be zero
        SmoothySlide.prototype.prevMove = function () {
            if (!this.list || this.slides.length < 1) {
                return;
            }
            this.isSliding = true;
            // portrait moving, should change css property 'top'
            var first = this.slides[0];
            var last = this.slides[this.slides.length - 1];
            var h = last.offsetHeight;
            this.list.insertBefore(last, first);
            this.updateSlidesProperty();
            this.list.style.top = -1 * h + 'px';
            this.move(0, -1 * h);
        };
        // three steps
        // 1: slide to show next item, the next item maybe in the right or bottom, 
        // so css property 'left' or 'top' should be negative
        // 2: move first item to last place
        // 3: set list's position to 'origin', means css 'left' or 'top' property should be zero
        // tips: 2, 3 steps should be in 1 step's callback method
        SmoothySlide.prototype.nextMove = function () {
            var _this = this;
            if (!this.list || this.slides.length < 1) {
                return;
            }
            this.isSliding = true;
            // portrait moving, should change css property 'top'
            var first = this.slides[0];
            var last = this.slides[this.slides.length - 1];
            var h = first.offsetHeight;
            var back = function () {
                _this.list.appendChild(first);
                _this.updateSlidesProperty();
                _this.list.style.top = '0';
            };
            this.move(-1 * h, 0, back);
        };
        return SmoothySlide;
    }());
})(f10 || (f10 = {}));
//# sourceMappingURL=f10.js.map