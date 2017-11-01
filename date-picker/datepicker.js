const log = console.log.bind(console)

function insertAfter(newNode, targetNode) {
	var after = targetNode.nextElementSibling
	if (!after) {
		after.parentNode.appendChild(newNode)
	} else {
		targetNode.parentNode.insertBefore(newNode, after)
	}
}

function isLeapyear(year) {
	if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
		return true
	}
	return false
}

function yearBounds(start, end) {
	var years = []
	for (var i = start; i <= end; i++) {
		years.push(i)
	}
	return years
}

function monthsOfYear(year) {
	var months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
	if (isLeapyear(year)) {
		months[1] = 29
	}
	return months
}

function test() {
	var years = yearBounds()
	years.forEach(function (year) {
		console.log(monthsOfYear(year))
	})
}

function Datepicker(id) {
	var _d = new Date()
	var p = {
		elem: document.querySelector('#' + id),
		yearBounds: yearBounds(1970, 2050),
		months: [],
		startYear: 1970,
		endYear: 2050,
		nowDay: _d,
		nowYear: _d.getFullYear(),
		nowMonth: _d.getMonth(),
		nowDate: _d.getDate(),
		months: monthsOfYear(_d.getFullYear()),
		// 缓存？
		navTemp: null,
		weekTemp: null,
	}

	p.prevMonth = function () {
		var year = this.nowYear
		if (!(year >= this.startYear && year <= this.endYear)) {
			return
		}
		this.nowMonth--
		if (this.nowMonth < 0) {
			this.nowMonth = 11
			this.nowYear--
		}
	}

	p.nextMonth = function () {
		var year = this.nowYear
		if (!(year >= this.startYear && year <= this.endYear)) {
			return
		}
		this.nowMonth++
		if (this.nowMonth > 11) {
			this.nowMonth = 0
			this.nowYear++
		}
	}

	p.refresh = function () {
		this.remove()
		this.display()
	}

	p.elem.addEventListener('click', function (event) {
		p.display()
		event.stopPropagation()
	})

	window.addEventListener('click', function (event) {
		p.remove()
	})

	p.display = function () {
		var z = document.querySelector('.datepicker-dialog')
		if (!z) {
			var zone = document.createElement('div')
			zone.classList.add('datepicker-dialog')
			zone.style.position = 'absolute'
			var rect = this.elem.getBoundingClientRect()
			var x = rect.x
			var y = rect.bottom
			var width = rect.width
			zone.style.left = x + 'px'
			zone.style.top = y + 'px'
			zone.style.width = width + 'px'

			var nav = this.displayNav()
			// var text = this.displayText()
			var dateZone = this.displayDateZone()

			zone.appendChild(nav)
			zone.appendChild(dateZone)
			// zone.appendChild(text)

			insertAfter(zone, this.elem)
		}
	}

	p.displayNav = function () {
		var nav = this.navTemp
		if (!this.navTemp) {
			nav = document.createElement('div')
			nav.classList.add('datepicker-dialog-nav')

			var left = document.createElement('span')
			left.classList.add('datepicker-dialog-nav-prev', 'datepicker-dialog-nav-control')
			left.textContent = 'prev'
			var right = document.createElement('span')
			right.classList.add('datepicker-dialog-nav-next', 'datepicker-dialog-nav-control')
			right.textContent = 'next'

			var ySel = this.displayYSel()
			var mSel = this.displayMSel()
			var text = this.displayText()

			left.addEventListener('click', function (event) {
				p.prevMonth()

				p.refresh()
				event.stopPropagation()
			})
			right.addEventListener('click', function (event) {
				p.nextMonth()

				p.refresh()
				event.stopPropagation()
			})

			nav.appendChild(left)
			nav.appendChild(right)
			nav.appendChild(ySel)
			nav.appendChild(mSel)
			nav.appendChild(text)

			this.navTemp = nav
		}

		return nav
	}

	// 年份选择器
	p.displayYSel = function () {
		var self = this
		var ySel = document.createElement('select')
		ySel.classList.add('datepicker-dialog-nav-ysel')
		for (var i = this.startYear; i <= this.endYear; i++) {
			var o = document.createElement('option')
			o.setAttribute('value', i)
			o.textContent = i
			if (i === this.nowYear) {
				o.setAttribute('selected', true)
			}
			ySel.appendChild(o)
		}
		ySel.addEventListener('click', function (event) {
			event.stopPropagation()
		})
		ySel.addEventListener('change', function (event) {
			self.nowYear = event.target.value
			self.refresh()
			event.stopPropagation()
		})
		return ySel
	}
	// 月份选择器
	p.displayMSel = function () {
		var self = this
		var mSel = document.createElement('select')
		mSel.classList.add('datepicker-dialog-nav-msel')
		for (var j = 1; j <= 12; j++) {
			o = document.createElement('option')
			o.setAttribute('value', j)
			o.textContent = j
			if (j === (p.nowMonth + 1)) {
				o.setAttribute('selected', true)
			}
			mSel.appendChild(o)
		}
		mSel.addEventListener('click', function (event) {
			event.stopPropagation()
		})
		mSel.addEventListener('change', function (event) {
			self.nowMonth = event.target.value - 1
			self.refresh()
			event.stopPropagation()
		})
		return mSel
	}

	p.displayDateZone = function () {
		var d = document.createElement('table')
		d.classList.add('datepicker-dialog-datezone')
		// d.setAttribute('cols', 7)

		var w = p.displayWeeks()
		var ds = p.displayDate()

		d.appendChild(w)
		d.appendChild(ds)

		d.addEventListener('click', function (event) {
			var t = event.target
			if (t.nodeName === 'TD') {
				if (t.textContent !== '') {
					p.pickDate(t.textContent)
				}
			}
			event.stopPropagation()
		})

		return d
	}

	p.displayWeeks = function () {
		var map = {
			0: '日',
			1: '一',
			2: '二',
			3: '三',
			4: '四',
			5: '五',
			6: '六',
		}
		var w = this.weekTemp
		if (!w) {
			w = document.createElement('thead')
			w.classList.add('datepicker-dialog-datezone-weeks')

			var tr = document.createElement('tr')
			for (var i = 0; i < 7; i++) {
				var th = document.createElement('th')
				th.textContent = map[i]
				tr.appendChild(th)
			}
			w.appendChild(tr)
		}

		return w
	}

	p.displayDate = function () {
		var ds = document.createElement('tbody')
		ds.classList.add('datapicker-dialog-datezone-days')
		var days = p.months[p.nowMonth]
		var n = 1
		var i = 0 // index
		var start = new Date(this.nowYear, this.nowMonth, 1).getDay() // 星期几

		var tr = document.createElement('tr')
		while (n <= days) {
			var td = document.createElement('td')
			if (i >= start) {
				td.classList.add('has-value')
				td.textContent = n
				n++
			} else {
				td.textContent = ''
			}
			i++
			tr.appendChild(td)
			if (i % 7 === 0 && i !== 0) {
				ds.appendChild(tr)
				if (n <= days) {
					tr = document.createElement('tr')
				}
			}
		}
		ds.appendChild(tr)
		return ds
	}

	p.displayText = function () {
		var t = document.createElement('span')
		t.classList.add('datepicker-dialog-text')
		t.textContent = this.nowYear + '-' + (this.nowMonth + 1) + '-' + this.nowDate
		return t
	}

	p.remove = function () {
		var z = document.querySelector('.datepicker-dialog');
		if (z) {
			z.parentNode.removeChild(z)
		}
	}

	p.pickDate = function (date) {
		var result = this.nowYear + '-' + (this.nowMonth + 1) + '-' + date
		this.elem.value = result
		this.remove()
	}

	return p

}

var p = Datepicker('picker')
// var pc = Datepicker('picker-clone')
// alert(p.nowDay)