var h3;
(function (h3) {
    function main() {
        var times = 0;
        var p = document.querySelector('p');
        if (p === null) {
            return;
        }
        window.addEventListener('load', function (e) {
            p.textContent = '' + times;
        });
        setInterval(function () {
            times++;
            p.textContent = '' + times;
        }, 1000);
    }
    main();
})(h3 || (h3 = {}));
//# sourceMappingURL=h3.js.map