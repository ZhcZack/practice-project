class TodoAreaView {
    private element: HTMLElement;
    private nameLabel: HTMLDivElement;
    private contentView: HTMLElement;
    private itemModel: TodoItemModel;
    private modelName: string;
    private customNewItem: CustomView.CustomNewItem

    constructor() {
        this.element = get('#areaview');
        this.nameLabel = get('#areaview .name') as HTMLDivElement;
        this.contentView = get('#areaview-content ul');
        this.customNewItem = new CustomView.CustomNewItem()
        this.customNewItem.delegate = this;
        this.setup();
    }
    private setup() {
        // very bad hard code
        this.modelName = '我的一天';
        this.connectModel('我的一天');

        this.element.appendChild(this.customNewItem.elem)
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
        const items = this.itemModel.items;
        for (let item of items) {
            let li = document.createElement('li');
            li.classList.add('todo-item');
            let span = document.createElement('span');
            span.classList.add('todo-item-content');
            span.textContent = item;
            li.appendChild(span);
            this.contentView.appendChild(li);
        }
    }
    // delegate methods
    addNewItem(title: string) {
        this.itemModel.add(title);
        this.updateUI();
    }
}