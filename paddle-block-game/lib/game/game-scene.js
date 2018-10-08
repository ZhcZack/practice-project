"use strict";
var GameScene = (function () {
    function GameScene(game) {
        this.game = game;
        this.eventsMap = {};
    }
    GameScene.prototype.draw = function () {
    };
    GameScene.prototype.update = function () {
    };
    GameScene.prototype.registerEvent = function (type, name, action) {
        if (!this.eventsMap[type]) {
            this.eventsMap[type] = {};
        }
        this.eventsMap[type][name] = action;
        gameEventListener.add(type, name, action.bind(this));
    };
    GameScene.prototype.registerEvents = function () {
        log('register');
    };
    GameScene.prototype.clearEvents = function () {
        log('clear');
        var types = Object.keys(this.eventsMap);
        for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
            var type = types_1[_i];
            var names = Object.keys(this.eventsMap[type]);
            for (var _a = 0, names_1 = names; _a < names_1.length; _a++) {
                var name_1 = names_1[_a];
                gameEventListener.remove(type, name_1);
            }
        }
        this.eventsMap = {};
    };
    return GameScene;
}());
//# sourceMappingURL=game-scene.js.map