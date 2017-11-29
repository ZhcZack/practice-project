var TodoItemModel = /** @class */ (function () {
    function TodoItemModel(name) {
        this.itemList = [];
        this.modelName = name;
        this.setup();
    }
    TodoItemModel.prototype.setup = function () {
        this.load();
    };
    TodoItemModel.prototype.add = function (title) {
        if (!this.info(title).find) {
            var item = new TodoItem(title);
            this.itemList.push(item);
            this.save();
        }
    };
    TodoItemModel.prototype.info = function (name) {
        for (var i = 0; i < this.itemList.length; i++) {
            if (this.itemList[i].title === name) {
                return {
                    find: true,
                    index: i,
                };
            }
        }
        return { find: false };
    };
    TodoItemModel.prototype.remove = function (title) {
        var info = this.info(title);
        if (!info.find) {
            return;
        }
        this.itemList.splice(info.index, 1);
    };
    TodoItemModel.prototype.clear = function () {
        this.itemList = [];
        this.save();
    };
    TodoItemModel.prototype.save = function () {
        var data = {
            'todos': this.itemList
        };
        localStorage.setItem(this.modelName, JSON.stringify(data));
    };
    TodoItemModel.prototype.load = function () {
        var data = localStorage.getItem(this.modelName);
        if (data === null) {
            this.itemList = [];
            this.save();
        }
        else {
            var todos = JSON.parse(data).todos;
            for (var _i = 0, todos_1 = todos; _i < todos_1.length; _i++) {
                var todo = todos_1[_i];
                var item = new TodoItem(todo.itemName, todo.isDone, todo.date);
                this.itemList.push(item);
            }
        }
    };
    TodoItemModel.prototype.deleteModel = function () {
        localStorage.removeItem(this.modelName);
    };
    Object.defineProperty(TodoItemModel.prototype, "items", {
        get: function () {
            var result = [];
            for (var _i = 0, _a = this.itemList; _i < _a.length; _i++) {
                var item = _a[_i];
                result.push(item.title);
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    return TodoItemModel;
}());
