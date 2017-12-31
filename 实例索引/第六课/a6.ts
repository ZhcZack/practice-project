namespace a6 {
    const get = (sel: string): HTMLElement | null => document.querySelector(sel)
    const getAll = (sel: string): NodeListOf<HTMLElement> => document.querySelectorAll(sel)
    const log = console.log.bind(console)

    function weiboPostAction() {
        const button = get('#wb .wb-post-button')
        const content = get('#wb .wb-content') as HTMLTextAreaElement
        const numbers = get('#wb .wb-post-numbers')
        if (!button || !content || !numbers) {
            return
        }
        const warning = numbers.previousElementSibling
        if (!warning) {
            return
        }

        content.addEventListener('keyup', e => {
            // log('hi')
            const length = content.value.length
            if (length <= 140) {
                numbers.classList.remove('wb-post-numbers-warning')
                numbers.textContent = 140 - length + ''
                warning.textContent = '还能输入'
            } else {
                numbers.classList.add('wb-post-numbers-warning')
                numbers.textContent = length - 140 + ''
                warning.textContent = '已超出'
            }
        })

        button.addEventListener('click', postWeibo)
    }

    function postWeibo(e: MouseEvent) {
        const b = e.target
        const username = get('#wb .user .username') as HTMLInputElement
        const image = get('#wb .user .userimage .current img') as HTMLImageElement
        const content = get('#wb .wb-content') as HTMLTextAreaElement
        const numbers = get('#wb .wb-post-numbers')

        if (!username || !image || !content || !numbers) {
            return
        }
        const warning = numbers.previousElementSibling
        if (!warning) {
            return
        }

        const result = judgeQualifiedWeibo(username, content)
        if (!result) {
            return
        }

        const href = image.src
        const text = content.value
        const name = username.value
        postWeiboAnimated(href, name, text)
    }

    function postWeiboAnimated(src: string, name: string, text: string) {
        const temp = get('#wb .wb-display-area .wb-display-template') as HTMLElement
        if (!temp) {
            return
        }
        const wb = temp.cloneNode(true) as HTMLElement
        const list = temp.parentNode as HTMLElement
        if (!list) {
            return
        }
        const target = list.firstElementChild

        updateWeiboContent(wb, src, name, text)
        wb.classList.remove('wb-display-template')
        list.insertBefore(wb, target)

        let opacityTimer = 0
        let heightTimer = 0
        const h = wb.offsetHeight - 20 // box-sizing: content-box; 这就是内容盒模型的弊端，妈的
        let o = 0
        wb.style.height = '0'
        wb.style.opacity = '0'
        heightTimer = setInterval(function () {
            wb.style.height = wb.offsetHeight - 20 + 2 + 'px'
            if (wb.offsetHeight >= h + 20) {
                wb.style.height = h + 'px'
                clearInterval(heightTimer)
                opacityTimer = setInterval(function () {
                    wb.style.opacity = (o += 0.1) + ''
                    if (o >= 1) {
                        wb.style.opacity = '1'
                        clearInterval(opacityTimer)
                        weiboDeleteAction()
                        clearUserInput()
                    }
                }, 1000 / 60)
            }
        }, 1000 / 60)
    }

    function updateWeiboContent(weibo: HTMLElement, src: string, name: string, text: string) {
        const wb = weibo
        const image = wb.querySelector('img')
        const username = wb.querySelector('.username')
        const content = wb.querySelector('.content')
        const time = wb.querySelector('.wb-posttime')

        if (!image || !username || !content || !time) {
            return
        }

        const datetime = new Date()
        const month = datetime.getMonth() + 1
        const date = datetime.getDate()
        const hour = datetime.getHours()
        const minute = datetime.getMinutes()
        // log(month + '' + date + '' + hour + '' + minute)

        image.src = src
        username.textContent = name
        content.textContent = ': ' + text
        time.textContent = ((month <= 9) ? ('0' + month) : month) + '月' +
            ((date < 10) ? ('0' + date) : date) + '日 ' +
            ((hour < 10) ? ('0' + hour) : hour) + ':' +
            ((minute < 10) ? ('0' + minute) : minute)
    }

    function judgeQualifiedWeibo(username: HTMLInputElement, content: HTMLTextAreaElement) {
        const name = username.value
        const text = content.value
        const rule = /^[a-zA-Z]{1}[0-9a-zA-Z\_]{1,7}$/
        if (!rule.test(name)) {
            alert('姓名由字母、数字和下划线组成，长度不能超过八且只能以字母开头！')
            return false
        }
        if (text.length > 140) {
            alert('你输入的内容已超过限制，请检查！')
            return false
        }
        return true
    }

    function weiboDeleteAction() {
        const buttons = getAll('#wb .wb-delete-button')
        if (!buttons) {
            return
        }
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', deleteWeibo)
        }
    }

    function deleteWeibo(e: MouseEvent) {
        const button = e.target as HTMLElement
        const wb = button.closest('li')
        if (wb) {
            deleteWeiboAnimated(wb as HTMLElement)
        }
        e.stopPropagation()
    }

    function deleteWeiboAnimated(weibo: HTMLElement) {
        const wb = weibo
        let h = weibo.offsetHeight - 20
        const style = window.getComputedStyle(wb)
        let opacityTimer = 0
        let heightTimer = 0
        opacityTimer = setInterval(function () {
            wb.style.opacity = Number(style.opacity) - 0.05 + ''
            if (Number(style.opacity) <= 0) {
                clearInterval(opacityTimer)
                heightTimer = setInterval(function () {
                    h -= 4
                    wb.style.height = h + 'px'
                    if (h <= 0) {
                        clearInterval(heightTimer)
                        if (wb.parentNode) {
                            wb.parentNode.removeChild(wb)
                        }
                    }
                }, 1000 / 60)
            }
        }, 1000 / 60)
    }

    function chooseUserImage() {
        const images = get('#wb .userimage')
        if (!images) {
            return
        }
        images.addEventListener('click', e => {
            let target = e.target as HTMLElement
            const name = target.nodeName
            if (name !== 'IMG') {
            }
            const parent = target.parentNode
            if (parent) {
                target = target.parentNode as HTMLElement
            }
            const lis = getAll('#wb .userimage li')
            for (let i = 0; i < lis.length; i++) {
                const element = lis[i]
                element.classList.remove('current')
            }
            target.classList.add('current')
            e.stopPropagation()
        })
    }

    function clearUserInput() {
        const username = get('#wb .user .username') as HTMLInputElement
        const content = get('#wb .wb-content') as HTMLTextAreaElement
        const numbers = get('#wb .wb-post-numbers')

        if (!username || !content || !numbers) {
            return
        }

        username.value = ''
        content.value = ''
        numbers.textContent = '140'
    }

    function main() {
        chooseUserImage()
        weiboPostAction()
        weiboDeleteAction()
        clearUserInput()
    }

    main()

}