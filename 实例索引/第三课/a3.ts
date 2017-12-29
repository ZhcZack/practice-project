namespace a3 {
    function main() {
        const button = document.querySelector('button')
        let timer: number = 0
        let times = 3
        const ss = document.querySelectorAll('span') as NodeListOf<HTMLSpanElement>

        if (button === null || ss.length === 0) {
            return
        }

        format(times)
        button.addEventListener('click', e => {
            if (timer) {
                clearInterval(timer)
                button.textContent = '启动'
            } else {
                timer = setInterval(() => {
                    timerStart()
                }, 1000)
                button.textContent = '暂停'
            }
        })

        function timerStart() {
            times--
            format(times)
            if (times === 0) {
                alert('计时结束')
                clearInterval(timer)
                restart()
            }
        }

        function format(t: number) {
            const ml = ss[0]
            const sl = ss[1]

            const m = Math.floor(t / 60)
            const s = t - m * 60

            ml.textContent = m < 10 ? '0' + m : String(m)
            sl.textContent = s < 10 ? '0' + s : String(s)
            if (button !== null) {
                button.textContent = timer ? '暂停' : '启动'
            }
        }

        function restart() {
            times = 40
            timer = 0
            format(times)
        }
    }
    main()

}