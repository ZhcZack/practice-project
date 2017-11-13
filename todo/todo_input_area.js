class TodoInputArea {
    constructor() {
        this.identify = '#todo-area-add-area';
        this.inputArea = get(this.identify);
        this.input = get(this.identify + ' .todo-area-add');
        this.closeButton = get(this.identify + ' .todo-area-closebutton');
        this.addButton = get(this.identify + ' .todo-area-addbutton');

        this.setup();
    }
    setup() {
        this.bindEvents();
    }
    bindEvents() {
        this.input.addEventListener('keyup', event => {
            // log('h');
            let value = this.input.value;
            if (value) {
                this.closeButton.classList.remove('hide');
                this.addButton.classList.remove('hide');
            } else {
                this.closeButton.classList.add('hide');
                this.addButton.classList.add('hide');
            }
        });
        this.closeButton.addEventListener('click', event => {
            this.input.value = '';
            this.input.blur();
        });
        this.addButton.addEventListener('click', event => {
            this.areaView.addNewItem(this.input.value);
            this.input.value = '';
            this.input.blur();
        });
    }
}