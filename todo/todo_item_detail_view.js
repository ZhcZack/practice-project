class TodoItemDetailView {
    constructor(item) {
        this.elem = get('#todo-detail');
        this.item = item;

        this.setup();
    }

    setup() {
        log('hi');
        this.refreshUI();
    }

    refreshUI() {
        let title = get('#todo-detail .todo-detail-title p');
        let time = get('#todo-detail .todo-detail-nav .todo-create-time');

        title.textContent = this.item.title;
        time.textContent = '创建于' + this.item.time.split(' ')[0];
    }
}