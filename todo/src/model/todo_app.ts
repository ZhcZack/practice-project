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

/**
 * 2017/12/21
 * 考虑把关于model的操作从view里拆出来，弄一个类似于server的类来处理
 */

class TodoApp {
    private listView: TodoListView
    // private listModel: TodoListModel
    // private itemModel: TodoItemModel

    constructor() {
        // init models
        // this.listModel = new TodoListModel()
        // const modelName = this.getDataModelName()
        // this.itemModel = new TodoItemModel(modelName)

        this.listView = new TodoListView()
        this.listView.delegate = this
    }
}