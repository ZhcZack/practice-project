"use strict";
var b10;
(function (b10) {
    // 需要考虑一下如何解决事件函数的this问题
    var get = function (sel) { return document.querySelector(sel); };
    var getAll = function (sel) { return document.querySelectorAll(sel); };
    var log = console.log.bind(console);
    var getIndex = function (obj) {
        var parent = obj.parentElement;
        if (parent) {
            for (var i = 0; i < parent.children.length; i++) {
                if (parent.children[i] === obj) {
                    return i;
                }
            }
        }
        return -1; // obj not found
    };
    window.addEventListener('load', main);
    function main() {
        var t = new TAB('.item');
    }
    var TAB = /** @class */ (function () {
        function TAB(id) {
            this.id = id;
            this.setup();
            this.index = 0;
        }
        TAB.prototype.setup = function () {
            this.item = get(this.id);
            this.tab = get(this.id + ' .tab ul');
            this.tabList = getAll(this.id + ' .tab ul li');
            this.lists = getAll(this.id + '>.items');
            this.navs = getAll(this.id + ' .tab .switchBtn a');
            this.setupEvents();
        };
        TAB.prototype.setupEvents = function () {
            var _this = this;
            if (!this.tab || this.tabList.length < 1) {
                return;
            }
            this.tab.addEventListener('mouseover', function (e) {
                var target = e.target;
                for (var i = 0; i < _this.tabList.length; i++) {
                    _this.tabList[i].classList.remove('current');
                }
                target.classList.add('current');
                e.stopPropagation();
            });
            this.navEvents();
        };
        TAB.prototype.navEvents = function () {
            if (this.navs.length < 1) {
                return;
            }
            var prev = this.navs[0];
            var next = this.navs[1];
            var self = this;
            prev.addEventListener('click', prevClick);
            next.addEventListener('click', nextClick);
            function nextClick(e) {
                if (this.classList.contains('nextNot')) {
                    return;
                }
                for (var i = 0; i < self.index; i++) {
                    self.tabList[i].style.display = 'none';
                }
                self.index++;
                self.tabList[self.index].style.display = 'block';
                self.switchTab();
                e.stopPropagation();
            }
            function prevClick(e) {
                if (this.classList.contains('prevNot')) {
                    return;
                }
                self.tabList[self.index].style.display = 'block';
                self.index--;
                self.tabList[self.index].style.display = 'block';
                self.switchTab();
                e.stopPropagation();
            }
        };
        TAB.prototype.switchTab = function () {
            for (var i = 0; i < this.lists.length; i++) {
                this.lists[i].style.display = 'none';
                this.tabList[i].className = '';
            }
            this.lists[this.index].style.display = 'block';
            this.tabList[this.index].className = 'current';
            this.navs[0].className = this.index === 0 ? 'prevNot' : 'prev';
            this.navs[1].className = this.index === this.tabList.length - 1 ?
                'nextNot' : 'next';
        };
        return TAB;
    }());
})(b10 || (b10 = {}));
//# sourceMappingURL=b10.js.map