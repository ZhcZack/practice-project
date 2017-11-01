/**
 * 每一个todo都是TodoItem的实例
 */
class TodoItem {
	/**
	 * 生成TodoItem的实例
	 * @param {string} title todo的内容
	 * @param {boolean} done todo的完成状态
	 */
	constructor(title, done = false) {
		this.title = title
		this.done = done
	}
	toggle() {
		this.done = !this.done
	}
	get isDone() {
		return this.done
	}
}