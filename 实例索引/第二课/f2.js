var f2;
(function (f2) {
    var divs = document.querySelectorAll('div');
    var _loop_1 = function (i) {
        divs[i].addEventListener('click', function (e) {
            alert(divs[i].innerHTML);
        });
    };
    for (var i = 0; i < divs.length; i++) {
        _loop_1(i);
    }
})(f2 || (f2 = {}));
//# sourceMappingURL=f2.js.map