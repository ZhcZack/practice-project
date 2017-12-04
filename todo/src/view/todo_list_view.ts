class TodoListView {
    private model: TodoListModel
    private element: HTMLElement
    private listView: HTMLElement
    private customNewList: CustomView.CustomNewList
    private lists: string[]
    delegate: TodoApp;

    constructor() {
        this.element = get('#listview')
        this.listView = get('#listview ul')
        this.customNewList = new CustomView.CustomNewList()
        this.setup()
    }
    private setup() {
        this.addCustomViews()
        this.connectModel()
        this.bindEvents()
    }
    private addCustomViews() {
        this.element.appendChild(this.customNewList.elem)
    }
    private connectModel() {
        this.model = new TodoListModel()
        this.updateUI()
    }
    private updateUI() {
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
    private bindEvents() {
        this.customNewList.elem.addEventListener('click', (event: Event) => {
            let name = this.customNewList.listName
            while (this.lists.indexOf(name) !== -1) {
                name = this.customNewList.listName
            }
            this.model.add(name)
            this.updateUI()
        })
        this.listView.addEventListener('click', event => {
            const target = event.target as HTMLElement;
            if (target.nodeName !== 'LI') {
                return;
            }
            const name = target.textContent as string;
            // 让代理（也就是app）做切换视图内容的工作。
            this.delegate.toggleAreaView(name);
        });
    }
}