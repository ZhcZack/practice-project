"use strict";
var Game = (function () {
    function Game(images) {
        this.paused = false;
        this.images = images;
        this.gameImages = {};
        this.paused = false;
        this.gameScene = null;
        this.actions = {};
        this.keydowns = {};
        var canvas = get('#canvas');
        var context = canvas.getContext('2d');
        this.canvas = canvas;
        this.context = context;
        this.init();
    }
    Object.defineProperty(Game.prototype, "sceneWidth", {
        get: function () {
            return this.canvas.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "sceneHeight", {
        get: function () {
            return this.canvas.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "scene", {
        set: function (newScene) {
            if (this.gameScene) {
                this.gameScene.clearEvents();
            }
            newScene.registerEvents();
            this.context.fillStyle = '#000';
            this.gameScene = newScene;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "fillStyle", {
        set: function (style) {
            this.context.fillStyle = style;
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.registerMouseEvent = function (type, method) {
        if (!['mousedown', 'mouseup', 'mousemove'].includes(type)) {
            return;
        }
        this.canvas.addEventListener(type, function (e) {
            var event = e;
            method(event);
        });
    };
    Game.prototype.imageByName = function (name) {
        var img = this.gameImages[name];
        return {
            width: img.width,
            height: img.height,
            image: img,
            x: 0,
            y: 0
        };
    };
    Game.prototype.drawImage = function (imageElement) {
        if (!imageElement.editMode) {
            this.context.drawImage(imageElement.image, imageElement.x, imageElement.y);
        }
        else {
            this.context.setLineDash([5, 5]);
            this.context.beginPath();
            this.context.moveTo(0, imageElement.y);
            this.context.lineTo(this.canvas.width, imageElement.y);
            this.context.stroke();
            this.context.beginPath();
            this.context.moveTo(imageElement.x, 0);
            this.context.lineTo(imageElement.x, this.canvas.height);
            this.context.stroke();
            this.context.drawImage(imageElement.image, imageElement.x, imageElement.y);
            this.context.fillText("(" + imageElement.x + ", " + imageElement.y + ")", imageElement.x + 10, imageElement.y - 10);
        }
    };
    Game.prototype.fillText = function (text, x, y, maxWidth) {
        this.context.fillText(text, x, y, maxWidth);
    };
    Game.prototype.fillRect = function (color, x, y, width, height) {
        this.context.fillStyle = color;
        this.context.fillRect(x, y, width, height);
    };
    Game.prototype.registerAction = function (key, callback) {
        this.actions[key] = callback;
    };
    Game.prototype.init = function () {
        this.initEvents();
        this.loadImages();
    };
    Game.prototype.initEvents = function () {
        var _this = this;
        window.addEventListener('keydown', function (e) {
            e.stopPropagation();
            _this.keydowns[e.key] = true;
        });
        window.addEventListener('keyup', function (e) {
            e.stopPropagation();
            _this.keydowns[e.key] = false;
        });
    };
    Game.prototype.loadImages = function () {
        var _this = this;
        var promises = [];
        var names = Object.keys(this.images);
        var _loop_1 = function (name_1) {
            var path = this_1.images[name_1];
            var img = new Image();
            img.src = path;
            var p = new Promise(function (resolve) {
                img.addEventListener('load', function (e) {
                    e.stopPropagation();
                    resolve({
                        name: name_1,
                        image: img
                    });
                });
            });
            promises.push(p);
        };
        var this_1 = this;
        for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
            var name_1 = names_1[_i];
            _loop_1(name_1);
        }
        Promise.all(promises).then(function (result) {
            var value = result;
            for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                var r = value_1[_i];
                _this.gameImages[r.name] = r.image;
            }
            _this.__start();
        });
    };
    Game.prototype.update = function () {
        if (this.gameScene) {
            this.gameScene.update();
        }
    };
    Game.prototype.draw = function () {
        if (this.gameScene) {
            this.gameScene.draw();
        }
    };
    Game.prototype.runLoop = function () {
        var _this = this;
        var actions = Object.keys(this.actions);
        for (var _i = 0, actions_1 = actions; _i < actions_1.length; _i++) {
            var key = actions_1[_i];
            if (this.keydowns[key]) {
                this.actions[key]();
            }
        }
        this.update();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.draw();
        setTimeout(function () {
            _this.runLoop();
        }, 1000 / fps);
    };
    Game.prototype.__start = function () {
        this.runLoop();
    };
    return Game;
}());
//# sourceMappingURL=game.js.map