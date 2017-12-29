var f3;
(function (f3) {
    function main() {
        var log = console.log.bind(console);
        var ops = document.querySelectorAll('.operation');
        var opts = document.querySelectorAll('.operator');
        var input = document.querySelector('.input');
        var nums = [];
        var result = 0;
        var operator;
        var isInput = true;
        var isCalcDone = false;
        if (input === null) {
            return;
        }
        var _loop_1 = function (i) {
            ops[i].addEventListener('click', function (e) {
                var value = input.value;
                var v = ops[i].textContent;
                if (isInput) {
                    if (v === '.') {
                        var index = value.indexOf('.');
                        if (index !== -1) {
                            return;
                        }
                    }
                    input.value = value + v;
                }
                else {
                    isInput = true;
                    if (v) {
                        input.value = v;
                    }
                }
            });
        };
        for (var i = 0; i < ops.length; i++) {
            _loop_1(i);
        }
        var _loop_2 = function (i) {
            opts[i].addEventListener('click', function (e) {
                var value = input.value;
                var v = opts[i].textContent;
                isInput = false;
                nums.push(Number(value));
                switch (v) {
                    case 'C':
                        nums.pop();
                        clear();
                        break;
                    case '=':
                        isCalcDone = true;
                        calc();
                        break;
                    case '+':
                        calc();
                        operator = function (a, b) {
                            return a + b;
                        };
                        break;
                    case '-':
                        calc();
                        operator = function (a, b) {
                            return a - b;
                        };
                        break;
                    case '×':
                        calc();
                        operator = function (a, b) {
                            return a * b;
                        };
                        break;
                    case '÷':
                        calc();
                        operator = function (a, b) {
                            return a / b;
                        };
                        break;
                    case '%':
                        calc();
                        operator = function (a, b) {
                            return a % b;
                        };
                        break;
                    default:
                        break;
                }
            });
        };
        for (var i = 0; i < opts.length; i++) {
            _loop_2(i);
        }
        function clear() {
            input.value = '';
            operator = function (a, b) { return 0; };
            nums = [];
        }
        function calc() {
            if (nums.length < 2) {
                return;
            }
            result = operator(nums[0], nums[1]);
            nums.splice(0, 2);
            nums.unshift(result);
            input.value = '' + result;
            if (isCalcDone) {
                operator = function (a, b) { return 0; };
                nums = [];
                isCalcDone = false;
            }
        }
    }
    main();
})(f3 || (f3 = {}));
//# sourceMappingURL=f3.js.map