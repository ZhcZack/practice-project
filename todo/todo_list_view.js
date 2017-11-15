class TodoListView {
    constructor() {
        this.lists = [];
        this.model = null
        this.element = get('#todo-list-view');
        this.areaView = null;
        this.setup();
    }
    setup() {
        this.load();
        this.refreshUI();
        this.bindEvents();
    }
    load() {
        this.model = new TodoListModel()
        this.lists = this.model.lists
    }
    refreshUI() {
        this.element.innerHTML = ''
        for (let list of this.lists) {
            let li = document.createElement('li');
            li.classList.add('todo-list-view-item');
            li.textContent = list;
            this.element.appendChild(li);
        }
        // 这里后面可以设置为下一次打开的时候恢复之前打开的列表
        this.switchAreaView(this.lists[0]);
    }
    switchAreaView(name) {
        this.areaView = new TodoAreaView(name);
    }
    bindEvents() {
        this.element.addEventListener('click', event => {
            const target = event.target;
            if (target.nodeName !== 'LI') {
                return;
            }
            const name = target.textContent;
            this.areaView = new TodoAreaView(name);
            this.areaView.connectModel();
        });
    }
}