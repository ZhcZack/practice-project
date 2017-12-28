namespace b3 {
    class Check {
        private allornot = document.querySelector('.allornot input') as HTMLInputElement
        private checks = document.querySelectorAll('ul li input') as NodeListOf<HTMLInputElement>
        private status: boolean[] = []
        private toggle = document.querySelector('.toggle') as HTMLSpanElement

        constructor() {
            this.init()
        }

        private init() {
            for (let i = 0; i < this.checks.length; i++) {
                this.status.push(this.checks[i].checked)
            }

            for (let i = 0; i < this.checks.length; i++) {
                this.checks[i].addEventListener('change', e => {
                    const index = Number(this.checks[i].dataset.index)
                    if (index) {
                        this.status[index] = !this.status[index]
                        this.refresh()
                    }
                })
            }

            this.allornot.addEventListener('change', e => {
                const value = this.allornot.checked
                if (value) {
                    this.status.forEach((s, i, arr) => {
                        arr[i] = true
                    })
                } else {
                    this.status.forEach((s, i, arr) => {
                        arr[i] = false
                    })
                }
                this.refresh()
            })

            this.toggle.addEventListener('click', e => {
                this.status.forEach((s, i, arr) => {
                    arr[i] = !arr[i]
                })
                this.refresh()
            })
        }

        private refresh() {
            for (var i = 0; i < this.status.length; i++) {
                this.checks[i].checked = this.status[i]
            }
            const result = this.status.every(function (s) {
                return s
            })

            if (result) {
                this.allornot.checked = true
                if (this.allornot.nextElementSibling) {
                    this.allornot.nextElementSibling.textContent = '全不选'
                }
            } else {
                this.allornot.checked = false
                if (this.allornot.nextElementSibling) {
                    this.allornot.nextElementSibling.textContent = '全选'
                }
            }
        }

    }

    function __main() {
        const o = new Check()
    }
    __main()

}