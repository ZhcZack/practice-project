class TodoAreaView implements TodoDetailViewDelegate, CustomView.CustomNewItemDelegate {
    private element: HTMLElement
    private nameLabel: HTMLDivElement
    private contentView: HTMLElement
    private itemModel: TodoItemModel
    private modelName: string
    private customNewItem: CustomView.CustomNewItem
    private checkboxList: CustomView.CustomCheckbox[]
    delegate: TodoListView | null

    private detailView: TodoDetailView

    constructor() {
        this.element = get('#areaview')
        this.nameLabel = get('#areaview .name') as HTMLDivElement
        this.contentView = get('#areaview-content ul')
        this.customNewItem = new CustomView.CustomNewItem()
        this.customNewItem.delegate = this
        this.checkboxList = []

        this.detailView = new TodoDetailView()
        this.detailView.delegate = this
        this.setup()
    }

    set name(value: string) {
        this.modelName = value
        this.connectModel(value)
        this.detailView.closeView()
    }

    get numberOfItems(): number {
        return this.itemModel.numberOfItems
    }

    // private methods
    private setup() {
        this.bindEvents()

        this.element.appendChild(this.customNewItem.elem)
    }

    private bindEvents() {
        this.contentView.addEventListener('click', event => {
            const target = event.target as HTMLElement
            // log(target)
            if (target.classList.contains('todo-item')) {
                const title = target.querySelector('.todo-item-content')!.textContent as string
                const item = this.itemModel.getItem(title)
                if (item) {
                    this.detailView.item = item
                    this.shrinkView()
                }
            }
        })
    }

    private toggleItemStatus(title: string) {
        this.itemModel.toggle(title)
    }

    private connectModel(name: string) {
        this.itemModel = new TodoItemModel(name)
        this.updateUI()
    }

    private updateUI() {
        this.nameLabel.textContent = this.modelName
        this.contentView.innerHTML = ''
        this.checkboxList = []
        const items = this.itemModel.items
        for (let item of items) {
            // log(item)
            let li = document.createElement('li')
            li.classList.add('todo-item')
            let span = document.createElement('span')
            span.classList.add('todo-item-content')
            span.textContent = item.name
            let check = new CustomView.CustomCheckbox()
            check.delegate = this
            this.checkboxList.push(check)

            li.appendChild(check.elem)
            li.appendChild(span)

            if (item.done) {
                check.switchChecked()
                span.classList.add('done')
            }
            this.contentView.appendChild(li)
        }
    }

    // custom checkbox delegate methods
    checkboxClicked(checkbox: CustomView.CustomCheckbox) {
        const item = checkbox.elem.nextElementSibling
        if (item) {
            const title = item.textContent
            if (title) {
                item.classList.toggle('done')
                this.toggleItemStatus(title)
            }
        }
    }

    // custom view 'CustomNewItem' delegate methods
    addButtonClicked(value: string): void {
        this.addNewItem(value)
    }

    // detail view delegate methods
    closeButtonClicked(item: TodoItemInterface) {
        this.stretchView()
    }
    deleteButtonClicked(item: TodoItemInterface) {
        const title = item.name
        this.stretchView()
        this.deleteItem(title)
    }
    toggleItem(item: TodoItemInterface) {
        this.toggleItemStatus(item.name)
        this.updateUI()
    }

    private addNewItem(title: string) {
        this.itemModel.add(title)
        this.updateUI()
    }

    private deleteItem(title: string) {
        this.itemModel.remove(title)
        this.updateUI()
    }

    shrinkView() {
        this.element.classList.add('shrink')
    }
    stretchView() {
        this.element.classList.remove('shrink')
    }
}