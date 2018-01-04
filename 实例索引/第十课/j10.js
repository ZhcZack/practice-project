"use strict";
var j10;
(function (j10) {
    var get = function (sel) { return document.querySelector(sel); };
    var getAll = function (sel) { return document.querySelectorAll(sel); };
    var log = console.log.bind(console);
    // class AnimationItem {
    //     private timer: number
    //     constructor(private id: string, options: any) {
    //         this.setup()
    //     }
    //     var o = {
    //     id: id,
    //     options: options,
    //     timer: null
    //     private setup() {
    //     this.item = document.querySelector(this.id)
    //     this.timer = 0
    // }
    // o.start = function () {
    //     var self = this
    //     clearInterval(this.timer)
    //     this.timer = setInterval(function () {
    //         self.move()
    //     }, 1000 / 60)
    // }
    // o.css = function (attr, value) {
    //     if (arguments.length === 1) {
    //         var style = window.getComputedStyle(this.item, null)
    //         return parseFloat(style[attr])
    //     } else if (arguments.length === 2) {
    //         if (attr === 'opacity') {
    //             this.item.style.opacity = value / 100
    //         } else {
    //             this.item.style[attr] = value + 'px'
    //         }
    //     }
    // }
    // o.move = function () {
    //     var complete = false
    //     for (var p in this.options) {
    //         complete = false
    //         var value = 0
    //         if (p === 'opacity') {
    //             value = parseInt(this.css(p).toFixed(2) * 100)
    //         } else {
    //             value = this.css(p)
    //         }
    //         var speed = (this.options[p] - value) / 5
    //         if (speed > 0) {
    //             speed = Math.ceil(speed)
    //         } else {
    //             speed = Math.floor(speed)
    //         }
    //         this.css(p, value + speed)
    //         if (this.options[p] === value) {
    //             complete = true
    //         }
    //         // log('hi')
    //     }
    //     if (complete) {
    //         clearInterval(this.timer)
    //     }
    // }
    // o.setup()
    // return o
    // }
    var d = document.querySelector('div');
    window.addEventListener('click', function () {
        if (d) {
            d.classList.add('display');
        }
    });
})(j10 || (j10 = {}));
//# sourceMappingURL=j10.js.map