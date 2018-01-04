"use strict";
var h10;
(function (h10) {
    var get = function (sel) { return document.querySelector(sel); };
    var getAll = function (sel) { return document.querySelectorAll(sel); };
    var log = console.log.bind(console);
    window.addEventListener('load', main);
    function main() {
        var s = new Slide('#container');
        window.addEventListener('click', function () {
            s.slideNextMove();
        });
    }
    var Slide = /** @class */ (function () {
        function Slide(id) {
            this.id = id;
            this.setup();
        }
        Slide.prototype.setup = function () {
            this.item = get(this.id);
            this.slides = getAll(this.id + '>div');
            this.numberOfMovingSlides = 5; // hard code, const
            this.movingSlides = [];
            this.movingModeEnabled = false;
            this.firstGalance();
        };
        // set first five slides' css style
        Slide.prototype.firstGalance = function () {
            this.clearSlideStyle();
        };
        Slide.prototype.clearSlideStyle = function () {
            // init all slides' css style
            var ss = this.slides;
            for (var i = 0; i < ss.length; i++) {
                ss[i].className = 'item';
                switch (i) {
                    case 0:
                        ss[0].classList.add('left-far');
                        break;
                    case 1:
                        ss[1].classList.add('middle-left');
                        break;
                    case 2:
                        ss[2].classList.add('middle');
                        break;
                    case 3:
                        ss[3].classList.add('middle-right');
                        break;
                    case 4:
                        ss[4].classList.add('right-far');
                        break;
                    default:
                        ss[i].classList.add('others');
                }
            }
        };
        // update `slides` property to latest value, because of DOM action
        Slide.prototype.updateSlides = function () {
            this.slides = getAll(this.id + '>div');
        };
        // clear every slides' moving timer so that moving is unique(?)
        Slide.prototype.clearMovingSlides = function () {
            this.movingSlides.forEach(function (s) {
                clearInterval(s);
            });
            this.movingSlides = [];
        };
        Slide.prototype.slideNextMove = function () {
            this.clearMovingSlides();
            if (!this.item || this.slides.length < 1) {
                return;
            }
            var _first = this.slides[0];
            this.item.appendChild(_first);
            this.updateSlides();
            this.clearSlideStyle();
        };
        Slide.prototype.slidePrevMove = function () {
            this.clearMovingSlides();
            if (!this.item || this.slides.length < 1) {
                return;
            }
            var _first = this.slides[0];
            var _last = this.slides[this.slides.length - 1];
            this.item.insertBefore(_last, _first);
            this.updateSlides();
            this.clearSlideStyle();
        };
        return Slide;
    }());
})(h10 || (h10 = {}));
//# sourceMappingURL=h10.js.map