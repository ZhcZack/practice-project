namespace h4 {
    const get = (sel: string): HTMLElement | null => document.querySelector(sel)
    const getAll = (sel: string): NodeListOf<HTMLElement> => document.querySelectorAll(sel)
    const log = console.log.bind(console)

    function main() {
        bind()
    }

    function bind() {
        const stars = getAll('#star li') as NodeListOf<HTMLLIElement>
        bindStars(stars)
    }

    function bindStars(stars: NodeListOf<HTMLLIElement>) {
        const p = get('#star p')
        const ul = get("#star ul")
        const span = getAll('#star span')[1]
        if (!p || !ul || !span) {
            return
        }
        let score = 0
        const msgs = ["很不满意|差得太离谱，与卖家描述的严重不符，非常不满",
            "不满意|部分有破损，与卖家描述的不符，不满意",
            "一般|质量一般，没有卖家描述的那么好",
            "满意|质量不错，与卖家描述的基本一致，还是挺满意的",
            "非常满意|质量非常好，与卖家描述的完全一致，非常满意"]
        for (let i = 0; i < stars.length; i++) {
            stars[i].addEventListener('mouseover', e => {
                const temp = Number(stars[i].querySelector('a')!.textContent)
                p.style.display = 'block'
                p.style.left = ul.offsetLeft + (temp * stars[i].offsetWidth) - 104 + 'px'
                var words = msgs[temp - 1].split('|')
                p.innerHTML = '<em><b>' + temp + '</b>分 ' + words[0] + '</em>' + words[1]
                showPoint(stars, temp)
            })
            stars[i].addEventListener('mouseout', e => {
                showPoint(stars, score)
                p.style.display = 'none'
            })
            stars[i].addEventListener('click', e => {
                score = Number(stars[i].querySelector('a')!.textContent)
                const words = msgs[score - 1].split('|')
                span.innerHTML = '<strong>' + score + '分</strong> (' + words[1] + ')'
            })
        }
    }

    function showPoint(stars: NodeListOf<HTMLLIElement>, point: number) {
        for (var i = 0; i < stars.length; i++) {
            const score = Number(stars[i].querySelector('a')!.textContent)
            if (score <= point) {
                stars[i].classList.add('on')
            } else {
                stars[i].classList.remove('on')
            }
        }
    }

    main()

}