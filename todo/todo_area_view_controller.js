class ViewController {
    constructor(name) {
        this.name = name;
        this.model = this.connectModel(name);
        this.view = new TodoView(this);
        this.detailView = null;
        this.setup();
    }
    setup() {
        // this.bindEvents();
        // this.view.controller = this;
    }
    connectModel(name) {
        return new TodoModel(name);
        // log('hi');
    }
    get todos() {
        return this.model.todos;
    }
    todolistClickEvent(view, index) {
        const todo = this.model.getItem(index);
        log(todo);
        this.detailView = new TodoItemDetailView(todo);
    }
}