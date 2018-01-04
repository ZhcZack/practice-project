"use strict";
var i10;
(function (i10) {
    var get = function (sel) { return document.querySelector(sel); };
    var getAll = function (sel) { return document.querySelectorAll(sel); };
    var log = console.log.bind(console);
    window.addEventListener('load', main);
    function main() {
        var slide = new SlideImage('.container');
    }
    var SlideImage = /** @class */ (function () {
        function SlideImage(identifier) {
            this.identifier = identifier;
            this.setup();
        }
        // manually start slide move
        SlideImage.prototype.start = function () {
            this.setup();
        };
        // initial values
        SlideImage.prototype.setup = function () {
            this.container = get(this.identifier);
            this.images = get(this.identifier + ' .imgList');
            this.navs = getAll(this.identifier + ' .nav li');
            this.indexTimer = 0;
            this.moveTimer = 0;
            this.index = 0;
            this.leftToRight = true;
            this.initEvents();
            this.startAutoplay();
        };
        SlideImage.prototype.initEvents = function () {
            if (!this.container || this.navs.length < 1) {
                return;
            }
            var self = this;
            this.container.addEventListener('mouseover', containerMouseoverEvent);
            this.container.addEventListener('mouseout', containerMouseoutEvent);
            for (var i = 0; i < this.navs.length; i++) {
                this.navs[i].addEventListener('mouseover', navMouseoverEvent);
                this.navs[i].addEventListener('mouseout', navMouseoutEvent);
            }
            function containerMouseoverEvent(e) {
                self.stopAutoplay();
                e.stopPropagation();
            }
            function containerMouseoutEvent(e) {
                self.startAutoplay();
            }
            function navMouseoverEvent(e) {
                self.stopAutoplay();
                var i = Number(this.textContent) - 1;
                self.index = i;
                self.indexActive();
                self.slideMove();
                e.stopPropagation();
            }
            function navMouseoutEvent(e) {
                var i = Number(this.textContent) - 1;
                self.index = i;
                self.startAutoplay();
                e.stopPropagation();
            }
        };
        // check which one is current slide page and set its index 'active'
        SlideImage.prototype.indexActive = function () {
            for (var i = 0; i < this.navs.length; i++) {
                this.navs[i].classList.remove('active');
            }
            this.navs[this.index].classList.add('active');
        };
        // image list moving method
        SlideImage.prototype.slideMove = function () {
            var _this = this;
            var obj = this.images;
            if (!obj) {
                return;
            }
            clearInterval(this.moveTimer);
            this.moveTimer = setInterval(function () {
                var lis = getAll(_this.identifier + ' .imgList li');
                var target = -(lis[_this.index].offsetHeight * _this.index);
                var speed = (target - obj.offsetTop) / 10;
                if (speed > 0) {
                    speed = Math.ceil(speed);
                }
                else {
                    speed = Math.floor(speed);
                }
                if (speed === 0) {
                    clearInterval(_this.moveTimer);
                }
                else {
                    obj.style.top = obj.offsetTop + speed + 'px';
                }
            }, 1000 / 60);
        };
        SlideImage.prototype.startAutoplay = function () {
            var _this = this;
            this.indexActive();
            this.indexTimer = setInterval(function () {
                if (_this.leftToRight) {
                    _this.index++;
                }
                else {
                    _this.index--;
                }
                if (_this.index === 4) {
                    _this.leftToRight = false;
                }
                else if (_this.index === 0) {
                    _this.leftToRight = true;
                }
                _this.indexActive();
                _this.slideMove();
            }, 2000);
        };
        SlideImage.prototype.stopAutoplay = function () {
            clearInterval(this.indexTimer);
        };
        return SlideImage;
    }());
})(i10 || (i10 = {}));
//# sourceMappingURL=i10.js.map