var TodoItem = /** @class */ (function () {
    function TodoItem(title, done, date) {
        if (done === void 0) { done = false; }
        if (date === void 0) { date = new Date().toLocaleString(); }
        this.itemName = title;
        this.isDone = done;
        this.date = new Date().toLocaleString();
    }
    Object.defineProperty(TodoItem.prototype, "title", {
        get: function () {
            return this.itemName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TodoItem.prototype, "isFinished", {
        get: function () {
            return this.isDone;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TodoItem.prototype, "createTime", {
        get: function () {
            return this.date;
        },
        enumerable: true,
        configurable: true
    });
    TodoItem.prototype.toggleStatus = function () {
        this.isDone = !this.isDone;
    };
    TodoItem.prototype.equal = function (item) {
        return this.itemName === item.itemName;
    };
    TodoItem.prototype.toJSON = function () {
        var value = {
            name: this.itemName,
            done: this.isDone,
            date: this.date,
        };
        return JSON.stringify(value);
    };
    return TodoItem;
}());
