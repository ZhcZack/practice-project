class TodoCheckbox {
    constructor() {
        this.checked = false;
        this.setup();
    }
    setup() {
        const check = document.createElement('div');
        check.classList.add('todo-checkbox');
        check.innerText = '✓';
        this.element = check;
    }
    markDone() {
        this.checked = true;
        this.element.classList.add('todo-checkbox-checked');
    }
}