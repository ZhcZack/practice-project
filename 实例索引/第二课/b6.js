var b6;
(function (b6) {
    var divs = document.querySelectorAll('div');
    var _loop_1 = function (i) {
        divs[i].addEventListener('click', function (e) {
            alert(divs[i].innerHTML);
        });
    };
    for (var i = 0; i < divs.length; i++) {
        _loop_1(i);
    }
})(b6 || (b6 = {}));
//# sourceMappingURL=b6.js.map