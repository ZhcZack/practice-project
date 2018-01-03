namespace b9 {
    const get = (sel: string): HTMLElement | null => document.querySelector(sel)
    const getAll = (sel: string): NodeListOf<HTMLElement> => document.querySelectorAll(sel)
    const log = console.log.bind(console)

    window.addEventListener('load', function () {
        main()
    })

    function main() {
        const button = get('button')
        if (!button) { return }
        const game = new PuzzleGame('.box')
        button.addEventListener('click', e => {
            if (game.started) {
                game.restart()
            } else {
                game.start()
                button.textContent = '重新开始'
            }
        })
    }


    class PuzzleGame {
        private box: HTMLElement | null
        private puzzles: NodeListOf<HTMLElement>
        started: boolean
        private itemMoveTimer: number
        private chosenMoveTimer: number

        private isDrag: boolean
        private isMoving: boolean
        private startX: number
        private startY: number
        private maxWidth: number
        private maxHeight: number
        private isGameStarted: boolean
        private chosenPuzzle: HTMLElement | null

        constructor(private identifier: string) {
            this.box = get(this.identifier)
            this.puzzles = getAll(this.identifier + ' li')
            this.started = false

            // timers for moving
            this.itemMoveTimer = 0
            this.chosenMoveTimer = 0
            this.chosenPuzzle = null
        }


        // init puzzles style,  position and mouse events
        private setup() {
            if (this.puzzles.length < 1) {
                return
            }
            this.isGameStarted = true
            // style and position
            const w = this.puzzles[0].offsetWidth
            const h = this.puzzles[0].offsetHeight
            const baseHref = 'http://www.fgm.cc/learn/lesson9/img/girl0/'
            const hrefArray = []
            for (let i = 0; i < this.puzzles.length; i++) {
                this.puzzles[i].style.position = 'absolute'
                this.puzzles[i].dataset.move = i + ''
                this.puzzles[i].classList.remove('already')
                // this.puzzles[i].removeEventListener('mousedown', this.mousedownEvent)
                // this.puzzles[i].removeEventListener('mousemove', this.mousemoveEvent)
                // this.puzzles[i].removeEventListener('mouseup', this.mouseupEvent)
                if (i <= 4) {
                    this.puzzles[i].style.top = '0'
                    this.puzzles[i].style.left = i * w + 'px'
                } else if (i >= 5 && i <= 9) {
                    this.puzzles[i].style.top = h + 'px'
                    this.puzzles[i].style.left = (i - 5) * w + 'px'
                } else {
                    this.puzzles[i].style.top = h * 2 + 'px'
                    this.puzzles[i].style.left = (i - 10) * w + 'px'
                }
                hrefArray.push(i)
            }
            hrefArray.sort((a, b) => {
                return Math.random() > 0.5 ? 1 : -1
            })
            for (let i = 0; i < hrefArray.length; i++) {
                this.puzzles[i].dataset.index = hrefArray[i] + ''
                const img = this.puzzles[i].querySelector('img')
                if (img) {
                    img.src = baseHref + (hrefArray[i] + 1) + '.png'
                }
            }
        }

        // game end
        private end() {
            this.isGameStarted = false
            const baseHref = 'http://www.fgm.cc/learn/lesson9/img/girl0/'

            this.started = false
            for (let i = 0; i < this.puzzles.length; i++) {
                this.puzzles[i].querySelector('img')!.src = baseHref + (i + 1) + '.png'
                this.puzzles[i].style.cssText = ''
                this.puzzles[i].removeAttribute('data-index')
                this.puzzles[i].removeAttribute('data-move')
                this.puzzles[i].className = ''
                // this.puzzles[i].removeEventListener('mousedown', this.mousedownEvent)
                // this.puzzles[i].removeEventListener('mousemove', this.mousemoveEvent)
                // this.puzzles[i].removeEventListener('mouseup', this.mouseupEvent)
            }
            alert('Game end!')
        }

        // game start
        start() {
            if (!this.box) {
                return
            }
            // game start
            this.started = true

            this.setup()

            // mouse events
            this.isDrag = false
            this.isMoving = false
            this.startX = 0
            this.startY = 0
            this.maxWidth = this.box.offsetWidth
            this.maxHeight = this.box.offsetHeight

            this.puzzleEvents()
        }

        // restart puzzle game
        restart() {
            this.setup()
        }

        // prevent puzzle out of box's boundary
        private moveWithLimits(obj: HTMLElement) {
            // move with limits
            if (obj.offsetLeft <= 0) {
                obj.style.left = '0'
            } else if (obj.offsetLeft + obj.offsetWidth >= this.maxWidth) {
                obj.style.left = this.maxWidth - obj.offsetWidth + 'px'
            }
            if (obj.offsetTop <= 0) {
                obj.style.top = '0'
            } else if (obj.offsetTop + obj.offsetHeight >= this.maxHeight) {
                obj.style.top = this.maxHeight - obj.offsetHeight + 'px'
            }
        }

        // declare the puzzle moving with mouse is puzzle 'chosen'
        // check which puzzle of puzzles left in box is the puzzle 'item', 
        // which will change position with puzzle 'chosen'
        // 标记跟随鼠标移动的puzzle为'chosen'
        // 找到其他剩余puzzle中的'item'， 'item'是会与'chosen'交换位置的puzzle
        private identifyMovingPuzzles(obj: HTMLElement, x: number, y: number) {
            // obj is the puzzle 'chosen'
            // x, y is the mouse coordinate
            for (let j = 0; j < this.puzzles.length; j++) {
                this.puzzles[j].classList.remove('chosen', 'item')
                obj.classList.add('chosen')
                const rect = this.puzzles[j].getBoundingClientRect()
                if (x >= rect.left && x <= rect.left + rect.width) {
                    if (y >= rect.top && y <= rect.top + rect.height) {
                        // log('-----before----------')
                        // log('mouse x: ' + e.clientX + ', mouse y: ' + e.clientY)
                        // log('li left: ' + rect.left + ', li right: ' + rect.right)
                        // log('li top: ' + rect.top + ', li bottom: ' + rect.bottom)
                        // log('-----after----------')
                        if (!this.puzzles[j].classList.contains('already')) {
                            this.puzzles[j].classList.add('item')
                        }
                        obj.classList.remove('item')
                    }
                }
            }
        }

        // determine every puzzles is on its right position
        // 判断每一块puzzle是否处于正确的位置上，如果都是就结束游戏
        private puzzleIsOnRightPosition() {
            const targetLength = this.puzzles.length
            let length = 0
            // 判断puzzle是否处于正确的位置上
            for (var i = 0; i < this.puzzles.length; i++) {
                if (this.puzzles[i].dataset.move === this.puzzles[i].dataset.index) {
                    this.puzzles[i].classList.add('already')
                    length++
                }
            }
            if (length === targetLength) {
                this.end()
            }
        }

        // puzzle 'chosen' move back to its original position
        // 没有匹配到puzzle的时候，跟随鼠标移动的'chosen'回到它之前的位置
        private restorePuzzle(obj: HTMLElement) {
            // log('not have item')
            // 只有拖动的那一块可以移动的情况
            let startX = 0
            let startY = 0
            const index = Number(obj.dataset.move)
            const w = obj.offsetWidth
            const h = obj.offsetHeight
            if (index >= 0 && index <= 4) {
                startX = index * w
                startY = 0
            } else if (index >= 5 && index <= 9) {
                startX = (index - 5) * w
                startY = h
            } else {
                startX = (index - 10) * w
                startY = h * 2
            }
            // log(x, y)
            clearInterval(this.chosenMoveTimer)
            this.chosenMoveTimer = setInterval(() => {
                let speedX = (startX - obj.offsetLeft) / 10
                let speedY = (startY - obj.offsetTop) / 10
                if (speedX > 0) {
                    speedX = Math.ceil(speedX)
                } else {
                    speedX = Math.floor(speedX)
                }
                if (speedY > 0) {
                    speedY = Math.ceil(speedY)
                } else {
                    speedY = Math.floor(speedY)
                }
                if (speedX === 0 && speedY === 0) {
                    this.isMoving = false
                    clearInterval(this.chosenMoveTimer)
                    obj.classList.remove('chosen')
                }
                // log(speedX, speedY)
                obj.style.left = obj.offsetLeft + speedX + 'px'
                obj.style.top = obj.offsetTop + speedY + 'px'
            }, 1000 / 60)
        }

        // puzzle 'chosen' and puzzle 'item' change positions with other
        // 'chosen'和'item'两块puzzle互换位置
        private puzzlesMoving(item: HTMLElement, chosen: HTMLElement) {
            // 两块puzzle都可以移动的情况

            // 需要写清楚开始和结束的坐标
            // start是chosen元素
            // end是item元素
            let startX = 0
            let startY = 0
            let endX = item.offsetLeft
            let endY = item.offsetTop
            let chosenIndex = Number(chosen.dataset.move)
            let itemIndex = Number(item.dataset.move)
            let w = chosen.offsetWidth
            let h = chosen.offsetHeight
            if (chosenIndex >= 0 && chosenIndex <= 4) {
                startX = chosenIndex * w
                startY = 0
            } else if (chosenIndex >= 5 && chosenIndex <= 9) {
                startX = (chosenIndex - 5) * w
                startY = h
            } else {
                startX = (chosenIndex - 10) * w
                startY = h * 2
            }

            clearInterval(this.itemMoveTimer)
            this.itemMoveTimer = setInterval(() => {
                let speedX = (startX - item.offsetLeft) / 10
                let speedY = (startY - item.offsetTop) / 10
                if (speedX > 0) {
                    speedX = Math.ceil(speedX)
                } else {
                    speedX = Math.floor(speedX)
                }
                if (speedY > 0) {
                    speedY = Math.ceil(speedY)
                } else {
                    speedY = Math.floor(speedY)
                }
                item.style.left = item.offsetLeft + speedX + 'px'
                item.style.top = item.offsetTop + speedY + 'px'
                if (speedX === 0 && speedY === 0) {
                    this.isMoving = false
                    clearInterval(this.itemMoveTimer)
                    item.classList.remove('item')
                    // 更新拼图位置信息
                    item.dataset.move = chosenIndex + ''
                    this.puzzleIsOnRightPosition()
                }
            }, 1000 / 60)

            clearInterval(this.chosenMoveTimer)
            this.chosenMoveTimer = setInterval(() => {
                let speedX = (endX - chosen.offsetLeft) / 10
                let speedY = (endY - chosen.offsetTop) / 10
                if (speedX > 0) {
                    speedX = Math.ceil(speedX)
                } else {
                    speedX = Math.floor(speedX)
                }
                if (speedY > 0) {
                    speedY = Math.ceil(speedY)
                } else {
                    speedY = Math.floor(speedY)
                }
                chosen.style.left = chosen.offsetLeft + speedX + 'px'
                chosen.style.top = chosen.offsetTop + speedY + 'px'
                if (speedX === 0 && speedY === 0) {
                    this.isMoving = false
                    clearInterval(this.chosenMoveTimer)
                    chosen.classList.remove('chosen')
                    // 更新拼图位置信息
                    chosen.dataset.move = itemIndex + ''
                    this.puzzleIsOnRightPosition()
                }
            }, 1000 / 60)
        }

        private puzzleEvents() {
            const self = this
            for (let i = 0; i < this.puzzles.length; i++) {
                this.puzzles[i].addEventListener('mousedown', mousedownEvent)
                // this.puzzles[i].addEventListener('mousemove', mousemoveEvent)
                this.puzzles[i].addEventListener('mouseup', mouseupEvent)
            }
            window.addEventListener('mousemove', mousemoveEvent)

            function mousedownEvent(this: HTMLElement, e: MouseEvent) {
                if (!self.isGameStarted) {
                    return
                }
                self.chosenPuzzle = this
                self.isDrag = true
                self.startX = e.clientX
                self.startY = e.clientY
                // this.setCapture()
                e.stopPropagation()
                e.preventDefault()
            }

            function mousemoveEvent(e: MouseEvent) {
                if (!self.isGameStarted || !self.isDrag || !self.chosenPuzzle) {
                    return
                }
                if (self.isMoving) {
                    return
                }
                if (self.chosenPuzzle.classList.contains('already')) {
                    return
                }
                let dx = e.clientX - self.startX
                let dy = e.clientY - self.startY
                self.startX = e.clientX
                self.startY = e.clientY
                self.chosenPuzzle.style.left = self.chosenPuzzle.offsetLeft + dx + 'px'
                self.chosenPuzzle.style.top = self.chosenPuzzle.offsetTop + dy + 'px'
                // this.style.zIndex = parseInt(this.style.zIndex + '', 10) + 1 + ''

                // this.addEventListener('mouseout', e => {
                //     e.preventDefault()
                //     e.stopPropagation()
                // })

                self.moveWithLimits(self.chosenPuzzle)
                self.identifyMovingPuzzles(self.chosenPuzzle, e.clientX, e.clientY)
                e.stopPropagation()
            }

            function mouseupEvent(this: HTMLElement, e: MouseEvent) {
                if (!self.isGameStarted) {
                    return
                }
                if (this !== self.chosenPuzzle) {
                    return
                }
                self.isDrag = false
                if (self.isMoving) {
                    return
                }
                // this.releaseCapture()
                e.stopPropagation()
                e.preventDefault()

                // puzzle move
                const chosen = get('.box .chosen')
                const item = get('.box .item')

                if (!chosen) {
                    return
                }
                self.isMoving = true
                if (item) {
                    self.puzzlesMoving(item, chosen)
                } else {
                    self.restorePuzzle(chosen)
                }
            }

        }

    }
}