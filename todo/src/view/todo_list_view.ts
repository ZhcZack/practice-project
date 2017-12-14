class TodoListView implements CustomView.CustomNewListDelegate {
    private model: TodoListModel
    private element: HTMLElement
    private listView: HTMLElement
    private customNewList: CustomView.CustomNewList
    private itemList: string[]
    private timer: number
    delegate: TodoApp | null

    private areaView: TodoAreaView

    constructor() {
        this.element = get('#listview')
        this.listView = get('#listview ul')
        this.customNewList = new CustomView.CustomNewList()

        this.areaView = new TodoAreaView()
        this.areaView.delegate = this
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
    }

    private bindEvents() {
        // this.customNewList.elem.addEventListener('click', (event: Event) => {
        //     let name = this.customNewList.listName
        //     while (this.itemList.indexOf(name) !== -1) {
        //         name = this.customNewList.listName
        //     }
        //     this.model.add(name)
        //     this.updateUI()
        // })
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
            // this.delegate!.toggleAreaView(name)
            // this.delegate!.closeDetailView()
            this.areaView.name = name
        });
    }

    // add new list delegate methods
    newListClicked(newList: CustomView.CustomNewList): void {
        let name = this.customNewList.listName
        while (this.itemList.indexOf(name) !== -1) {
            name = this.customNewList.listName
        }
        this.model.add(name)
        this.updateUI()
    }
}