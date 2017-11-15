class TodoAreaView {
    constructor(name) {
        this.model = null;
        this.name = name;
        this.nameLabel = get('#todo-area-header-name');
        this.element = get('#todo-area');
        this.list = get('#todo-area-list ul');
        // store custom checkbox
        this.checkboxs = []
        this.setup();
    }
    setup() {
        this.nameLabel.textContent = this.name;
        // this.todoListCallback = null;
        this.detailView = new TodoItemDetailView();
        this.detailView.areaView = this;
        this.inputArea = new TodoInputArea();
        this.inputArea.areaView = this;
        this.connectModel();
    }
    connectModel() {
        this.model = new TodoItemModel(this.name);
        this.refreshUI();
        this.bindEvents();
    }
    // 数据库操作，应该可以分出去的。等重构吧
    // 我应该再新建一个根父类表示整个页面，三个view作为它的实例变量。这样就可以让model在三个view中共享
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
    toggleItem(title) {
        this.model.toggle(title)
    }
    // 当需要更新area-view的时候会从model中拿到数据重新展示
    refreshUI() {
        if (!this.model) {
            return;
        }
        this.list.innerHTML = '';
        this.checkboxs = []
        const todos = this.model.todos;
        let index = 0;
        for (let todo of todos) {
            let li = document.createElement('li');
            li.classList.add('list-item');
            li.dataset.index = index;
            // custom checkbox
            let check = new TodoCheckbox();
            if (todo.done) {
                check.markDone();
            }
            this.checkboxs.push(check);
            let p = document.createElement('p');
            p.textContent = todo.title;

            li.appendChild(check.element);
            li.appendChild(p);

            this.list.appendChild(li);
            index++;
        }
    }
    // 自定义的checkbox点击事件处理函数
    // `check` is an instance of `TodoCheckbox`
    checkboxClickEvent(check) {
        const element = check.element;
        const title = element.nextElementSibling.textContent; // todo `title`
        check.checked = !check.checked;
        if (check.checked) {
            element.classList.add('todo-checkbox-checked');
        } else {
            element.classList.remove('todo-checkbox-checked');
        }
        // // change the status of `todo` item
        this.toggleItem(title);
    }
    bindEvents() {
        this.list.addEventListener('click', event => {
            const target = event.target;
            const index = target.closest('li').dataset.index;
            const item = this.model.getItem(index);
            if (target.nodeName === 'DIV') {
                // click checkbox
                this.checkboxClickEvent(this.checkboxs[index])
            } else {
                this.detailView.todo = item;
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