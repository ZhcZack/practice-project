/**
 * 代码结构设计存在严重缺陷，后面的改动直到设计变得正常为止不会增加新功能。
 *
 * 每一个view的delegate不应该是app，而应该是相关联的上一层view。
 * models应该保存在app里，用不着和views进行绑定。相当于app是绑定models的一个‘view’
 */
/**
 * 2017/12/14
 * 代码设计的问题解决了
 */
var TodoApp = /** @class */ (function () {
    function TodoApp() {
        // init models
        this.listModel = new TodoListModel();
        this.itemModel = new TodoItemModel('我的一天');
        this.listView = new TodoListView();
        this.listView.delegate = this;
    }
    return TodoApp;
}());
