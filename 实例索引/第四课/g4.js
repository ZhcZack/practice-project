var g4;
(function (g4) {
    var get = function (sel) { return document.querySelector(sel); };
    var getAll = function (sel) { return document.querySelectorAll(sel); };
    var log = console.log.bind(console);
    function main() {
        var codes = getAll('.code');
        var fbs = getAll('.first button');
        var sbs = getAll('.second button');
        var tbs = getAll('.third button');
        if (codes.length < 1 || fbs.length < 1 || sbs.length < 1 || tbs.length < 1) {
            return;
        }
        bind(codes, [fbs, sbs, tbs]);
    }
    function bind(areas, buttons) {
        for (var i = 0; i < areas.length; i++) {
            if (!areas[i].textContent) {
                return;
            }
        }
        var arr1 = areas[0].textContent.split(/\s*,\s*/);
        var arr2 = areas[1].textContent.split(/\s*,\s*/);
        var arr3 = areas[2].textContent.split(/\s*,\s*/);
        bindAreaOne(areas[0], arr1, buttons[0]);
        bindAreaTwo(areas[1], arr2, buttons[1]);
        bindAreaThree(areas[2], arr3, buttons[2]);
    }
    function bindAreaOne(area, arr, buttons) {
        buttons[0].addEventListener('click', function (e) {
            var index = arr.indexOf('January(1)');
            if (index > -1) {
                arr.splice(index, 1);
                buttons[0].textContent = '添加January(1)';
            }
            else {
                arr.unshift('January(1)');
                buttons[0].textContent = '删除January(1)';
            }
            updateContentWithArray(area, arr);
        });
        buttons[1].addEventListener('click', function (e) {
            var index = arr.indexOf('December(12)');
            if (index > -1) {
                arr.splice(index, 1);
                buttons[1].textContent = '添加December(12)';
            }
            else {
                arr.push('December(12)');
                buttons[1].textContent = '删除December(12)';
            }
            updateContentWithArray(area, arr);
        });
    }
    function bindAreaTwo(area, arr, buttons) {
        buttons[0].addEventListener('click', function (e) {
            arr = arr.concat(arr);
            updateContentWithArray(area, arr);
        });
        buttons[1].addEventListener('click', function (e) {
            var t = [];
            arr.forEach(function (elem) {
                if (t.indexOf(elem) < 0) {
                    t.push(elem);
                }
            });
            arr = t;
            updateContentWithArray(area, arr);
        });
    }
    function bindAreaThree(area, arr, buttons) {
        area.dataset.content = arr.join(', ');
        buttons[0].addEventListener('click', function (e) {
            arr = area.dataset.content.split(/\s*,\s*/);
            updateContentWithArray(area, arr);
        });
        buttons[1].addEventListener('click', function (e) {
            arr.splice(0, 3);
            updateContentWithArray(area, arr);
        });
        buttons[2].addEventListener('click', function (e) {
            arr.splice(1, 2);
            updateContentWithArray(area, arr);
        });
        buttons[3].addEventListener('click', function (e) {
            arr.splice(1, 0, 'orange', 'purple');
            updateContentWithArray(area, arr);
        });
        buttons[4].addEventListener('click', function (e) {
            arr.splice(1, 2, '#009900', '#0000ff');
            updateContentWithArray(area, arr);
        });
    }
    function updateContentWithArray(area, arr) {
        area.textContent = arr.join(', ');
    }
    main();
})(g4 || (g4 = {}));
//# sourceMappingURL=g4.js.map