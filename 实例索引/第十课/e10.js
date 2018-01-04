"use strict";
var e10;
(function (e10) {
    var get = function (sel) { return document.querySelector(sel); };
    var getAll = function (sel) { return document.querySelectorAll(sel); };
    var log = console.log.bind(console);
    window.addEventListener('load', main);
    function main() {
        var item = new DragItem('#drag');
        var buttons = getAll('.buttons button');
        var areaLock = buttons[0];
        var xLock = buttons[1];
        var yLock = buttons[2];
        var locationLock = buttons[3];
        var status = get('.drag-status');
        if (buttons.length < 1 || !status) {
            return;
        }
        item.onStart = function () {
            status.textContent = '开始拖拽';
        };
        item.onStop = function () {
            status.textContent = '结束拖拽';
        };
        item.onMove = function () {
            var p = item.position();
            if (p) {
                status.textContent = 'x: ' + p.x + ', y: ' + p.y;
            }
        };
        areaLock.addEventListener('click', function () {
            item.areaLock = !item.areaLock;
            areaLock.textContent = item.areaLock ? '取消锁定范围' : '锁定范围';
        });
        xLock.addEventListener('click', function () {
            item.xLock = !item.xLock;
            xLock.textContent = item.xLock ? '取消水平锁定' : '水平锁定';
        });
        yLock.addEventListener('click', function () {
            item.yLock = !item.yLock;
            yLock.textContent = item.yLock ? '取消垂直锁定' : '垂直锁定';
        });
        locationLock.addEventListener('click', function () {
            item.locationLock = !item.locationLock;
            locationLock.textContent = item.locationLock ? '取消锁定位置' : '锁定位置';
        });
    }
    var DragItem = /** @class */ (function () {
        function DragItem(id) {
            this.id = id;
            this.setup();
        }
        DragItem.prototype.setup = function () {
            this.item = get(this.id);
            this.titleItem = get(this.id + ' .drag-title');
            // properties
            this.dragEnabled = false;
            this.startX = 0;
            this.startY = 0;
            this.areaLock = false;
            this.xLock = false;
            this.yLock = false;
            this.locationLock = false;
            // callback methods
            this.onStart = null;
            this.onMove = null;
            this.onStop = null;
            // mouse events
            this.mouseEvents();
        };
        DragItem.prototype.mouseEvents = function () {
            if (!this.titleItem) {
                return;
            }
            var self = this;
            this.titleItem.addEventListener('mousedown', mousedownEvent);
            this.titleItem.addEventListener('mouseup', mouseupEvent);
            this.titleItem.addEventListener('mousemove', mousemoveEvent);
            function mousedownEvent(e) {
                if (!self.item) {
                    return;
                }
                self.item.style.position = 'absolute';
                self.dragEnabled = true;
                self.startX = e.clientX;
                self.startY = e.clientY;
                e.stopPropagation();
                if (self.onStart) {
                    self.onStart();
                }
            }
            function mouseupEvent(e) {
                self.dragEnabled = false;
                e.stopPropagation();
                if (self.onStop) {
                    self.onStop();
                }
            }
            function mousemoveEvent(e) {
                if (!self.dragEnabled || !self.item) {
                    return;
                }
                var dx = e.clientX - self.startX;
                var dy = e.clientY - self.startY;
                self.startX = e.clientX;
                self.startY = e.clientY;
                if (self.xLock) {
                    self.css(self.item, 'top', self.css(self.item, 'top') + dy);
                }
                else if (self.yLock) {
                    self.css(self.item, 'left', self.css(self.item, 'left') + dx);
                }
                else if (self.locationLock) {
                    // do nothing
                }
                else {
                    self.css(self.item, 'left', self.css(self.item, 'left') + dx);
                    self.css(self.item, 'top', self.css(self.item, 'top') + dy);
                }
                if (self.areaLock) {
                    self.moveWithLimits();
                }
                e.stopPropagation();
                if (self.onMove) {
                    self.onMove();
                }
            }
        };
        // css function
        DragItem.prototype.css = function (obj, attr, value) {
            if (arguments.length === 2) {
                var style = window.getComputedStyle(obj);
                var value_1 = 0;
                if (attr === 'opacity') {
                    value_1 = parseInt(Number(parseFloat(style.opacity).toFixed(2)) * 100 + '', 10);
                }
                else {
                    value_1 = parseInt(style[attr], 10);
                }
                return value_1;
            }
            else if (arguments.length === 3) {
                if (attr === 'opacity') {
                    obj.style.opacity = value / 100 + '';
                }
                else {
                    obj.style[attr] = value + 'px';
                }
            }
            return 0;
        };
        // when 'areaLock' is true, item's moving should be with limits
        DragItem.prototype.moveWithLimits = function () {
            var maxWidth = window.innerWidth;
            var maxHeight = window.innerHeight;
            if (!this.item) {
                return;
            }
            if (this.css(this.item, 'left') <= 0) {
                this.css(this.item, 'left', 0);
            }
            else if (this.css(this.item, 'left') + this.css(this.item, 'width') >= maxWidth) {
                this.css(this.item, 'left', maxWidth - this.css(this.item, 'width'));
            }
            if (this.css(this.item, 'top') <= 0) {
                this.css(this.item, 'top', 0);
            }
            else if (this.css(this.item, 'top') + this.css(this.item, 'height') >= maxHeight) {
                this.css(this.item, 'top', maxHeight - this.css(this.item, 'height'));
            }
        };
        // this is a computed property
        DragItem.prototype.position = function () {
            if (!this.dragEnabled || !this.item) {
                return;
            }
            var p = {
                x: this.css(this.item, 'left'),
                y: this.css(this.item, 'top'),
            };
            return p;
        };
        return DragItem;
    }());
})(e10 || (e10 = {}));
//# sourceMappingURL=e10.js.map