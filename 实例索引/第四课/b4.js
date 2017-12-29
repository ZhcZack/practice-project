var b4;
(function (b4) {
    var get = document.querySelector.bind(document);
    var getAll = document.querySelectorAll.bind(document);
    var log = console.log.bind(console);
    function main() {
        // test()
        bind();
    }
    function bind() {
        var d = get('.container');
        var gb = get('.get');
        var sb = get('.set');
        var db = get('.default');
        if (!d || !gb || !sb || !db) {
            return;
        }
        gb.addEventListener('click', function (e) {
            alert('width: ' + css(d, 'width') + '\nheight: ' + css(d, 'height')
                + '\nbackground-color: ' + css(d, 'backgroundColor'));
        });
        sb.addEventListener('click', function (e) {
            css(d, {
                width: '330px',
                height: '100px',
                borderColor: 'rgb(0, 132, 255)',
                backgroundColor: 'rgb(239, 248, 255)'
            });
            css(gb, 'backgroundColor', 'rgb(0, 132, 255)');
            css(sb, 'backgroundColor', 'rgb(0, 132, 255)');
            css(db, 'backgroundColor', 'rgb(0, 132, 255)');
        });
        db.addEventListener('click', function (e) {
            d.style.cssText = '';
            gb.style.cssText = '';
            sb.style.cssText = '';
            db.style.cssText = '';
        });
    }
    function test() {
        var d = document.querySelector('.container');
        if (!d) {
            return;
        }
        alert(css(d, 'width'));
    }
    function css(obj, attr, value) {
        switch (arguments.length) {
            case 2:
                if (typeof arguments[1] === 'object') {
                    var a = attr;
                    for (var i in a) {
                        obj.style[i] = a[i];
                    }
                }
                else {
                    return window.getComputedStyle(obj)[attr];
                }
                break;
            case 3:
                var b = attr;
                obj.style[b] = value;
                break;
            default:
                alert('参数错误！');
                break;
        }
        return;
    }
    main();
})(b4 || (b4 = {}));
//# sourceMappingURL=b4.js.map