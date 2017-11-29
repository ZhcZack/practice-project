class TodoApp {
    private listView: TodoListView
    private areaView: TodoAreaView
    constructor() {
        this.listView = new TodoListView()
        this.listView.delegate = this;
        this.areaView = new TodoAreaView()
    }
    toggleAreaView(name: string) {
        this.areaView.name = name;
    }
}