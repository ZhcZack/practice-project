"use strict";
var GameEventListener = (function () {
    function GameEventListener() {
        this.events = {};
        this.listeners = {};
    }
    GameEventListener.prototype.add = function (type, name, listener) {
        var _this = this;
        if (!this.hasType(type)) {
            this.events[type] = {};
            this.listeners[type] = {};
        }
        if (!this.hasEvent(type, name)) {
            this.events[type][name] = true;
            this.listeners[type][name] = listener;
        }
        else {
            this.replace(type, name, listener);
            return;
        }
        window.addEventListener(type, function (e) {
            if (['keydown', 'keyup', 'keypress'].includes(type)) {
                if (name === e.key) {
                    if (_this.events[type][name]) {
                        _this.listeners[type][name]();
                    }
                }
            }
        });
    };
    GameEventListener.prototype.remove = function (type, name) {
        if (!this.hasType(type) || !this.hasEvent(type, name)) {
            return;
        }
        this.events[type][name] = false;
    };
    GameEventListener.prototype.replace = function (type, name, listener) {
        if (!this.hasType(type) || !this.hasEvent(type, name)) {
            return;
        }
        this.events[type][name] = true;
        this.listeners[type][name] = listener;
    };
    GameEventListener.prototype.hasType = function (type) {
        var types = Object.keys(this.events);
        return types.includes(type);
    };
    GameEventListener.prototype.hasEvent = function (type, name) {
        if (!this.hasType(type)) {
            return false;
        }
        var events = Object.keys(this.events[type]);
        return events.includes(name);
    };
    return GameEventListener;
}());
var gameEventListener = new GameEventListener();
//# sourceMappingURL=game-event-listener.js.map