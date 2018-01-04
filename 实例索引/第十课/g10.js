"use strict";
var g10;
(function (g10) {
    var get = function (sel) { return document.querySelector(sel); };
    var getAll = function (sel) { return document.querySelectorAll(sel); };
    var log = console.log.bind(console);
    window.addEventListener('load', main);
    function main() {
        // bad code, improvement required. start with PuzzleGame
        var game1 = new PuzzleGame('.photo-wall');
        // var game2 = new PuzzleGame('.photo-wall-2')
        var btn1 = getAll('.random-display')[0];
        // var btn2 = getAll('.random-display')[1]
        btn1.addEventListener('click', function () {
            game1.randomDisplay();
        });
        // btn2.addEventListener('click', () => {
        //     game2.randomDisplay()
        // })
    }
    var PuzzleGame = /** @class */ (function () {
        function PuzzleGame(identifier) {
            this.identifier = identifier;
            this.box = get(this.identifier);
            this.puzzles = getAll(this.identifier + ' li');
            this.started = false;
            // timers for moving
            this.timer = 0;
            this.timers = [];
            this.chosenPuzzle = null;
            this.setup();
        }
        // init puzzles style,  position and mouse events
        PuzzleGame.prototype.setup = function () {
            if (this.puzzles.length < 1 || !this.box) {
                return;
            }
            // this.isGameStarted = true
            // style and position
            var w = this.puzzles[0].offsetWidth;
            var h = this.puzzles[0].offsetHeight;
            var maxHeight = this.box.offsetHeight;
            var margin = 10;
            this.box.style.height = maxHeight + 'px';
            for (var i = 0; i < this.puzzles.length; i++) {
                this.puzzles[i].style.position = 'absolute';
                this.puzzles[i].dataset.move = i + '';
                if (i <= 4) {
                    this.puzzles[i].style.top = 0 + 'px';
                    this.puzzles[i].style.left = i * w + margin * i + 'px';
                }
                else if (i >= 5 && i <= 9) {
                    this.puzzles[i].style.top = h + margin + 'px';
                    this.puzzles[i].style.left = (i - 5) * w + margin * (i - 5) + 'px';
                }
                else if (i >= 10 && i <= 14) {
                    this.puzzles[i].style.top = h * 2 + margin * 2 + 'px';
                    this.puzzles[i].style.left = (i - 10) * w + margin * (i - 10) + 'px';
                }
                else {
                    this.puzzles[i].style.top = h * 3 + margin * 3 + 'px';
                    this.puzzles[i].style.left = (i - 15) * w + margin * (i - 15) + 'px';
                }
            }
            this.mouseEvents();
        };
        PuzzleGame.prototype.randomDisplay = function () {
            if (this.puzzles.length < 1) {
                return;
            }
            var length = this.puzzles.length;
            var number = length - 4; // 16 -- same as hard code
            var ps = [];
            while (ps.length !== number) {
                var n = Math.ceil(Math.random() * (length - 1));
                if (ps.indexOf(n) >= 0) {
                    n = Math.ceil(Math.random() * (length - 1));
                }
                else {
                    ps.push(n);
                }
            }
            log(ps);
            this.timers = Array(ps.length / 2);
            for (var i = 0; i < this.timers.length; i++) {
                var first = ps.shift();
                var last = ps.pop();
                if (first && last) {
                    this.puzzlesMoving(this.puzzles[first], this.puzzles[last], this.timers[i]);
                }
            }
        };
        // game start
        PuzzleGame.prototype.start = function () {
            if (!this.box) {
                return;
            }
            // game start
            this.started = true;
            this.setup();
            // mouse events
            this.isDrag = false;
            this.isMoving = false;
            this.startX = 0;
            this.startY = 0;
            this.maxWidth = this.box.offsetWidth;
            this.maxHeight = this.box.offsetHeight;
        };
        // restart puzzle game
        PuzzleGame.prototype.restart = function () {
            this.setup();
        };
        // prevent puzzle out of box's boundary
        PuzzleGame.prototype.moveWithLimits = function (obj) {
            // move with limits
            if (obj.offsetLeft <= 0) {
                obj.style.left = '0';
            }
            else if (obj.offsetLeft + obj.offsetWidth >= this.maxWidth) {
                obj.style.left = this.maxWidth - obj.offsetWidth + 'px';
            }
            if (obj.offsetTop <= 0) {
                obj.style.top = '0';
            }
            else if (obj.offsetTop + obj.offsetHeight >= this.maxHeight) {
                obj.style.top = this.maxHeight - obj.offsetHeight + 'px';
            }
        };
        // declare the puzzle moving with mouse is puzzle 'chosen'
        // check which puzzle of puzzles left in box is the puzzle 'item', 
        // which will change position with puzzle 'chosen'
        // 标记跟随鼠标移动的puzzle为'chosen'
        // 找到其他剩余puzzle中的'item'， 'item'是会与'chosen'交换位置的puzzle
        PuzzleGame.prototype.identifyMovingPuzzles = function (obj, x, y) {
            // obj is the puzzle 'chosen'
            // x, y is the mouse coordinate
            for (var j = 0; j < this.puzzles.length; j++) {
                this.puzzles[j].classList.remove('chosen', 'item');
                obj.classList.add('chosen');
                var rect = this.puzzles[j].getBoundingClientRect();
                if (x >= rect.left && x <= rect.left + rect.width) {
                    if (y >= rect.top && y <= rect.top + rect.height) {
                        // log('-----before----------')
                        // log('mouse x: ' + e.clientX + ', mouse y: ' + e.clientY)
                        // log('li left: ' + rect.left + ', li right: ' + rect.right)
                        // log('li top: ' + rect.top + ', li bottom: ' + rect.bottom)
                        // log('-----after----------')
                        if (!this.puzzles[j].classList.contains('already')) {
                            this.puzzles[j].classList.add('item');
                        }
                        obj.classList.remove('item');
                    }
                }
            }
        };
        // determine every puzzles is on its right position
        // 判断每一块puzzle是否处于正确的位置上，如果都是就结束游戏
        // private puzzleIsOnRightPosition() {
        //     const targetLength = this.puzzles.length
        //     let length = 0
        //     // 判断puzzle是否处于正确的位置上
        //     for (var i = 0; i < this.puzzles.length; i++) {
        //         if (this.puzzles[i].dataset.move === this.puzzles[i].dataset.index) {
        //             this.puzzles[i].classList.add('already')
        //             length++
        //         }
        //     }
        //     if (length === targetLength) {
        //         this.end()
        //     }
        // }
        // puzzle 'chosen' move back to its original position
        // 没有匹配到puzzle的时候，跟随鼠标移动的'chosen'回到它之前的位置
        PuzzleGame.prototype.restorePuzzle = function (obj) {
            var _this = this;
            log('restore');
            // log('not have item')
            // 只有拖动的那一块可以移动的情况
            var startX = 0;
            var startY = 0;
            var margin = 10;
            var index = Number(obj.dataset.move);
            var w = obj.offsetWidth;
            var h = obj.offsetHeight;
            if (index <= 4) {
                startX = index * w + margin * index;
                startY = 0;
            }
            else if (index >= 5 && index <= 9) {
                startX = (index - 5) * w + margin * (index - 5);
                startY = h + margin;
            }
            else if (index >= 10 && index <= 14) {
                startX = (index - 10) * w + margin * (index - 10);
                startY = h * 2 + margin * 2;
            }
            else {
                startX = (index - 15) * w + (index - 15) * margin;
                startY = h * 3 + margin * 3;
            }
            // log(x, y)
            // log(x, y)
            clearInterval(this.timer);
            this.timer = setInterval(function () {
                var speedX = (startX - obj.offsetLeft) / 10;
                var speedY = (startY - obj.offsetTop) / 10;
                if (speedX > 0) {
                    speedX = Math.ceil(speedX);
                }
                else {
                    speedX = Math.floor(speedX);
                }
                if (speedY > 0) {
                    speedY = Math.ceil(speedY);
                }
                else {
                    speedY = Math.floor(speedY);
                }
                if (speedX === 0 && speedY === 0) {
                    _this.isMoving = false;
                    clearInterval(_this.timer);
                    obj.classList.remove('chosen');
                }
                // log(speedX, speedY)
                obj.style.left = obj.offsetLeft + speedX + 'px';
                obj.style.top = obj.offsetTop + speedY + 'px';
            }, 1000 / 60);
        };
        // puzzle 'chosen' and puzzle 'item' change positions with other
        // 'chosen'和'item'两块puzzle互换位置
        PuzzleGame.prototype.puzzlesMoving = function (item, chosen, timer) {
            // 两块puzzle都可以移动的情况
            var _this = this;
            // 需要写清楚开始和结束的坐标
            // start是chosen元素
            // end是item元素
            var startX = 0;
            var startY = 0;
            var endX = item.offsetLeft;
            var endY = item.offsetTop;
            var chosenIndex = Number(chosen.dataset.move);
            var itemIndex = Number(item.dataset.move);
            var w = chosen.offsetWidth;
            var h = chosen.offsetHeight;
            var margin = 10;
            if (chosenIndex <= 4) {
                startX = chosenIndex * w + margin * chosenIndex;
                startY = 0;
            }
            else if (chosenIndex >= 5 && chosenIndex <= 9) {
                startX = (chosenIndex - 5) * w + margin * (chosenIndex - 5);
                startY = h + margin;
            }
            else if (chosenIndex >= 10 && chosenIndex <= 14) {
                startX = (chosenIndex - 10) * w + margin * (chosenIndex - 10);
                startY = h * 2 + margin * 2;
            }
            else {
                startX = (chosenIndex - 15) * w + (chosenIndex - 15) * margin;
                startY = h * 3 + margin * 3;
            }
            clearInterval(timer);
            timer = setInterval(function () {
                var itemSpeedX = (startX - item.offsetLeft) / 10;
                var itemSpeedY = (startY - item.offsetTop) / 10;
                if (itemSpeedX > 0) {
                    itemSpeedX = Math.ceil(itemSpeedX);
                }
                else {
                    itemSpeedX = Math.floor(itemSpeedX);
                }
                if (itemSpeedY > 0) {
                    itemSpeedY = Math.ceil(itemSpeedY);
                }
                else {
                    itemSpeedY = Math.floor(itemSpeedY);
                }
                var chosenSpeedX = (endX - chosen.offsetLeft) / 10;
                var chosenSpeedY = (endY - chosen.offsetTop) / 10;
                if (chosenSpeedX > 0) {
                    chosenSpeedX = Math.ceil(chosenSpeedX);
                }
                else {
                    chosenSpeedX = Math.floor(chosenSpeedX);
                }
                if (chosenSpeedY > 0) {
                    chosenSpeedY = Math.ceil(chosenSpeedY);
                }
                else {
                    chosenSpeedY = Math.floor(chosenSpeedY);
                }
                item.style.left = item.offsetLeft + itemSpeedX + 'px';
                item.style.top = item.offsetTop + itemSpeedY + 'px';
                chosen.style.left = chosen.offsetLeft + chosenSpeedX + 'px';
                chosen.style.top = chosen.offsetTop + chosenSpeedY + 'px';
                if (chosenSpeedX === 0 && chosenSpeedY === 0 &&
                    itemSpeedX === 0 && itemSpeedY === 0) {
                    _this.isMoving = false;
                    clearInterval(timer);
                    item.classList.remove('item');
                    chosen.classList.remove('chosen');
                    // 更新拼图位置信息
                    item.dataset.move = chosenIndex + '';
                    chosen.dataset.move = itemIndex + '';
                }
            }, 1000 / 60);
        };
        PuzzleGame.prototype.mouseEvents = function () {
            if (!this.box) {
                return;
            }
            // mouse events
            this.isDrag = false;
            this.isMoving = false;
            this.startX = 0;
            this.startY = 0;
            this.maxWidth = this.box.offsetWidth;
            this.maxHeight = this.box.offsetHeight;
            var self = this;
            for (var i = 0; i < this.puzzles.length; i++) {
                this.puzzles[i].addEventListener('mousedown', mousedownEvent);
                // this.puzzles[i].addEventListener('mousemove', mousemoveEvent)
                this.puzzles[i].addEventListener('mouseup', mouseupEvent);
            }
            window.addEventListener('mousemove', mousemoveEvent);
            function mousedownEvent(e) {
                // if (!self.isGameStarted) {
                //     return
                // }
                self.chosenPuzzle = this;
                self.isDrag = true;
                self.startX = e.clientX;
                self.startY = e.clientY;
                // this.setCapture()
                e.stopPropagation();
                e.preventDefault();
            }
            function mousemoveEvent(e) {
                // if (!self.isGameStarted) {
                //     return
                // }
                if (!self.isDrag || !self.chosenPuzzle) {
                    return;
                }
                if (self.isMoving) {
                    return;
                }
                // if (self.chosenPuzzle.classList.contains('already')) {
                //     return
                // }
                var dx = e.clientX - self.startX;
                var dy = e.clientY - self.startY;
                self.startX = e.clientX;
                self.startY = e.clientY;
                self.chosenPuzzle.style.left = self.chosenPuzzle.offsetLeft + dx + 'px';
                self.chosenPuzzle.style.top = self.chosenPuzzle.offsetTop + dy + 'px';
                self.moveWithLimits(self.chosenPuzzle);
                self.identifyMovingPuzzles(self.chosenPuzzle, e.clientX, e.clientY);
                e.stopPropagation();
            }
            function mouseupEvent(e) {
                // if (!self.isGameStarted) {
                //     return
                // }
                if (this !== self.chosenPuzzle) {
                    return;
                }
                self.isDrag = false;
                if (self.isMoving) {
                    return;
                }
                // this.releaseCapture()
                e.stopPropagation();
                e.preventDefault();
                // puzzle move
                var chosen = get(self.identifier + ' .imglist .chosen');
                var item = get(self.identifier + ' .imglist .item');
                if (!chosen) {
                    return;
                }
                self.isMoving = true;
                if (item) {
                    self.puzzlesMoving(item, chosen, self.timer);
                }
                else {
                    self.restorePuzzle(chosen);
                }
            }
        };
        return PuzzleGame;
    }());
})(g10 || (g10 = {}));
//# sourceMappingURL=g10.js.map