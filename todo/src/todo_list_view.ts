class TodoListView {
    private model: TodoListModel
    private element: HTMLElement
    private listView: HTMLElement
    private customNewList: CustomView.CustomNewList
    private lists: string[]

    constructor() {
        this.element = get('#todo-list-view')
        this.listView = get('#todo-list-view ul')
        this.customNewList = new CustomView.CustomNewList()
        this.setup()
    }
    setup() {
        this.addCustomViews()
        this.connectModel()
        this.bindEvents()
    }
    addCustomViews() {
        this.element.appendChild(this.customNewList.elem)
    }
    connectModel() {
        this.model = new TodoListModel()
        this.refreseUI()
    }
    refreseUI() {
        let child = this.listView.firstElementChild
        while (child !== null) {
            this.listView.removeChild(child)
            child = this.listView.firstElementChild
        }
        this.lists = this.model.lists
        for (let list of this.lists) {
            let li = document.createElement('li')
            li.classList.add('list-item')
            li.textContent = list
            this.listView.appendChild(li)
        }
    }
    bindEvents() {
        this.customNewList.elem.addEventListener('click', (event: Event) => {
            let name = this.customNewList.listName
            while (this.lists.indexOf(name) !== -1) {
                name = this.customNewList.listName
            }
            this.model.add(name)
            this.refreseUI()
        })
    }
}