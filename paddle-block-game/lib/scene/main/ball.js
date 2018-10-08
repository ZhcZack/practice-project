"use strict";
var Ball = (function () {
    function Ball(game) {
        this.speedX = 5;
        this.speedY = 5;
        this.fired = false;
        var img = game.imageByName('ball');
        this.x = 100;
        this.y = 190;
        this.image = img.image;
        this.height = img.height;
        this.width = img.width;
    }
    Ball.prototype.move = function () {
        if (this.fired) {
            if (this.x < 0 || this.x + this.image.width > 400) {
                this.speedX *= -1;
            }
            if (this.y < 0 || this.y + this.image.height > 300) {
                this.speedY *= -1;
            }
            this.x += this.speedX;
            this.y += this.speedY;
        }
    };
    Ball.prototype.fire = function () {
        this.fired = true;
    };
    Ball.prototype.reboundX = function () {
        this.speedX *= -1;
    };
    Ball.prototype.reboundY = function () {
        this.speedY *= -1;
    };
    Ball.prototype.hasPoint = function (x, y) {
        var xIn = x >= this.x && x <= this.x + this.width;
        var yIn = y >= this.y && y <= this.y + this.height;
        return xIn && yIn;
    };
    return Ball;
}());
//# sourceMappingURL=ball.js.map