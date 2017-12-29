var e2;
(function (e2) {
    function main() {
        var input = document.querySelector('input');
        var button = document.querySelector('button');
        var result = document.querySelector('#result');
        if (input === null || button === null || result === null) {
            return;
        }
        input.addEventListener('keyup', function (e) {
            var key = e.key;
            var v = input.value.split('');
            if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ','].indexOf(key) === -1) {
                v.pop();
                input.value = v.join('');
            }
        });
        button.addEventListener('click', function (e) {
            var value = input.value;
            var nums = value.split(',');
            var sum = 0;
            nums.forEach(function (num) {
                sum += Number(num);
            });
            result.textContent = String(sum);
        });
    }
    main();
})(e2 || (e2 = {}));
//# sourceMappingURL=e2.js.map