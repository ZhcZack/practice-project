var b3;
(function (b3) {
    function main() {
        var input = document.querySelector('input');
        var button = document.querySelector('button');
        if (input === null || button === null) {
            return;
        }
        input.addEventListener('keyup', function (e) {
            this.value = this.value.replace(/[^0-9]/, '');
        });
        button.addEventListener('click', function (e) {
            var value = Number(input.value);
            var index = 0;
            while (value >= 1) {
                value /= 10;
                index++;
            }
            alert('这是' + index + '位数');
        });
    }
    main();
})(b3 || (b3 = {}));
//# sourceMappingURL=b3.js.map