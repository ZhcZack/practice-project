"use strict";
var Paddle = (function () {
    function Paddle(game) {
        this.speed = 15;
        var obj = game.imageByName('paddle');
        this.x = 100;
        this.y = 250;
        this.height = obj.height;
        this.width = obj.width;
        this.image = obj.image;
    }
    Paddle.prototype.move = function (x) {
        if (x < 0) {
            x = 0;
        }
        if (x > 400 - this.width) {
            x = 400 - this.width;
        }
        this.x = x;
    };
    Paddle.prototype.moveLeft = function () {
        this.move(this.x - this.speed);
    };
    Paddle.prototype.moveRight = function () {
        this.move(this.x + this.speed);
    };
    Paddle.aInb = function (d1, d2, d3) {
        return d1 >= d2 && d1 <= d3;
    };
    Paddle.prototype.collide = function (ball) {
        if (Paddle.aInb(this.x, ball.x, ball.x + ball.width) ||
            Paddle.aInb(ball.x, this.x, this.x + this.width)) {
            if (Paddle.aInb(this.y, ball.y, ball.y + ball.height) ||
                Paddle.aInb(ball.y, this.y, this.y + this.height)) {
                return true;
            }
        }
        return false;
    };
    return Paddle;
}());
//# sourceMappingURL=paddle.js.map