var TodoApp = /** @class */ (function () {
    function TodoApp() {
        this.listView = new TodoListView();
        this.listView.delegate = this;
        this.areaView = new TodoAreaView();
        this.areaView.delegate = this;
        this.detailView = new TodoDetailView();
        this.detailView.delegate = this;
    }
    TodoApp.prototype.toggleAreaView = function (name) {
        this.areaView.name = name;
    };
    TodoApp.prototype.toggleDetailView = function (item) {
        this.detailView.item = item;
    };
    return TodoApp;
}());
