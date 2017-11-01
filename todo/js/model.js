class TodoModel {
	constructor(storageID = 'my-model-test') {
		if (this.instance) {
			return this.instance
		}
		// 设置一个id给不同的model单独的空间保存todo信息
		this.storageID = storageID
		// items保存todo的信息
		this.items = []
		// complete items
		this.completeItems = []
		this.load()
		this.instance = this
	}

	add(title) {
		const result = this._info(title)
		if (!result.find) {
			const item = new TodoItem(title)
			this.items.push(item)
			this.save()
		}
	}

	_info(title) {
		for (let i = 0; i < this.items.length; i++) {
			if (this.items[i].title === title) {
				return { find: true, index: i }
			}
		}
		return { find: false }
	}

	remove(title) {
		const result = this._info(title)
		if (result.find) {
			const index = result.index
			this.items.splice(index, 1)

			this.save()
		}
	}

	toggle(title) {
		const result = this._info(title)
		if (result.find) {
			const index = result.index
			this.items[index].toggle()
			if (this.items[index].isDone) {
				this.completeItems.push(this.items[index])
			}
			this.save()
		}
	}

	get todos() {
		var data = {
			todos: this.items
		}
		return JSON.stringify(data)
	}
	get completed() {
		const items = this.completeItems.map(item => item.title)
		return items
	}

	save() {
		var data = {
			todos: this.items
		}
		localStorage.setItem(this.storageID, JSON.stringify(data))
	}

	load() {
		const todos = localStorage.getItem(this.storageID)
		if (todos) {
			this.items = []
			this.completeItems = []
			// 从localstorage中还原每一个TodoItem的状态
			for (let todo of JSON.parse(todos).todos) {
				const t = new TodoItem(todo.title, todo.done)
				if (todo.done) {
					this.completeItems.push(t)
				}
				this.items.push(t)
			}
		}
	}

	clear() {
		localStorage.removeItem(this.storageID)
		this.items = []
	}
}