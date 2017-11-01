function __main() {
	// load complete todos
	const model = new TodoModel('my-todo')
	const coms = model.completed

	if (coms.length <= 0) {
		empty()
	} else {
		displayItems(model)
	}
}

function empty() {
	const p = document.createElement('p')
	p.textContent = 'Empty'
	const content = document.querySelector('.page-content')
	content.appendChild(p)
}

function displayItems(model) {
	const coms = model.completed
	const table = document.querySelector('table')
	table.innerHTML = `<thead><tr><th class="mdl-data-table__cell-non-numeric">
	Name</th><th>Status</th></tr></thead><tbody></tbody>`
	const body = table.querySelector('tbody')

	coms.forEach(com => {
		const tr = document.createElement('tr')
		const name = document.createElement('td')
		name.setAttribute('class', 'mdl-data-table__cell--non-numeric')
		name.textContent = com
		tr.appendChild(name)

		const status = document.createElement('td')
		status.innerHTML = `<td>Done</td>`
		tr.appendChild(status)

		componentHandler.upgradeElement(tr)

		body.appendChild(tr)
	})
}

window.addEventListener('load', e => {
	__main()
})