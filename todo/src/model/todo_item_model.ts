class TodoItemModel {
    private itemList: TodoItem[]
    private modelName: string
    constructor(name: string) {
        this.itemList = [];
        this.modelName = name
        this.setup()
    }
    setup() {
        this.load()
    }
    add(title: string) {
        if (!this.info(title).find) {
            const item = new TodoItem(title)
            this.itemList.push(item)
            this.save()
        }
    }
    private info(name: string): { find: boolean, index?: number } {
        for (let i = 0; i < this.itemList.length; i++) {
            if (this.itemList[i].title === name) {
                return {
                    find: true,
                    index: i,
                }
            }
        }
        return { find: false }
    }
    toggle(name: string) {
        const info = this.info(name);
        if (info.find) {
            const item = this.itemList[info.index as number];
            item.toggleStatus();
            this.save();
        }
    }
    remove(title: string) {
        const info = this.info(title)
        if (!info.find) {
            return
        }
        this.itemList.splice(info.index as number, 1)
    }
    clear() {
        this.itemList = []
        this.save()
    }
    save() {
        const data = {
            'todos': this.itemList
        }
        localStorage.setItem(this.modelName, JSON.stringify(data))
    }
    load() {
        const data = localStorage.getItem(this.modelName)
        if (data === null) {
            this.itemList = []
            this.save()
        } else {
            const todos = JSON.parse(data).todos as TodoItemInterface[]
            for (let todo of todos) {
                let item = new TodoItem(todo.itemName, todo.isDone, todo.date)
                this.itemList.push(item)
            }
        }
    }

    deleteModel() {
        localStorage.removeItem(this.modelName)
    }

    get items(): TodoItemInterface[] {
        let result: TodoItemInterface[] = []
        for (let item of this.itemList) {
            let face: TodoItemInterface = {
                itemName: item.title,
                isDone: item.isFinished,
                date: item.createTime
            }
            result.push(face);
        }
        return result
    }
    getItem(title: string): TodoItem | null {
        const info = this.info(title);
        if (info.find) {
            return this.itemList[info.index as number];
        }
        return null;
    }
}