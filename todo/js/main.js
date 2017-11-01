const log = console.log.bind(console)

window.addEventListener('load', e => {
	__main()
})

function __main() {
	view = new TodoView('todo')
}