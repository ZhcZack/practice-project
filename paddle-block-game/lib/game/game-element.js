"use strict";
var GameElement = (function () {
    function GameElement(game, imageName) {
        this.game = game;
        var img = game.imageByName(imageName);
        this.image = img.image;
        this.width = img.width;
        this.height = img.height;
        this.x = 0;
        this.y = 0;
    }
    GameElement.prototype.setPosition = function (x, y) {
        this.x = x;
        this.y = y;
    };
    GameElement.prototype.update = function () {
    };
    GameElement.prototype.draw = function () {
        this.game.drawImage(this);
    };
    return GameElement;
}());
//# sourceMappingURL=game-element.js.map