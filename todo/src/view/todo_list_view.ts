import TodoApp from '../model/todo_app'
import TodoAreaView from './todo_area_view'
import TodoServer from '../model/todo_server'
import CustomView from './custom_view'
import { get, getAll, log } from '../util/util'

class TodoListView implements CustomView.CustomNewListDelegate, CustomView.CustomListViewRightMenuDelegate {
    private element: HTMLElement
    private listView: HTMLElement
    private customNewList: CustomView.CustomNewList
    private rightMenu: CustomView.CustomListViewRightMenu
    private itemList: string[]
    private latestModelList: string
    private toBeDelected: string

    delegate: TodoApp | null
    dataServer: TodoServer

    private areaView: TodoAreaView

    constructor() {
        this.element = get('#listview')
        this.listView = get('#listview ul')

        this.customNewList = new CustomView.CustomNewList()
        this.customNewList.delegate = this

        this.rightMenu = new CustomView.CustomListViewRightMenu()
        this.rightMenu.delegate = this

        this.areaView = new TodoAreaView()
        this.areaView.delegate = this

        this.setup()
    }

    set lists(lists: string[]) {
        this.itemList = lists
        this.areaView.dataServer = this.dataServer
        this.updateUI()
    }

    get cssProperties(): { width: number; height: number } {
        let width = this.listView.getBoundingClientRect()['width']
        let height = this.element.getBoundingClientRect()['height']
        return { width, height }
    }

    private setup() {
        this.addCustomViews()
        // this.connectModel(
        this.bindEvents();
    }
    private addCustomViews() {
        this.element.appendChild(this.customNewList.elem)
        this.element.appendChild(this.rightMenu.elem)
    }
    // private connectModel() {
    //     this.model = new TodoListModel()
    //     this.updateUI()
    // }
    private updateUI() {
        this.latestModelList = this.dataServer.latestModelList
        this.itemList = this.dataServer.modelLists
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
        this.areaView.name = this.latestModelList
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
                this.dataServer.setSnapchat(name)
            }

            event.stopPropagation()
        })
        this.listView.addEventListener('contextmenu', event => {
            event.stopPropagation()
            event.preventDefault()

            const target = event.target as HTMLElement
            if (target.nodeName === 'LI') {
                if (target.firstElementChild && target.firstElementChild.textContent) {
                    this.toBeDelected = target.firstElementChild.textContent
                }
            } else if (target.nodeName === 'SPAN') {
                if (target.textContent) {
                    this.toBeDelected = target.textContent
                }
            }

            if (this.toBeDelected === '我的一天') {
                this.rightMenu.disappear()
                return;
            }

            if (this.rightMenu.isHidden) {
                this.rightMenu.appear()
            }

            this.rightMenu.setPosition(target.getBoundingClientRect().bottom)
        })
        this.element.addEventListener('click', event => {
            event.stopPropagation()
            this.rightMenu.disappear()
        }, false)
        this.element.addEventListener('contextmenu', event => {
            event.preventDefault()
            event.stopPropagation()
        })
    }

    // add new list delegate methods
    newListClicked(newList: CustomView.CustomNewList): void {
        let name = this.customNewList.listName
        while (this.itemList.indexOf(name) !== -1) {
            name = this.customNewList.listName
        }
        this.dataServer.addNewList(name)
        this.updateUI()
    }

    // right menu delegate methods
    deleteList() {
        if (this.toBeDelected !== '') {
            this.dataServer.removeList(this.toBeDelected)
            this.dataServer.removeSnapchat()
            this.rightMenu.disappear()
            this.updateUI()
        }
    }
}

export default TodoListView