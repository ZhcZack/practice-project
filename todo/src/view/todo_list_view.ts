class TodoListView implements CustomView.CustomNewListDelegate {
    private element: HTMLElement
    private listView: HTMLElement
    private customNewList: CustomView.CustomNewList
    private itemList: string[]
    private latestModelList: string;
    private timer: number
    delegate: TodoApp | null
    dataServer: TodoServer;

    private areaView: TodoAreaView;

    constructor() {
        this.element = get('#listview');
        this.listView = get('#listview ul');

        this.customNewList = new CustomView.CustomNewList();
        this.customNewList.delegate = this;

        this.areaView = new TodoAreaView();
        this.areaView.delegate = this;

        this.setup();
    }

    set lists(lists: string[]) {
        this.itemList = lists;
        this.updateUI();
        this.areaView.dataServer = this.dataServer;
        this.areaView.name = this.latestModelList;
    }

    private setup() {
        this.addCustomViews();
        // this.connectModel()
        this.bindEvents();
    }
    private addCustomViews() {
        this.element.appendChild(this.customNewList.elem)
    }
    // private connectModel() {
    //     this.model = new TodoListModel()
    //     this.updateUI()
    // }
    private updateUI() {
        this.latestModelList = this.dataServer.latestModelList;
        this.itemList = this.dataServer.modelLists;
        // log(this.itemList);
        let child = this.listView.firstElementChild
        while (child !== null) {
            this.listView.removeChild(child)
            child = this.listView.firstElementChild
        }
        for (let list of this.itemList) {
            let li = document.createElement('li')
            li.classList.add('list-item')

            let name = document.createElement('span')
            name.classList.add('item-name')
            name.textContent = list

            let number = document.createElement('span')
            number.classList.add('number-of-items')
            number.textContent = ''

            if (list === this.latestModelList) {
                li.classList.add('active')
            }
            li.appendChild(name)
            li.appendChild(number)
            this.listView.appendChild(li)
        }
    }

    private bindEvents() {
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
        this.dataServer.addNewList(name);
        this.updateUI();
    }
}