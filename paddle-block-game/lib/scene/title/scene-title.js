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
var SceneTitle = (function (_super) {
    __extends(SceneTitle, _super);
    function SceneTitle(game) {
        return _super.call(this, game) || this;
    }
    SceneTitle.prototype.registerEvents = function () {
        var _this = this;
        this.registerEvent('keydown', 'k', function () {
            _this.switchMainScene();
        });
        this.registerEvent('keydown', 'e', function () {
            _this.switchEditScene();
        });
    };
    SceneTitle.prototype.switchMainScene = function () {
        this.game.scene = new SceneMain(this.game);
    };
    SceneTitle.prototype.switchEditScene = function () {
        this.game.scene = new SceneEdit(this.game);
    };
    SceneTitle.prototype.draw = function () {
        this.game.fillText('按K开始游戏', 10, 290);
        this.game.fillText('按E编辑关卡', 10, 250);
    };
    return SceneTitle;
}(GameScene));
//# sourceMappingURL=scene-title.js.map