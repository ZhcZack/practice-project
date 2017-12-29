var h2;
(function (h2) {
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
})(h2 || (h2 = {}));
//# sourceMappingURL=h2.js.map