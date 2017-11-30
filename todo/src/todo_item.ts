class TodoItem {
    private itemName: string
    private isDone: boolean
    private date: string
    constructor(title: string, done = false, date = new Date().toLocaleString()) {
        this.itemName = title
        this.isDone = done
        this.date = new Date().toLocaleString()
    }
    get title(): string {
        return this.itemName
    }
    get isFinished(): boolean {
        return this.isDone
    }
    get createTime(): string {
        return this.date;
    }
    toggleStatus() {
        this.isDone = !this.isDone
    }
    equal(item: TodoItem): boolean {
        return this.itemName === item.itemName
    }
}

interface TodoItemInterface {
    itemName: string
    isDone: boolean
    date: string
}