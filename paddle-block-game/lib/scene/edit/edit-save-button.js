"use strict";
var EditSaveButton = (function () {
    function EditSaveButton(game) {
        var img = game.imageByName('edit-save');
        this.image = img.image;
        this.width = img.width;
        this.height = img.height;
        this.x = game.sceneWidth - this.width;
        this.y = 60;
    }
    EditSaveButton.prototype.beClicked = function (x, y) {
        return (x >= this.x && x <= this.x + this.width) && (y >= this.y && y <= this.y + this.height);
    };
    return EditSaveButton;
}());
//# sourceMappingURL=edit-save-button.js.map