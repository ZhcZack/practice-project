var b8;
(function (b8) {
    var uls = document.querySelectorAll('.show li');
    var navs = document.querySelectorAll('.months li');
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
})(b8 || (b8 = {}));
//# sourceMappingURL=b8.js.map