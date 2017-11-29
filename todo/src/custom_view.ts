namespace CustomView {
    export class CustomNewList {
        private element: HTMLElement
        private defaultListName = '无命名清单'
        private index = -1
        constructor() {
            this.setup()
        }
        private setup() {
            const div = document.createElement('div')
            div.textContent = '新建清单'
            div.id = 'add-new-list'
            this.element = div
        }
        get elem(): HTMLElement {
            return this.element
        }
        get listName(): string {
            this.index++
            return this.index > 0 ? this.defaultListName + this.index : this.defaultListName
        }
    }

    export class CustomNewItem {
        private element: HTMLDivElement;
        private closeButton: HTMLElement;
        private addButton: HTMLElement;
        private inputArea: HTMLInputElement;
        delegate: TodoAreaView;

        constructor() {
            this.setup();
            this.bindEvents();
        }

        get elem(): HTMLDivElement {
            return this.element;
        }

        private setup() {
            this.element = document.createElement('div');
            this.closeButton = document.createElement('span');
            this.addButton = document.createElement('span');
            this.inputArea = document.createElement('input');

            this.element.id = 'add-new-item';
            this.closeButton.id = 'close-button';
            this.addButton.id = 'add-button';
            this.inputArea.id = 'input-area';

            this.closeButton.textContent = 'X';
            this.closeButton.classList.add('hide');
            this.addButton.textContent = '添加';
            this.addButton.classList.add('hide');
            this.inputArea.placeholder = '添加待办事项';

            this.element.appendChild(this.inputArea);
            this.element.appendChild(this.closeButton);
            this.element.appendChild(this.addButton);
        }

        private inputMode() {
            this.inputArea.focus();
            this.closeButton.classList.remove('hide');
            this.addButton.classList.remove('hide');
        }

        private normalMode() {
            this.inputArea.value = '';
            this.inputArea.blur();
            this.closeButton.classList.add('hide');
            this.addButton.classList.add('hide');
        }

        private bindEvents() {
            this.inputArea.addEventListener('keyup', event => {
                log('hi');
                const target = event.target as HTMLInputElement;
                const value = target.value;
                if (value !== '') {
                    this.inputMode();
                } else {
                    this.normalMode();
                }
            });
            this.closeButton.addEventListener('click', event => {
                this.normalMode();
            });
            this.addButton.addEventListener('click', event => {
                const value = this.inputArea.value;
                this.delegate.addNewItem(value);
                // 重复代码，后面再改
                this.normalMode();
            });
        }
    }
}