var TodoApp = /** @class */ (function () {
    function TodoApp() {
        this.listView = new TodoListView();
        this.listView.delegate = this;
        this.areaView = new TodoAreaView();
    }
    TodoApp.prototype.toggleAreaView = function (name) {
        this.areaView.name = name;
    };
    return TodoApp;
}());
