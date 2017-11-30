class TodoAreaView {
    private element: HTMLElement;
    private nameLabel: HTMLDivElement;
    private contentView: HTMLElement;
    private itemModel: TodoItemModel;
    private modelName: string;
    private customNewItem: CustomView.CustomNewItem
    private checkboxList: CustomView.CustomCheckbox[]
    delegate: TodoApp;

    constructor() {
        this.element = get('#areaview');
        this.nameLabel = get('#areaview .name') as HTMLDivElement;
        this.contentView = get('#areaview-content ul');
        this.customNewItem = new CustomView.CustomNewItem()
        this.customNewItem.delegate = this;
        this.checkboxList = [];
        this.setup();
    }
    private setup() {
        // very bad hard code
        this.modelName = '我的一天';
        this.connectModel('我的一天');
        this.bindEvents();

        this.element.appendChild(this.customNewItem.elem)
    }
    private bindEvents() {
        this.contentView.addEventListener('click', event => {
            const target = event.target as HTMLElement;
            // 点击的是checkbox
            if (target.classList.contains('custom-checkbox')) {
                const item = target.nextElementSibling!.textContent as string;
                this.toggleItemStatus(item);
            } else if (target.classList.contains('todo-item-content')) {
                const title = target.textContent as string;
                const item = this.itemModel.getItem(title);
                if (!item) {
                    this.delegate.toggleDetailView(item!);
                }
            }
        });
    }

    private toggleItemStatus(item: string) {
        this.itemModel.toggle(item);
    }
    private connectModel(name: string) {
        this.itemModel = new TodoItemModel(name);
        this.updateUI();
    }
    set name(value: string) {
        this.modelName = value;
        this.connectModel(value);
    }
    private updateUI() {
        this.nameLabel.textContent = this.modelName;
        this.contentView.innerHTML = '';
        this.checkboxList = [];
        const items = this.itemModel.items;
        for (let item of items) {
            let li = document.createElement('li');
            li.classList.add('todo-item');
            let span = document.createElement('span');
            span.classList.add('todo-item-content');
            span.textContent = item.itemName;
            let check = new CustomView.CustomCheckbox();
            this.checkboxList.push(check);

            li.appendChild(check.elem);
            li.appendChild(span);

            if (item.isDone) {
                check.switchChecked();
            }
            this.contentView.appendChild(li);
        }
    }
    // delegate methods
    addNewItem(title: string) {
        this.itemModel.add(title);
        this.updateUI();
    }
}