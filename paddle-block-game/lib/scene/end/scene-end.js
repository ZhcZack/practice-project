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
var SceneEnd = (function (_super) {
    __extends(SceneEnd, _super);
    function SceneEnd(game) {
        return _super.call(this, game) || this;
    }
    SceneEnd.prototype.registerEvents = function () {
        var _this = this;
        this.registerEvent('keydown', 'r', function () {
            _this.backToTitle();
        });
    };
    SceneEnd.prototype.backToTitle = function () {
        this.game.scene = new SceneTitle(this.game);
    };
    SceneEnd.prototype.draw = function () {
        this.game.fillText('按r返回开始界面', 10, 290);
    };
    return SceneEnd;
}(GameScene));
//# sourceMappingURL=scene-end.js.map