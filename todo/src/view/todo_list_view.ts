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
        this.areaView.name = this.getItemModelName()
        this.setup()
    }

    private getItemModelName(): string {
        const name = localStorage.getItem('list-name-before-closed')
        return name ? name : '我的一天'
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
        const itemModelName = this.getItemModelName()
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

            if (list === itemModelName) {
                li.classList.add('active')
            }
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
            let elem: HTMLLIElement | null = null
            let temp: HTMLElement | null = null

            if (target.nodeName === 'LI') {
                elem = target as HTMLLIElement
                temp = elem.querySelector('.item-name')
            } else if (target.nodeName === 'SPAN') {
                temp = target.closest('li') as HTMLElement
                if (temp !== null) {
                    elem = temp as HTMLLIElement
                    temp = elem.querySelector('.item-name')
                }
            }

            // 动画效果
            if (elem !== null && elem.parentNode) {
                const parent = elem.parentNode as HTMLElement
                const siblings = parent.querySelectorAll('li')
                for (let i = 0; i < siblings.length; i++) {
                    siblings[i].classList.remove('active')
                }
                elem.classList.add('active')
            }

            if (temp !== null) {
                name = temp.textContent ? temp.textContent : ''
                this.areaView.name = name
                localStorage.setItem('list-name-before-closed', name)
            }
        })
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