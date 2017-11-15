class TodoItemModel {
    constructor(id) {
        this.id = id;
        this.items = [];
        this.setup();
    }
    get modelName() {
        return 'todo-app-model-' + this.id;
    }
    setup() {
        this.init();
    }
    init() {
        const todos = localStorage.getItem(this.modelName);
        // log(todos);
        if (!todos) {
            this.save();
        } else {
            this.load();
        }
    }
    getItem(index) {
        return this.items[index];
    }
    _info(title) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].title === title) {
                return { find: true, index: i }
            }
        }
        return { find: false }
    }
    add(title) {
        const info = this._info(title);
        if (!info.find) {
            const item = new TodoItem(title, new Date().toLocaleString());
            this.items.push(item);
            this.save();
        }
    }
    remove(title) {
        const info = this._info(title);
        if (info.find) {
            const index = info.index;
            this.items.splice(index, 1);
            this.save();
        }
    }
    find(title) {
        return this._info(title).find;
    }
    toggle(title) {
        const info = this._info(title);
        if (info.find) {
            this.items[info.index].toggleStatus();
            this.save();
        }
    }
    save() {
        const data = {
            todos: this.items,
        }
        localStorage.setItem(this.modelName, JSON.stringify(data));
    }
    load() {
        this.clear();
        const todos = localStorage.getItem(this.modelName);
        // log(JSON.parse(todos));
        for (let todo of JSON.parse(todos).todos) {
            let item = new TodoItem(todo.title,
                todo.time,
                todo.done);
            this.items.push(item);
        }
    }
    clear() {
        this.items = [];
    }
    get completedTodos() {
        return this.items.filter(item => item.isFinished);
    }
    get todos() {
        return JSON.parse(JSON.stringify(this.items));
    }
}