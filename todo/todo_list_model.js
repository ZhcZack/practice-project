class TodoListModel {
    constructor() {
        this.id = 'todo-app-list'
        this._lists = []
        this.setup()
    }
    setup() {
        this.init()
    }
    init() {
        const lists = localStorage.getItem(this.id)
        // log(lists)
        if (!lists) {
            this.save()
        } else {
            this.load()
        }
    }
    get lists() {
        return JSON.parse(JSON.stringify(this._lists))
    }
    save() {
        this._lists.push('我的一天')
        const lists = {
            lists: this._lists,
        }
        localStorage.setItem(this.id, JSON.stringify(lists))
    }
    load() {
        this.clear()
        const lists = localStorage.getItem(this.id)
        // log(JSON.parse(lists))
        for (let list of JSON.parse(lists).lists) {
            this._lists.push(list)
        }
    }
    clear() {
        this._lists = []
    }
}