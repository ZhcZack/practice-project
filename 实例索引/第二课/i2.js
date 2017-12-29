var i2;
(function (i2) {
    function main() {
        var uls = document.querySelectorAll('#content ul');
        var navs = document.querySelectorAll('nav span');
        var _loop_1 = function (i) {
            navs[i].addEventListener('mouseover', function (e) {
                for (var j = 0; j < navs.length; j++) {
                    navs[j].classList.remove('current');
                }
                var index = navs[i].dataset.index;
                navs[i].classList.add('current');
                for (var j = 0; j < uls.length; j++) {
                    uls[j].classList.remove('display');
                }
                if (index) {
                    uls[Number(index)].classList.add('display');
                }
            });
        };
        for (var i = 0; i < navs.length; i++) {
            _loop_1(i);
        }
    }
    main();
})(i2 || (i2 = {}));
//# sourceMappingURL=i2.js.map