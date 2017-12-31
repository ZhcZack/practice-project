var d5;
(function (d5) {
    function main() {
        document.addEventListener('contextmenu', displayCustomMenu);
        events();
    }
    function displayCustomMenu(e) {
        var menu = document.querySelector('#menu');
        if (!menu) {
            return;
        }
        var x = e.clientX;
        var y = e.clientY;
        menu.style.display = 'block';
        menu.style.left = x + 'px';
        menu.style.top = y + 'px';
        e.preventDefault();
    }
    function hideCustomMenu(menu) {
        menu.style.display = 'none';
    }
    function events() {
        var lis = document.querySelectorAll('#menu li');
        var _loop_1 = function (i) {
            lis[i].addEventListener('click', function (e) {
                var parent = lis[i].parentNode;
                if (parent) {
                    hideCustomMenu(parent);
                }
            });
        };
        for (var i = 0; i < lis.length; i++) {
            _loop_1(i);
        }
    }
    main();
})(d5 || (d5 = {}));
//# sourceMappingURL=d5.js.map