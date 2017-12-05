/**
 * 代码结构设计存在严重缺陷，后面的改动直到设计变得正常为止不会增加新功能。
 * 
 * 每一个view的delegate不应该是app，而应该是相关联的上一层view。
 * models应该保存在app里，用不着和views进行绑定。相当于app是绑定models的一个‘view’
 */

class TodoApp {
    private listView: TodoListView;
    private areaView: TodoAreaView;
    private detailView: TodoDetailView;

    private tempItemsModel: TodoItemModel | null;

    constructor() {
        this.listView = new TodoListView();
        this.listView.delegate = this;
        this.areaView = new TodoAreaView();
        this.areaView.delegate = this;
        this.detailView = new TodoDetailView();
        this.detailView.delegate = this;
    }
    toggleAreaView(name: string) {
        this.areaView.name = name;
    }
    toggleDetailView(item: TodoItemInterface) {
        this.detailView.item = item;
    }
    closeDetailView() {
        this.areaView.stretchView();
        this.detailView.closeView();
    }
    // 我也不知道这个设计对不对，反正写到现在了感觉不太对劲……
    deleteItem(title: string) {
        this.areaView.deleteItem(title);
        this.listView.refreshUI();
    }
    toggleItem(title: string) {
        this.areaView.toggleItem(title);
    }

    numberOfItemsInList(listName: string): number {
        this.tempItemsModel = new TodoItemModel(listName);
        const result = this.tempItemsModel.numberOfItems;
        this.tempItemsModel = null;
        return result;
    }
}