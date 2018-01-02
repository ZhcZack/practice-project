namespace a7 {
    const get = (sel: string): HTMLElement | null => document.querySelector(sel)
    const getAll = (sel: string): NodeListOf<HTMLElement> => document.querySelectorAll(sel)
    const log = console.log.bind(console)

    function main() {
        const marks = getAll('.mark')
        const buttons = getAll('.button')
        let index = 0
        const loadingSrc = 'http://images4.alphacoders.com/288/288276.png'
        const links = [
            'http://img1.gtimg.com/news/pics/hv1/106/238/825/53706421.jpg',
            'http://img1.gtimg.com/news/pics/hv1/99/238/825/53706414.jpg',
            'http://img1.gtimg.com/news/pics/hv1/101/238/825/53706416.jpg'
        ]

        if (marks.length < 1 || buttons.length < 1) {
            return
        }

        for (let i = 0; i < marks.length; i++) {
            marks[i].addEventListener('mouseover', e => {
                buttons[i].classList.add('button-display')
            })
            marks[i].addEventListener('mouseout', e => {
                buttons[i].classList.remove('button-display')
            })
        }
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('mouseover', e => {
                buttons[i].classList.add('button-display')
            })
        }

        buttons[0].addEventListener('click', function (e) {
            // const container = get('.container')
            index--
            if (index < 0) {
                index = 0
                alert('这是第一张图片！')
                return
            }
            loadImage(index)
            displayTitle()
            e.stopPropagation()
        })
        buttons[1].addEventListener('click', e => {
            // var container = get('.container')
            index++
            if (index > links.length - 1) {
                index = links.length - 1
                alert('这是最后一张图片！')
                return
            }
            displayTitle()
            loadImage(index)
            e.stopPropagation()

        })

        loadImage(index)
        displayTitle()

    }

    function loadImage(index: number) {
        const img = get('.container .image') as HTMLImageElement | null
        const loadingSrc = 'http://images4.alphacoders.com/288/288276.png'
        const links = [
            'http://img1.gtimg.com/news/pics/hv1/106/238/825/53706421.jpg',
            'http://img1.gtimg.com/news/pics/hv1/99/238/825/53706414.jpg',
            'http://img1.gtimg.com/news/pics/hv1/101/238/825/53706416.jpg'
        ]

        if (!img) { return }
        img.src = loadingSrc
        const parent = img.parentElement

        const image = document.createElement('img')
        image.classList.add('image')

        const temp = new Image()
        temp.src = links[index]
        temp.addEventListener('load', e => {
            image.src = temp.src
            if (parent) {
                parent.replaceChild(image, img)
            }
        })
    }

    function displayTitle() {
        const title = get('.container .title')
        if (!title) { return }
        title.classList.remove('title-display')
        const temp = title.cloneNode(true) as HTMLElement
        title.parentElement!.replaceChild(temp, title)
        setTimeout(function () {
            temp.classList.add('title-display')
        }, 100)
    }


    main()
}