var TodoListView = /** @class */ (function () {
    function TodoListView() {
        this.element = get('#todo-list-view');
        this.listView = get('#todo-list-view ul');
        this.customNewList = new CustomView.CustomNewList();
        this.setup();
    }
    TodoListView.prototype.setup = function () {
        this.addCustomViews();
        this.connectModel();
        this.bindEvents();
    };
    TodoListView.prototype.addCustomViews = function () {
        this.element.appendChild(this.customNewList.elem);
    };
    TodoListView.prototype.connectModel = function () {
        this.model = new TodoListModel();
        this.refreseUI();
    };
    TodoListView.prototype.refreseUI = function () {
        var child = this.listView.firstElementChild;
        while (child !== null) {
            this.listView.removeChild(child);
            child = this.listView.firstElementChild;
        }
        this.lists = this.model.lists;
        for (var _i = 0, _a = this.lists; _i < _a.length; _i++) {
            var list = _a[_i];
            var li = document.createElement('li');
            li.classList.add('list-item');
            li.textContent = list;
            this.listView.appendChild(li);
        }
    };
    TodoListView.prototype.bindEvents = function () {
        var _this = this;
        this.customNewList.elem.addEventListener('click', function (event) {
            var name = _this.customNewList.listName;
            while (_this.lists.indexOf(name) !== -1) {
                name = _this.customNewList.listName;
            }
            _this.model.add(name);
            _this.refreseUI();
        });
    };
    return TodoListView;
}());
