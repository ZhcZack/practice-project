"use strict";
var Block = (function () {
    function Block(game, position) {
        this.alive = true;
        this.editMode = false;
        this.lifes = 0;
        var obj = game.imageByName('block');
        this.x = position[0];
        this.y = position[1];
        this.image = obj.image;
        this.width = obj.width;
        this.height = obj.height;
        this.lifes = position[2] || 1;
        if (this.lifes === 2) {
            this.image = game.imageByName('block-2').image;
        }
    }
    Block.prototype.kill = function () {
        this.lifes -= 1;
        this.alive = this.lifes > 0;
    };
    ;
    Block.aInb = function (d1, d2, d3) {
        return d1 >= d2 && d1 <= d3;
    };
    Block.prototype.collide = function (ball) {
        var dx = 0;
        var dy = 0;
        var fromX;
        var fromY;
        var result = false;
        if (Block.aInb(this.x, ball.x, ball.x + ball.width)) {
            dx = Math.min(ball.x + ball.width - this.x, this.width);
            if (Block.aInb(this.y, ball.y, ball.y + ball.height)) {
                dy = Math.min(ball.y + ball.height - this.y, this.height);
                result = true;
            }
            else if (Block.aInb(ball.y, this.y, this.y + this.height)) {
                dy = Math.min(this.y + this.height - ball.y, ball.height);
                result = true;
            }
            else {
                result = false;
            }
        }
        else if (Block.aInb(ball.x, this.x, this.x + this.width)) {
            dx = Math.min(this.x + this.width - ball.x, ball.width);
            if (Block.aInb(this.y, ball.y, ball.y + ball.height)) {
                dy = Math.min(ball.y + ball.height - this.y, this.height);
                result = true;
            }
            else if (Block.aInb(ball.y, this.y, this.y + this.height)) {
                dy = Math.min(this.y + this.height - ball.y, ball.height);
                result = true;
            }
            else {
                result = false;
            }
        }
        else {
            result = false;
        }
        fromX = dx > dy;
        fromY = !fromX;
        return {
            result: result && this.alive,
            fromX: fromX,
            fromY: fromY
        };
    };
    ;
    Block.prototype.hasPoint = function (x, y) {
        var xIn = x >= this.x && x <= this.x + this.width;
        var yIn = y >= this.y && y <= this.y + this.height;
        return xIn && yIn;
    };
    return Block;
}());
//# sourceMappingURL=block.js.map