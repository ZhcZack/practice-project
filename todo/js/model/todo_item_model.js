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
    TodoItemModel.prototype.toggle = function (name) {
        var info = this.info(name);
        if (info.find) {
            var item = this.itemList[info.index];
            item.toggleStatus();
            this.save();
        }
    };
    TodoItemModel.prototype.remove = function (title) {
        var info = this.info(title);
        if (!info.find) {
            return;
        }
        this.itemList.splice(info.index, 1);
        this.save();
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
                var t = JSON.parse(todo);
                var item = new TodoItem(t.name, t.done, t.date);
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
                var face = {
                    name: item.title,
                    done: item.isFinished,
                    date: item.createTime,
                };
                result.push(face);
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TodoItemModel.prototype, "numberOfItems", {
        get: function () {
            return this.itemList.length;
        },
        enumerable: true,
        configurable: true
    });
    TodoItemModel.prototype.getItem = function (title) {
        var info = this.info(title);
        if (info.find) {
            var index = info.index;
            return {
                name: this.itemList[index].title,
                done: this.itemList[index].isFinished,
                date: this.itemList[index].createTime,
            };
        }
        return null;
    };
    return TodoItemModel;
}());
