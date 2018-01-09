import TodoListView from './todo_list_view'
import TodoServer from '../model/todo_server'
import { TodoDetailView, TodoDetailViewDelegate } from './todo_detail_view'
import CustomView from './custom_view'
import { TodoItemInterface } from '../model/todo_item'
import { get, getAll, log } from '../util/util'

class TodoAreaView implements TodoDetailViewDelegate, CustomView.CustomNewItemDelegate {
    private element: HTMLElement
    private nameLabel: HTMLDivElement
    private contentView: HTMLElement
    private listName: string
    private customNewItem: CustomView.CustomNewItem
    private checkboxList: CustomView.CustomCheckbox[]
    delegate: TodoListView | null
    dataServer: TodoServer

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
        this.listName = value
        this.detailView.closeView()
        this.updateUI()
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
                const item = this.dataServer.getItemInList(title, this.listName);
                if (item) {
                    this.detailView.item = item
                    this.shrinkView()
                }
            }
        })
        this.element.addEventListener('contextmenu', event => {
            event.preventDefault()
            event.stopPropagation()
        })
    }

    private toggleItemStatus(title: string) {
        this.dataServer.toggleItemInList(title, this.listName)
    }

    private updateUI() {
        this.nameLabel.textContent = this.listName
        this.contentView.innerHTML = ''
        this.checkboxList = []
        const items = this.dataServer.itemsInList(this.listName)
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
        const checkItem = checkbox.elem.nextElementSibling
        if (checkItem) {
            const title = checkItem.textContent
            if (title) {
                checkItem.classList.toggle('done')
                this.toggleItemStatus(title)
                const item = this.dataServer.getItemInList(title, this.listName)
                if (item) {
                    this.detailView.item = item
                    this.shrinkView()
                }
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
        this.dataServer.addItemInList(title, this.listName)
        this.updateUI()
    }

    private deleteItem(title: string) {
        const result = this.dataServer.removeItemInList(title, this.listName)
        if (result) {
            this.updateUI()
        }
    }

    shrinkView() {
        this.element.classList.add('shrink')
    }
    stretchView() {
        this.element.classList.remove('shrink')
    }
}

export default TodoAreaView