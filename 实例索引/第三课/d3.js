var d3;
(function (d3) {
    function main() {
        getTime();
        setInterval(function () {
            getTime();
        }, 1000);
    }
    function getTime() {
        var date = new Date();
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        format(hour, min, sec);
    }
    function format(h, m, s) {
        var ss = document.querySelectorAll('span');
        var hl = ss[0];
        var ml = ss[1];
        var sl = ss[2];
        hl.textContent = '' + h;
        ml.textContent = '' + m;
        sl.textContent = s < 10 ? '0' + s : '' + s;
    }
    main();
})(d3 || (d3 = {}));
//# sourceMappingURL=d3.js.map