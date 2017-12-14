// 自定义“视图”
namespace CustomView {
    // “新建清单”按钮
    export class CustomNewList {
        private element: HTMLElement
        private defaultListName = '无命名清单'
        private index = -1
        constructor() {
            this.setup()
            this.bindEvents()
        }
        private setup() {
            const div = document.createElement('div')
            div.textContent = '新建清单'
            div.id = 'add-new-list'
            this.element = div
        }

        private bindEvents() {
            this.element.addEventListener('click', event => {
                event.stopPropagation()
            })
        }
        get elem(): HTMLElement {
            return this.element
        }
        get listName(): string {
            this.index++
            return this.index > 0 ? this.defaultListName + this.index : this.defaultListName
        }
    }

    export interface CustomNewListDelegate {
        newListClicked(newList: CustomNewList): void
    }

    // “添加待办事项”按钮
    export class CustomNewItem {
        private element: HTMLDivElement
        private closeButton: HTMLElement
        private addButton: HTMLElement
        private inputArea: HTMLInputElement
        delegate: TodoAreaView | null

        constructor() {
            this.setup()
            this.bindEvents()
        }

        get elem(): HTMLDivElement {
            return this.element
        }

        private setup() {
            this.element = document.createElement('div')
            this.closeButton = document.createElement('span')
            this.addButton = document.createElement('span')
            this.inputArea = document.createElement('input')

            this.element.id = 'add-new-item'
            this.closeButton.id = 'close-button'
            this.addButton.id = 'add-button'
            this.inputArea.id = 'input-area'

            this.closeButton.textContent = 'X'
            this.closeButton.classList.add('hide')
            this.addButton.textContent = '添加'
            this.addButton.classList.add('hide')
            this.inputArea.placeholder = '添加待办事项'

            this.element.appendChild(this.inputArea)
            this.element.appendChild(this.closeButton)
            this.element.appendChild(this.addButton)
        }

        private inputMode() {
            this.inputArea.focus()
            this.closeButton.classList.remove('hide')
            this.addButton.classList.remove('hide')
        }

        private normalMode() {
            this.inputArea.value = ''
            this.inputArea.blur()
            this.closeButton.classList.add('hide')
            this.addButton.classList.add('hide')
        }

        private bindEvents() {
            this.inputArea.addEventListener('keyup', event => {
                // log('hi')
                if (event.key === 'Control' || event.key === 'Shift') {
                    return
                }
                const target = event.target as HTMLInputElement
                const value = target.value
                if (value !== '') {
                    this.inputMode()
                } else {
                    this.normalMode()
                }
            })
            this.closeButton.addEventListener('click', event => {
                this.normalMode()
            })
            this.addButton.addEventListener('click', event => {
                const value = this.inputArea.value
                this.normalMode()
                if (this.delegate) {
                    this.delegate.addButtonClicked(value)
                }
            })
        }
    }
    export interface CustomNewItemDelegate {
        addButtonClicked(value: string): void
    }

    // 自定义checkbox
    export class CustomCheckbox {
        private element: HTMLElement
        private isChecked: boolean
        delegate: CustomCheckboxDelegate | null

        constructor() {
            this.isChecked = false
            this.delegate = null
            this.setup()
        }

        private setup() {
            const div = document.createElement('div')
            div.classList.add('custom-checkbox')
            div.textContent = '√'
            this.element = div

            this.bindEvents()
        }

        get checked(): boolean {
            return this.isChecked
        }
        get elem(): HTMLElement {
            return this.element
        }

        switchChecked() {
            this.isChecked = true
            this.element.classList.add('checked')
        }

        private toggleStatus() {
            if (this.isChecked) {
                this.element.classList.add('checked')
            } else {
                this.element.classList.remove('checked')
            }
        }

        private bindEvents() {
            this.element.addEventListener('click', event => {
                this.isChecked = !this.isChecked
                this.toggleStatus()
                event.stopPropagation()
                if (this.delegate) {
                    this.delegate.checkboxClicked(this)
                }
            })
        }
    }

    export interface CustomCheckboxDelegate {
        checkboxClicked(checkbox: CustomCheckbox): void
    }
}