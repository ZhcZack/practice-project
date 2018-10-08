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
var SceneEdit = (function (_super) {
    __extends(SceneEdit, _super);
    function SceneEdit(game) {
        var _this = _super.call(this, game) || this;
        _this.addButton = new EditAddButton(_this.game);
        _this.saveButton = new EditSaveButton(_this.game);
        _this.blocks = [];
        _this.initBlocks();
        _this.blocksDraggable();
        return _this;
    }
    SceneEdit.prototype.initBlocks = function () {
        var positions = levels[0];
        for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
            var position = positions_1[_i];
            var block = new Block(this.game, position);
            this.blocks.push(block);
        }
    };
    SceneEdit.prototype.blocksDraggable = function () {
        var _this = this;
        var dragBlock = null;
        var dragStart = false;
        var dx = 0;
        var dy = 0;
        this.game.registerMouseEvent('mousedown', function (e) {
            e.stopPropagation();
            var x = e.offsetX;
            var y = e.offsetY;
            for (var _i = 0, _a = _this.blocks; _i < _a.length; _i++) {
                var block = _a[_i];
                if (block.hasPoint(x, y)) {
                    dragBlock = block;
                    dragBlock.editMode = true;
                    dragStart = true;
                    dx = x - dragBlock.x;
                    dy = y - dragBlock.y;
                    break;
                }
            }
        });
        this.game.registerMouseEvent('mousemove', function (e) {
            if (!dragStart || !dragBlock) {
                return;
            }
            var x = e.offsetX;
            var y = e.offsetY;
            dragBlock.x = x - dx;
            dragBlock.y = y - dy;
        });
        this.game.registerMouseEvent('mouseup', function (e) {
            e.stopPropagation();
            if (dragBlock) {
                dragBlock.editMode = false;
            }
            dragBlock = null;
            dragStart = false;
            dx = dy = 0;
        });
    };
    SceneEdit.prototype.endEdit = function () {
        this.game.scene = new SceneTitle(this.game);
    };
    SceneEdit.prototype.registerEvents = function () {
        var _this = this;
        this.registerEvent('keydown', 'e', function () {
            _this.endEdit();
        });
        this.game.registerMouseEvent('mousedown', function (e) {
            e.stopPropagation();
            if (_this.addButton.beClicked(e.offsetX, e.offsetY)) {
                _this.addNewBlock();
                return;
            }
            if (_this.saveButton.beClicked(e.offsetX, e.offsetY)) {
                _this.saveBlocks();
                return;
            }
        });
    };
    SceneEdit.prototype.draw = function () {
        this.game.fillText('拖动砖块调整位置，点击保存更新关卡', 10, this.game.sceneHeight - 40);
        this.game.fillText('按E结束编辑模式，返回标题界面', 10, this.game.sceneHeight - 10);
        this.game.drawImage(this.addButton);
        this.game.drawImage(this.saveButton);
        for (var _i = 0, _a = this.blocks; _i < _a.length; _i++) {
            var block = _a[_i];
            this.game.drawImage(block);
        }
    };
    SceneEdit.prototype.addNewBlock = function () {
        var newBlock = new Block(this.game, [200, 200]);
        this.blocks.push(newBlock);
    };
    SceneEdit.prototype.saveBlocks = function () {
        var position = [];
        for (var _i = 0, _a = this.blocks; _i < _a.length; _i++) {
            var block = _a[_i];
            var pos = [block.x, block.y];
            position.push(pos);
        }
        levels[0] = position;
        this.endEdit();
    };
    return SceneEdit;
}(GameScene));
//# sourceMappingURL=scene-edit.js.map