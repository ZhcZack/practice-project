class TodoView {
    constructor(controller) {
        this.controller = controller;
        this.setup();
    }
    setup() {
        this.list = get('#todo-area-list ul');
        this.todoListCallback = null;

        this.displayTodoList();
        this.bindEvents();
    }
    displayTodoList() {
        const todos = this.controller.todos;
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
            // log(target);
            if (target.nodeName !== 'INPUT') {
                const index = target.closest('li').dataset.index;
                this.controller.todolistClickEvent(this, index);
            }
        })
    }
}