"use strict";
var k10;
(function (k10) {
    var get = function (sel) { return document.querySelector(sel); };
    var getAll = function (sel) { return document.querySelectorAll(sel); };
    var log = console.log.bind(console);
    window.addEventListener('load', main);
    function main() {
        var data = [
            { width: 20, height: 20 },
            { width: 80, height: 80 },
            { left: 10 }, { left: 408 },
            { opacity: 100 },
            { opacity: 0 },
            { opacity: 100 },
            { width: 80, height: 80, left: 408 },
            { top: 10 },
            { width: 20, height: 20, left: 468 },
            { top: 70 },
            { left: 10 },
            { top: 10 },
            { left: 468 },
            { width: 20, height: 20, left: 468 },
            { width: 80, height: 80, left: 408 }
        ];
        var order = true;
        var index = 0;
        var span = get('span');
        var input = get('input');
        if (!span || !input) {
            return;
        }
        var obj = new Animation(span, data[index]);
        input.addEventListener('click', function () {
            input.disabled = true;
            obj.callback = begin;
            function begin(obj) {
                if (order) {
                    index++;
                }
                else {
                    index--;
                }
                if (index === data.length || index < 0) {
                    clearInterval(obj.timer);
                    order = !order;
                    input.value = order ? "\u5f00\u59cb" : "\u539f\u8def\u8fd4\u56de";
                    input.disabled = false;
                    return;
                }
                // 垃圾代码
                log(data[index]);
                obj.options = data[index];
                obj.timer = setInterval(function () {
                    obj.move();
                }, 1000 / 60);
            }
            begin(obj);
        });
    }
    var Animation = /** @class */ (function () {
        function Animation(element, options, callback) {
            this.element = element;
            this.options = options;
            this.callback = callback;
            this.init();
        }
        Animation.prototype.init = function () {
            var _this = this;
            clearInterval(this.timer);
            this.timer = setInterval(function () {
                _this.move();
            }, 1000 / 60);
        };
        Animation.prototype.css = function (attr, value) {
            if (arguments.length === 1) {
                var style = window.getComputedStyle(this.element);
                return parseFloat(style[attr]);
            }
            else if (arguments.length === 2) {
                if (attr === 'opacity') {
                    this.element.style.opacity = value / 100 + '';
                }
                else {
                    this.element.style[attr] = value + 'px';
                }
            }
            return 0;
        };
        Animation.prototype.move = function () {
            if (!this.callback) {
                clearInterval(this.timer);
                return;
            }
            var complete = false;
            for (var p in this.options) {
                complete = false;
                var value = 0;
                if (p === 'opacity') {
                    value = parseInt(Number(this.css(p).toFixed(2)) * 100 + '');
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
                if (this.callback) {
                    this.callback(this);
                }
            }
        };
        return Animation;
    }());
})(k10 || (k10 = {}));
//# sourceMappingURL=k10.js.map