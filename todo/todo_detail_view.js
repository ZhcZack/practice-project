class TodoItemDetailView {
    constructor() {
        this.element = get('#todo-detail');
        this.todoItem = null;
        this.setup();
    }

    setup() {
        this.closeButton = get('#todo-detail .todo-detail-view-closebutton');
        this.deleteButton = get('#todo-detail .todo-detail-nav .todo-delete-button');
        // log('hi');
        // this.refreshUI();
        this.bindEvents();
    }

    appear() {
        this.element.classList.remove('hide');
    }
    disappear() {
        this.element.classList.add('hide');
    }
    set todo(value) {
        this.todoItem = value;
        this.appear();
        this.areaView.shrink();
        this.refreshUI();
    }

    refreshUI() {
        let title = get('#todo-detail .todo-detail-title p');
        let time = get('#todo-detail .todo-detail-nav .todo-create-time');

        title.textContent = this.todoItem.title;
        time.textContent = '创建于' + this.todoItem.time.split(' ')[0];
    }

    bindEvents() {
        this.closeButton.addEventListener('click', event => {
            this.disappear();
            this.areaView.stretch();
        });
        this.deleteButton.addEventListener('click', event => {
            this.disappear();
            this.areaView.stretch();
            this.areaView.deleteTodoItem(this.todoItem);
        });
    }
}