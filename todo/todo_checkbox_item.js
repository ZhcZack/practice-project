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
    get isChecked() {
        return this.checked;
    }
    switchChecked() {
        this.checked = true;
        this.element.classList.add('todo-checkbox-checked');
    }
    switchUnChecked() {
        this.checked = false;
        this.element.classList.remove('todo-checkbox-checked');
    }
    toggleStatus() {
        this.checked = !this.checked;
        this.checked ?
            this.element.classList.add('todo-checkbox-checked') :
            this.element.classList.remove('todo-checkbox-checked');
    }
}