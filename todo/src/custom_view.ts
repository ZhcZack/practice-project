namespace CustomView {
    export class CustomNewList {
        private element: HTMLElement
        private defaultListName = '无命名清单'
        private index = -1
        constructor() {
            this.setup()
        }
        setup() {
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
}