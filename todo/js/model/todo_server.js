var TodoServer = /** @class */ (function () {
    function TodoServer() {
        this.listModel = new TodoListModel();
        this.itemModelList = {};
        this.setup();
    }
    TodoServer.prototype.setup = function () {
        var lists = this.listModel.lists;
        for (var _i = 0, lists_1 = lists; _i < lists_1.length; _i++) {
            var list = lists_1[_i];
            this.itemModelList[list] = new TodoItemModel(list);
        }
    };
    Object.defineProperty(TodoServer.prototype, "modelLists", {
        get: function () {
            return this.listModel.lists;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TodoServer.prototype, "latestModelList", {
        get: function () {
            var result = localStorage.getItem('list-name-before-closed');
            if (result === null || result === '') {
                localStorage.setItem('list-name-before-closed', '我的一天');
                result = '我的一天';
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    TodoServer.prototype.getItemInList = function (itemName, listName) {
        var list = this.itemModelList[listName];
        return list.getItem(itemName);
    };
    TodoServer.prototype.itemNumbersInList = function (listName) {
        var list = this.itemModelList[listName];
        return list.numberOfItems;
    };
    TodoServer.prototype.addNewList = function (listName) {
        this.listModel.add(listName);
    };
    TodoServer.prototype.removeList = function (listName) {
        localStorage.removeItem(listName);
        return this.listModel.remove(listName);
    };
    TodoServer.prototype.itemsInList = function (listName) {
        var list = this.itemModelList[listName];
        return list.items;
    };
    TodoServer.prototype.addItemInList = function (itemName, listName) {
        var list = this.itemModelList[listName];
        list.add(itemName);
    };
    TodoServer.prototype.removeItemInList = function (itemName, listName) {
        var list = this.itemModelList[listName];
        return list.remove(itemName);
    };
    TodoServer.prototype.toggleItemInList = function (itemName, listName) {
        var list = this.itemModelList[listName];
        list.toggle(itemName);
    };
    TodoServer.prototype.renameItemInList = function (itemName, newName, listName) {
        var list = this.itemModelList[listName];
        return false;
    };
    TodoServer.prototype.setSnapchat = function (listName) {
        localStorage.setItem('list-name-before-closed', listName);
    };
    TodoServer.prototype.removeSnapchat = function () {
        localStorage.removeItem('list-name-before-closed');
    };
    return TodoServer;
}());
