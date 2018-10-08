"use strict";
var EditAddButton = (function () {
    function EditAddButton(game) {
        var img = game.imageByName('edit-add');
        this.image = img.image;
        this.width = img.width;
        this.height = img.height;
        this.x = game.sceneWidth - this.width;
        this.y = 20;
    }
    EditAddButton.prototype.beClicked = function (x, y) {
        return (x >= this.x && x <= this.x + this.width) && (y >= this.y && y <= this.y + this.height);
    };
    return EditAddButton;
}());
//# sourceMappingURL=edit-add-button.js.map