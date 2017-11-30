class TodoApp {
    private listView: TodoListView;
    private areaView: TodoAreaView;
    private detailView: TodoDetailView;

    constructor() {
        this.listView = new TodoListView()
        this.listView.delegate = this;
        this.areaView = new TodoAreaView()
        this.areaView.delegate = this;
        this.detailView = new TodoDetailView();
        this.detailView.delegate = this;
    }
    toggleAreaView(name: string) {
        this.areaView.name = name;
    }
    toggleDetailView(item: TodoItem) {
        this.detailView.item = item;
    }
}