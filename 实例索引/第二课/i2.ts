namespace i2 {
    function main() {
        const uls = document.querySelectorAll('#content ul') as NodeListOf<HTMLUListElement>
        const navs = document.querySelectorAll('nav span') as NodeListOf<HTMLSpanElement>

        for (let i = 0; i < navs.length; i++) {
            navs[i].addEventListener('mouseover', e => {
                for (let j = 0; j < navs.length; j++) {
                    navs[j].classList.remove('current')
                }
                const index = navs[i].dataset.index
                navs[i].classList.add('current')
                for (let j = 0; j < uls.length; j++) {
                    uls[j].classList.remove('display')
                }
                if (index) {
                    uls[Number(index)].classList.add('display')
                }
            })
        }

    }
    main()
}