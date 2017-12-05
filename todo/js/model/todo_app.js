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
    TodoApp.prototype.closeDetailView = function () {
        this.areaView.stretchView();
        this.detailView.closeView();
    };
    // 我也不知道这个设计对不对，反正写到现在了感觉不太对劲……
    TodoApp.prototype.deleteItem = function (title) {
        this.areaView.deleteItem(title);
        this.listView.refreshUI();
    };
    TodoApp.prototype.toggleItem = function (title) {
        this.areaView.toggleItem(title);
    };
    TodoApp.prototype.numberOfItemsInList = function (listName) {
        this.tempItemsModel = new TodoItemModel(listName);
        var result = this.tempItemsModel.numberOfItems;
        this.tempItemsModel = null;
        return result;
    };
    return TodoApp;
}());
