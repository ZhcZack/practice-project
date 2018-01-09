import TodoAreaView from './todo_area_view';
import CustomView from './custom_view';
import { TodoItemInterface } from '../model/todo_item';
import { get, getAll, log } from '../util/util';

export class TodoDetailView implements CustomView.CustomCheckboxDelegate {
    delegate: TodoAreaView | null
    private element: HTMLElement
    private checkbox: CustomView.CustomCheckbox
    private nameLabel: HTMLElement
    private closeButton: HTMLElement
    private deleteButton: HTMLElement
    private timeLabel: HTMLElement
    private todoItem: TodoItemInterface

    constructor() {
        this.element = get('#detailview')
        this.checkbox = new CustomView.CustomCheckbox()
        this.checkbox.delegate = this
        this.nameLabel = get('#detailview .title')
        this.closeButton = get('#detailview .disappear')
        this.deleteButton = get('#detailview .delete')
        this.timeLabel = get('#detailview .create-time')

        this.setup()
    }

    closeView() {
        this.disappear()
    }

    private setup() {
        this.bindEvents()
    }

    private bindEvents() {
        this.closeButton.addEventListener('click', event => {
            this.closeView()
            if (this.delegate) {
                this.delegate.closeButtonClicked(this.todoItem)
            }
        })
        this.deleteButton.addEventListener('click', event => {
            const title = this.todoItem.name
            this.closeView()
            if (this.delegate) {
                this.delegate.deleteButtonClicked(this.todoItem)
            }
        })
        this.element.addEventListener('contextmenu', event => {
            event.preventDefault()
            event.stopPropagation()
        })
    }

    set item(item: TodoItemInterface) {
        this.todoItem = item
        this.appear()
        this.updateUI()
    }

    private updateUI() {
        this.nameLabel.textContent = this.todoItem.name
        this.nameLabel.parentNode!.insertBefore(this.checkbox.elem, this.nameLabel)
        this.timeLabel.textContent = '创建于' + this.todoItem.date.split(' ')[0]

        if (this.todoItem.done) {
            this.checkbox.switchChecked()
        } else {
            this.checkbox.switchUnchecked()
        }
    }

    private disappear() {
        // hide detail view
        this.element.classList.add('disappear')
    }

    private appear() {
        // show detail view
        this.element.classList.remove('disappear')
    }

    // custom checkbox delegate method
    checkboxClicked(checkbox: CustomView.CustomCheckbox) {
        if (this.delegate) {
            this.delegate.toggleItem(this.todoItem)
        }
    }
}

export interface TodoDetailViewDelegate {
    closeButtonClicked(item: TodoItemInterface): void
    deleteButtonClicked(item: TodoItemInterface): void
    toggleItem(item: TodoItemInterface): void
}