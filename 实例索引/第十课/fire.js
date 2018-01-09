"use strict";
var Game = /** @class */ (function () {
    function Game(fps) {
        this.fps = fps;
        this.scene = new GameScene();
        this.scene.game = this;
        this.start();
    }
    Game.prototype.update = function () {
        this.scene.update();
    };
    Game.prototype.draw = function () {
        this.scene.draw();
    };
    Game.prototype.clear = function () {
        this.scene.clear();
    };
    Game.prototype.start = function () {
        var _this = this;
        this.update();
        this.clear();
        this.draw();
        // setTimeout(() => {
        //     this.start()
        // }, 1000 / this.fps)
        window.requestAnimationFrame(function () {
            _this.start();
        });
    };
    return Game;
}());
var GameScene = /** @class */ (function () {
    function GameScene() {
        this.canvas = document.querySelector('canvas');
        this.context = this.canvas.getContext('2d');
        this.elements = [];
        this.setup();
    }
    GameScene.prototype.setup = function () {
        var ball = new Ball(0, 0, 10, 10);
        this.addElement(ball);
    };
    GameScene.prototype.addElement = function (element) {
        element.sceneInfo = {
            sceneWidth: this.canvas.width,
            sceneHeight: this.canvas.height,
            context: this.context,
        };
        this.elements.push(element);
    };
    GameScene.prototype.update = function () {
        this.elements.forEach(function (element) { return element.update(); });
    };
    GameScene.prototype.draw = function () {
        this.elements.forEach(function (element) { return element.draw(); });
    };
    GameScene.prototype.clear = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    return GameScene;
}());
var Ball = /** @class */ (function () {
    function Ball(x, y, width, height, sceneInfo) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 1;
    }
    Ball.prototype.draw = function () {
        if (!this.sceneInfo) {
            return;
        }
        this.sceneInfo.context.fillRect(this.x, this.y, this.width, this.height);
    };
    Ball.prototype.update = function () {
        this.x += this.speed;
        if (this.x + this.width >= this.sceneInfo.sceneWidth) {
            this.speed *= -1;
        }
        else if (this.x <= 0) {
            this.speed *= -1;
        }
    };
    return Ball;
}());
window.addEventListener('load', main);
function main(event) {
    var game = new Game(60);
}
//# sourceMappingURL=fire.js.map