/**
 * 用于控制视图部分的类
 */
class TodoView {
	/**
	 * View类的构造函数
	 * @param {string} id 视图的标识符
	 */
	constructor(id) {
		this.id = `#${id}`
		this.input = document.querySelector(`${this.id} input`)
		// this.addButton = document.querySelector(`${this.id} .add`)
		// this.clearButton = document.querySelector(`${this.id} .clear`)
		this.todoItems = document.querySelector(`${this.id} .todo-items`)
		this.model = new TodoModel('my-todo')

		this.init()

		// 函数名称可能要改下，这是让初始就有保存的todo显示出来
		this.reload()
	}

	/**
	 * view初始化时进行事件绑定
	 */
	init() {
		/**
		 * todo项目的绑定事件
		 */
		this.todoItems.addEventListener('click', e => {
			const target = e.target
			if (target.nodeName.toLowerCase() === 'input') {
				// 点击的是勾选todo是否完成的按钮
				this.model.toggle(target.value)
				this.reload()
			} else if (target.nodeName.toLowerCase() === 'span') {
				// 点击的是删除todo项目的按钮
				const value = target.parentNode.querySelector('input').value
				this.model.remove(value)
				this.reload()
			}
			// alert(`${target}, ${target.checked}`)
		})
		/**
		 * 光标在input上时键盘事件绑定
		 */
		this.input.addEventListener('keyup', e => {
			// 按下的键是enter
			if (e.key === 'Enter') {
				const value = e.target.value
				this.model.add(value)
				this.reload()
			}
		})
	}
	/**
	 * 重新载入model里的todo项目
	 * （这里完全没有考虑性能方面的问题）
	 */
	reload() {
		const todos = JSON.parse(this.model.todos)
		this.todoItems.innerHTML = ''
		for (let todo of todos.todos) {
			const item = document.createElement('p')
			item.innerHTML = `<input type="checkbox" value="${todo.title}"><label></label><span>x</span>`
			item.querySelector('label').textContent = todo.title

			// 判断是否是完成状态
			if (todo.done) {
				// 已完成
				item.querySelector('input').checked = true
				item.querySelector('label').classList.add('done')
			}
			this.todoItems.appendChild(item)
		}
		this.clearInput()
	}
	/**
	 * 事件结束后清除用户输入，并且让输入框获得焦点
	 */
	clearInput() {
		this.input.value = ''
		this.input.focus()
	}
}