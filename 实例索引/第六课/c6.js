var c6;
(function (c6) {
    var get = function (sel) { return document.querySelector(sel); };
    var getAll = function (sel) { return document.querySelectorAll(sel); };
    var log = console.log.bind(console);
    function main() {
        customRightMenu();
    }
    function customRightMenu() {
        var menu = get('#rightMenu');
        if (!menu) {
            return;
        }
        window.addEventListener('contextmenu', function (e) {
            // log(e)
            menu.style.display = 'block';
            menu.style.left = e.clientX + 'px';
            menu.style.top = e.clientY + 'px';
            e.preventDefault();
        });
        window.addEventListener('click', function (e) {
            var menu = get('#rightMenu');
            if (menu) {
                menu.style.display = 'none';
            }
        });
        menuEvents();
        ckeckRightArrow();
    }
    function menuEvents() {
        var menu = get('#rightMenu');
        if (!menu) {
            return;
        }
        menu.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }
    function ckeckRightArrow() {
        var uls = document.querySelectorAll('#rightMenu > ul ul');
        if (uls.length < 1) {
            return;
        }
        for (var i = 0; i < uls.length; i++) {
            var element = uls[i];
            element.parentElement.classList.add('right-arrow');
        }
        rightArrowEvents();
    }
    function rightArrowEvents() {
        var arrows = document.querySelectorAll('.right-arrow');
        var _loop_1 = function (i) {
            var element = arrows[i];
            element.addEventListener('mouseover', function (e) {
                // 在鼠标移入下一级菜单时让父级菜单保持显示
                element.parentElement.style.display = 'block';
                var children = element.parentElement.children;
                var num = children.length;
                for (var j = 0; j < num; j++) {
                    if (children[j].querySelector('ul')) {
                        children[j].querySelector('ul').style.display = 'none';
                    }
                }
                var child = element.querySelector('ul');
                var style = element.getBoundingClientRect();
                child.style.display = 'block';
                child.style.left = style.width + 'px';
                child.style.top = '0';
                e.stopPropagation();
            });
            element.addEventListener('mouseout', function (e) {
                element.querySelector('ul').style.display = 'none';
                e.stopPropagation();
            });
        };
        for (var i = 0; i < arrows.length; i++) {
            _loop_1(i);
        }
    }
    main();
})(c6 || (c6 = {}));
//# sourceMappingURL=c6.js.map