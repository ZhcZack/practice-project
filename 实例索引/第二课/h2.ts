namespace h2 {
    const uls = document.querySelectorAll('.show li') as NodeListOf<HTMLLIElement>
    const navs = document.querySelectorAll('.months li') as NodeListOf<HTMLLIElement>

    for (let i = 0; i < navs.length; i++) {
        navs[i].addEventListener('mouseover', e => {
            for (let j = 0; j < navs.length; j++) {
                navs[j].classList.remove('current')
            }
            let index = navs[i].dataset.index
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