var b3;
(function (b3) {
    var Check = /** @class */ (function () {
        function Check() {
            this.allornot = document.querySelector('.allornot input');
            this.checks = document.querySelectorAll('ul li input');
            this.status = [];
            this.toggle = document.querySelector('.toggle');
            this.init();
        }
        Check.prototype.init = function () {
            var _this = this;
            for (var i = 0; i < this.checks.length; i++) {
                this.status.push(this.checks[i].checked);
            }
            var _loop_1 = function (i) {
                this_1.checks[i].addEventListener('change', function (e) {
                    var index = Number(_this.checks[i].dataset.index);
                    if (index) {
                        _this.status[index] = !_this.status[index];
                        _this.refresh();
                    }
                });
            };
            var this_1 = this;
            for (var i = 0; i < this.checks.length; i++) {
                _loop_1(i);
            }
            this.allornot.addEventListener('change', function (e) {
                var value = _this.allornot.checked;
                if (value) {
                    _this.status.forEach(function (s, i, arr) {
                        arr[i] = true;
                    });
                }
                else {
                    _this.status.forEach(function (s, i, arr) {
                        arr[i] = false;
                    });
                }
                _this.refresh();
            });
            this.toggle.addEventListener('click', function (e) {
                _this.status.forEach(function (s, i, arr) {
                    arr[i] = !arr[i];
                });
                _this.refresh();
            });
        };
        Check.prototype.refresh = function () {
            for (var i = 0; i < this.status.length; i++) {
                this.checks[i].checked = this.status[i];
            }
            var result = this.status.every(function (s) {
                return s;
            });
            if (result) {
                this.allornot.checked = true;
                if (this.allornot.nextElementSibling) {
                    this.allornot.nextElementSibling.textContent = '全不选';
                }
            }
            else {
                this.allornot.checked = false;
                if (this.allornot.nextElementSibling) {
                    this.allornot.nextElementSibling.textContent = '全选';
                }
            }
        };
        return Check;
    }());
    function __main() {
        var o = new Check();
    }
    __main();
})(b3 || (b3 = {}));
//# sourceMappingURL=b3.js.map