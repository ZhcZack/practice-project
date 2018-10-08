"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SceneMain = (function (_super) {
    __extends(SceneMain, _super);
    function SceneMain(game) {
        var _this = _super.call(this, game) || this;
        _this.score = 0;
        _this.paddle = new Paddle(game);
        _this.ball = new Ball(game);
        _this.blocks = [];
        _this.initElements();
        _this.initEvents();
        _this.enableDebugMode();
        return _this;
    }
    SceneMain.prototype.initEvents = function () {
        var _this = this;
        this.game.registerAction('a', function () {
            _this.paddle.moveLeft();
        });
        this.game.registerAction('d', function () {
            _this.paddle.moveRight();
        });
        this.game.registerAction('f', function () {
            _this.ball.fire();
        });
    };
    SceneMain.prototype.initElements = function () {
        loadLevel(this.game, 1, this.blocks);
    };
    SceneMain.prototype.reset = function () {
        this.initElements();
    };
    SceneMain.prototype.enableDebugMode = function () {
        var _this = this;
        this.registerEvent('keydown', 'p', function () {
            _this.game.paused = !_this.game.paused;
        });
        var levels = '1234567'.split('');
        levels.forEach(function (level) {
            _this.registerEvent('keydown', String(level), function () {
                loadLevel(_this.game, Number(level), _this.blocks);
            });
        });
        get('#fps-range').addEventListener('input', function (e) {
            e.stopPropagation();
            var input = e.target;
            fps = Number(input.value);
        });
        var enableDrag = false;
        var dx = 0;
        var dy = 0;
        this.game.registerMouseEvent('mousedown', function (e) {
            e.stopPropagation();
            var x = e.offsetX;
            var y = e.offsetY;
            if (_this.ball.hasPoint(x, y)) {
                enableDrag = true;
                dx = x - _this.ball.x;
                dy = y - _this.ball.y;
            }
        });
        this.game.registerMouseEvent('mousemove', function (e) {
            e.stopPropagation();
            if (enableDrag) {
                var x = e.offsetX;
                var y = e.offsetY;
                _this.ball.x = x - dx;
                _this.ball.y = y - dy;
            }
        });
        this.game.registerMouseEvent('mouseup', function (e) {
            e.stopPropagation();
            enableDrag = false;
            dx = dy = 0;
        });
    };
    SceneMain.prototype.draw = function () {
        this.game.fillRect('#876', 0, 0, this.game.sceneWidth, this.game.sceneHeight);
        this.game.drawImage(this.paddle);
        this.game.drawImage(this.ball);
        for (var _i = 0, _a = this.blocks; _i < _a.length; _i++) {
            var block = _a[_i];
            if (block.alive) {
                this.game.drawImage(block);
            }
        }
        this.game.fillStyle = '#000';
        this.game.fillText('分数：' + this.score, 10, 290);
        this.game.fillText('fps: ' + fps, this.game.sceneWidth - 50, this.game.sceneHeight - 20);
    };
    SceneMain.prototype.update = function () {
        if (this.game.paused) {
            return;
        }
        if (this.ball.y > this.paddle.y) {
            this.game.scene = new SceneEnd(this.game);
        }
        this.ball.move();
        if (this.paddle.collide(this.ball)) {
            this.ball.reboundY();
        }
        for (var _i = 0, _a = this.blocks; _i < _a.length; _i++) {
            var block = _a[_i];
            var status_1 = block.collide(this.ball);
            if (status_1.result) {
                block.kill();
                if (status_1.fromX) {
                    this.ball.reboundY();
                }
                else if (status_1.fromY) {
                    this.ball.reboundX();
                }
                this.score += 100;
            }
        }
    };
    return SceneMain;
}(GameScene));
//# sourceMappingURL=scene-main.js.map