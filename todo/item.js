class TodoItem {
    constructor(title, time, done = false) {
        this.title = title;
        this.time = time;
        this.done = done;
    }
    toggleStatus() {
        this.done = !this.done;
    }
    get isFinished() {
        return this.done;
    }
}