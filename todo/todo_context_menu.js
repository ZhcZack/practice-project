class TodoContextmenu {
    constructor() {
        this.setup();
    }
    setup() {
        const menu = document.createElement('ul');
        menu.classList.add('todo-contextmenu');
        this.menu = menu;
        const del = document.createElement('li');
        del.textContent = '删除清单';
        del.classList.add('todo-contextmenu-delete');
        this.del = del;
        menu.appendChild(del);

        this.bindEvents();
    }
    bindEvents() {
        this.del.addEventListener('click', event => {
            if (this.delegate) {
                this.delegate.deleteList();
                document.body.removeChild(this.menu);
            }
        });
    }
    setPosition(x, y) {
        // 应该将delegate作为父元素
        this.menu.style.left = x + 'px';
        this.menu.style.top = y + 'px';
        document.body.appendChild(this.menu);
    }
}