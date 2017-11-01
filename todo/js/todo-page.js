class TodoView {
	constructor(id) {
		this.id = `#${id}`
		this.input = document.querySelector(`${this.id} #todo-label`)
		this.addButton = document.querySelector(`${this.id} .add`)
		// this.clearButton = document.querySelector(`${this.id} .clear`)
		this.todoItems = document.querySelector(`${this.id} .todo-items`)
		this.model = new TodoModel('my-todo')

		this.setup()

		// 函数名称可能要改下，这是让初始就有保存的todo显示出来
		this.reload()
	}

	setup() {

		this.addButton.addEventListener('click', e => {
			const title = this.input.value
			if (title !== '') {
				this.model.add(title)
				this.showSnackbar('add a new item ' + title)
				this.reload()
			} else {
				this.showSnackbar('please enter an item')
			}
		})

		// this.clearButton.addEventListener('click', e => {
		// 	this.model.clear()
		// 	this.reload()
		// })

		this.todoItems.addEventListener('click', e => {
			const target = e.target
			let value = ''
			if (target.nodeName.toLowerCase() === 'input') {
				value = target.dataset.value
				this.model.toggle(value)
				this.reload()
			}
		})

		this.input.addEventListener('keyup', e => {
			// 按下的键是enter
			if (e.key === 'Enter') {
				const value = e.target.value
				this.model.add(value)
				this.showSnackbar('add a new item ' + value)
				this.reload()
			}
		})
	}

	showSnackbar(title) {
		// show snackbars
		let notification = document.querySelector('.mdl-js-snackbar')
		let data = {
			message: title,
		}
		notification.MaterialSnackbar.showSnackbar(data)
	}

	reload() {
		const todos = JSON.parse(this.model.todos).todos
		this.todoItems.innerHTML = ''
		for (let todo of todos) {
			let label = document.createElement('label')
			label.className = 'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect'
			label.setAttribute('for', `${todo.title + '' + this.id}`)
			let temp = `<input type="checkbox" id="${todo.title + '' + this.id}" 
			class="mdl-checkbox__input" data-value="${todo.title}">
			<span class="mdl-checkbox__label todo-label">${todo.title}</span>`
			label.innerHTML = temp

			// 判断是否是完成状态
			if (todo.done) {
				// 已完成
				label.querySelector('input').setAttribute('checked', 'true')
				label.querySelector('.todo-label').classList.add('todo-label-done')
			}
			componentHandler.upgradeElement(label)
			this.todoItems.appendChild(label)
		}
		this.clearInput()
	}

	clearInput() {
		this.input.value = ''
		// this.input.focus()
	}
}