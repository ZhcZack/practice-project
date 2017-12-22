var TodoListModel = /** @class */ (function () {
    function TodoListModel() {
        this.todoLists = [];
        this.name = 'todo-app-list';
        this.setup();
    }
    TodoListModel.prototype.setup = function () {
        this.load();
    };
    TodoListModel.prototype.add = function (name) {
        if (!this.info(name).find) {
            this.todoLists.push(name);
            this.save();
        }
    };
    TodoListModel.prototype.info = function (name) {
        for (var i = 0; i < this.todoLists.length; i++) {
            if (this.todoLists[i] === name) {
                return {
                    find: true,
                    index: i,
                };
            }
        }
        return { find: false };
    };
    TodoListModel.prototype.remove = function (name) {
        var info = this.info(name);
        if (!info.find) {
            return false;
        }
        this.todoLists.splice(info.index, 1);
        return true;
    };
    TodoListModel.prototype.clear = function () {
        this.todoLists = [];
        this.save();
    };
    TodoListModel.prototype.save = function () {
        var data = {
            'lists': this.todoLists
        };
        localStorage.setItem(this.name, JSON.stringify(data));
    };
    TodoListModel.prototype.load = function () {
        var data = localStorage.getItem(this.name);
        if (data === null) {
            this.todoLists.push('我的一天');
            this.save();
        }
        else {
            this.todoLists = JSON.parse(data).lists;
        }
    };
    TodoListModel.prototype.deleteModel = function () {
        localStorage.removeItem(this.name);
    };
    Object.defineProperty(TodoListModel.prototype, "lists", {
        get: function () {
            return JSON.parse(JSON.stringify(this.todoLists));
        },
        enumerable: true,
        configurable: true
    });
    return TodoListModel;
}());
