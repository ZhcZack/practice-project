class TodoListModel {
    private todoLists: string[] = []
    private name = 'todo-app-list'
    constructor() {
        this.setup()
    }
    setup() {
        this.load()
    }
    add(name: string) {
        if (!this.info(name).find) {
            this.todoLists.push(name)
            this.save()
        }
    }
    private info(name: string): { find: boolean, index?: number } {
        for (let i = 0; i < this.todoLists.length; i++) {
            if (this.todoLists[i] === name) {
                return {
                    find: true,
                    index: i,
                }
            }
        }
        return { find: false }
    }
    remove(name: string) {
        const info = this.info(name)
        if (!info.find) {
            return
        }
        this.todoLists.splice(info.index as number, 1)
    }
    clear() {
        this.todoLists = []
        this.save()
    }
    save() {
        const data = {
            'lists': this.todoLists
        }
        localStorage.setItem(this.name, JSON.stringify(data))
    }
    load() {
        const data = localStorage.getItem(this.name)
        if (data === null) {
            this.todoLists.push('我的一天')
            this.save()
        } else {
            this.todoLists = JSON.parse(data).lists
        }
    }

    deleteModel() {
        localStorage.removeItem(this.name)
    }
    get lists(): string[] {
        return JSON.parse(JSON.stringify(this.todoLists))
    }
}