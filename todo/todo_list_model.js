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
    add(list) {
        list = this.rename(list);
        this._lists.push(list);
        this.save();
    }
    remove(list) {
        const index = this._lists.indexOf(list);
        if (index !== -1) {
            this._lists.splice(index, 1);
            this.save();
        }
    }
    // `list` => `list1`, `list1` => `list2`
    rename(list) {
        let ls = this._lists.filter(l => l.startsWith(list));
        if (ls.length === 0) {
            return list;
        }
        let value = 1;
        for (let l of ls) {
            let n = l.match(/\d/);
            if (n && Number(n) >= value) {
                value = Number(n) + 1;
            }
        }
        return list + value;
    }
    save() {
        if (this._lists.length === 0) {
            this._lists.push('我的一天');
        }
        const lists = {
            lists: this._lists,
        }
        localStorage.setItem(this.id, JSON.stringify(lists));
    }
    load() {
        this.clear();
        const lists = localStorage.getItem(this.id);
        // log(JSON.parse(lists))
        for (let list of JSON.parse(lists).lists) {
            this._lists.push(list);
        }
    }
    clear() {
        this._lists = [];
    }
}