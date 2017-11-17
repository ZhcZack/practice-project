class TodoListView {
    constructor() {
        // this.lists = [];
        this.model = null;
        this.listView = get('#todo-list-view');
        this.areaView = new TodoAreaView();
        this.newListButton = get('#todo-list-add-area');
        this.rightClickList = null;
        this.setup();
    }
    get lists() {
        return this.model.lists;
    }
    setup() {
        this.load();
        this.switchAreaView(this.lists[0]);
        this.bindEvents();
    }
    load() {
        this.model = new TodoListModel();
        // this.lists = this.model.lists;
    }
    refreshUI() {
        this.listView.innerHTML = '';
        for (let list of this.lists) {
            let li = document.createElement('li');
            li.classList.add('todo-list-view-item');
            li.textContent = list;
            this.listView.appendChild(li);
        }
    }
    switchAreaView(name) {
        this.areaView.name = name;
        // 这里后面可以设置为下一次打开的时候恢复之前打开的列表
        this.refreshUI();
    }
    bindEvents() {
        this.listView.addEventListener('click', event => {
            const target = event.target;
            if (target.nodeName !== 'LI') {
                return;
            }
            const name = target.textContent;
            this.switchAreaView(name);
            event.stopPropagation();
        });
        this.newListButton.addEventListener('click', event => {
            const list = '无标题清单';
            this.model.add(list);
            this.switchAreaView(list);
        });
        this.listView.addEventListener('contextmenu', event => {
            const target = event.target;
            if (target.nodeName !== 'LI') {
                return;
            }
            // custom context menu
            this.contextmenu = new TodoContextmenu();
            this.contextmenu.delegate = this;
            this.rightClickList = target;
            // show context menu
            const x = event.clientX;
            const y = event.clientY;
            this.contextmenu.setPosition(x, y);
            event.preventDefault();
        });
    }
    deleteList() {
        const list = this.rightClickList.textContent;
        this.model.remove(list);
    }
}