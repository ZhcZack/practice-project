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

import TodoListView from '../view/todo_list_view'
import TodoAreaView from '../view/todo_area_view'
import TodoServer from './todo_server'

class TodoApp {
    private listView: TodoListView
    private areaView: TodoAreaView
    private dataServer: TodoServer
    // private listModel: TodoListModel
    // private itemModel: TodoItemModel

    constructor() {
        this.dataServer = new TodoServer()

        this.listView = new TodoListView()
        this.listView.delegate = this
        this.listView.dataServer = this.dataServer
        this.listView.lists = this.dataServer.modelLists

    }
}

export default TodoApp