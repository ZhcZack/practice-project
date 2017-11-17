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
        // insert custom checkbox
        const title = get('#todo-detail .todo-detail-title p');
        let checkbox = new TodoCheckbox();
        this.checkbox = checkbox;
        title.parentNode.insertBefore(checkbox.element, title);

        this.bindEvents();
    }

    get isDisplayed() {
        return !this.element.classList.contains('hide');
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
        this.todoItem.done ? this.checkbox.switchChecked() : this.checkbox.switchUnChecked();
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
        this.checkbox.element.addEventListener('click', event => {
            const title = this.checkbox.element.nextElementSibling.textContent;
            this.checkbox.toggleStatus();
            this.areaView.toggleItem(title);
            this.areaView.refreshUI();
        });
    }
}