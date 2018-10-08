"use strict";
var AddButton = (function () {
    function AddButton(game) {
        var img = game.imageByName('add');
        this.image = img.image;
        this.width = img.width;
        this.height = img.height;
        this.x = game.canvas.width - this.width;
        this.y = 20;
    }
    AddButton.prototype.beClicked = function (x, y) {
        return (x >= this.x && x <= this.x + this.width) && (y >= this.y && y <= this.y + this.height);
    };
    return AddButton;
}());
//# sourceMappingURL=add-button.js.map