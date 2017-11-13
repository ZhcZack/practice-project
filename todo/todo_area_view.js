class TodoAreaView {
    constructor() {
        this.model = null;
        this.element = get('#todo-area');
        this.list = get('#todo-area-list ul');
        this.setup();
    }
    setup() {
        this.todoListCallback = null;
        this.detailView = new TodoItemDetailView();
        this.detailView.areaView = this;
        this.inputArea = new TodoInputArea();
        this.inputArea.areaView = this;
        // this.connectModel(modelName);
    }
    connectModel(modelName) {
        this.model = new TodoModel(modelName);
        this.refreshUI();
        this.bindEvents();
    }
    deleteTodoItem(item) {
        if (!item) {
            return;
        }
        this.model.remove(item.title);
        this.refreshUI();
    }
    addNewItem(title) {
        this.model.add(title);
        this.refreshUI();
    }
    refreshUI() {
        if (!this.model) {
            return;
        }
        this.list.innerHTML = '';
        const todos = this.model.todos;
        let index = 0;
        for (let todo of todos) {
            let li = document.createElement('li');
            li.classList.add('list-item');
            li.dataset.index = index;
            let check = document.createElement('input');
            check.type = 'checkbox';
            let p = document.createElement('p');
            p.textContent = todo.title;

            li.appendChild(check);
            li.appendChild(p);

            this.list.appendChild(li);
            index++;
        }
    }
    bindEvents() {
        this.list.addEventListener('click', event => {
            const target = event.target;
            if (target.nodeName !== 'INPUT') {
                const index = target.closest('li').dataset.index;
                const item = this.model.getItem(index);
                this.detailView.todo = item;
                // this.controller.todolistClickEvent(this, index);
            }
        })
    }
    shrink() {
        this.element.classList.add('shrink');
    }
    stretch() {
        this.element.classList.remove('shrink');
    }
}