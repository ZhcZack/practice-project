var a3;
(function (a3) {
    function main() {
        var button = document.querySelector('button');
        var timer = 0;
        var times = 3;
        var ss = document.querySelectorAll('span');
        if (button === null || ss.length === 0) {
            return;
        }
        format(times);
        button.addEventListener('click', function (e) {
            if (timer) {
                clearInterval(timer);
                button.textContent = '启动';
            }
            else {
                timer = setInterval(function () {
                    timerStart();
                }, 1000);
                button.textContent = '暂停';
            }
        });
        function timerStart() {
            times--;
            format(times);
            if (times === 0) {
                alert('计时结束');
                clearInterval(timer);
                restart();
            }
        }
        function format(t) {
            var ml = ss[0];
            var sl = ss[1];
            var m = Math.floor(t / 60);
            var s = t - m * 60;
            ml.textContent = m < 10 ? '0' + m : String(m);
            sl.textContent = s < 10 ? '0' + s : String(s);
            if (button !== null) {
                button.textContent = timer ? '暂停' : '启动';
            }
        }
        function restart() {
            times = 40;
            timer = 0;
            format(times);
        }
    }
    main();
})(a3 || (a3 = {}));
//# sourceMappingURL=a3.js.map