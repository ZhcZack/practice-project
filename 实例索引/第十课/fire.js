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
        setTimeout(function () {
            _this.start();
        }, 1000 / this.fps);
        // window.requestAnimationFrame(() => {
        //     this.start()
        // })
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
    Object.defineProperty(GameScene.prototype, "sceneWidth", {
        get: function () {
            return this.canvas.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameScene.prototype, "sceneHeight", {
        get: function () {
            return this.canvas.height;
        },
        enumerable: true,
        configurable: true
    });
    GameScene.prototype.setup = function () {
        var ball = new Ball(0, 0, 10, 10);
        this.addElement(ball);
        var fire = new Fire();
        fire.setPosition(100, 50);
        this.addElement(fire);
        // const blossom = new Blossom(50, 50, 6, 6)
        // this.addElement(blossom)
    };
    GameScene.prototype.addElement = function (element) {
        element.delegate = this;
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
    GameScene.prototype.removeElement = function (element) {
        var index = -1;
        for (var i = 0; i < this.elements.length; i++) {
            if (this.elements[i] === element) {
                index = i;
                break;
            }
        }
        if (index > -1) {
            this.elements.splice(index, 1);
            return true;
        }
        return false;
    };
    // fire bloom delegate methods
    GameScene.prototype.fireShouldBlossom = function (fire) {
        // console.log('should remove')
        var x = fire.x;
        var y = fire.y;
        this.removeElement(fire);
        var blossom = new Blossom();
        blossom.setPosition(x, y);
        this.addElement(blossom);
    };
    GameScene.prototype.fireBlossomed = function (blossom) {
        this.removeElement(blossom);
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
        if (!this.delegate) {
            return;
        }
        this.delegate.context.fillRect(this.x, this.y, this.width, this.height);
    };
    Ball.prototype.update = function () {
        if (!this.delegate) {
            return;
        }
        this.x += this.speed;
        if (this.x + this.width >= this.delegate.sceneWidth) {
            this.speed *= -1;
        }
        else if (this.x <= 0) {
            this.speed *= -1;
        }
    };
    return Ball;
}());
var Fire = /** @class */ (function () {
    function Fire(x, y, width, height) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (width === void 0) { width = 6; }
        if (height === void 0) { height = 6; }
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.setup();
    }
    Fire.prototype.setup = function () {
        this.speed = 2;
    };
    Object.defineProperty(Fire.prototype, "delegate", {
        get: function () {
            return this._delegate;
        },
        set: function (delegate) {
            this._delegate = delegate;
            if (this._delegate) {
                this.y = this._delegate.sceneHeight;
            }
        },
        enumerable: true,
        configurable: true
    });
    Fire.prototype.setPosition = function (x, y) {
        this.x = x;
        this.targetY = y;
    };
    Fire.prototype.draw = function () {
        if (this.delegate) {
            this.delegate.context.fillRect(this.x, this.y, this.width, this.height);
        }
    };
    Fire.prototype.update = function () {
        this.y -= this.speed;
        if (this.y <= this.targetY) {
            if (this.delegate) {
                this.delegate.fireShouldBlossom(this);
            }
        }
    };
    return Fire;
}());
var Blossom = /** @class */ (function () {
    function Blossom(x, y, width, height) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (width === void 0) { width = 4; }
        if (height === void 0) { height = 4; }
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.setup();
    }
    Object.defineProperty(Blossom.prototype, "delegate", {
        get: function () {
            return this._delegate;
        },
        set: function (delegate) {
            var _this = this;
            this._delegate = delegate;
            this.elements.forEach(function (elem) { return elem.delegate = _this._delegate; });
        },
        enumerable: true,
        configurable: true
    });
    Blossom.prototype.setup = function () {
        this.timer = 30;
        this.elements = [];
        this.numberOfElements = 6;
        for (var i = 0; i < this.numberOfElements; i++) {
            var b = new BlossomElemenet(this.x, this.y, this.width, this.height);
            this.elements.push(b);
        }
    };
    Blossom.prototype.setPosition = function (x, y) {
        this.x = x;
        this.y = y;
        this.elements.forEach(function (elem) {
            elem.x = x;
            elem.y = y;
        });
    };
    Blossom.prototype.draw = function () {
        if (!this.delegate) {
            return;
        }
        this.elements.forEach(function (elem) { return elem.draw(); });
    };
    Blossom.prototype.update = function () {
        if (!this.delegate) {
            return;
        }
        this.elements.forEach(function (elem) { return elem.update(); });
        this.timer--;
        console.log("timer is now " + this.timer);
        if (this.timer <= 0) {
            this.elements = [];
            this.delegate.fireBlossomed(this);
        }
    };
    return Blossom;
}());
var BlossomElemenet = /** @class */ (function () {
    function BlossomElemenet(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.setup();
    }
    Object.defineProperty(BlossomElemenet.prototype, "randomSpeed", {
        get: function () {
            return Math.floor(Math.random() * 2 + 1) * (Math.random() > 0.5 ? 1 : -1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlossomElemenet.prototype, "randomColor", {
        get: function () {
            return 'rgb(' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ')';
        },
        enumerable: true,
        configurable: true
    });
    BlossomElemenet.prototype.setup = function () {
        this.speedX = this.randomSpeed;
        this.speedY = this.randomSpeed;
        this.color = this.randomColor;
    };
    BlossomElemenet.prototype.draw = function () {
        if (!this.delegate) {
            return;
        }
        this.delegate.context.fillRect(this.x, this.y, this.width, this.height);
    };
    BlossomElemenet.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        if (!this.delegate) {
            return;
        }
        this.delegate.context.fillStyle = this.color;
    };
    return BlossomElemenet;
}());
window.addEventListener('load', main);
function main(event) {
    var game = new Game(60);
}
//# sourceMappingURL=fire.js.map