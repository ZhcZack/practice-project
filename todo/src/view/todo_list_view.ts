class TodoListView {
    private model: TodoListModel
    private element: HTMLElement
    private listView: HTMLElement
    private customNewList: CustomView.CustomNewList
    private itemList: string[]
    private timer: number
    delegate: TodoApp | null

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
        this.itemList = this.model.lists
        for (let list of this.itemList) {
            let li = document.createElement('li')
            li.classList.add('list-item')

            let name = document.createElement('span')
            name.classList.add('item-name')
            name.textContent = list

            let number = document.createElement('span')
            number.classList.add('number-of-items')
            number.textContent = ''

            li.appendChild(name)
            li.appendChild(number)
            this.listView.appendChild(li)
        }
        this.timer = setInterval(() => {
            this.displayItemNumberOfList()
        }, 500)
    }
    private displayItemNumberOfList() {
        if (this.delegate) {
<<<<<<< HEAD
            clearInterval(this.timer);
            const items = this.listView.querySelectorAll('.item-name');
=======
            clearInterval(this.timer)
            const items = this.listView.querySelectorAll('.item-name')
>>>>>>> 3cd509b4af9afa47820b209adb78a9020be2d192
            for (let i = 0; i < items.length; i++) {
                let name = items[i].textContent as string
                let numberOfItems = this.delegate.numberOfItemsInList(name)
                let numberLabel = items[i].nextElementSibling as HTMLElement
                numberLabel.textContent = numberOfItems > 0 ? String(numberOfItems) : ''
            }
        }
    }
    private bindEvents() {
        this.customNewList.elem.addEventListener('click', (event: Event) => {
            let name = this.customNewList.listName
            while (this.itemList.indexOf(name) !== -1) {
                name = this.customNewList.listName
            }
            this.model.add(name)
            this.updateUI()
        })
        this.listView.addEventListener('click', event => {
            const target = event.target as HTMLElement
            let name = ''
            if (target.nodeName === 'LI') {
                name = target.querySelector('.item-name')!.textContent as string
            } else if (target.nodeName === 'SPAN') {
                const li = target.closest('li')
                if (li) {
                    name = li.querySelector('.item-name')!.textContent as string
                }
            }
            // 让代理（也就是app）做切换视图内容的工作。
            this.delegate!.toggleAreaView(name)
            this.delegate!.closeDetailView()
        });
    }

    // delegate methods
    refreshUI() {
        this.displayItemNumberOfList()
    }
}