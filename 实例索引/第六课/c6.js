var c6;
(function (c6) {
    var get = function (sel) { return document.querySelector(sel); };
    var getAll = function (sel) { return document.querySelectorAll(sel); };
    var log = console.log.bind(console);
    function main() {
        customRightMenu();
    }
    function customRightMenu() {
        var m = get('#rightMenu');
        var lis = getAll('#rightMenu li');
        if (!m || lis.length < 1) {
            return;
        }
        var rightArrow = false;
        var showTimer = 0;
        var hideTimer = 0;
        window.addEventListener('contextmenu', function (e) {
            var x = e.clientX;
            var y = e.clientY;
            m.style.display = 'block';
            m.style.left = x + 'px';
            m.style.top = y + 'px';
            // right arrow
            if (!rightArrow) {
                for (var i = 0; i < lis.length; i++) {
                    var element = lis[i];
                    if (element.querySelector('ul')) {
                        element.classList.add('right-arrow');
                    }
                }
                rightArrow = true;
            }
            var _loop_1 = function (i) {
                var element = lis[i];
                element.addEventListener('mouseover', function (e) {
                    element.classList.add('current');
                    var ul = element.firstElementChild;
                    if (ul) {
                        clearTimeout(hideTimer);
                        showTimer = setTimeout(function () {
                            for (var i_1 = 0; i_1 < element.parentElement.children.length; i_1++) {
                                var ch = element.parentElement.children[i_1];
                                if (ch.querySelector('ul')) {
                                    ch.querySelector('ul').style.display = 'none';
                                }
                            }
                            ul.style.display = 'block';
                            ul.style.left = element.offsetWidth + 'px';
                            ul.style.top = '0';
                            var maxWidth = 0;
                            for (var i_2 = 0; i_2 < ul.children.length; i_2++) {
                                var l = ul.children[i_2];
                                var lw = l.clientWidth + parseInt(window.getComputedStyle(l).paddingLeft, 10);
                                if (lw > maxWidth) {
                                    maxWidth = lw;
                                }
                            }
                            ul.style.width = maxWidth + 'px';
                        }, 500);
                    }
                });
                element.addEventListener('mouseout', function (e) {
                    element.classList.remove('current');
                    clearTimeout(showTimer);
                    hideTimer = setTimeout(function () {
                        for (var i = 0; i < element.parentElement.children.length; i++) {
                            var ch = element.parentElement.children[i];
                            if (ch.querySelector('ul')) {
                                ch.querySelector('ul').style.display = 'none';
                            }
                        }
                    }, 500);
                    // e.stopPropagation()
                });
                element.addEventListener('click', function (e) {
                    m.style.display = 'none';
                });
            };
            // li actions
            for (var i = 0; i < lis.length; i++) {
                _loop_1(i);
            }
            e.preventDefault();
        });
    }
    main();
})(c6 || (c6 = {}));
//# sourceMappingURL=c6.js.map